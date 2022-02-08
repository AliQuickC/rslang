import {
  aggregatedUserWord,
  aggregatedUserWords,
  UserWord,
  Word,
} from './types';

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
): Promise<UserWord[]> =>
  (
    await fetch(`${users}/${userId}/words`, {
      method: 'GET',
      headers: {
        Accept: 'application/json',
        Authorization: `Bearer ${token}`,
      },
    })
  ).json();

export const createUserWord = async (
  userId: string,
  wordId: string,
  token: string,
  body: UserWord
): Promise<UserWord> =>
  (
    await fetch(`${users}/${userId}/words/${wordId}`, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(body),
    })
  ).json();

export const getUserWordById = async (
  userId: string,
  wordId: string,
  token: string
): Promise<UserWord> =>
  (
    await fetch(`${users}/${userId}/words/${wordId}`, {
      method: 'GET',
      headers: {
        Accept: 'application/json',
        Authorization: `Bearer ${token}`,
      },
    })
  ).json();

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
): Promise<UserWord> =>
  (
    await fetch(`${users}/${userId}/words/${wordId}`, {
      method: 'PUT',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(body),
    })
  ).json();

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
  group = 0,
  page = 0,
  wordsPerPage = 10,
  filter = ''
): Promise<aggregatedUserWords> =>
  (
    await fetch(
      `${users}/${userId}/aggregatedWords/?group=${group}&page=${page}&wordsPerPage=${wordsPerPage}&filter=${filter}`,
      {
        method: 'GET',
        headers: {
          Accept: 'application/json',
          Authorization: `Bearer ${token}`,
        },
      }
    )
  ).json();

export const getAggregatedUserWordById = async (
  userId: string,
  wordId: string,
  token: string
): Promise<aggregatedUserWord[]> =>
  (
    await fetch(`${users}/${userId}/aggregatedWords/${wordId}`, {
      method: 'GET',
      headers: {
        Accept: 'application/json',
        Authorization: `Bearer ${token}`,
      },
    })
  ).json();
