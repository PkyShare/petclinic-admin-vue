<template>
  <div>
    <!--就诊队列-->
    <el-card class="box-card" style="margin: 15px">
      <div slot="header" class="clearfix">
        <span style="margin-left: -350px;">就诊队列</span>
      </div>
      <!--表格-->
      <div class="text item">
        <el-table
          :data="tableData"
          style="width: 100%"
          :row-class-name="tableRowClassName">
          <el-table-column
            prop="id"
            sortable
            label="挂号单"
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
            label="宠物名">
          </el-table-column>
          <el-table-column
            prop="created"
            sortable
            label="排队时间">
          </el-table-column>
          <el-table-column
            prop="waitDiagnosisType"
            sortable
            label="就诊类型">
          </el-table-column>
          <el-table-column
            fixed="right"
            label="操作"
            width="100">
            <template slot-scope="scope">
              <el-button @click="handleSave(scope.row)" type="text" size="small">就诊</el-button>
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
  import {waitingList} from "../../../api/waitinglist";
  import {waitingUpdate} from "../../../api/waitinglist";

  export default {
    inject: ['reload'],
    data(){
      return{
        currentPage:1, //初始页
        pagesize:8,    //    每页的数据
        tableData: [],
        id: '',
        cardId: '',
        registerId: '',
        username: '',
        petname: '',
        created: '',
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
        waitingList(this.currentPage, this.pagesize).then(res => {
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

      //就诊
      handleSave(info) {
        let type = info.waitDiagnosisType

        if(type == '确诊'){
          return this.$message({
            message: '该挂号单以确诊',
            type: 'warning'
          })
        }

        this.$store.commit('SAVE_TEMP_INFO', info)
        //将等待状态修改为就诊状态
        let params = 'id=' + info.id
          + '&cardId=' + info.cardId
          + '&registerId=' + info.registerId
          + '&username=' + info.username
          + '&petname=' + info.petname
          + '&waitDiagnosisType=' + type
        console.log(params)
        waitingUpdate(params).then(res => {
          if(res.status == 200){
            this.$router.push('/prescriptionadd')
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
