import { getAggregatedUserWords, getWords } from '../../modules/api';
import {
  aggregatedUserWords,
  Auth,
  CurrentPageWord,
  State,
  Word,
} from '../../modules/types';
import { convertObject } from '../../modules/utils';

const totalWordsInPage = 20;
const unselectedChapter = 0;
const unselectedPage = 0;
const difficultWordChapter = 7;
const maxWords = 3600;

export async function getWoldListData(
  param: State
): Promise<CurrentPageWord[]> {
  const props = param;
  const userSett = props.userSettings;
  const authData = <Auth>userSett.authData;

  if (userSett.authorized) {
    props.currentPageWords = await ((): Promise<CurrentPageWord[]> =>
      getAggregatedUserWords(
        authData.userId,
        authData.token,
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

  return props.currentPageWords;
}

export async function getDifficultWoldListData(
  param: State
): Promise<CurrentPageWord[]> {
  const props = param;
  const userSett = props.userSettings;
  const authData = <Auth>userSett.authData;
  props.currentPageWords = await ((): Promise<CurrentPageWord[]> =>
    getAggregatedUserWords(
      authData.userId,
      authData.token,
      '',
      '',
      maxWords,
      `{"userWord.difficulty":"difficult"}`
    ).then((x: aggregatedUserWords) =>
      x[0].paginatedResults.map((item) => convertObject(item))
    ))();

  return props.currentPageWords;
}

export async function renewWoldListData(
  param: State
): Promise<CurrentPageWord[]> {
  const props = param;
  const userSett = props.userSettings;

  if (
    userSett.schoolbookCurrentPosition.chapter === difficultWordChapter &&
    userSett.authorized
  ) {
    await getDifficultWoldListData(props);
  }

  if (
    userSett.schoolbookCurrentPosition.chapter > unselectedChapter &&
    userSett.schoolbookCurrentPosition.chapter < difficultWordChapter &&
    userSett.schoolbookCurrentPosition.page !== unselectedPage
  ) {
    await getWoldListData(props);
  }

  return [] as CurrentPageWord[];
}
