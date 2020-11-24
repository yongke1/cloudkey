<style lang="scss" scoped>
</style>
<template>
  <div :id="id"
       style="height: 180px;max-width:100%;"></div>
</template>
<script>
export default {
  name: "areaChart",
  props: {
    chartData: {
      type: Array,
    },
    id: {
      type: String,
      default: 'cpuTrend'
    },
    width: {
      type: String,
      default: '95%'
    },
    unit: {
      type: String,
      default: "%"
    },
  },
  data () {
    return {
      cpuData: [],
      ramData: [],
      yMax: 0
    }
  },
  methods: {
    filtersData () {
      if (this.chartData) {
        //是否有alias属性，判断是哪种json传入
        if (!this.chartData[0].alias) {
          this.chartData.forEach((item, index) => {
            let time = item.createDateUtc;
            this.cpuData.push([]);
            this.ramData.push([]);
            this.cpuData[index].push(time)
            this.cpuData[index].push(item.cpu)
            this.ramData[index].push(time);
            this.ramData[index].push(item.ram)
          });
        }
        if (this.chartData[0].alias) {
          console.log(this.chartData)
          this.chartData.forEach((item, index) => {
            this.cpuData.push([]);
            this.ramData.push([]);
            this.cpuData[index].push(item.sync_time_cn)
            this.cpuData[index].push(+(item.rateDown))
            this.ramData[index].push(item.sync_time_cn);
            this.ramData[index].push(item.rateUp)
          });
        }
      }
    },
    filterYAxisMax (data) {//过滤rate图表Y轴最大值
      let maxX = +(data[0].rateDown);
      let maxY = +(data[0].rateUp);
      data.forEach(item => {
        let x = +(item.rateDown)
        let y = +(item.rateUp)
        maxX < x ? maxX = x : maxX;
        maxY < y ? maxY = y : maxY;
      })
      maxX > maxY ? this.yMax = maxX : this.yMax = maxY;
      this.yMax = this.yMax * 1.5
    },
    getList () {
      let that = this
      if (this.id === 'rateChart') {
        this.filterYAxisMax(this.chartData);
      }
      //基于准备好的dom，初始化echarts实例
      var myChart = this.$echarts.init(document.getElementById(this.id));
      let option1 = {
        tooltip: {
          position: function (pt) {//tooltip显示偏移量
            return [pt[0] > 1250 ? 1200 : pt[0], pt[1]];
          },
          transitionDuration: 0,
          trigger: 'axis',
          //提示框内容
          formatter (params) {
            return `<div style="color:#fff;font-size:12px;line-height: 18px;">
        <span>
          ${params[0].axisValue}
        </span>
        <div>
          <div style="width: 8px;height: 8px;background:#39CB63;border: 1px solid #FFFFFF;border-radius: 50%;display: inline-block;margin-right:4px;">
          </div>
          <span>${that.id === 'rateChart' ? 'Up' : 'CPU'}:
            <span style="color:#39CB63;">${params[1].data[1] + that.unit}</span>
          </span>
        </div>
        <div>
          <div style="width: 8px;height: 8px;background:#4575E3;border: 1px solid #FFFFFF;border-radius: 50%;display: inline-block;margin-right:4px;">
          </div>
          <span>${that.id === 'rateChart' ? 'Down' : 'RAM'}:
            <span style="color:#4575E3;">${params[0].data[1] + that.unit}</span>
          </span>
        </div>
      </div>`
          },
          backgroundColor: 'rgba(36,38,53,0.8)'
        },
        toolbox: {
          left: 'center',
          itemSize: 25,
          top: 55,
          feature: {
            dataZoom: {
              show: false,
              yAxisIndex: 'none',
            },
            restore: {
              show: false
            }
          }
        },
        xAxis: {
          type: 'category',
          boundaryGap: false,
          //获得焦点时
          axisPointer: {
            value: '2016-10-7',
            snap: true,
            lineStyle: {
              color: '#004E52',
              opacity: 0.5,
              width: 2
            },
            label: {
              show: false,
            },
            handle: {
              show: false,
              color: '#004E52',
            },
          },
          axisLabel: {
            show: true,
            textStyle: {
              fontSize: 12,
              color: "#9A9A9A"//x坐标刻度字体颜色
            },
            formatter: function (value) {
              if (value === undefined) {
                return
              }
              // 格式化成月/日，只在第一个刻度显示年份
              return value.length === 5 ? value : value.substr(11, 5);
            }
          },
          splitLine: {//网格线颜色
            show: true,
            lineStyle: {
              color: ['rgba(164, 168, 182, 0.2)'],
              width: 1,
              type: 'solid'
            }
          },
          axisTick: { //y轴刻度线
            show: false
          },
          axisLine: { //y轴
            show: false
          },
        },
        yAxis: {
          axisTick: { //y轴刻度线
            show: false
          },
          axisLine: { //y轴
            show: false
          },
          min: function () {
            return 0
          },
          max: function () {
            return that.id === 'rateChart' ? that.yMax.toFixed(2) : 100
          },
          type: 'value',
          axisLabel: {
            show: true,
            interval: 'auto',
            formatter: `{value} ${that.unit}`,
            textStyle: {
              fontSize: 12,
              color: '#9A9A9A'  //这里用参数代替了
            }
          },
          show: true,
          splitLine: {//网格线颜色
            show: true,
            lineStyle: {
              color: ['rgba(164, 168, 182, 0.2)'],
              width: 1,
              type: 'solid'
            }
          },
        },
        grid: {
          width: this.width, // 宽度
          height: "70%",// 高度
          bottom: 0,
          top: '30px',
          left: '70px',
          right: 0
        },
        dataZoom: [{
          type: 'inside',
        }],
        series: [
          {//cpu
            name: 'yss',
            type: 'line',
            smooth: true,//弧度
            symbolSize: 1,//节点圆心
            sampling: 'average',
            itemStyle: {      //折线颜色
              color: 'rgba(69,118,228,0.7)'
            },
            areaStyle: {    //填充折线底部颜色
              color: "rgba(69,118,228,0.1)"
            },
            data: this.cpuData,
          },
          {//ram
            name: '模拟数据',
            type: 'line',
            smooth: true,
            symbolSize: 1,
            sampling: 'average',
            itemStyle: {
              color: 'rgba(57,204,100,0.7)'
            },
            areaStyle: {
              color: "rgba(57,204,100,0.1)"
            },
            data: this.ramData
          }
        ]
      }
      myChart.setOption(option1);
      myChart.on('mouseover', function (params) {// 鼠标移入
        myChart.setOption({// 设置 鼠标移入后想要的样式
          series: [
            {
              name: params.seriesName,
              symbolSize: 4,
              lineStyle: {
                width: 2
              }
            },
            {
              name: params.seriesName,
              symbolSize: 4,
              lineStyle: {
                width: 2
              }
            },
          ]
        })
      });
      myChart.on('mouseout', function (params) {// 鼠标移出
        myChart.setOption({// 将样式复原
          series: [
            {
              name: params.seriesName,
              symbolSize: 2,
              lineStyle: {
                width: 1
              }
            }, {
              name: params.seriesName,
              symbolSize: 2,
              lineStyle: {
                width: 1
              }
            }
          ]
        })
      })

    },
  },
  mounted () {
    this.filtersData()
    this.getList();
  },
  watch: {

  }
}
</script>