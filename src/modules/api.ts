import {
  aggregatedUserWord,
  aggregatedUserWords,
  UserWord,
  Word,
} from './types';
import { convertToUserWord, convertUserWordToString } from './utils';

const base = 'https://learnwords-app.herokuapp.com';

const users = `${base}/users`;
const words = `${base}/words`;

// --- Words ---
export const getWords = async (group: number, page: number): Promise<Word[]> =>
  (await fetch(`${words}?group=${group}&page=${page}`)).json();

export const getWordById = async (id: string): Promise<Word> =>
  (await fetch(`${words}/${id}`)).json();

// --- User Words ---
export const getUserWords = async (
  userId: string,
  token: string
): Promise<UserWord[]> => {
  const response = await (async () =>
    (
      await fetch(`${users}/${userId}/words`, {
        method: 'GET',
        headers: {
          Accept: 'application/json',
          Authorization: `Bearer ${token}`,
        },
      })
    ).json())();

  return response.map((item: UserWord) => convertToUserWord(item));
};

export const createUserWord = async (
  userId: string,
  wordId: string,
  token: string,
  body: UserWord
): Promise<UserWord> => {
  const bodyStr = convertUserWordToString(body);

  const response = await (async () =>
    (
      await fetch(`${users}/${userId}/words/${wordId}`, {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: bodyStr,
      })
    ).json())();

  return response;
};

export const getUserWordById = async (
  userId: string,
  wordId: string,
  token: string
): Promise<UserWord> => {
  const response = await (async () =>
    (
      await fetch(`${users}/${userId}/words/${wordId}`, {
        method: 'GET',
        headers: {
          Accept: 'application/json',
          Authorization: `Bearer ${token}`,
        },
      })
    ).json())();

  return convertToUserWord(response);
};

export const getUserWordByIdStatus = async (
  userId: string,
  wordId: string,
  token: string
): Promise<number> =>
  (
    await fetch(`${users}/${userId}/words/${wordId}`, {
      method: 'GET',
      headers: {
        Accept: 'application/json',
        Authorization: `Bearer ${token}`,
      },
    })
  ).status;

export const updateUserWord = async (
  userId: string,
  wordId: string,
  token: string,
  body: UserWord
): Promise<UserWord> => {
  const bodyStr = convertUserWordToString(body);

  const response = await (async () =>
    (
      await fetch(`${users}/${userId}/words/${wordId}`, {
        method: 'PUT',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: bodyStr,
      })
    ).json())();

  return response;
};

export const deleteUserWord = async (
  userId: string,
  wordId: string,
  token: string
): Promise<boolean> => {
  const deleteStatus = (
    await fetch(`${users}/${userId}/words/${wordId}`, {
      method: 'DELETE',
      headers: {
        Accept: '*/*',
        Authorization: `Bearer ${token}`,
      },
    })
  ).status;

  return deleteStatus === 204;
};

export const saveUserWord = async (
  userId: string,
  wordId: string,
  token: string,
  body: UserWord
): Promise<UserWord> => {
  const userWordStatus = await getUserWordByIdStatus(userId, wordId, token);

  let response;
  if (userWordStatus === 404) {
    response = await createUserWord(userId, wordId, token, body);
  } else {
    response = await updateUserWord(userId, wordId, token, body);
  }
  return response;
};

// --- user aggregated words ---
export const getAggregatedUserWords = async (
  userId: string,
  token: string,
  group: number | '' = '',
  page: number | '' = '',
  wordsPerPage = 20,
  filter = ''
): Promise<aggregatedUserWords> => {
  const response = await (async () =>
    (
      await fetch(
        `${users}/${userId}/aggregatedWords?group=${group}&page=${page}&wordsPerPage=${wordsPerPage}&filter=${filter}`,
        {
          method: 'GET',
          headers: {
            Accept: 'application/json',
            Authorization: `Bearer ${token}`,
          },
        })
    ).json())();

  response[0].paginatedResults = response[0].paginatedResults.map(
    (item: aggregatedUserWord) => {
      const param = item;
      if (item?.userWord) {
        (<aggregatedUserWord>param).userWord = convertToUserWord(
          (<aggregatedUserWord>param).userWord as UserWord
        );
        return param;
      }
      return param;
    }
  );

  return response;
};

export const getAggregatedUserWordById = async (
  userId: string,
  wordId: string,
  token: string
): Promise<aggregatedUserWord> =>
  (
    await fetch(`${users}/${userId}/aggregatedWords/${wordId}`, {
      method: 'GET',
      headers: {
        Accept: 'application/json',
        Authorization: `Bearer ${token}`,
      },
    })
  )
    .json()
    .then((x) => x[0]);
