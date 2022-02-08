import './sass/main.sass';
// import userAuthorizationElement from './components/user-authorization/user-authorization';
import UserWindow from './components/user-authorization/user-window/user-window';
import UserAuthorization from "./components/user-authorization/user-authorization";

const userWindowInstance = new UserWindow();
const body = document.querySelector('body') as HTMLElement;

const userWindowElement = userWindowInstance.returnUserWindowElement();

const userAuthInstance = new UserAuthorization()
const userAuthorizationElement = userAuthInstance.readyElement
body.append(userAuthorizationElement,userWindowElement);

userWindowElement.addEventListener('click', () =>
  body.append(userAuthorizationElement)
);
// userAuthorizationElement.addEventListener('click', () => {
//   body.append(userWindowInstance.returnUserWindowElement());
// });
