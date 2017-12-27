<template>
    <div class="machineListBox">
      <h2>娃娃机列表管理</h2>
      <h3>注：如果需要排序，请在排序输入框中输入需要排序的数字，然后点击右边操作框中的提交按钮即可完成排序。</h3>
      <el-table :data="tableData" :border='true'  style="width:100%;padding:20px;">
        <el-table-column prop="serverId" label="serverId"   :resizable='true'  align="center">
        </el-table-column>
        <el-table-column prop="doll_id" label="娃娃ID" :resizable='true'  align="center">
        </el-table-column>
        <el-table-column prop="doll_id" label="娃娃图片"   align="center">
          <template slot-scope="scope">
            <img :src="scope.row.img_id" alt="">
          </template>
        </el-table-column>
        <el-table-column  prop="online" label="娃娃机状态" :resizable='true' align="center">
          <template slot-scope="scope" >
            <p v-if="scope.row.online==0"  style="color:red; font-weight:bold;font-size:16px;">{{scope.row.online|online}}</p>
            <p v-if="scope.row.online==1" style="color:blue; font-weight:bold;font-size:16px;">{{scope.row.online|online}}</p>
          </template>
        </el-table-column>
        <el-table-column prop="doll_status" label="商品定义"  :resizable='true' align="center">
          <template slot-scope="scope">
            <p>{{scope.row.doll_status|doll_status}}</p>
          </template>
        </el-table-column>
        <el-table-column prop="order" label="排序"  :resizable='true' align="center">
          <template slot-scope="scope">
            <el-input v-model=" scope.row.order" placeholder="请输入数字进行排序"></el-input>
          </template>
        </el-table-column>
        <el-table-column  prop="id" label="操作"   :resizable='true' width="250px" align="center" show-overflow-tooltip>
          <template slot-scope="scope">
            <el-button type="primary" size="small" @click="edit(scope.row.id)"> <i class="el-icon-edit">
            </i></el-button>
            <el-button type="danger" size="small"  @click="delet(scope.row.id,scope.$index)"><i class="el-icon-delete">
            </i></el-button>
            <el-button type="primary" size="small"  @click="onSubmit(scope.row.id,scope.row.order)">提交
            </el-button>
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
</template>
<script type="text/javascript">
  import {machineList,deleteMachine,machineOrder} from "../server/getData.js";
    export default {
        data (){
            return {
              state:'',
              tableData:[],
              total:1,
              page_num:1,
              pageSize:10,
              changeBg:false
            }
        },
      filters:{
        online:function (index) {
            if(index == 0){
                return '下线'
            }
            return '上线' ;
        },
        doll_status:function(index){
          if(index == 0){
            return '无'
          }else if (index == 1){
            return '新品'
          }else {
            return '限时特价'
          }
        }
      },

      mounted(){
        this.initData();
      },
      methods:{
        initData(){
          machineList({page_num:this.page_num,page_size:this.pageSize}).then(res =>{
            if(res["st"] == '1'){
              this.tableData = res['data']['list'];
              this.total=res['data']['total']
              for(var i in this.tableData){
                this.tableData[i]['img_id'] = './static/img_id/'+this.tableData[i]['doll_id']+'.jpg'
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
            this.$message.error('获取娃娃机列表出错');
          })
        },
        edit(id){
          this.$router.push('/content/editMachine/'+id);
        },
        delet(id,index){
          //删除娃娃列表
          this.$confirm('是否要删除这个娃娃机','删除后无法恢复！', '删除娃娃机列表中的一项', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            center:true
          }).then(() => {
              deleteMachine({id:id}).then(res=>{
                  if(res['st'] == '1'){
                    this.tableData.splice(index,1);
                  }else if(res['st'] == -2){
                    this.$alert("请重新登陆", "登陆出错", {
                      confirmButtonText: "确定",
                      type: "warning",
                      center: true,
                      callback: action => {
                        this.$router.push('/login');
                      }
                    });
                  }else {
                    this.$message.error('删除娃娃机列表出错');
                  }
              })
          }).catch(() => {
            this.$message.success('取消成功！');
          });
        },
        onSubmit(id,order){
          if(this.order==''){
            this.$alert("排序不能为空！", "排序提交失败", {
              confirmButtonText: "确定",
              type: "warning",
              center: true,
              callback: (action) => {
              }
            });
            return;
          }
          machineOrder({id:id,order:order}).then(res =>{
                if(res['st'] == '1'){
                    this.$message.success('提交成功！');
                    this.initData();
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

          }).catch(error => {
            this.$alert("用户未登录", "提交失败", {
              confirmButtonText: "确定",
              type: "warning",
              center: true,
            })
          })
        },
        handleCurrentChange(index){
          machineList({page_num:index,page_size:this.pageSize}).then(res =>{
            if(res["st"] == '1'){
              this.tableData = res['data']['list'];
              for(var i in this.tableData){
                this.tableData[i]['img_id'] = './static/img_id/'+this.tableData[i]['doll_id']+'.jpg'
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
            this.$message.error('获取娃娃机列表出错');
          })
        }
      }
    }
</script>
<style lang='scss'>
.machineListBox{
  width:100%;
  /*padding:10px;*/
  margin:0 auto;
  h2{
    text-align:center;
    padding:10px;
  }
  h3{
    font-size:16px;
    text-align:center;
    color:blue;
    margin:10px;
  }
  .el-table  tr th{
    background-color:lightskyblue;
    color:#000;
  }
  .el-table  tr td{
    height: 20px;
    line-height:20px;

  }
  .el-table tr td img {
    width: 30%;
  }
  .changeBg{
    background:limegreen;
  }
}

</style>
