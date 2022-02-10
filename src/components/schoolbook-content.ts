import { getAggregatedUserWords, getWords } from '../modules/api';
import {
  aggregatedUserWords,
  CurrentPageWord,
  Difficulty,
  State,
  UserWord,
  Word,
} from '../modules/types';
import convertObject from '../modules/utils';
import wordsListHTML from './word-list';

const toHTML = async (param: State): Promise<string> => {
  const props = param;
  const userSett = props.userSettings;
  const totalPagesInChapter = 30;
  const totalWordsInPage = 20;
  const unselectedChapter = 0;
  const unselectedPage = 0;
  const difficultWordChapter = 7;

  if (
    userSett.schoolbookCurrentPosition.chapter === unselectedChapter ||
    (userSett.schoolbookCurrentPosition.chapter === difficultWordChapter &&
      !userSett.authorized)
  ) {
    return `<h2 class="schoolbook-content__title">Выберите раздел учебника</h2>`;
  }

  if (userSett.schoolbookCurrentPosition.chapter === difficultWordChapter) {
    props.currentPageWords = await ((): Promise<CurrentPageWord[]> =>
      getAggregatedUserWords(
        '61fa738ef3d34a0016954e89',
        'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYxZmE3MzhlZjNkMzRhMDAxNjk1NGU4OSIsImlhdCI6MTY0NDUxMDk1NSwiZXhwIjoxNjQ0NTI1MzU1fQ.B66d3rce_G9HyrGJwaDRnBuY6jcntndW6bTWPzQLLxc',
        '',
        '',
        totalWordsInPage,
        `{"userWord.difficulty":"difficult"}`
      ).then((x: aggregatedUserWords) =>
        x[0].paginatedResults.map((item) => convertObject(item))
      ))();

    const wordsOnThePage = wordsListHTML(props);
    return `
    <h2 class="schoolbook-content__title">Раздел: Сложные слова</h2>
    <div class="schoolbook-content__word-wrap">
    ${wordsOnThePage}
    </div>
    `;
  }

  if (userSett.schoolbookCurrentPosition.page === unselectedPage) {
    let pages = '';
    for (let i = 0; i < totalPagesInChapter; i += 1) {
      pages += `<div class="schoolbook-content__page" data-page-number="${
        i + 1
      }">Страница ${i + 1}</div>`;
    }

    return `      
      <h2 class="schoolbook-content__title">Раздел: ${userSett.schoolbookCurrentPosition.chapter}</h2>
      <div class="schoolbook-content__page-wrap">${pages}</div> 
    `;
  }

  if (userSett.authorized) {
    props.currentPageWords = await ((): Promise<CurrentPageWord[]> =>
      getAggregatedUserWords(
        '61fa738ef3d34a0016954e89',
        'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYxZmE3MzhlZjNkMzRhMDAxNjk1NGU4OSIsImlhdCI6MTY0NDUxMDk1NSwiZXhwIjoxNjQ0NTI1MzU1fQ.B66d3rce_G9HyrGJwaDRnBuY6jcntndW6bTWPzQLLxc',
        '',
        '',
        totalWordsInPage,
        `{"$and": [{"group": ${
          userSett.schoolbookCurrentPosition.chapter - 1
        }}, {"page": ${userSett.schoolbookCurrentPosition.page - 1}}]}`
      ).then((x: aggregatedUserWords) =>
        x[0].paginatedResults.map((item) => convertObject(item))
      ))();
  } else {
    props.currentPageWords = await ((): Promise<CurrentPageWord[]> =>
      getWords(
        userSett.schoolbookCurrentPosition.chapter - 1,
        userSett.schoolbookCurrentPosition.page - 1
      ).then((x: Word[]) => x.map((item) => convertObject(item))))();
  }

  const wordsOnThePage = wordsListHTML(props);

  return `  
  <div class="schoolbook-content__title-wrap">
    <h2 class="schoolbook-content__title">Раздел: ${userSett.schoolbookCurrentPosition.chapter}, Страница: ${userSett.schoolbookCurrentPosition.page}</h2>
    <button data-page-number="0">↵ К списку страниц</button>
  </div>
  <div class="schoolbook-content__word-wrap">
    ${wordsOnThePage}
  </div>
`;
};

export default async function renderSchoolbookContent(
  root: HTMLElement,
  props: State
): Promise<void> {
  const elem = root;

  elem.innerHTML = await toHTML(props);
}
