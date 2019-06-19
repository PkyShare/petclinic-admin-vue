<template>
  <div>
    <!--编辑值班信息-->
    <el-card class="box-card" style="margin: 15px">
      <div slot="header" class="clearfix" style="width: 120px">
        <span>编辑值班信息</span>
      </div>

      <!--表单-->
      <el-form :model="dutyForm" status-icon :rules="rules" ref="dutyForm" label-width="100px" class="demo-ruleForm">
        <el-input type="hidden" v-model="dutyForm.id"></el-input>
        <el-form-item label="医生编号" prop="doctorId">
          <el-input type="text" v-model="dutyForm.doctorId" autocomplete="off" placeholder="请输入已存在的医生编号..."></el-input>
        </el-form-item>
        <el-form-item label="医生名" prop="doctorName">
          <el-input type="text" v-model="dutyForm.doctorName" autocomplete="off" placeholder="请输入对应的编号姓名..."></el-input>
        </el-form-item>
        <el-form-item label="科室" style="text-align: left">
          <el-radio-group v-model="dutyForm.department">
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
            <el-radio label="男" value="0"></el-radio>
            <el-radio label="女" value="1"></el-radio>
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
          <el-button @click="goBack()">返回</el-button>
        </el-form-item>
      </el-form>
    </el-card>
  </div>
</template>

<script>
  import { dutySave } from '../../../api/duty';
  import {formatDate} from "../../../utils/dateUtils";

  export default {
    data() {
      return {
        dutyForm: {
          id: this.$store.state.tempInfo.id,
          doctorId: this.$store.state.tempInfo.doctorId,
          doctorName: this.$store.state.tempInfo.doctorName,
          department: this.$store.state.tempInfo.department,
          dockerLevel: this.$store.state.tempInfo.dockerLevel,
          dutyDate: [this.$store.state.tempInfo.dutyDate],
          sex: '',
          birth: this.$store.state.tempInfo.birth,
          remarks: this.$store.state.tempInfo.remarks
        },
        //校验
        rules: {
          doctorName: { required: true, message: '姓名不可为空', trigger: 'blur' },
          doctorId: { required: true, message: '编号不可为空', trigger: 'blur' }
        }
      };
    },
    created: function () {
      this.changeInfo()
    },

    methods: {

      //改变属性值
      changeInfo() {
        if(this.$store.state.tempInfo.sex === 1){
          this.dutyForm.sex = '女'
        } else {
          this.dutyForm.sex = '男'
        }
      },
      //返回
      goBack() {
        this.$router.back(-1);
      },
      submitForm(formName) {
        //后台的birth是Date类型，需要转换为相同类型
        let birth = this.dutyForm.birth
        //没有修改birth
        if(this.$store.state.tempInfo.birth === birth){
          birth = new Date(this.dutyForm.birth) //转成Date格式
        }
        //已经修改了birth
        birth = formatDate(birth, 'yyyy/MM/dd hh:mm:ss')

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
        if(dockerLevel === undefined ){
          dockerLevel = ''
        }
        let params = 'id=' + this.dutyForm.id
          + '&doctorId=' + this.dutyForm.doctorId
          + '&doctorName=' + this.dutyForm.doctorName
          + '&department=' + this.dutyForm.department
          + '&dutyDate=' + this.dutyForm.dutyDate
          + '&sex=' + sex
          + '&birth=' + birth
          + '&dockerLevel=' + dockerLevel
          + '&remarks=' + remarks
        this.$refs[formName].validate((valid) => {
          console.log(params)
          if(valid){
            dutySave(params).then(res => {
              //请求成功
              if(res.status === 201){
                this.$message({
                  message: '修改成功',
                  type: 'success'
                });
                this.$router.push('/dutylist')
              }
            }).catch(reason => {
                //请求失败
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

