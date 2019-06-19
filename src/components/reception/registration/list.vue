<template>
  <div>
    <!--挂号列表-->
    <el-card class="box-card" style="margin: 15px">
      <div slot="header" class="clearfix">
        <span style="margin-left: -350px;">挂号列表</span>
      </div>

      <!--表格-->
      <div class="text item">
        <el-table
          :data="tableData"
          style="width: 100%"
          border
          :row-class-name="tableRowClassName">
          <el-table-column
            prop="id"
            sortable
            label="挂号编号"
            width="90">
          </el-table-column>
          <el-table-column
            prop="cardId"
            label="卡ID">
          </el-table-column>
          <el-table-column
            prop="username"
            label="宠物主人名">
          </el-table-column>
          <el-table-column
            prop="petname"
            label="宠物姓名">
          </el-table-column>
          <el-table-column
            prop="registerType"
            label="挂号类别">
          </el-table-column>
          <el-table-column
            prop="department"
            label="科室">
          </el-table-column>
          <el-table-column
            prop="doctor"
            label="就诊医生">
          </el-table-column>
          <el-table-column
            prop="registerFee"
            sortable
            label="挂号费">
          </el-table-column>
          <el-table-column
            prop="created"
            sortable
            label="挂号日期">
          </el-table-column>
          <el-table-column
            prop="cashier"
            label="收款员">
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
  import {regList} from "../../../api/reg";
  import {regDel} from "../../../api/reg";

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
      this.handleRegList()
    },
    methods: {
      // 初始页currentPage、初始每页数据数pagesize和数据data
      handleSizeChange: function (size) {
        this.pagesize = size;
        this.handleRegList()
      },
      handleCurrentChange: function (currentPage) {
        this.currentPage = currentPage;
        this.handleRegList()
      },

      handleRegList() {
        //发送请求
        regList(this.currentPage, this.pagesize).then(res => {
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
        this.$router.push('/reg')
      },
      //编辑
      handleSave(userInfo) {
        this.$store.commit('SAVE_TEMP_INFO', userInfo)
        this.$router.push('/regsave')
      },
      //删除
      handleDel(id) {
        console.log('删除' + id)
        regDel(id).then(res => {
          if (res.status === 200) {
            this.$message({
              message: '删除成功',
              type: 'success'
            })
            this.reload()
          } else {
            console.log('删除失败')
          }
        }).catch(err => {
          //错误请求
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
