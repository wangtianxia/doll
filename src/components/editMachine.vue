<template>
  <div class="deitmachineContent">
    <h2>编辑娃娃机</h2>
    <div>
      <span style="width:100px;margin-right:20px;">serverId：</span>
      <el-input  class="serverId"  v-model="serverId" placeholder="请输入serverId" disabled></el-input>
    </div>
    <div>
      <span style="width:100px;margin-right:30px;">娃娃ID：</span>
      <el-input  class="doll_id"  v-model="doll_id" placeholder="请输入serverId" ></el-input>
    </div>
    <div style="margin-top:30px;">
      <span style="margin-right:30px;">娃娃机状态:</span>
      <el-radio v-model="online" label="1">上线</el-radio>
      <el-radio v-model="online" label="0">下线</el-radio>
    </div>
    <div style="margin-top:30px;">
      <span style="margin-right:20px;">商品的定义：</span>
      <el-radio v-model="doll_status" label="1">新品</el-radio>
      <el-radio v-model="doll_status" label="2">限时特价</el-radio>
      <el-radio v-model="doll_status" label="0">无</el-radio>
    </div>
    <div class="lessPrice clearfix">
      <span class="fl" style="display:inline-block;font-size:16px;padding-top:30px;width:100px;">特价折扣：</span>
      <!--<el-input  class="lessPrice"  v-model="discount" placeholder="请输入娃娃机折扣价"></el-input>-->
      <div class="fl" style="width:300px;margin-top:-15px;margin-left:-5px;">
        <el-select v-model="discount" placeholder="请选择">
          <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value">
          </el-option>
        </el-select>
      </div>
    </div>
    <div>
      <span style="width:100px;margin-right:10px;">机器排序：</span>
      <el-input  class="order"  v-model="order" placeholder="请输入娃娃机排序顺序"></el-input>
    </div>
    <div class="submit_Btn">
      <el-button type="primary" @click="submitClass" style="width:200px;height:50px;">提交</el-button>
    </div>
  </div>
</template>
<script type="text/javascript">
  import {machineList,updateMachine,getMachine} from "../server/getData.js";
  export default {
    data (){
      return {
        type:"2",
        serverId:'',
        lessPrice:'',
        doll_id:'',
        doll_status:'0',
        online:'0',
        order:'',
        options: [ {
          value: '4',
          label: '4'
        }, {
          value: '5',
          label: '5'
        }, {
          value: '6',
          label: '6'
        },{
          value: '7',
          label: '7'
        },{
          value: '8',
          label: '8'
        },{
          value: '9',
          label: '9'
        },{
          value: '10',
          label: '10'
        }],
        discount:''
      }
    },
    mounted(){
      if(this.$route.params.editMachine){
        getMachine({id:this.$route.params.editMachine}).then(res=>{
            if(res['st'] == 1) {
                this.doll_id = res['data']['info']['doll_id']+'';
                this.online = res['data']['info']['online']+'';
                this.serverId = res['data']['info']['serverId']+'';
                this.doll_status = res['data']['info']['doll_status']+'';
                this.discount = res['data']['info']['discount'];
                this.order = res['data']['info']['order'];
            }else if(res['st'] == -2){
              this.$alert("请重新登陆", "登陆出错", {
                confirmButtonText: "确定",
                type: "warning",
                center: true,
                callback: action => {
                  this.$router.push('/login');
                }
              });
            }else{
              this.$message.error('拉取娃娃机信息出错');
            }
        }).catch(err=>{
          this.$message.error('拉取娃娃机信息出错');
        })
      }
    },
    methods:{
      submitClass(){
        if(this.doll_id==''){
          this.$alert("娃娃ID不能为空！", "创建娃娃机列表失败", {
            confirmButtonText: "确定",
            type: "warning",
            center: true,
            callback: (action) => {
            }
          });
          return;
        }
        if(this.serverId==''){
          this.$alert("serverId不能为空！", "创建娃娃机列表失败", {
            confirmButtonText: "确定",
            type: "warning",
            center: true,
            callback: (action) => {
            }
          });
          return;
        }
        if(this.order==''){
          this.$alert("娃娃机排序不能为空！", "创建娃娃机列表失败", {
            confirmButtonText: "确定",
            type: "warning",
            center: true,
            callback: (action) => {
            }
          });
          return;
        }
        updateMachine({
          doll_id:this.doll_id,
          online:this.online,
          serverId:this.serverId,
          doll_status:this.doll_status,
          discount:this.discount,
          order:this.order
        }).then(res=>{
          if(res['st'] == 1){
            this.$confirm('是否要去娃娃机列表中查看', '修改娃娃机成功', {
              confirmButtonText: '确定',
              cancelButtonText: '取消',
              center: true
            }).then(() => {
              //跳娃娃机列表页
              this.$router.push('/content/machineList');
            }).catch(() => {
              this.$message.error('修改娃娃机失败');
            });
          }else if(res['st'] == 2){
            this.$message.error('该娃娃机id已存在！请重新填！');
          } else if(res['st'] == -2){
            this.$alert("请重新登陆", "登陆出错", {
              confirmButtonText: "确定",
              type: "warning",
              center: true,
              callback: action => {
                this.$router.push('/login');
              }
            });
          }else{
            this.$message.error('修改娃娃机失败');
          }
        }).catch(err=>{
          this.$message.error('修改娃娃机失败');
        })
      }
    }
  }
</script>
<style lang='scss'>
  .deitmachineContent{
    width:80%;
    margin:0 auto;
    padding-bottom: 10px;
    /* 浮动及清除浮动 */
    .fl{ float: left;}
    .fr{ float: right; }
    .cb{ clear:both; line-height: 0; }
    .clearfix:after{ content: ""; height: 0; display:block; visibility: hidden; clear: both; }
    .clearfix:after{*zoom:1;}
    h2{
      text-align:center;
      padding:20px;
    }
    div{
      width:80%;
      margin-top:15px;
    }
    .machineId{
      margin-left:15px;
    }
    .submit_Btn{
      margin-top:30px;
    }
    .submit_Btn{
      width:100%;
      text-align:center;
    }
    .lessPrice{
      /*line-height:30px;*/
    }
  }
</style>
