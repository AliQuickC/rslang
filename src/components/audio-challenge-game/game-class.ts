import { getWords } from '../../modules/api';
import { aggregatedUserWords, State, Word } from '../../modules/types';
import GameApi from './game-api/game-api';
import gameScreenElementAsString from './game-screen.html';
import geHtmlFromString from '../utilites/geHtmlFromString';

export default class Game {
  private state: State;

  constructor(state: State) {
    this.state = state;
  }

  gameWindowElement = geHtmlFromString(gameScreenElementAsString).querySelector(
    '.audio-challenge-game-screen'
  ) as HTMLElement;
  answersElements = this.gameWindowElement.querySelectorAll(
    '.answers-list__li'
  ) as NodeListOf<HTMLLIElement>;

  private wordsForGameArray: Word[] | undefined;
  private rightAnswersArray: Word[] | undefined;
  private answersArrayForRound: Word[] | undefined;
  currentQuestionNumber = 0;

  // private currentRightAnswer: Word | undefined;

  randomSort(array: Word[]) {
    array.sort(() => Math.random() - 0.5);
  }

  createRightAnswersArray() {
    this.rightAnswersArray = this.wordsForGameArray
      ? this.wordsForGameArray.slice(0, 10)
      : undefined;
  }

  createAnswersArrayForRound() {
    const rightArray = this.rightAnswersArray as Word[];
    const currentRightAnswer = rightArray[this.currentQuestionNumber] as Word;
    const wordsForGameArray = this.wordsForGameArray as Word[];
    this.answersArrayForRound = wordsForGameArray.filter(
      (word) => word.id != currentRightAnswer.id
    );
    this.randomSort(this.answersArrayForRound);
    this.answersArrayForRound = this.answersArrayForRound.slice(0, 4);
    this.answersArrayForRound.push(currentRightAnswer);
  }

  getDataForGame() {
    // getWords(
    //   this.state.userSettings.schoolbookCurrentPosition.chapter,
    //   this.state.userSettings.schoolbookCurrentPosition.page
    // )
    GameApi.getWordsByGroup(0)
      .then((response) => {
        return response.ok ? response.json() : undefined;
      })
      .then((array: Word[]) => {
        this.wordsForGameArray = array;
        this.randomSort(this.wordsForGameArray);
        this.createRightAnswersArray();
        this.createAnswersArrayForRound();
        let answersArray = this.answersArrayForRound as Word[];

        this.answersElements.forEach((element,i) => element.innerText = answersArray[i].word);
      });
  }


}
