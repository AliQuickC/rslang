const toHTML = (): string => {
  return `  
    <section class="section textbook" id="textbook">
      <h2>Sprint Game</h2>
    </section>
  `;
};

export default function renderSprint(root: HTMLElement): void {
  const elem = root;

  elem.innerHTML = toHTML();
}
