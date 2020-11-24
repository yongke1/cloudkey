<template>
  <div class="container">
    <!-- 头部 -->
    <div class="sbox">
      <!-- 在线信息 -->
      <div class="sback">
        <div class="desc">网络</div>
        <div class="show-box">
          <div class="img-box">
            <div class="gimg img-w"></div>
          </div>
          <div>
            <span class="bigtext">{{onlineInfo.GATEWAY.online}}</span>
            <span>/ </span>
            <span>{{onlineInfo.GATEWAY.sum}} </span>
          </div>
          <div class="name">网关</div>
        </div>
        <div class="show-box ac">
          <div class="img-box">
            <div class="cimg img-w"></div>
          </div>
          <div>
            <span class="bigtext">{{onlineInfo.AC.online}} </span>
            <span>/ </span>
            <span>{{onlineInfo.AC.sum}} </span>
          </div>
          <div class="name namet">AC</div>
        </div>
        <div class="show-box switch">
          <div class="img-box">
            <div class="simg img-w"></div>
          </div>
          <div>
            <span class="bigtext">{{onlineInfo.SWITCHES.online}} </span>
            <span>/ </span>
            <span>{{onlineInfo.SWITCHES.sum}}</span>
          </div>
          <div class="name nameo">交换机</div>
        </div>
        <div class="show-box ap">
          <div class="img-box">
            <div class="pimg img-w"></div>
          </div>
          <div>
            <span class="bigtext">{{onlineInfo.AP.online}} </span>
            <span>/ </span>
            <span>{{onlineInfo.AP.online}} </span>
          </div>
          <div class="name namet">AP</div>
        </div>
        <div class="show-box user">
          <div class="img-box">
            <div class="pimg img-w"></div>
          </div>
          <div>
            <span class="bigtext">{{onlineInfo.USER.online}} </span>
            <!-- <span>/ </span>
            <span>{{onlineInfo.AP.online}} </span> -->
          </div>
          <div class="name namet">用户</div>
        </div>
      </div>
      <!-- 告警信息 -->
      <div class="report">
        <div class="desc bottom-r">告警</div>
        <div class="progress-box">
          <div class="info-box">
            <span class="name">严重</span>
            <span @click="$router.push('alter')">{{reportInfo.Bad.sum}}</span>
          </div>
          <div class="progress">
            <cloud-grogress :width='reportInfo.Bad.scale'
                            color="red"></cloud-grogress>
          </div>
        </div>
        <div class="progress-box">
          <div class="info-box">
            <span class="name">中等</span>
            <span @click="$router.push('alter')">{{reportInfo.Mid.sum}}</span>
          </div>
          <div class="progress">
            <cloud-grogress :width='reportInfo.Mid.scale'
                            color="yellow"></cloud-grogress>
          </div>
        </div>
        <div class="progress-box">
          <div class="info-box">
            <span class="name">一般</span>
            <span @click="$router.push('alter')">{{reportInfo.Fair.sum}}</span>
          </div>
          <div class="progress">
            <cloud-grogress :width='reportInfo.Fair.scale'
                            color="green"></cloud-grogress>
          </div>
        </div>
      </div>
    </div>
    <!-- 连接状态 -->
    <div class="conn-box color-9A fs-14">
      <div class="conn-title flex">
        <div class="title-l">连通状态</div>
        <div class="title-r flex">
          <div class="mr-20">
            <i class="green"></i>
            连通
          </div>
          <div>
            <i class="gray"></i>
            断开
          </div>
        </div>
      </div>
      <dashBoard :connectionData="connectionData.data.cpu_connected_1"></dashBoard>
    </div>
    <!-- 图表 -->
    <div class="chart-box">
      <!-- Internet gate 图 -->
      <div class="gate-box"
           style="border-bottom: 1px solid rgba(164, 168, 182, 0.2);"
           v-if="isShowRateChart">
        <lineChart :linechartlist='rateChartData'
                   :id="'chartRate'"
                   :max='100'
                   :interval='25'
                   :company="'Mb'"
                   :tooldesc="'实时上网率'"
                   :firstlinecolor="'#FF5858'"
                   :lastlinecolor="'#FF9A00'"
                   :firstlinebgcolor="'rgba(255,88,88,0.1)'"
                   :lastlinebgcolor="'rgba(255,154,0,0.1)'"
                   :firstlinedesc="'上行速率'"
                   :lastlinedesc="'下行速率'" />
      </div>
      <div class="gate-box"
           v-if="isShowUserChart">
        <lineChart :linechartlist='userChartData'
                   :id="'chatrTerminal'"
                   :interval='10'
                   :max='40'
                   :company="'%'"
                   :tooldesc="'在线无线终端/活跃终端'"
                   :firstlinecolor="'#3ACC64'"
                   :lastlinecolor="'#4676E4'"
                   :firstlinebgcolor="'rgba(58,204,100,0.1)'"
                   :lastlinebgcolor="'rgba(70,118,228,0.1)'"
                   :firstlinedesc="'在线无线终端'"
                   :lastlinedesc="'活跃用户'" />
      </div>
    </div>
  </div>
</template>
<script>
import { devicesOnline, logSum, devicesUserSum, gatewayRate } from "@service/dashboard/dashboard"
export default {
  name: "dashboard",
  computed: {
  },
  props: {
    data: {
      type: []
    }
  },
  data () {
    return {
      //在线信息
      onlineInfo: {
        SWITCHES: { online: 0, sum: 0 },
        AC: { online: 0, sum: 0 },
        AP: { online: 0, sum: 0 },
        GATEWAY: { online: 0, sum: 0 },
        USER: { online: 0, sum: 0 },
      },
      //是否显示自动发现Msg
      isShowScanMes: true,
      //静态Json
      connectionData: require('../../../public/json/cpuChartRes.json'),
      //面积图
      lineChartRes: require('../../../public/json/lineChartRes.json'),
      //警告信息
      reportInfo: {
        Bad: {//严重
          sum: 0,
          scale: ""
        },
        Mid: {//中等
          sum: 0,
          scale: ""
        },
        Fair: {//一般
          sum: 0,
          scale: ""
        },
      },
      //速率图数据
      rateChartData: undefined,
      //是否显示上网速率图
      isShowRateChart: false,
      //用户总数图表数据
      userChartData: undefined,
      //是否显示用户图表
      isShowUserChart: false
    }
  },
  async created () {
    this.getList();
    this.getWarningInfo();
    this.getOnlineUserNum();
    this.getRateInfo();
  },
  methods: {
    //在线信息
    getList () {
      devicesOnline().then(res => {
        // 0:SWITCHES,1:AP,2:AC,3:网关
        res.data.data.online.forEach(item => {
          const onlineVal = {
            0: () => {
              return this.onlineInfo.SWITCHES.online = item.value
            },
            1: () => {
              return this.onlineInfo.AP.online = item.value
            },
            2: () => {
              return this.onlineInfo.AC.online = item.value
            },
            3: () => {
              return this.onlineInfo.GATEWAY.online = item.value
            },
          };
          return onlineVal[item.key]()
        });
        res.data.data.sum.forEach(item => {
          const onlineVal = {
            0: () => {
              return this.onlineInfo.SWITCHES.sum = item.value
            },
            1: () => {
              return this.onlineInfo.AP.sum = item.value
            },
            2: () => {
              return this.onlineInfo.AC.sum = item.value
            },
            3: () => {
              return this.onlineInfo.GATEWAY.sum = item.value
            },
          };
          return onlineVal[item.key]()
        });
      })
    },
    //过滤告警接口数据
    filterReportData (row) {
      if (row.logLevelInt > 0 && row.logLevelInt <= 3) {
        this.reportInfo.Bad.sum += row.logSum
      }
      if (row.logLevelInt === 4) {
        this.reportInfo.Mid.sum += row.logSum
      }
      if (row.logLevelInt > 4) {
        this.reportInfo.Fair.sum += row.logSum
      }
    },
    //返回告警百分比
    computedScale () {
      let sum = this.reportInfo.Mid.sum + this.reportInfo.Bad.sum + this.reportInfo.Fair.sum;
      this.reportInfo.Mid.scale = (this.reportInfo.Mid.sum / sum * 100).toFixed(0) + "%"
      this.reportInfo.Bad.scale = (this.reportInfo.Bad.sum / sum * 100).toFixed(0) + "%"
      this.reportInfo.Fair.scale = (this.reportInfo.Fair.sum / sum * 100).toFixed(0) + "%"
    },
    //查询告警信息
    getWarningInfo () {
      logSum().then(res => {
        res.data.data.forEach(res => {
          this.filterReportData(res)
        })
        this.computedScale();
      })
    },
    //查询在线用户数量
    async getOnlineUserNum () {
      let res = await devicesUserSum();
      this.userChartData = res.data.data
      // console.log(res.data.data);
      this.isShowUserChart = true
      //在线用户数量
      this.onlineInfo.USER.online = res.data.data[res.data.data.length - 1].sum;
    },
    //查询速率信息
    async getRateInfo () {
      let res = await gatewayRate();
      this.rateChartData = res.data.data;
      this.isShowRateChart = true
    }
  }
}
</script>
<style lang="scss" scoped>
.container {
  .sbox {
    width: 100%;
    display: flex;
    height: 300px;
    .sback {
      background: url("~@assets/img/home_bg.png") no-repeat center/cover;
      flex: 0.75;
      margin: 10px 10px 10px 10px;
      display: flex;
      box-shadow: 0px 2px 4px 0px #dbdbdb;
      border-radius: 3px;

      .show-box {
        flex: 1;
        display: flex;
        flex-flow: column;
        text-align: center;
        margin-top: 90px;
        .img-box {
          text-align: center;
          .img-w {
            width: 50px;
            height: 50px;
            margin: 0 auto 50px;
          }
          .gimg {
            background: url("~@assets/img/gateway.png") no-repeat 0 0;
          }
          .cimg {
            background: url("~@assets/img/AC.png") no-repeat 0 0;
          }
          .simg {
            background: url("~@assets/img/switch.png") no-repeat 0 0;
          }
          .pimg {
            background: url("~@assets/img/AP.png") no-repeat 0 0;
          }
        }
        .bigtext {
          font-size: 30px;
          color: black;
          font-weight: 400;
        }
      }
    }
    .report {
      flex: 0.25;
      box-shadow: 0px 2px 4px 0px #dbdbdb;
      margin: 10px;
      margin-left: 0;
      border-radius: 3px;
      .progress-box {
        width: 100%;
        padding: 0 30px;
        height: 70px;
        .progress {
          width: 100%;
          height: 7px;
        }
        .info-box {
          margin-bottom: 10px;
          & span:nth-child(2) {
            color: #333333;
            line-height: 18px;
            margin-left: 10px;
            cursor: pointer;
          }
          & span:nth-child(2):hover {
            text-decoration: underline;
          }
        }
      }
      .bottom-r {
        margin-bottom: 24px;
      }
    }
    .desc {
      font-size: 12px;
      font-weight: 400;
      color: #999999;
      line-height: 18px;
      margin-left: 20px;
      height: 50px;
      line-height: 50px;
    }
  }
  .conn-box {
    box-shadow: 1px 2px 4px 0px #dbdbdb;
    border-radius: 3px;
    margin: 10px;
    padding: 20px;
    padding-bottom: 40px;
    .conn-title {
      justify-content: space-between;
      margin-bottom: 30px;
      .title-r {
        .mr-20 {
          margin-right: 20px;
        }
        div {
          i {
            width: 6px;
            height: 6px;
            display: inline-block;
            border-radius: 50%;
            margin: 2px;
          }
        }
        .green {
          background: #3acc64;
        }
        .gray {
          background: rgba(164, 168, 182, 0.3);
        }
      }
    }
  }
  .chart-box {
    box-shadow: 1px 2px 4px 0px #dbdbdb;
    border-radius: 3px;
    margin: 10px;

    .gate-box {
      padding: 20px;
    }
  }
}
.name {
  font-size: 12px;
  font-family: Microsoft YaHei;
  font-weight: 400;
  color: #999999;
  line-height: 18px;
  margin-top: 2px;
}
</style>