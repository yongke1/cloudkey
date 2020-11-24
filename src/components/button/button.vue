<style lang="scss" scoped>
/deep/ .el-button {
  display: flex;
  align-content: center;
  height: 30px;
  border-radius: 3px;
  background: #fff;
  border: 1px solid #dcdfe6;
  color: rgba(69, 118, 228, 0.8);
  padding: 10px;
  span {
    font-size: 12px;
    font-weight: 400;
    font-family: Arial;
    // padding-left: 4px;
  }
}
/deep/ .el-button--primary.is-plain {
  background: rgba(69, 118, 228, 0.15);
  border-color: #b3d8ff;
  color: #4576e4;
}
/deep/ .el-button:hover {
  color: white;
  background: rgba(69, 118, 228, 1);
}
/deep/ .el-button--primary.is-plain.is-disabled:hover {
  background: rgba(69, 118, 228, 0.1);
}
</style>
<template>
  <div>
    <el-button :type="selType"
               :disabled="selDisabled"
               :class="iconName"
               @click="clickOn"
               :height="height"
               plain>{{btnText}}</el-button>
  </div>
</template>
<script>
export default {
  name: "cloud-button",
  computed: {

  },
  data () {
    return {

    }
  },
  props: {
    // 类型
    selType: {
      type: String,
      default: ''
    },
    //禁用
    selDisabled: {
      type: Boolean,
      default: false
    },
    //左侧图标
    iconName: {
      type: String,
      default: ''
    },
    //按钮文本
    btnText: {
      type: String,
      default: '请输入文本'
    },
    //高度控制
    height: {
      type: Number,
      defaul: "50%"
    }
  },
  mounted () {

  },
  methods: {
    clickOn () {
      this.$emit('click')
    }
  }
}
</script>