<template>
  <div>
    <!--新增值班信息-->
    <el-card class="box-card" style="margin: 15px">
      <div slot="header" class="clearfix" style="width: 120px">
        <span>新增值班信息</span>
      </div>

      <!--表单-->
      <el-form :model="dutyForm" status-icon :rules="rules" ref="dutyForm" label-width="100px" class="demo-ruleForm">
        <el-form-item label="医生编号" prop="doctorId">
          <el-input type="text" v-model="dutyForm.doctorId" autocomplete="off" placeholder="请输入已存在的医生编号..."></el-input>
        </el-form-item>
        <el-form-item label="医生名" prop="doctorName">
          <el-input type="text" v-model="dutyForm.doctorName" autocomplete="off" placeholder="请输入对应的编号姓名..."></el-input>
        </el-form-item>
        <el-form-item label="科室">
          <el-radio-group v-model="dutyForm.department" style="text-align: left">
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
        <el-form-item label="值班日期" style="text-align: left">
          <el-checkbox-group v-model="dutyForm.dutyDate">
            <el-checkbox label="周一" name="type"></el-checkbox>
            <el-checkbox label="周二" name="type"></el-checkbox>
            <el-checkbox label="周三" name="type"></el-checkbox>
            <el-checkbox label="周四" name="type"></el-checkbox>
            <el-checkbox label="周五" name="type"></el-checkbox>
            <el-checkbox label="周六" name="type"></el-checkbox>
            <el-checkbox label="周日" name="type"></el-checkbox>
          </el-checkbox-group>
        </el-form-item>
        <el-form-item label="性别" style="text-align: left">
          <el-radio-group v-model="dutyForm.sex">
            <el-radio label="男"></el-radio>
            <el-radio label="女"></el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="出生日期" prop="birth" style="text-align: left">
          <el-date-picker
            v-model="dutyForm.birth"
            type="date"
            placeholder="选择日期">
          </el-date-picker>
        </el-form-item>
        <el-form-item label="级别">
          <el-select v-model="dutyForm.dockerLevel" placeholder="请选择..." style="width: 100%">
            <el-option aria-placeholder="请选择..." value=""></el-option>
            <el-option label="住院医师" value="0"></el-option>
            <el-option label="主治医师" value="1"></el-option>
            <el-option label="主任" value="2"></el-option>
            <el-option label="教授" value="3"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="备注" prop="remarks">
          <el-input
            type="textarea"
            :rows="2"
            placeholder="请输入内容"
            v-model="dutyForm.remarks">
          </el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="submitForm('dutyForm')">确定</el-button>
          <el-button @click="resetForm('dutyForm')">重置</el-button>
        </el-form-item>
      </el-form>
    </el-card>
  </div>
</template>

<script>
  import { dutySave } from '../../../api/duty';
  import {formatDate} from "../../../utils/dateUtils";
  import {isNum} from "../../../utils/validation";

  export default {
    data() {
      return {
        dutyForm: {
          doctorId: '',
          doctorName: '',
          department: '猫专科',
          dockerLevel: '',
          dutyDate: ['周一'],
          sex: '男',
          birth: '',
          remarks: ''
        },
        //校验
        rules: {
          doctorName: { required: true, message: '姓名不可为空', trigger: 'blur' },
          doctorId: { required: true, message: '编号不可为空', trigger: 'blur' }
        }
      };
    },
    methods: {
      submitForm(formName) {
        let birth = formatDate(this.dutyForm.birth, 'yyyy/MM/dd hh:mm:ss')
        let dockerLevel = this.dutyForm.dockerLevel
        let remarks = this.dutyForm.remarks
        let sex = 0
        if(remarks == undefined || remarks == ''){
          switch (dockerLevel) {
            case '0': remarks = '住院医师'
              break;
            case '1': remarks = '主治医师'
              break;
            case '2': remarks = '主任'
              break;
            case '3': remarks = '教授'
              break;
          }
        }
        if(this.dutyForm.sex === '女'){
          sex = 1
        }
        let params = 'doctorId=' + parseInt(this.dutyForm.doctorId)
          + '&doctorName=' + this.dutyForm.doctorName
          + '&department=' + this.dutyForm.department
          + '&dutyDate=' + this.dutyForm.dutyDate
          + '&sex=' + sex
          + '&birth=' + birth
          + '&dockerLevel=' + dockerLevel
          + '&remarks=' + remarks
        //数字校验
        let flag = isNum(this.dutyForm.doctorId);
        if(!flag){
          return this.$message({
            message:'医生编号必须为数字',
            type:'error'
          })
        }
        this.$refs[formName].validate((valid) => {
          console.log(params)
          if(valid){
            dutySave(params).then(res => {
              if(res.status === 201){
                this.$message({
                  message: '新增成功',
                  type: 'success'
                });
                this.$router.push('/dutylist')
              }
            }).catch(err => {
              this.$message({
                message: '新增失败！医生编号不存在',
                type: 'error'
              })
            })
          }else {
            console.log('必填选项')
            return false;
          }
        });
      },
      resetForm(formName) {
        this.usersForm.jurisdiction = ''
        this.$refs[formName].resetFields();
      }
    }
  }
</script>

<style>

</style>
