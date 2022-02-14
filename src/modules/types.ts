import renderAboutApp from '../components/about-app';
import renderAudioCall from '../components/audio-call';
import renderGeneralPage from '../components/general-page';
import renderSprint from '../components/sprint';
import renderStatistics from '../components/statistics';
import renderTeam from '../components/team';
import renderSchoolbook from '../components/schoolbook';

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

export enum WordCardBtn {
  sound = 'sound',
  easy = 'easy',
  difficult = 'difficult',
}
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

export enum Difficulty {
  easy = 'easy',
  basic = 'basic',
  difficult = 'difficult',
}

export interface UserWordOptionals {
  answerResultArray: boolean[];
}
export interface UserWord {
  difficulty: Difficulty;
  optional: UserWordOptionals;
}

export interface AggregatedWord {
  _id: string;
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

export interface aggregatedUserWord extends AggregatedWord {
  userWord: UserWord | undefined;
}

export interface CurrentPageWord extends Word {
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

export interface UserSettings {
  authorized: boolean;
  currentPage: CurrentPage;
  schoolbookCurrentPosition: {
    chapter: number;
    page: number;
  };

  authData?: Auth;
}

export interface State {
  userSettings: UserSettings;
  currentChapterPage: boolean[];
  currentPageWords: CurrentPageWord[];
}
