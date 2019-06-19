<template>
  <div>
    <!--挂号-->
    <el-card class="box-card" style="margin: 15px">
      <div slot="header" class="clearfix">
        <span style="margin-left: -350px;">挂号</span>
      </div>
      <!--表格-->
      <el-form :model="regForm" status-icon :rules="rules" ref="regForm" label-width="100px" class="demo-ruleForm">
        <el-form-item label="卡号" prop="cardId">
          <el-input type="text" v-model.number="regForm.cardId" autocomplete="off" placeholder="请输入卡号..."></el-input>
        </el-form-item>
        <el-form-item label="宠物主人" prop="username">
          <el-input type="text" v-model="regForm.username" autocomplete="off" placeholder="请输入宠物主人姓名..."></el-input>
        </el-form-item>
        <el-form-item label="宠物名" prop="petname">
          <el-input type="text" v-model="regForm.petname" autocomplete="off" placeholder="请输入宠物名..."></el-input>
        </el-form-item>
        <el-form-item label="挂号类别" prop="registerType">
          <el-select v-model="regForm.registerType" placeholder="请选择..." style="width: 100%">
            <el-option label="普通号" value="普通号"></el-option>
            <el-option label="夜诊号" value="夜诊号"></el-option>
            <el-option label="急诊号" value="急诊号"></el-option>
            <el-option label="专家号" value="专家号"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="科室" prop="department" style="text-align: left">
          <el-radio-group v-model="regForm.department">
            <el-radio label="猫专科"></el-radio>
            <el-radio label="狗专科"></el-radio>
            <el-radio label="皮肤科"></el-radio>
            <el-radio label="牙科"></el-radio>
            <el-radio label="骨科"></el-radio>
            <el-radio label="产科"></el-radio>
            <el-radio label="心脏科"></el-radio>
            <el-radio label="老年病科"></el-radio>
            <el-radio label="绝育科"></el-radio>
            <el-radio label="内分泌科"></el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="医生" prop="doctor">
          <el-input type="text" disabled v-model="regForm.doctor"></el-input>
        </el-form-item>
        <el-form-item label="挂号费" prop="registerFee">
          <el-input type="text" disabled v-model="regForm.registerFee"></el-input>
        </el-form-item>
        <el-form-item label="收款员" prop="cashier">
          <el-input type="text" disabled v-model="regForm.cashier" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="备注" prop="remarks">
          <el-input
            type="textarea"
            :rows="2"
            placeholder="请输入内容"
            v-model="regForm.remarks">
          </el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="submitForm('regForm')">确定</el-button>
          <el-button type="info" v-print="'.box-card'">打印</el-button>
        </el-form-item>
      </el-form>
    </el-card>
  </div>
</template>

<script>
  import {reg} from "../../../api/reg";
  import {isNum} from "../../../utils/validation";

  export default {
    data() {
      return {
        regForm: {
          cardId: '',   //卡号 NOT NULL
          username: '',  //宠物主人姓名 NOT NULL
          petname: '',   //宠物姓名 NOT NULL
          registerType: '普通号',   // 挂号类别
          department: '狗专科',   // 科室（具体的挂号项目）
          doctor: '妙手回春',   //  医生名
          registerFee: '10',   // 挂号费
          cashier: this.$store.state.userInfo.username,  //登录的账号名
          remarks: ''   //备注
        },
        //校验
        rules: {
          cardId: { required: true, message: '卡号不可为空', trigger: 'blur' },
          username: { required: true, message: '宠物主人不可为空', trigger: 'blur' },
          petname: { required: true, message: '宠物名不可为空', trigger: 'blur' },
        },
      }
    },

    //用于异步监听属性的变化
    watch: {
      //监听挂号类型来改变挂号费
      "regForm.registerType"(){    //监听对象的属性时需要""
        let val = this.regForm.registerType
        //改变挂号费
        if(val == '普通号'){
          this.regForm.registerFee = 10
        }else if(val == '夜诊号'){
          this.regForm.registerFee = 15
        }else if(val == '急诊号'){
          this.regForm.registerFee = 20
        }else {
          this.regForm.registerFee = 25
        }
      },
      //监听科室医生
      "regForm.department"() {
        switch (this.regForm.department) {
          case "猫专科":this.regForm.doctor = '白求恩';break;
          case "狗专科":this.regForm.doctor = '扁鹊';break;
          case "皮肤科":this.regForm.doctor = '庞统';break;
          case "牙科":this.regForm.doctor = '诸葛亮';break;
          case "骨科":this.regForm.doctor = '李时珍';break;
          case "产科":this.regForm.doctor = '佛洛依德';break;
          case "心脏科":this.regForm.doctor = '妙手回春';break;
          case "老年病科":this.regForm.doctor = '华佗';break;
          case "绝育科":this.regForm.doctor = '庞凯元';break;
          case "内分泌科":this.regForm.doctor = 'zqy';break;
        }
      },
      deep: true  //开启深度监听才可以
    } ,

    methods: {
      submitForm(formName) {
        let remarks = this.regForm.remarks
        let params = 'cardId=' + this.regForm.cardId
          + '&username=' + this.regForm.username
          + '&petname=' + this.regForm.petname
          + '&registerType=' + this.regForm.registerType
          + '&department=' + this.regForm.department
          + '&doctor=' + this.regForm.doctor
          + '&registerFee=' + this.regForm.registerFee
          + '&cashier=' + this.regForm.cashier
          + '&remarks=' + remarks
        this.$refs[formName].validate((valid) => {
          console.log(params)
          //数字校验
          let flag = isNum(this.regForm.cardId);
          if(!flag){
            return this.$message({
              message:'卡号必须为纯数字',
              type:'error'
            })
          }
          if(valid){
            reg(params).then(res => {
              if(res.status === 201){
                this.$message({
                  message: '挂号成功',
                  type: 'success'
                });
                this.$router.push('/reglist')
              }
            }).catch(reason => {
              //失败处理
              this.$message({
                message: '卡号为数字',
                type: 'error'
              })
            })
          }else {
            console.log('必填选项')
            return false;
          }
        });
      },
      //清空
      resetForm(formName) {
        this.usersForm.jurisdiction = ''
        this.$refs[formName].resetFields();
      }
    }
  }
</script>

<style>

</style>
