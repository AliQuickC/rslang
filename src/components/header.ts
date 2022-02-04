import state from '../modules/state';

const toHTML = (): string => {
  return `
  <div class="container header-container">
  <nav class="nav">
  <ul class="menu">
      <li class="menu__item" data-link="general">General</li>
      <li class="menu__item" data-link="textbook">Textbook</li>
      <li class="menu__item" data-link="audio-call-game">Audio call Game</li>
      <li class="menu__item" data-link="sprint-game">Sprint Game</li>
      ${
        state.authorized
          ? '<li class="menu__item" data-link="statistics">Statistics</li>'
          : ''
      }
    </ul>
    </nav>
    <div class="login">
    <span>${state.authorized ? 'Vasya' : 'Unauthorized user'}</span>
    <button data-link="login">Login</button>
  </div>
</div>
`;
};

export default function renderHeader(root: HTMLElement): void {
  const elem = document.createElement('header');
  elem.classList.add('header');
  elem.innerHTML = toHTML();
  root.append(elem);
}
