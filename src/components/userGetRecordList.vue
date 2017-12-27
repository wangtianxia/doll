<template>
  <div class="userPayRecord">
    <div class="showDiv">
      <h2>用户抓取记录</h2>
      <div class="clearfix" style="width:100%;line-height:30px;margin:30px;">
        <span class="fl" style="width:150px;line-height:30px;display:inline-block;">请输入用户ID：</span>
        <el-input class="InputId fl"  v-model="user_id" placeholder="请输入用户ID" @keyup.enter.native="submitClass"></el-input>
      </div>
      <div class="submit_Btn" @click="submitClass">
        <el-button type="primary"  style="width:200px;height:50px;margin-top:10px;">提交</el-button>
      </div>
    </div>

    <div class="userGetRecordList">
      <el-table :data="tableData" :border='true'>
        <el-table-column prop="user_id" label="用户ID"  :resizable='true' align="center">
        </el-table-column>
        <el-table-column prop="machine_id" label="娃娃机ID"  :resizable='true' align="center">
        </el-table-column>
        <el-table-column prop="doll_id" label="娃娃ID"  :resizable='true' align="center">
        </el-table-column>
        <el-table-column prop="count" label="娃娃数量"  :resizable='true' align="center">
        </el-table-column>
        <el-table-column prop="timer" label="抓取时间"  :resizable='true' align="center">
        </el-table-column>
        <el-table-column prop="strength" label="抓力"  :resizable='true' align="center">
        </el-table-column>
        <el-table-column prop="status" label="抓获状态"  :resizable='true' align="center">
        </el-table-column>
      </el-table>
      <div v-if="tableData.length>0">
        <el-pagination style='text-align: center;margin-top: 30px;margin-bottom: 30px;'
                       @current-change="handleCurrentChange"
                       layout="prev, pager, next"
                       :total="total" :page-size="pageSize">'
        </el-pagination>
      </div>
    </div>
  </div>
</template>
<script type="text/javascript">
  import {userDollLog} from "../server/getData.js";
  export default {
    data (){
      return {
        user_id:'',
        tableData:[],
        machine_id:'',
        doll_id:'',
        count:0,
        timer:'',
        status:'',
        total:0,
        pageSize:10,
        page_num:1,
        strength:''

      }
    },
    methods:{
      submitClass(){
        if(this.user_id==''){
          this.$alert("用户ID不能为空！", "查询用户抓取列表失败", {
            confirmButtonText: "确定",
            type: "warning",
            center: true,
            callback: (action) => {
            }
          });
          return;
        }
        userDollLog({user_id:this.user_id, page_num:this.page_num, page_size:this.pageSize}).then(res =>{
          if(res['st'] == '1'){
            if(res['data']['list']==''){
              console.log(res['data']['list'],'--')
              this.$message.error('暂时没有该用户抓取记录！');
            }
            this.tableData = res['data']['list'];
            for(var i in this.tableData){
                if(this.tableData[i]['count']>0){
                    if(this.tableData[i]['status'] == 0){
                      this.tableData[i]['status'] = '寄存'
                    }else if(this.tableData[i]['status'] == 1){
                      this.tableData[i]['status'] = '打包'
                    }else if(this.tableData[i]['status'] == 2){
                      this.tableData[i]['status'] = '已发货'
                    }else if(this.tableData[i]['status'] == 3){
                      this.tableData[i]['status'] = '已兑币'
                    }
                }else {
                  this.tableData[i]['status'] = '';
                }
            }
            this.total = res['data']['total'];
            console.log(res['data']['total'])
          }else if(res['st'] == -2){
            this.$alert("请重新登陆", "登陆出错", {
              confirmButtonText: "确定",
              type: "warning",
              center: true,
              callback: action => {
                this.$router.push('/login');
              }
            });
          }
        }).catch(error =>{
          this.$message.error('获取列表失败');
        })
      },
      handleCurrentChange(index){
        userDollLog({user_id:this.user_id, page_num:index, page_size:this.pageSize}).then(res =>{
          if(res['st'] == '1'){
            this.tableData=[];
            this.tableData = res['data']['list'];
            for(var i in this.tableData){
              if(this.tableData[i]['count']>0){
                if(this.tableData[i]['status'] == 0){
                  this.tableData[i]['status'] = '寄存'
                }else if(this.tableData[i]['status'] == 1){
                  this.tableData[i]['status'] = '打包'
                }else if(this.tableData[i]['status'] == 2){
                  this.tableData[i]['status'] = '已发货'
                }else if(this.tableData[i]['status'] == 3){
                  this.tableData[i]['status'] = '已兑币'
                }
              }else {
                this.tableData[i]['status'] = '';
              }
            }
            if(res['data']['list']==''){
              this.$message.error('暂时没有该用户抓取记录！');
            }
          }else if(res['st'] == -2){
            this.$alert("请重新登陆", "登陆出错", {
              confirmButtonText: "确定",
              type: "warning",
              center: true,
              callback: action => {
                this.$router.push('/login');
              }
            });
          }
        }).catch(error =>{
          this.$message.error('获取列表失败');
        })
      },
    },

  }
</script>
<style lang='scss'>
  .userPayRecord {
    /* 浮动及清除浮动 */
    .fl{ float: left;}
    .fr{ float: right; }
    .cb{ clear:both; line-height: 0; }
    .clearfix:after{ content: ""; height: 0; display:block; visibility: hidden; clear: both; }
    .clearfix:after{*zoom:1;}
    width:80%;
    margin:0 auto;
    padding-bottom: 10px;
    h2 {
      text-align: center;
      padding: 10px;
    }
    .showDiv{
      margin-top:30px;
      width: 100%;
    }
    input {
      width:80%;
    }
    .userGetRecordList {
      width: 100%;
    }
    .userGetRecordList h2 {
      text-align: center;
    }
    .userGetRecordList div{
      width:100%;
    }
    .el-table tr th {
      width: 100%;
      line-height: 30px;
      background-color: lightskyblue;
      color: #000;
    }
    .el-table tr td {
      width: 100%;
      line-height: 30px;
    }
    .submit_Btn{
      margin-bottom:30px;
      width:100%;
      text-align:center;
    }
    .InputId{
      width:80%;
      display:inline-block;
    }
  }

</style>
