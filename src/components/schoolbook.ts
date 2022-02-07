import { State, UserSettings } from '../modules/types';
import renderSchoolbookContent from './schoolbook-content';

const toHTML = (props: UserSettings): string => {
  return `  
    <section class="section schoolbook" id="schoolbook">
      <div class="container">
        <div class="chapters-wrap">
          <button class="chapter-tab chapter1-tab" data-chapter-number="1">Раздел 1</button>
          <button class="chapter-tab chapter2-tab" data-chapter-number="2">Раздел 2</button>
          <button class="chapter-tab chapter3-tab" data-chapter-number="3">Раздел 3</button>
          <button class="chapter-tab chapter4-tab" data-chapter-number="4">Раздел 4</button>
          <button class="chapter-tab chapter5-tab" data-chapter-number="5">Раздел 5</button>
          <button class="chapter-tab chapter6-tab" data-chapter-number="6">Раздел 6</button>
          ${
            props.authorized
              ? '<button class="chapter-tab chapter7-tab" data-chapter-number="7">Сложные слова</button>'
              : ''
          }
        </div>
        <div class="schoolbook-content" id="schoolbook-content">
        </div>
      </div>
    </section>
  `;
};

function addEventsForSchoolbook(param: UserSettings) {
  const props = param;
  const unselectedPage = 0;
  const schoolbook = document.getElementById('schoolbook');

  (<HTMLElement>schoolbook).addEventListener('click', async (e) => {
    if (e.target) {
      const chapterLink = (<HTMLElement>e.target).dataset.chapterNumber;
      const pageLink = (<HTMLElement>e.target).dataset.pageNumber;

      if (chapterLink) {
        props.schoolbookCurrentPosition.chapter = Number(chapterLink);
        props.schoolbookCurrentPosition.page = unselectedPage;
        renderSchoolbookContent(
          (<HTMLElement>schoolbook).querySelector(
            '#schoolbook-content'
          ) as HTMLElement,
          props
        );
      }

      if (pageLink) {
        props.schoolbookCurrentPosition.page = Number(pageLink);
        renderSchoolbookContent(
          (<HTMLElement>schoolbook).querySelector(
            '#schoolbook-content'
          ) as HTMLElement,
          props
        );
      }
    }
  });
}

export default function renderSchoolbook(
  root: HTMLElement,
  props: State
): void {
  const elem = root;

  elem.innerHTML = toHTML(props.userSettings);

  renderSchoolbookContent(
    elem.querySelector('#schoolbook-content') as HTMLElement,
    props.userSettings
  );

  addEventsForSchoolbook(props.userSettings);
}
