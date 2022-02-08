import userAuthorizationElementString from "./user-authorization.html";
import getHtmlFromString from "../utilites/geHtmlFromString";
import Login from "./login/login";
import SignUp from "./signup/signup";


export default class UserAuthorization {
  // private static parentElement: HTMLElement;
  // private static state: State;
  //
  // constructor(parentElement: HTMLElement, state: State) {
  //   UserAuthorization.state = state;
  //   UserAuthorization.parentElement = parentElement;
  // }

  readonly userAuthorizationElement = getHtmlFromString(
    userAuthorizationElementString
  ).querySelector(".authorization-window") as HTMLDivElement;

  readonly buttonLogin = this.userAuthorizationElement.querySelector(
    ".login_button"
  ) as HTMLButtonElement;
  readonly buttonSignUp = this.userAuthorizationElement.querySelector(
    ".signup_button"
  ) as HTMLButtonElement;
  buttonsLogAndSign = this.userAuthorizationElement.querySelectorAll(
    ".log-buttons-shell__button"
  ) as NodeListOf<HTMLButtonElement>;

  readonly loginInstance = new Login(/* UserAuthorization.parentElement, UserAuthorization.state */);
  readonly signupInstance = new SignUp(/* UserAuthorization.parentElement, UserAuthorization.state */);
  loginBoxElement = this.loginInstance.returnReadyBoxElement();
  signupBoxElement = this.signupInstance.returnReadyBoxElement();
  statusActiveButtonClass = "activeSignButton";
  isLoginWindow = true;

  readonly boxWithLogButtons = this.userAuthorizationElement.querySelector(
    ".log-buttons-shell"
  ) as HTMLDivElement;


  switchLoginSetup(event: Event) {
    const currentBoxElement = document.querySelector(
      ".login-shell"
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
    this.boxWithLogButtons.addEventListener("click", (event) => this.switchLoginSetup(event));
    this.userAuthorizationElement.append(this.loginBoxElement);

    return this.userAuthorizationElement;
  }
}
