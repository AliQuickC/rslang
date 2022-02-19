import { State, UserSettings } from '../modules/types';

const toHTML = (props: UserSettings): string => {
  return `  
    <section class="section general-section" id="general">
      <div class="container general-container">
        <div class="general">
          <h1 class="general__title">Изучаем английский</h1>

          <div class="general__link-wrap">
            <div class="general__aboutapp general__item">
              <button data-link="aboutApp"><img data-link="aboutApp" src="../assets/img/main-page/about-app.png" alt=""></button>
              <h4>Возможности и Преимущества приложения</h4>  
            </div>
            <div class="general__schoolbook general__item">            
              <button data-link="schoolbook"><img data-link="schoolbook" src="../assets/img/main-page/schoolbook.png" alt=""></button>
              <h4>Учебник</h4>  
            </div>
            <div class="general__login general__item">            
              <button data-link="login">
              <img data-link="login" src="../assets/img/main-page/${
                props.authorized ? 'logoff' : 'login'
              }.png" alt="">
              </button>
              <h4>${
                props.authorized ? 'Выйти' : 'Войти/Зарегистрироваться'
              }</h4>
            </div>
            <div class="general__audio-call general__item">            
              <button data-link="audio-call-game-level"><img data-link="audio-call-game-level" src="../assets/img/main-page/audio-call-game.png" alt=""></button>            
              <h4>Игра Аудиовызов</h4>  
            </div>
            <div class="general__sprint-game general__item">
              <button data-link="sprint-game-level"><img data-link="sprint-game-level" src="../assets/img/main-page/sprint-game.png" alt=""></button>  
              <h4>Игра Спринт</h4>  
            </div>
            <div class="general__team general__item">            
              <button data-link="development-team"><img data-link="development-team" src="../assets/img/main-page/team.png" alt=""></button>
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
