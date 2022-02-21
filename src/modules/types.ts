import renderAboutApp from '../components/about-app';
import gameAudioCall from '../components/games/audio-call';
import renderGeneralPage from '../components/general-page';
import gameSprint from '../components/games/sprint';
import renderStatistics from '../components/statistics';
import renderTeam from '../components/team';
import renderSchoolbook from '../components/schoolbook';
import renderSelectGameLevel from '../components/games/select-level';
import { gameName, gameNameEnum } from '../components/utilites/types';

export enum linkType {
  general = 'general',
  aboutApp = 'aboutApp',
  schoolbook = 'schoolbook',
  audioCallGameLevel = 'audio-call-game-level',
  sprintGameLevel = 'sprint-game-level',
  audioCallGame = 'audio-call-game-page',
  sprintGame = 'sprint-game-page',
  statistics = 'statistics',
  developmentTeam = 'development-team',
  login = 'login',
}

export enum CurrentPage {
  general = 'general',
  aboutApp = 'aboutApp',
  schoolbook = 'schoolbook',
  audioCallGameLevel = 'audioCallGameLevel',
  sprintGameLevel = 'sprintGameLevel',
  audioCallGame = 'audioCallGame',
  sprintGame = 'sprintGame',
  statistics = 'statistics',
  developmentTeam = 'developmentTeam',
}

export const RenderPage = {
  general: renderGeneralPage,
  aboutApp: renderAboutApp,
  schoolbook: renderSchoolbook,
  audioCallGameLevel: renderSelectGameLevel,
  sprintGameLevel: renderSelectGameLevel,
  audioCallGame: gameAudioCall,
  sprintGame: gameSprint,
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

export enum GameName {
  AudioCall = 'AudioCall',
  Sprint = 'Sprint',
}

export enum wayToGetWords {
  byLevel = 'byLevel',
  byPage = 'byPage',
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

export interface IGameStatistics {
  newWords: number;
  rightCount: number;
  bestSeries: number;
}

export interface IDayStatistics {
  newWords: number;
  learned: number;
}

export interface IDay {
  currentDay: string;
  statistics: IDayStatistics[];
}

export interface IStatisticsOptional {
  currentGame: gameName;
  audioChallenge: IGameStatistics;
  sprint: IGameStatistics;
  day: IDay;
}

export interface IStatistics {
  learnedWords: number;
  optional: IStatisticsOptional;
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
  statistics?: IStatistics;
  authData?: Auth;
}

export interface GameWords {
  words: CurrentPageWord[];
  answerVariants: string[];
  answerRezults: boolean[];
}

export interface sprintGame {
  maxTotalWords: number;
  totalWords: number;
  currentQuestion: number;
  gameWords: GameWords;
}

export interface State {
  userSettings: UserSettings;
  isExploreCurrentChapterPages: boolean[];
  currentPageWords: CurrentPageWord[];
  currentMenuItem: CurrentPage;
  gameOptions: {
    selectGame: GameName;
    wayToGetWords: wayToGetWords;
    gameLevel: number;
  };
  sprintGame: sprintGame;
}
