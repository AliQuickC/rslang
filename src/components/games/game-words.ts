import { getAggregatedUserWords, getWords } from '../../modules/api';
import {
  aggregatedUserWords,
  Auth,
  CurrentPageWord,
  Difficulty,
  State,
  UserSettings,
  Word,
} from '../../modules/types';
import { convertObject } from '../../modules/utils';

const totalWordsInGroup = 600;
const totalWordsInPage = 20;
const totalPageInChapter = 30;

export async function getAllWordsFromChapter(
  chapter: number,
  maxNumberOfWords = 10
): Promise<CurrentPageWord[]> {
  const createPageArray = new Array(totalPageInChapter)
    .fill('undefined')
    .map((_, index) =>
      getWords(chapter - 1, index).then((x: Word[]) =>
        x.map((item) => convertObject(item))
      )
    );

  const pageArray: CurrentPageWord[][] = await Promise.all(createPageArray);

  const groupWords = pageArray
    .reduce((summ, item) => {
      summ.push(...item);
      return summ;
    }, [])
    .slice(0, maxNumberOfWords);

  return groupWords;
}

export async function generateGameWordsForSelectLevel(
  props: UserSettings,
  level: number,
  maxNumberOfWords = 10
): Promise<CurrentPageWord[]> {
  if (props.authorized) {
    // const props = param;
    // const userSett = props.userSettings;
    const authData = <Auth>props.authData;

    const groupWords = await ((): Promise<CurrentPageWord[]> =>
      getAggregatedUserWords(
        authData.userId,
        authData.token,
        level - 1,
        undefined,
        totalWordsInGroup,
        ''
      ).then((x: aggregatedUserWords) =>
        x[0].paginatedResults
          .map((item) => convertObject(item))
          .filter((item) => {
            if (item.userWord && item.userWord.difficulty === Difficulty.easy) {
              return false;
            }
            return true;
          })
          .slice(0, maxNumberOfWords)
      ))();

    return groupWords;
  }

  const groupWords = await getAllWordsFromChapter(level, maxNumberOfWords);

  return groupWords;
}

// eslint-disable-next-line @typescript-eslint/no-empty-function
export async function generateGameWordsForSelectPage(
  props: UserSettings,
  chapter: number,
  page: number,
  maxNumberOfWords = 10
): Promise<CurrentPageWord[]> {
  const authData = <Auth>props.authData;
  // const groupWords = await ((): Promise<CurrentPageWord[]> =>
  //   getAggregatedUserWords(
  //     authData.userId,
  //     authData.token,
  //     undefined,
  //     undefined,
  //     totalWordsInGroup,
  //     `{"$and": [{"group": ${chapter - 1}}, {"page": {"$lt": ${page}} }]}`
  //   ).then((x: aggregatedUserWords) =>
  //     x[0].paginatedResults
  //       .map((item) => convertObject(item))
  //       .filter((item) => {
  //         if (item.userWord && item.userWord.difficulty === Difficulty.easy) {
  //           return false;
  //         }
  //         return true;
  //       })
  //       .reverse()
  //   ))();
  const createPageArray = new Array(page).fill('undefined').map((_, index) =>
    getAggregatedUserWords(
      authData.userId,
      authData.token,
      undefined,
      undefined,
      totalWordsInGroup,
      `{"$and": [{"group": ${chapter - 1}}, {"page":${page - index - 1}}]}`
    ).then((x: aggregatedUserWords) =>
      x[0].paginatedResults
        .map((item) => convertObject(item))
        .filter((item) => {
          if (item.userWord && item.userWord.difficulty === Difficulty.easy) {
            return false;
          }
          return true;
        })
    )
  );

  const pageArray: CurrentPageWord[][] = await Promise.all(createPageArray);

  const groupWords = pageArray
    .reduce((summ, item) => {
      summ.push(...item);
      return summ;
    }, [])
    .slice(0, maxNumberOfWords);

  return groupWords;
}
