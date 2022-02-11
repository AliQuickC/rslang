import {
  CurrentPage,
  linkType,
  RenderPage,
  State,
  UserSettings,
} from '../modules/types';
import renderAudioCall from './audio-call';
import renderFooter from './footer';
import renderGeneralPage from './general-page';
import renderHeader from './header';
import renderSprint from './sprint';
import renderSchoolbook from './schoolbook';
import renderStatistics from './statistics';
import renderTeam from './team';
import renderAboutApp from './about-app';

import UserAuthorization from './user-authorization/user-authorization';

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

function activeMenuItem(props: UserSettings): void {
  const header = document.querySelector('#header') as HTMLElement;
  const menuItems = header.querySelectorAll('.menu__item');

  menuItems.forEach((item) => {
    if ((<HTMLElement>item).dataset.link === linkType[props.currentPage]) {
      item.classList.add('active');
    } else {
      item.classList.remove('active');
    }
  });
}

function setPageState(props: UserSettings) {
  activeMenuItem(props);
}

function addEventsForApp(param: State): void {

  const userAuthInstance = new UserAuthorization(param);
  const userAuthorizationElement = userAuthInstance.readyElement;

  const props = param.userSettings;
  const app = document.getElementById('app') as HTMLElement;
  const main = document.getElementById('main') as HTMLElement;

  document.body.addEventListener('click', async (e) => {
    if (e.target) {
      const linkName = (<HTMLElement>e.target).dataset.link;
      const currentTarget = e.currentTarget as HTMLElement;


      if (linkName) {
        switch (linkName) {
          case linkType.general:
            props.currentPage = CurrentPage.general;
            break;
          case linkType.aboutApp:
            props.currentPage = CurrentPage.aboutApp;
            break;
          case linkType.schoolbook:
            props.currentPage = CurrentPage.schoolbook;
            break;
          case linkType.audioCallGame:
            props.currentPage = CurrentPage.audioCallGame;
            break;
          case linkType.sprintGame:
            props.currentPage = CurrentPage.sprintGame;
            break;
          case linkType.statistics:
            props.currentPage = CurrentPage.statistics;
            break;
          case linkType.developmentTeam:
            props.currentPage = CurrentPage.developmentTeam;
            break;
          case linkType.login:
            if (!props.authorized){
              currentTarget.append(userAuthorizationElement);
            } else {
              props.authorized = false;
              renderHeader(app.querySelector('#header') as HTMLElement, props);
            }
            break;
          default:
            break;
        }
        RenderPage[props.currentPage](main, param);
        activeMenuItem(props);
      }
    }
  });
}

export default function renderApp(root: HTMLElement, props: State): void {
  const rootElem = root;
  rootElem.innerHTML = toHTML();

  renderHeader(
    rootElem.querySelector('#header') as HTMLElement,
    props.userSettings
  );
  RenderPage[(<UserSettings>props.userSettings).currentPage](
    rootElem.querySelector('#main') as HTMLElement,
    props
  );
  renderFooter(rootElem.querySelector('#footer') as HTMLElement);

  setPageState(props.userSettings);
  addEventsForApp(props);
}
