<template>
  <div class="login">
    <div class="loginbox">
      <div class="loginform">
        <div class="logokey">
          <img src="~@assets/img/login/cloudlogo.png">
        </div>
        <div class="fs">
          FS Cloud Key
        </div>
        <div class="loginfs">
          <el-form :model="numberValidateForm"
                   ref="numberValidateForm"
                   class="demo-ruleForm">
            <label for="name"
                   class="usert">Username</label>
            <el-form-item class="user"
                          prop="user"
                          style="height:85px"
                          :rules="[]">
              <el-input type="text"
                        v-model="numberValidateForm.username"
                        autocomplete="off"
                        placeholder="Please input"></el-input>
            </el-form-item>
            <label for="password"
                   class="passt">Password</label>

            <el-form-item style="height:83px"
                          prop="pass"
                          :rules="[]">
              <el-input type="password"
                        v-model="numberValidateForm.password"
                        :class="numberValidateForm.password.length?'password-input':''"
                        autocomplete="off"
                        placeholder="Please input"></el-input>
            </el-form-item>

            <el-form-item>
              <el-button type="primary"
                         style="width:420px;height:50px;"
                         @click="submitForm('numberValidateForm')">登录</el-button>
            </el-form-item>
          </el-form>
        </div>
        <div class="back">
          <div class="to">
            <img src="~@/assets/img/login/rightarrow.png"
                 alt="">
            <span>back</span>
          </div>
        </div>
      </div>
    </div>
    <div class="footer">
      Copyright © 2020 by FS.COM All Rights Reserved.
    </div>
  </div>
</template>

<script>
export default {
  name: 'login',
  data () {
    return {
      numberValidateForm: {
        username: '',
        password: ''
      },
    };
  },
  methods: {
    submitForm (formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.$router.push({ name: "dashboard" })
        } else {
          console.log('error submit!!');
          return false;
        }
      });
    },
    resetForm (formName) {
      this.$refs[formName].resetFields();
    }
  }
}

</script>

<style lang="scss" >
//取消浏览器记住密码，自动填充的背景色
input:-webkit-autofill,
textarea:-webkit-autofill,
select:-webkit-autofill {
  -webkit-text-fill-color: #ededed !important;
  -webkit-boxshadow: 0 0 0px 1000px transparent inset !important;
  background-color: transparent;
  background-image: none;
  transition: background-color 50000s ease-in-out 0s; //背景色透明  生效时长  过渡效果  启用时延迟的时间
}
html,
body {
  min-height: 800px;
}
.login {
  width: 100vw;
  height: 100vh;
  min-height: 800px;

  background: url("~@assets/img/login/bg.png");
  background-position: 50% 50%;
  background-repeat: no-repeat;
  background-size: cover;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  position: relative;
  .loginbox {
    width: 630px;
    height: 644px;
    display: flex;
    justify-content: center;
    flex-flow: row wrap;
    position: relative;
    .loginform {
      width: 540px;
      height: 603px;
      background: url("~@assets/img/login/form_bg.png") no-repeat;
      border-radius: 3px;
      display: flex;
      flex-direction: column;
      align-items: center;
      align-self: flex-start;
      margin: 40px auto;
      .logokey {
        width: 126px;
        height: 126px;
        display: flex;
        justify-content: center;
        align-items: center;
        img {
          text-align: center;
        }
      }
      .fs {
        height: 37px;
        font-size: 36px;
        font-family: SourceHanSansCN;
        font-weight: 800;
        color: #ffffff;
        margin-bottom: 50px;
      }
      .loginfs {
        width: 420px;
        display: flex;
        justify-content: center;
        align-items: center;
        /deep/ .el-form .demo-ruleForm {
          display: flex;
          justify-content: center;
          align-items: center;
          font-size: 16px;
          font-family: Arial;
          font-weight: 400;
          color: #ffffff;
          opacity: 0.5;
          /deep/ .el-form-item .user {
            display: flex;
            justify-content: center;
            align-items: center;
            /deep/.el-form-item__content {
              height: 85px;
            }
          }
        }
        .usert {
          width: 74px;
          height: 12px;
          font-size: 16px;
          font-family: Arial;
          font-weight: 400;
          color: #ffffff;
          opacity: 0.5;
          justify-content: center;
        }
        .passt {
          width: 69px;
          height: 12px;
          font-size: 16px;
          font-family: Arial;
          font-weight: 400;
          color: #ffffff;
          opacity: 0.5;
          margin-top: 40px;
          display: block;
        }
        /deep/ .el-input__inner {
          height: 73px;
          padding-top: 40px;
          padding: 20px 0;
          line-height: 26px;
          width: 100%;
          background: transparent;
          outline: none;
          border: none;
          border-radius: 0;
          border-bottom: 1px solid rgba(255, 255, 255, 0.5);
          caret-color: #ffffff;
          color: #ffffff;
        }
        .password-input {
          input {
            font-size: 28px;
            letter-spacing: 10px;
          }
        }
        /deep/ .el-input__inner::-webkit-input-placeholder {
          color: #ffffff;
          opacity: 0.2;
          font-size: 18px;
        }
        /deep/ .el-button {
          width: 420px;
          height: 44px;
          border-radius: 3px;
          display: flex;
          justify-content: space-around;
          font-size: 16px;
          margin-top: 10px;
        }
      }
      /deep/ .el-input__inner:focus {
        border-bottom-color: #1477fe;
      }
    }
    .back {
      position: absolute;
      left: 45px;
      bottom: 0;
      width: 539px;
      height: 44px;
      display: flex;
      justify-content: center;
      align-items: center;
      // background: #000000;
      background-color: rgba(0, 0, 0, 0.08);
      align-self: flex-end;
      .to {
        display: flex;
        justify-content: center;
        color: #ffffff;
        // color: #ffffff;
        // opacity: 0.4;
        img {
          text-align: center;
          color: #ffffff;
          opacity: 0.4;
        }
        span {
          color: #ffffff;
          opacity: 0.4;
        }
      }
    }
  }
  .footer {
    position: absolute;
    text-align: center;
    bottom: 22px;
    width: 272px;
    height: 11px;
    font-size: 12px;
    font-family: Arial;
    font-weight: 400;
    color: #ffffff;
    line-height: 48px;
    opacity: 0.6;
    flex: 0 0 auto;
  }
}
</style>