import { createUserWord, getWordById, updateUserWord } from '../modules/api';
import {
  Auth,
  CurrentPageWord,
  Difficulty,
  State,
  UserSettings,
  UserWord,
  WordCardBtn,
} from '../modules/types';
import renderSchoolbookContent from './wold-service/schoolbook-content';
import { renewPageListData, renewWoldListData } from './wold-service/word-data';

const audio = new Audio();
const fileServer = 'https://learnwords-app.herokuapp.com/';
const unselectedPage = 0;
const difficultWordChapter = 7;

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

          if (
            userSett.schoolbookCurrentPosition.chapter === difficultWordChapter
          ) {
            await renewWoldListData(props);
          }
          await renewPageListData(
            props,
            userSett.schoolbookCurrentPosition.chapter
          );

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
          await renewPageListData(
            props,
            userSett.schoolbookCurrentPosition.chapter
          );
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
            case WordCardBtn.easy: {
              const authData = <Auth>userSett.authData;
              const selectCardIndex = props.currentPageWords.findIndex(
                (item) => item.id === wordId
              );
              const selectCard = props.currentPageWords[selectCardIndex];
              if (selectCard?.userWord) {
                if (selectCard.userWord.difficulty === Difficulty.easy) {
                  selectCard.userWord.difficulty = Difficulty.basic;
                } else {
                  selectCard.userWord.difficulty = Difficulty.easy;
                  if (
                    props.userSettings.schoolbookCurrentPosition.chapter ===
                    difficultWordChapter
                  ) {
                    props.currentPageWords.splice(selectCardIndex, 1);
                  }
                }
                updateUserWord(
                  authData.userId,
                  <string>wordId,
                  authData.token,
                  selectCard.userWord
                );

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
                createUserWord(
                  authData.userId,
                  <string>wordId,
                  authData.token,
                  <UserWord>(<CurrentPageWord>selectCard).userWord
                );
                renderSchoolbookContent(
                  (<HTMLElement>schoolbook).querySelector(
                    '#schoolbook-content'
                  ) as HTMLElement,
                  props
                );
              }
              break;
            }
            case WordCardBtn.difficult:
              {
                const authData = <Auth>userSett.authData;
                const selectCardIndex = props.currentPageWords.findIndex(
                  (item) => item.id === wordId
                );
                const selectCard = props.currentPageWords[selectCardIndex];
                if (selectCard.userWord) {
                  if (selectCard.userWord.difficulty !== Difficulty.difficult) {
                    selectCard.userWord.difficulty = Difficulty.difficult;
                  } else if (
                    props.userSettings.schoolbookCurrentPosition.chapter ===
                    difficultWordChapter
                  ) {
                    selectCard.userWord.difficulty = Difficulty.basic;
                    props.currentPageWords.splice(selectCardIndex, 1);
                  }
                  updateUserWord(
                    authData.userId,
                    <string>wordId,
                    authData.token,
                    selectCard.userWord
                  );
                  renderSchoolbookContent(
                    (<HTMLElement>schoolbook).querySelector(
                      '#schoolbook-content'
                    ) as HTMLElement,
                    props
                  );
                } else {
                  (<CurrentPageWord>selectCard).userWord = {
                    difficulty: Difficulty.difficult,
                    optional: {
                      answerResultArray: [],
                    },
                  };
                  createUserWord(
                    authData.userId,
                    <string>wordId,
                    authData.token,
                    <UserWord>(<CurrentPageWord>selectCard).userWord
                  );
                  renderSchoolbookContent(
                    (<HTMLElement>schoolbook).querySelector(
                      '#schoolbook-content'
                    ) as HTMLElement,
                    props
                  );
                }
              }
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
  await renewPageListData(
    props,
    props.userSettings.schoolbookCurrentPosition.chapter
  );
  renderSchoolbookContent(
    elem.querySelector('#schoolbook-content') as HTMLElement,
    props
  );

  addEventsForSchoolbook(props);
}
