import state from '../modules/state';
import { CurrentPage, linkType, RenderPage } from '../modules/types';
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
          state.currentPage = CurrentPage.general;
          RenderPage[state.currentPage](main);
          break;
        case linkType.aboutApp:
          state.currentPage = CurrentPage.aboutApp;
          RenderPage[state.currentPage](main);
          break;
        case linkType.textbook:
          state.currentPage = CurrentPage.textbook;
          RenderPage[state.currentPage](main);
          break;
        case linkType.audioCallGame:
          state.currentPage = CurrentPage.audioCallGame;
          RenderPage[state.currentPage](main);
          break;
        case linkType.sprintGame:
          state.currentPage = CurrentPage.sprintGame;
          RenderPage[state.currentPage](main);
          break;
        case linkType.statistics:
          state.currentPage = CurrentPage.statistics;
          RenderPage[state.currentPage](main);
          break;
        case linkType.developmentTeam:
          state.currentPage = CurrentPage.developmentTeam;
          RenderPage[state.currentPage](main);
          break;
        case linkType.login:
          state.authorized = !state.authorized;
          renderHeader(app.querySelector('#header') as HTMLElement);
          RenderPage[state.currentPage](main);
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
  RenderPage[state.currentPage](rootElem.querySelector('#main') as HTMLElement);
  renderFooter(rootElem.querySelector('#footer') as HTMLElement);

  addEventsForApp();
}
