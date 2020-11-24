<template>
  <div class="datainfor">
    <!--头部-->
    <div class="dataheader">
      <div class="headerleft">
        <div class="headerone">
          Data Insight
        </div>
        <div class="haha">
          <el-select v-model="value"
                     placeholder="请选择">
            <el-option v-for="item in options"
                       :key="item.value"
                       :label="item.label"
                       :value="item.value">
            </el-option>

          </el-select>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  data () {
    return {
      options: [{
        value: '选项1',
        label: '黄金糕'
      }, {
        value: '选项2',
        label: '双皮奶'
      }, {
        value: '选项3',
        label: '蚵仔煎'
      }, {
        value: '选项4',
        label: '龙须面'
      }, {
        value: '选项5',
        label: '北京烤鸭'
      }],
      value: ''
    }
  }
}
</script>
<style lang="scss" scoped>
/deep/ .el-input__inner {
  border: none;
  width: 30px;
}

.datainfor {
  width: 100%;
  .dataheader {
    width: 100%;
    padding: 10px 10px 0 10px;
  }
}
</style>