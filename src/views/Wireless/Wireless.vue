<style lang="scss" scoped>
.Wireless {
  width: 100%;
  .wirelessheader {
    width: 100%;
    // height: 50px;
    background: rgba(250, 250, 250, 1);
    border-bottom: 1px solid rgba(219, 219, 219, 1);
    .tomodify {
      justify-content: center;
      align-items: center;
      /deep/ .el-tabs__header {
        margin: 0 0 0;
        /deep/ .el-tabs__item {
          height: 50px;
          padding: 0px 30px;
          border: none;
        }
      }
    }
    .wirelessbtn {
      justify-content: flex-start;
      align-content: center;
    }
  }
}
</style>

<template>
  <div class="Wireless flex align-item-center">
    <div class="wirelessheader flex">
      <div class="tomodify flex align-item-center">
        <el-tabs v-model="activeName"
                 @tab-click="handleClick">
          <el-tab-pane label="用户管理"
                       name="first"></el-tab-pane>
          <el-tab-pane label="配置管理"
                       name="second"></el-tab-pane>
          <el-tab-pane label="高级管理"
                       name="last"></el-tab-pane>
        </el-tabs>
      </div>
      <div class="wirelessbtn flex">
        <cloud-button selType="primary"
                      btnText="从指定站点拷贝配置"
                      @click="test(222)" />
        <cloud-button selType="primary"
                      btnText="保存配置"
                      @click="test(222)" />
      </div>
    </div>
    <div class="wirelesstable">

    </div>
    <div class="frequency"></div>
    <div class="wirelessfooter">

    </div>
  </div>
</template>
<script>
export default {
  name: 'Wireless',
  data () {
    return {

    }
  },
  methods: {
    handleClick (tab, event) {
      console.log(tab, event);
    }
  },
}
</script>
