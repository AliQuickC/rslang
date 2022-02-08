const toHTML = (): string => {
  return `  
    <section class="section team" id="team">
      <div class="container">
        <h2>About development team</h2>
      </div>
    </section>
  `;
};

export default function renderTeam(root: HTMLElement): void {
  const elem = root;

  elem.innerHTML = toHTML();
}
