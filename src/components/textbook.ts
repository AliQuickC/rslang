const toHTML = (): string => {
  return `  
    <div class="textbook" id="textbook">
      <h2>Textbook</h2>
    </div>
  `;
};

export default function renderTextbook(root: HTMLElement): void {
  const elem = root;

  elem.innerHTML = toHTML();
  // addEventsForTextbook();
}
