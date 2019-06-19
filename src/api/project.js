//医院业务

import axios from 'axios';

let base = 'http://localhost:8080/v1';

//保存值班信息
export const projectSave = (params) => {
  return axios.post(`${base}/items`, params).then(res => res)
}

//删除值班信息
export const projectDel = (params) => {
  return axios.delete(`${base}/items/${params}`).then(res => res)
}

//用户分页
export const projectList = (num, size) => {
  return axios.get(`${base}/items/page/${num}/${size}`).then(res => res);
}
