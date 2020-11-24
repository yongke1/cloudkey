<style lang="scss" scoped>
.el-dialog__header {
  border-bottom: 0px;
}
/deep/.el-dialog__body {
  padding: 50px 0 50px 40px;
}
/deep/.el-dialog__header {
  padding: 0;
}
.radar-box {
  @keyframes animal {
    0% {
      transform: rotate(0deg);
      -ms-transform: rotate(0deg);
      -webkit-transform: rotate(0deg);
    }
    100% {
      transform: rotate(360deg);
      -ms-transform: rotate(360deg);
      -webkit-transform: rotate(360deg);
    }
  }
  .radar-img {
    background: url(~@assets/img/radar.png) no-repeat;
    width: 100px;
    height: 100px;
    transform-origin: center center;
    animation: animal 4s infinite linear;
  }
  .radar-l {
  }
  .radar-r {
    flex-flow: column;
    font-size: 16px;
    margin-left: 20px;
    flex: 0.9;
    .radar-progress {
      position: relative;
      background: rgba(164, 167, 181, 0.1);
      height: 6px;
      border-radius: 3px;
      margin-top: 10px;
      margin-bottom: 12px;
      div {
        position: absolute;
        background: rgba(75, 122, 229, 1);
        height: 6px;
        border-radius: 3px;
        transition: 0.3s;
      }
    }
  }
}
</style>
<template>
  <div>
    <el-dialog :width="width"
               :visible.sync="visible"
               :append-to-body='true'
               :before-close="radarCloseChange"
               :close-on-click-modal='false'
               :close-on-press-escape='false'
               :custom-class='"border-none"'
               @close="radarCloseChange">
      <div class="radar-box flex align-item-center">
        <div class="radar-img radar-l">
        </div>
        <div class="flex radar-r">
          <span>{{desc}}</span>
          <div class="radar-progress">
            <div :style="'width:'+progressWidth+'%'">
            </div>
          </div>
          <span class="fs-12">{{progressWidth}}%</span>
        </div>
      </div>
    </el-dialog>
  </div>
</template>
<script>
export default {
  name: 'radarLoading',
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
    desc: {             //描述
      type: String,
      default: ""
    },
    status: {//0自动发现Scan,1,SSH创建cli
      type: Number,
      default: 0
    }
  },
  data () {
    return {
      //进度调进度
      progressWidth: 0,
      //定时器
      time1: null,
      //自动发现服务状态是否开启成功
      isSuccess: false,
      //设备ip macaddress
      scanData: {},
      //计时
      overTime: 0
    }
  },
  methods: {
    radarCloseChange () {
      this.$emit('update:visible', false);
      clearInterval(this.time1)
    },
    //模拟搜索
    testSelect () {
      //模拟查找
      setTimeout(() => {
        this.time1 = setInterval(() => {
          if (this.progressWidth === 26) {
            clearInterval(this.time1)
            this.time1 = null
            setTimeout(() => {
              this.time1 = setInterval(() => {
                if (this.progressWidth === 56) {
                  clearInterval(this.time1)
                  this.time1 = null
                  //模拟进度走到56时，获取到数据
                  // this.scanData.data = 1
                  setTimeout(() => {
                    this.time1 = setInterval(() => {
                      if (this.progressWidth === 99) {
                        if (this.status === 0) {
                          clearInterval(this.time1)
                          this.time1 = null
                        }
                        if (this.status === 1) {
                          clearInterval(this.time1)
                          this.time1 = null
                          this.$emit('update:visible', false);
                          this.$emit('radarCloseChange', true);
                        }
                      } else {
                        this.progressWidth++
                      }
                    }, 100)
                  }, 2000)
                } else {
                  this.progressWidth++
                }
              }, 100)
            }, 3000)
          } else {
            this.progressWidth++
          }
        }, 100)
      }, 2000)
    },
    //开启自动搜索
    openScan () {
      setTimeout(() => {
        let time = setInterval(async () => {
          this.overTime++
          //超过五分钟关闭
          if (this.overTime >= 300) {
            this.$findScan(2);
            clearInterval(time)
            this.$emit('update:visible', false);
            this.$emit('radarCloseChange', false);
          }
          let res = await this.$findScan(1);
          if (!res.data) {
            clearInterval(this.time1)
            this.progressWidth = 100
            clearInterval(time)
            time = null
            setTimeout(() => {
              this.$emit('update:visible', false);
              this.$emit('radarCloseChange', true);
            }, 1000)
          }
        }, 1000)
      }, 5000)
    },
  },
  mounted () {
    this.testSelect();
    // 默认为0
    if (this.status === 0) {
      this.$findScan(2);//关闭
      this.$findScan(0);//启动
      this.openScan();
    }
    if (this.status === 1) {
      //
    }

    if (this.status === 2) {
      //
    }
  },
  beforeDestroy () {
    clearInterval(this.time1)
  }

}
</script>