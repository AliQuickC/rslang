import { urlUsers } from "../../utilites/consts";

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
}
