<style lang="scss" scoped>
.container {
  .progress-box {
    width: 400px;
    height: 7px;
    .progress {
      width: 100%;
      height: 7px;
    }
  }
  .switch-box {
    width: 100%;
    background: chocolate;
    display: flex;
    .switch-column {
      margin-right: 2rem;
      .switch-row {
        display: flex;
        .switch-item {
          width: 50px;
          height: 50px;
          background: yellow;
          padding: 1rem;
          margin: 1rem;
        }
      }
      .switch-null {
        width: 50px;
        height: 50px;
        margin: 1rem;
      }
    }
  }
}
</style>
<template>
  <div class="container">
    <div id="rateTrend"
         style="height: 190px;width: 100%;"></div>
    <div id="symmetry"
         style="height: 190px;width: 100%;"></div>
    <div class="progress-box">
      <div class="progress">
        <cloud-grogress width='80%'
                        color="red"></cloud-grogress>
      </div>
    </div>
    <div class="switch-box">
      <div v-for="(item,index) in data"
           :key="index"
           class="switch-column">
        <div v-for="(value,i) in item"
             :key="i"
             class="switch-row"
             :class="value.length===0?'switch-null':''">
          <div v-for="(item1,ii) in value"
               :key="ii"
               class="switch-item">
            {{item1.name}}
          </div>
        </div>
      </div>
    </div>
    <!-- 按钮封装和提示框封装测试-->
    <div class="computer">
      <cloud-button selType="primary"
                    btnText="主要按钮"
                    :selDisabled="false"
                    @click="test(222)" />
      <cloud-button selType="primary"
                    btnText="带图标主要按钮"
                    iconName="el-icon-plus"
                    :selDisabled="false"
                    @click="test(222)" />
      <cloud-button btnText="次要按钮" />
      <cloud-notification ref="notifi"
                          selType="leftyellow"
                          Text="Successfully ignored"></cloud-notification>

    </div>
    <div style="color:#fff;font-size:12px;line-height: 18px;">
      <span>
        2020/07/20 20:01:02
      </span>
      <div>
        <div style="width: 8px;height: 8px;background:#4575E3;border: 1px solid #FFFFFF;border-radius: 50%;display: inline-block;margin-right:4px;">
        </div>
        <span>CPU:
          <span style="color:#4575E3;">66%</span>
        </span>
      </div>
      <div>
        <div style="width: 8px;height: 8px;background:#39CB63;border: 1px solid #FFFFFF;border-radius: 50%;display: inline-block;margin-right:4px;">
        </div>
        <span>RAM:
          <span style="color:#39CB63;">72%</span>
        </span>
      </div>
    </div>

    <!-- echart -->
    <ecpuChart />
  </div>
</template>
<script>
import Highcharts from "highcharts"
import EcpuChart from "@components/chart/switch/areaChart"
export default {
  name: "test",
  components: {
    EcpuChart
  },
  computed: {
    //过滤方法
    items: function () {
      var _search = this.search;
      if (_search) {
        //不区分大小写处理
        var reg = new RegExp(_search, 'ig')
        //es6 filter过滤匹配，有则返回当前，无则返回所有
        return this.lists.filter(function (e) {
          //匹配所有字段
          return Object.keys(e).some(function (key) {
            return e[key].match(reg);
          })
          //匹配某个字段
          //  return e.name.match(reg);
        })
      }
      return this.lists;
    }
  },
  data () {
    return {
      search: '',
      lists: [
        { name: 'AAA', msg: 'aaa文本s介绍12' },
        { name: 'BBB', msg: 'bbb文本f介绍2' },
        { name: 'CCC', msg: 'ccc文本e介绍3' },
        { name: 'DDD', msg: 'ddd文本t介绍4' },
        { name: 'EEE', msg: 'eee文本y介绍5' },
      ],
      //   id  , producClass,
      data: [
        [
          [{ name: "a", status: 0, id: 1 }, { name: "b", id: 3 }, { name: "c" }],
          [{ name: "a", id: 2 }, { name: "b" }, { name: "c" }, { name: "c" }]
        ],
        [
          [{ name: "a" }, { name: "b" }, { name: "c" }],
          [{ name: "a" }, { name: "b" }, { name: "c" }]
        ],
        [
          [],
          [{ name: "a" }, { name: "b" }, { name: "c" }]
        ]
      ],
      connectionData: [
        { date: "", lable: "", value: "1" },
        { date: "", lable: "", value: "1" },
        { date: "", lable: "", value: "0.85" },
        { date: "", lable: "", value: "" },
        { date: "", lable: "", value: "" },
      ]
    }
  },
  methods: {
    allClick () { },

  },
  mounted () {
    //图1
    (() => {
      let aryX = []
      let aryX2 = []
      for (let i = 0; i < 100; i++) {
        aryX.push(Math.ceil(Math.random() * 40))
      }
      for (let i = 0; i < 100; i++) {
        aryX2.push(Math.ceil(Math.random() * 40))
      }
      var xData = ['00:00', '02:00', '04:00', '06:00', '08:00', '10:00', '12:00', '14:00', '16:00', '18:00', '20:00', '22:00', '00:00', '02:00', '04:00', '06:00', '08:00', '10:00', '12:00'];
      var chart = Highcharts.chart('rateTrend', {
        chart: {
          plotBorderWidth: null,
          plotShadow: false,
          marginTop: 30,
          marginRight: 0,
          height: 190,
          width: 1200,

          style: {
            fontSize: '12px',
            fontFamily: "微软雅黑",
            fontWeight: "normal",
            color: "#666"
          },
          plotBackgroundColor: '#fff',
          zoomType: 'x'
        },
        credits: {//版权信息
          enabled: false
        },
        title: {
          text: ""
        },
        xAxis: {
          categories: xData,
          gridLineWidth: 1,
          gridLineColor: '#ededef',
          labels: {
            enabled: true,
            style: {
              color: '#999999',
            }
          },
          lineColor: '#dfdfdf',
          tickColor: '#dfdfdf',
          tickLength: 0,
          crosshair: {
            color: '#2E3040',
            width: 1,
            snap: false,
            zIndex: 10
          },
          tickmarkPlacement: 'on',
        },
        yAxis: [{
          tickPositions: [0, 10, 20, 30, 40], // 指定竖轴坐标点的值
          useHTML: true,
          allowDecimals: false,
          gridLineWidth: 1,
          gridLineColor: '#ededef',
          title: {
            text: '',
            margin: 10,
            style: {
              color: '#999999',
              fontSize: 12
            },
          },
          labels: {
            style: {
              color: '#999999',
              fontSize: 12,
              align: 'left'
            },
            formatter: function () {
              return this.value + 'Mbps';
            }
          },
          offset: 0
        }],
        plotOptions: {
          series: {
            allowPointSelect: false,
            cursor: 'pointer',
            borderWidth: 0,
          },
          column: {
            dataLabels: {
              enabled: false,
              style: {
                color: this.color,
                textOutline: false,
                fontWeight: 'normal',
                fontSize: '12px'
              },
              //format:'{y}'
            },
            groupPadding: 0.2,
            borderWidth: 0
          },
          areaspline: {
            dataLabels: {
              enabled: false,
              style: {
                color: '#333',
                textOutline: false,
                fontWeight: 'normal',
                fontSize: '12px'
              }
            },
            lineWidth: 1,
            marker: {
              enabled: true,
              lineWidth: 0,
              lineColor: Highcharts.getOptions().colors[10],
              fillColor: 'rgba(255, 255, 255, 0)',
              symbol: 'circle',
              radius: 3,
              states: {
                hover: {
                  lineWidth: 1,
                  radius: 3,
                  fillColor: 'white'
                }
              }
            },
            zIndex: 9
          }
        },
        legend: {
          enabled: false,
          symbolRadius: 0,
          symbolWidth: 16,
          symbolHeight: 11,
          itemStyle: {
            color: '#999999',
            fontWeight: 'normal'
          },
          itemMarginTop: 8,
          itemMarginBottom: -23
        },
        tooltip: {
          headerFormat: '<small style="font-size:12px;color:#fff;font-famaily:微软雅黑">2020/07/20 {point.key}<br></small><br/>',
          pointFormat: '<span style="color:{series.color};font-size: 12px;">{series.name}</span>: <span style="color:#fff;font-size: 12px;">{point.y}</span><br/>',
          shared: true,
          followPointer: true,
          followPointerMove: true,
          backgroundColor: 'rgba(36,38,53,0.8)',
          borderColor: 'null',
          borderRadius: '3',

        },
        colors: ['#FF5858', '#FF9A00'],
        series: [{
          type: 'areaspline',
          name: 'Online Wireless',
          data: aryX,
          dataLabels: {
            shadow: false,
            enabled: false,
            style: {
              fontWeight: 'normal',
              fontSize: '12px',
              color: '#f8b848',
              fontFamaily: "微软雅黑",
              textOutline: "none",
            },
            formatter: function () {
              return this.y;
            }
          },
          tooltip: {
            pointFormatter: function () {
              var value = this.y;
              return '<br/><div style="font-size: 12px;color:#fff">' + this.series.name + '</div>' + ': '
                + '<span style="color:' + this.series.color + ';font-size: 12px;">' + value + '<span style="color:' + this.series.color + '">Mbps</span></span><br/>';
            }
          },
          fillOpacity: 0.1
        }, {
          type: 'areaspline',
          name: 'Online Wireless',
          data: aryX2,
          dataLabels: {
            shadow: false,
            enabled: false,
            style: {
              fontWeight: 'normal',
              fontSize: '12px',
              color: '#f8b848',
              fontFamaily: "微软雅黑",
              textOutline: "none"
            },
            formatter: function () {
              return this.y > 1000 ? (this.y / 1000).toFixed(2) + 'k' : this.y;
            }
          },
          tooltip: {
            pointFormatter: function () {
              var value = this.y;
              return '<br/><div style="font-size: 12px;color:#fff">' + this.series.name + '</div>' + ': '
                + '<span style="color:' + this.series.color + ';font-size: 12px;">' + value + '<span style="color:' + this.series.color + '">Mbps</span></span><br/>';
            }
          },
          fillOpacity: 0.1
        }]
      });
      console.log(chart)
    })();

    // 对称图
    (() => {
      var chart = Highcharts.chart('symmetry', {
        chart: {
          type: 'area',
          plotBorderWidth: null,
          plotShadow: false,
          marginTop: 30,
          marginRight: 0,
          height: 190,
          width: 530,
          style: {
            fontSize: '12px',
            fontFamily: "微软雅黑",
            fontWeight: "normal",
            color: "#666"
          },
          plotBackgroundColor: '#fff',
          zoomType: 'x'
        },

        credits: {
          enabled: false
        },
        xAxis: {
          categories: ['苹果', '橘子', '梨', '葡萄', '香蕉'],
          gridLineWidth: 0,
          gridLineColor: '#ededef',
          labels: {
            enabled: false,
            style: {
              color: '#999999'
            }
          },
          lineColor: '#dfdfdf',
          tickColor: '#dfdfdf',
          tickLength: 0,
          crosshair: {
            color: '#2E3040',
            width: 1,
            snap: false,
            zIndex: 10
          },
          tickmarkPlacement: 'on'
        },
        yAxis: [{
          // tickPositions: [0, 0.5, 1, 1.5, 2], // 指定竖轴坐标点的值
          useHTML: true,
          allowDecimals: false,
          gridLineWidth: 1,
          gridLineColor: '#ededef',
          title: {
            text: '',
            y: -30,
            x: 10,
            margin: 0,
            style: {
              color: '#999999',
              fontSize: 12
            },
          },

          labels: {
            style: {
              color: '#999999',
              fontSize: 12,
              align: 'left'
            },
            formatter: function () {
              return this.value + 'Mbps';
            }
          },
          offset: 0
        }],
        title: {
          text: '',
          align: 'left',
          x: -10,
          y: 0,
          style: {
            color: '#f88d49',
            fontWeight: 'normal',
            fontSize: '12px'
          },
          margin: 20
        },
        plotOptions: {
          series: {
            allowPointSelect: false,
            cursor: 'pointer',
            borderWidth: 0,
          },
          column: {
            dataLabels: {
              enabled: false,
              style: {
                color: this.color,
                textOutline: false,
                fontWeight: 'normal',
                fontSize: '12px'
              },
              //format:'{y}'
            },
            groupPadding: 0.2,
            borderWidth: 0
          },
          areaspline: {
            dataLabels: {
              enabled: false,
              style: {
                color: '#333',
                textOutline: false,
                fontWeight: 'normal',
                fontSize: '12px'
              }
            },
            lineWidth: 1,
            marker: {
              enabled: true,
              lineWidth: 0,
              lineColor: Highcharts.getOptions().colors[10],
              fillColor: 'rgba(255, 255, 255, 0)',
              symbol: 'circle',
              radius: 3,
              states: {
                hover: {
                  lineWidth: 1,
                  radius: 3,
                  fillColor: 'white'
                }
              }
            },
            zIndex: 9
          }
        },
        legend: {
          enabled: false,
          symbolRadius: 0,
          symbolWidth: 16,
          symbolHeight: 11,
          itemStyle: {
            color: '#999999',
            fontWeight: 'normal'
          },
          itemMarginTop: 8,
          itemMarginBottom: -23
        },

        tooltip: {
          headerFormat: '<small style="font-size:12px;color:#fff;font-famaily:微软雅黑">2020/07/20 {point.key}<br></small><br/>',
          pointFormat: '<span style="color:{series.color};font-size: 12px;">{series.name}</span>: <span style="color:#fff;font-size: 12px;">{point.y}</span><br/>',
          shared: true,
          followPointer: true,
          followPointerMove: true,
          backgroundColor: 'rgba(36,38,53,0.8)',
          borderColor: 'rgba(36,38,53, .8)',

        },
        colors: ['#39CC64', '#4576E4'],

        series: [{
          type: 'areaspline',
          name: 'Uplink',
          data: [0, 3, 4, 7, 2, 0],
          dataLabels: {
            shadow: false,
            enabled: false,
            style: {
              fontWeight: 'normal',
              fontSize: '12px',
              color: '#f8b848',
              fontFamaily: "微软雅黑",
              textOutline: "none"
            },
            formatter: function () {
              return this.y;
            }
          },
          tooltip: {
            pointFormatter: function () {
              var value = this.y;
              return '<br/><div style="font-size: 12px;color:#fff;">' + this.series.name + '</div>' + ': '
                + '<span style="color:' + this.series.color + ';font-size: 12px;">' + value + '<span style="color:' + this.series.color + '">Mbps</span></span><br/>';
            }
          },
          fillOpacity: 0.2
        }, {
          type: 'areaspline',
          name: 'Download',
          data: [0, -7, -1, -5, -2, 0],
          dataLabels: {
            shadow: false,
            enabled: false,
            style: {
              fontWeight: 'normal',
              fontSize: '12px',
              color: '#f8b848',
              fontFamaily: "微软雅黑",
              textOutline: "none"
            },
            formatter: function () {
              return this.y > 1000 ? (this.y / 1000).toFixed(2) + 'k' : this.y;
            }
          },
          tooltip: {
            pointFormatter: function () {
              var value = this.y;
              return '<br/><div style="font-size: 12px;color:#fff">' + this.series.name + '</div>' + ': '
                + '<span style="color:' + this.series.color + ';font-size: 12px;">' + value + '<span style="color:' + this.series.color + '">Mbps</span></span><br/>';
            }
          },
          fillOpacity: 0.4
        }]
      });
      console.log(chart)
    })()

  }
}
</script>
<style lang="scss">
</style>