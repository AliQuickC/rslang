import {
  Auth,
  CurrentPage,
  GameName,
  IStatistics,
  sprintGame,
  UserSettings,
  wayToGetWords,
} from './types';

export const defaultUserSettings: UserSettings = {
  authorized: false,
  currentPage: CurrentPage.general,
  schoolbookCurrentPosition: {
    chapter: 0,
    page: 0,
  },
  statistics: {} as IStatistics,
  authData: {} as Auth,
};

const state = {
  userSettings: {} as UserSettings,
  isExploreCurrentChapterPages: [],
  currentPageWords: [],
  currentMenuItem: CurrentPage.general,
  gameOptions: {
    selectGame: GameName.AudioCall,
    wayToGetWords: wayToGetWords.byLevel,
    gameLevel: 1,
  },
  sprintGame: {} as sprintGame,
};
export default state;
