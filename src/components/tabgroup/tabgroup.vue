<template>
  <div class="groupbox">
    <el-radio-group v-model="radio"
                    v-for="(item ,index) in testgroup"
                    :key="index"
                    fill='#242636'
                    size="mini"
                    @change="changegroup(item,index)">
      <el-radio-button :label=item>{{item}}</el-radio-button>
    </el-radio-group>
  </div>
</template>
<script>
export default {
  name: 'cloudTabgroup',
  data () {
    return {
      radio: '',
    }
  },
  props: {
    testgroup: {
      type: Array,
    }
  },
  mounted () {
    this.radio = this.testgroup[0]
  },
  methods: {
    changegroup (item, index) {
      let obj = {
        item,
        index
      }
      this.$emit('group-change', obj)
    }
  },

}
</script>
<style lang="scss" scoped>
/deep/.el-radio-button__inner {
  padding: 6px 15px;
  border-radius: 0px 0px 0px 0px !important;
  border: 1px solid #242635;
  box-shadow: -1px 0 0 0 #242635;
}
.el-radio-group:first-child {
  /deep/.el-radio-button__inner {
    border-radius: 3px 0px 0px 3px !important;
    border-left: 1px solid #242635;
  }
}
.el-radio-group:last-child {
  /deep/.el-radio-button__inner {
    border-radius: 0px 3px 3px 0px !important;
  }
}
/deep/ .el-radio-button__inner:hover {
  background: rgba(255, 255, 255, 0.2);
  color: rgba(0, 0, 0, 1);
}
/deep/ .el-radio-button__orig-radio:checked + .el-radio-button__inner {
  background: #242635;
  color: white;
}
</style> 