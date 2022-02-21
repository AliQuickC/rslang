import signupBoxElementAsString from './signup.html';
import Login from '../login/login';
import { idNameEmailPasswordType } from '../../utilites/types';
import getHtmlFromString from '../../utilites/getHtmlFromString';
import User from '../userApi/userApi';
import renderHeader from '../../header';
import getErrorWindow from '../error-window/error-window';
import { errorMessage } from '../../utilites/consts';

export default class SignUp extends Login {
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
    if (
      this.passwordInputElement.value !== this.passwordRepeatInputElement.value
    ) {
      loginWindow.append(
        getErrorWindow(errorMessage.wrongPasswordRepeat, loginWindow)
      );
    } else if (this.passwordInputElement.value.length < 8) {
      loginWindow.append(
        getErrorWindow(errorMessage.wrongPasswordLength, loginWindow)
      );
    } else if (
      !this.emailInputElement.value.includes('@') ||
      !this.emailInputElement.value.includes('.')
    ) {
      loginWindow.append(getErrorWindow(errorMessage.wrongEmail, loginWindow));
    } else if (this.nameInputElement.value.length < 1) {
      loginWindow.append(getErrorWindow(errorMessage.wrongName, loginWindow));
    } else {
      User.createUser(this.returnObjectWithInfoFromInput())
        .then((response) => {
          if (response.ok) {
            // this.parentElement.removeChild(loginWindow);

            delete SignUp.state.userSettings.authData;
            SignUp.state.userSettings.authorized = false;
            const congratulationMessage = getErrorWindow(errorMessage.registrationSuccess, loginWindow);
            loginWindow.append(
              congratulationMessage
            );
            congratulationMessage.addEventListener('click',()=>this.parentElement.removeChild(loginWindow))
            renderHeader(
              document.querySelector('#header') as HTMLElement,
              SignUp.state
            );
          } else if (response.status === 417) {
            loginWindow.append(
              getErrorWindow(errorMessage.userExist, loginWindow)
            );
          }
        })
        .catch((error) => {
          console.log(error, error.status);
        });
    }
  }
}
