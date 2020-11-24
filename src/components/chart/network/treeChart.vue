<template>
  <div :id="id"
       :style="{width: '800px', height: '500px', padding: '30px'}">
  </div>
</template>
<script>
export default {
  name: 'treeChart',
  data () {
    return {
      symbol: [
        {
          imgUrl: require('@/assets/img/1/图层 3.png')
        },
        {
          imgUrl: require('@/assets/img/2/图层 6.png')
        },
        {
          imgUrl: require('@/assets/img/3/图层 7.png')
        },
        {
          imgUrl: require('@/assets/img/4/图层 8.png')
        },
        {
          imgUrl: require('@/assets/img/4/6.png')
        },
      ],

      hoversymbol: '',
      treedata: [],
    }
  },
  props: {
    id: {              //id
      type: String
    },
  },
  methods: {
    getchart () {
      var myChart = this.$echarts.init(document.getElementById(this.id))
      // var weatherIcons = {
      //   'Sunny': '../../../src/assets/img/AP.png',
      //   'Cloudy': '@/assets/img/AP.png',
      //   'Showers': '@/assets/img/AP.png'
      // };
      //myChart.on("click", clickFun);
      let option1 = {
        tooltip: {    //提示框组件
          trigger: 'item',    //触发类型，默认：item（数据项图形触发，主要在散点图，饼图等无类目轴的图表中使用）。可选：'axis'：坐标轴触发，主要在柱状图，折线图等会使用类目轴的图表中使用。'none':什么都不触发。
          triggerOn: 'mousemove'    //提示框触发的条件，默认mousemove|click（鼠标点击和移动时触发）。可选mousemove：鼠标移动时，click：鼠标点击时，none：        
        },
        series: [    //系列列表
          {
            roam: true,
            type: 'tree',    //树形结构
            data: this.treedata,
            top: '1%',       //距离上
            left: '13%',      //左
            bottom: '1%',    //下
            right: '20%',    //右的距离
            // symbol: () => {

            // },

            //标记的大小，就是那个小圆圈，默认7

            label: {         //每个节点所对应的标签的样式
              normal: {
                position: 'bottom',       //标签的位置
                verticalAlign: 'middle',//文字垂直对齐方式，默认自动。可选：top，middle，bottom
                align: 'right',         //文字水平对齐方式，默认自动。可选：top，center，bottom
                fontSize: 12,            //标签文字大小
                // formatter: (value) => {
                //   console.log(value.name)
                //   const name = value.name
                //   return `{b|${name}}`
                // },
                // textStyle: {
                //   rich: {
                //     b: {
                //       height: 50,
                //       align: 'center',
                //       backgroundColor: {
                //         image: 'image://https://ss2.bdstatic.com/70cFvnSh_Q1YnxGkpoWK1HF6hhy/it/u=3857605647,1610745729&fm=26&gp=0.jpg'
                //       }
                //     },
                //   }
                // }

                // formatter: [
                //   '{1|}'
                // ].join(),
                // textStyle: {
                //   //rich放在textStyle里面
                //   rich: {
                //     1: {
                //       backgroundColor: {
                //         image: 'https://ss2.bdstatic.com/70cFvnSh_Q1YnxGkpoWK1HF6hhy/it/u=3857605647,1610745729&fm=26&gp=0.jpg'
                //       },
                //       height: 50,
                //       //padding: [20, 0, 0, 20],
                //       width: 50,
                //     },
                //   }
                // }
              }
            },

            leaves: {    //叶子节点的特殊配置，如上面的树图示例中，叶子节点和非叶子节点的标签位置不同
              label: {
                position: 'bottom',
                verticalAlign: 'middle',
                align: 'left'
              }
            },

            expandAndCollapse: true,    //子树折叠和展开的交互，默认打开
            animationDuration: 0,     //初始动画的时长，支持回调函数,默认1000
            animationDurationUpdate: 750//数据更新动画的时长，默认300
          }
        ]
      };
      // this.treedata[0].children[0].children[0].symbol = this.symbol
      myChart.setOption(option1)
      // function clickFun (param) {
      //   console.log(param)
      //   if (param.type == 'click') {
      //     param.data.symbol = "image://https://ss2.bdstatic.com/70cFvnSh_Q1YnxGkpoWK1HF6hhy/it/u=3857605647,1610745729&fm=26&gp=0.jpg"
      //   }

      // }
    }
  },
  mounted () {
    this.getchart();
    //console.log(this.symbol)
    //console.log('image://data:image/png;base64,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')
  },
  created () {
    let that = this
    console.log(that.symbol[0].imgUrl)
    this.treedata = [{
      name: '',
      symbol: 'image://' + that.symbol[4].imgUrl,
      symbolSize: [129, 115],
      children: [
        {
          name: "1",
          lineStyle: {
            color: '#63d389'
          },
          symbol: 'image://' + that.symbol[0].imgUrl,
          symbolSize: [108, 41],
          children: [
            {
              name: '1.1',
              lineStyle: {
                color: '#63d389'
              },
              symbol: 'image://' + that.symbol[1].imgUrl,
              symbolSize: [108, 41],
              children: [
                {
                  name: '1.1.1',
                  lineStyle: {
                    color: '#63d389'
                  },
                  symbol: 'image://' + that.symbol[3].imgUrl,
                  symbolSize: [58, 58],
                },
                {
                  name: '1.1.2',
                  lineStyle: {
                    color: '#63d389'
                  },
                  symbol: 'image://' + that.symbol[3].imgUrl,
                  symbolSize: [58, 58],
                }
              ]
            },
            {
              name: '1.2',
              lineStyle: {
                color: '#63d389'
              },
              symbol: 'image://' + that.symbol[1].imgUrl,
              symbolSize: [108, 41],
              children: [
                {
                  name: '1.2.1',
                  lineStyle: {
                    color: '#63d389'
                  },
                  symbol: 'image://' + that.symbol[3].imgUrl,
                  symbolSize: [58, 58],
                },
                {
                  name: '1.2.2',
                  lineStyle: {
                    color: '#63d389'
                  },
                  symbol: 'image://' + that.symbol[3].imgUrl,
                  symbolSize: [58, 58],
                },
                {
                  name: '1.2.3',
                  lineStyle: {
                    color: '#63d389'
                  },
                  symbol: 'image://' + that.symbol[3].imgUrl,
                  symbolSize: [58, 58],
                }
              ]
            },
            {
              name: '1.3',
              lineStyle: {
                color: '#63d389'
              },
              symbol: 'image://' + that.symbol[2].imgUrl,
              symbolSize: [108, 41],
              children: [
                {
                  name: '1.3.1',
                  lineStyle: {
                    color: '#FF5858',
                    type: 'dotted'
                  },
                  symbol: 'image://' + that.symbol[3].imgUrl,
                  symbolSize: [58, 58],
                }
              ]
            },
          ]
        }
      ]
    }]
  }
}
</script>
<style lang="scss" scoped>
</style>