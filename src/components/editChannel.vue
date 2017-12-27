<template>
  <div class="editChannel">
    <h2>修改渠道</h2>
    <div>
      <span>渠道号:</span>
      <el-input v-model="channel" placeholder="请输入渠道号"></el-input>
    </div>
    <div>
      <span>渠道名:</span>
      <el-input v-model="desc" placeholder="请输入渠道名"></el-input>
    </div>
    <div class="submit_Btn">
      <el-button type="primary" @click="submitClass" style="width:200px;height:50px;">提交</el-button>
    </div>
  </div>
</template>
<script type="text/javascript">
  import { getChannel,updateCahnnel } from "../server/getData.js";
  export default {
    data (){
      return {
        channel:'',
        desc:''
      }
    },
    methods:{
      submitClass(){
        if (this.channel == '') {
          this.$alert("渠道号不能为空！", "添加渠道失败", {
            confirmButtonText: "确定",
            type: "warning",
            center: true,
            callback: (action) => {

            }
          });
          return;
        }
        if (this.desc == '') {
          this.$alert("渠道名不能为空！", "添加渠道失败", {
            confirmButtonText: "确定",
            type: "warning",
            center: true,
            callback: (action) => {
            }
          });
          return;
        }

        let isHas = false;
        for (var i = 0; i < this.channel.length; i++) {
          console.log(this.channel.length);
          if (this.channel[i].charCodeAt(0) < 48 || this.channel[i].charCodeAt(0) > 57) {
            isHas = true;
            break;
          }
        }
        if (isHas) {
          this.$message.error('所填渠道号必须为数字！');
          return;
        }

      }
    }
  }
</script>
<style lang='scss'>
  .editChannel{
    width: 80%;
    margin: 0 auto;
    padding-bottom: 10px;
    h2 {
      padding: 20px;
      margin-left: 350px;
    }
    div {
      width: 70%;
      padding: 20px 0 0 20px;
    }
    span {
      width: 100px;
      text-align: center;
      display: inline-block;
    }
    .descInfo {
      width: 100px;
      line-height: 3rem;
      text-align: center;
      display: inline-block;
      padding-top: -20px;
    }
    .submit_Btn {
      margin-top: 30px;
      /*width:100%;*/
      margin-left: 300px;
    }
  }
</style>
