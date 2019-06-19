<template>
  <div class="index" >
    <el-container style="border: 1px solid #eee;height: 150%">
      <!--左侧导航栏-->
      <el-aside width="200px" style="background-color: rgb(238, 241, 246)">
        <el-menu
          router=""
          background-color="#545c64"
          text-color="#fff"
          active-text-color="#ffd04b"
          default-active="/">
          <!--首页导航-->
          <el-menu-item  index="/" style="background-color: #303133; height: 80px">
            <i class="el-icon-menu"></i>
            医院首页
          </el-menu-item>

          <!--前台模块导航-->
          <el-submenu index="1">
            <template slot="title"><i class="el-icon-bell"></i>前台导航</template>
            <el-submenu index="1-1">
              <template slot="title"><i class="el-icon-info"></i>宠物信息</template>
              <el-menu-item index="petslist">宠物列表</el-menu-item>
              <el-menu-item index="petsadd">信息录入</el-menu-item>
            </el-submenu>
            <el-menu-item index="reg">
              <template><i class="el-icon-tickets"></i></template>挂号
            </el-menu-item>
            <el-menu-item index="reglist">
              <template><i class="el-icon-star-off"></i></template>挂号列表
            </el-menu-item>
          </el-submenu>

          <!--门诊模块导航-->
          <el-submenu index="2">
            <template slot="title"><i class="el-icon-plus"></i>门诊就医</template>
            <el-submenu index="2-1">
              <template slot="title"><i class="el-icon-document"></i>病例管理</template>
              <el-menu-item index="prescriptionlist">病例列表</el-menu-item>
              <el-menu-item index="prescriptionadd">病例录入</el-menu-item>
            </el-submenu>
            <el-menu-item index="waitinglist">
              <template><i class="el-icon-star-off"></i></template>就诊队列
            </el-menu-item>
            <el-menu-item index="prescriptionlist">
              <template><i class="el-icon-star-on"></i></template>处方队列
            </el-menu-item>
          </el-submenu>

          <!--库房模块导航-->
          <el-submenu index="3">
            <template slot="title"><i class="el-icon-d-caret"></i>药房管理</template>
            <el-submenu index="3-1">
              <template slot="title"><i class="el-icon-caret-bottom"></i>采购</template>
              <el-menu-item index="inputlist">采购列表</el-menu-item>
              <el-menu-item index="inputadd">药品采购</el-menu-item>
            </el-submenu>
            <el-submenu index="3-2">
              <template slot="title"><i class="el-icon-caret-top"></i>取药</template>
              <el-menu-item index="outputlist">出库列表</el-menu-item>
              <el-menu-item index="outputadd">药品出库</el-menu-item>
            </el-submenu>
            <el-menu-item index="stocklist">
              <template><i class="el-icon-refresh"></i></template>库存
            </el-menu-item>
            <el-menu-item index="takemeglist">
              <template><i class="el-icon-star-on"></i></template>取药队列
            </el-menu-item>
          </el-submenu>

          <!--系统维护模块导航-->
          <el-submenu index="4">
            <template slot="title"><i class="el-icon-setting"></i>系统维护</template>
            <el-submenu index="4-1">
              <template slot="title"><i class="el-icon-rank"></i>用户管理</template>
              <el-menu-item index="userlist">用户列表</el-menu-item>
              <el-menu-item index="useradd">新增用户</el-menu-item>
            </el-submenu>
            <el-submenu index="4-2">
              <template slot="title"><i class="el-icon-date"></i>值班管理</template>
              <el-menu-item index="dutylist">值班详情</el-menu-item>
              <el-menu-item index="dutyadd">新增值班</el-menu-item>
            </el-submenu>
            <el-submenu index="4-3">
              <template slot="title"><i class="el-icon-edit"></i>业务管理</template>
              <el-menu-item index="projectlist">业务分类</el-menu-item>
              <el-menu-item index="useradd">新增业务</el-menu-item>
            </el-submenu>
          </el-submenu>
        </el-menu>
      </el-aside>
      <!--顶部栏-->
      <el-container>
        <el-header style="text-align: right; font-size: 12px">
            <el-input style="width: 200px;" placeholder="搜索..."></el-input>
            <el-button style="margin: auto" type="primary" icon="el-icon-search"></el-button>
          <el-dropdown>
            <i class="el-icon-location" style="margin-right: 15px"></i>
            <el-dropdown-menu slot="dropdown">
              <el-dropdown-item @click.native="profile()">个人中心</el-dropdown-item>
              <el-dropdown-item @click.native="logout()">退出</el-dropdown-item>
            </el-dropdown-menu>
          </el-dropdown>
          <span class="username">
            {{username}}
          </span>
        </el-header>

        <!--路由出口-->
        <router-view>

        </router-view>
      </el-container>

    </el-container>
  </div>

</template>

<script>
  import {mapState} from 'vuex';
  export default {
    data() {
      return {
      }
    },
    computed: {
      //辅助函数获取 state 数据
      ...mapState(
        {
          userinfo: state => state.userInfo,
          username: state => state.userInfo.username
        }
      )
    },

    created() {
      console.log(this.$store.state.userInfo)
      if(this.$store.state.userInfo == null){
        this.$router.push('/login')
      }
    },
    methods: {
      //跳转个人中心
      profile() {
        console.log('个人中心')
        this.$router.push('/profile')
      },
      //登出
      logout() {
        localStorage.setItem('userInfo',JSON.stringify(''))
        console.log(this.$store.state.userInfo)
        this.$router.push('/login')
      }
    }
  };
</script>

<style>
  .el-header {
    height: 80px!important;
    background-color: #d4baff;
    color: #333;
    line-height: 60px;
  }
  .el-menu {
    border-right: 0;
  }

  .top-header{
    text-align: center;
    padding: 9px 0px;
    background-color: #303133;
  }

  .top-header .text {
    color: #ffffff;
    font-weight: bold;
  }
  .el-aside {
    background-color: #545c64!important;
  }

  html, body, #app, .index {
    margin-top: 0px;
    height: 100%
  }

  .username {
    font-size: 20px;
    color: rgb(128, 75, 255);
  }

</style>
