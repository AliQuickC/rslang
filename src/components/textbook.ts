const toHTML = (): string => {
  return `  
    <section class="section textbook" id="textbook">
      <div class="container">
        <h2>Textbook</h2>
      </div>
    </section>
  `;
};

export default function renderTextbook(root: HTMLElement): void {
  const elem = root;

  elem.innerHTML = toHTML();
}
