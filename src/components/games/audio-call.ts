import { State, wayToGetWords } from '../../modules/types';
import {
  generateGameWordsForSelectLevel,
  generateGameWordsForSelectPage,
} from './game-words';

const toHTML = (): string => {
  return `  
    <section class="section audio-call" id="audio-call">
      <div class="container">
        <h2>Audio Call Game</h2>
      </div>
    </section>
  `;
};

export default function renderAudioCall(root: HTMLElement): void {
  const elem = root;

  elem.innerHTML = toHTML();
}

export async function gameAudioCall(props: State, root: HTMLElement) {
  if (props.gameOptions.wayToGetWords === wayToGetWords.byPage) {
    await generateGameWordsForSelectPage(
      props.userSettings,
      props.userSettings.schoolbookCurrentPosition.chapter,
      props.userSettings.schoolbookCurrentPosition.page
    ).then(console.log);
  } else {
    generateGameWordsForSelectLevel(
      props.userSettings,
      props.gameOptions.gameLevel
    ).then(console.log);
  }
  renderAudioCall(root);
}
