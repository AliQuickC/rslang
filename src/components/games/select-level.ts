import { GameName, State } from '../../modules/types';

const toHTML = (game: GameName): string => {
  return `
  <section class="section game-level">
    <div class="container container-select-level">
      <div class="select-level">
        <h4 class="select-level__title">Выберите уровень сложности игры:</h4>
        <div class="select-level__btn-wrap">
          <button data-game-name="${game}" data-level="1">1</button>
          <button data-game-name="${game}" data-level="2">2</button>
          <button data-game-name="${game}" data-level="3">3</button>
          <button data-game-name="${game}" data-level="4">4</button>
          <button data-game-name="${game}" data-level="5">5</button>
          <button data-game-name="${game}" data-level="6">6</button>
        </div>
      </div>
    </div>
  </section>
  `;
};

export default async function renderSelectGameLevel(
  root: HTMLElement,
  props: State
): Promise<void> {
  const elem = root;

  elem.innerHTML = toHTML(props.gameOptions.selectGame);
}
