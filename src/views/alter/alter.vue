<template>
  <div class="alertlists">
    <div class="alertbox">
      <!--header-->
      <div class="tabhead">
        <div class="left">
          <div class="leftone">
            Report
          </div>
          <div class="alllist">
            <el-dropdown placement="bottom-star"
                         @command="handleCommand">
              <span class="el-dropdown-link"
                    v-text="detail">
              </span>
              <i class="el-icon-arrow-down el-icon--right"></i>
              <el-dropdown-menu slot="dropdown">
                <el-dropdown-item command="All alarm type">All alarm type</el-dropdown-item>
                <el-dropdown-item command="Offline alarm">Offline alarm</el-dropdown-item>
                <el-dropdown-item command="Online and offline frequent">Online and offline frequent</el-dropdown-item>
                <el-dropdown-item command="STNU change frequent">STNU change frequent</el-dropdown-item>
                <el-dropdown-item command="All device offline">All device offline</el-dropdown-item>
                <el-dropdown-item command="Channel utilization">Channel utilization</el-dropdown-item>
                <el-dropdown-item command="SIM card limit exceed">SIM card limit exceed</el-dropdown-item>
                <el-dropdown-item command="No GPS">No GPS</el-dropdown-item>
              </el-dropdown-menu>
            </el-dropdown>
            <!-- <el-option v-for="item in options"
                       :key="item.value"
                       :label="item.label"
                       :value="item.value">
            </el-option> -->

          </div>
          <div class="qiehuan">
            <ul class="tabs">
              <el-tabs v-model="activeName"
                       type="card"
                       @tab-click="handleClick">
                <el-tab-pane label="All"
                             name="first"></el-tab-pane>
                <el-tab-pane label="Dismissed"
                             name="fiex"></el-tab-pane>
                <el-tab-pane label="Continue"
                             name="six"></el-tab-pane>
              </el-tabs>

            </ul>
          </div>
          <div class="qiehuantwo">
            <el-tabs v-model="activeName1"
                     type="card"
                     @tab-click="handleClick">
              <el-tab-pane label="All"
                           name="first"></el-tab-pane>
              <el-tab-pane label="Outlets"
                           name="fiex"></el-tab-pane>
              <el-tab-pane label="Device"
                           name="six"></el-tab-pane>
            </el-tabs>

          </div>
          <div class="qiehuanthree">
            <el-tabs v-model="activeName2"
                     type="card"
                     @tab-click="handleClick">
              <el-tab-pane label="All"
                           name="first"></el-tab-pane>
              <el-tab-pane label="Bad"
                           name="Eight"></el-tab-pane>
              <el-tab-pane label="Mid"
                           name="nine"></el-tab-pane>
              <el-tab-pane label="Fair"
                           name="ten"></el-tab-pane>
            </el-tabs>

          </div>

        </div>
        <div class="jihe">
          <div class="lgnone">
            <button class="lgnonebtn"
                    @click="show">lgnone</button>
            <div class="toplgnone"
                 v-show="isShow">
              <div class="leftgreen"></div>
              <div class="leftsize">请先勾选设备</div>
            </div>
          </div>
          <div class="boxleft">
            <div class="turn">
              <el-tooltip class="item"
                          effect="dark"
                          content="Auto-refresh"
                          placement="bottom">
                <el-switch v-model="off"
                           active-color="#13ce66"
                           inactive-color="rgba(164, 167, 181, .4)">
                </el-switch>
              </el-tooltip>
            </div>
            <div class="refresh plr-20">
              <el-tooltip class="item"
                          effect="dark"
                          content="Refresh"
                          placement="bottom">
                <div class="refre"></div>
              </el-tooltip>
            </div>

          </div>
          <div class="search plr-20"
               v-show="searchChange">
            <el-tooltip class="item"
                        effect="dark"
                        content="Search"
                        placement="bottom">
              <div class="searchleft"
                   @click="openSearch"></div>
            </el-tooltip>
          </div>
          <div class="flex plr-23"
               v-show="!searchChange">
            <el-tooltip class="item"
                        effect="dark"
                        content="Closed"
                        placement="bottom">
              <div class="closed"
                   @click="openSearch"></div>
            </el-tooltip>
          </div>
        </div>
      </div>
    </div>
    <div class="flex justifyend paddingTop search-info"
         v-if="searchShow"
         v-cloak>
      <div class="showSearch-input demo-input-suffix flex justifyend">
        <div class="flex">
          <el-input placeholder="start     -     end"
                    prefix-icon="el-icon-date"
                    v-model="input1"
                    size="small">
          </el-input>
        </div>
        <div class="flex paddingleft10">
          <el-input placeholder="S/N"
                    prefix-icon="el-icon-search"
                    v-model="input2"
                    size="small">
          </el-input>
        </div>
        <div class="flex paddingleft10">
          <cloud-button selType="primary"
                        btnText="Search"
                        :selDisabled="false" />
        </div>
      </div>
    </div>

    <div class="tabfather">
      <el-table :data="tableData"
                :row-style="{height:'50px',fontSize:'12px'}"
                :cell-style="{padding:'0px'}"
                @selection-change="handleSelectionChange"
                stripe
                style="width: 100%">
        <el-table-column type="selection"
                         width="55">
        </el-table-column>
        <el-table-column prop="Origin"
                         label="Origin"
                         width="112">
        </el-table-column>
        <el-table-column class-name="status-col"
                         prop="state"
                         label="S/N"
                         :render-header="renderHeader"
                         width="179">
          <template slot-scope="scope">
            <div class="sprite clear"></div>
            <a @click="showDetails(scope.row.state)"
               class="buttonText">{{scope.row.state}}</a>
          </template>

        </el-table-column>
        <el-table-column prop="name"
                         label="Name"
                         width="115">
        </el-table-column>
        <el-table-column prop="type"
                         label="Type"
                         width="195">
        </el-table-column>
        <el-table-column prop="level"
                         label="Level"
                         width="135">
        </el-table-column>
        <el-table-column prop="select"
                         label="Remove or not"
                         width="146">
        </el-table-column>
        <el-table-column prop="detail"
                         label="Detail"
                         width="120">
          <template slot-scope="scope">
            <div class="sprite clear"></div>
            <a @click="showClick(scope.row.detail)"
               class="buttonText">{{scope.row.detail}}</a>
          </template>

        </el-table-column>
        <el-table-column prop="start"
                         label="Start"
                         width="186">
        </el-table-column>
        <el-table-column prop="end"
                         label="End"
                         width="178">
        </el-table-column>
        <el-table-column prop="update"
                         label="Update"
                         width="152">
        </el-table-column>
        <el-table-column fixed="right"
                         width="40"
                         class="menu">
        </el-table-column>
      </el-table>
    </div>
    <el-drawer title="Details"
               :visible.sync="drawer"
               size="400px"
               :with-header="true">
      <div class="fontsize color-info font-arial flex justifycenter">
        The IP address 192.168.3.1 in the network has multiple terminal<br />
        IP address conflicts, which may cause these terminals to surf the<br />
        Internet abnormally.The conflicting terminals include: MAC <br />
        5869.7980.6352; MAC e43a.6e19.c622, connected to the inter-<br />
        face Gi0/7 of the switch G1JD3E000048C.</div>
    </el-drawer>
  </div>
</template>

<script>
export default {
  data () {
    return {
      // cloud: 0,
      // qiehuans: ["All", "Dismissed", "Continue"],
      // contents: ["1", "2", "3"],
      input1: '',
      input2: '',
      searchChange: true,
      searchShow: false,
      drawer: false,
      value: "",
      isShow: false,
      activeClass: '-1',
      activeName: 'first',
      activeName1: 'first',
      activeName2: 'first',
      stretch: false,
      off: true,
      detail: "All alarm type",
      tableData: [
        {
          Origin: "Device",
          state: 'CAL909C074917',
          name: "8317",
          type: "Channel utilization",
          level: "mid",
          select: "No",
          detail: "click",
          start: "2020/07/22 08:50",
          end: "2020/07/22 08:50",
          update: "2020/07/22 08:50",
        },
        {
          Origin: "Device",
          state: 'CAL909C074917',
          name: "8317",
          type: "Channel utilization",
          level: "mid",
          select: "No",
          detail: "click",
          start: "2020/07/22 08:50",
          end: "2020/07/22 08:50",
          update: "2020/07/22 08:50"
        },
        {
          Origin: "Device",
          state: 'CAL909C074917',
          name: "8317",
          type: "Channel utilization",
          level: "mid",
          select: "No",
          detail: "click",
          start: "2020/07/22 08:50",
          end: "2020/07/22 08:50",
          update: "2020/07/22 08:50"
        },
        {
          Origin: "Device",
          state: 'CAL909C074917',
          name: "8317",
          type: "Channel utilization",
          level: "mid",
          select: "No",
          detail: "click",
          start: "2020/07/22 08:50",
          end: "2020/07/22 08:50",
          update: "2020/07/22 08:50"
        },
        {
          Origin: "Device",
          state: 'CAL909C074917',
          name: "8317",
          type: "Channel utilization",
          level: "mid",
          select: "No",
          detail: "click",
          start: "2020/07/22 08:50",
          end: "2020/07/22 08:50",
          update: "2020/07/22 08:50"
        },
        {
          Origin: "Device",
          state: 'CAL909C074917',
          name: "8317",
          type: "Channel utilization",
          level: "mid",
          select: "No",
          detail: "click",
          start: "2020/07/22 08:50",
          end: "2020/07/22 08:50",
          update: "2020/07/22 08:50"
        },
        {
          Origin: "Device",
          state: 'CAL909C074917',
          name: "8317",
          type: "Channel utilization",
          level: "mid",
          select: "No",
          detail: "click",
          start: "2020/07/22 08:50",
          end: "2020/07/22 08:50",
          update: "2020/07/22 08:50"
        },
        {
          Origin: "Device",
          state: 'CAL909C074917',
          name: "8317",
          type: "Channel utilization",
          level: "mid",
          select: "No",
          detail: "click",
          start: "2020/07/22 08:50",
          end: "2020/07/22 08:50",
          update: "2020/07/22 08:50"
        },
        {
          Origin: "Device",
          state: 'CAL909C074917',
          name: "8317",
          type: "Channel utilization",
          level: "mid",
          select: "No",
          detail: "click",
          start: "2020/07/22 08:50",
          end: "2020/07/22 08:50",
          update: "2020/07/22 08:50"
        },
        {
          Origin: "Device",
          state: 'CAL909C074917',
          name: "8317",
          type: "Channel utilization",
          level: "mid",
          select: "No",
          detail: "click",
          start: "2020/07/22 08:50",
          end: "2020/07/22 08:50",
          update: "2020/07/22 08:50"
        },
        {
          Origin: "Device",
          state: 'CAL909C074917',
          name: "8317",
          type: "Channel utilization",
          level: "mid",
          select: "No",
          detail: "click",
          start: "2020/07/22 08:50",
          end: "2020/07/22 08:50",
          update: "2020/07/22 08:50"
        },
        {
          Origin: "Device",
          state: 'CAL909C074917',
          name: "8317",
          type: "Channel utilization",
          level: "mid",
          select: "No",
          detail: "click",
          start: "2020/07/22 08:50",
          end: "2020/07/22 08:50",
          update: "2020/07/22 08:50"
        },
        {
          Origin: "Device",
          state: 'CAL909C074917',
          name: "8317",
          type: "Channel utilization",
          level: "mid",
          select: "No",
          detail: "click",
          start: "2020/07/22 08:50",
          end: "2020/07/22 08:50",
          update: "2020/07/22 08:50"
        },
        {
          Origin: "Device",
          state: 'CAL909C074917',
          name: "8317",
          type: "Channel utilization",
          level: "mid",
          select: "No",
          detail: "click",
          start: "2020/07/22 08:50",
          end: "2020/07/22 08:50",
          update: "2020/07/22 08:50"
        },
        {
          id: 1,
          Origin: "Device",
          state: 'CAL909C074917',
          name: "8317",
          type: "Channel utilization",
          level: "mid",
          select: "No",
          detail: "click",
          start: "2020/07/22 08:50",
          end: "2020/07/22 08:50",
          update: "2020/07/22 08:50"
        }
      ],
      alertItemAry: []
    };
  },
  methods: {
    openSearch () {
      // this.
      this.searchChange = !this.searchChange
      this.searchShow = !this.searchShow
    },
    // closed(){
    //   this.searchShow = false
    // },
    showClick () {
      this.drawer = true
    },
    handleCommand (command) {
      console.log('click on item ' + command);
      this.detail = command;
    },
    show () {
      this.isShow = !this.isShow
      setTimeout(() => {
        this.isShow = !this.isShow
      }, 3000)
    },
    handleClick (tab, event) {
      console.log(tab, event);
    },
    renderHeader (h, { column }) { // h即为cerateElement的简写，具体可看vue官方文档
      return h(
        'div',
        [
          h('span', column.label),
          h('i', {
            class: 'el-icon-top',
            style: 'color:#A4A7B5;padding-top:1px;'
          })
        ],
      );
    },
    //全选
    //alert为一个空数组
    selAll () {
      this.alertItemAry = this.tableData;
    },
    //选中一行
    selOnce (res, row) {
      let flag = true;
      this.alertItemAry.forEach(item => {
        item.id === row.id && (flag = false);
      });
      flag && this.alertItemAry.push(row);
    },
    //table 取消选中某一项
    cancelOnce (res, row) {
      this.alertItemAry.forEach((item, index) => {
        item.id === row.id && this.alertItemAry.splice(index, 1);
      });
    },
    //全选取消状态
    handleSelectionChange (val) {
      this.alertItemAry = val;
    }
  },
  created () {
    this.tableData.forEach((item, index) => {
      item.id = index
    })
  }

};
</script>
<style lang="scss" scoped>
@keyframes search-info {
  from {
    height: 0;
    display: block;
  }
  to {
    height: 50px;
  }
}
.search-info {
  /* x=0代表移回原位置 */
  transform: translateX(0);
  /* 移回也需要0.4s时间过渡 */
  transition: transform 0.4s linear 0s;
}

.search-info {
  /* x=-10px代表左移10px */
  transform: translateY(30px);
  /* 0.4s完成transform移动效果*/
  transition: transform 0.4s linear 0s;
}
/deep/ .el-input--small .el-input__inner {
  height: 30px;
}
//右侧弹框
/deep/ :focus {
  outline: 0;
}
/**下拉菜单**/
/deep/ .el-dropdown-menu__item:focus,
.el-dropdown-menu__item:not(.is-disabled):hover {
  background-color: rgba(164, 167, 181, 0.2);
  color: #666666;
}
/deep/ .el-dropdown-menu {
  width: 200px;
  font-size: 12px;
  border-radius: 2px;
  top: 36px;
  padding: 0;
  margin: 0 0;
}
/deep/ .el-dropdown-menu__item {
  line-height: 18px;
  height: 30px;
  padding: 10px 0 10px 10px;
  font-size: 12px;
  font-family: Arial;
  font-weight: 400;
  color: #666666;
}
.buttonText {
  text-decoration: none;
  color: #4676e4;
  cursor: pointer;
}
/**选项卡**/
/deep/.el-tabs--card > .el-tabs__header .el-tabs__nav {
  border-radius: 3px;
}
/deep/ .el-tabs__nav .is-top {
  align-content: center;
}
/deep/ .el-table {
  color: #666666;
}
/deep/ .el-tabs__item {
  border-bottom: 1px;
  height: 30px;
  box-sizing: border-box;
  line-height: 30px;
  display: inline-block;
  list-style: none;
  font-size: 12px;
  font-weight: 400;
  color: #303133;
  position: relative;
}
/deep/ .el-tabs__item.is-active {
  background: rgba(36, 38, 54, 1);
  color: #ffffff;
}
/deep/ .el-tabs--card > .el-tabs__header .el-tabs__item:first-child {
  border-left: none;
  padding: 0px 24px 0px 22px;
  text-align: center;
  line-height: 30px;
  // background-color: pink;
}
/deep/ .el-tabs__header {
  margin: 0 0 -8px;
}
/deep/
  .el-tabs--top.el-tabs--card
  > .el-tabs__header
  .el-tabs__item:nth-child(2) {
  padding-left: 10px;
  padding-right: 10px;
}
/deep/
  .el-tabs--top.el-tabs--card
  > .el-tabs__header
  .el-tabs__item:last-child {
  padding-left: 10px;
  padding-right: 10px;
}
/deep/ .el-tabs__header {
  margin: 0 0 0;
}
/deep/ .el-table .cell {
  font-size: 13px;
  color: #9a9a9a;
  line-height: 18px;
}
/deep/ .el-dropdown:focus {
  outline: none;
}
/deep/ .el-dropdown-link .el-dropdown-selfdefine {
  color: black;
}
/deep/ .el-icon-top:before {
  font-size: 16px;
}
/**去li的默认样式**/
li {
  list-style: none;
}
.isactive {
  color: #ffffff;
}
.alertlists {
  width: 100%;
  padding: 10px 10px 0px 10px;

  background: #fafafa;
  box-shadow: 1px 2px 4px 0px #dbdbdb;

  // min-width: width 1400px;
  .alertbox {
    width: 100%;
    // box-sizing: border-box;
    display: flex;
    // justify-content: space-around;
    align-items: center;
    .tabhead {
      width: 100%;
      padding-left: 20px;
      height: 50px;
      display: flex;
      justify-content: space-between;
      align-items: center;

      background: #ffffff;
      // float: left;
      .left {
        display: flex;
        justify-content: space-around;
        align-items: center;
        // background-color: skyblue;
        .leftone {
          width: 40px;
          height: 50px;
          line-height: 50px;
          font-size: 14px;
          font-family: Arial;
          font-weight: 400;
          color: #999999;
          float: left;
        }
        .alllist {
          height: 50px;
          line-height: 50px;
          font-size: 12px;
          font-family: Arial;
          font-weight: 400;
          color: #4576e4;
          float: left;
          margin-left: 20px;
          /deep/.el-dropdown-link {
            width: 200px;
            height: 240px;
            cursor: pointer;
            color: #4576e4;
            font-size: 12px;
            font-family: Arial;
            font-weight: 400;
            /deep/.el-dropdown-menu__item {
              font-size: 12px;
              font-family: Arial;
              font-weight: 400;
              color: #666666;
              line-height: 18px;
            }
          }
        }
        .qiehuan {
          width: 206px;
          height: 30px;
          float: left;
          display: flex;
          justify-content: space-around;
          align-items: center;
          margin-left: 20px;
        }
        .qiehuantwo {
          width: 206px;
          height: 50px;
          float: left;
          display: flex;
          justify-content: space-around;
          align-items: center;
          padding-left: 1.25rem;
          margin-left: 20px;
        }
        .qiehuanthree {
          height: 50px;
          float: left;
          display: flex;
          justify-content: space-around;
          align-items: center;
          margin-left: 40px;
        }
      }
      .jihe {
        height: 50ox;
        display: flex;
        justify-content: space-around;
        align-items: center;
        .lgnone {
          display: flex;
          justify-content: space-between;
          display: flex;
          align-items: center;
          border-right: 1px solid rgba(164, 167, 181, 0.2);
          position: relative;
          .lgnonebtn {
            display: inline-block;
            width: 54px;
            height: 30px;
            display: flex;
            justify-content: center;
            align-items: center;
            border: none;
            background: rgba(69, 118, 228, 0.15);
            border-radius: 3px;
            color: #4576e4;
            outline: none;
          }
          .toplgnone {
            width: 167px;
            height: 40px;
            margin-left: 50px;
            position: absolute;
            display: flex;
            justify-content: space-around;
            align-items: center;
            padding: 10px 0;
            background: #ffffff;
            box-shadow: 1px 4px 16px 0px rgba(164, 168, 182, 0.6);
            border-radius: 3px;
            z-index: 1;
            .leftgreen {
              background: url("~@assets/img/bg_icon.png") no-repeat -41px -549px;
              width: 23px;
              height: 23px;
            }
            .leftsize {
              font-size: 13px;
              font-family: Arial;
              font-weight: 400;
              color: #666666;
            }
          }
          .lgnonebtn:hover {
            background-color: #4576e4;
            color: #fff;
            border-color: #4576e4;
          }
        }
        .boxleft {
          display: flex;
          justify-content: space-between;
          .turn {
            // width: 70px;
            height: 30px;
            display: flex;
            justify-content: center;
            align-items: center;
            padding-left: 20px;
            // justify-content: flex-end;
            border-left: 1px solid rgba(164, 167, 181, 0.2);
            /deep/ .el-switch__core {
              text-align: center;
              width: 30px !important;
              height: 16px;
            }
          }
          .refresh {
            // width: 36px;
            height: 30px;
            display: flex;
            justify-content: flex-start;
            align-items: center;
            border-right: 1px solid rgba(164, 167, 181, 0.2);
            .refre {
              background: url("~@assets/img/bg_icon.png") no-repeat -143px -302px;
              width: 16px;
              height: 16px;
              align-items: center;
              // margin-left: -10px;
            }
            .refre:hover {
              background: url("~@assets/img/bg_icon.png") no-repeat -179px -302px;
              width: 16px;
              height: 16px;
              align-items: center;
            }
          }
        }
        .search {
          // width: 50px;
          width: 56px;
          height: 30px;
          display: flex;
          justify-content: center;
          align-items: center;
          // background-color: skyblue;
          .searchleft {
            background: url("~@assets/img/bg_icon.png") no-repeat -74px -302px;
            width: 16px;
            height: 16px;
            text-align: center;
          }
          .searchleft:hover {
            background: url("~@assets/img/bg_icon.png") no-repeat -109px -302px;
            width: 16px;
            height: 16px;
          }
        }
      }
    }
  }
}
/deep/ .el-switch__core:after {
  position: absolute;
  top: -1px !important;
  left: 1px;
}
/deep/ .el-tag--plain {
  border: none;
}
</style>
