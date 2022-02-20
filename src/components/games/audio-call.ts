import { State, wayToGetWords } from '../../modules/types';
import {
  generateGameWordsForSelectLevel,
  generateGameWordsForSelectPage,
} from './game-words';
import Game from '../audio-challenge-game/game-class';



const toHTML = (): string => {
  return `  
    <section class="section audio-call" id="audio-call">
      <div class="container">
        <h2>Audio Call Game</h2>
      </div>
    </section>
  `;
};

function renderAudioCall(root: HTMLElement): void {
  const elem = root;

  elem.innerHTML = toHTML();
}

export default function gameAudioCall(root: HTMLElement, props: State) {
  const gameInstance = new Game(props);
  if (props.gameOptions.wayToGetWords === wayToGetWords.byPage) {
    gameInstance.getDataForGameFromBook(props).then((element) => {
      root.append(element);
    });
    // await generateGameWordsForSelectPage(
    //   props.userSettings,
    //   props.userSettings.schoolbookCurrentPosition.chapter,
    //   props.userSettings.schoolbookCurrentPosition.page
    // ).then(console.log);
  } else {
    gameInstance
      .getDataForGame(props.gameOptions.gameLevel - 1)
      .then((element) => {
        root.append(element);
      });
    // console.log(props.gameOptions.gameLevel)
    // generateGameWordsForSelectLevel(
    //   props.userSettings,
    //   props.gameOptions.gameLevel
    // ).then(console.log);
  }
  console.log(props.gameOptions.selectGame)
  renderAudioCall(root);
}
