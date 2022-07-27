const toHTML = (): string => {
  return `  
    <section class="section about-app" id="about-app">
      <div class="container">
        <h2 class="about-app__title">Преимущества приложения</h2>
        <ul class="about-app__list">        
          <li class="about-app__list-item"><div class="about-app__list-icon"></div><span>В учебнике собраны 3600 самых используемых в повседневной жизни слов</span></li>
          <li class="about-app__list-item"><div class="about-app__list-icon"></div><span>Игры, помогают пополнять словарный запас</span></li>
          <li class="about-app__list-item"><div class="about-app__list-icon"></div><span>Можно выбирать уровень сложности в играх</span></li>
          <li class="about-app__list-item"><div class="about-app__list-icon"></div><span>Отмечайте выученные слова, получайте только новые знания</span></li>
          <li class="about-app__list-item"><div class="about-app__list-icon"></div><span>Можешь отметить сложные для тебя слова, чтобы знать, на что чаще обращать внимание</span></li>
          <li class="about-app__list-item"><div class="about-app__list-icon"></div><span>Отслеживай свой прогресс в статистике</span></li>
        </ul>
      </div>
    </section>
  `;
};

export default function renderAboutApp(root: HTMLElement): void {
  const elem = root;

  elem.innerHTML = toHTML();
}
