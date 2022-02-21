import { State, wayToGetWords } from '../../modules/types';
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
  console.log(props)
  const gameInstance = new Game(props);
  const gameElement = () => root.querySelector('.container') as HTMLElement

  if (props.gameOptions.wayToGetWords === wayToGetWords.byPage) {
    gameInstance.getDataForGameFromBook(props).then((element) => {
      gameElement().append(element);
    });

  } else {
    gameInstance
      .getDataForGame(props.gameOptions.gameLevel - 1)
      .then((element) => {
        gameElement().append(element);
      });
  }

  renderAudioCall(root);
}
