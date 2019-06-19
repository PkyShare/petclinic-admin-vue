//处方管理

import axios from 'axios';

let base = 'http://localhost:8080/v1';

//保存用户信息
export const prescriptionSave = (params) => {
  return axios.post(`${base}/prescription`, params).then(res => res)
}

//删除用户信息
export const prescriptionDel = (params) => {
  return axios.delete(`${base}/prescription/${params}`).then(res => res)
}

//用户分页
export const prescriptionList = (num, size) => {
  return axios.get(`${base}/prescription/page/${num}/${size}`).then(res => res);
}
