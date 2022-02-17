import { getWords } from '../../modules/api';
import { aggregatedUserWords, State, Word } from '../../modules/types';
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

  private wordsForGameArray: Word[] | undefined;
  private rightAnswersArray: Word[] | undefined;
  private answersArrayForRound: Word[] | undefined;
  currentQuestionNumber = 0;
  private rightAnswersAudio: HTMLAudioElement | undefined;
  private answersResultArray: boolean[] | undefined = [];
  private rightAnswersIdArray: string[] | undefined;

  private listener:((event:Event)=>void) | undefined;
  // private currentRightAnswer: Word | undefined;

  randomSort(array: Word[] | number[]) {
    array.sort(() => Math.random() - 0.5);
  }

  createRightAnswersArray() {
    this.rightAnswersArray = this.wordsForGameArray
      ? this.wordsForGameArray.slice(0, 10)
      : undefined;
    this.rightAnswersIdArray = (<Word[]>this.rightAnswersArray).map(
      (rightAnswer) => rightAnswer.id
    );
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
    this.randomSort(this.answersArrayForRound);
  }

  createSoundForRound() {
    const currentRightAnswer = (<Word[]>this.rightAnswersArray)[
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
      .then((array: Word[]) => {
        this.wordsForGameArray = array;
        this.randomSort(this.wordsForGameArray);
        this.createRightAnswersArray();
        const gameRoundElement = this.getDataForGameRound(this.currentQuestionNumber);
        this.rightAnswersAudio?.play();
        return gameRoundElement;
      });
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
      (<Word[]>this.rightAnswersArray)[this.currentQuestionNumber]
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
          console.log(this.currentQuestionNumber, (<Word[]>this.rightAnswersArray).length);
          if(this.currentQuestionNumber < (<Word[]>this.rightAnswersArray).length){
            this.rightAnswersAudio?.play();
            element = this.getDataForGameRound(this.currentQuestionNumber);
          } else {
            element = button;
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
        (element.innerText = (<Word[]>this.answersArrayForRound)[
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
    const answer = (<Word[]>this.rightAnswersArray)[this.currentQuestionNumber];
    const img = new Image();
    img.src = `${urlServer}/${answer.image}`;

    img.addEventListener('load', (event) => {
      image.style.background = `center / cover no-repeat url(${(<HTMLImageElement>event.currentTarget).src})`;
    });

    answerWord.innerText = answer.word;
    return answerElement;
  }

}
