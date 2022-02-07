import loginBoxElementAsString from './login.html';
import getHtmlFromString from '../../utilites/geHtmlFromString';
import Button from '../../universal-button/button';
import { idNameEmailPasswordType } from '../../utilites/types';
import User from '../userApi/userApi';

const body = document.querySelector('body') as HTMLElement;

export default class Login {
  parentElement = body;

  buttonInnerText = 'Enter';

  onClickOnEnterButton = this.logIn;

  boxElement = getHtmlFromString(loginBoxElementAsString).querySelector(
    '.login-shell'
  ) as HTMLDivElement;

  get inputElements() {
    return this.boxElement.querySelectorAll(
      '.login-input'
    ) as NodeListOf<HTMLInputElement>;
  }

  get emailInputElement() {
    return this.boxElement.querySelector('.email_input') as HTMLInputElement;
  }

  get passwordInputElement() {
    return this.boxElement.querySelector('.password_input') as HTMLInputElement;
  }

  returnObjectWithInfoFromInput(): idNameEmailPasswordType {
    return {
      email: this.emailInputElement.value,
      password: this.passwordInputElement.value,
    };
  }

  clearInputs(): void {
    this.inputElements.forEach((input, index) => {
      this.inputElements[index].value = '';
    });
  }

  logIn() {
    const objectFromInputs = this.returnObjectWithInfoFromInput();
    const loginWindow = document.querySelector(
      '.authorization-window'
    ) as HTMLDivElement;
    User.signIn(objectFromInputs)
      .then((result) => {
        if (result.ok) {
          this.parentElement.removeChild(loginWindow);
          return result.text();
        }
        return undefined;
      })
      .then((text) => {
        if (text) {
          localStorage.setItem('currentUser', <string>text);
        }
      })
      .catch((Error) => console.log(Error));
  }

  returnReadyBoxElement() {
    const button = Button.createReadyButtonElement(this.buttonInnerText, () =>
      this.onClickOnEnterButton()
    );
    this.boxElement.append(button);
    return this.boxElement;
  }
}
