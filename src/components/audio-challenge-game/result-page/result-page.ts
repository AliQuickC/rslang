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
import { saveUserWord } from '../../../modules/api';

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

      for (let i = 0; i < array.length; i++) {
        if (!array[i].userWord) {
          array[i].userWord = {
            difficulty: Difficulty.basic,
            optional: { answerResultArray: [] },
          } as UserWord;

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
        }
        console.log(
          truthCount,
          (<UserWord>array[i].userWord).optional.answerResultArray.lastIndexOf(
            false
          )
        );

        saveUserWord(
          authData.userId,
          array[i].id,
          authData.token,
          <UserWord>array[i].userWord
        )
          .then((result) => console.log(result))
          .catch((error) => console.log(error));
      }

    }
  }
}
