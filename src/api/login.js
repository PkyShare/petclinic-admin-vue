import axios from 'axios';

let base = 'http://localhost:8080/v1';

export const requestLogin = params => {
  return axios.post(`${base}/login`, params).then(res =>
    res);
}
