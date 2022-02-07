import {
  headersAddType,
  idNameEmailPasswordType,
  localStorageCurrentUserObject,
  requestOptionsType,
  urlType,
} from '../../utilites/types';
import { usersUrl } from '../../utilites/consts';

export default class User {
  static getRequest(
    headersAdds: headersAddType[],
    requestOptions: requestOptionsType,
    url: urlType,
    id?: string
  ) {
    const myHeaders = new Headers();
    headersAdds.forEach((header) => {
      myHeaders.append(header.name, header.value);
    });
    const resultId = id ? id.padStart(id.length + 1, '/') : '';
    fetch(`${url}${resultId}`, requestOptions)
      .then((response) => response.text())
      .then((result) => console.log(result))
      .catch((error) => console.log('error', error));
  }

  static getUser(id: string, token: string) {
    const myHeaders = new Headers();
    myHeaders.append('Accept', 'application/json');
    myHeaders.append('Authorization', `Bearer ${token}`);
    const requestOptions: RequestInit = {
      method: 'GET',
      headers: myHeaders,
      redirect: 'follow',
    };

    fetch(`${usersUrl}/${id}`, requestOptions)
      .then((response) => response.text())
      .then((result) => console.log(result))
      .catch((error) => console.log('error', error));
  }

  static createUser(value: idNameEmailPasswordType) {
    const myHeaders = new Headers();
    myHeaders.append('Content-Type', 'application/json');

    const raw = JSON.stringify(value);

    const requestOptions: RequestInit = {
      method: 'POST',
      headers: myHeaders,
      body: raw,
      redirect: 'follow',
    };

    return fetch('https://learnwords-app.herokuapp.com/users', requestOptions);
    // .then((response) => {
    //   if (response.ok) {
    //     // this.clearInputs();
    //   }
    //   return response.text();
    // })
    // .then((result) => {
    //   console.log(result);
    // })
    // .catch((error) => console.log('error', error, 'help'));
  }

  static signIn(value: idNameEmailPasswordType) {
    const myHeaders = new Headers();
    myHeaders.append('Content-Type', 'application/json');

    const raw = JSON.stringify({
      email: value.email,
      password: value.password,
    });

    const requestOptions: RequestInit = {
      method: 'POST',
      headers: myHeaders,
      body: raw,
      redirect: 'follow',
    };

    return fetch('https://learnwords-app.herokuapp.com/signin', requestOptions);
    // .then((response) => {
    //   if (response.ok) {
    //     // this.clearInputs();
    //   }
    //   return response;
    // })
    // .then((result) => {
    //   // this.clearInputs();
    //   console.log(result);
    //   return result;
    // })
    // .catch((error) => console.log('error', error));
  }

  // signUp() {
  //   const value = this.returnObjectWithInfoFromInput();
  //   console.log(value);
  //   this.createUser(value);
  // }
  //
  // logIn() {
  //   const value = this.returnObjectWithInfoFromInput();
  //   this.signIn(value).then((result) => {
  //     localStorage.setItem('currentUser', <string>result);
  //   });
  // }
  static deleteUser(requestObject: localStorageCurrentUserObject) {
    const myHeaders = new Headers();
    myHeaders.append('Authorization', `Bearer ${requestObject.token}`);

    const requestOptions: RequestInit = {
      method: 'DELETE',
      headers: myHeaders,
      redirect: 'follow',
    };

    fetch(`${usersUrl}/${requestObject.userId}`, requestOptions)
      .then((response) => response.text())
      .then((result) => console.log(result))
      .catch((error) => console.log('error', error));
  }


}
