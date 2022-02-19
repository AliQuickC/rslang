import resultPageAsString from './game-result.html';
import listElement from './list-element.html';
import geHtmlFromString from '../../utilites/geHtmlFromString';
import {
  Auth,
  CurrentPageWord,
  Difficulty,
  State,
  UserWord,
} from '../../../modules/types';
import User from '../../user-authorization/userApi/userApi';
import { defaultWordStatus } from '../../utilites/consts';
import { IObjectWithUpdateWordsArrays } from '../../utilites/types';
import { saveUserWord } from '../../../modules/api';
import GameApi from '../game-api/game-api';

export default class ResultPage {
  private state: State;

  constructor(state: State) {
    this.state = state;
  }

  getResultPageElement(
    rightAnswersArray: CurrentPageWord[],
    answersArray: boolean[]
  ) {
    const resultPageElement = geHtmlFromString(
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

    const answersObject = this.createAnswersArrayObject(
      rightAnswersArray,
      answersArray
    );

    errorsCountElement.innerText = `  ${answersObject.wrongAnswers.length}`;
    rightsCountElement.innerText = `  ${answersObject.rightAnswers.length}`;

    this.createAnswersList(answersObject.rightAnswers, rightAnswersList);
    this.createAnswersList(answersObject.wrongAnswers, wrongAnswersList);

    return resultPageElement;
  }

  createAnswersArrayObject(
    rightAnswersArray: CurrentPageWord[],
    answersArray: boolean[]
  ) {
    const usersRightAnswersArray = rightAnswersArray.filter((word, i) => {
      if (answersArray[i]) {
        return word;
      }
    });
    const usersWrongAnswersArray = rightAnswersArray.filter((word, i) => {
      if (!answersArray[i]) {
        return word;
      }
    });
    return {
      rightAnswers: usersRightAnswersArray,
      wrongAnswers: usersWrongAnswersArray,
    };
  }

  createAnswersList(
    answersArray: CurrentPageWord[],
    ulElement: HTMLUListElement
  ): void {
    answersArray.forEach((word) => {
      ulElement.append(this.createLiElement(word));
    });
  }

  createLiElement(word: CurrentPageWord): HTMLElement {
    const liElement = geHtmlFromString(listElement).querySelector(
      '.game-result-list-element'
    ) as HTMLLIElement;
    const answerWord = liElement.querySelector('.word') as HTMLSpanElement;
    const translate = liElement.querySelector('.translate') as HTMLSpanElement;
    answerWord.innerText = word.word;
    translate.innerText = ` — ${word.wordTranslate}`;
    return liElement;
  }

  updateUserWords(array: CurrentPageWord[], booleanArray: boolean[]) {
    if (this.state.userSettings.authorized) {
      let authData = this.state.userSettings.authData as Auth;
      User.updateToken(authData.userId, authData.refreshToken).then((auth) => {
        let isNew = false;
        //   let arrray = [];
        authData.token = auth.token;
        authData.refreshToken = auth.refreshToken;

        array.forEach((word, i) => {
          if (!word.userWord) {
            word.userWord = defaultWordStatus as UserWord;
            isNew = true;
          }
          console.log(word.userWord.optional.answerResultArray.length);
          // arrray = (<UserWord>word.userWord).optional.answerResultArray;

          (<UserWord>word.userWord).optional.answerResultArray.push(booleanArray[i]);
          // (<UserWord>word.userWord).optional.answerResultArray.push(true);
          // (<UserWord>word.userWord).optional.answerResultArray.length = 0;
          // (<UserWord>word.userWord).optional.answerResultArray = arrray;

          const truthCount =
            (<UserWord>word.userWord).optional.answerResultArray.lastIndexOf(
              false
            ) > 0
              ? (<UserWord>word.userWord).optional.answerResultArray.length -
                1 -
                (<UserWord>(
                  word.userWord
                )).optional.answerResultArray.lastIndexOf(false)
              : (<UserWord>word.userWord).optional.answerResultArray.length;

          if (
            !booleanArray[i] &&
            (<UserWord>word.userWord).difficulty === Difficulty.easy
          ) {
            (<UserWord>word.userWord).difficulty = Difficulty.basic;
          }

          if (
            ((<UserWord>word.userWord).difficulty === Difficulty.basic &&
              truthCount >= 3) ||
            ((<UserWord>word.userWord).difficulty === Difficulty.difficult &&
              truthCount >= 5)
          ) {
            (<UserWord>word.userWord).difficulty = Difficulty.easy;
          }

          console.log(word.id, word.userWord.difficulty, truthCount);

          saveUserWord(authData.userId,word.id,authData.token,<UserWord>word.userWord)
            .then((result)=>console.log(result))
            .catch(error=>console.log(error))

        });
      });
    }
  }
}
