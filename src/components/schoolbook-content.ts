import { UserSettings } from '../modules/types';

const toHTML = (param: UserSettings): string => {
  const props = param;
  const totalPagesInChapter = 30;
  const unselectedChapter = 0;
  const unselectedPage = 0;
  const difficultWordChapter = 7;
  if (
    props.schoolbookCurrentPosition.chapter === unselectedChapter ||
    (props.schoolbookCurrentPosition.chapter === difficultWordChapter &&
      !props.authorized)
  ) {
    return `<h2 class="schoolbook-content__title">Раздел не выбран</h2>`;
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

  return `  
  <div class="schoolbook-content__title-wrap">
    <h2 class="schoolbook-content__title">Раздел: ${props.schoolbookCurrentPosition.chapter}, Страница: ${props.schoolbookCurrentPosition.page}</h2>
    <button data-page-number="0">↵ К списку страниц</button>
  </div>
  <div class="schoolbook-content__word-wrap">
    <div class="word">
      <img class="word__picture" src="../assets/images/01_0010.jpg" alt="word picture"> 
      <span class="word__name">duck</span>
      <div class="word__translate-wrap">
        <span class="word__translate">утка</span>
        <span class="word__transcription">[dʌk]</span>
        <button class="word__soundbtn"></button>
      </div>
      <p class="word__sentence">A duck is a small water bird.People feed ducks at the lake.</p>
      <p class="word__sentence-translate">Утка - маленькая водяная птица Люди кормят уток у озера</p>
    </div>
  
  <div class="word">
    <img class="word__picture" src="../assets/images/01_0010.jpg" alt="word picture"> 
    <span class="word__name">duck</span>
    <div class="word__translate-wrap">
      <span class="word__translate">утка</span>
      <span class="word__transcription">[dʌk]</span>
      <button class="word__soundbtn"></button>
    </div>
    <p class="word__sentence">A duck is a small water bird.People feed ducks at the lake.</p>
    <p class="word__sentence-translate">Утка - маленькая водяная птица Люди кормят уток у озера</p>
  </div>

<div class="word">
  <img class="word__picture" src="../assets/images/01_0010.jpg" alt="word picture"> 
  <span class="word__name">duck</span>
  <div class="word__translate-wrap">
    <span class="word__translate">утка</span>
    <span class="word__transcription">[dʌk]</span>
    <button class="word__soundbtn"></button>
  </div>
  <p class="word__sentence">A duck is a small water bird.People feed ducks at the lake.</p>
  <p class="word__sentence-translate">Утка - маленькая водяная птица Люди кормят уток у озера</p>
</div>

<div class="word">
<img class="word__picture" src="../assets/images/01_0010.jpg" alt="word picture"> 
<span class="word__name">duck</span>
<div class="word__translate-wrap">
  <span class="word__translate">утка</span>
  <span class="word__transcription">[dʌk]</span>
  <button class="word__soundbtn"></button>
</div>
<p class="word__sentence">A duck is a small water bird.People feed ducks at the lake.</p>
<p class="word__sentence-translate">Утка - маленькая водяная птица Люди кормят уток у озера</p>
</div>

<div class="word">
<img class="word__picture" src="../assets/images/01_0010.jpg" alt="word picture"> 
<span class="word__name">duck</span>
<div class="word__translate-wrap">
  <span class="word__translate">утка</span>
  <span class="word__transcription">[dʌk]</span>
  <button class="word__soundbtn"></button>
</div>
<p class="word__sentence">A duck is a small water bird.People feed ducks at the lake.</p>
<p class="word__sentence-translate">Утка - маленькая водяная птица Люди кормят уток у озера</p>
</div>

<div class="word">
<img class="word__picture" src="../assets/images/01_0010.jpg" alt="word picture"> 
<span class="word__name">duck</span>
<div class="word__translate-wrap">
  <span class="word__translate">утка</span>
  <span class="word__transcription">[dʌk]</span>
  <button class="word__soundbtn"></button>
</div>
<p class="word__sentence">A duck is a small water bird.People feed ducks at the lake.</p>
<p class="word__sentence-translate">Утка - маленькая водяная птица Люди кормят уток у озера</p>
</div>
  
  </div>
`;
};

export default function renderSchoolbookContent(
  root: HTMLElement,
  props: UserSettings
): void {
  const elem = root;

  elem.innerHTML = toHTML(props);
}
