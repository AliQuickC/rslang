import userAuthorizationElementString from './user-authorization.html';
import getHtmlFromString from '../utilites/geHtmlFromString';
import Login from './login/login';
import SignUp from './signup/signup';
import { State } from '../../modules/types';

export default class UserAuthorization {
  // private static parentElement: HTMLElement;
  // private static state: State;

  // // private loginInstance: () => Login;
  // private static loginInstance: Login;

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

  readonly userAuthorizationElement = getHtmlFromString(
    userAuthorizationElementString
  ).querySelector('.authorization-window') as HTMLDivElement;

  readonly buttonLogin = this.userAuthorizationElement.querySelector(
    '.login_button'
  ) as HTMLButtonElement;

  readonly buttonSignUp = this.userAuthorizationElement.querySelector(
    '.signup_button'
  ) as HTMLButtonElement;

  buttonsLogAndSign = this.userAuthorizationElement.querySelectorAll(
    '.log-buttons-shell__button'
  ) as NodeListOf<HTMLButtonElement>;

  // loginInstance = () => new Login(/* UserAuthorization.parentElement, *//* UserAuthorization.state */this.d);
  // signupInstance = () =>
  //   new SignUp(/* UserAuthorization.parentElement, */ UserAuthorization.state);

  // loginBoxElement = UserAuthorization.loginInstance.returnReadyBoxElement();

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
      this.isLoginWindow = true;
      currentBoxElement.replaceWith(this.loginBoxElement);
      this.buttonsLogAndSign.forEach((button) =>
        button.classList.toggle(this.statusActiveButtonClass)
      );
    }
    if (event.target === this.buttonSignUp && this.isLoginWindow) {
      currentBoxElement.replaceWith(this.signupBoxElement);
      this.buttonsLogAndSign.forEach((button) =>
        button.classList.toggle(this.statusActiveButtonClass)
      );
      this.isLoginWindow = false;
    }
  }

  get readyElement() {
    this.boxWithLogButtons.addEventListener('click', (event) =>
      this.switchLoginSetup(event)
    );
    this.userAuthorizationElement.append(this.loginBoxElement);

    return this.userAuthorizationElement;
  }

  getReadyElement(value: State) {
    this.boxWithLogButtons.addEventListener('click', (event) =>
      this.switchLoginSetup(event)
    );
    this.userAuthorizationElement.append(this.loginBoxElement);

    return this.userAuthorizationElement;
  }
}

//
// let obj = {test: 'str'};
// function f(a) {
//   a.test = 'another str'; a.dd = 'fgh';
// };
//
// class S {
//   constructor(aa){
//     this.aa = aa;
//     S.aa = aa
//   }
//   coty = () => new FF(S.aa)
//   fu(){
//     this.aa.ghj = 'rttttt'
//   }
//   fi(){
//     this.coty().fuv()
//   }
// }
// class FF {
//   constructor(bb) {
//     this.bb = bb;
//   }
//   fuv(){
//     console.log(this.bb)
//     // this.bb.ret = '123456'
//   }
// }
// const r = new S(obj);
//
// r.fu()
// r.fi()
//
// f(obj);
// // console.log(obj, '111111', r.aa); // Выведет 'another str'
