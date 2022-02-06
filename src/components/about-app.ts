const toHTML = (): string => {
  return `  
    <section class="section textbook" id="textbook">
      <div class="container">
        <h2>advantages of our application</h2>
      </div>
    </section>
  `;
};

export default function renderAboutApp(root: HTMLElement): void {
  const elem = root;

  elem.innerHTML = toHTML();
}
