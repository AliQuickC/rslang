import { getAggregatedUserWords, getWords } from '../../modules/api';
import {
  aggregatedUserWords,
  Auth,
  CurrentPageWord,
  Difficulty,
  State,
  Word,
} from '../../modules/types';
import { convertObject } from '../../modules/utils';

const totalPageInChapter = 30;
const totalWordsInPage = 20;
const unselectedChapter = 0;
const unselectedPage = 0;
const difficultWordChapter = 7;
const maxWords = 3600;

function getAggrWoldListData(
  param: State,
  chapter: number,
  page: number
): Promise<CurrentPageWord[]> {
  const props = param;
  const userSett = props.userSettings;
  const authData = <Auth>userSett.authData;

  return getAggregatedUserWords(
    authData.userId,
    authData.token,
    undefined,
    undefined,
    totalWordsInPage,
    `{"$and": [{"group": ${chapter - 1}}, {"page": ${page - 1}}]}`
  ).then((x: aggregatedUserWords) =>
    x[0].paginatedResults.map((item) => convertObject(item))
  );
}

function isExplorePage(wordsArr: CurrentPageWord[]): boolean {
  return wordsArr.every((item) => {
    if (
      item.userWord &&
      (item.userWord.difficulty === Difficulty.easy ||
        item.userWord.difficulty === Difficulty.difficult)
    ) {
      return true;
    }
    return false;
  });
}

export async function getWoldListData(
  param: State
): Promise<CurrentPageWord[]> {
  const props = param;
  const userSett = props.userSettings;

  if (userSett.authorized) {
    props.currentPageWords = await getAggrWoldListData(
      props,
      userSett.schoolbookCurrentPosition.chapter,
      userSett.schoolbookCurrentPosition.page
    );
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
      undefined,
      undefined,
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

export async function renewPageListData(
  param: State,
  chapter: number
): Promise<boolean[]> {
  const props = param;
  const userSett = props.userSettings;

  if (
    userSett.authorized &&
    userSett.schoolbookCurrentPosition.chapter > unselectedChapter &&
    userSett.schoolbookCurrentPosition.chapter < difficultWordChapter
  ) {
    const createPageArray = new Array(totalPageInChapter)
      .fill('undefined')
      .map((_, index) => getAggrWoldListData(props, chapter, index + 1));
    const pageArray = await Promise.all(createPageArray);

    props.currentChapterPage = pageArray.map((item) => {
      return isExplorePage(item);
    });

    return props.currentChapterPage;
  }
  return [];
}
