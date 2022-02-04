import state from '../modules/state';
import { linkType } from '../modules/types';
import renderFooter from './footer';
import renderGeneralPage from './general-page';
import renderHeader from './header';
import renderTextbook from './textbook';

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
          console.log('linkName: ', linkName);
          break;
        case linkType.advantages:
          console.log('linkName: ', linkName);
          break;
        case linkType.textbook:
          renderTextbook(main);
          console.log('linkName: ', linkName);
          break;
        case linkType.audioCallGame:
          console.log('linkName: ', linkName);
          break;
        case linkType.sprintGame:
          console.log('linkName: ', linkName);
          break;
        case linkType.statistics:
          console.log('linkName: ', linkName);
          break;
        case linkType.developmentTeam:
          console.log('linkName: ', linkName);
          break;
        case linkType.login:
          state.authorized = !state.authorized;
          renderHeader(app.querySelector('#header') as HTMLElement);
          console.log('linkName: ', linkName);
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

  renderTextbook(rootElem.querySelector('#main') as HTMLElement);
}
