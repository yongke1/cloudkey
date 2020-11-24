<template>
  <div :class="[changewitch?'allboxs':'allboxb']">

    <div :class="[changesearch?'seraboxs' : 'seraboxbig']">
      <div class=" el-icon-search "
           @click="showinp()">
      </div>
    </div>
    <input type="text"
           :class="[changeinput?'inputbox' : 'inputboxnone']">
    <div :class="[closebtn?'closen':'closeb']">
      <div class="close el-icon-close"
           @click="closeinp()">
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: "showSearch",
  data () {
    return {
      changewitch: true,
      changesearch: true,
      changeinput: true,
      closebtn: true,
    }
  },
  methods: {
    showinp () {
      this.changesearch = false;
      this.changewitch = false;
      this.changeinput = false;
      this.closebtn = false;
    },
    closeinp () {
      this.changesearch = true;
      this.changewitch = true;
      this.changeinput = true;
      this.closebtn = true;
    }
  }
}
</script>
<style lang="scss" scoped>
.allboxs {
  float: right;
  position: relative;
  width: 16px;
  height: 30px;
  transition: all 0.3s;
  .test {
    width: 100px;
    height: 100px;
    background: red;
    position: relative;
  }
  .seraboxs {
    position: absolute;
    top: 7px;
    right: 9px;
    display: block;
    transition: all 0.3s;
  }

  .inputbox {
    width: 100%;
    padding-left: 30px;
    border: 1px solid #c2c4cd;
    border-radius: 3px;
    background-color: rgba(255, 255, 255, 0);
    height: 30px;
    font-size: 12px;
    outline: none;
    display: none;
    color: #666;
  }
  .closen {
    display: none;
    position: absolute;
    top: 7px;
    right: 9px;
    cursor: pointer;
  }
}
.allboxb {
  float: right;
  position: relative;
  width: 200px;
  height: 30px;
  transition: all 0.3s;
  .seraboxbig {
    position: absolute;
    top: 7px;
    right: 9px;
    display: block;
    transition: all 0.3s;
    left: 9px;
  }
  .inputboxnone {
    width: 100%;
    padding-left: 30px;
    border: 1px solid #c2c4cd;
    border-radius: 3px;
    background-color: rgba(255, 255, 255, 0);
    height: 30px;
    font-size: 12px;
    outline: none;
    display: block;
    color: #666;
  }
  .closeb {
    display: block;
    position: absolute;
    top: 7px;
    right: 9px;
    cursor: pointer;
  }
}
</style>