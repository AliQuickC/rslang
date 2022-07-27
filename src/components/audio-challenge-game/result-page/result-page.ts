import resultPageAsString from './game-result.html';
import listElement from './list-element.html';
import getHtmlFromString from '../../utilites/getHtmlFromString';
import {
  Auth,
  CurrentPageWord,
  Difficulty,
  GameName,
  State,
  UserWord,
} from '../../../modules/types';
import { defaultAudioVolume, urlServer } from '../../utilites/consts';
import { saveUserWord } from '../../../modules/api';
import StatisticsPage from '../../statistics/statistics-page';
import { gameName, gameNameEnum } from '../../utilites/types';

export default class ResultPage {
  private state: State;

  private statisticsPageInstance: StatisticsPage;

  constructor(state: State) {
    this.state = state;
    this.statisticsPageInstance = new StatisticsPage(state);
  }

  static getResultPageElement(
    rightAnswersArray: CurrentPageWord[],
    answersArray: boolean[]
  ) {
    const resultPageElement = getHtmlFromString(
      resultPageAsString
    ).querySelector('.result-page') as HTMLElement;
    const wrongAnswersList = resultPageElement.querySelector(
      '.errors-list'
    ) as HTMLUListElement;
    const rightAnswersList = resultPageElement.querySelector(
      '.right-answers-list'
    ) as HTMLUListElement;
    const errorsCountElement = resultPageElement.querySelector(
      '.errors-count'
    ) as HTMLSpanElement;
    const rightsCountElement = resultPageElement.querySelector(
      '.rights-count'
    ) as HTMLSpanElement;

    const answersObject = ResultPage.createAnswersArrayObject(
      rightAnswersArray,
      answersArray
    );

    errorsCountElement.innerText = `  ${answersObject.wrongAnswers.length}`;
    rightsCountElement.innerText = `  ${answersObject.rightAnswers.length}`;

    ResultPage.createAnswersList(answersObject.rightAnswers, rightAnswersList);
    ResultPage.createAnswersList(answersObject.wrongAnswers, wrongAnswersList);

    return resultPageElement;
  }

  static createAnswersArrayObject(
    rightAnswersArray: CurrentPageWord[],
    answersArray: boolean[]
  ) {
    const usersRightAnswersArray = rightAnswersArray.filter(
      (word, i) => answersArray[i]
    );
    const usersWrongAnswersArray = rightAnswersArray.filter(
      (word, i) => !answersArray[i]
    );
    return {
      rightAnswers: usersRightAnswersArray,
      wrongAnswers: usersWrongAnswersArray,
    };
  }

  static createAnswersList(
    answersArray: CurrentPageWord[],
    ulElement: HTMLUListElement
  ): void {
    answersArray.forEach((word) => {
      ulElement.append(ResultPage.createLiElement(word));
    });
  }

  static createSound(word: CurrentPageWord) {
    const audio = new Audio();
    audio.src = `${urlServer}/${word.audio}`;
    audio.volume = defaultAudioVolume;
    return audio;
  }

  static createLiElement(word: CurrentPageWord): HTMLElement {
    const liElement = getHtmlFromString(listElement).querySelector(
      '.game-result-list-element'
    ) as HTMLLIElement;
    const answerAudio = liElement.querySelector(
      '.word__soundbtn'
    ) as HTMLElement;
    const answerWord = liElement.querySelector(
      '.word__name'
    ) as HTMLSpanElement;
    const translate = liElement.querySelector(
      '.word__translate'
    ) as HTMLSpanElement;
    answerAudio.addEventListener('click', () => {
      const audio = ResultPage.createSound(word);
      audio.play();
    });
    answerWord.innerText = word.word;
    translate.innerText = ` — ${word.wordTranslate}`;
    return liElement;
  }

  updateUserWords(
    arrayParam: CurrentPageWord[],
    booleanArray: boolean[]
  ): void {
    const array = arrayParam;
    if (this.state.userSettings.authorized) {
      let currentlyLearned = 0;
      let newWords = 0;
      const authData = this.state.userSettings.authData as Auth;

      for (let i = 0; i < array.length; i += 1) {
        if (!array[i].userWord) {
          array[i].userWord = {
            difficulty: Difficulty.basic,
            optional: { answerResultArray: [] },
          } as UserWord;

          newWords += 1;
          // isNew = true;
        }
        (<UserWord>array[i].userWord).optional.answerResultArray.push(
          booleanArray[i]
        );

        const truthCount =
          (<UserWord>array[i].userWord).optional.answerResultArray.lastIndexOf(
            false
          ) >= 0
            ? (<UserWord>array[i].userWord).optional.answerResultArray.length -
              1 -
              (<UserWord>(
                array[i].userWord
              )).optional.answerResultArray.lastIndexOf(false)
            : (<UserWord>array[i].userWord).optional.answerResultArray.length;

        if (
          !booleanArray[i] &&
          (<UserWord>array[i].userWord).difficulty === Difficulty.easy
        ) {
          (<UserWord>array[i].userWord).difficulty = Difficulty.basic;
        }

        if (
          ((<UserWord>array[i].userWord).difficulty === Difficulty.basic &&
            truthCount >= 3) ||
          ((<UserWord>array[i].userWord).difficulty === Difficulty.difficult &&
            truthCount >= 5)
        ) {
          (<UserWord>array[i].userWord).difficulty = Difficulty.easy;
          currentlyLearned += 1;
        }

        saveUserWord(
          authData.userId,
          array[i].id,
          authData.token,
          <UserWord>array[i].userWord
        ).catch((error) => console.log(error));
      }

      let currentGame: gameName;
      if (this.state.gameOptions.selectGame === GameName.Sprint) {
        currentGame = gameNameEnum.sprint;
      } else {
        currentGame = gameNameEnum.audioChallenge;
      }
      StatisticsPage.updateGameStatistics(
        this.state,
        currentGame,
        booleanArray,
        currentlyLearned,
        newWords
      );
    }
  }
}
