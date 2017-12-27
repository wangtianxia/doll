<template>
  <div class="listContent">
    <h2>娃娃列表管理</h2>
    <el-table :data="tableData" :border='true' >
      <el-table-column  prop="id" label="娃娃ID"    align="center">
      </el-table-column>
      <el-table-column prop="name" label="娃娃名字"   align="center">
      </el-table-column>
      <el-table-column prop="id" label="娃娃图片"   align="center">
        <template slot-scope="scope">
          <img :src="scope.row.img_id" alt="">
        </template>
      </el-table-column>
      <el-table-column prop="price" label="抓取价格"    align="center">
      </el-table-column>
      <el-table-column prop="refund_price" label="回购价格"  align="center">
      </el-table-column>
      <el-table-column label="操作"  width="200"  align="center"  >
        <template slot-scope="scope">
          <el-button size="mini" @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
          <el-button size="mini" type="danger" @click="handleDelete(scope.$index, scope.row)">删除</el-button>
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
  import {dollList, deleteDoll} from "../server/getData.js";
  export default {
    data (){
      return {
        tableData: [],
        total: 0,
        pageSize: 10,
        page_num:1

      }
    },
    mounted(){
      dollList({page_num: this.page_num, page_size: this.pageSize}).then(res => {
        if (res['st'] == '1') {
          this.tableData = res['data']['list'];
          this.total = res['data']['total'];
          for(var i in this.tableData){
            this.tableData[i]['img_id'] = './static/img_id/'+this.tableData[i]['id']+'.jpg'
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
        }else{
          this.$message.error('获取娃娃列表失败');
        }
      })
    },
    methods: {
      //编辑娃娃列表
      handleEdit (index) {
        this.$router.push('/content/editDoll/' + this.tableData[index]['id']);
      },
      //删除娃娃列表
      handleDelete(index, e){
        this.$confirm('是否要删除这个娃娃', '删除后无法恢复！', '删除娃娃列表中的一项', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          center: true
        }).then(() => {
          deleteDoll({id: e.id}).then(res => {
            if (res['st'] == '1') {
              this.$message({
                type: 'success',
                message: '删除成功!'
              });
              this.tableData.splice(index, 1);
            } else {
              this.$message({
                type: 'info',
                message: '删除失败!'
              });
            }
          }).catch(err => {
            this.$message.error('删除娃娃列表出错！');
          })
        }).catch(() => {
          this.$message.success('取消成功！');
        });
      },
      handleCurrentChange(index){
        dollList({page_num: index, page_size: this.pageSize}).then(res => {
          if (res['st'] == '1') {
            this.tableData = res['data']['list'];
            for(var i in this.tableData){
              this.tableData[i]['img_id'] = './static/img_id/'+this.tableData[i]['id']+'.jpg'
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
        })

      }
    }
  }
</script>
<style lang='scss'>
  .listContent {
    width: 80%;
    margin:0 auto;
  }

  .listContent h2 {
    text-align: center;
    padding: 10px;
  }

  .el-table tr th {
    height: 20px;
    line-height:20px;
    background-color: lightskyblue;
    color: #000;
  }

  .el-table tr td {
    height: 20px;
    line-height:20px;
  }

  .el-table tr td img {
    width: 30%;
  }

</style>
