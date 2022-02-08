import signupBoxElementAsString from './signup.html';
import Login from '../login/login';
import { idNameEmailPasswordType } from '../../utilites/types';
import getHtmlFromString from '../../utilites/geHtmlFromString';
import User from '../userApi/userApi';

export default class SignUp extends Login {
  // constructor(parentElement:HTMLElement, state:State) {
  //   super(parentElement, state);
  // }
  onClickOnEnterButton = this.signUp;

  boxElement = getHtmlFromString(signupBoxElementAsString).querySelector(
    '.login-shell'
  ) as HTMLDivElement;

  nameInputElement = this.boxElement.querySelector(
    '.name_input'
  ) as HTMLInputElement;

  passwordRepeatInputElement = this.boxElement.querySelector(
    '.password_repeat_input'
  ) as HTMLInputElement;

  returnObjectWithInfoFromInput(): idNameEmailPasswordType {
    return {
      name: this.nameInputElement.value,
      email: this.emailInputElement.value,
      password: this.passwordInputElement.value,
    };
  }

  signUp() {
    const loginWindow = document.querySelector(
      '.authorization-window'
    ) as HTMLDivElement;
    console.log(
      this.passwordInputElement.value,
      this.emailInputElement.value,
      'ret'
    );
    if (
      this.passwordInputElement.value !== this.passwordRepeatInputElement.value
    ) {
      alert('wrong password repeat');
    } else {
      User.createUser(this.returnObjectWithInfoFromInput()).then((response) => {
        if (response.ok) {
          this.parentElement.removeChild(loginWindow);
          alert(`success ${response.text()}`);
        }
      });
    }
  }
}
