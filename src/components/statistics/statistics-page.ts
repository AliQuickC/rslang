import statisticsPageAsString from './statistics-page.html';
import gameStatisticsElementAsString from './game-statistics/game-statistics.html';
import getHtmlFromString from '../utilites/getHtmlFromString';
import {
  Auth,
  IDay,
  IDayStatistic,
  IGameStatistics,
  IStatistics,
  IStatisticsOptional,
  State,
} from '../../modules/types';
import { gameName, gameNameEnum } from '../utilites/types';
import StatisticsApi from './statistics-api/statistics-api';
import getChart from './chart/chart';

export default class StatisticsPage {
  private state: State;

  constructor(state: State) {
    this.state = state;
  }

  static getStatisticsPageElement(param: State) {
    const state = param;
    const statisticsPageElement = getHtmlFromString(
      statisticsPageAsString
    ).querySelector('.statistics-page') as HTMLElement;
    const radioAudioChallenge = statisticsPageElement.querySelector(
      '.radio_audio-challenge'
    ) as HTMLInputElement;
    const radioSprint = statisticsPageElement.querySelector(
      '.radio_sprint'
    ) as HTMLInputElement;
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
    const globalStatistics = statisticsPageElement.querySelector(
      '.global-statistics'
    ) as HTMLElement;
    const statistics = state.userSettings.statistics as IStatistics;
    if (!statistics.optional.day.statistic) {
      statistics.optional.day.statistic = [] as IDayStatistic[];
      const dayObject = {} as IDayStatistic;
      dayObject.newWords = 0;
      dayObject.learned = 0;
      statistics.optional.day.statistic.push(dayObject);
    }
    newWordsCountElement.innerText = ` ${statistics.optional.day.statistic[0].newWords}`;
    learnedCountElement.innerText = ` ${statistics.optional.day.statistic[0].learned}`;
    const rightCount =
      statistics.optional.audioChallenge.rightCount +
      statistics.optional.sprint.rightCount;
    const totalcount =
      statistics.optional.audioChallenge.totalCount +
      statistics.optional.sprint.totalCount;
    let percent = (rightCount * 100) / totalcount;
    if (percent === Infinity || Number.isNaN(percent)) {
      percent = 0;
    }
    rightAnswersPercentElement.innerText = ` ${Math.round(percent)}%`;
    gameStatisticsBox.innerHTML = '';
    (<IStatistics>state.userSettings.statistics).optional.currentGame =
      gameNameEnum.audioChallenge;
    gameStatisticsBox.append(
      StatisticsPage.getGameStatisticsElement(statistics)
    );


    radioAudioChallenge.addEventListener('change', () => {
      (<IStatistics>state.userSettings.statistics).optional.currentGame =
        gameNameEnum.audioChallenge;
      gameStatisticsBox.innerHTML = '';
      gameStatisticsBox.append(
        StatisticsPage.getGameStatisticsElement(
          <IStatistics>state.userSettings.statistics
        )
      );
    });

    radioSprint.addEventListener('change', () => {
      (<IStatistics>state.userSettings.statistics).optional.currentGame =
        gameNameEnum.sprint;
      gameStatisticsBox.innerHTML = '';
      gameStatisticsBox.append(
        StatisticsPage.getGameStatisticsElement(
          <IStatistics>state.userSettings.statistics
        )
      );
    });
    globalStatistics.append(getChart(state));

    return statisticsPageElement;
  }

  static getDefaultStatisticsObject(): IStatistics {
    const object = {} as IStatistics;
    object.learnedWords = 0;
    object.optional = {} as IStatisticsOptional;
    object.optional.currentGame = gameNameEnum.audioChallenge;
    object.optional.sprint = {} as IGameStatistics;
    object.optional.sprint.bestSeries = 0;
    object.optional.sprint.rightCount = 0;
    object.optional.sprint.totalCount = 0;
    object.optional.sprint.newWords = 0;
    object.optional.audioChallenge = {} as IGameStatistics;
    object.optional.audioChallenge.bestSeries = 0;
    object.optional.audioChallenge.rightCount = 0;
    object.optional.audioChallenge.totalCount = 0;
    object.optional.audioChallenge.newWords = 0;
    object.optional.day = {} as IDay;
    object.optional.day.statistic = [] as IDayStatistic[];
    object.optional.day.currentDay = StatisticsPage.getCurrentDate();
    const dayObject = {} as IDayStatistic;
    dayObject.newWords = 0;
    dayObject.learned = 0;
    object.optional.day.statistic[0] = dayObject;
    return object;
  }

  static getGameStatisticsElement(object: IStatistics) {
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
    let percent = (rightCount * 100) / object.optional[currentGame].totalCount;
    if (percent === Infinity || Number.isNaN(percent)) {
      percent = 0;
    }

    gameNewWordsCountElement.innerText = ` ${object.optional[currentGame].newWords}`;
    gameRightAnswersPercentElement.innerText = ` ${Math.round(percent)}%`;
    gameSeriesElement.innerText = ` ${object.optional[currentGame].bestSeries}`;
    return element;
  }

  static updateGameStatistics(
    param: State,
    game: gameName,
    array: boolean[],
    learnedCount: number,
    newWordsCount: number
  ): void {
    const state = param;
    // const newWordsCount = array.length;
    const rightsArray = array.filter((word) => word);

    const rightCount = rightsArray.length;
    let currentSeries = 0;
    let bestSeries = 0;
    for (let i = 0; i < array.length; i += 1) {
      if (array[i]) {
        currentSeries += 1;
      } else if (currentSeries > bestSeries) {
        bestSeries = currentSeries;
        currentSeries = 0;
      } else {
        currentSeries = 0;
      }
    }
    if (bestSeries < currentSeries) {
      bestSeries = currentSeries;
    }

    if (!state.userSettings.statistics) {
      state.userSettings.statistics =
        StatisticsPage.getDefaultStatisticsObject();
    } else {
      if (!state.userSettings.statistics.optional.day.statistic) {
        state.userSettings.statistics.optional.day.statistic =
          [] as IDayStatistic[];
      }
      state.userSettings.statistics.optional[game].newWords += newWordsCount;
      state.userSettings.statistics.optional[game].rightCount += rightCount;
      state.userSettings.statistics.optional[game].totalCount += array.length;

      state.userSettings.statistics.optional[game].bestSeries =
        bestSeries > state.userSettings.statistics.optional[game].bestSeries
          ? bestSeries
          : state.userSettings.statistics.optional[game].bestSeries;
    }
    StatisticsPage.updateDayStatistics(
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

  static updateDayStatistics(
    statisticsParam: IStatistics,
    newWordsCount: number,
    learnedCount: number
  ) {
    const statistics = statisticsParam;
    const resultObject = {} as IDayStatistic;
    if (
      statistics.optional.day.currentDay === StatisticsPage.getCurrentDate()
    ) {
      statistics.optional.day.statistic[0].newWords += newWordsCount;
      statistics.optional.day.statistic[0].learned += learnedCount;
    } else {
      resultObject.newWords = newWordsCount;
      resultObject.learned = learnedCount;
      statistics.optional.day.statistic.unshift(resultObject);
      statistics.optional.day.currentDay = StatisticsPage.getCurrentDate();
    }
    statistics.learnedWords += statistics.optional.day.statistic[0].learned;
  }

  static getCurrentDate(): string {
    const currentDate = new Date();
    const date = String(currentDate.getDate()).padStart(2, '0');
    const month = String(currentDate.getMonth() + 1).padStart(2, '0');
    const year = String(currentDate.getFullYear());
    return `${date}.${month}.${year}`;
  }
}
