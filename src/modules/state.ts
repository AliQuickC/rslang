import { CurrentPage, UserSettings } from './types';

export const defaultUserSettings: UserSettings = {
  authorized: false,
  currentPage: CurrentPage.general as CurrentPage,
  schoolbookCurrentPosition: {
    chapter: 1,
    page: 1,
  },
};

const state = {
  userSettings: {} as UserSettings,
};
export default state;
