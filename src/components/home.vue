<template>
  <div>
    <el-carousel :interval="5000" arrow="always" class="d_jump" style="margin-top: 10px">
      <el-carousel-item v-for="item in imgList" :key="item.id">
        <el-row>
          <el-col :span="24"><img :src="item.idView" class="banner_img"/></el-col>
        </el-row>
      </el-carousel-item>
    </el-carousel>
    <el-row>
      <el-col :span="5" style="margin: 23px">
        <el-card :body-style="{ padding: '0px' }">
          <img src="http://img95.699pic.com/photo/50114/3068.jpg_wh860.jpg" class="image">
          <div style="padding: 14px;">
            <span>人事部</span>
            <div class="bottom clearfix">
              <time class="time">{{ currentDate }}</time>
            </div>
          </div>
        </el-card>
      </el-col>
      <el-col :span="5" style="margin: 23px">
        <el-card :body-style="{ padding: '0px' }">
          <img src="http://img95.699pic.com/photo/50064/0977.jpg_wh860.jpg" class="image">
          <div style="padding: 14px;">
            <span>门诊部</span>
            <div class="bottom clearfix">
              <time class="time">{{ currentDate }}</time>
            </div>
          </div>
        </el-card>
      </el-col>
      <el-col :span="5" style="margin: 23px">
        <el-card :body-style="{ padding: '0px' }">
          <img src="http://img95.699pic.com/photo/50027/0757.jpg_wh860.jpg" class="image">
          <div style="padding: 14px;">
            <span>药房部</span>
            <div class="bottom clearfix">
              <time class="time">{{ currentDate }}</time>
            </div>
          </div>
        </el-card>
      </el-col>
      <el-col :span="5" style="margin: 23px">
        <el-card :body-style="{ padding: '0px' }">
          <img src="http://img95.699pic.com/photo/50076/2904.jpg_wh860.jpg" class="image">
          <div style="padding: 14px;">
            <span>关于</span>
            <div class="bottom clearfix">
              <time class="time">{{ currentDate }}</time>
            </div>
          </div>
        </el-card>
      </el-col>
    </el-row>
  </div>

</template>

<script>
  import {dateString} from "../utils/dateUtils";

  export default {
    data() {
      return{
        currentDate: dateString(new Date()),
        // 图片需要引入, 否则无法显示
        imgList: [
          {id: 0, name: 'pic1',idView: require('../assets/img/轮播1.jpg')},
          {id: 1, name: 'pic2', idView: require('../assets/img/轮播2.jpg')},
          {id: 2, name: 'pic3', idView: require('../assets/img/轮播3.jpg')},
          {id: 3, name: 'pic4', idView: require('../assets/img/轮播4.jpg')}
        ],
      }
    },
  }
</script>

<style>
  .el-carousel__item h3 {
    color: #475669;
    font-size: 18px;
    opacity: 0.75;
    line-height: 300px;
    margin: 0;
  }

  .el-carousel__item:nth-child(2n) {
    background-color: #99a9bf;
  }

  .el-carousel__item:nth-child(2n+1) {
    background-color: #d3dce6;
  }
  .time {
    font-size: 13px;
    color: #999;
  }

  .bottom {
    margin-top: 13px;
    line-height: 12px;
  }

  .button {
    padding: 0;
    float: right;
  }

  .image {
    width: 100%;
    display: block;
  }

  .clearfix:before,
  .clearfix:after {
    display: table;
    content: "";
  }

  .clearfix:after {
    clear: both
  }
</style>
