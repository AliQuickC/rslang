const toHTML = (): string => {
  return `  
    <section class="section textbook" id="textbook">
      <h2>Audio Call Game</h2>
    </section>
  `;
};

export default function renderAudioCall(root: HTMLElement): void {
  const elem = root;

  elem.innerHTML = toHTML();
}
