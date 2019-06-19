//库存管理

import axios from 'axios';

let base = 'http://localhost:8080/v1';

//保存库存信息
export const stockSave = (params) => {
  return axios.post(`${base}/stocks`, params).then(res => res)
}

//删除库存信息
export const stockDel = (params) => {
  return axios.delete(`${base}/stocks/${params}`).then(res => res)
}

//分页
export const stockList = (num, size) => {
  return axios.get(`${base}/stocks/page/${num}/${size}`).then(res => res);
}
