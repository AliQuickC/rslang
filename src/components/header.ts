import { UserSettings } from '../modules/types';

const toHTML = (param: UserSettings): string => {
  const props = param;
  return `
  <div class="container header-container">
  <nav class="nav">
  <ul class="menu">
      <li class="menu__item active" data-link="general">Главная</li>
      <li class="menu__item" data-link="schoolbook">Учебник</li>
      <li class="menu__item" data-link="audio-call-game">Audio call Game</li>
      <li class="menu__item" data-link="sprint-game">Sprint Game</li>
      ${
        props.authorized
          ? '<li class="menu__item" data-link="statistics">Статистика</li>'
          : ''
      }
    </ul>
    </nav>
    <div class="login">
    <span>${props.authorized ? 'Vasya' : 'Unauthorized user'}</span>
    <button data-link="login">${props.authorized ? 'LogOff' : 'LogIn'}</button>
  </div>
</div>
`;
};

export default function renderHeader(
  root: HTMLElement,
  props: UserSettings
): void {
  const elem = root;
  elem.innerHTML = toHTML(props);
}
