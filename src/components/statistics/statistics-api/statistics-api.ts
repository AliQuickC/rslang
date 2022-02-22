import { urlUsers } from '../../utilites/consts';
import { Auth, IStatistics, State } from '../../../modules/types';
import StatisticsPage from '../statistics-page';

export default class StatisticsApi {
  static getStatistics(userId: string, token: string) {
    const myHeaders = new Headers();
    myHeaders.append('Accept', 'application/json');
    myHeaders.append('Authorization', `Bearer ${token}`);

    const requestOptions: RequestInit = {
      method: 'GET',
      headers: myHeaders,
      redirect: 'follow',
    };

    return fetch(`${urlUsers}/${userId}/statistics`, requestOptions);
    // .then((response) => {
    //
    //   console.log (new Date().getDate())
    //   return response.text();
    // })
    // .then((result) => console.log(result))
    // .catch((error) => console.log('error', error));
  }

  static putStatistics(
    userId: string,
    token: string,
    objStatistics: IStatistics
  ) {
    const myHeaders = new Headers();
    myHeaders.append('Content-Type', 'application/json');
    myHeaders.append('Accept', 'application/json');
    myHeaders.append('Authorization', `Bearer ${token}`);

    const raw = JSON.stringify(objStatistics);

    const requestOptions: RequestInit = {
      method: 'PUT',
      headers: myHeaders,
      body: raw,
      redirect: 'follow',
    };

    return fetch(`${urlUsers}/${userId}/statistics`, requestOptions);
    // .then((response) => response.text())
    // .then((result) => console.log(result))
    // .catch((error) => console.log('error', error));
  }

  static getStatisticsFromServer(state: State) {
    const statisticsPageInstance = new StatisticsPage(state);
    const authData = state.userSettings.authData as Auth;
    StatisticsApi.getStatistics(authData.userId, authData.token)
      .then((response) => {
        if (!response.ok) {
          StatisticsApi.putStatistics(
            authData.userId,
            authData.token,
            statisticsPageInstance.getDefaultStatisticsObject()
          )
            .then((response) => response.json() as unknown as IStatistics)
            .then((prom) => {
              if (prom) {
                state.userSettings.statistics = prom;
              }
            })
            .catch((error) => console.log(error));
        }
        return response;
      })
      .then((res) => {
        return res.ok ? (res.json() as unknown as IStatistics) : undefined;
      })
      .then((promise) => {
        if (promise) {
          state.userSettings.statistics = promise;
        }
      })
      .catch((error) => console.log(error));
  }
}
