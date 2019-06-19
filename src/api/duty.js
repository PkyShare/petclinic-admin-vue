//值班

import axios from 'axios';

let base = 'http://localhost:8080/v1';

//保存值班信息
export const dutySave = (params) => {
  return axios.post(`${base}/doctors`, params).then(res => res)
}

//删除值班信息
export const dutyDel = (params) => {
  return axios.delete(`${base}/doctors/${params}`).then(res => res)
}

//用户分页
export const dutyList = (num, size) => {
  return axios.get(`${base}/doctors/page/${num}/${size}`).then(res => res);
}
