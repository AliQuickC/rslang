const toHTML = (): string => {
  return `  
    <section class="section audio-call" id="audio-call">
      <div class="container">
        <h2>Audio Call Game</h2>
      </div>
    </section>
  `;
};

export default function renderAudioCall(root: HTMLElement): void {
  const elem = root;

  elem.innerHTML = toHTML();
}
