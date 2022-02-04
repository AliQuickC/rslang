import renderAboutApp from '../components/about-app';
import renderAudioCall from '../components/audio-call';
import renderGeneralPage from '../components/general-page';
import renderSprint from '../components/sprint';
import renderStatistics from '../components/statistics';
import renderTeam from '../components/team';
import renderTextbook from '../components/textbook';

// eslint-disable-next-line no-shadow
export enum linkType {
  general = 'general',
  aboutApp = 'aboutApp',
  textbook = 'textbook',
  audioCallGame = 'audio-call-game',
  sprintGame = 'sprint-game',
  statistics = 'statistics',
  developmentTeam = 'development-team',
  login = 'login',
}

// eslint-disable-next-line no-shadow
export enum CurrentPage {
  general = 'general',
  aboutApp = 'aboutApp',
  textbook = 'textbook',
  audioCallGame = 'audioCallGame',
  sprintGame = 'sprintGame',
  statistics = 'statistics',
  developmentTeam = 'developmentTeam',
}

export const RenderPage = {
  general: renderGeneralPage,
  aboutApp: renderAboutApp,
  textbook: renderTextbook,
  audioCallGame: renderAudioCall,
  sprintGame: renderSprint,
  statistics: renderStatistics,
  developmentTeam: renderTeam,
};
