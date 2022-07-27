import { State, UserSettings } from '../modules/types';
import aboutApp from '../assets/images/main-page/about-app.png';
import schoolbook from '../assets/images/main-page/schoolbook.png';
import logoff from '../assets/images/main-page/logoff.png';
import login from '../assets/images/main-page/login.png';
import audioCallGame from '../assets/images/main-page/audio-call-game.png';
import sprintGame from '../assets/images/main-page/sprint-game.png';
import team from '../assets/images/main-page/team.png';

const toHTML = (props: UserSettings): string => {
  return `  
    <section class="section general-section" id="general">
      <div class="container general-container">
        <div class="general">
          <h1 class="general__title">Изучаем английский</h1>

          <div class="general__link-wrap">
            <div class="general__aboutapp general__item">
              <button data-link="aboutApp"><img data-link="aboutApp" src="${aboutApp}" alt=""></button>
              <h4>Возможности и Преимущества приложения</h4>  
            </div>
            <div class="general__schoolbook general__item">            
              <button data-link="schoolbook"><img data-link="schoolbook" src="${schoolbook}" alt=""></button>
              <h4>Учебник</h4>  
            </div>
            <div class="general__login general__item">
              <button data-link="login">
              <img data-link="login" src="${
                props.authorized ? logoff : login
              }" alt="">
              </button>
              <h4>${
                props.authorized ? 'Выйти' : 'Войти - Зарегистрироваться'
              }</h4>
            </div>
            <div class="general__audio-call general__item">            
              <button data-link="audio-call-game-level"><img data-link="audio-call-game-level" src="${audioCallGame}" alt=""></button>            
              <h4>Игра Аудиовызов</h4>  
            </div>
            <div class="general__sprint-game general__item">
              <button data-link="sprint-game-level"><img data-link="sprint-game-level" src="${sprintGame}" alt=""></button>  
              <h4>Игра Спринт</h4>  
            </div>
            <div class="general__team general__item">            
              <button data-link="development-team"><img data-link="development-team" src="${team}" alt=""></button>
              <h4>О команде</h4>  
            </div>

          </div>
        </div>

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
