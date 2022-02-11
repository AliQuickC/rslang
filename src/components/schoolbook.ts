import { getWordById, saveUserWord, updateUserWord } from '../modules/api';
import {
  CurrentPageWord,
  Difficulty,
  State,
  UserSettings,
  UserWord,
  WordCardBtn,
} from '../modules/types';
import renderSchoolbookContent from './schoolbook-content';
import { renewWoldListData } from './wold-service/wordlist-data';

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

async function addEventsForSchoolbook(props: State): Promise<void> {
  const userSett = props.userSettings;
  const unselectedPage = 0;
  const schoolbook = document.getElementById('schoolbook');

  (<HTMLElement>schoolbook).addEventListener(
    'click',
    async (e): Promise<void> => {
      if (e.target) {
        const chapterLink = (<HTMLElement>e.target).dataset.chapterNumber;
        const pageLink = (<HTMLElement>e.target).dataset.pageNumber;

        if (chapterLink) {
          userSett.schoolbookCurrentPosition.chapter = Number(chapterLink);
          userSett.schoolbookCurrentPosition.page = unselectedPage;
          await renewWoldListData(props);
          renderSchoolbookContent(
            (<HTMLElement>schoolbook).querySelector(
              '#schoolbook-content'
            ) as HTMLElement,
            props
          );
          return;
        }

        if (pageLink) {
          userSett.schoolbookCurrentPosition.page = Number(pageLink);
          await renewWoldListData(props);
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
              // console.log('wordId: ', wordId);
              // console.log('props.currentPageWords: ', props.currentPageWords);
              // eslint-disable-next-line no-case-declarations
              const selectCard = props.currentPageWords.find(
                (item) => item.id === wordId
              );
              if (selectCard?.userWord) {
                if (selectCard.userWord.difficulty === Difficulty.easy) {
                  selectCard.userWord.difficulty = Difficulty.basic;
                } else {
                  selectCard.userWord.difficulty = Difficulty.easy;
                }
                // updateUserWord(
                //   userSett.authData.userId,
                //   <string>wordId,
                //   userSett.authData.token,
                //   selectCard.userWord
                // );

                renderSchoolbookContent(
                  (<HTMLElement>schoolbook).querySelector(
                    '#schoolbook-content'
                  ) as HTMLElement,
                  props
                );
              } else {
                (<CurrentPageWord>selectCard).userWord = {
                  difficulty: Difficulty.easy,
                  optional: {
                    answerResultArray: [],
                  },
                };
                // saveUserWord(
                //   userSett.authData.userId,
                //   <string>wordId,
                //   userSett.authData.token,
                //   <UserWord>(<CurrentPageWord>selectCard).userWord
                // );
                renderSchoolbookContent(
                  (<HTMLElement>schoolbook).querySelector(
                    '#schoolbook-content'
                  ) as HTMLElement,
                  props
                );
              }
              // getAggregatedUserWordById(
              //   '61fa738ef3d34a0016954e89',
              //   wordId as string,
              //   userSett.authData.token,
              // ).then((x) => console.log(x.userWord?.difficulty));
              // console.log('wordBtnType: ', wordBtnType);
              break;
            case WordCardBtn.difficult:
              // console.log('wordId: ', wordId);
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

export default async function renderSchoolbook(
  root: HTMLElement,
  props: State
): Promise<void> {
  const elem = root;

  elem.innerHTML = toHTML(props.userSettings);

  await renewWoldListData(props);
  renderSchoolbookContent(
    elem.querySelector('#schoolbook-content') as HTMLElement,
    props
  );

  addEventsForSchoolbook(props);
}
