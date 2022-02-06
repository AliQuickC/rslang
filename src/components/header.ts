import state from '../modules/state';

const toHTML = (): string => {
  return `
  <div class="container header-container">
  <nav class="nav">
  <ul class="menu">
      <li class="menu__item active" data-link="general">Главная</li>
      <li class="menu__item" data-link="schoolbook">Учебник</li>
      <li class="menu__item" data-link="audio-call-game">Audio call Game</li>
      <li class="menu__item" data-link="sprint-game">Sprint Game</li>
      ${
        state.authorized
          ? '<li class="menu__item" data-link="statistics">Статистика</li>'
          : ''
      }
    </ul>
    </nav>
    <div class="login">
    <span>${state.authorized ? 'Vasya' : 'Unauthorized user'}</span>
    <button data-link="login">${state.authorized ? 'LogOff' : 'LogIn'}</button>
  </div>
</div>
`;
};

export default function renderHeader(root: HTMLElement): void {
  const elem = root;
  elem.innerHTML = toHTML();
}
