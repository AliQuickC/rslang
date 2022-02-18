import { getWords } from '../../modules/api';
import { aggregatedUserWords, State, Word, CurrentPageWord } from '../../modules/types';
import GameApi from './game-api/game-api';
import gameScreenElementAsString from './game-screen.html';
import answerDivElementAsString from './answer-div/answer-div.html';
import geHtmlFromString from '../utilites/geHtmlFromString';
import {
  defaultAudioVolume,
  gameButtonInnerText,
  urlServer,
} from '../utilites/consts';
import Button from '../universal-button/button';
import ResultPage from "./result-page/result-page";
import { generateGameWordsForSelectPage } from "../games/game-words";

const resultPageInstance = new ResultPage();
const audioButtonLink = 'audio-button';

export default class Game {
  // private state: State;
  //
  // constructor(state: State) {
  //   this.state = state;
  // }

  // gameWindowElement = geHtmlFromString(gameScreenElementAsString).querySelector(
  //   '.audio-challenge-game-screen'
  // ) as HTMLElement;
  // answersElements = this.gameWindowElement.querySelectorAll(
  //   '.answers-list__li'
  // ) as NodeListOf<HTMLLIElement>;

  private wordsForGameArray: CurrentPageWord[] | undefined;
  private rightAnswersArray: CurrentPageWord[] | undefined;
  private answersArrayForRound: CurrentPageWord[] | undefined;
  currentQuestionNumber = 0;
  private rightAnswersAudio: HTMLAudioElement | undefined;
  private answersResultArray: boolean[] | undefined = [];
  private rightAnswersIdArray: string[] | undefined;

  private listener:((event:Event)=>void) | undefined;
  // private currentRightAnswer: Word | undefined;

  randomSort(array: CurrentPageWord[] | number[]) {
    array.sort(() => Math.random() - 0.5);
  }

  createRightAnswersArray() {
    this.rightAnswersArray = this.wordsForGameArray
      ? this.wordsForGameArray.slice(0, 10)
      : undefined;
    this.rightAnswersIdArray = (<CurrentPageWord[]>this.rightAnswersArray).map(
      (rightAnswer) => rightAnswer.id
    );
  }

  createAnswersArrayForRound() {
    const rightArray = this.rightAnswersArray as CurrentPageWord[];
    const currentRightAnswer = rightArray[this.currentQuestionNumber] as CurrentPageWord;
    const wordsForGameArray = this.wordsForGameArray as CurrentPageWord[];
    this.answersArrayForRound = wordsForGameArray.filter(
      (word) => word.id != currentRightAnswer.id
    );
    this.randomSort(this.answersArrayForRound);
    this.answersArrayForRound = this.answersArrayForRound.slice(0, 4);
    this.answersArrayForRound.push(currentRightAnswer);
    this.randomSort(this.answersArrayForRound);
  }

  createSoundForRound() {
    const currentRightAnswer = (<CurrentPageWord[]>this.rightAnswersArray)[
      this.currentQuestionNumber
    ];
    const audio = new Audio();
    audio.src = `${urlServer}/${currentRightAnswer.audio}`;
    audio.volume = defaultAudioVolume;
    this.rightAnswersAudio = audio;
  }

  getDataForGame(groupNumber:number) {
    this.currentQuestionNumber = 0;
    (<boolean[]>this.answersResultArray).length = 0;
    return GameApi.getWordsByGroup(groupNumber)
      .then((response) => {
        return response.ok ? response.json() : undefined;
      })
      .then(
        (array: CurrentPageWord[]) =>
          this.createGameRoundElement(array)
      );
  }

  getDataForGameFromBook(state:State){
    this.currentQuestionNumber = 0;
    (<boolean[]>this.answersResultArray).length = 0;
    return generateGameWordsForSelectPage(
      state.userSettings,
      state.userSettings.schoolbookCurrentPosition.chapter,
      state.userSettings.schoolbookCurrentPosition.page)
      .then((array) =>
          this.createGameRoundElement(array)
      );
  }


  private createGameRoundElement(array: CurrentPageWord[]){
    this.wordsForGameArray = array;
    this.randomSort(this.wordsForGameArray);
    this.createRightAnswersArray();
    const gameRoundElement = this.getDataForGameRound(this.currentQuestionNumber);
    this.rightAnswersAudio?.play();
    return gameRoundElement;
  }

  onClickFunction(event: Event){
    const currentAudio = this.rightAnswersAudio as HTMLAudioElement;
    const target = event.target as HTMLLIElement;
    const currentTarget = event.currentTarget as HTMLElement;
    const audioButton = currentTarget.querySelector(
      '.current-word-audio-button'
    ) as HTMLElement;
    const button = currentTarget.querySelector('.button') as HTMLButtonElement;
    let isRightClick = false;
    if (target.dataset.link === audioButtonLink) {
      this.rightAnswersAudio?.play();
      event.stopPropagation()
    }
    if (
      target.innerText ===
      (<CurrentPageWord[]>this.rightAnswersArray)[this.currentQuestionNumber]
        .wordTranslate
    ) {
      console.log('true');
      isRightClick=true;
      (<boolean[]>this.answersResultArray).push(true);
    } else if (target.tagName === 'LI' || target.tagName === 'BUTTON') {
      console.log('false');
      isRightClick=true;
      (<boolean[]>this.answersResultArray).push(false);
    }

    !isRightClick || this.createAnswerElement().then((answerElement) => {
      answerElement.addEventListener('click', (event) => {
        if ((<HTMLElement>event.target).dataset.link === audioButtonLink) {
          currentAudio?.play();
          event.stopPropagation();
        }
      });
      setTimeout(() => {
        this.currentQuestionNumber++;
        currentTarget.removeEventListener('click', <()=>void>this.listener);
        // const nextRoundElement = this.getDataForGameRound(this.currentQuestionNumber);
        button.addEventListener('click', (event)=>{
          event.stopPropagation();
          let element: HTMLElement;
          console.log(this.currentQuestionNumber, (<CurrentPageWord[]>this.rightAnswersArray), this.rightAnswersAudio);
          if(this.currentQuestionNumber < (<CurrentPageWord[]>this.rightAnswersArray).length){
            element = this.getDataForGameRound(this.currentQuestionNumber);
            this.rightAnswersAudio?.play();
          } else {
            element = resultPageInstance.getResultPageElement(<CurrentPageWord[]>this.rightAnswersArray, <boolean[]>this.answersResultArray);
          }
          currentTarget.replaceWith(element);
        })
        button.innerText ='→'
        audioButton.replaceWith(answerElement)}, 400);
    });

    console.log(this.answersResultArray);
  }

  getDataForGameRound(gameRoundNumber: number) {
    const gameWindowElement = geHtmlFromString(
      gameScreenElementAsString
    ).querySelector('.audio-challenge-game-screen') as HTMLElement;
    const audioButton = gameWindowElement.querySelector(
      '.current-word-audio-button'
    ) as HTMLElement;
    const answersElements = gameWindowElement.querySelectorAll(
      '.answers-list__li'
    ) as NodeListOf<HTMLLIElement>;
    const button = Button.createReadyButtonElement(gameButtonInnerText);
    gameWindowElement.append(button);
    this.createAnswersArrayForRound();
    this.createSoundForRound();


    gameWindowElement.addEventListener('click', this.listener = (event) => this.onClickFunction(event)
    );
    answersElements.forEach(
      (element, i) =>
        (element.innerText = (<CurrentPageWord[]>this.answersArrayForRound)[
          i
        ].wordTranslate)
    );


    return gameWindowElement;
  }

  async createAnswerElement() {
    const answerElement = geHtmlFromString(
      answerDivElementAsString
    ).querySelector('.answer-box') as HTMLElement;
    const image = answerElement.querySelector(
      '.answer-box__image'
    ) as HTMLElement;
    const soundButton = answerElement.querySelector(
      '.word-shell__sound-button'
    ) as HTMLElement;
    const answerWord = answerElement.querySelector(
      '.word-shell__word'
    ) as HTMLSpanElement;
    const answer = (<CurrentPageWord[]>this.rightAnswersArray)[this.currentQuestionNumber];
    const img = new Image();
    img.src = `${urlServer}/${answer.image}`;

    img.addEventListener('load', (event) => {
      image.style.background = `center / cover no-repeat url(${(<HTMLImageElement>event.currentTarget).src})`;
    });

    answerWord.innerText = answer.word;
    return answerElement;
  }

}
