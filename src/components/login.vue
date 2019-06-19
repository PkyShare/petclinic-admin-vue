<template>

  <div class="login-container">
    <div style="position:absolute; width:100%; height:100%;">
      <img src="../assets/img/cat-logo.png" style="margin-top: -220px;margin-left: 430px"/>
    </div>
    <el-form ref="loginForm" :model="loginForm" :rules="rules" auto-complete="on" label-width="80px" class="login-box">
      <div class="title-container">
        <h2 class="title">宠物医院管理系统</h2>
      </div>
      <el-form-item label="账号" prop="username">
        <el-input type="text" placeholder="请输入账号" v-model="loginForm.username" auto-complete="on"/>
      </el-form-item>
      <el-form-item label="密码" prop="password">
        <el-input type="password" placeholder="请输入密码" v-model="loginForm.password" autocomplete="off"/>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" v-on:click="submitForm('loginForm')">登录</el-button>
        <el-button @click="resetForm('loginForm')">重置</el-button>
      </el-form-item>
    </el-form>

  </div>
</template>

<script>
  import { requestLogin } from '../api/login';
  export default {
    data() {
      //登录表单的数据
      return {
        loginForm: {
          username: '',
          password: ''
        },
        //验证规则
        rules: {
          username: { required: true, message: '账号不可为空', trigger: 'blur' },
          password: { required: true, message: '密码不可为空', trigger: 'blur' }
        }
      };
    },
    methods: {
      submitForm(formName) {
        let params = 'username='+this.loginForm.username+'&'+'password='+this.loginForm.password
        this.$refs[formName].validate((valid) => {
          if (valid) {
            requestLogin(params).then(res => {
              if(res.status === 200){
                //把登录用户的信息存入state
                this.$store.commit('SAVE_USERINFO', res.data.data[0].attributes)
                this.$message({
                  message: '登录成功',
                  type: 'success'
                });
                this.$router.push('/')
              } else if (res.status >= 400) {
                console.log(res)
              }
            }).catch(err => {
              this.$message({
                message:'账号或密码错误',
                type:'error'
              })
            })
          } else {
            console.log('error submit!!')
            return false;
          }
        });
      },
      resetForm(formName) {
        this.$refs[formName].resetFields();
      }
    }
  }
</script>


<style scoped>

  .login-box {
    border: 1px solid #fcffe8;
    width: 450px;
    margin: 180px auto;
    padding: 35px 35px 15px 35px;
    border-radius: 5px;
    -webkit-border-radius: 5px;
    -moz-border-radius: 5px;
    box-shadow: 0 0 25px #999897;
    background-color: #fff4f7;
  }

</style>
