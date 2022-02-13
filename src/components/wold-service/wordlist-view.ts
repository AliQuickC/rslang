import {
  CurrentPageWord,
  Difficulty,
  State,
  UserWord,
} from '../../modules/types';

const fileServer = 'https://learnwords-app.herokuapp.com/';

export default function wordsListHTML(props: State): string {
  const userSett = props.userSettings;
  const wordsOnThePage = (<CurrentPageWord[]>props.currentPageWords)
    .map((item) => {
      let wordClass = '';
      let easyBtnTitle = '';
      let difficultyBtnTitle = '';
      if (userSett.authorized) {
        if (item.userWord !== undefined) {
          const wordDifficulty = (<UserWord>item.userWord).difficulty;
          wordClass = wordDifficulty;
          easyBtnTitle =
            wordClass === Difficulty.easy
              ? 'Изученное слово'
              : 'Пометить слово как Изучено';
          difficultyBtnTitle =
            wordClass === Difficulty.difficult
              ? 'Сложное слово'
              : 'Добавить в Сложные слова';
        } else {
          easyBtnTitle = 'Пометить слово как Изучено';
          difficultyBtnTitle = 'Добавить в Сложные слова';
        }
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
        userSett.authorized
          ? `<div class="word__buttons"><button class="word__easybtn word__btn" title="${easyBtnTitle}" data-word-btn="easy"></button><button class="word__difficultbtn word__btn" title="${difficultyBtnTitle}" data-word-btn="difficult"></button></div>`
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

  return wordsOnThePage;
}
