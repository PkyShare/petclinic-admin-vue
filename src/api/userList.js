import axios from 'axios';

let base = 'http://localhost:8080/v1';

export const userList = () => {
  return axios.get(`${base}/users/page/1/10`);
}
