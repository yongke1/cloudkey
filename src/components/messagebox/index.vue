<template>
  <div>
    <el-dialog :width="width"
               :title='titlecontent'
               :visible.sync="visible"
               :append-to-body='true'
               :before-close="closeDialogtest"
               :close-on-click-modal='false'
               :close-on-press-escape='false'
               :custom-class="titlecontent===''?'border-none':''">
      <a v-if="isShowTarget"
         href="http://10.32.138.11:2222/ssh/host/10.32.138.245?port=22&ur=admin&pwd=fs.com123456"
         target="_blank"></a>
      <slot></slot>
      <slot name="footer"
            v-if="isShowBtn">
        <span class="dialog-footer">
          <el-button @click="cellsumbit">{{cellbtntext}}</el-button>
          <el-button type="primary"
                     @click="sumbit">{{sumbtntext}}</el-button>
        </span>
      </slot>
    </el-dialog>
  </div>
</template>
<script>
export default {
  name: 'cloudMessageBox',
  props: {
    width: {
      type: String,
      default: "50%"
    },
    customClass: {
      type: String,
      default: ""
    },
    visible: {          //控制显隐状态
      type: Boolean,
      default: false
    },
    titlecontent: {     //标题文字
      type: String
    },
    cellbtntext: {      //取消按钮文字
      type: String
    },
    sumbtntext: {       //确定按钮文字
      type: String
    },
    isShowBtn: {
      type: Boolean,
      default: true
    },
    isShowTarget: {//
      type: Boolean,
      default: false
    }
  },
  data () {
    return {

    }
  },
  methods: {
    closeDialogtest () {
      this.$emit('update:visible', false);
    },
    cellsumbit () {
      this.$emit('update:visible', false);
      console.log('取消')
    },
    sumbit () {
      this.$emit('confirm');        //暴露一个方法出去
      console.log('确定')
    },
  },
}
</script>
<style lang="scss" scoped>
.dialog-footer {
  display: flex;
  justify-content: flex-end;
  padding: 20px 0;
}
.el-dialog__body {
  padding: 20px 20px 0 20px;
}
/deep/.el-dialog__header {
  padding: 20px 19px 20px;
  // box-shadow: 0px -1px 0px 0px rgba(164, 167, 181, 1);
  border-radius: 3px;
  border-bottom: 1px solid rgba(164, 167, 181, 0.2);
  a {
    font-size: 14px;
    line-height: 18px;
    text-align: center;
    color: #333333;
    display: flex;
    align-items: center;
  }
}
/deep/.el-dialog__body {
  a {
    content: "";
    position: absolute;
    right: 8%;
    width: 14px;
    height: 14px;
    right: 7%;
    top: 2.6%;
    background: url("~@assets/img/bg_icon.png") no-repeat -245px -166px;
    cursor: pointer;
  }
  a:hover {
    background: url("~@assets/img/bg_icon.png") no-repeat -279px -166px;
  }
}
.border-none {
  .el-dialog__header {
    border-bottom: 0px;
  }
}
</style>