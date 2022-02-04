import state from '../modules/state';
import { linkType } from '../modules/types';
import renderAudioCall from './audio-call';
import renderFooter from './footer';
import renderGeneralPage from './general-page';
import renderHeader from './header';
import renderSprint from './sprint';
import renderTextbook from './textbook';
import renderStatistics from './statistics';
import renderTeam from './team';
import renderAboutApp from './about-app';

const toHTML = (): string => {
  return `
  <header class="header" id="header">
  </header>
  <main class="main" id="main">
  </main>
  <footer class="footer" id="footer">
  </footer>  
  `;
};

function addEventsForApp(): void {
  const app = document.getElementById('app') as HTMLElement;
  const main = document.getElementById('main') as HTMLElement;

  document.body.addEventListener('click', async (e) => {
    if (e.target) {
      const linkName = (<HTMLElement>e.target).dataset.link;

      switch (linkName) {
        case linkType.general:
          renderGeneralPage(main);
          break;
        case linkType.advantages:
          renderAboutApp(main);
          break;
        case linkType.textbook:
          renderTextbook(main);
          break;
        case linkType.audioCallGame:
          renderAudioCall(main);
          break;
        case linkType.sprintGame:
          renderSprint(main);
          break;
        case linkType.statistics:
          renderStatistics(main);
          break;
        case linkType.developmentTeam:
          renderTeam(main);
          break;
        case linkType.login:
          state.authorized = !state.authorized;
          renderHeader(app.querySelector('#header') as HTMLElement);
          break;
        default:
          break;
      }
    }
  });
}

export default function renderApp(root: HTMLElement): void {
  const rootElem = root;
  rootElem.innerHTML = toHTML();

  renderHeader(rootElem.querySelector('#header') as HTMLElement);
  renderGeneralPage(rootElem.querySelector('#main') as HTMLElement);
  renderFooter(rootElem.querySelector('#footer') as HTMLElement);

  addEventsForApp();

  // renderTextbook(rootElem.querySelector('#main') as HTMLElement);
}
