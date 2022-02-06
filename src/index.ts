import './sass/main.sass';
import userAuthorizationElement from './components/user-authorization/user-authorization';

const body = document.querySelector('body') as HTMLElement;
body.append(userAuthorizationElement);
