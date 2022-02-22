import statisticsPageAsString from './statistics-page.html';
import gameStatisticsElementAsString from './game-statistics/game-statistics.html';
import getHtmlFromString from '../utilites/getHtmlFromString';
import {
  Auth, CurrentPage,
  IDay,
  IDayStatistics,
  IGameStatistics,
  IStatistics,
  IStatisticsOptional,
  State
} from "../../modules/types";
import { gameName, gameNameEnum } from '../utilites/types';
import StatisticsApi from './statistics-api/statistics-api';
import chartDiv from "./chart/chart";
import getChart from "./chart/chart";

export default class StatisticsPage {
  private state: State;

  constructor(state: State) {
    this.state = state;
  }

  getStatisticsPageElement(state: State) {
    const statisticsPageElement = getHtmlFromString(
      statisticsPageAsString
    ).querySelector('.statistics-page') as HTMLElement;

    const gameStatisticsCheckShell = statisticsPageElement.querySelector(
      '.game-statistics__check-box'
    ) as HTMLElement;
    const radioAudioChallenge = statisticsPageElement.querySelector(
      '.radio_audio-challenge'
    ) as HTMLInputElement;
    const radioSprint = statisticsPageElement.querySelector(
      '.radio_sprint'
    ) as HTMLInputElement;
    const labelAudioChallenge = statisticsPageElement.querySelector(
      '.label_audio-challenge'
    ) as HTMLElement;
    const labelSprint = statisticsPageElement.querySelector(
      '.label_sprint'
    ) as HTMLElement;
    const gameStatisticsBox = statisticsPageElement.querySelector(
      '.game-statistics__results'
    ) as HTMLElement;

    const newWordsCountElement = statisticsPageElement.querySelector(
      '.new-words'
    ) as HTMLSpanElement;
    const learnedCountElement = statisticsPageElement.querySelector(
      '.learned'
    ) as HTMLSpanElement;
    const rightAnswersPercentElement = statisticsPageElement.querySelector(
      '.rights'
    ) as HTMLSpanElement;
    const globalStatistics = statisticsPageElement.querySelector('.global-statistics') as HTMLElement;

    const authData = state.userSettings.authData as Auth;

    const statistics = state.userSettings.statistics as IStatistics;
    newWordsCountElement.innerText = ` ${statistics.optional.day.statistics[0].newWords}`;
    learnedCountElement.innerText = ` ${statistics.optional.day.statistics[0].learned}`;
    const rightCount =
      statistics.optional.audioChallenge.rightCount +
      statistics.optional.sprint.rightCount;
    let percent =
      (rightCount * 100) / statistics.optional.day.statistics[0].newWords;
    if (percent === Infinity || isNaN(percent)) {
      percent = 0;
    }
    rightAnswersPercentElement.innerText = ` ${Math.round(percent)}%`;
    gameStatisticsBox.innerHTML = '';
    gameStatisticsBox.append(this.getGameStatisticsElement(statistics));

    radioAudioChallenge.addEventListener('change', () => {
      (<IStatistics>state.userSettings.statistics).optional.currentGame =
        gameNameEnum.audioChallenge;
      gameStatisticsBox.innerHTML = '';
      gameStatisticsBox.append(
        this.getGameStatisticsElement(
          <IStatistics>state.userSettings.statistics
        )
      );
    });

    radioSprint.addEventListener('change', () => {
      (<IStatistics>state.userSettings.statistics).optional.currentGame =
        gameNameEnum.sprint;
      gameStatisticsBox.innerHTML = '';
      gameStatisticsBox.append(
        this.getGameStatisticsElement(
          <IStatistics>state.userSettings.statistics
        )
      );
    });
    globalStatistics.append(getChart(state))

    return statisticsPageElement;
  }

  getDefaultStatisticsObject(): IStatistics {
    const object = {} as IStatistics;
    object.learnedWords = 0;
    object.optional = {} as IStatisticsOptional;
    object.optional.currentGame = gameNameEnum.audioChallenge;
    object.optional.sprint = {} as IGameStatistics;
    object.optional.sprint.bestSeries = 0;
    object.optional.sprint.rightCount = 0;
    object.optional.sprint.newWords = 0;
    object.optional.audioChallenge = {} as IGameStatistics;
    object.optional.audioChallenge.bestSeries = 0;
    object.optional.audioChallenge.rightCount = 0;
    object.optional.audioChallenge.newWords = 0;
    object.optional.day = {} as IDay;
    object.optional.day.statistics = [] as IDayStatistics[];
    object.optional.day.currentDay = this.getCurrentDate();
    const dayObject = {} as IDayStatistics;
    dayObject.newWords = 0;
    dayObject.learned = 0;
    object.optional.day.statistics[0] = dayObject;
    return object;
  }

  getGameStatisticsElement(object: IStatistics) {
    const currentGame =
      object.optional.currentGame || gameNameEnum.audioChallenge;
    const element = getHtmlFromString(
      gameStatisticsElementAsString
    ).querySelector('.game-statistics') as HTMLUListElement;
    const gameNewWordsCountElement = element.querySelector(
      '.game-new-words'
    ) as HTMLSpanElement;
    const gameRightAnswersPercentElement = element.querySelector(
      '.game-percent'
    ) as HTMLSpanElement;
    const gameSeriesElement = element.querySelector(
      '.game-series'
    ) as HTMLSpanElement;
    const { rightCount } = object.optional[currentGame];
    let percent = (rightCount * 100) / object.optional[currentGame].newWords;
    if (percent === Infinity || isNaN(percent)) {
      percent = 0;
    }

    gameNewWordsCountElement.innerText = ` ${object.optional[currentGame].newWords}`;
    gameRightAnswersPercentElement.innerText = ` ${Math.round(percent)}%`;
    gameSeriesElement.innerText = ` ${object.optional[currentGame].bestSeries}`;
    return element;
  }

  updateGameStatistics(
    state: State,
    game: gameName,
    array: boolean[],
    learnedCount: number,
    newWordsCount: number
  ): void {
    // const newWordsCount = array.length;
    const rightsArray = array.filter((word, i) => {
      if (array[i]) {
        return word;
      }
    });

    const rightCount = rightsArray.length;
    let currentSeries = 0;
    let bestSeries = 0;
    for (let i = 0; i < array.length; i++) {
      if (array[i]) {
        currentSeries++;
      } else if (currentSeries > bestSeries) {
        bestSeries = currentSeries;
        currentSeries = 0;
      } else {
        currentSeries = 0;
      }
    }

    if (!state.userSettings.statistics) {
      state.userSettings.statistics = this.getDefaultStatisticsObject();
    } else {
      state.userSettings.statistics.optional[game].newWords += newWordsCount;
      state.userSettings.statistics.optional[game].rightCount += rightCount;

      state.userSettings.statistics.optional[game].bestSeries =
        bestSeries > state.userSettings.statistics.optional[game].bestSeries
          ? bestSeries
          : state.userSettings.statistics.optional[game].bestSeries;
    }
    this.updateDayStatistics(
      state.userSettings.statistics,
      newWordsCount,
      learnedCount
    );
    const authData = state.userSettings.authData as Auth;
    StatisticsApi.putStatistics(
      authData.userId,
      authData.token,
      state.userSettings.statistics
    );
  }

  updateDayStatistics(
    statistics: IStatistics,
    newWordsCount: number,
    learnedCount: number
  ) {
    const resultObject = {} as IDayStatistics;
    if (statistics.optional.day.currentDay === this.getCurrentDate()) {
      statistics.optional.day.statistics[0].newWords += newWordsCount;
      statistics.optional.day.statistics[0].learned += learnedCount;
    } else {
      resultObject.newWords = newWordsCount;
      resultObject.learned = learnedCount;
      statistics.optional.day.statistics.unshift(resultObject);
      statistics.optional.day.currentDay = this.getCurrentDate();
    }
    statistics.learnedWords += statistics.optional.day.statistics[0].learned;
  }

  getCurrentDate(): string {
    const currentDate = new Date();
    const date = String(currentDate.getDate()).padStart(2, '0');
    const month = String(currentDate.getMonth() + 1).padStart(2, '0');
    const year = String(currentDate.getFullYear());
    return `${date}.${month}.${year}`;
  }
}
