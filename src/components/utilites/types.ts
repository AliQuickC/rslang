export type idNameEmailPasswordType = {
  id?: string;
  name?: string;
  email: string;
  password?: string;
};

export type headersAddType = {
  name: 'Accept' | 'Authorization' | 'Content-Type';
  value: string;
};

export type requestOptionsType = {
  method: 'POST' | 'GET' | 'PUT' | 'DELETE';
  headers: Headers;
  body?: string;
  redirect: 'follow';
};

export type usersUrlType = 'https://learnwords-app.herokuapp.com/users';
export type signinUrlType = 'https://learnwords-app.herokuapp.com/signin';

export type urlType = usersUrlType | signinUrlType;
