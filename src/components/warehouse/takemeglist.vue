<template>
    <div>
      <!--取药队列-->
      <el-card class="box-card" style="margin: 15px">
        <div slot="header" class="clearfix">
          <span style="margin-left: -350px;">取药队列</span>
        </div>
        <!--表格-->
        <div class="text item">
          <el-table
            :data="tableData"
            style="width: 100%"
            :row-class-name="tableRowClassName">
            <el-table-column
              prop="id"
              label="处方ID"
              width="90">
            </el-table-column>
            <el-table-column
              prop="registerId"
              label="挂号ID">
            </el-table-column>
            <el-table-column
              prop="drugsName"
              label="药品名称">
            </el-table-column>
            <el-table-column
              prop="counts"
              label="药品数量">
            </el-table-column>
            <el-table-column
              prop="usageAndDosage"
              label="用法用量">
            </el-table-column>
            <el-table-column
              prop="doctor"
              label="医生名称">
            </el-table-column>
            <el-table-column
              prop="prescriptionDate"
              label="处方日期">
            </el-table-column>
            <el-table-column
              prop="takeMedicineType"
              label="取药状态">
            </el-table-column>
            <el-table-column
              fixed="right"
              label="操作"
              width="100">
              <template slot-scope="scope">
                <el-button @click="handleSave(scope.row)" type="text" size="small">取药</el-button>
              </template>
            </el-table-column>
          </el-table>
        </div>
      </el-card>
    </div>
</template>

<script>
  import {prescriptionList} from "../../api/prescription";

  export default {
    inject: ['reload'],
    data() {
      return {
        currentPage:1, //初始页
        pagesize:8,    //    每页的数据
        tableData: []
      }
    },
    created() {
      this.handleList()
    },

    methods: {

      // 初始页currentPage、初始每页数据数pagesize和数据data
      handleSizeChange: function (size) {
        this.pagesize = size;
        this.handleList()
      },
      handleCurrentChange: function (currentPage) {
        this.currentPage = currentPage;
        this.handleList()
      },

      handleList() {
        //发送请求
        prescriptionList(this.currentPage, this.pagesize).then(res => {
          this.tableData = []
          if (res.data.data === null) {
            //请求的数据为空时直接回到最后一页
            this.handleCurrentChange(this.currentPage - 1)
          }
          else {
            for (let data of res.data.data) {
              this.tableData.push(data.attributes)
            }
          }
        })
      },

      //取药
      handleSave(info) {
        if(info.takeMedicineType == '已取') {
          return this.$message({
            message: '该处方已领取药材',
            type: 'error'
          })
        }
        this.$store.commit('SAVE_TEMP_INFO', info)
        this.$router.push('/outputadd')
      },

      tableRowClassName({row, rowIndex}) {
        if (rowIndex === 1) {
          return 'warning-row';
        } else if (rowIndex === 3) {
          return 'success-row';
        }
        return '';
      }
    }
  }
</script>

<style scoped>

</style>
