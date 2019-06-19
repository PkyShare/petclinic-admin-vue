//挂号

import axios from 'axios';

let base = 'http://localhost:8080/v1';

//挂号详情
export const reg = (params) => {
  return axios.post(`${base}/reg`, params).then(res => res)
}

//删除挂号信息
export const regDel = (params) => {
  return axios.delete(`${base}/reg/${params}`).then(res => res)
}

//挂号分页
export const regList = (num, size) => {
  return axios.get(`${base}/reg/page/${num}/${size}`).then(res => res);
}

//挂号分类

