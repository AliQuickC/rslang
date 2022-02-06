const toHTML = (): string => {
  return `  
    <section class="section statistics" id="statistics">
      <div class="container">
        <h2>Statistics</h2>
      </div>
    </section>
  `;
};

export default function renderStatistics(root: HTMLElement): void {
  const elem = root;

  elem.innerHTML = toHTML();
}
