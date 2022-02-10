import { getWordById } from '../modules/api';
import { State, UserSettings, WordCardBtn } from '../modules/types';
import renderSchoolbookContent from './schoolbook-content';

const audio = new Audio();
const fileServer = 'https://learnwords-app.herokuapp.com/';

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

  (<HTMLElement>schoolbook).addEventListener(
    'click',
    async (e): Promise<void> => {
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
          return;
        }

        if (pageLink) {
          props.schoolbookCurrentPosition.page = Number(pageLink);
          renderSchoolbookContent(
            (<HTMLElement>schoolbook).querySelector(
              '#schoolbook-content'
            ) as HTMLElement,
            props
          );
          return;
        }

        if ((<HTMLElement>e.target).classList.contains('word__btn')) {
          const wordCard = (<HTMLElement>e.target).closest('.word');
          const { wordId } = (<HTMLElement>wordCard).dataset;
          const wordBtnType = (<HTMLElement>e.target).dataset.wordBtn;

          switch (wordBtnType) {
            case WordCardBtn.sound:
              getWordById(wordId as string).then((wordObj) => {
                if (audio.paused) {
                  audio.volume = 0.3;
                  audio.src = fileServer + wordObj.audio;
                  audio.play();
                  audio.onended = () => {
                    audio.src = fileServer + wordObj.audioMeaning;
                    audio.play();
                    audio.onended = () => {
                      audio.src = fileServer + wordObj.audioExample;
                      audio.play();
                      audio.onended = null;
                    };
                  };
                }
              });
              break;
            case WordCardBtn.easy:
              // console.log('wordBtnType: ', wordBtnType);
              break;
            case WordCardBtn.difficult:
              // console.log('wordBtnType: ', wordBtnType);
              break;
            default:
              break;
          }
        }
      }
    }
  );
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
