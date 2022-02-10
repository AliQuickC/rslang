import { getAggregatedUserWords, getWords } from '../modules/api';
import { aggregatedUserWord, aggregatedUserWords, UserSettings, UserWord, Word } from '../modules/types';

const fileServer = 'https://learnwords-app.herokuapp.com/';

const toHTML = async (param: UserSettings): Promise<string> => {
  const props = param;
  const totalPagesInChapter = 30;
  const totalWordsInPage = 20;
  const unselectedChapter = 0;
  const unselectedPage = 0;
  const difficultWordChapter = 7;

  if (
    props.schoolbookCurrentPosition.chapter === unselectedChapter ||
    (props.schoolbookCurrentPosition.chapter === difficultWordChapter &&
      !props.authorized)
  ) {
    return `<h2 class="schoolbook-content__title">Выберите раздел учебника</h2>`;
  }

  if (props.schoolbookCurrentPosition.chapter === difficultWordChapter) {
    return `
    <h2 class="schoolbook-content__title">Раздел: Сложные слова</h2>
    <div class="schoolbook-content__word-wrap">
    Слово 1
    Слово 2
    </div>
    `;
  }

  if (props.schoolbookCurrentPosition.page === unselectedPage) {
    let pages = '';
    for (let i = 0; i < totalPagesInChapter; i += 1) {
      pages += `<div class="schoolbook-content__page" data-page-number="${
        i + 1
      }">Страница ${i + 1}</div>`;
    }

    return `      
      <h2 class="schoolbook-content__title">Раздел: ${props.schoolbookCurrentPosition.chapter}</h2>
      <div class="schoolbook-content__page-wrap">${pages}</div> 
    `;
  }

  let wordsArray: Word[] | aggregatedUserWord[] = [];

  if (props.authorized) {
    wordsArray = await (() =>
      getAggregatedUserWords(
        '61fa738ef3d34a0016954e89',
        'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYxZmE3MzhlZjNkMzRhMDAxNjk1NGU4OSIsImlhdCI6MTY0NDQ4MDc4MywiZXhwIjoxNjQ0NDk1MTgzfQ.nl2FdJdV6fE4Ksr51fd0Ri-KTXecg9UBrIHcPOfedwA',
        props.schoolbookCurrentPosition.chapter - 1,
        props.schoolbookCurrentPosition.page - 1,
        totalWordsInPage,
        ''
      ).then((x: aggregatedUserWords) => x[0].paginatedResults))();
    // console.log('wordsArrayAuth: ', wordsArray);
  } else {
    wordsArray = await getWords(
      props.schoolbookCurrentPosition.chapter - 1,
      props.schoolbookCurrentPosition.page - 1
    );
    // console.log('wordsArray: ', wordsArray);
  }

  const wordsOnThePage = wordsArray
    .map((item) => {
      let wordClass = '';
      if (
        props.authorized &&
        Object.prototype.hasOwnProperty.call(item, 'userWord')
      ) {
        wordClass = (<UserWord>(<aggregatedUserWord>item).userWord).difficulty;
      }
      return `<div class="word ${wordClass}" data-word-id="${item.id}">
    <img class="word__picture" src="${fileServer}${
        item.image
      }" alt="word picture"> 
    <div class="word__wrap1">
      <div class="word__wrap2">
        <span class="word__name">${item.word}</span>
        <div class="word__translate-wrap">
          <span class="word__translate">${item.wordTranslate}</span>
          <span class="word__transcription">${item.transcription}</span>
          <button class="word__soundbtn word__btn" data-word-btn="sound"></button>
        </div>
      </div>
        ${
          props.authorized
            ? `<div class="word__buttons"><button class="word__easybtn word__btn" title="Пометить слово как Изучено" data-word-btn="easy"></button><button class="word__difficultbtn word__btn" title="Добавить в Сложные слова" data-word-btn="difficult"></button></div>`
            : ''
        }
    </div>
    <p class="word__meaning-wrap">
      <span class="word__meaning">${item.textMeaning}</span><br>
      <span class="word__meaning-translate">${
        item.textMeaningTranslate
      }</span>    
    </p>
    <p class="word__example-wrap">
      <span class="word__example">${item.textExample}</span><br>
      <span class="word__example-translate">${item.textExampleTranslate}</span>
    </p>
    </div>`;
    })
    .join('');

  return `  
  <div class="schoolbook-content__title-wrap">
    <h2 class="schoolbook-content__title">Раздел: ${props.schoolbookCurrentPosition.chapter}, Страница: ${props.schoolbookCurrentPosition.page}</h2>
    <button data-page-number="0">↵ К списку страниц</button>
  </div>
  <div class="schoolbook-content__word-wrap">
    ${wordsOnThePage}
  </div>
`;
};

export default async function renderSchoolbookContent(
  root: HTMLElement,
  props: UserSettings
): Promise<void> {
  const elem = root;

  elem.innerHTML = await toHTML(props);
}
