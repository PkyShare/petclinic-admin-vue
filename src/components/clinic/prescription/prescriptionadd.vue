<template>
  <div>
    <!--开具处方-->
    <el-card class="box-card" style="margin: 15px">
      <div slot="header" class="clearfix" style="width: 120px">
        <span>开具处方</span>
      </div>

      <!--表单-->
      <el-form :model="preForm" status-icon :rules="rules" ref="preForm" label-width="100px" class="demo-ruleForm">
        <el-form-item label="挂号单编号" prop="registerId">
          <el-input type="text" disabled v-model.number="preForm.registerId" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="药品名称" prop="drugsName">
          <el-cascader
            :options="options"
            v-model="preForm.drugsName"
            style="width: 100%"
          ></el-cascader>
        </el-form-item>
        <el-form-item label="总量" prop="counts">
          <el-input type="text" v-model.number="preForm.counts" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="用法用量" prop="usageAndDosage">
          <el-input
            type="textarea"
            :rows="2"
            placeholder="请输入内容"
            v-model="preForm.usageAndDosage">
          </el-input>
        </el-form-item>
        <el-form-item label="医生名称" prop="doctor">
          <el-input type="text" disabled v-model.number="preForm.doctor" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="submitForm('preForm')">确定</el-button>
          <el-button type="info" v-print="'.demo-ruleForm'">打印</el-button>
        </el-form-item>
      </el-form>
    </el-card>
  </div>
</template>

<script>
  import {prescriptionSave} from "../../../api/prescription";
  import {isNum} from "../../../utils/validation";

  export default {
    data() {
      return {
        preForm: {
          registerId: this.$store.state.tempInfo.registerId,  //挂号单编号
          drugsName: ['镇痛药','关节康',8],  //药品名称
          counts: '',  //药品总量
          usageAndDosage: '', //用法用量
          doctor: this.$store.state.userInfo.username,  //医生姓名（登录的账号）
        },
        options: [{
          value: '止吐药',
          label: '止吐药',
          children: [{
            value: '甲氧氯普胺',
            label: '甲氧氯普胺',
            children:[{
              value: 50,
              label: '单价50元'
            }]
          }, {
            value: '溴米那普鲁卡因',
            label: '溴米那普鲁卡因',
            children:[{
              value: 10,
              label: '单价10元'
            }]
          }, {
            value: '苯海拉明',
            label: '苯海拉明',
            children:[{
              value: 10,
              label: '单价10元'
            }]
          },  {
            value: '氯丙嗪',
            label: '氯丙嗪',
            children:[{
              value: 10,
              label: '单价10元'
            }]
          }]
        }, {
          value: '镇痛药',
          label: '镇痛药',
          children: [{
            value: '卓比林',
            label: '卓比林',
            children:[{
              value: 3,
              label: '单价3元'
            }]
          }, {
            value: '关节康',
            label: '关节康',
            children:[{
              value: 8,
              label: '单价8元'
            }]
          }, {
            value: '安痛定',
            label: '安痛定',
            children:[{
              value: 50,
              label: '单价50元'
            }]
          }]
        }, {
          value: '抑酸药',
          label: '抑酸药',
          children: [{
            value: '奥美拉唑',
            label: '奥美拉唑',
            children:[{
              value: 8,
              label: '单价8元'
            }]
          }, {
            value: '西咪替丁',
            label: '西咪替丁',
            children:[{
              value: 60,
              label: '单价60元'
            }]
          }]
        },{
          value: '补钙药',
          label: '补钙药',
          children: [{
            value: '葡萄糖酸钙',
            label: '葡萄糖酸钙',
            children:[{
              value: 30,
              label: '单价30元'
            }]
          }]
        }],
        //校验
        rules: {
          registerId: { required: true, message: '挂号单编号不可为空', trigger: 'blur' },
          drugsName: { required: true, message: '药品名称不可为空', trigger: 'blur' },
          counts: { required: true, message: '总量不可为空', trigger: 'blur' },
          usageAndDosage: { required: true, message: '用法用量不可为空', trigger: 'blur' }
        },
      };
    },
    methods: {
      submitForm(formName) {

        let params = 'registerId=' + this.preForm.registerId
          + '&drugsName=' + this.preForm.drugsName[1]
          + '&counts=' + this.preForm.counts
          + '&usageAndDosage=' + this.preForm.usageAndDosage
          + '&doctor=' + this.preForm.doctor
          + '&cashier='
        this.$refs[formName].validate((valid) => {
          console.log(params)
          //数字校验
          let flag = isNum(this.preForm.counts);
          if(!flag){
            return this.$message({
              message:'总量必须为数字',
              type:'error'
            })
          }
          if(valid){
            prescriptionSave(params).then(res => {
              if(res.status === 201){
                this.$message({
                  message: '开具处方成功',
                  type: 'success'
                });
                this.$router.push('/prescriptionlist')
              }
            }).catch(err => {
              this.$message({
                message: '挂号单不可重复',
                type: 'error'
              })
            })
          } else {
            console.log('必填选项!!')
            return false;
          }
        });
      },
    }
  }
</script>

<style scoped>

</style>
