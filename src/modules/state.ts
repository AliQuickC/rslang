import { Auth, CurrentPage, UserSettings } from './types';

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
};
export default state;
