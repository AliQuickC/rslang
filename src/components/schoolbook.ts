const toHTML = (): string => {
  return `  
    <section class="section schoolbook" id="schoolbook">
      <div class="container">
        <div class="chapters-wrap">
          <button class="chapter chapter1">Раздел 1</button>
          <button class="chapter chapter2">Раздел 2</button>
          <button class="chapter chapter3">Раздел 3</button>
          <button class="chapter chapter4">Раздел 4</button>
          <button class="chapter chapter5">Раздел 5</button>
          <button class="chapter chapter6">Раздел 6</button>
          <button class="chapter chapter7">Сложные слова</button>          
        </div>
        <div class="schoolbook-content">
          <h2>Раздел не выбран</h2>
        </div>
      </div>
    </section>
  `;
};

export default function renderSchoolbook(root: HTMLElement): void {
  const elem = root;

  elem.innerHTML = toHTML();
}
