<template>
  <div>
    <!--医院业务分类-->

    <el-card class="box-card" style="margin: 15px">
      <div slot="header" class="clearfix">
        <span style="margin-left: -350px;">业务分类</span>
        <el-button style="float: right; padding: 3px 0"
                   icon="el-icon-circle-plus-outline"
                   @click="handleAdd('')">新增
        </el-button>
      </div>
      <!--表格-->
      <div class="text item">
        <el-table
          :data="tableData"
          style="width: 100%;margin-bottom: 20px;"
          :row-class-name="tableRowClassName"
          border
          row-key="id"
          lazy
          :load="load">
          <el-table-column
            prop="id"
            label="ID"
            width="90">
          </el-table-column>
          <el-table-column
            prop="projectName"
            label="项目名称">
          </el-table-column>
          <el-table-column
            prop="projectType"
            label="项目类型">
          </el-table-column>
          <el-table-column
            prop="remarks"
            label="说明">
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
  import {projectList,projectDel} from "../../../api/project";

  export default {
    data() {
      return {
        currentPage:1, //初始页
        pagesize:8,    //    每页的数据
        tableData: [
          // {
          //   id: 3,
          //   date: '2016-05-01',
          //   name: '王大虎',
          //   address: '上海市普陀区金沙江路 1519 弄',
          //   children: [{
          //     id: 31,
          //     date: '2016-05-01',
          //     name: '王小虎',
          //     address: '上海市普陀区金沙江路 1519 弄'
          //   }]
          // }
        ],

        tableData1: [{
          id: 3,
          parentId: 0,
          projectName: '李四',
          remarks: '上海市普陀区金沙江路 1519 弄',
          hasChildren: true
        }]
      }
    },

    created() {
      this.handleProjectList()
    },
    methods: {

      load(tree, treeNode, resolve) {
        this.handleProjectList()
        resolve([
          {
            id: 31,
            date: '2016-05-01',
            name: '王小虎',
            address: '上海市普陀区金沙江路 1519 弄'
          }, {
            id: 32,
            date: '2016-05-01',
            name: '王小虎',
            address: '上海市普陀区金沙江路 1519 弄'
          }
        ])
      },
      // 初始页currentPage、初始每页数据数pagesize和数据data
      handleSizeChange: function (size) {
        this.pagesize = size;
        this.handleProjectList()
      },
      handleCurrentChange: function(currentPage){
        this.currentPage = currentPage;
        this.handleProjectList()
      },

      //获取列表
      handleProjectList() {
        //发送请求
        projectList(this.currentPage, this.pagesize).then(res => {
          this.tableData = []
          if(res.data.data === null){
            //请求的数据为空时直接回到最后一页
            this.handleCurrentChange(this.currentPage - 1)
          }
          else {
            for (let data of res.data.data) {
              console.log(data.attributes)
              this.tableData.push(data.attributes)
            }
          }
        })
      },

      //新增
      handleAdd(){

      },

      //编辑
      handleSave(info){

      },

      //删除信息
      handleDel(id){

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
