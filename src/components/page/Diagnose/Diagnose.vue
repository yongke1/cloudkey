<template>
  <div class="diagnose flex ">
    <div class="diagnoseheader flex paddingTop">
      <div class="diagnosetitle pl20">
        <span class="fontsize color-9A font-fmaily">诊断</span>
      </div>
      <div class="refre align-item-center"></div>
    </div>
    <div class="diagnoselist flex pl20">
      <div class="diagnoseselect flex">
        <span class="fontsize color-info font-fmaily">故障类型</span>
        <div class="pl20 ">
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
      <div class="diagonepromt flex paddingTop">
        <span class="fontsize color-info font-fmaily ">故障类型</span>
        <div class="flex pl20">
          <div class="oringe"></div>
          <span class="fontsize color-info font-fmaily pl4">Please select the port to be configured</span>
        </div>
      </div>
      <div class="diagnoseport flex">
        <!-- <network :toshowtooltip="2" /> -->
        <div class="warn flex">
          <div class="paddingLeft">
            <div class="green cube"></div>
            <span class="fontsize color-info-title font-fmaily paddingLeft5">
              供电
            </span>
          </div>
          <div class="paddingLeft">
            <div class="black cube"></div>
            <span class="fontsize color-info-title font-fmaily paddingLeft5">
              关闭供电
            </span>
          </div>
          <div class="paddingLeft">
            <div class="gray cube"></div>
            <span class="fontsize color-info-title font-fmaily paddingLeft5">
              不可检测
            </span>
          </div>
          <div class="paddingLeft">
            <div class="red cube"></div>
            <span class="fontsize color-info-title font-fmaily paddingLeft5">异常</span>
          </div>
          <div class="paddingLeft">
            <div class="Uplinks"></div>
            <span class="fontsize color-info font-fmaily paddingLeft5">Uplinks</span>
          </div>
          <div class="paddingLeft">
            <div class="Electrical"></div>
            <span class="fontsize color-info font-arial paddingLeft5">Electrical port</span>
          </div>
          <div class="paddingLeft">
            <div class="Fibre"></div>
            <span class="fontsize color-info font-arial paddingLeft5">Fibre optical port</span>
          </div>
        </div>
      </div>
      <div class="diagnosebtn flex padding20">
        <el-button type="primary"
                   plain
                   v-model="show"
                   @click="openDiagnosis">开始诊断</el-button>
        <!-- <cloud-button selType="primary"
                      btnText="开始诊断" /> -->
      </div>
    </div>
    <div class="process flex"
         v-show="show">
      <div class="processheader flex p20">
        <div class="processtitle ">
          <span class="fontsize color-9A font-fmaily"
                v-if="history">诊断过程</span>
          <span class="fontsize color-9A font-fmaily"
                v-else>诊断历史</span>
        </div>
        <div class="processtab">
          <cloudTabgroup @group-change="groupChange"
                         :testgroup="['诊断过程','诊断历史']" />
        </div>
      </div>
      <div class="jindutiao"
           v-if="history">
        <div class="flex flexcolumn ">
          <div class="flex">
            <div class="computer"></div>
            <div class="flex pl20">
              <span class="fontsize color-info-title font-family ">端口Te1/0/25诊断开始...</span>
            </div>
          </div>
          <div class="flex paddingLeft5 align-item-center paddingtop10">
            <div class="progressbar">
              <div class="schedule"
                   :style="'height:'+progressHeight+'%'"></div>
            </div>
          </div>
          <div class="flex paddingtop10">
            <div class="guochen"
                 v-if="progressHeight<100"></div>
            <div class="flex"
                 v-if="progressHeight>=100">
              <div class="guochengray"></div>
              <div class="flex pl20">
                <span class="fontsize color-info-title font-family ">正在获取诊断所需信息...</span>
              </div>

            </div>
          </div>
          <div class="flex paddingLeft5"
               v-if="progressHeight>=100"
               style="padding-top:10px;">
            <div class="progressbar">
              <div class="schedule"
                   :style="'height:'+progressHeight1+'%'"></div>
            </div>
          </div>
          <div class="flex paddingtop10"
               v-if="progressHeight>=100">
            <div class="wanchen"
                 v-if="progressHeight1<100"></div>
            <div class="flex"
                 v-if="progressHeight1>=100">
              <div class="greensuceess"></div>
              <div class="flex pl20">
                <span class="fontsize color-info-title font-family ">诊断完成<br />诊断结果：端口未配置成光模式<br />诊断建议：如果端口是光电复用口，请将端口配置成fiber模式
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="processhisty"
           v-else>
        <el-table :data="tableData"
                  stripe
                  style="width: 100%">
          <el-table-column prop="status"
                           label="诊断状态"
                           width="166">
          </el-table-column>
          <el-table-column prop="result"
                           label="诊断结果"
                           width="191">
          </el-table-column>
          <el-table-column prop="Suggest"
                           label="诊断建议"
                           width="383">
          </el-table-column>
          <el-table-column prop="photoelectric"
                           label="端口光电状态"
                           width="181">
          </el-table-column>
          <el-table-column prop="starttiem"
                           label="开始时间"
                           width="239">
          </el-table-column>
          <el-table-column prop="updatetime"
                           label="更新时间"
                           width="140">
          </el-table-column>

        </el-table>
      </div>
    </div>

  </div>
</template>
<script>
import { GetPortDiagnosis } from "@service/monitor/diagnose"
export default {
  data () {
    return {
      //清除时间
      time1: null,
      time2: null,
      //计时
      overTime: 0,
      //进度条
      progressHeight: 0,
      //进度条2
      progressHeight1: 0,
      portdata: [],
      history: true,
      show: false,
      options: [{
        value: '选项1',
        label: 'POE供电问题'
      }, {
        value: '选项2',
        label: '光口故障诊断'
      }],
      value: '',
      active: 0,
      label: "hahahha",
      tableData: [{
        status: '诊断完成',
        result: '端口未配置成光模式',
        Suggest: '如果端口是光电复用口，请将端口配置成fiber模式',
        photoelectric: '电口',
        starttiem: "2020/08/21 15:23:32",
        updatetime: '2020/08/21 15:23:32'
      }, {
        status: '诊断完成',
        result: '端口未配置成光模式',
        Suggest: '如果端口是光电复用口，请将端口配置成fiber模式',
        photoelectric: '电口',
        starttiem: "2020/08/21 15:23:32",
        updatetime: '2020/08/21 15:23:32'
      }, {
        status: '诊断完成',
        result: '端口未配置成光模式',
        Suggest: '如果端口是光电复用口，请将端口配置成fiber模式',
        photoelectric: '电口',
        starttiem: "2020/08/21 15:23:32",
        updatetime: '2020/08/21 15:23:32'
      }, {
        status: '诊断完成',
        result: '端口未配置成光模式',
        Suggest: '如果端口是光电复用口，请将端口配置成fiber模式',
        photoelectric: '电口',
        starttiem: "2020/08/21 15:23:32",
        updatetime: '2020/08/21 15:23:32'
      }],
      steps: false,
      steps2: false,
    }
  },
  props: {
    devicedid: {
      type: String
    },
    interfacealias: {
      type: String
    },
  },
  methods: {
    next () {
      if (this.active++ > 2)
        this.active = 0;
      this.steps = true
      console.log(this.steps)
    },
    openDiagnosis () {
      console.log(123)
      this.show = !this.show
      this.getport()
      this.time1 = setInterval(() => {
        this.progressHeight += 1
        if (this.progressHeight >= 100) {
          this.progressHeight = 100
          clearInterval(this.time1);
        }
      }, 30)
      this.time2 = setInterval(() => {
        if (this.progressHeight >= 100) {
          this.progressHeight1 += 1
          if (this.progressHeight1 >= 100) {
            this.progressHeight1 = 100
            clearInterval(this.time2);
          }
        }
      }, 30)


    },
    groupChange (item) {
      if (item.index == 0) {
        this.history = true
      } else {
        this.history = false
      }

    },
    //光口诊断
    async getport () {
      this.portdata = await GetPortDiagnosis({
        "deviceId": this.devicedid,
        "port": this.interfacealias
      })
      console.log(this.portdata.data.data)
    }
  },
  mounted () {

  }
}
</script>
<style lang="scss" scoped>
.pl4 {
  padding-left: 4px;
}
.flag {
  width: 7px;
  height: 7px;
  margin-right: 5px;
}
/deep/ .el-button{
  padding: 10px;
  height: 30px;
  font-size: 12px;
  border-radius: 2px;
}
.diagnose {
  width: 100%;
  flex-direction: column;
  .diagnoseheader {
    width: 100%;
    justify-content: space-between;
    border-bottom: 1px solid rgba(164, 168, 182, 0.2);
    padding: 14px 0 15px 0;

    .diagnosetitle {
      align-items: center;
    }
  }
  .diagnoselist {
    flex-direction: column;
    padding-left: 20px;
    padding-top: 29px;
    .diagnoseselect {
      align-items: center;
      padding-left: 25px;
      span {
        font-size: 12px;
        font-family: Microsoft YaHei;
        font-weight: 400;
        color: #666666;
        line-height: 18px;
      }
      /deep/ .el-input__inner{
        height: 30px;
        padding: 0 10px;
      }
    }
    .diagonepromt {
      padding-left: 25px;
    }
    .diagnoseport {
      padding-top: 30px;
      justify-content: flex-start;
      flex-direction: column;

      .allinterbox {
        justify-content: flex-start;
      }
      .paddingLeft {
        .green {
          background-color: #3acc64;
        }
        .red {
          background-color: red;
        }
        .gray {
          background-color: #9a9a9a;
        }
        .black {
          background-color: #343434;
        }
        .Uplinks {
          background: url("~@assets/img/bg_icon.png") no-repeat -380px -592px;
          width: 14px;
          height: 14px;
        }
        .Electrical {
          background: url("~@assets/img/bg_icon.png") no-repeat -313px -592px;
          width: 14px;
          height: 14px;
        }
        .Fibre {
          background: url("~@assets/img/bg_icon.png") no-repeat -347px -592px;
          width: 14px;
          height: 14px;
        }
      }
    }
    .diagnosebtn {
      padding-left: 20px;
    }
  }
  .process {
    width: 100%;
    flex-direction: column;
    background: #ffffff;
    border: 1px solid rgba(164, 168, 182, 0.2);
    .processheader {
      justify-content: flex-start;
      .processtitle {
        span {
          font-size: 12px;
          font-family: Microsoft YaHei;
          font-weight: 400;
          color: #999999;
          line-height: 18px;
        }
      }
      .processtab {
        padding-left: 20px;
      }
    }
  }
  .jindutiao {
    height: 300px;
    padding-top: 20px;
    padding-left: 20px;
    .progressbar {
      height: 70px;
      width: 4px;
      border-radius: 2px;
      background-color: #e5e5e5;
      position: relative;
      .schedule {
        width: 100%;
        height: 100%;
        border-radius: 2px;
        background-color: #a4a7b5;
      }
    }
  }
}
</style>