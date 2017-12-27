<template>
    <div class="getDollManageList">
        <h2>娃娃领取管理列表</h2>
        <!--<div v-if="tableData.length>0">-->
          <el-table :data="tableData" :border='true' style="padding:10px;">
            <el-table-column prop="id" label="订单号"  width="150" :resizable='true' align="center">
            </el-table-column>
            <el-table-column prop="user_id" label="用户ID"  width="100" :resizable='true' align="center">
            </el-table-column>
            <el-table-column prop="doll_ids" label="娃娃ID" width="100" :resizable='true' align="center">
            </el-table-column>
            <el-table-column prop="create_time" label="创建时间" width="180" :resizable='true' align="center">
            </el-table-column>
            <el-table-column prop="count" label="发货总数" width="80" :resizable='true' align="center">
            </el-table-column>
            <el-table-column prop="username" label="玩家姓名"  width="80" :resizable='true' align="center">
            </el-table-column>
            <el-table-column prop="phone_no" label="玩家手机"  width="100" :resizable='true' align="center">
            </el-table-column>
            <el-table-column prop="address" label="玩家地址" width="150" :resizable='true' align="center">
            </el-table-column>
            <el-table-column prop="ex_company" label="快递公司" width="150" :resizable='true' align="center">
              <template slot-scope="scope">
                <el-input v-model="scope.row.ex_company" placeholder="请输入快递公司" :disabled="scope.row.disable"></el-input>
              </template>
            </el-table-column>
            <el-table-column prop="ex_num" label="快递单号"  width="150" :resizable='true' align="center">
              <template slot-scope="scope">
                <el-input v-model="scope.row.ex_num" placeholder="请输入快递单号"  :disabled="scope.row.disable"></el-input>
              </template>
            </el-table-column>
            <el-table-column prop="status" width="150"  label="发货状态" :resizable='true' align="center">
              <template slot-scope="scope">
                <el-button v-if="scope.row.status == 0" size="mini" type="danger" icon="el-icon-warning"   @click="handleEdit(scope.$index, scope.row)">未发货</el-button>
                <el-button v-if="scope.row.status == 1" size="mini" type="primary" icon="el-icon-circle-check-outline" disabled>已发货</el-button>
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
    <!--</div>-->
</template>
<script type="text/javascript">
  import {mailList,send} from "../server/getData.js";
    export default {
        data (){
            return {
              doll_ids:[],
              ex_company:'',
              ex_num:'',
              status:'',
              tableData:[],
              total:0,
              pageSize:10,
              page_num:1
            }
        },
      mounted(){
        mailList({page_num:this.page_num,page_size:this.pageSize}).then(res => {
           if(res['st'] == '1'){
             this.tableData = res['data']['list'];
             this.total = res['data']['total'];
             for(var i in this.tableData){
                  this.tableData[i]['ex_company'] = this.tableData[i]['ex_company']?decodeURI(this.tableData[i]['ex_company']):'';
                  this.tableData[i]['ex_num'] = this.tableData[i]['ex_num']?this.tableData[i]['ex_num']:'';
                  if(this.tableData[i]['status'] == 1){
                    this.tableData[i]['disable'] = true;
                  }

             }
             for(let i=0;i<this.tableData.length;i++){
                 let tempArr= this.tableData[i]['doll_ids'];
                 for(let j in tempArr){
                     if(j == tempArr.length -1){
                       tempArr[j]=tempArr[j]
                     }else{
                       tempArr[j]=tempArr[j]+','
                     }

                 }
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

        })
      },
      methods:{
          //发货
        handleEdit(index,e){
          if(this.tableData[index]['ex_company']==''){
            this.$alert("填写快递公司不能为空！", "提交失败！", {
              confirmButtonText: "确定",
              type: "warning",
              center: true,
              callback: (action) => {

              }
            });
            return;
          }
          if(this.tableData[index]['ex_num']==''){
            this.$alert("填写快递单号不能为空！", "提交失败！", {
              confirmButtonText: "确定",
              type: "warning",
              center: true,
              callback: (action) => {

              }
            });
            return;
          }
          send({id:e.id,ex_company:encodeURI(e.ex_company),
                ex_num:e.ex_num
              }).then(res =>{
                 if(res['st'] == '1'){
                   this.$alert("确定提交", "提交成功", {
                     confirmButtonText: "确定",
                     type: "warning",
                     center: true,
                     callback: action => {
                     }
                   });
                   this.tableData[index]['status'] = 1;
                   this.tableData[index]['disable'] =true;
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
                   this.$message.error('提交失败');
                 }

          }).catch(error => {
            this.$alert("用户未登录", "提交失败", {
              confirmButtonText: "确定",
              type: "warning",
              center: true,
            })
         })
        },
        handleCurrentChange(index){
            console.log(index);
          mailList({page_num:index,page_size:this.pageSize}).then(res => {
            if(res['st'] == '1'){
              this.tableData = res['data']['list'];
              this.total = res['data']['total'];
              for(var i in this.tableData){
                this.tableData[i]['ex_company'] = this.tableData[i]['ex_company']?decodeURI(this.tableData[i]['ex_company']):'';
                this.tableData[i]['ex_num'] = this.tableData[i]['ex_num']?this.tableData[i]['ex_num']:'';
                if(this.tableData[i]['status'] == 1){
                  this.tableData[i]['disable'] = true;
                }
              }
              for(let i=0;i<this.tableData.length;i++){
                let tempArr= this.tableData[i]['doll_ids'];
                for(let j in tempArr){
                  if(j == tempArr.length -1){
                    tempArr[j]=tempArr[j]
                  }else{
                    tempArr[j]=tempArr[j]+','
                  }

                }
              }
            }
          }).catch(error =>{

          })
        }
       }
    }
</script>
<style lang='scss'>
.getDollManageList{
  width:100%;
  margin:0 auto;

}
.getDollManageList h2{
  text-align:center;
  padding: 20px;
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
