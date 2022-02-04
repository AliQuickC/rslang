import { linkType } from '../modules/types';
import renderFooter from './footer';
import renderHeader from './header';
import renderMain from './main';

const toHTML = (): string => {
  return `
  <div class="app" id="app">
    <div class="container">
      <div class="tab-buttons select_none">
        <button class="tab-button garage-btn active" id="garage-btn">Garage</button>
        <button class="tab-button winners-btn" id="winners-btn">Winners</button>
      </div>
      <!-- /.tab-buttons -->

      <div class="app-page">

      </div>        
      <!-- /.app-page -->

    </div>
    
  </div>
  <!-- /.app -->
  `;
};

export default function renderApp(root: HTMLElement): void {
  const rootElem = root;
  rootElem.innerHTML = '';
  // const fragment = document.createDocumentFragment();
  renderHeader(rootElem);
  renderMain(rootElem);
  renderFooter(rootElem);
  // rootElem.append(fragment);
}
