<template>
  <div>
    <!--处方列表-->
    <el-card class="box-card" style="margin: 15px">
      <div slot="header" class="clearfix">
        <span style="margin-left: -350px;">处方列表</span>
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
        </el-table>
      </div>
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="currentPage"
        :page-sizes="[8, 10, 15, 20]"
        :page-size="pagesize"
        layout="sizes, prev, pager, next">
      </el-pagination>
    </el-card>
  </div>
</template>

<script>
  import {prescriptionList} from "../../../api/prescription";
  import {prescriptionDel} from "../../../api/prescription";

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
      //新增
      handleAdd(id) {
        this.$router.push('/prescriptionadd')
      },
      //编辑
      handleSave(info) {
        console.log(info)
        this.$store.commit('SAVE_TEMP_INFO', info)
        this.$router.push('/prescriptionListsave')
      },
      //删除
      handleDel(id) {
        console.log('删除' + id)
        prescriptionDel(id).then(res => {
          if (res.status === 200) {
            this.$message({
              message: '删除成功',
              type: 'success'
            })
            this.reload()
          } else {
            console.log('删除失败')
          }
        })
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

<style>

</style>
