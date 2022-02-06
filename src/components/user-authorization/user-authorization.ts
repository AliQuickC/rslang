import userAuthorizationElementString from './user-authorization.html';
import getHtmlFromString from '../utilites/geHtmlFromString';
import Login from './login/login';
import SignUp from './signup/signup';

const userAuthorizationElement = getHtmlFromString(
  userAuthorizationElementString
).querySelector('.authorization-window') as HTMLDivElement;
const labelClassName = 'user-authorization-label';
const inputClassName = 'user-authorization-label__input';

// class UserAuthorization {
//   static returnNodeListOfInputElements(): NodeListOf<HTMLInputElement> {
//     return document.querySelectorAll(inputClassName);
//   }
//
//   clearInputs(): void {
//     const inputElements = UserAuthorization.returnNodeListOfInputElements();
//     const inputElementsClone = inputElements;
//     inputElements.forEach((input, index) => {
//       inputElements[index].value = '';
//     });
//   }
//
//   // create
// }

// const userAuthorization = new UserAuthorization();
const buttonLogin = userAuthorizationElement.querySelector(
  '.login_button'
) as HTMLButtonElement;
const buttonSignUp = userAuthorizationElement.querySelector(
  '.signup_button'
) as HTMLButtonElement;
const buttonsLogAndSign = userAuthorizationElement.querySelectorAll(
  '.log-buttons-shell__button'
) as NodeListOf<HTMLButtonElement>;
const boxWithLogButtons = userAuthorizationElement.querySelector(
  '.log-buttons-shell'
) as HTMLDivElement;
const loginInstance = new Login();
const signupInstance = new SignUp();
const loginBoxElement = loginInstance.returnReadyBoxElement();
const signupBoxElement = signupInstance.returnReadyBoxElement();
const statusActiveButtonClass = 'activeSignButton';
let isLoginWindow = true;

function switchLoginSetup(event: Event) {
  const currentBoxElement = document.querySelector(
    '.login-shell'
  ) as HTMLDivElement;
  if (event.target === buttonLogin && !isLoginWindow) {
    isLoginWindow = true;
    currentBoxElement.replaceWith(loginBoxElement);
    buttonsLogAndSign.forEach((button) =>
      button.classList.toggle(statusActiveButtonClass)
    );
  }
  if (event.target === buttonSignUp && isLoginWindow) {
    currentBoxElement.replaceWith(signupBoxElement);
    buttonsLogAndSign.forEach((button) =>
      button.classList.toggle(statusActiveButtonClass)
    );
    isLoginWindow = false;
  }
}

boxWithLogButtons.addEventListener('click', (event) => switchLoginSetup(event));

userAuthorizationElement.append(loginBoxElement);
export default userAuthorizationElement;
