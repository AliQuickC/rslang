import { State, wayToGetWords } from '../../modules/types';
import {
  generateGameWordsForSelectLevel,
  generateGameWordsForSelectPage,
} from './game-words';
import Game from '../audio-challenge-game/game-class';

const gameInstance = new Game();

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

export default async function gameAudioCall(root: HTMLElement, props: State) {
  if (props.gameOptions.wayToGetWords === wayToGetWords.byPage) {
    await generateGameWordsForSelectPage(
      props.userSettings,
      props.userSettings.schoolbookCurrentPosition.chapter,
      props.userSettings.schoolbookCurrentPosition.page
    ).then(console.log);
  } else {
    gameInstance.getDataForGame(props.gameOptions.gameLevel).then((element) => {
      root.append(element);
    });
    // generateGameWordsForSelectLevel(
    //   props.userSettings,
    //   props.gameOptions.gameLevel
    // ).then(console.log);
  }
  renderAudioCall(root);
}
