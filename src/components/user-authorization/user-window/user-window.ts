import userWindowElementAsString from './user-window.html';
import Login from '../login/login';
import getHtmlFromString from '../../utilites/getHtmlFromString';
import {
  brokenAuthorizationMessage,
  localStorageCurrentUserObjectName,
} from '../../utilites/consts';
import { localStorageCurrentUserObject } from '../../utilites/types';

export default class UserWindow extends Login {
  buttonInnerText = 'Exit';

  boxElement = getHtmlFromString(userWindowElementAsString).querySelector(
    '.user-window'
  ) as HTMLDivElement;

  userNameTitle = this.boxElement.querySelector(
    '.user-window__user-name'
  ) as HTMLTitleElement;

  static get isUserLogIn() {
    return !!localStorage.getItem(localStorageCurrentUserObjectName);
  }

  static get objectFromLS() {
    return UserWindow.isUserLogIn
      ? JSON.parse(
          <string>localStorage.getItem(localStorageCurrentUserObjectName)
        )
      : undefined;
  }

  static onClickOnEnterButton = () => {
    delete UserWindow.state.userSettings.authData;
    localStorage.clear();
  };

  static userName() {
    if (UserWindow.isUserLogIn) {
      const currentUserObject = JSON.parse(
        <string>localStorage.getItem(localStorageCurrentUserObjectName)
      ) as localStorageCurrentUserObject;
      return currentUserObject.name;
    }
    return undefined;
  }

  returnUserWindowElement() {
    if (this.boxElement.querySelector('.button')) {
      this.boxElement.removeChild(
        <HTMLElement>this.boxElement.querySelector('.button')
      );
    }
    if (UserWindow.isUserLogIn) {
      this.userNameTitle.innerText = <string>UserWindow.userName();
      return this.returnReadyBoxElement();
    }
    this.userNameTitle.innerText = brokenAuthorizationMessage;
    return this.boxElement;
  }
}
