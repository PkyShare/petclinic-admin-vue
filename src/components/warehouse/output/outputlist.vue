<template>
  <div>
    <!--出库列表-->
    <el-card class="box-card" style="margin: 15px">
      <div slot="header" class="clearfix">
        <span style="margin-left: -350px;">出库列表</span>
      </div>
      <!--表格-->
      <div class="text item">
        <el-table
          :data="tableData"
          style="width: 100%"
          :row-class-name="tableRowClassName">
          <el-table-column
            prop="id"
            label="出库编号"
            width="90">
          </el-table-column>
          <el-table-column
            prop="inputId"
            label="入库编号"
            width="90">
          </el-table-column>
          <el-table-column
            prop="drugsId"
            label="药品编号">
          </el-table-column>
          <el-table-column
            prop="drugsName"
            label="药品名称">
          </el-table-column>
          <el-table-column
            prop="outputWarehouseDate"
            label="出库时间">
          </el-table-column>
          <el-table-column
            prop="outputWarehouseNum"
            label="出库数量">
          </el-table-column>
          <el-table-column
            prop="acceptor"
            label="验收人">
          </el-table-column>
          <el-table-column
            prop="receivingUnit"
            label="领取单位">
          </el-table-column>
          <el-table-column
            prop="remarks"
            label="备注">
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
  import {outputDel, outputList} from "../../../api/output";

  export default {
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
        outputList(this.currentPage, this.pagesize).then(res => {
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

      //删除
      handleDel(id) {
        console.log('删除' + id)
        outputDel(id).then(res => {
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

<style scoped>

</style>
