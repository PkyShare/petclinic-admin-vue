//引入 vue
import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'
import {userList} from '../api/userList'

//注册 Vue
Vue.use(Vuex)

// 状态
const state = {
  userInfo: JSON.parse(localStorage.getItem('userInfo')),
  tempInfo: {}
}

// mutations 主要用来操作 state
const mutations = {
  //保存用户数据
  SAVE_USERINFO(state, userInfo){
    //将用户信息存入本地存储
    localStorage.setItem('userInfo',JSON.stringify(userInfo))
    state.userInfo = userInfo
  },

  //用于保存替代信息
  SAVE_TEMP_INFO(state, tempInfo){
    state.tempInfo = tempInfo
    console.log(state.tempInfo)
  },
}

//定义 actions， 异步的，主要用于 commit mutations，由 mutations 来改变状态
const actions ={
  GET_USERLIST({commit}){
    return new Promise((resolve, reject) => {
      userList().then(res => {
        commit('GET_USERLIST',res.data);
        resolve();
      })
    })
  }
}
//创建 store 仓库暴露出去

export default new Vuex.Store({
  state,
  mutations,
  actions
})
