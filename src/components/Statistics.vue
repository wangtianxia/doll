<template>
  <div class="staticlistContent">
    <h2>统计列表</h2>
    <div class="topBox clearfix">
      <div class="online_num fl">
        当前在线人数：<span>{{online_num}}</span>
      </div>
      <div class="online_num fl">
        当天支付总金额：<span>{{total_payment_now}}</span>
      </div>
    </div>
    <div style="width:100%;margin-top:20px;">
      <el-tabs v-model="activeShow1" type="border-card" @tab-click="handleClick">
        <el-tab-pane label="粉丝团" name="first">
              <el-table :data="fstTable" :border='true' style="margin-bottom:30px;">
                <el-table-column prop="date" label="时间"  :resizable='true' width="110" align="center">
                </el-table-column>
                <el-table-column prop="new_user" label="新用户数量"  :resizable='true'  width="100" align="center">
                </el-table-column>
                <el-table-column prop="uv" label="日活" :resizable='true'   width="100" align="center">
                </el-table-column>
                <el-table-column prop="next_remain" label="次留" :resizable='true'  width="100" align="center">
                </el-table-column>
                <el-table-column prop="grab_user_num" label="抓取人数"  :resizable='true'  width="100" align="center">
                </el-table-column>
                <el-table-column prop="grab_times" label="抓取次数"  :resizable='true'  width="100" align="center">
                </el-table-column>
                <el-table-column prop="catch_times" label="抓到次数"  :resizable='true'  width="100" align="center">
                </el-table-column>
                <el-table-column prop="strength_0" label="0 抓力"  :resizable='true'  width="100" align="center">
                </el-table-column>
                <el-table-column prop="strength_1" label="1 抓力"  :resizable='true'  width="100" align="center">
                </el-table-column>
                <el-table-column prop="strength_2" label="2 抓力"  :resizable='true'  width="100" align="center">
                </el-table-column>
                <!--新增 start-- 1.金币赠送数量2.金币消耗数3.抓取人数4.单邮次数 5.包邮次数-->
                <el-table-column prop="gold_give_away" label="金币赠送数"  :resizable='true'  width="100" align="center">
                </el-table-column>
                <el-table-column prop="gold_spend" label="金币消耗数"  :resizable='true'  width="100" align="center">
                </el-table-column>
                <el-table-column prop="paid_num" label="充值人数"  :resizable='true'  width="100" align="center">
                </el-table-column>
                <el-table-column prop="total_payment" label="充值金额"  :resizable='true'  width="100" align="center">
                </el-table-column>
                <el-table-column prop="mail_single" label="单邮次数"  :resizable='true'  width="80" align="center">
                </el-table-column>
                <el-table-column prop="mail_multi" label="包邮次数"  :resizable='true'  width="80" align="center">
                </el-table-column>
                <!--新增 end-->
                <el-table-column prop="mail_total_payment" label="邮寄金额"  :resizable='true'  width="100" align="center">
                </el-table-column>
              </el-table>
              <div v-if="fstTable.length>0">
                <el-pagination style='text-align: center;margin-top: 30px;margin-bottom: 30px;'
                               @current-change="handleCurrentChange1"
                               layout="prev, pager, next"
                               :total="total1" :page-size="pageSize1">'
                </el-pagination>
              </div>
        </el-tab-pane>
        <el-tab-pane label="吃货群内" name="second">
          <el-table :data="CHTable" :border='true' style="margin-bottom:30px;">
            <el-table-column prop="date" label="时间"  :resizable='true' width="110" align="center">
            </el-table-column>
            <el-table-column prop="new_user" label="新用户数量"  :resizable='true'  width="100" align="center">
            </el-table-column>
            <el-table-column prop="uv" label="日活" :resizable='true'   width="100" align="center">
            </el-table-column>
            <el-table-column prop="next_remain" label="次留" :resizable='true'  width="100" align="center">
            </el-table-column>
            <el-table-column prop="grab_user_num" label="抓取人数"  :resizable='true'  width="100" align="center">
            </el-table-column>
            <el-table-column prop="grab_times" label="抓取次数"  :resizable='true'  width="100" align="center">
            </el-table-column>
            <el-table-column prop="catch_times" label="抓到次数"  :resizable='true'  width="100" align="center">
            </el-table-column>
            <el-table-column prop="strength_0" label="0 抓力"  :resizable='true'  width="100" align="center">
            </el-table-column>
            <el-table-column prop="strength_1" label="1 抓力"  :resizable='true'  width="100" align="center">
            </el-table-column>
            <el-table-column prop="strength_2" label="2 抓力"  :resizable='true'  width="100" align="center">
            </el-table-column>
            <!--新增 start-- 1.金币赠送数量2.金币消耗数3.抓取人数4.单邮次数 5.包邮次数-->
            <el-table-column prop="gold_give_away" label="金币赠送数"  :resizable='true'  width="100" align="center">
            </el-table-column>
            <el-table-column prop="gold_spend" label="金币消耗数"  :resizable='true'  width="100" align="center">
            </el-table-column>
            <el-table-column prop="paid_num" label="充值人数"  :resizable='true'  width="100" align="center">
            </el-table-column>
            <el-table-column prop="total_payment" label="充值金额"  :resizable='true'  width="100" align="center">
            </el-table-column>
            <el-table-column prop="mail_single" label="单邮次数"  :resizable='true'  width="80" align="center">
            </el-table-column>
            <el-table-column prop="mail_multi" label="包邮次数"  :resizable='true'  width="80" align="center">
            </el-table-column>
            <!--新增 end-->
            <el-table-column prop="mail_total_payment" label="邮寄金额"  :resizable='true'  width="100" align="center">
            </el-table-column>
          </el-table>
          <div v-if="CHTable.length>0">
            <el-pagination style='text-align: center;margin-top: 30px;margin-bottom: 30px;'
                           @current-change="handleCurrentChange2"
                           layout="prev, pager, next"
                           :total="total2" :page-size="pageSize2">'
            </el-pagination>
          </div>
        </el-tab-pane>
        <el-tab-pane label="QQ默认" name="third">
          <el-table :data="QQTable" :border='true' style="margin-bottom:30px;">
            <el-table-column prop="date" label="时间"  :resizable='true' width="110" align="center">
            </el-table-column>
            <el-table-column prop="new_user" label="新用户数量"  :resizable='true'  width="100" align="center">
            </el-table-column>
            <el-table-column prop="uv" label="日活" :resizable='true'   width="100" align="center">
            </el-table-column>
            <el-table-column prop="next_remain" label="次留" :resizable='true'  width="100" align="center">
            </el-table-column>
            <el-table-column prop="grab_user_num" label="抓取人数"  :resizable='true'  width="100" align="center">
            </el-table-column>
            <el-table-column prop="grab_times" label="抓取次数"  :resizable='true'  width="100" align="center">
            </el-table-column>
            <el-table-column prop="catch_times" label="抓到次数"  :resizable='true'  width="100" align="center">
            </el-table-column>
            <el-table-column prop="strength_0" label="0 抓力"  :resizable='true'  width="100" align="center">
            </el-table-column>
            <el-table-column prop="strength_1" label="1 抓力"  :resizable='true'  width="100" align="center">
            </el-table-column>
            <el-table-column prop="strength_2" label="2 抓力"  :resizable='true'  width="100" align="center">
            </el-table-column>
            <!--新增 start-- 1.金币赠送数量2.金币消耗数3.抓取人数4.单邮次数 5.包邮次数-->
            <el-table-column prop="gold_give_away" label="金币赠送数"  :resizable='true'  width="100" align="center">
            </el-table-column>
            <el-table-column prop="gold_spend" label="金币消耗数"  :resizable='true'  width="100" align="center">
            </el-table-column>
            <el-table-column prop="paid_num" label="充值人数"  :resizable='true'  width="100" align="center">
            </el-table-column>
            <el-table-column prop="total_payment" label="充值金额"  :resizable='true'  width="100" align="center">
            </el-table-column>
            <el-table-column prop="mail_single" label="单邮次数"  :resizable='true'  width="80" align="center">
            </el-table-column>
            <el-table-column prop="mail_multi" label="包邮次数"  :resizable='true'  width="80" align="center">
            </el-table-column>
            <!--新增 end-->
            <el-table-column prop="mail_total_payment" label="邮寄金额"  :resizable='true'  width="100" align="center">
            </el-table-column>
          </el-table>
          <div v-if="QQTable.length>0">
            <el-pagination style='text-align: center;margin-top: 30px;margin-bottom: 30px;'
                           @current-change="handleCurrentChange3"
                           layout="prev, pager, next"
                           :total="total3" :page-size="pageSize3">'
            </el-pagination>
          </div>
        </el-tab-pane>
        <el-tab-pane label="微信默认" name="fourth">
          <el-table :data="WeiXinTable" :border='true' style="margin-bottom:30px;">
            <el-table-column prop="date" label="时间"  :resizable='true' width="110" align="center">
            </el-table-column>
            <el-table-column prop="new_user" label="新用户数量"  :resizable='true'  width="100" align="center">
            </el-table-column>
            <el-table-column prop="uv" label="日活" :resizable='true'   width="100" align="center">
            </el-table-column>
            <el-table-column prop="next_remain" label="次留" :resizable='true'  width="100" align="center">
            </el-table-column>
            <el-table-column prop="grab_user_num" label="抓取人数"  :resizable='true'  width="100" align="center">
            </el-table-column>
            <el-table-column prop="grab_times" label="抓取次数"  :resizable='true'  width="100" align="center">
            </el-table-column>
            <el-table-column prop="catch_times" label="抓到次数"  :resizable='true'  width="100" align="center">
            </el-table-column>
            <el-table-column prop="strength_0" label="0 抓力"  :resizable='true'  width="100" align="center">
            </el-table-column>
            <el-table-column prop="strength_1" label="1 抓力"  :resizable='true'  width="100" align="center">
            </el-table-column>
            <el-table-column prop="strength_2" label="2 抓力"  :resizable='true'  width="100" align="center">
            </el-table-column>
            <!--新增 start-- 1.金币赠送数量2.金币消耗数3.抓取人数4.单邮次数 5.包邮次数-->
            <el-table-column prop="gold_give_away" label="金币赠送数"  :resizable='true'  width="100" align="center">
            </el-table-column>
            <el-table-column prop="gold_spend" label="金币消耗数"  :resizable='true'  width="100" align="center">
            </el-table-column>
            <el-table-column prop="paid_num" label="充值人数"  :resizable='true'  width="100" align="center">
            </el-table-column>
            <el-table-column prop="total_payment" label="充值金额"  :resizable='true'  width="100" align="center">
            </el-table-column>
            <el-table-column prop="mail_single" label="单邮次数"  :resizable='true'  width="80" align="center">
            </el-table-column>
            <el-table-column prop="mail_multi" label="包邮次数"  :resizable='true'  width="80" align="center">
            </el-table-column>
            <!--新增 end-->
            <el-table-column prop="mail_total_payment" label="邮寄金额"  :resizable='true'  width="100" align="center">
            </el-table-column>
          </el-table>
          <div v-if="WeiXinTable.length>0">
            <el-pagination style='text-align: center;margin-top: 30px;margin-bottom: 30px;'
                           @current-change="handleCurrentChange4"
                           layout="prev, pager, next"
                           :total="total4" :page-size="pageSize4">'
            </el-pagination>
          </div>
        </el-tab-pane>
        <el-tab-pane label="默认" name="fifth">
          <el-table :data="MRTable" :border='true' style="margin-bottom:30px;">
            <el-table-column prop="date" label="时间"  :resizable='true' width="110" align="center">
            </el-table-column>
            <el-table-column prop="new_user" label="新用户数量"  :resizable='true'  width="100" align="center">
            </el-table-column>
            <el-table-column prop="uv" label="日活" :resizable='true'   width="100" align="center">
            </el-table-column>
            <el-table-column prop="next_remain" label="次留" :resizable='true'  width="100" align="center">
            </el-table-column>
            <el-table-column prop="grab_user_num" label="抓取人数"  :resizable='true'  width="100" align="center">
            </el-table-column>
            <el-table-column prop="grab_times" label="抓取次数"  :resizable='true'  width="100" align="center">
            </el-table-column>
            <el-table-column prop="catch_times" label="抓到次数"  :resizable='true'  width="100" align="center">
            </el-table-column>
            <el-table-column prop="strength_0" label="0 抓力"  :resizable='true'  width="100" align="center">
            </el-table-column>
            <el-table-column prop="strength_1" label="1 抓力"  :resizable='true'  width="100" align="center">
            </el-table-column>
            <el-table-column prop="strength_2" label="2 抓力"  :resizable='true'  width="100" align="center">
            </el-table-column>
            <!--新增 start-- 1.金币赠送数量2.金币消耗数3.抓取人数4.单邮次数 5.包邮次数-->
            <el-table-column prop="gold_give_away" label="金币赠送数"  :resizable='true'  width="100" align="center">
            </el-table-column>
            <el-table-column prop="gold_spend" label="金币消耗数"  :resizable='true'  width="100" align="center">
            </el-table-column>
            <el-table-column prop="paid_num" label="充值人数"  :resizable='true'  width="100" align="center">
            </el-table-column>
            <el-table-column prop="total_payment" label="充值金额"  :resizable='true'  width="100" align="center">
            </el-table-column>
            <el-table-column prop="mail_single" label="单邮次数"  :resizable='true'  width="80" align="center">
            </el-table-column>
            <el-table-column prop="mail_multi" label="包邮次数"  :resizable='true'  width="80" align="center">
            </el-table-column>
            <!--新增 end-->
            <el-table-column prop="mail_total_payment" label="邮寄金额"  :resizable='true'  width="100" align="center">
            </el-table-column>
          </el-table>
          <div v-if="MRTable.length>0">
            <el-pagination style='text-align: center;margin-top: 30px;margin-bottom: 30px;'
                           @current-change="handleCurrentChange5"
                           layout="prev, pager, next"
                           :total="total5" :page-size="pageSize5">'
            </el-pagination>
          </div>
        </el-tab-pane>
      </el-tabs>
    </div>
  </div>
</template>
<script type="text/javascript">
  import {statisticsList} from "../server/getData.js";
  export default {
    data (){
      return {
        fstTable:[],
        CHTable:[],
//        ZDTable:[],
        QQTable:[],
        WeiXinTable:[],
        MRTable:[],
        activeShow1:'first',

        date:'',
        new_user:'',
        uv:'',
        next_remain:'',
        grab_times:'',
        catch_times:'',
        paid_num:'',
        mail_total_payment:'',
        total_payment:'',
        //粉丝团
        total1:0,
        pageSize1:10,
        page_num1:1,
        //吃货
        total2:0,
        pageSize2:10,
        page_num2:1,
        //QQ
        total3:0,
        pageSize3:10,
        page_num3:1,
        //微信
        total4:0,
        pageSize4: 10,
        page_num4:1,
        //默认
        total5:0,
        pageSize5: 10,
        page_num5:1,

        online_num:'',
        strength_0:'',
        strength_1:'',
        strength_2:'',

        gold_give_away:'',
        gold_spend:'',
        grab_user_num:'',
        mail_single:'',
        mail_multi:'',
        total_payment_now:'',
        channel:2001
      }
    },
    mounted(){
      this.getTableData(2001)
    },
    methods: {
      getTableData(channel){
          this.channel=channel;
        statisticsList({page_num: this.page_num1, page_size: this.pageSize1,channel:channel}).then(res => {
          if (res['st'] == '1') {
              if(channel == '2000'){
                this.MRTable = res['data']['list'];
                this.total5 = res['data']['total'];
              }else if(channel == '2001'){
                this.fstTable = res['data']['list'];
                this.total1 = res['data']['total'];
              }else if(channel == '2002'){
                this.CHTable = res['data']['list'];
                this.total2 = res['data']['total'];
              }else if(channel == '2011'){
                this.QQTable = res['data']['list'];
                this.total3 = res['data']['total'];
              }else if(channel == '2012'){
                this.WeiXinTable = res['data']['list'];
                this.total4 = res['data']['total']
              }
            this.online_num = res['data']['online_num'];
            this.total_payment_now = res['data']['total_payment_now']
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
        }).catch(error=>{
          this.$message.error('获取列表失败');
        })
      },
      handleCurrentChange1(index){
        statisticsList({page_num: index, page_size: this.pageSize1,channel:this.channel}).then(res => {
          if (res['st'] == '1') {
            this.fstTable = res['data']['list'];
          } else if (res['st'] == -2) {
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
          this.$message.error('获取列表失败');
        })
      },
      handleCurrentChange2(index){
        statisticsList({page_num: index, page_size: this.pageSize2,channel:this.channel}).then(res => {
          if (res['st'] == '1') {
            this.CHTable = res['data']['list'];
          } else if (res['st'] == -2) {
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
          this.$message.error('获取列表失败');
        })
      },
      handleCurrentChange3(index){
        statisticsList({page_num: index, page_size: this.pageSize3,channel:this.channel}).then(res => {
          if (res['st'] == '1') {
            this.QQTable = res['data']['list'];
          } else if (res['st'] == -2) {
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
          this.$message.error('获取列表失败');
        })
      },
      handleCurrentChange4(index){
        statisticsList({page_num: index, page_size: this.pageSize4,channel:this.channel}).then(res => {
          if (res['st'] == '1') {
            this.WeiXinTable = res['data']['list'];
          } else if (res['st'] == -2) {
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
          this.$message.error('获取列表失败');
        })
      },
      handleCurrentChange5(index){
        statisticsList({page_num: index, page_size: this.pageSize5,channel:this.channel}).then(res => {
          if (res['st'] == '1') {
            this.MRTable = res['data']['list'];
          } else if (res['st'] == -2) {
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
          this.$message.error('获取列表失败');
        })
      },
      //点击列表
      handleClick(tab, event) {
          if(tab.index == 0){
            this.getTableData('2001')
          }
          if(tab.index == 1){
            this.getTableData('2002')
          }
          if(tab.index == 2){
            this.getTableData('2011')
          }
          if(tab.index == 3){
              this.getTableData('2012')
          }
          if(tab.index == 4){
            this.getTableData('2000')
          }
          console.log(tab.index);
        }
    }
  }
</script>
<style lang='scss'>
  .staticlistContent {
    /* 浮动及清除浮动 */
    .fl{ float: left;}
    .fr{ float: right; }
    .cb{ clear:both; line-height: 0; }
    .clearfix:after{ content: ""; height: 0; display:block; visibility: hidden; clear: both; }
    .clearfix:after{*zoom:1;} //因为IE6、IE7不兼容伪类after,所以用*zoom：1触发IE6/7的haslayout，以清除浮动。
    width: 100%;
    h2 {
      padding:20px;
      text-align: center;
    }

    .el-table tr th {
      height: 30px;
      background-color: lightskyblue;
      color: #000;
    }
    .el-table tr td {
      height: 30px;
    }
    .el-table tr td:nth-child(1){
      height: 30px;
      color:blue;
    }
    .online_num{
      padding: 0 20px 0 30px;
      font-size:18px;
      font-weight:bold;
    }
    .online_num span{
      display:inline-block;
      font-size:18px;
      color:blue;
      font-weight:bold;
    }
    .rightBox{
      margin-right:20px;
    }
   el-tab-pane{
     font-size:20px;
     color:#000;
   }
  }
</style>
