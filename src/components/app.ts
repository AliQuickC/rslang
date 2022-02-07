import state from '../modules/state';
import { CurrentPage, linkType, RenderPage } from '../modules/types';
import renderFooter from './footer';
import renderHeader from './header';

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

function activeMenuItem(): void {
  const header = document.querySelector('#header') as HTMLElement;
  const menuItems = header.querySelectorAll('.menu__item');

  menuItems.forEach((item) => {
    if ((<HTMLElement>item).dataset.link === linkType[state.currentPage]) {
      item.classList.add('active');
    } else {
      item.classList.remove('active');
    }
  });
}

function setPageState() {
  activeMenuItem();
}

function addEventsForApp(): void {
  const app = document.getElementById('app') as HTMLElement;
  const main = document.getElementById('main') as HTMLElement;

  document.body.addEventListener('click', async (e) => {
    if (e.target) {
      const linkName = (<HTMLElement>e.target).dataset.link;

      if (linkName) {
        switch (linkName) {
          case linkType.general:
            state.currentPage = CurrentPage.general;
            break;
          case linkType.aboutApp:
            state.currentPage = CurrentPage.aboutApp;
            break;
          case linkType.schoolbook:
            state.currentPage = CurrentPage.schoolbook;
            break;
          case linkType.audioCallGame:
            state.currentPage = CurrentPage.audioCallGame;
            break;
          case linkType.sprintGame:
            state.currentPage = CurrentPage.sprintGame;
            break;
          case linkType.statistics:
            state.currentPage = CurrentPage.statistics;
            break;
          case linkType.developmentTeam:
            state.currentPage = CurrentPage.developmentTeam;
            break;
          case linkType.login:
            state.authorized = !state.authorized;
            renderHeader(app.querySelector('#header') as HTMLElement);
            break;
          default:
            break;
        }
        RenderPage[state.currentPage](main);
        activeMenuItem();
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

  setPageState();
  addEventsForApp();
}
