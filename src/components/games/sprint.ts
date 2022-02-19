/* eslint-disable no-use-before-define */
import {
  CurrentPage,
  CurrentPageWord,
  GameWords,
  RenderPage,
  sprintGame,
  State,
  wayToGetWords,
} from '../../modules/types';
import { getRandomTrueOrFalse, randomInteger } from '../../modules/utils';
import {
  generateGameWordsForSelectLevel,
  generateGameWordsForSelectPage,
  getAllWordsFromChapter,
} from './game-words';

const totalWordsInChapter = 600;

const questionHTML = (gameWords: GameWords, questionNumb: number): string => {
  return `  
    <section class="section sprint" id="sprint">
      <div class="container sprint-conteiner">        
        <div class="sprint__game sprint-game" id="sprint-game">
          <div class="sprint-game__card">
            <p class="sprint-game__word">
              <span class="sprint-game__word-question">${gameWords.words[questionNumb].word}</span>
              <span class="sprint-game__word-answer">${gameWords.answerVariants[questionNumb]}</span>
            </p>
            <div class="sprint-game__buttons-wrap">
              <button class="sprint-game__false-btn" id="false-btn">← Неверно</button>
              <button class="sprint-game__true-btn" id="true-btn">Верно →</button>
            </div>
          </div>
        </div>
      </div>
    </section>
  `;
};

const zeroWordHTML = (): string => {
  return `  
    <section class="section sprint" id="sprint">
      <div class="container sprint-conteiner">        
        <div class="sprint__game sprint-game" id="sprint-game">
          <div class="sprint-game__card">
            <p class="sprint-game__word-zero">
              Все слова раздела изучены
            </p>
            <div class="sprint-game__buttons-wrap">              
              <button class="sprint-game__ok-btn" id="zero-ok-btn">Ок</button>
            </div>
          </div>
        </div>
      </div>
    </section>
  `;
};

function renderSprint(root: HTMLElement, state: State): void {
  const elem = root;
  const { sprintGame } = state;

  function keyDownHandler(e: KeyboardEvent): void {
    switch (e.code) {
      case 'ArrowLeft':
        falseClickHandler();
        break;
      case 'ArrowRight':
        trueClickHandler();
        break;
      default:
        break;
    }
  }

  function falseClickHandler(): void {
    if (
      sprintGame.gameWords.words[sprintGame.currentQuestion].wordTranslate ===
      sprintGame.gameWords.answerVariants[sprintGame.currentQuestion]
    ) {
      sprintGame.gameWords.answerRezults[sprintGame.currentQuestion] = false;
      console.log('false');
    } else {
      sprintGame.gameWords.answerRezults[sprintGame.currentQuestion] = true;
      console.log('true');
    }
    (document.querySelector('#false-btn') as HTMLButtonElement).onclick = null;
    (document.querySelector('#true-btn') as HTMLButtonElement).onclick = null;
    window.removeEventListener('keydown', keyDownHandler);
    sprintGame.currentQuestion += 1;
    renderSprint(root, state);
  }

  function trueClickHandler(): void {
    if (
      sprintGame.gameWords.words[sprintGame.currentQuestion].wordTranslate ===
      sprintGame.gameWords.answerVariants[sprintGame.currentQuestion]
    ) {
      sprintGame.gameWords.answerRezults[sprintGame.currentQuestion] = true;
      console.log('true');
    } else {
      sprintGame.gameWords.answerRezults[sprintGame.currentQuestion] = false;
      console.log('false');
    }
    (document.querySelector('#false-btn') as HTMLButtonElement).onclick = null;
    (document.querySelector('#true-btn') as HTMLButtonElement).onclick = null;
    window.removeEventListener('keydown', keyDownHandler);
    sprintGame.currentQuestion += 1;
    renderSprint(root, state);
  }

  if (sprintGame.totalWords === 0) {
    elem.innerHTML = zeroWordHTML();
    const gameEndBtn = root.querySelector('#zero-ok-btn');
    (<HTMLButtonElement>gameEndBtn).addEventListener(
      'click',
      () => {
        RenderPage[state.userSettings.currentPage](root, state);
      },
      { once: true }
    );
    return;
  }

  if (sprintGame.totalWords > sprintGame.currentQuestion) {
    elem.innerHTML = questionHTML(
      sprintGame.gameWords,
      sprintGame.currentQuestion
    );

    const falseBtn = root.querySelector('#false-btn');
    const trueBtn = root.querySelector('#true-btn');
    (<HTMLButtonElement>falseBtn).onclick = falseClickHandler;
    (<HTMLButtonElement>trueBtn).onclick = trueClickHandler;
    window.addEventListener('keydown', keyDownHandler);
  } else {
    console.log('Игра завершена: ', sprintGame.gameWords.answerRezults);
  }
}

export default async function gameSprint(root: HTMLElement, param: State) {
  const props = param;
  props.sprintGame = {
    maxTotalWords: 5,
    totalWords: 0,
    currentQuestion: 0,
    gameWords: {
      words: [],
      answerVariants: [],
      answerRezults: [],
    },
  };

  if (props.gameOptions.wayToGetWords === wayToGetWords.byPage) {
    props.gameOptions.gameLevel =
      props.userSettings.schoolbookCurrentPosition.chapter;
    props.sprintGame.gameWords.words = await generateGameWordsForSelectPage(
      props.userSettings,
      props.userSettings.schoolbookCurrentPosition.chapter,
      props.userSettings.schoolbookCurrentPosition.page,
      props.sprintGame.maxTotalWords
    ); // .then(console.log);
  } else {
    props.sprintGame.gameWords.words = await generateGameWordsForSelectLevel(
      props.userSettings,
      props.gameOptions.gameLevel,
      props.sprintGame.maxTotalWords
    ); // .then(console.log);
  }

  props.sprintGame.totalWords = props.sprintGame.gameWords.words.length;
  props.sprintGame.gameWords.answerRezults = new Array(
    props.sprintGame.totalWords
  );

  const totalWordsOfChapter = await getAllWordsFromChapter(
    props.gameOptions.gameLevel,
    totalWordsInChapter
  );

  props.sprintGame.gameWords.answerVariants =
    props.sprintGame.gameWords.words.map((item) =>
      getRandomTrueOrFalse()
        ? item.wordTranslate
        : totalWordsOfChapter[randomInteger(0, totalWordsOfChapter.length - 1)]
            .wordTranslate
    );

  // eslint-disable-next-line no-param-reassign
  // props.userSettings.currentPage = CurrentPage.sprintGame;

  if (props.sprintGame.totalWords > 0) {
    renderSprint(root, props);
  } else {
    renderSprint(root, props);
  }
}
