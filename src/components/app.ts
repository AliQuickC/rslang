import {
  CurrentPage,
  GameName,
  linkType,
  RenderPage,
  State,
  UserSettings,
  wayToGetWords,
} from '../modules/types';
import renderHeader, { activateMenuItem } from './header';
import renderFooter from './footer';
import UserAuthorization from './user-authorization/user-authorization';
import renderSelectGameLevel from './games/select-level';
import gameAudioCall from './games/audio-call';
import gameSprint from './games/sprint';

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
      const gameLevel = (<HTMLElement>e.target).dataset.level;
      const currentTarget = e.currentTarget as HTMLElement;

      // generateGameWordsForSelectLevel(props: State, level: number);
      // generateGameWordsForSelectPage(chapter: number, page: number);

      if (gameLevel) {
        props.gameOptions.selectGame = (<HTMLElement>e.target).dataset
          .gameName as GameName;
        props.gameOptions.wayToGetWords = wayToGetWords.byLevel;
        props.gameOptions.gameLevel = Number(gameLevel);
        if (props.gameOptions.selectGame === GameName.Sprint) {
          gameSprint(main, props);
        } else {
          gameAudioCall(main, props);
        }
      }

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
            props.gameOptions.selectGame = GameName.AudioCall;
            renderSelectGameLevel(main, param);
            activateMenuItem(props);
            return;
          case linkType.sprintGameLevel:
            props.currentMenuItem = CurrentPage.sprintGameLevel;
            props.gameOptions.selectGame = GameName.Sprint;
            renderSelectGameLevel(main, param);
            activateMenuItem(props);
            return;
          case linkType.audioCallGame:
            props.currentMenuItem = CurrentPage.audioCallGameLevel;

            props.gameOptions.wayToGetWords = wayToGetWords.byPage;
            gameAudioCall(main, props);

            activateMenuItem(props);
            return;
          case linkType.sprintGame:
            props.currentMenuItem = CurrentPage.sprintGameLevel;

            props.gameOptions.wayToGetWords = wayToGetWords.byPage;
            gameSprint(main, props);

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
