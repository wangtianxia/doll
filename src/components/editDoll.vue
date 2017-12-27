<template>
  <div class="editClassContent">
    <h2>编辑娃娃</h2>
    <div>
      娃娃的ID:
      <el-input class="dollId" v-model="dollId" placeholder="请输入娃娃Id" disabled></el-input>
    </div>
    <div>
      娃娃名称:
      <el-input v-model="dollName" placeholder="请输入娃娃名称"></el-input>
    </div>
    <div>
      抓取价格:
      <el-input v-model="grabPrice" placeholder="请输入娃娃抓取定价"></el-input>
    </div>
    <div>
      回购价格:
      <el-input v-model="backPrice" placeholder="请输入娃娃回购定价"></el-input>
    </div>
    <div class="sendWay">
      <span class="way">发货方式:</span>
      <el-radio v-model="type" label="1">随机发货</el-radio>
      <el-radio v-model="type" label="0">无</el-radio>
    </div>
    <div class="submit_Btn">
      <el-button type="primary" @click="submitClass" style="width:200px;height:50px;">提交</el-button>
    </div>
  </div>
</template>

<script>
  import {dollList,updateDoll,getDoll,addDoll} from "../server/getData.js";
  export default {
    data(){
      return {
        dollId: '',
        dollName: '',
        grabPrice: '',
        backPrice: '',
        type: '1',
      }
    },
    mounted(){
        console.log(this.$route);
      getDoll({id:this.$route.params.giftId}).then(res =>{
          if(res['st'] == '1'){
              this.dollId = res['data']['info']['id'];
              this.dollName = res['data']['info']['name'];
              this.grabPrice = res['data']['info']['price'];
              this.backPrice = res['data']['info']['refund_price'];
              this.type = res['data']['info']['random']+'';
          }else if(res['st'] == '2'){

          }
      })
    },
    methods: {
      submitClass(){
        if (this.dollId == '') {
          this.$alert("娃娃ID不能为空！", "修改娃娃失败", {
            confirmButtonText: "确定",
            type: "warning",
            center: true,
            callback: (action) => {

            }
          });
          return;
        }
        if (this.dollName == '') {
          this.$alert("娃娃名不能为空！", "修改娃娃失败", {
            confirmButtonText: "确定",
            type: "warning",
            center: true,
            callback: (action) => {
            }
          });
          return;
        }
        if (this.grabPrice == '') {
          this.$alert("抓取价格不能为空！", "创建娃娃失败", {
            confirmButtonText: "确定",
            type: "warning",
            center: true,
            callback: (action) => {
            }
          });
          return;
        }

        if (this.backPrice == '') {
          this.$alert("回购价格不能为空！", "创建娃娃失败", {
            confirmButtonText: "确定",
            type: "warning",
            center: true,
            callback: (action) => {
            }
          });
          return;
        }

        let isHas = false;
        for(var i=0;i<this.grabPrice.length;i++){
          if( this.grabPrice[i].charCodeAt(0)< 48 || this.grabPrice[i].charCodeAt(0) > 57){
            isHas = true;
            break;
          }
        }
        if(isHas){
          this.$message.error('所填价格有不合法数字');
          return;
        }

        let isHas2 = false;
        for(var i=0;i<this.backPrice.length;i++){
          if( this.backPrice[i].charCodeAt(0)< 48 || this.backPrice[i].charCodeAt(0) > 57) { //32～126(共95个)是字符(32是空格），其中48～57为0到9十个阿拉伯数字。
            isHas = true;
            break;
          }
        }
        if(isHas2){
          this.$message.error('所填价格有不合法数字');
          return;
        }
        //添加娃娃

        updateDoll({id: this.dollId,
          name:this.dollName,
          desc:this.descrice,
          price:this.grabPrice,
          refund_price:this.backPrice,
          random:this.type}).then(res => {
          if (res['st'] == 1) {
            this.$confirm('是否要去娃娃列表中查看', '修改娃娃列表创建成功', {
              confirmButtonText: '确定',
              cancelButtonText: '取消',
              center: true
            }).then(() => {
              this.$router.push('/content/dollList')
            }).catch(() => {
            });

          }else if(res['st'] == 2){
            this.$message.error('该娃娃id已存在！请重新填！');
          }else if (res['st'] == -2) {
            this.$alert("用户未登录", "修改娃娃失败", {
              confirmButtonText: "确定",
              type: "warning",
              center: true,
              callback: (action) => {
                this.$router.push('/login')
              }
            });
          }
        }).catch(err => {
          this.$message.error('修改娃娃失败');
        });
      }
    }
  }
</script>
<style lang='scss'>
  .editClassContent {
    width:80%;
    margin:0 auto;
    padding-bottom: 10px;
    h2 {
      padding: 20px;
      text-align: center;
    }
    div {
      width: 70%;
      padding: 20px 0 0 20px;
    }
    .descrice{
      padding: 20px 0 0 50px;
    }
    .up_Doll_Img {
      margin-top: 20px;
    }
    .sendWay {
      margin-top: 20px;
    }
    .sendWay .way{
      margin-right:50px;
    }
    .dollCreateInput {
      padding: 40px;
      background-color: #409EFF;
      width: 100px;
      height: 100px;
      margin-top: 10px;
      position: relative;
      color: white;
      text-align: center;
      font-size: 1rem;
      border-radius: 14px;
      input {
        opacity: 0;
        float: left;
        position: absolute;
        left: 0;
        top: 0;
        width: 100px;
        height: 100px;
        z-index: 5;
      }
      span {
        width: 100px;
        text-align: center;
        display: inline-block;
        position: absolute;
        left: 0;
      }
      .dollCreateImgAndName {
        padding: 30px 0 30px 0;
        display: flex;
        -webkit-box-pack: flex-start;
        -webkit-justify-content: flex-start;
        -ms-flex-pack: flex-start;
        justify-content: flex-start;
        -webkit-box-align: center;
        -webkit-align-items: center;
        -ms-flex-align: center;
        align-items: center;
      }
    }
    .giftCreate_img {
      width: 20%;
    }
    .submit_Btn{
      width:100%;
      text-align:center;
    }
  }
</style>
