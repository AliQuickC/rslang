import { linkType } from '../modules/types';
import renderGeneralPage from './general-page';
import renderTextbook from './textbook';

const toHTML = (): string => {
  return `
  <main class="main">
    <div class="container main-container">
      
    </div>
  </main>
  <!-- /.main -->
  `;
};

function addEventsForMain(): void {
  const main = document.getElementById('main') as HTMLElement;

  document.body.addEventListener('click', async (e) => {
    if (e.target) {
      const linkName = (<HTMLElement>e.target).dataset.link;

      switch (linkName) {
        case linkType.general:
          renderGeneralPage(main);
          console.log('linkName: ', linkName);
          break;
        case linkType.advantages:
          console.log('linkName: ', linkName);
          break;
        case linkType.textbook:
          renderTextbook(main);
          console.log('linkName: ', linkName);
          break;
        case linkType.audioCallGame:
          console.log('linkName: ', linkName);
          break;
        case linkType.sprintGame:
          console.log('linkName: ', linkName);
          break;
        case linkType.statistics:
          console.log('linkName: ', linkName);
          break;
        case linkType.developmentTeam:
          console.log('linkName: ', linkName);
          break;
        case linkType.login:
          console.log('linkName: ', linkName);
          break;
        default:
          break;
      }
    }
  });
}

export default function renderMain(root: HTMLElement): void {
  const elem = document.createElement('main');
  elem.classList.add('main');
  elem.id = 'main';
  root.append(elem);

  renderGeneralPage(elem);

  addEventsForMain();
}
