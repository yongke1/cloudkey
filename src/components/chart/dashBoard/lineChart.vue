<template>
  <div :id="id" style="height: 229px; max-width: 100%"></div>
</template>
<script>
export default {
  name: "lineChart",
  data() {
    return {
      cpudata: [],
      remdata: [],
      timedata: [],
    };
  },
  props: {
    linechartlist: {
      //数组
      type: Array,
      default() {
        return [];
      },
    },
    id: {
      //id
      type: String
    },
    max: {
      //y轴最大值
      type: Number,

    },
    interval: {
      //y轴间隔
      type: Number,
    },
    company: {
      //y轴单位
      type: String,
    },
    tooldesc: {
      //hover框中详情
      type: String,
    },
    firstlinecolor: {
      //第一条折线颜色
      type: String,
    },
    firstlinebgcolor: {
      //第一条折线填充颜色
      type: String,
    },
    firstlinedesc: {
      //第一条折线详情
      type: String,
    },
    lastlinecolor: {
      //第二条折线颜色
      type: String,
    },
    lastlinebgcolor: {
      //第二条折线填充颜色
      type: String,
    },
    lastlinedesc: {
      //第二条折线详情
      type: String,
    },
  },
  methods: {
    listhandle() {
      // console.log(this.linechartlist)
      if (this.id === "chartRate") {
        this.cpudata = this.linechartlist.map((item) => {
          // return item.cpu
          return item.inputRateByBits.split("b")[0];
        });
        this.remdata = this.linechartlist.map((item) => {
          // return item.ram
          return item.outputRateByBits.split("b")[0];
        });
        this.timedata = this.linechartlist.map((item) => {
          return item.createDateUtc;
        });
      }
      if (this.id === "chatrTerminal") {
        this.cpudata = this.linechartlist.map((item) => {
          return item.sum;
        });
        this.remdata = this.linechartlist.map((item) => {
          return item.sum;
        });
        this.timedata = this.linechartlist.map((item) => {
          return item.createDateUtc;
        });
      }
    },

    //初始化echart图标
    gitList() {
      var mychart = this.$echarts.init(document.getElementById(this.id));
      //var test = []
      let option1 = {
        //  图表距边框的距离,可选值：'百分比'¦ {number}（单位px）
        title: {
          text:
            this.tooldesc + "  " + "(" + this.timedata[0].substr(0, 10) + ")",
          x: "left",
          padding: [0, 5, 5, 0],
          textStyle: {
            fontSize: 14,
            fontWeight: "400",
            color: "#9A9A9A", // 主标题文字颜色
          },
        },
        legend: {
          // orient 设置布局方式，默认水平布局，可选值：'horizontal'（水平） ¦ 'vertical'（垂直）
          orient: "horizontal",
          // x 设置水平安放位置，默认全图居中，可选值：'center' ¦ 'left' ¦ 'right' ¦ {number}（x坐标，单位px）
          x: "right",
          // y 设置垂直安放位置，默认全图顶端，可选值：'top' ¦ 'bottom' ¦ 'center' ¦ {number}（y坐标，单位px）
          y: "top",
          data: [this.firstlinedesc, this.lastlinedesc],
          padding: [1, 16, 20, 5],
          itemGap: 20,
          itemWidth: 13,
          itemHeight: 8,
          textStyle: {
            color: "#9A9A9A",
            fontSize: 12,
            fontWeight: "400",
          },
        },
        grid: {
          top: "20%", // 等价于 y: '16%'
          left: "0%",
          right: "0.9%",
          bottom: "10%",
          containLabel: true,
        },
        // 提示框
        tooltip: {
          trigger: "axis",
          transitionDuration: 0,
          formatter: (params) => {
            //console.log(params)
            return `<div style="width:139px;height:100px;color:#FFFFFF;font-size: 12px;font-weight: 400;padding-left:10px;padding-top:10px">
            <div>${params[0].axisValue}</div>
            <div>${this.tooldesc}</div>
            <div>
               <div style="width: 8px;height: 8px;background:${this.firstlinecolor};border: 1px solid #FFFFFF;border-radius: 50%;display: inline-block;margin-right:4px;">
          </div>
          <span>${this.firstlinedesc}:
            <span style="color:${this.firstlinecolor}">${params[0].data}${this.company}</span>
          </span>
            </div>
            <div>
               <div style="width: 8px;height: 8px;background:${this.lastlinecolor};border: 1px solid #FFFFFF;border-radius: 50%;display: inline-block;margin-right:4px;">
          </div>
          <span>${this.lastlinedesc}:
            <span style="color:${this.lastlinecolor}">${params[1].data}${this.company}</span>
          </span>
            </div>
            </div>`;
          },
        },
        //工具框，可以选择
        toolbox: {
          feature: {
            saveAsImage: {}, //下载工具
          },
        },
        xAxis: {
          type: "category",
          // 坐标轴线
          axisLine: {
            show: false,
            lineStyle: {
              color: ["#fff"],
            },
          },
          splitLine: {
            // 分隔线
            show: true, // 默认显示，属性show控制显示与否
            // onGap: null,
            lineStyle: {
              // 属性lineStyle（详见lineStyle）控制线条样式
              color: ["rgba(164, 168, 182, 0.2)"],
              width: 1,
              type: "solid",
            },
          },
          // 坐标轴文本标签
          axisLabel: {
            show: true,
            interval: 3, //设置X轴数据间隔几个显示一个，为0表示都显示
            textStyle: {
              // 其余属性默认使用全局文本样式，详见TEXTSTYLE
              color: "#9A9A9A",
            },
            formatter: (value, index) => {
              // 格式化成月/日，只在第一个刻度显示年份
              //console.log(params)
              //console.log(index)
              //console.log(value)
              //test.push(index)
              //console.log(indexlength)
              //let lastindex = indexlength[indexlength.length - 1]
              if (index === 0) {
                return "     " + value.substr(11, 5);
              } else {
                return value.substr(11, 5);
              }
            },
          },
          // boundaryGap值为false的时候，折线第一个点在y轴上
          boundaryGap: false,
          data: this.timedata,
        },

        yAxis: {
          type: "value",
          min: 0, // 设置y轴刻度的最小值
          max: this.max, // 设置y轴刻度的最大值
          //splitNumber: 4,  // 设置y轴刻度间隔个数
          interval: this.interval,
          axisLabel: {
            formatter: "{value}" + this.company,
            textStyle: {
              color: "#9A9A9A",
            },
          },
          splitLine: {
            // 分隔线
            show: true, // 默认显示，属性show控制显示与否
            // onGap: null,
            lineStyle: {
              // 属性lineStyle（详见lineStyle）控制线条样式
              color: ["rgba(164, 168, 182, 0.2)"],
              width: 1,
              type: "solid",
            },
          },
          axisLine: {
            show: false,
            lineStyle: {
              color: ["#fff"],
            },
          },
        },

        series: [
          {
            name: this.firstlinedesc,
            data: this.cpudata,
            type: "line",
            // 设置小圆点消失
            // 注意：设置symbol: 'none'以后，拐点不存在了，设置拐点上显示数值无效
            //symbol: 'none',
            symbolSize: 1,
            // 设置折线弧度，取值：0-1之间
            smooth: true,
            areaStyle: {
              //填充折线底部颜色
              //color: "rgba(255,88,88,0.1)"
              color: this.firstlinebgcolor,
            },
          },

          {
            name: this.lastlinedesc,
            data: this.remdata,
            type: "line",
            // 设置折线上圆点大小
            symbolSize: 1,
            smooth: true,
            areaStyle: {
              //填充折线底部颜色
              //color: "rgba(255,154,0,0.1)"
              color: this.lastlinebgcolor,
            },
          },
        ],

        color: [this.firstlinecolor, this.lastlinecolor],
      };
      mychart.setOption(option1);
      //console.log(test)
    },
  },
  mounted() {
    this.listhandle();
    this.gitList();
  },
};
</script>
<style lang="scss" scoped>
</style>