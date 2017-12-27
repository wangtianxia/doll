<template>
  <div class="channelManageList">
    <h2>渠道管理列表</h2>
    <el-table :data="tableData" :border='true'>
      <el-table-column prop="channel"   label="渠道号" align="center">
      </el-table-column>
      <el-table-column prop="desc"  label="渠道名" align="center">
      </el-table-column>
      <el-table-column label="操作"  align="center">
        <template slot-scope="scope">
          <el-button size="mini" @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
          <!--<el-button size="mini" type="danger" @click="handleDelete(scope.$index, scope.row)">删除</el-button>-->
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
  import {channelList} from "../server/getData.js";
  export default {
    data (){
      return {
        tableData: [
          {
             channel:'2001',
             desc:'粉丝团'
          },
          {
             channel:'2002',
              desc:'吃货'
          },
          {
              channel:'2003',
               desc:'炸弹'
          },
          {
              channel:'2000',
              desc:'默认'
          },
        ],
        channel: '',
        desc: '',
        total:0,
        pageSize:1

      }
    },
    methods:{
      handleEdit(id){
        this.$router.push('/content/editChannel')
      },
      handleCurrentChange(){

      }
    }
  }
</script>
<style lang='scss'>
  .channelManageList {
    width: 80%;
    margin: 0 auto;
    padding-bottom: 10px;
    h2 {
      padding: 20px;
      text-align:center;
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

  }
</style>
