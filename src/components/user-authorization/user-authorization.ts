import userAuthorizationElementString from './user-authorization.html';
import getHtmlFromString from '../utilites/geHtmlFromString';
import Login from './login/login';
import SignUp from './signup/signup';
import { State } from '../../modules/types';

export default class UserAuthorization {
  private loginInstance: Login;

  private loginBoxElement: HTMLDivElement;

  private signupInstance: SignUp;

  private signupBoxElement: HTMLDivElement;

  constructor(/* parentElement: HTMLElement,  */ state: State) {
    this.loginInstance = new Login(/* parentElement, */ state);
    this.loginBoxElement = this.loginInstance.returnReadyBoxElement();
    this.signupInstance = new SignUp(/* parentElement, */ state);
    this.signupBoxElement = this.signupInstance.returnReadyBoxElement();
  }

  userAuthorizationElement = getHtmlFromString(
    userAuthorizationElementString
  ).querySelector('.authorization-window') as HTMLDivElement;

  readonly buttonLogin = this.userAuthorizationElement.querySelector(
    '.login_button'
  ) as HTMLButtonElement;

  readonly buttonSignUp = this.userAuthorizationElement.querySelector(
    '.signup_button'
  ) as HTMLButtonElement;

  readonly buttonsLogAndSign = this.userAuthorizationElement.querySelectorAll(
    '.log-buttons-shell__button'
  ) as NodeListOf<HTMLButtonElement>;

  readonly buttonClose = this.userAuthorizationElement.querySelector(
    '.button-close'
  ) as HTMLElement;

  statusActiveButtonClass = 'activeSignButton';

  isLoginWindow = true;

  readonly boxWithLogButtons = this.userAuthorizationElement.querySelector(
    '.log-buttons-shell'
  ) as HTMLDivElement;

  switchLoginSetup(event: Event) {
    const currentBoxElement = document.querySelector(
      '.login-shell'
    ) as HTMLDivElement;
    if (event.target === this.buttonLogin && !this.isLoginWindow) {
      currentBoxElement.replaceWith(this.loginBoxElement);
      this.switchLoginSignup()
    }
    if (event.target === this.buttonSignUp && this.isLoginWindow) {
      currentBoxElement.replaceWith(this.signupBoxElement);
      this.switchLoginSignup()
    }
  }

  switchLoginSignup(){
    this.buttonsLogAndSign.forEach((button) => {
      button.classList.toggle(this.statusActiveButtonClass);
    });
    this.isLoginWindow = !this.isLoginWindow;
  }

  getReadyElement() {
    if (!this.isLoginWindow) {
      this.switchLoginSignup()
    }
    (<HTMLElement>(
      this.userAuthorizationElement.querySelector('.login-box')
    )).innerHTML = '';
    this.boxWithLogButtons.addEventListener('click', (event) =>
      this.switchLoginSetup(event)
    );
    this.buttonClose.addEventListener('click', () => {
      const parent = this.userAuthorizationElement.parentElement as HTMLElement;
      if (parent) {
        parent.removeChild(this.userAuthorizationElement);
      }
    });
    (<HTMLElement>(
      this.userAuthorizationElement.querySelector('.login-box')
    )).append(this.loginBoxElement);

    return this.userAuthorizationElement;
  }
}
