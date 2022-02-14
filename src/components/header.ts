import { linkType, UserSettings } from '../modules/types';

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
    <span class="login__name">${
      props.authorized ? props.authData?.name : 'Unauthorized user'
    }</span>
    <button class="login__btn" data-link="login">${
      props.authorized ? 'LogOff' : 'LogIn'
    }</button>
  </div>
</div>
`;
};

export function activateMenuItem(props: UserSettings): void {
  const header = document.querySelector('#header') as HTMLElement;
  const menuItems = header.querySelectorAll('.menu__item');

  menuItems.forEach((item) => {
    if ((<HTMLElement>item).dataset.link === linkType[props.currentPage]) {
      item.classList.add('active');
    } else {
      item.classList.remove('active');
    }
  });
}

export default function renderHeader(
  root: HTMLElement,
  props: UserSettings
): void {
  const elem = root;
  elem.innerHTML = toHTML(props);
}
