<template>
  <div>
    <!--编辑用户-->
    <el-card class="box-card" style="margin: 15px">
      <div slot="header" class="clearfix" style="width: 120px">
        <span>编辑用户</span>
      </div>

      <!--表单-->
      <el-form :model="usersForm" status-icon :rules="rules" ref="usersForm" label-width="100px" class="demo-ruleForm">
        <el-input type="hidden" v-model="usersForm.id"></el-input>
        <el-form-item label="用户名" prop="username">
          <el-input type="text" v-model="usersForm.username" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="密码" prop="password">
          <el-input type="text" v-model="usersForm.password" autocomplete="off" placeholder="如果不改，请不要动"></el-input>
        </el-form-item>
        <el-form-item label="电话" prop="phone">
          <el-input v-model.number="usersForm.phone"></el-input>
        </el-form-item>
        <el-form-item label="邮箱" prop="email">
          <el-input v-model.number="usersForm.email"></el-input>
        </el-form-item>
        <el-form-item label="权限">
          <el-select v-model="usersForm.jurisdiction" placeholder="请选择..." style="width: 100%">
            <el-option aria-placeholder="请选择..." value=""></el-option>
            <el-option label="前台" value="0"></el-option>
            <el-option label="医生" value="1"></el-option>
            <el-option label="仓库" value="2"></el-option>
            <el-option label="管理员" value="3"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="备注" prop="remarks">
          <el-input
            type="textarea"
            :rows="2"
            placeholder="请输入内容"
            v-model="usersForm.remarks">
          </el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="submitForm('usersForm')">确定</el-button>
        </el-form-item>
      </el-form>
    </el-card>
  </div>
</template>

<script>
  import { userSave } from '../../../api/users';
  import {mapState} from 'vuex'
  export default {
    data() {
      return {
        usersForm: {
          id: this.$store.state.tempInfo.id,
          username: this.$store.state.tempInfo.username,
          password:'',
          phone: this.$store.state.tempInfo.phone,
          email: this.$store.state.tempInfo.email,
          jurisdiction: this.$store.state.tempInfo.jurisdiction,
          remarks: this.$store.state.tempInfo.remarks,
        },
        //校验
        rules: {
          username: { required: true, message: '姓名不可为空', trigger: 'blur' },
          phone: { required: true, message: '手机号不可为空', trigger: 'blur' },
          email: { required: true, message: '邮箱不可为空', trigger: 'blur' }
        }
      };
    },
    methods: {
      submitForm(formName) {
        let jurisdiction = this.usersForm.jurisdiction
        let remarks = this.usersForm.remarks
        if(remarks == undefined || remarks == ''){
          switch (jurisdiction) {
            case 0: remarks = '前台'
              break;
            case 1: remarks = '门诊'
              break;
            case 2: remarks = '药房'
              break;
            case 3: remarks = '人事'
              break;
          }
        }
        if(jurisdiction === undefined){
          jurisdiction = ''
        }
        let params = 'id=' + this.usersForm.id
          + '&username=' + this.usersForm.username
          + '&password=' + this.usersForm.password
          + '&email=' + this.usersForm.email
          + '&phone=' + this.usersForm.phone
          + '&jurisdiction=' + jurisdiction
          + '&remarks=' + remarks
        this.$refs[formName].validate((valid) => {
          if(valid){
            userSave(params).then(res => {
              if(res.status === 201){
                this.$message({
                  message: '修改成功',
                  type: 'success'
                });
                this.$router.push('/userlist')
              }
            }).catch(reason => {

            })
          } else {
            console.log('必填选项!')
            return false;
          }
        });
      },
    }
  }
</script>

<style>

</style>
