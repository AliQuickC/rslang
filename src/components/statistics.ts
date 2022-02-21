import { State } from "../modules/types";
import StatisticsPage from "./statistics/statistics-page";

const toHTML = (): string => {
  return `  
    <section class="section statistics" id="statistics">
      <div class="container">
        <h2>Statistics</h2>
      </div>
    </section>
  `;
};

export default function renderStatistics(root: HTMLElement, state: State): void {
  const elem = root;
  const statisticsInstance = new StatisticsPage(state);

  elem.innerHTML = toHTML();
  const section = elem.querySelector('section') as HTMLElement;
  section.append(statisticsInstance.getStatisticsPageElement())
}
