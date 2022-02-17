import { State, wayToGetWords } from '../../modules/types';
import {
  generateGameWordsForSelectLevel,
  generateGameWordsForSelectPage,
} from './game-words';

const toHTML = (): string => {
  return `  
    <section class="section sprint" id="sprint">
      <div class="container">
        <h2>Sprint Game</h2>
      </div>
    </section>
  `;
};

function renderSprint(root: HTMLElement): void {
  const elem = root;

  elem.innerHTML = toHTML();
}

export default async function gameSprint(root: HTMLElement, props: State) {
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
  renderSprint(root);
}
