<template>
  <div class="allinterbox">
    <div class="box"
         v-for="(column,index1) in switchData"
         :key="index1">
      <div v-for="(row,index2) in column"
           class="line"
           :class="row.length==0?'linenone':''"
           :key="index2">
        <div :class="[index2==0?'interbox':'interboxdown',{'changebg':rowItem.isActive}]"
             @click="clickInterbox(rowItem.name,rowItem)"
             v-for="(rowItem,index3) in row"
             :key="index3">
          <div :class="index2==0?'upidbox':'downidbox'">{{rowItem.name}}</div>
          <!--7条数据hover-->
          <el-tooltip effect="light"
                      popper-class="atooltip"
                      :disabled='showtooltipseven'
                      placement="bottom">
            <div slot="content"
                 class="hovercontent">
              <div class="contentbox">
                Port number: {{rowItem.name}}
              </div>
              <div class="contentbox">
                <div>Port state:</div>
                <div class="colorbox"
                     :class="rowItem.align==='closed'?'closedcolor':
               rowItem.align==='Disconnected'?'Disconnectedcolor':
               rowItem.align==='abnormal'?'abnormalcolor':
               rowItem.align==='Fiber'?'Fibercolor':
               rowItem.align==='copper'?'coppercolor':''"></div>
                <div>{{rowItem.status}}</div>
              </div>
              <div class="contentbox">
                Port rate:{{rowItem.rate}}
              </div>
              <div class="contentbox">
                <div>Flow:</div>
                <div class="upicon"></div>
                <div>{{rowItem.flowup}}</div>
                <div class="downicon"></div>
                <div>{{rowItem.flowdown}}</div>
              </div>
              <div class="contentbox">
                <div>Rate:</div>
                <div class="upicon"></div>
                <div>{{rowItem.rateup}}</div>
                <div class="downicon"></div>
                <div>{{rowItem.ratedown}}</div>
              </div>
              <div class="contentbox">
                <div>All packet:</div>
                <div class="upicon"></div>
                <div>{{rowItem.packet_in}}</div>
                <div class="downicon"></div>
                <div>{{rowItem.packet_out}}</div>
              </div>
              <div class="contentbox">
                <div>Property:</div>
                <div class="bgimgbox"
                     :style="`background:url('${switchPortdata.data.data.sprite_bg}') no-repeat ${colorBgimg(rowItem.FiberStatus)[1]}`"></div>
                <div>{{rowItem.property}}</div>
              </div>
            </div>
            <div class="inter"
                 v-show="showinterseven"
                 :class="rowItem.align==='closed'?'closed':
               rowItem.align==='Disconnected'?'Disconnected':
               rowItem.align==='abnormal'?'abnormal':
               rowItem.align==='Fiber'?'Fiber':
               rowItem.align==='copper'?'copper':''">
              <div :class="index2==0?'imgbox':'imgboxdow'"
                   :style="`background:url('${switchPortdata.data.data.sprite_bg}') no-repeat ${colorBgimg(rowItem.FiberStatus)[0]}`">
              </div>
            </div>
          </el-tooltip>

          <!--2条数据hover-->
          <el-tooltip effect="light"
                      popper-class="atooltip"
                      :disabled='showtooltiptwo'
                      placement="bottom">
            <div slot="content"
                 class="hovercontent">
              <div class="contentbox">
                Port number: {{rowItem.value}}
              </div>
              <div class="contentbox">
                <div>Property:</div>
                <div class="bgimgbox"
                     :style="`background:url('${switchPortdata.data.data.sprite_bg}') no-repeat ${colorBgimg(rowItem.FiberStatus)[1]}`"></div>
                <div>{{rowItem.property}}</div>
              </div>
            </div>
            <div class="inter"
                 v-show="showintertwo"
                 :class="rowItem.align==='closed'?'closed':
               rowItem.align==='Disconnected'?'Disconnected':
               rowItem.align==='abnormal'?'abnormal':
               rowItem.align==='Fiber'?'Fiber':
               rowItem.align==='copper'?'copper':''">

              <div :class="index2==0?'imgbox':'imgboxdow'"
                   :style="`background:url('${switchPortdata.data.data.sprite_bg}') no-repeat ${colorBgimg(rowItem.FiberStatus)[0]}`">
              </div>
            </div>
          </el-tooltip>

          <!--3条数据hover-->
          <el-tooltip effect="light"
                      popper-class="atooltip"
                      :disabled='showtooltipthree'
                      placement="bottom">
            <div slot="content"
                 class="hovercontent">
              <div class="contentbox">
                Port number: {{rowItem.value}}
              </div>
              <div class="contentbox">
                <div>Port state:</div>
                <div class="colorbox"
                     :class="rowItem.align==='closed'?'closedcolor':
               rowItem.align==='Disconnected'?'Disconnectedcolor':
               rowItem.align==='abnormal'?'abnormalcolor':
               rowItem.align==='Fiber'?'Fibercolor':
               rowItem.align==='copper'?'coppercolor':''"></div>
                <div>{{rowItem.status}}</div>
              </div>
              <div class="contentbox">
                <div>Property:</div>
                <div class="bgimgbox"
                     :style="`background:url('${switchPortdata.data.data.sprite_bg}') no-repeat ${colorBgimg(rowItem.FiberStatus)[1]}`"></div>
                <div>{{rowItem.property}}</div>
              </div>
            </div>
            <div class="inter"
                 v-show="showinterthree"
                 :class="rowItem.align==='closed'?'closed':
               rowItem.align==='Disconnected'?'Disconnected':
               rowItem.align==='abnormal'?'abnormal':
               rowItem.align==='Fiber'?'Fiber':
               rowItem.align==='copper'?'copper':''">

              <div :class="index2==0?'imgbox':'imgboxdow'"
                   :style="`background:url('${switchPortdata.data.data.sprite_bg}') no-repeat ${colorBgimg(rowItem.FiberStatus)[0]}`">
              </div>
            </div>
          </el-tooltip>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: 'network',
  data () {
    return {
      showtooltipseven: true,
      showinterseven: false,
      showtooltiptwo: true,
      showintertwo: false,
      showtooltipthree: true,
      showinterthree: false,
      //isActive: false,

      // switchPortData: [null],
      //switchData: [],
    }
  },
  props: {
    toshowtooltip: {
      type: Number,
    },
    switchData: {
      type: Array,
    },
    switchPortdata: {
    },
  },
  methods: {
    clickInterbox (e, item) {
      this.$emit("gitid", e, item)
      item.isActive = !item.isActive
      this.$forceUpdate()
    },
    colorBgimg: (status) => {
      const colorbgimg = {
        1: () => {
          return [
            '-618px -592px',
            '-313px -592px'
          ]
        },
        2: () => {
          return [
            '-652px -592px',
            '-347px -592px'
          ]
        },
        3: () => {
          return [
            '-686px -592px',
            '-380px -592px'
          ]
        },
        4: () => {
          return [
            '-788px -592px',
            '-414px -592px'
          ]
        },
        5: () => {
          return [
            '-754px -592px',
            '-448px -592px'
          ]
        },
        6: () => {
          return [
            '-720px -592px',
            '-482px -592px'
          ]
        },
        7: () => {
          return [
            '-822px -592px',
            '-516px -592px'
          ]
        },
        8: () => {
          return [
            '-856px -592px',
            '-550px -592px'
          ]
        },
        9: () => {
          return [
            '-890px -592px',
            '-584px -592px'
          ]
        }
      };
      return colorbgimg[status]();
    }

  },
  computed: {


  },
  created () {
  },
  mounted () {
    //console.log(this.detailid)
    if (this.toshowtooltip === 0) {     //0为有7个数据的hover
      this.showtooltipseven = false
      this.showinterseven = true
    } else if (this.toshowtooltip === 1) {   //1为有两个数据的hover
      this.showtooltiptwo = false
      this.showintertwo = true
    } else if (this.toshowtooltip === 2) {   //2为有三个数据的hover
      this.showtooltipthree = false
      this.showinterthree = true
    }

    //console.log(this.detailid)



  },
  watch: {

  }

}
</script>
<style lang="scss" scoped>
.hovercontent {
  font-size: 12px;
  font-family: Arial;
  font-weight: 400;
  color: #666666;
  line-height: 18px;
  .contentbox:last-child {
    margin-bottom: 0px;
  }
  .contentbox {
    width: 100%;
    display: flex;
    margin-bottom: 5px;
    .upicon {
      width: 7px;
      height: 12px;
      background: url("~@assets/img/bg_icon.png") no-repeat -622px -335px;
      margin-left: 4px;
      margin-right: 4px;
      margin-top: 2px;
    }
    .downicon {
      width: 7px;
      height: 12px;
      background: url("~@assets/img/bg_icon.png") no-repeat -649px -334px;
      margin-left: 4px;
      margin-right: 4px;
      margin-top: 2px;
    }
    .bgimgbox {
      width: 14px;
      height: 14px;
      margin-left: 4px;
      margin-right: 4px;
      margin-top: 2px;
    }
    .colorbox {
      width: 14px;
      height: 14px;
      border-radius: 2px;
      margin: 2px;
    }
    .closedcolor {
      background-color: #999999;
    }
    .Disconnectedcolor {
      background: #333333;
    }
    .abnormalcolor {
      background-color: #ff5858;
    }
    .Fibercolor {
      background-color: #f5a624;
    }
    .coppercolor {
      background-color: #39cc64;
    }
  }
}
.allinterbox {
  width: 100%;
  display: flex;
  justify-content: center;

  .box {
    .line {
      display: flex;
      margin-left: 15px;
      margin-right: 15px;
      margin-bottom: 10px;
      .changebg {
        background: rgba(69, 118, 228, 0.2);
      }
    }
    .linenone {
      height: 38px;
    }
    .interbox {
      padding-left: 5px;
      padding-right: 5px;
      display: flex;
      flex-direction: column;

      .inter {
        width: 20px;
        height: 20px;
        overflow: auto;
        border-radius: 2px;
        padding: 3px;
      }
      .closed {
        background-color: #999999;
        .imgbox {
          width: 14px;
          height: 14px;
        }
        .imgboxdow {
          transform: rotate(180deg);
          filter: progid:DXImageTransform.Microsoft.BasicImage(rotation=2);
          width: 14px;
          height: 14px;
        }
      }
      .Disconnected {
        background: #333333;
        .imgbox {
          width: 14px;
          height: 14px;
        }
        .imgboxdow {
          transform: rotate(180deg);
          filter: progid:DXImageTransform.Microsoft.BasicImage(rotation=2);
          width: 14px;
          height: 14px;
        }
      }
      .abnormal {
        background-color: #ff5858;
        .imgbox {
          width: 14px;
          height: 14px;
        }
        .imgboxdow {
          transform: rotate(180deg);
          filter: progid:DXImageTransform.Microsoft.BasicImage(rotation=2);
          width: 14px;
          height: 14px;
        }
      }
      .Fiber {
        background-color: #f5a624;
        .imgbox {
          width: 14px;
          height: 14px;
        }
        .imgboxdow {
          transform: rotate(180deg);
          filter: progid:DXImageTransform.Microsoft.BasicImage(rotation=2);
          width: 14px;
          height: 14px;
        }
      }
      .copper {
        background-color: #39cc64;
        .imgbox {
          width: 14px;
          height: 14px;
        }
        .imgboxdow {
          transform: rotate(180deg);
          filter: progid:DXImageTransform.Microsoft.BasicImage(rotation=2);
          width: 14px;
          height: 14px;
        }
      }
      .upidbox {
        font-size: 10px;
        font-family: Microsoft YaHei;
        font-weight: 400;
        color: #999999;
        line-height: 18px;
        text-align: center;
      }
      .downidbox {
        font-size: 10px;
        font-family: Microsoft YaHei;
        font-weight: 400;
        color: #999999;
        line-height: 18px;
        text-align: center;
      }
    }
    .interboxdown {
      padding-left: 5px;
      padding-right: 5px;
      display: flex;
      flex-direction: column-reverse;
      .inter {
        width: 20px;
        height: 20px;
        overflow: auto;
        border-radius: 2px;
        padding: 3px;
      }
      .hovercontent {
        font-size: 12px;
        font-family: Arial;
        font-weight: 400;
        color: red;
        line-height: 18px;
      }
      .closed {
        background-color: #999999;
        .imgbox {
          width: 14px;
          height: 14px;
        }
        .imgboxdow {
          transform: rotate(180deg);
          filter: progid:DXImageTransform.Microsoft.BasicImage(rotation=2);
          width: 14px;
          height: 14px;
        }
      }
      .Disconnected {
        background: #333333;
        .imgbox {
          width: 14px;
          height: 14px;
        }
        .imgboxdow {
          transform: rotate(180deg);
          filter: progid:DXImageTransform.Microsoft.BasicImage(rotation=2);
          width: 14px;
          height: 14px;
        }
      }
      .abnormal {
        background-color: #ff5858;
        .imgbox {
          width: 14px;
          height: 14px;
        }
        .imgboxdow {
          transform: rotate(180deg);
          filter: progid:DXImageTransform.Microsoft.BasicImage(rotation=2);
          width: 14px;
          height: 14px;
        }
      }
      .Fiber {
        background-color: #f5a624;
        .imgbox {
          width: 14px;
          height: 14px;
        }
        .imgboxdow {
          transform: rotate(180deg);
          filter: progid:DXImageTransform.Microsoft.BasicImage(rotation=2);
          width: 14px;
          height: 14px;
        }
      }
      .copper {
        background-color: #39cc64;
        .imgbox {
          width: 14px;
          height: 14px;
        }
        .imgboxdow {
          transform: rotate(180deg);
          filter: progid:DXImageTransform.Microsoft.BasicImage(rotation=2);
          width: 14px;
          height: 14px;
        }
      }
      .upidbox {
        font-size: 10px;
        font-family: Microsoft YaHei;
        font-weight: 400;
        color: #999999;
        line-height: 18px;
        text-align: center;
      }
      .downidbox {
        font-size: 10px;
        font-family: Microsoft YaHei;
        font-weight: 400;
        color: #999999;
        line-height: 18px;
        text-align: center;
      }
    }
  }
}
</style>