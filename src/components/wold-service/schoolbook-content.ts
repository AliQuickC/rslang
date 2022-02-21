import { State } from '../../modules/types';
import wordsListHTML from './wordlist-view';

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
      <h2 class="schoolbook-content__title"><span>Раздел: ${
        userSett.schoolbookCurrentPosition.chapter
      },&nbsp</span><span>Страница: ${
      userSett.schoolbookCurrentPosition.page
    }</span></h2>
      ${
        userSett.authorized
          ? '<div class="schoolbook-content__buttons-wrap"><button class="schoolbook-content__btn button-audiocall" data-link="audio-call-game-page">Изучать с игрой - Аудиовызов</button><button class="schoolbook-content__btn button-sprint" data-link="sprint-game-page">Изучать с игрой - Спринт</button></div>'
          : ''
      }
      <button class="schoolbook-content__btn button-back" data-page-number="0">↵ К списку страниц</button>
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
    } ${
      userSett.authData && props.isExploreCurrentChapterPages[i]
        ? 'page-explored'
        : ''
    }" data-page-number="${i + 1}">Страница ${i + 1}</div>`;
  }

  return `<h2 class="schoolbook-content__title">Раздел: ${userSett.schoolbookCurrentPosition.chapter}</h2>
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
