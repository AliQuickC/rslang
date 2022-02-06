import renderAboutApp from '../components/about-app';
import renderAudioCall from '../components/audio-call';
import renderGeneralPage from '../components/general-page';
import renderSprint from '../components/sprint';
import renderStatistics from '../components/statistics';
import renderTeam from '../components/team';
import renderSchoolbook from '../components/schoolbook';

// eslint-disable-next-line no-shadow
export enum linkType {
  general = 'general',
  aboutApp = 'aboutApp',
  schoolbook = 'schoolbook',
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
  schoolbook = 'schoolbook',
  audioCallGame = 'audioCallGame',
  sprintGame = 'sprintGame',
  statistics = 'statistics',
  developmentTeam = 'developmentTeam',
}

export const RenderPage = {
  general: renderGeneralPage,
  aboutApp: renderAboutApp,
  schoolbook: renderSchoolbook,
  audioCallGame: renderAudioCall,
  sprintGame: renderSprint,
  statistics: renderStatistics,
  developmentTeam: renderTeam,
};

export interface Word {
  id: string;
  group: number;
  page: number;
  word: string;
  image: string;
  audio: string;
  audioMeaning: string;
  audioExample: string;
  textMeaning: string;
  textExample: string;
  transcription: string;
  textExampleTranslate: string;
  textMeaningTranslate: string;
  wordTranslate: string;
}

export interface UserWord {
  difficulty: string;
  optional: object;
}

export interface aggregatedUserWord extends Word {
  userWord: UserWord | undefined;
}

export type aggregatedUserWords = [
  {
    paginatedResults: aggregatedUserWord[] | [];
    totalCount: [{ count: number }] | [];
  }
];

export interface Statistic {
  learnedWords: number;
  optional: object;
}

export interface Setting {
  wordsPerDay: number;
  optional: object;
}

export interface User {
  name: string;
  email: string;
  password: string;
}

export interface Auth {
  message: string;
  token: string;
  refreshToken: string;
  userId: string;
  name: string;
}
