import { urlUsers } from "../../utilites/consts";
import { IStatistics } from "../../../modules/types";

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

    return fetch(`${urlUsers}/${userId}/statistics`, requestOptions)
      .then((response) => {

        console.log (new Date().getDate())
        return response.text();
      })
      .then((result) => console.log(result))
      .catch((error) => console.log('error', error));
  }

  static putStatistics(userId: string, token: string, objStatictics:IStatistics){
    const myHeaders = new Headers();
    myHeaders.append('Content-Type', 'application/json');
    myHeaders.append("Accept", "application/json");
    myHeaders.append("Authorization", "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYyMDY0NDUzZTdiOThhMDAxNmFlNjY2ZCIsImlhdCI6MTY0NTM0NjU4NywiZXhwIjoxNjQ1MzYwOTg3fQ.fnEpxBdydBd3TBZ8cOXZeRRU8w772sCwOEaK9MfHPVw");

    const raw = JSON.stringify(objStatictics);

    const requestOptions: RequestInit = {
      method: 'PUT',
      headers: myHeaders,
      body: raw,
      redirect: 'follow',
    };

    fetch(
      'https://learnwords-app.herokuapp.com/users/62064453e7b98a0016ae666d/statistics',
      requestOptions
    )
      .then((response) => response.text())
      .then((result) => console.log(result))
      .catch((error) => console.log('error', error));
  }
}
