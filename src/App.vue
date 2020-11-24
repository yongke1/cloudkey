<template>
  <div id="app">
    <router-view />
  </div>

</template>

<script>

export default {
  name: 'App',
  components: {

  }
}
</script>

<style>
@import "~@assets/css/base.css";
@import "~@assets/css/common.css";

#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  /* text-align: center; */
  /* color: #2c3e50; */
}
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}
/*element ui lable */
.el-table th > .cell {
  font-size: 12px;
  font-family: Arial;
  font-weight: 400;
  color: #999999;
  line-height: 18px;
}
.el-table__row > td > .cell {
  font-size: 12px !important;
  font-family: Arial !important;
  font-weight: 400 !important;
  color: #666666 !important;
  line-height: 18px !important;
}
.atooltip {
  /* width: 171px;
  height: 171px; */
  background: #ffffff !important;
  box-shadow: 0px 4px 16px 0px rgba(164, 167, 181, 0.6);
  border-radius: 3px;
  border: none !important;
  padding: 11px !important;
  padding-top: 7px !important;
}
.el-tooltip__popper[x-placement^="bottom"] .popper__arrow::after {
  border-bottom-color: #ffffff !important;
}
.el-tooltip__popper[x-placement^="bottom"] .popper__arrow {
  border-bottom-color: #ffffff !important;
}
::-webkit-scrollbar {
  width: 10px;
  height: 10px;
}

::-webkit-scrollbar-thumb {
  background-color: rgba(164, 168, 182, 0.2);
  border-radius: 3px;
}
</style>
