import statisticsPageAsString from "./statistics-page.html";
import gameStatisticsElementAsString from "./game-statistics/game-statistics.html";
import getHtmlFromString from "../utilites/getHtmlFromString";
import {
  IDay,
  IDayStatistics,
  IGameStatistics,
  IStatistics,
  IStatisticsOptional,
  State,
  UserSettings
} from "../../modules/types";
import { gameName, gameNameEnum } from "../utilites/types";

export default class StatisticsPage {
  private state: State;

  constructor(state: State) {
    this.state = state;
  }

  getStatisticsPageElement() {
    const statisticsPageElement = getHtmlFromString(
      statisticsPageAsString
    ).querySelector(".statistics-page") as HTMLElement;

    const radioButton = statisticsPageElement.querySelector(
      ".radio_audio-challenge"
    ) as HTMLInputElement;
    const gameStatisticsBox = statisticsPageElement.querySelector(
      ".game-statistics__results"
    ) as HTMLElement;
    // const gameNewWordsCountElement = statisticsPageElement.querySelector(
    //   '.game-new-words'
    // ) as HTMLSpanElement;
    // const gameRightAnswersPercentElement = statisticsPageElement.querySelector(
    //   '.game-percent'
    // ) as HTMLSpanElement;
    // const gameSeriesElement = statisticsPageElement.querySelector(
    //   '.game-series'
    // ) as HTMLSpanElement;

    const newWordsCountElement = statisticsPageElement.querySelector(
      ".new-words"
    ) as HTMLSpanElement;
    const learnedCountElement = statisticsPageElement.querySelector(
      ".learned"
    ) as HTMLSpanElement;
    const rightAnswersPercentElement = statisticsPageElement.querySelector(
      ".rights"
    ) as HTMLSpanElement;

    const statistics = this.state.userSettings.statistics as IStatistics;
    if (!statistics){
      this.state.userSettings.statistics = this.createStatisticsObject(
        this.state
      );
    }
    console.log(this.state)
    radioButton.addEventListener("change", (event) =>
      this.onChangeFunction(event, statistics, gameStatisticsBox)
    );




    return statisticsPageElement;
  }

  onChangeFunction(
    event: Event,
    statistics: IStatistics,
    element: HTMLElement
  ) {
    const currentTarget = event.currentTarget as HTMLInputElement;
    let currentGame: gameName;
    if (currentTarget.checked) {
      currentGame = gameNameEnum.audioChallenge;
    } else {
      currentGame = gameNameEnum.sprint;
    }
    if (statistics) {
      statistics.optional.currentGame = currentGame;
      element.innerHTML = "";
      element.append(this.getGameStatisticsElement(statistics));
    }
  }

  // const statisticsObject = this.createStatisticsObject(this.state);
  // const currentGame = 8;
  // // gameNewWordsCountElement.innerText

  // return statisticsPageElement;
  // }

  getGameStatisticsElement(object: IStatistics) {
    const currentGame = object.optional.currentGame;
    const element = getHtmlFromString(
      gameStatisticsElementAsString
    ).querySelector(".game-statistics") as HTMLUListElement;
    const gameNewWordsCountElement = element.querySelector(
      ".game-new-words"
    ) as HTMLSpanElement;
    const gameRightAnswersPercentElement = element.querySelector(
      ".game-percent"
    ) as HTMLSpanElement;
    const gameSeriesElement = element.querySelector(
      ".game-series"
    ) as HTMLSpanElement;
    gameNewWordsCountElement.innerText = `${object.optional[currentGame].newWords}`;
    gameRightAnswersPercentElement.innerText = `${object.optional[currentGame].rightCount}`;
    gameSeriesElement.innerText = `${object.optional[currentGame].bestSeries}`;
    return element;
  }

  createStatisticsObject(state: State): IStatistics {
    const resultObject = {} as IStatistics;
    resultObject.learnedWords = state.userSettings.statistics
      ? state.userSettings.statistics.learnedWords
      : 0;
    resultObject.optional = {} as IStatisticsOptional;
    resultObject.optional.currentGame = state.userSettings.statistics
      ? state.userSettings.statistics.optional.currentGame
      : gameNameEnum.audioChallenge;
    resultObject.optional.sprint = this.createGameStatisticsObject(
      state,
      gameNameEnum.sprint
    );
    resultObject.optional.audioChallenge = this.createGameStatisticsObject(
      state,
      gameNameEnum.audioChallenge
    );
    // const newWordsCount = resultObject.optional.sprint.newWords + resultObject.optional.audioChallenge.newWords;
  // , newWordsCount, resultObject.optional.day.statistics[0].learned
    resultObject.optional.day = this.createDayStatisticsObject(resultObject);

    // if ((<IStatistics>state.userSettings.statistics).optional.day.currentDay === this.getCurrentDate()) {
    //   // (<IStatistics>state.userSettings.statistics).optional.day;
    // }
    console.log(resultObject);
    return resultObject;
  }

  createGameStatisticsObject(state: State, game: gameName): IGameStatistics {
    const resultObject = {} as IGameStatistics;
    if (state.userSettings.statistics) {
      const currentGame = state.userSettings.statistics.optional[game];
      resultObject.newWords = currentGame.newWords;
      resultObject.rightCount = currentGame.rightCount;
      resultObject.bestSeries = currentGame.bestSeries;
    } else {
      resultObject.newWords = 0;
      resultObject.rightCount = 0;
      resultObject.bestSeries = 0;
    }
    return resultObject;
  }

  createDayStatisticsObject(statistics: IStatistics): IDay {
    const newWordsCount = 0;
    const learnedCount =0;




    const resultObject = {} as IDay;
    // if (statistics) {
    //   resultObject.currentDay =
    //     statistics.optional.day.currentDay;
    //   resultObject.statistics =
    //     statistics.optional.day.statistics;
    // } else {
      resultObject.currentDay = "";
      resultObject.statistics = [];
    // }
    if (resultObject.currentDay === this.getCurrentDate()) {
      resultObject.statistics[0] = this.createDateStatisticsObject(resultObject, newWordsCount, learnedCount);
    } else resultObject.statistics.unshift(this.createDateStatisticsObject(resultObject, newWordsCount, learnedCount));
    return resultObject;
  }
  createDateStatisticsObject(statistics: IDay, newWordsCount: number, learnedCount: number): IDayStatistics {
    const resultObject = {} as IDayStatistics;
    if (statistics.currentDay === this.getCurrentDate()) {
      resultObject.neWords = statistics.statistics[0].neWords + newWordsCount;
      resultObject.learned = statistics.statistics[0].learned + learnedCount;
    } else
      resultObject.neWords = newWordsCount;
    resultObject.learned = learnedCount;

    return resultObject;
  }


  getCurrentDate(): string {
    const currentDate = new Date();
    const date = String(currentDate.getDate()).padStart(2, "0");
    const month = String(currentDate.getMonth() + 1).padStart(2, "0");
    const year = String(currentDate.getFullYear());
    return `${date}.${month}.${year}`;
  }
}
