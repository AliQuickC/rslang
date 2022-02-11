import './sass/main.sass';
import state, { defaultUserSettings } from './modules/state';
import renderApp from './components/app';
import { createUserWord, getUserWordById, getUserWords, saveUserWord, updateUserWord } from './modules/api';
import { Difficulty } from './modules/types';

state.userSettings = defaultUserSettings;
const storeKEY = 'rslangSettings';

(async function () {
  function getLocalStorage(): void {
    if (
      !localStorage.getItem(storeKEY) ||
      localStorage.getItem(storeKEY) === '{}'
    ) {
      const strSett = JSON.stringify(defaultUserSettings);
      localStorage.setItem(storeKEY, strSett);
    }

    state.userSettings = JSON.parse(localStorage.getItem(storeKEY) as string);
  }

  function setItemToLocalStorage(): void {
    localStorage.setItem(storeKEY, JSON.stringify(state.userSettings));
  }
  window.addEventListener('beforeunload', setItemToLocalStorage);

  getLocalStorage();

  // createUserWord(
  //   state.userSettings.authData.userId,
  //   '5e9f5ee35eb9e72bc21af4a4',
  //   state.userSettings.authData.token,
  //   {
  //     difficulty: Difficulty.easy,
  //     optional: { answerResultArray: [true, false, true, false, true] },
  //   }
  // ).then(console.log);

  // getUserWordById(
  //   state.userSettings.authData.userId,
  //   '5e9f5ee35eb9e72bc21af4a2',
  //   state.userSettings.authData.token
  // ).then(console.log);

  // updateUserWord(
  //   state.userSettings.authData.userId,
  //   '5e9f5ee35eb9e72bc21af4a2',
  //   state.userSettings.authData.token,
  //   {
  //     difficulty: Difficulty.easy,
  //     optional: { answerResultArray: [true, true, true, false, false] },
  //   }
  // ).then(console.log);

  // getUserWords(
  //   state.userSettings.authData.userId,
  //   state.userSettings.authData.token
  // ).then(console.log);

  state.userSettings.authData.token =
    'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYxZmE3MzhlZjNkMzRhMDAxNjk1NGU4OSIsImlhdCI6MTY0NDU5NDkyNiwiZXhwIjoxNjQ0NjA5MzI2fQ.KRPejyhCsnyfqYdHujB-W7Q9-6YWuiZy2pf6Ga11l94';
  state.userSettings.authData.userId = '61fa738ef3d34a0016954e89';

  renderApp(document.getElementById('app') as HTMLElement, state);
})();
