<template>
  <div class="detail_content">
    <div class="detail_top">
      <div class="detail_top_manager">
        H5抓娃娃后台管理中心
      </div>
      <div class="detail_top_tuichu">
        <el-button type="danger" @click="outLogin">退出登录</el-button>
      </div>
    </div>
    <div class="detail_left">
      <el-row class="tac">
        <el-col>
          <el-menu default-active="1" class="el-menu-vertical-demo">
            <el-menu-item index="1">
              <router-link to="/content/creatDoll"><i class="el-icon-menu"></i>添加娃娃</router-link>
            </el-menu-item>
            <el-menu-item index="2">
              <router-link to="/content/dollList"><i class="el-icon-menu"></i>娃娃列表</router-link>
            </el-menu-item>
            <el-menu-item index="3">
              <router-link to="/content/machineManage"><i class="el-icon-menu"></i>添加娃娃机</router-link>
            </el-menu-item>
            <el-menu-item index="4">
              <router-link to="/content/machineList"><i class="el-icon-menu"></i>娃娃机列表</router-link>
            </el-menu-item>
            <el-menu-item index="6">
              <router-link to="/content/userGetRecordList"><i class="el-icon-menu"></i>抓取记录表</router-link>
            </el-menu-item>
            <el-menu-item index="7">
              <router-link to="/content/PaymentList"><i class="el-icon-menu"></i>支付订单管理</router-link>
            </el-menu-item>
            <el-menu-item index="8">
              <router-link to="/content/grabDollList"><i class="el-icon-menu"></i>用户抓到记录</router-link>
            </el-menu-item>
            <el-menu-item index="9">
              <router-link to="/content/getDollManageList"><i class="el-icon-menu"></i>领取管理列表</router-link>
            </el-menu-item>
            <!--渠道 start-->
            <!--<el-menu-item index="10">-->
              <!--<router-link to="/content/creatChannel"><i class="el-icon-menu"></i>添加渠道</router-link>-->
            <!--</el-menu-item>-->
            <!--<el-menu-item index="11">-->
              <!--<router-link to="/content/channelManageList"><i class="el-icon-menu"></i>渠道管理列表</router-link>-->
            <!--</el-menu-item>-->
            <!--渠道 end-->
            <el-menu-item index="10">
              <router-link to="/content/Statistics"><i class="el-icon-menu"></i>  统计列表</router-link>
            </el-menu-item>
          </el-menu>
        </el-col>
      </el-row>
    </div>
    <div class="detail_right">
       <router-view>
      </router-view>
    </div>
  </div>
</template>

<script>
  export default {
    data(){
      return {}
    },
    methods: {
      outLogin(){
        this.$router.push('/login');
      }
    }
  }
</script>

<style>
  .detail_content {
    width: 100%;
    margin: 0 auto;
    height: 100%;
    position: relative;
  }

  .detail_top {
    width: 100%;
    height: 60px;
    background-color: rgb(16, 135, 201);
    position: fixed;
    text-align:center;
    z-index: 5;
  }

  .detail_top_manager {
    display: inline-block;
    text-align: center;
    height: 100%;
    font-size: 30px;
    color: white;
    font-weight: bolder;
    line-height: 60px;
    margin-left: 30px;
  }

  .detail_top_tuichu {
    float: right;
    margin-right: 30px;
    padding-top: 12px;
    color: white;
  }

  .detail_left {
    width: 145px;
    float: left;
    height: 100%;
    background-color: #eef1f6;
    position: fixed;
    z-index: 0;
    top: 60px;
  }

  .router-link-active {
    color: rgb(32, 160, 255);
  }

  .detail_right {
    padding-left: 145px;
    box-sizing: border-box;
    padding-top: 60px;
    border: 1px solid rgba(0, 0, 0, .1);
  }

  .stasticBox p {
    text-align: left;
    line-height: 30px;
    color: #333;
    padding-left: 25px;
  }

  .activeClass {
    color: rgb(32, 160, 255);
  }
</style>
