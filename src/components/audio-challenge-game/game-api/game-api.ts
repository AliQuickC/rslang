import {
  pagesCount,
  urlUsers,
  urlWords,
  wordsPerPage,
} from '../../utilites/consts';

export default class GameApi {
  static getWordsByGroup(groupNumber: number) {
    const myHeaders = new Headers();
    myHeaders.append('Accept', 'application/json');

    const requestOptions: RequestInit = {
      method: 'GET',
      headers: myHeaders,
      redirect: 'follow',
    };

    const groupRequest = '?group=';
    const pageRequest = '&page=';
    const pageNumber = Math.floor(Math.random() * (pagesCount - 1));

    return fetch(
      `${urlWords}${groupRequest}${groupNumber}${pageRequest}${pageNumber}`,
      requestOptions
    );
  }

  static getUsersWords(userId: string, groupNumber: number, token: string) {
    const myHeaders = new Headers();
    myHeaders.append('accept', 'application/json');
    myHeaders.append('Authorization', `Bearer ${token}`);

    const requestOptions: RequestInit = {
      method: 'GET',
      headers: myHeaders,
      redirect: 'follow',
    };

    const request = '/aggregatedWords?group=';

    fetch(
      `${urlUsers}/${userId}${request}${groupNumber}`,
      //'https://learnwords-app.herokuapp.com/users/62064453e7b98a0016ae666d/aggregatedWords?group=0&page=0&wordsPerPage=10',
      requestOptions
    )
      .then((response) => response.text())
      .then((result) => console.log(result))
      .catch((error) => console.log('error', error));
  }

  static getUserWordStatusById() {
    const myHeaders = new Headers();
    myHeaders.append('Accept', 'application/json');
    myHeaders.append(
      'Authorization',
      'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYxZmJkMDQyMzQ5NjVmMDAxNjE4NDhiYiIsImlhdCI6MTY0NDc2MDAyOCwiZXhwIjoxNjQ0Nzc0NDI4fQ.Re1mxnl3VoxfiGf0Pz7CcI5e_TPjaR1lz7o7-bd2REQ'
    );

    const requestOptions: RequestInit = {
      method: 'GET',
      headers: myHeaders,
      redirect: 'follow',
    };

    fetch(
      'https://learnwords-app.herokuapp.com/users/61fbd04234965f00161848bb/words/5e9f5ee35eb9e72bc21af4a2',
      requestOptions
    )
      .then((response) => response.text())
      .then((result) => console.log(result))
      .catch((error) => console.log('error', error));
  }

  static getUserWordById() {
    const myHeaders = new Headers();
    myHeaders.append('Accept', 'application/json');
    myHeaders.append(
      'Authorization',
      'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYxZmJkMDQyMzQ5NjVmMDAxNjE4NDhiYiIsImlhdCI6MTY0NDc2MDAyOCwiZXhwIjoxNjQ0Nzc0NDI4fQ.Re1mxnl3VoxfiGf0Pz7CcI5e_TPjaR1lz7o7-bd2REQ'
    );

    const requestOptions: RequestInit = {
      method: 'GET',
      headers: myHeaders,
      redirect: 'follow',
    };

    fetch(
      'https://learnwords-app.herokuapp.com/users/61fbd04234965f00161848bb/aggregatedWords/5e9f5ee35eb9e72bc21af4a2',
      requestOptions
    )
      .then((response) => response.text())
      .then((result) => console.log(result))
      .catch((error) => console.log('error', error));
  }

  static createUserWordStatus() {
    const myHeaders = new Headers();
    myHeaders.append('Content-Type', 'application/json');
    myHeaders.append('Accept', 'application/json');
    myHeaders.append(
      'Authorization',
      'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYxZmJkMDQyMzQ5NjVmMDAxNjE4NDhiYiIsImlhdCI6MTY0NDc2MDAyOCwiZXhwIjoxNjQ0Nzc0NDI4fQ.Re1mxnl3VoxfiGf0Pz7CcI5e_TPjaR1lz7o7-bd2REQ'
    );

    const raw = JSON.stringify({
      difficulty: 'string',
      optional: {},
    });

    const requestOptions: RequestInit = {
      method: 'POST',
      headers: myHeaders,
      body: raw,
      redirect: 'follow',
    };

    fetch(
      'https://learnwords-app.herokuapp.com/users/61fbd04234965f00161848bb/words/5e9f5ee35eb9e72bc21af4a2',
      requestOptions
    )
      .then((response) => response.text())
      .then((result) => console.log(result))
      .catch((error) => console.log('error', error));
  }

  static getUserAggregatedWordsGroup(
    group: number,
    page: number,
    userID: string,
    token: string
  ) {
    const myHeaders = new Headers();
    myHeaders.append('accept', 'application/json');
    myHeaders.append('Authorization', `Bearer ${token}`);

    const requestOptions: RequestInit = {
      method: 'GET',
      headers: myHeaders,
      redirect: 'follow',
    };

    const request = `aggregatedWords?group=${group}&page=${page}&wordsPerPage=${wordsPerPage}`;

    fetch(`${urlUsers}/${userID}/${request}`, requestOptions)
      .then((response) => response.text())
      .then((result) => console.log(result))
      .catch((error) => console.log('error', error));
  }
}
