import './sass/main.sass';
import state, { defaultUserSettings } from './modules/state';
import renderApp from './components/app';

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

  // state.userSettings.authData.token =
  //   'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYxZmE3MzhlZjNkMzRhMDAxNjk1NGU4OSIsImlhdCI6MTY0NDc1NjE1OCwiZXhwIjoxNjQ0NzcwNTU4fQ.A2KvjBUcM1VOeuUoo-oxhIFyZwiLcQwKFp1RzspF440';
  // state.userSettings.authData.userId = '61fa738ef3d34a0016954e89';

  renderApp(document.getElementById('app') as HTMLElement, state);
})();
