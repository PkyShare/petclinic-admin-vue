<template>
  <div>
    <!--值班列表-->
    <el-card class="box-card" style="margin: 15px">
      <div slot="header" class="clearfix">
        <span style="margin-left: -350px;">值班详情</span>
        <el-button style="float: right; padding: 3px 0"  icon="el-icon-circle-plus-outline"
                   @click="handleAdd('')">新增
        </el-button>
        <el-button style="float: right; padding: 3px 0;margin-right: 15px" icon="el-icon-printer"
                   v-print="'.box-card'">打印
        </el-button>
      </div>
      <!--表格-->
      <div class="text item">
        <el-table
          :data="tableData"
          style="width: 100%"
          :row-class-name="tableRowClassName">
          <el-table-column
            prop="doctorId"
            label="ID"
            width="90">
          </el-table-column>
          <el-table-column
            prop="doctorName"
            label="姓名">
          </el-table-column>
          <el-table-column
            prop="department"
            label="科室">
          </el-table-column>
          <el-table-column
            prop="dutyDate"
            label="值班日期">
          </el-table-column>
          <el-table-column
            prop="remarks"
            label="职位">
          </el-table-column>
          <el-table-column
            fixed="right"
            label="操作"
            width="100">
            <template slot-scope="scope">
              <el-button @click="handleSave(scope.row)" type="text" size="small">编辑</el-button>
              <el-button @click="handleDel(scope.row.id)" type="text" size="small">删除</el-button>
            </template>
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
  import {dutyDel,dutyList} from "../../../api/duty";

  export default {
    inject: ['reload'],
    data() {
      return {
        currentPage: 1, //初始页
        pagesize: 8,    //    每页的数据
        tableData: []
      }
    },
    created() {
      this.handleDutyList()
    },
    methods: {
      // 初始页currentPage、初始每页数据数pagesize和数据data
      handleSizeChange: function (size) {
        this.pagesize = size;
        this.handleDutyList()
      },
      handleCurrentChange: function (currentPage) {
        this.currentPage = currentPage;
        this.handleDutyList()
      },

      handleDutyList() {
        //发送请求
        dutyList(this.currentPage, this.pagesize).then(res => {
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
        this.$router.push('/dutyadd')
      },
      //编辑
      handleSave(userinfo) {
        this.$store.commit('SAVE_TEMP_INFO', userinfo)
        this.$router.push('/dutysave')
      },
      //删除
      handleDel(id) {
        console.log('删除' + id)
        dutyDel(id).then(res => {
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
  .el-table .warning-row {
    background: oldlace;
  }

  .el-table .success-row {
    background: #f0f9eb;
  }
  .text {
    font-size: 14px;
  }

  .item {
    margin-bottom: 18px;
  }

  .clearfix {
    margin-left: 10px!important;
  }
  .clearfix:after {
    display: table;
    content: "";
    margin-left: 20px;
  }
  .clearfix:after {
    clear: both
  }
</style>
