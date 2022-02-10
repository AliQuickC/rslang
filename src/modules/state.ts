import { CurrentPage, UserSettings } from './types';

export const defaultUserSettings: UserSettings = {
  authorized: false,
  currentPage: CurrentPage.general as CurrentPage,
  schoolbookCurrentPosition: {
    chapter: 0,
    page: 0,
  },
};

const state = {
  userSettings: {} as UserSettings,
  currentPageWords: [],
};
export default state;
