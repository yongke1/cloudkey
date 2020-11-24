<template>
  <div>
    <div class="toplgnone"
         @mouseenter="clearTimer"
         @mouseleave="startTimer"
         v-show="visible">
      <div :type="selType"
           :class="[selType?'toplgnone--'
           +selType:'']"></div>
      <span class="leftsize">{{Text}}</span>
    </div>
  </div>
</template>

<script>
export default {
  name: "cloudNotification",
  data () {
    return {
      visible: false,
      closed: false,
      duration: 3000,
      timer: null
    }
  },
  props: {
    selType: {
      type: String,
      default: ''
    },
    Text: {
      type: String,
      default: '成功'
    },
    // Time: {
    //   type: Number,
    //   default: '3000'
    // }
  },
  methods: {
    close () {
      this.closed = true;
      // 如果设置了点击关闭的回调,则执行
      if (typeof this.onClose === 'function') {
        this.onClose();
      }
    },
    clearTimer () {
      clearTimeout(this.timer);
    },
    startTimer () {
      if (this.duration > 0) {
        this.timer = setTimeout(() => {
          if (!this.closed) {
            this.close();
          }
        }, this.duration);
      }
    },
  },
  mounted () {

    if (this.duration > 0) {
      this.timer = setTimeout(() => {
        if (!this.closed) {
          this.close();
        }
      }, this.duration);

    }
  },
}

</script>
<style scoped>
.toplgnone {
  height: 40px;
  padding: 0 10px;
  position: absolute;
  display: flex;
  justify-content: space-around;
  align-items: center;
  padding: 10px 0;
  background: #ffffff;
  box-shadow: 1px 4px 16px 0px rgba(164, 168, 182, 0.6);
  border-radius: 3px;
  z-index: 1;
}
.toplgnone--leftgreen {
  margin-left: 10px;
  padding: 0 10px;
  width: 23px;
  height: 23px;
  background: url("~@assets/img/bg_icon.png") no-repeat -84px -549px;
}
.toplgnone--leftyellow {
  margin-left: 10px;
  padding: 0 10px;
  width: 23px;
  height: 23px;
  background: url("~@assets/img/bg_icon.png") no-repeat -41px -549px;
}
.Text {
  font-size: 12px;
  font-family: Arial;
  font-weight: 400;
  color: #666666;
}
.leftsize {
  align-items: center;
  font-size: 12px;
  font-family: Arial;
  font-weight: 400;
  color: #666666;
  margin: 10px;
}
</style>