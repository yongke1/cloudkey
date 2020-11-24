<template>
  <div class="dashbox">
    <div class="probox">
      <div v-for="(item, index) in connectionData" :key="index" class="process">
        <div class="gdiv" v-bind:style="{ width: item.percent + '%' }"></div>
        <div class="txtbox">
          {{parseInt(item.hour) &lt; 10?'0':''}}{{ item.hour + " : 00" }}
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: "dashBoard",
  props: {
    connectionData: {
      type: Array
    },
  },
  data() {
    return {};
  },
};
</script>
<style lang="scss" scoped>
.clear:after {
  clear: both;
  visibility: hidden;
  height: 0;
  content: "";
  display: block;
}
.dashbox {
  border-radius: 3px;
  .probox {
    width: 100%;
    // padding-top: 10px;
    display: flex;
    .process {
      height: 8px;
      margin: 0 auto;
      background: #a4a7b5;
      margin-left: 2px;
      flex: 1;
      position: relative;
      .gdiv {
        height: 8px;
        position: absolute;
        background: #39cc64;
      }
      .txtbox {
        /* width: 57px; */
        height: 9px;
        font-size: 12px;
        font-family: Arial;
        font-weight: 400;
        color: #999999;
        text-align: center;
        margin-top: 13px;
      }
    }
  }
}
</style>