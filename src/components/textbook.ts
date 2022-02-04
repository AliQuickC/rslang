const toHTML = (): string => {
  return `  
    <section class="section textbook" id="textbook">
      <h2>Textbook</h2>
    </section>
  `;
};

export default function renderTextbook(root: HTMLElement): void {
  const elem = root;

  elem.innerHTML = toHTML();
}
