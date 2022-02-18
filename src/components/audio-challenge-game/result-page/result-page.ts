import resultPageAsString from './game-result.html';
import listElement from './list-element.html';
import geHtmlFromString from '../../utilites/geHtmlFromString';
import { CurrentPageWord, Word } from '../../../modules/types';

export default class ResultPage {
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
}
