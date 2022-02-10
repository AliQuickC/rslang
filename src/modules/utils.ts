import { aggregatedUserWord, CurrentPageWord, Word } from './types';

export default function convertObject(
  obj: aggregatedUserWord | Word
): CurrentPageWord {
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
