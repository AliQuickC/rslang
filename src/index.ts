import './sass/main.sass';
import renderApp from './components/app';

(async function () {
  renderApp(document.getElementById('app') as HTMLElement);
})();
