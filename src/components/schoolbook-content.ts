import state from '../modules/state';

const toHTML = (): string => {
  const totalPagesInChapter = 30;
  const unselectedChapter = 0;
  const unselectedPage = 0;
  const difficultWordChapter = 7;
  if (
    state.schoolbookCurrentPosition.chapter === unselectedChapter ||
    (state.schoolbookCurrentPosition.chapter === difficultWordChapter &&
      !state.authorized)
  ) {
    return `<h2 class="schoolbook-content__title">Раздел не выбран</h2>`;
  }

  if (state.schoolbookCurrentPosition.chapter === difficultWordChapter) {
    return `
    <h2 class="schoolbook-content__title">Раздел: Сложные слова</h2>
    <div class="schoolbook-content__word-wrap">
    Слово 1
    Слово 2
    </div>
    `;
  }

  if (state.schoolbookCurrentPosition.page === unselectedPage) {
    let pages = '';
    for (let i = 0; i < totalPagesInChapter; i += 1) {
      pages += `<div class="schoolbook-content__page" data-page-number="${
        i + 1
      }">Страница ${i + 1}</div>`;
    }

    return `      
      <h2 class="schoolbook-content__title">Раздел: ${state.schoolbookCurrentPosition.chapter}</h2>
      <div class="schoolbook-content__page-wrap">${pages}</div> 
    `;
  }

  return `  
  <div class="schoolbook-content__title-wrap">
    <h2 class="schoolbook-content__title">Раздел: ${state.schoolbookCurrentPosition.chapter}, Страница: ${state.schoolbookCurrentPosition.page}</h2>
    <button data-page-number="0">↵ К списку страниц</button>
  </div>
  <div class="schoolbook-content__word-wrap">
  Слово 1
  Слово 2
  </div>
`;
};

export default function renderSchoolbookContent(root: HTMLElement): void {
  const elem = root;

  elem.innerHTML = toHTML();
}
