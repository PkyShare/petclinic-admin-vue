<template>
  <div>
    <!--账号列表-->
    <el-card class="box-card" style="margin: 15px">
      <div slot="header" class="clearfix">
        <span style="margin-left: -350px;">用户列表</span>
        <el-button style="float: right; padding: 3px 0"
                   type="text"
                   @click="handleAdd('')">新增
        </el-button>
      </div>
      <!--表格-->
      <div class="text item">
        <el-table
          :data="tableData"
          style="width: 100%"
          :row-class-name="tableRowClassName">
          <el-table-column
            prop="id"
            label="ID"
            width="90">
          </el-table-column>
          <el-table-column
            prop="username"
            label="姓名">
          </el-table-column>
          <el-table-column
            prop="phone"
            label="电话">
          </el-table-column>
          <el-table-column
            prop="email"
            label="邮箱">
          </el-table-column>
          <el-table-column
            prop="remarks"
            label="部门">
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
  import {mapState,mapActions} from 'vuex';
  import {userList,userDel} from "../../../api/users";

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
      this.handleUserList()
    },
    methods: {
      // ...mapActions(['GET_USERLIST']),

      // 初始页currentPage、初始每页数据数pagesize和数据data
      handleSizeChange: function (size) {
        this.pagesize = size;
        this.handleUserList()
      },
      handleCurrentChange: function(currentPage){
        this.currentPage = currentPage;
        this.handleUserList()
      },

      //列表（分页）
      handleUserList() {
        //发送请求
        userList(this.currentPage, this.pagesize).then(res => {
          this.tableData = []
          if(res.data.data === null){
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
      handleAdd(id){
        this.$router.push('/useradd')
      },
      //编辑
      handleSave(userinfo){
        console.log(userinfo)
        this.$store.commit('SAVE_TEMP_INFO', userinfo)
        this.$router.push('/usersave')
      },
      //删除
      handleDel(id){
        console.log('删除' + id)
        userDel(id).then(res => {
          if(res.status === 200){
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
    },

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
