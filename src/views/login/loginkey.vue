<template>
  <div class="loginkey">
    <div class="loginp">
      <!-- <div class="hide"> -->
      <img class="hide"
           src="../../assets/img/login/form_bg.png">
      <!-- </div> -->
      <div class="logop">
        <img class="cloudp"
             src="../../assets/img/login/cloudlogo.png">
      </div>
      <div class="fs">
        <span>FS Cloud Platform</span>
      </div>
      <div class="tishi">
        <p>Manage your FS Cloud Platform</p>
      </div>
      <div class="Jumpleft">
        <div class="box1">
          <img src="~@/assets/img/login/rightarrow.png"
               alt="">
          <b>Manage</b>
        </div>
      </div>
    </div>
    <div class="logink">
      <img class="hide"
           src="~@assets/img/login/form_bg.png"
           alt="">
      <div class="logok">
        <img src="../../assets/img/login/cloudlogo2.png"
             alt="">
      </div>
      <div class="fsk">
        <span>FS Cloud Key
        </span>
      </div>
      <div class="tishik">
        Configer your FS Cloud Key
      </div>
      <div class="Jumpright">
        <div class="box2">
          <img src="~@/assets/img/login/rightarrow.png"
               alt="">
          <b>Configure</b>
        </div>
      </div>
    </div>
  </div>
</template>
<style lang="scss">
* {
  padding: 0;
  margin: 0;
  box-sizing: border-box;
}
html,
body {
  min-height: 300px;
}
.loginkey {
  width: 100vw;
  height: 100vh;
  background: url(../../assets/img/login/bg.png) no-repeat;
  background-size: cover;
  display: flex;
  .loginp {
    width: 50vw;
    height: 100vh;
    z-index: 999;
    position: relative;

    .hide {
      position: absolute;
      z-index: -1;
      width: 100%;
      height: 100%;
      display: none;
    }
    .logop {
      width: 126px;
      height: 126px;
      line-height: 126px;
      display: flex;
      background: #474c5e;
      border-radius: 20px;
      margin-top: 31%;
      margin-left: 43.4%;
      align-items: center;
      justify-content: center;
      // .cloudp {
      //   text-align: center;
      // }
    }
    .fs {
      height: 34px;
      display: flex;
      margin-top: 7%;
      font-size: 40px;
      font-family: SourceHanSansCN;
      font-weight: 800;
      color: #ffffff;
      justify-content: center;
    }
    .tishi {
      display: flex;
      margin-top: 2.5%;
      height: 17px;
      font-size: 18px;
      font-family: Arial;
      font-weight: 400;
      color: #ffffff;
      justify-content: center;
    }
    .Jumpleft {
      display: flex;
      justify-content: center;
      align-items: center;
      margin-top: 5.3%;
      // border: 1px solid #ffffff;
      border-radius: 3px;
      .box1 {
        width: 125px;
        height: 44px;
        border: 1px solid #ffffff;
        display: flex;
        border-radius: 3px;
        justify-content: center;
        align-items: center;
        img{
          transform: rotate(180deg); 
        }
        b {
          font-size: 16px;
          font-family: Arial;
          font-weight: 400;
          color: #ffffff;
        }
      }
    }
  }
  .loginp:hover .hide {
    z-index: -1;
    background: url("~@assets/img/login/form_bg.png") no-repeat;
    box-shadow: 1px 4px 13px 0px rgba(28, 28, 28, 0.4);
    display: block !important;
    // background-attachment: fixed;
  }
  .logink {
    width: 50vw;
    height: 100vh;
    z-index: 999;
    position: relative;
    .hide {
      position: absolute;
      z-index: -1;
      width: 100%;
      height: 100%;
      display: none;
    }

    .logok {
      width: 126px;
      height: 126px;
      line-height: 126px;
      display: flex;
      background: #474c5e;
      border-radius: 20px;
      margin-top: 31%;
      margin-left: 43.4%;
      align-items: center;
      justify-content: center;
    }
    .fsk {
      height: 34px;
      display: flex;
      margin-top: 7%;
      font-size: 40px;
      font-family: SourceHanSansCN;
      font-weight: 800;
      color: #ffffff;
      justify-content: center;
    }
    .tishik {
      display: flex;
      margin-top: 2.5%;
      height: 17px;
      font-size: 18px;
      font-family: Arial;
      font-weight: 400;
      color: #ffffff;
      justify-content: center;
    }
    .Jumpright {
      display: flex;
      justify-content: center;
      align-items: center;
      margin-top: 5.3%;
      // border: 1px solid #ffffff;
      border-radius: 3px;
      .box2 {
        width: 125px;
        height: 44px;
        border: 1px solid #ffffff;
        display: flex;
        border-radius: 3px;
        justify-content: center;
        align-items: center;
        img{
          transform: rotate(180deg); 
        }

        b {
          font-size: 16px;
          font-family: Arial;
          font-weight: 400;
          color: #ffffff;
        }
      }
    }
  }
  .logink:hover .hide {
    z-index: -1;
    background: url("~@assets/img/login/form_bg.png") no-repeat;
    box-shadow: 1px 4px 13px 0px rgba(28, 28, 28, 0.4);
    display: block !important;

    // width: 50vw;
    // height: 100vh;
    // background: url(~@assets/img/login/form_bg.png);
    display: block;
  }
  .logink:hover .logok {
    background: #1478fe;
  }
  .logink:hover .box2 {
    background: #1478fe;
    border: 1px solid #1478fe;
  }

  .loginp:hover .logop {
    background: #1478fe;
  }
  .loginp:hover .box1 {
    background: #1478fe;
    border: 1px solid #1478fe;
  }
}
</style>