const toHTML = (): string => {
  return `  
    <section class="section general" id="general">
      <div class="container general-container">
        <h1>General</h1>      
        <button data-link="advantages">advantages of our application</button>

        <button data-link="textbook">Textbook</button>
        <button data-link="audio-call-game">Audio call Game</button>
        <button data-link="sprint-game">Sprint Game</button>
        <button data-link="statistics">Statistics</button>

        <button data-link="development-team">About development team</button>

        <button data-link="login">Login</button>
      </div>
    </section>
  `;
};

export default function renderGeneralPage(root: HTMLElement): void {
  const elem = root;

  elem.innerHTML = toHTML();
}
