import {
  CurrentPage,
  linkType,
  RenderPage,
  State,
  UserSettings,
} from '../modules/types';
import renderAudioCall from './audio-call';
import renderFooter from './footer';
import renderSelectGameLevel from './games/select-level';
import renderHeader, { activateMenuItem } from './header';
import renderSprint from './sprint';

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

function setPageState(props: State) {
  activateMenuItem(props);
}

function addEventsForApp(param: State): void {
  const userAuthInstance = new UserAuthorization(param);
  const userAuthorizationElement = userAuthInstance.readyElement;

  const userSett = param.userSettings;
  const props = param;
  const app = document.getElementById('app') as HTMLElement;
  const main = document.getElementById('main') as HTMLElement;

  document.body.addEventListener('click', async (e) => {
    if (e.target) {
      const linkName = (<HTMLElement>e.target).dataset.link;
      const currentTarget = e.currentTarget as HTMLElement;

      if (linkName) {
        switch (linkName) {
          case linkType.general:
            userSett.currentPage = CurrentPage.general;
            props.currentMenuItem = CurrentPage.general;
            break;
          case linkType.aboutApp:
            userSett.currentPage = CurrentPage.aboutApp;
            props.currentMenuItem = CurrentPage.aboutApp;
            break;
          case linkType.schoolbook:
            userSett.currentPage = CurrentPage.schoolbook;
            props.currentMenuItem = CurrentPage.schoolbook;
            userSett.schoolbookCurrentPosition.chapter = 0;
            break;
          case linkType.audioCallGameLevel:
            props.currentMenuItem = CurrentPage.audioCallGameLevel;
            renderSelectGameLevel(main, param);
            activateMenuItem(props);
            return;
          case linkType.sprintGameLevel:
            props.currentMenuItem = CurrentPage.sprintGameLevel;
            renderSelectGameLevel(main, param);
            activateMenuItem(props);
            return;
          case linkType.audioCallGame:
            props.currentMenuItem = CurrentPage.audioCallGameLevel;
            renderAudioCall(main);
            activateMenuItem(props);
            return;
          case linkType.sprintGame:
            props.currentMenuItem = CurrentPage.sprintGameLevel;
            renderSprint(main);
            activateMenuItem(props);
            return;
          case linkType.statistics:
            userSett.currentPage = CurrentPage.statistics;
            props.currentMenuItem = CurrentPage.statistics;
            break;
          case linkType.developmentTeam:
            userSett.currentPage = CurrentPage.developmentTeam;
            props.currentMenuItem = CurrentPage.developmentTeam;
            break;
          case linkType.login:
            if (!userSett.authorized) {
              currentTarget.append(userAuthorizationElement);
            } else {
              userSett.authorized = false;
              delete userSett.authData;
              renderHeader(app.querySelector('#header') as HTMLElement, param);
            }
            break;
          default:
            break;
        }
        RenderPage[userSett.currentPage](main, param);
        activateMenuItem(props);
      }
    }
  });
}

export default function renderApp(root: HTMLElement, props: State): void {
  const rootElem = root;
  rootElem.innerHTML = toHTML();

  renderHeader(rootElem.querySelector('#header') as HTMLElement, props);
  RenderPage[(<UserSettings>props.userSettings).currentPage](
    rootElem.querySelector('#main') as HTMLElement,
    props
  );
  renderFooter(rootElem.querySelector('#footer') as HTMLElement);

  setPageState(props);
  addEventsForApp(props);
}
