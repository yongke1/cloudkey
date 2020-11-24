<template>
  <div class="network">
    <div class="netbox">
      <div class="netheader">
        <div class="netleft">
          <div class="lefttitle">
            网络拓扑
          </div>
          <div class="netqiehuan">
            <el-tabs v-model="activeName"
                     type="card"
                     @tab-click="handleClick">
              <el-tab-pane label="纵向"
                           name="first"></el-tab-pane>
              <el-tab-pane label="横向"
                           name="second"></el-tab-pane>
            </el-tabs>
          </div>
        </div>
        <div class="netrefresh">
          <el-tooltip class="item"
                      effect="dark"
                      content="Refresh"
                      placement="bottom">
            <div class="refre"></div>
          </el-tooltip>
        </div>

      </div>
      <div class="netstatus"></div>
    </div>
    <!-- <treeChart :id="'id'" /> -->
    <treeg6 />
    <!-- <treeg6test /> -->
  </div>
</template>
<script>
export default {
  name: 'network',
  data () {
    return {
      activeName: 'first'
    }
  },
  methods: {
    handleClick (tab, event) {
      console.log(tab, event);
    }
  }
}
</script>
<style lang="scss" scoped>
/deep/.el-tabs--card > .el-tabs__header .el-tabs__nav {
  border-radius: 3px;
}
/deep/ .el-tabs__nav .is-top {
  align-content: center;
}
/deep/ .el-tabs__item {
  border-bottom: 1px;
  height: 30px;
  box-sizing: border-box;
  line-height: 30px;
  display: inline-block;
  list-style: none;
  font-size: 12px;
  font-weight: 400;
  color: #303133;
  position: relative;
  // margin-top: 10px;
}
/deep/ .el-tabs__item.is-active {
  background: rgba(36, 38, 54, 1);
  color: #ffffff;
}
/deep/ .el-tabs--card > .el-tabs__header .el-tabs__item:first-child {
  border-left: none;
  padding: 0px 19px 0px 18px;
  text-align: center;
  line-height: 30px;
  // background-color: pink;
}
/deep/
  .el-tabs--top.el-tabs--card
  > .el-tabs__header
  .el-tabs__item:last-child {
  padding-left: 18px;
  padding-right: 19px;
}
/deep/ .el-table .cell {
  font-size: 13px;
  color: #9a9a9a;
  line-height: 18px;
}
.network {
  width: 100%;
  display: flex;
  align-items: center;
  .netheader {
    width: 100%;
    padding-left: 20px;
    height: 50px;
    display: flex;
    justify-content: space-around;
    align-items: center;
    background-color: #fff;
    .netleft {
      display: flex;
      justify-content: space-around;
      align-items: center;
      .lefttitle {
        height: 50px;
        line-height: 50px;
        font-size: 14px;
        font-weight: 400;
        color: #999999;
        // float: left;
      }
      .netqiehuan {
        // width: 200px;
        height: 30px;
        display: flex;
        justify-content: space-around;
        align-items: center;
        padding-left: 20px;
      }
    }
    .netrefresh {
      width: 36px;
      height: 30px;
      display: flex;
      justify-content: space-around;
      align-items: center;
      // background-color: pink;
      .hah {
        .refre {
          width: 16px;
          height: 16px;

          background: url("~@assets/img/bg_icon.png") no-repeat -143px -302px;
        }
      }
    }
  }
}
</style>