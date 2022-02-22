import { CurrentPageWord } from '../../modules/types';

export type idNameEmailPasswordType = {
  id?: string;
  name?: string;
  email: string;
  password?: string;
};

export type headersAddType = {
  name: 'Accept' | 'Authorization' | 'Content-Type';
  value: string;
};

export type requestOptionsType = {
  method: 'POST' | 'GET' | 'PUT' | 'DELETE';
  headers: Headers;
  body?: string;
  redirect: 'follow';
};

export type usersUrlType = 'https://learnwords-app.herokuapp.com/users';
export type signinUrlType = 'https://learnwords-app.herokuapp.com/signin';

export type urlType = usersUrlType | signinUrlType;

export type localStorageCurrentUserObject = {
  message: string;
  name: string;
  refreshToken: string;
  token: string;
  userId: string;
};

export interface IObjectWithUpdateWordsArrays {
  newWordsArray: CurrentPageWord[];
  usedWordsArray: CurrentPageWord[];
}

export type gameName = 'audioChallenge' | 'sprint';

export enum gameNameEnum {
  audioChallenge = 'audioChallenge',
  sprint = 'sprint',
}

export enum linkEnum {
  audioChallenge = 'radio_audio-challenge',
  sprint = 'radio_sprint',
}

export type link = linkEnum.audioChallenge | linkEnum.sprint;

export enum classNameEnum {
  rightAnswer = 'right_answer',
  wrongAnswer = 'wrong_answer',
  otherAnswers = 'other_answers',
}
