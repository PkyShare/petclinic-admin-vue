//就诊队列管理

import axios from 'axios';

let base = 'http://localhost:8080/v1';

export const waitingList = (num, size) => {
  return axios.get(`${base}/waiting/page/${num}/${size}`).then(res => res);
}

export const waitingUpdate = (params) => {
  return axios.post(`${base}/waiting`, params).then(res => res);
}
