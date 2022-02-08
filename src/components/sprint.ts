const toHTML = (): string => {
  return `  
    <section class="section sprint" id="sprint">
      <div class="container">
        <h2>Sprint Game</h2>
      </div>
    </section>
  `;
};

export default function renderSprint(root: HTMLElement): void {
  const elem = root;

  elem.innerHTML = toHTML();
}
