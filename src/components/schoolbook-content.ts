import { State } from '../modules/types';
import wordsListHTML from './wold-service/wordlist-view';

const toHTML = (param: State): string => {
  const props = param;
  const userSett = props.userSettings;
  const totalPagesInChapter = 30;
  const unselectedChapter = 0;
  const unselectedPage = 0;
  const difficultWordChapter = 7;

  if (
    userSett.schoolbookCurrentPosition.chapter === difficultWordChapter &&
    userSett.authorized
  ) {
    const wordsOnThePage = wordsListHTML(props);
    return `
    <h2 class="schoolbook-content__title">Раздел: Сложные слова</h2>
    <div class="schoolbook-content__word-wrap">
    ${wordsOnThePage}
    </div>
    `;
  }

  if (
    userSett.schoolbookCurrentPosition.chapter > unselectedChapter &&
    userSett.schoolbookCurrentPosition.chapter < difficultWordChapter &&
    userSett.schoolbookCurrentPosition.page !== unselectedPage
  ) {
    const wordsOnThePage = wordsListHTML(props);

    return `  
    <div class="schoolbook-content__title-wrap">
      <h2 class="schoolbook-content__title">Раздел: ${userSett.schoolbookCurrentPosition.chapter}, Страница: ${userSett.schoolbookCurrentPosition.page}</h2>
      <button class="schoolbook-content__backbtn" data-page-number="0">↵ К списку страниц</button>
    </div>
    <div class="schoolbook-content__word-wrap">
      ${wordsOnThePage}
    </div>
  `;
  }

  if (
    userSett.schoolbookCurrentPosition.chapter === unselectedChapter ||
    (userSett.schoolbookCurrentPosition.chapter === difficultWordChapter &&
      !userSett.authorized)
  ) {
    return `<h2 class="schoolbook-content__title">Выберите раздел учебника</h2>`;
  }

  let pages = '';
  for (let i = 0; i < totalPagesInChapter; i += 1) {
    pages += `<div class="schoolbook-content__page page-chapter${
      userSett.schoolbookCurrentPosition.chapter
    }" data-page-number="${i + 1}">Страница ${i + 1}</div>`;
  }

  return `      
    <h2 class="schoolbook-content__title">Раздел: ${userSett.schoolbookCurrentPosition.chapter}</h2>
    <div class="schoolbook-content__page-wrap">${pages}</div> 
  `;
};

export default async function renderSchoolbookContent(
  root: HTMLElement,
  props: State
): Promise<void> {
  const elem = root;

  elem.innerHTML = await toHTML(props);
}
