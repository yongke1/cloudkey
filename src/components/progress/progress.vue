<style lang="scss" scoped>
.container {
  position: relative;
  height: 100%;
  background-color: #f8f8f8;
  .repeat {
    position: absolute;
    height: 100%;
    left: 0;
    top: 0;
  }
  .red {
    background: url("~@assets/img/dashboard/g-red.png") repeat-x;
  }
  .yellow {
    background: url("~@assets/img/dashboard/g-yellow.png") repeat-x;
  }
  .green {
    background: url("~@assets/img/dashboard/g-green.png") repeat-x;
  }
}
</style>
<template>
  <div class="container">
    <div :class="color==='red'?'red repeat':color==='yellow'?'yellow repeat':color==='green'?'green repeat':''"
         :style="'width:'+width"></div>
  </div>

</template>
<script>
export default {
  name: "cloud-grogress",
  computed: {

  },
  data () {
    return {

    }
  },
  props: {
    //进度条实际宽度
    width: {
      type: String,
      default: '10%'
    },
    //进度条颜色
    color: {
      type: String,
      default: "red"
    }
  },
  mounted () {

  },
  methods: {

  }
}
</script>