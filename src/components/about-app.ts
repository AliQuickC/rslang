const toHTML = (): string => {
  return `  
    <section class="section textbook" id="textbook">
      <h2>advantages of our application</h2>
    </section>
  `;
};

export default function renderAboutApp(root: HTMLElement): void {
  const elem = root;

  elem.innerHTML = toHTML();
}
