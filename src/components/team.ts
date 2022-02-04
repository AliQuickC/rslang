const toHTML = (): string => {
  return `  
    <section class="section textbook" id="textbook">
      <h2>About development team</h2>
    </section>
  `;
};

export default function renderTeam(root: HTMLElement): void {
  const elem = root;

  elem.innerHTML = toHTML();
}
