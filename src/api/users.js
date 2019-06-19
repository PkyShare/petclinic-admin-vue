//用户管理

import axios from 'axios';

let base = 'http://localhost:8080/v1';

//保存用户信息
export const userSave = (params) => {
  return axios.post(`${base}/users`, params).then(res => res)
}

//删除用户信息
export const userDel = (params) => {
  return axios.delete(`${base}/users/${params}`).then(res => res)
}

//用户分页
export const userList = (num, size) => {
  return axios.get(`${base}/users/page/${num}/${size}`).then(res => res);
}
