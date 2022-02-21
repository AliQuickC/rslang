const toHTML = (): string => {
  return `  
    <section class="section section-team" id="team">
      <div class="container container-team">
        <h2 class="team__title">Команда разработчиков</h2>
        <div class="team__wrap">
          <div class="team__developer team__developer1 developer">
            <img class="developer__photo" src="./assets/images/team/programmer.jpg" alt="developer foto">
            <a class="github-link" href="https://github.com/AliQuickC" target="_blank" rel="noopener noreferrer">
              <span class="github-logo"></span>
              <span class="github-name developer__name">Александр</span>
            </a>            
            <ul class="developer__work">
              <li>Верстка главной страници и основный частей сайта</li>
              <li>Учебник</li>
              <li>Логика изучения слов, отображение прогресса изучения слов</li>
              <li>Разработка игры Спринт</li>
            </ul>
          </div>
          <div class="team__developer team__developer2 developer">
            <img class="developer__photo" src="./assets/images/team/programmer.jpg" alt="developer foto">
            <a class="github-link" href="https://github.com/MDz1985" target="_blank" rel="noopener noreferrer">
              <span class="github-logo"></span>
              <span class="github-name developer__name">Дмитрий</span>
            </a>
            <ul class="developer__work">
              <li>Дизайн главной страници сайта</li>
              <li>Страница авторизация пользователя</li>
              <li>Вывод результатов игр</li>
              <li>Разработка игры Аудиовызов</li>
            </ul>
          </div>
        </div>
      </div>
    </section>
  `;
};

export default function renderTeam(root: HTMLElement): void {
  const elem = root;

  elem.innerHTML = toHTML();
}
