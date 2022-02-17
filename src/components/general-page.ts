import { State, UserSettings } from '../modules/types';

const toHTML = (props: UserSettings): string => {
  return `  
    <section class="section general" id="general">
      <div class="container general-container">
        <h1>General</h1>
        <button data-link="aboutApp">Возможности и Преимущества приложения</button>

        <button data-link="schoolbook">Учебник</button>
        <button data-link="audio-call-game-level">Audio call Game</button>
        <button data-link="sprint-game-level">Sprint Game</button>        
        ${
          props.authorized
            ? '<button data-link="statistics">Статистика</button>'
            : ''
        }
        <button data-link="development-team">О команде</button>

        <button data-link="login">${
          props.authorized ? 'LogOff' : 'LogIn'
        }</button>
      </div>
    </section>
  `;
};

export default function renderGeneralPage(
  root: HTMLElement,
  props: State
): void {
  const elem = root;

  elem.innerHTML = toHTML(props.userSettings);
}
