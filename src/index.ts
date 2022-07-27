import './sass/main.sass';
import state, { defaultUserSettings } from './modules/state';
import renderApp from './components/app';

state.userSettings = defaultUserSettings;
const storeKEY = 'rslangSettings';

(async function start() {
  function getLocalStorage(): void {
    if (
      !localStorage.getItem(storeKEY) ||
      localStorage.getItem(storeKEY) === '{}'
    ) {
      const strSett = JSON.stringify(defaultUserSettings);
      localStorage.setItem(storeKEY, strSett);
    }

    state.userSettings = JSON.parse(localStorage.getItem(storeKEY) as string);
    state.currentMenuItem = state.userSettings.currentPage;
  }

  function setItemToLocalStorage(): void {
    localStorage.setItem(storeKEY, JSON.stringify(state.userSettings));
  }
  window.addEventListener('beforeunload', setItemToLocalStorage);

  getLocalStorage();
  renderApp(document.getElementById('app') as HTMLElement, state);
})();
