import Vue from 'vue'
import Router from 'vue-router'

//异步加载组件
const login =() => import('@/components/login')
const index =() => import('@/components/index')
const home =() => import('@/components/home')

//个人中心
const profile =() => import('@/components/profile')

//前台模块
  //挂号
const reg =() => import('@/components/reception/registration/reg')
const regList =() => import('@/components/reception/registration/list')
const regSave =() => import('@/components/reception/registration/save')
  //宠物信息
const petsList =() => import('@/components/reception/pets/petslist')
const petsAdd =() => import('@/components/reception/pets/petsadd')
const petsSave =() => import('@/components/reception/pets/petssave')
  //缴费
const money =() => import('@/components/reception/money')

//门诊模块
  //就诊队列
const waitingList =() => import('@/components/clinic/waitinglist/waitinglist')
  //病例

  //处方
const prescriptionList =() => import('@/components/clinic/prescription/prescriptionlist')
const prescriptionAdd =() => import('@/components/clinic/prescription/prescriptionadd')
const prescriptionSave =() => import('@/components/clinic/prescription/prescriptionsave')
  //化验

//药房模块

  //入库管理
const inputList =() => import('@/components/warehouse/input/inputlist')
const inputAdd =() => import('@/components/warehouse/input/inputadd')
const inputSave =() => import('@/components/warehouse/input/inputsave')
  //出库管理
const outputList =() => import('@/components/warehouse/output/outputlist')
const outputAdd =() => import('@/components/warehouse/output/outputadd')
const outputSave =() => import('@/components/warehouse/output/outputsave')
  //库存管理
const stockList =() => import('@/components/warehouse/stock/stocklist')
const stockAdd =() => import('@/components/warehouse/stock/stockadd')
const stockSave =() => import('@/components/warehouse/stock/stocksave')

  //取药队列
const takeMegList =() => import('@/components/warehouse/takemeglist')

//系统维护模块
  //用户管理
const userList =() => import('@/components/sys/users/userlist')
const userAdd =() => import('@/components/sys/users/useradd')
const userSave =() => import('@/components/sys/users/usersave')
  //值班管理
const dutyList =() => import('@/components/sys/duty/dutylist')
const dutyAdd =() => import('@/components/sys/duty/dutyadd')
const dutySave =() => import('@/components/sys/duty/dutysave')
  //医院业务分类
const projectList =() => import('@/components/sys/project/projectlist')
const projectAdd =() => import('@/components/sys/project/projectadd')
const projectSave =() => import('@/components/sys/project/projectsave')

//注册路由
Vue.use(Router)

//导出路由
export default new Router({
  routes: [
    {
      path: '/login',
      name: 'login',
      component: login
    },
    {
      path: '/',
      name: 'index',
      component: index,
      children: [
        {
          path: '',
          name: 'home',
          component: home,
        },
        //个人中心
        {
          path: '/profile',
          name: 'profile',
          component: profile
        },
        //挂号管理
        {
          path: '/reg',
          name: 'reg',
          component: reg,
        },
        {
          path: '/reglist',
          name: 'reglist',
          component: regList,
        },
        {
          path: '/regsave',
          name: 'regsave',
          component: regSave,
        },
        //就诊队列
        {
          path: '/waitinglist',
          name: 'waitinglist',
          component: waitingList,
        },
        //宠物信息管理
        {
          path: '/petslist',
          name: 'petslist',
          component: petsList,
        },
        {
          path: '/petsadd',
          name: 'petsadd',
          component: petsAdd,
        },
        {
          path: '/petssave',
          name: 'petssave',
          component: petsSave,
        },
        //缴费
        {
          path: '/money',
          name: 'money',
          component: money,
        },
        //病例管理

        //处方管理
        {
          path: '/prescriptionlist',
          name: 'prescriptionlist',
          component: prescriptionList,
        },
        {
          path: '/prescriptionadd',
          name: 'prescriptionadd',
          component: prescriptionAdd,
        },
        {
          path: '/prescriptionsave',
          name: 'prescriptionsave',
          component: prescriptionSave,
        },
        //化验管理

        //入库管理
        {
          path: '/inputlist',
          name: 'inputlist',
          component: inputList,
        },
        {
          path: '/inputadd',
          name: 'inputadd',
          component: inputAdd,
        },
        {
          path: '/inputsave',
          name: 'inputsave',
          component: inputSave,
        },
        //出库管理
        {
          path: '/outputlist',
          name: 'outputlist',
          component: outputList,
        },
        {
          path: '/outputadd',
          name: 'outputadd',
          component: outputAdd,
        },
        {
          path: '/outputsave',
          name: 'outputsave',
          component: outputSave,
        },
        //库存管理
        {
          path: '/stocklist',
          name: 'stocklist',
          component: stockList,
        },
        {
          path: '/stockadd',
          name: 'stockadd',
          component: stockAdd,
        },
        {
          path: '/stocksave',
          name: 'stocksave',
          component: stockSave,
        },

        //取药队列
        {
          path: '/takemeglist',
          name: 'takemeglist',
          component: takeMegList,
        },
        //用户管理路由
        {
          path: '/userlist',
          name: 'userlist',
          component: userList,
        },
        {
          path: '/useradd',
          name: 'useradd',
          component: userAdd,
        },
        {
          path: '/usersave',
          name: 'usersave',
          component: userSave,
        },
        //值班管理路由
        {
          path: '/dutylist',
          name: 'dutylist',
          component: dutyList,
        },
        {
          path: '/dutyadd',
          name: 'dutyadd',
          component: dutyAdd,
        },
        {
          path: '/dutysave',
          name: 'dutysave',
          component: dutySave,
        },
        //医院业务管理路由
        {
          path: '/projectlist',
          name: 'projectlist',
          component: projectList,
        },
        {
          path: '/projectadd',
          name: 'projectadd',
          component: projectAdd,
        },
        {
          path: '/projectsave',
          name: 'projectsave',
          component: projectSave,
        },
      ]
    }
  ]
})
