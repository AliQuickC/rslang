import {
  Auth,
  CurrentPage,
  GameName,
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
  authData: {} as Auth,
};

const state = {
  userSettings: {} as UserSettings,
  currentChapterPage: [],
  currentPageWords: [],
  currentMenuItem: CurrentPage.general,
  gameOptions: {
    selectGame: GameName.AudioCall,
    wayToGetWords: wayToGetWords.byLevel,
    gameLevel: 1,
  },
};
export default state;
