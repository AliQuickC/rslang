import { Difficulty } from "../../modules/types";

export const urlServer = 'https://learnwords-app.herokuapp.com';
export const urlUsers = 'https://learnwords-app.herokuapp.com/users';
export const urlSignIn = 'https://learnwords-app.herokuapp.com/signin';
export const urlWords = 'https://learnwords-app.herokuapp.com/words';
export const localStorageCurrentUserObjectName = 'currentUser';
export const brokenAuthorizationMessage = 'You are not authorized';
export const wordsPerPage = 10;
export const pagesCount = 30;
export const defaultAudioVolume = 0.3;
export const gameButtonInnerText = 'не знаю';
export const defaultWordStatus = {
  difficulty: 'basic',
  optional: { answerResultArray: ([] = []) },
}
export const errorMessage = {
  wrongPasswordRepeat: 'wrong password repeat',
  wrongPasswordLength: 'password length must be longer than 8 character',
  wrongEmail: 'wrong type of e-mail',
  wrongName: 'please, enter your name',
  userExist: 'you are currently registered, please log in',
  wrongNameOrPassword: 'wrong name or password entered',
  registrationSuccess:
    'Congratulations!!! Now You are a registered user! Please, log in.',
};
