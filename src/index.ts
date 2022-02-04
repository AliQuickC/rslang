import './sass/main.sass';
import state from './modules/state';
import renderApp from './components/app';

(async function () {
  renderApp(document.getElementById('app') as HTMLElement);
})();
