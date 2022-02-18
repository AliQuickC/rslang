import {
  CurrentPage,
  CurrentPageWord,
  GameWords,
  sprintGame,
  State,
  wayToGetWords,
} from '../../modules/types';
import { getRandomTrueOrFalse, randomInteger } from '../../modules/utils';
import {
  generateGameWordsForSelectLevel,
  generateGameWordsForSelectPage,
} from './game-words';

const toHTML = (gameWords: GameWords, questionNumb: number): string => {
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

function renderSprint(root: HTMLElement, gameData: sprintGame): void {
  const elem = root;

  if (gameData.currentQuestion <= gameData.totalWords) {
    elem.innerHTML = toHTML(gameData.gameWords, gameData.currentQuestion);
  }
}

export default async function gameSprint(root: HTMLElement, props: State) {
  const sprintGame: sprintGame = {
    totalWords: 0,
    currentQuestion: 0,
    gameWords: {
      words: [],
      answerVariants: [],
      answerRezults: [],
    },
  };

  if (props.gameOptions.wayToGetWords === wayToGetWords.byPage) {
    sprintGame.gameWords.words = await generateGameWordsForSelectPage(
      props.userSettings,
      props.userSettings.schoolbookCurrentPosition.chapter,
      props.userSettings.schoolbookCurrentPosition.page,
      25
    ); // .then(console.log);
  } else {
    sprintGame.gameWords.words = await generateGameWordsForSelectLevel(
      props.userSettings,
      props.gameOptions.gameLevel,
      25
    ); // .then(console.log);
  }

  sprintGame.totalWords = sprintGame.gameWords.words.length;

  sprintGame.gameWords.answerVariants = sprintGame.gameWords.words.map(
    (item, index, array) =>
      getRandomTrueOrFalse()
        ? item.wordTranslate
        : array[randomInteger(0, array.length - 1)].wordTranslate
  );

  // eslint-disable-next-line no-param-reassign
  // props.userSettings.currentPage = CurrentPage.sprintGame;

  if (sprintGame.totalWords > 0) {
    renderSprint(root, sprintGame);
  }
}
