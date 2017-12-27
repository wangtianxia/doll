<template>
    <div class="login_content">
        <div class="login_bg">
            <div class="login_context">
                <div class="login_title">
                    H5抓娃娃管理后台
                </div>
                <div v-show="worimg" class="worming">*用户名或密码错误*</div>
                <div class="panel-body">
                    <div class="form-group">
                        <div class="field">
                            <span class="loging_id">账号:</span>
                            <input type="text" name="creditcard" id="userName" class="input input-big" placeholder="登录账号"
                                    data-validate="required:请填写账号" maxlength="24" autocomplete="OFF" v-model="userName" @keyup.enter="login">
                            <i class="el-icon-close resetWord" @click="resetUsreName"></i>
                        </div>
                    </div>
                    <div class="form-group">
                        <div class="field">
                            <span class="login_password">密码:</span>
                            <input type="password" id="passWord" class="input input-big" name="creditcard" placeholder="登录密码"
                                    maxlength="12" data-validate="required:请填写密码" autocomplete="OFF" v-model="passWord" @keyup.enter="login">
                            <i class="el-icon-close resetWord" @click="resetPassWord"></i>
                        </div>
                    </div>
                </div>
                <div id="submit" @click='login' >
                     <div id="submit_word" style="">登录</div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import md5 from "../config/md5";
import { login } from "../server/getData.js";
export default {
  data() {
    return {
      worimg: false,
      userName: "",
      passWord: ""
    };
  },
  methods: {
    login() {
      if (this.userName == "") {
        this.$alert("用户名不能为空！", "登陆出错", {
          confirmButtonText: "确定",
          type: "warning",
          center: true,
          callback: (action) => {}
        });
        return;
      }
      if (this.passWord == "") {
        this.$alert("密码不能为空！", "登陆出错", {
          confirmButtonText: "确定",
          type: "warning",
          center: true,
          callback: action => {}
        });
        return;
      }
      let password = md5.makeSign(this.passWord);
      login({username: this.userName,password: password})
        .then(res => {
          if(res['st']==1){
            this.$router.push('/content/creatDoll');
          }else if(res['st']==2){
            this.worimg = true;
          }else if(res['st']==3){
            this.worimg = true;
          }else if(res['st'] == -1){
            this.$alert("登陆出错", "登陆出错", {
              confirmButtonText: "确定",
              type: "warning",
              center: true,
              callback: action => {}
            });
          }else if(res['st'] == -2){
            this.$alert("请重新登陆", "登陆出错", {
              confirmButtonText: "确定",
              type: "warning",
              center: true,
              callback: action => {

              }
            });
          }else if(res == 0){
            this.$router.push('/bedRequest');
          }
        }).catch(err => {
        console.log(err);
      });
    },
    resetUsreName() {
      this.userName = "";
    },
    resetPassWord() {
      this.passWord = "";
    }
  }
};
</script>

<style lang='scss'scoped>
@import "../style/mixin.scss";
.test1 {
  color: $blue;
}
.login_content {
  width: 100%;
  height: 100%;
}
.worming{
  color:red;
  margin-left:300px;
}
.login_bg {
  width: 100%;
  height: 100%;
  background: url("../assets/bg.jpg")no-repeat;
  background-size: 100% 100%;
  display: -webkit-box;
  display: -ms-flexbox;
  display: flex;
  -webkit-box-align: center;
  -ms-flex-align: center;
  align-items: center;
  -webkit-box-pack: center;
  -ms-flex-pack: center;
  justify-content: center;
}
.login_context {
  width: 500px;
  background-color: white;
  border-radius: 10px;
}
.login_title {
  text-align: center;
  padding: 20px;
  font-size: 30px;
}
.field {
  padding: 5px;
  font-size: 20px;
  text-align: center;
}
input {
  padding: 5px;
  font-size: 20px;
}
#submit {
  text-align: center;
  padding: 40px;
}
#submit_word {
  width: 100px;
  height: 50px;
  text-align: center;
  background-color: #409eff;
  line-height: 50px;
  font-size: 20px;
  border-radius: 10px;
  display: inline-block;
  color: white;
}
</style>
