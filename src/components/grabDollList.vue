<template>
    <div class="userGrabListBox">
      <h2>用户抓到记录表</h2>
      <el-table :data="tableData" :border='true'>
        <el-table-column prop="time" label="时间" :resizable='true'  align="center">
        </el-table-column>
        <el-table-column prop="user_id" label="用户ID"  :resizable='true'  align="center">
        </el-table-column>
        <el-table-column prop="machine_id" label="娃娃机ID"  :resizable='true'  align="center">
        </el-table-column>
        <el-table-column prop="doll_id" label="娃娃ID"  :resizable='true'  align="center">
        </el-table-column>
        <el-table-column prop="strength" label="抓力" :resizable='true'  align="center">
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
</template>
<script type="text/javascript">
  import {catchList} from "../server/getData.js";
    export default {
        data (){
            return {
              tableData:[],
              total:0,  //总的数目
              pageSize:10,
              page_num:1,
              time:'',
              user_id:'',
              machine_id:'',
              doll_id:'',
              strength:''
            }
        },
      mounted(){
        catchList({page_num:this.page_num,page_size:this.pageSize}).then(res => {
          if(res['st'] == '1'){
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

        })
      },
        methods:{
          handleCurrentChange(index){
            catchList({page_num:index,page_size:this.pageSize}).then(res => {
              if(res['st'] == '1'){
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

            })
          },
        }
    }
</script>
<style lang='scss'>
.userGrabListBox{
  width:80%;
  margin:0 auto;
}
.userGrabListBox h2{
  text-align:center;
  padding: 20px 0 20px 0;
}
.el-table  tr th{
  background-color:lightskyblue;
  color:#000;
}
.el-table  tr td{
  height: 20px;
  line-height:20px;
}
</style>
