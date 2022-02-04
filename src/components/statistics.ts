const toHTML = (): string => {
  return `  
    <section class="section textbook" id="textbook">
      <h2>Statistics</h2>
    </section>
  `;
};

export default function renderStatistics(root: HTMLElement): void {
  const elem = root;

  elem.innerHTML = toHTML();
}
