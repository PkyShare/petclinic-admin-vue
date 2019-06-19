<template>
  <div>
    <!--药品出库-->
    <el-card class="box-card" style="margin: 15px">
      <div slot="header" class="clearfix" style="width: 120px">
        <span>药品出库</span>
      </div>

      <!--表单-->
      <el-form :model="outputForm" status-icon :rules="rules" ref="outputForm" label-width="100px" class="demo-ruleForm">
        <el-form-item label="入库编号" prop="inputId">
          <el-cascader
            :options="options"
            v-model="outputForm.inputId"
            style="width: 100%"
          ></el-cascader>
        </el-form-item>
        <el-form-item label="药品编号" prop="drugsId">
          <el-input type="text" disabled v-model="outputForm.drugsId" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="药品名称" prop="drugsName">
          <el-input type="text" disabled v-model="outputForm.drugsName" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="出库数量" prop="outputWarehouseNum">
          <el-input type="text" disabled v-model="outputForm.outputWarehouseNum" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="验收人" prop="acceptor">
          <el-input type="text" disabled v-model="outputForm.acceptor" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="领取单位" prop="receivingUnit" style="text-align: left">
          <el-radio-group v-model="outputForm.receivingUnit">
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
        <el-form-item label="备注" prop="remarks">
          <el-input
            type="textarea"
            :rows="2"
            placeholder="请输入内容"
            v-model="outputForm.remarks">
          </el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="submitForm('outputForm')">确定</el-button>
          <el-button type="info" v-print="'.box-card'">打印</el-button>
        </el-form-item>
      </el-form>
    </el-card>
  </div>
</template>

<script>
  import {outputSave} from "../../../api/output";

  export default {
    data() {
      return {
        outputForm: {
          inputId: [],  //入库编号 NOT NULL
          preId: this.$store.state.tempInfo.id,
          drugsId: '',  //药品编号  NOT NULL
          drugsName: this.$store.state.tempInfo.drugsName, //药品名称
          outputWarehouseNum: this.$store.state.tempInfo.counts,   //出库数量  NOT NULL
          acceptor: this.$store.state.userInfo.username, //验收人  NOT NULL
          receivingUnit: '',  //领取单位
          remarks: ''   //备注
        },
        options: [],

            //校验
        rules: {
          inputId: { required: true, message: '入库编号不可为空', trigger: 'blur' },
          drugsId: { required: true, message: '药品编号不可为空', trigger: 'blur' },
          outputWarehouseNum: { required: true, message: '出库数量不可为空', trigger: 'blur' },
          receivingUnit: { required: true, message: '领取单位不可为空', trigger: 'blur' }
        }
      };
    },

    created() {
      console.log(this.$store.state.tempInfo,)
      switch (this.outputForm.drugsName) {
        case "甲氧氯普胺":
          this.outputForm.drugsId = 37
          this.options = [{
            value:1,
            label:'1号'
          },
            {
              value:7,
              label:'7号'
            }]
          break;
        case "卓比林":
          this.outputForm.drugsId = 39
          this.options = [{
            value:1,
            label:'1号'
          },
            {
              value:9,
              label:'9号'
            }]
          break;
        case "溴米那普鲁卡因":
          this.outputForm.drugsId = 41
          this.options = [{
            value:3,
            label:'3号'
          }]
          break;
        case "苯海拉明":
          this.outputForm.drugsId = 43

          break;
        case "氯丙嗪":
          this.outputForm.drugsId = 45
          this.options = [{
            value:4,
            label:'4号'
          },
            {
              value:8,
              label:'8号'
            }]
          break;
        case "奥美拉唑":
          this.outputForm.drugsId = 46
          this.options = [{
            value:5,
            label:'5号'
          }]
          break;
        case "西咪替丁":
          this.outputForm.drugsId = 50
          this.options = [{
            value:6,
            label:'6号'
          }]
          break;
        case "关节康":
          this.outputForm.drugsId = 51
          this.options = [{
            value:10,
            label:'10号'
          }]
          break;
        case "安痛定":
          this.outputForm.drugsId = 54
          this.options = [{
            value:11,
            label:'11号'
          }]
          break;
        case "葡萄糖酸钙":
          this.outputForm.drugsId = 55
          this.options = [{
            value:12,
            label:'12号'
          }]
          break;
      }
    },

    methods: {
      submitForm(formName) {
        let params = 'inputId=' + this.outputForm.inputId[0]
          + '&preId=' + this.outputForm.preId
          + '&drugsId=' + this.outputForm.drugsId
          + '&drugsName=' + this.outputForm.drugsName
          + '&outputWarehouseNum=' + this.outputForm.outputWarehouseNum
          + '&acceptor=' + this.outputForm.acceptor
          + '&receivingUnit=' + this.outputForm.receivingUnit
          + '&remarks=' + this.outputForm.remarks
        this.$refs[formName].validate((valid) => {
          console.log(params)
          if(valid){
            outputSave(params).then(res => {
              if(res.status === 201){
                this.$message({
                  message: '取药成功',
                  type: 'success'
                });
                this.$router.push('/outputlist')
              }
            }).catch(reason => {

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
