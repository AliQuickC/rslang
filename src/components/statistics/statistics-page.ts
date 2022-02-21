import statisticsPageAsString from './statistics-page.html';
import gameStatisticsElementAsString from './game-statistics/game-statistics.html';
import getHtmlFromString from '../utilites/getHtmlFromString';
import { CurrentPageWord, State } from "../../modules/types";
import resultPageAsString from '../audio-challenge-game/result-page/game-result.html';

export default class StatisticsPage {
  private state: State;

  constructor(state: State) {
    this.state = state;
  }
  getStatisticsPageElement(
    rightAnswersArray: CurrentPageWord[],
    answersArray: boolean[]
  ) {
    const statisticsPageElement = getHtmlFromString(
      statisticsPageAsString
    ).querySelector('.statistics-page') as HTMLElement;

    const gameNewWordsCountElement =
      statisticsPageElement.querySelector('.game-new-words');
    const gameRightAnswersPercentElement =
      statisticsPageElement.querySelector('.game-percent');
    const gameSeriesElement =
      statisticsPageElement.querySelector('.game-series');

    const newWordsCountElement =
      statisticsPageElement.querySelector('.new-words');
    const learnedCountElement = statisticsPageElement.querySelector('.learned');
    const rightAnswersPercentElement =
      statisticsPageElement.querySelector('.rights');


    return statisticsPageElement;
  }


}
