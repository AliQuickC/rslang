import './sass/main.sass';
import userAuthorizationElement from './components/user-authorization/user-authorization';
import UserWindow from './components/user-authorization/user-window/user-window';

const userWindowInstance = new UserWindow();
const body = document.querySelector('body') as HTMLElement;

const userWindowElement = userWindowInstance.returnUserWindowElement();
body.append(userAuthorizationElement);

userWindowElement.addEventListener('click', () =>
  body.removeChild(userWindowElement)
);
userAuthorizationElement.addEventListener('click', () => {
  body.append(userWindowInstance.returnUserWindowElement());
});
