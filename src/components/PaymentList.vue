<template>
  <div class="userGetRecord">
    <div class="showDiv">
      <h2>用户支付记录查询</h2>
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
        <el-table-column prop="guid" label="用户ID"  :resizable='true' align="center">
        </el-table-column>
        <el-table-column prop="order_id" label="订单ID"  :resizable='true' align="center">
        </el-table-column>
        <el-table-column prop="platform_order_id" label="订单号"  :resizable='true' align="center">
        </el-table-column>
        <el-table-column prop="goods_id" label="商品ID" :resizable='true' align="center">
        </el-table-column>
        <el-table-column prop="platform" label="支付渠道" :resizable='true' align="center">
        </el-table-column>
        <el-table-column prop="cost" label="支付金额"  :resizable='true' align="center">
        </el-table-column>
        <el-table-column prop="create_time" label="创建时间" :resizable='true' align="center">
        </el-table-column>
        <el-table-column prop="status" label="支付状态"  :resizable='true' align="center">
          <template slot-scope="scope">
            <p>{{scope.row.status|status}}</p>
          </template>
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
  import {orderRecord} from "../server/getData.js";
  export default {
    data (){
      return {
        user_id:'',
        guid:'',
        order_id:'',
        platform_order_id:'',
        goods_id:'',
        platform:'',
        cost:'',
        create_time:'',
        status:'',
        total:0,
        showDiv:true,
        hideDiv:false,
        pageSize:10,
        page_num:1,
        tableData:[]
      }
    },
    filters:{
      //0:未支付, 1:支付成功, 2:支付失败"
      status:function (index) {
        if(index == 0){
          return '未支付'
        }else if (index == 1){
          return '支付成功'
        }else if(index == 2){
            return '支付失败'
        }
      }
    },
    mounted(){
        orderRecord({page_num:this.page_num, page_size:this.pageSize}).then(res =>{
          if(res['st'] == '1'){
            this.tableData=[];
            this.tableData = res['data']['list'];
            this.total = res['data']['total'];
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
    methods:{
      submitClass(){
          console.log('---');
        if(this.user_id==''){
          this.$alert("用户ID不能为空！", "用户支付记录表失败", {
            confirmButtonText: "确定",
            type: "warning",
            center: true,
            callback: (action) => {

            }
          });
          return;
        }
        orderRecord({user_id:this.user_id, page_num:this.page_num, page_size:this.pageSize}).then(res =>{
          if(res['st'] == '1'){
            if(res['data']['list']==''){
              this.$message.error('暂时没有该用户充值记录！');
            }
            this.tableData = res['data']['list'];
            this.total = res['data']['total'];
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
        orderRecord({user_id:this.user_id, page_num:index, page_size:this.pageSize}).then(res =>{
          if(res['st'] == '1'){
            this.tableData=[];
            this.tableData = res['data']['list'];
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
      }
    }

  }
</script>
<style lang='scss'>
  .userGetRecord {
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
      padding: 20px;
    }
    .showDiv{
      width: 80%;
    }
    .userGetRecordList {
      width: 100%;

    }
    .userGetRecordList h2 {
      text-align: center;
      /*padding: 10px;*/
    }
    .userGetRecordList div{
      width:100%;
    }
    .el-table tr th {
      width: 100%;
      background-color: lightskyblue;
      color: #000;
      font-size:14px;
      line-height:20px;
    }
    .el-table tr td {
      width: 100%;
      line-height:20px;
    }
    .submit_Btn{
      width:100%;
      text-align:center;
      margin-bottom:20px;
    }
    .InputId{
      width:80%;
      display:inline-block;
    }
  }

</style>
