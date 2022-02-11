import { aggregatedUserWord, CurrentPageWord, UserWord, Word } from './types';

export function convertObject(obj: aggregatedUserWord | Word): CurrentPageWord {
  return {
    userWord: (<aggregatedUserWord>obj).userWord
      ? JSON.parse(JSON.stringify((<aggregatedUserWord>obj).userWord))
      : undefined,
    /* eslint-disable no-underscore-dangle */
    id: (<aggregatedUserWord>obj)._id
      ? (<aggregatedUserWord>obj)._id
      : (<Word>obj).id,
    group: obj.group,
    page: obj.page,
    word: obj.word,
    image: obj.image,
    audio: obj.audio,
    audioMeaning: obj.audioMeaning,
    audioExample: obj.audioExample,
    textMeaning: obj.textMeaning,
    textExample: obj.textExample,
    transcription: obj.transcription,
    textExampleTranslate: obj.textExampleTranslate,
    textMeaningTranslate: obj.textMeaningTranslate,
    wordTranslate: obj.wordTranslate,
  };
}

export const convertUserWordToString = (obj: UserWord) =>
  JSON.stringify(obj)
    .split('')
    .map((item) => {
      if (item === '[') return '"[';
      if (item === ']') return ']"';
      return item;
    })
    .join('');

export const convertToUserWord = (obj: UserWord): UserWord =>
  JSON.parse(JSON.stringify(obj).replace(/"\[/g, '[').replace(/\]"/g, ']'));
