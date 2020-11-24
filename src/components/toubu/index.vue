<template>
  <div class="header">
    <div class="scan">
      <el-badge :hidden="tableData.length<=0"
                :max=99
                style="margin-top:-1px;"
                :value="tableData.length"
                class="item">
        <el-button @click="openScan">scan</el-button>
      </el-badge>
    </div>
    <!--隧道创建弹框-->
    <cloud-message-box width="400px"
                       :titlecontent="'隧道创建'"
                       :visible.sync="tunelbox">
      <div class="biaoshi">
        <div class="sprite1"></div>
        <span class="tishileft">隧道创建成功,Web配置已连接!</span>
      </div>
      <div class="qusition">
        <span style="margin-left:-15px">若浏览器无法访问，可能的原因:</span>
        <ol>
          <li>请检查是不是浏览器限制;</li>
          <li>请检查是不是开启代理;</li>
          <li>若无法正确打开Web配置页面,可尝试一下任意一种方式打开.</li>
        </ol>
      </div>
      <div class="leftone">
        <div class="prompt"></div>
        <span class="lefttow">可尝试重新创建隧道</span>
      </div>
      <div class="jupmfooter">
        <div class="ipjump">
          <a class="ip"
             href="http://localhost:8080/main/switchlogin"
             target="_black">以IP方式打开</a>
        </div>
        <span slot="footer"></span>
      </div>
    </cloud-message-box>
    <!--弹框表格-->
    <cloud-message-box width="600px"
                       :titlecontent="'自动发现'"
                       :isShowBtn="false"
                       :visible.sync="tunelTablebox">
      <el-table ref="multipleTable"
                :data="tableData"
                tooltip-effect="dark"
                style="width: 100%;margin-top:-30px;overflow:auto;max-height:230px;"
                @selection-change="handleSelectionChange">
        <el-table-column type="selection"
                         width="55">
        </el-table-column>
        <el-table-column label="IP"
                         width="120">
          <template slot-scope="scope">{{ scope.row.ip }}</template>
        </el-table-column>
        <el-table-column prop="macAddres"
                         label="Mac地址"
                         width="120">
        </el-table-column>
        <el-table-column prop="serialNumber"
                         label="序列号"
                         show-overflow-tooltip>
        </el-table-column>
      </el-table>
      <div class="drop-box">
        <cloud-button :btnText="'收纳'"
                      @click="adoptDeviceClick"></cloud-button>
      </div>
    </cloud-message-box>

    <div class="seach">
      <el-input placeholder="请输入内容"
                v-model="input"
                clearable>
      </el-input>
    </div>
    <div class="top-info">
      <div class="username-tip">USERNAME</div>
      <div class="admin">superadmin
        <div class="sprite"></div>
      </div>
    </div>
    <!-- scan弹窗 -->
    <radar-Loading custom-class="tipmessage"
                   v-if="isShowScanMes"
                   :visible.sync="isShowScanMes"
                   width="27%"
                   @radarCloseChange="radarCloseChange"
                   :desc="'自动搜索中，请稍后...'">
    </radar-Loading>
  </div>
</template>
<script>
import { adoptDvicesAll, adoptDevice } from "@service/dashboard/dashboard"
export default {
  data () {
    return {
      //扫描创建中
      isShowScanMes: false,
      //创建form
      tunelbox: false,
      //待收纳Table表格弹框
      tunelTablebox: false,
      input: '',
      value: "",
      tableData: '',
      multipleSelection: []
    };
  },
  methods: {
    //显示自动发现弹窗
    openScan () {
      this.isShowScanMes = true
    },
    //表单checkout勾选回调
    handleSelectionChange (val) {
      this.multipleSelection = val;
    },
    //自动搜索完成回调
    async radarCloseChange (status) {
      if (status) {
        let res = await adoptDvicesAll();
        this.tableData = res.data.data;
        this.tunelTablebox = true
      } else {
        alert('搜索超时，请重试！')
      }
    },
    async adoptDeviceClick () {
      this.multipleSelection.forEach(async (item) => {
        let payload = {}
        payload.ip = item.ip
        payload.sn = item.serialNumber
        let res = await adoptDevice(payload);
        console.log(res)
        if (res.data.success) {
          this.$message({
            message: "ip:" + item.ip + '收纳成功！',
            center: true,
            type: 'success',
            duration: 3000
            
          });
        } else {
          this.$message({
            message: "ip:" + item.ip + '收纳失败！',
            center: true,
            type: 'error',
            duration: 3000
          });
        }
      });
      this.tunelTablebox = false
    }
  },
  async mounted () {
    // let res = await adoptDvicesAll();
    // this.tableData = res.data.data;
    // this.tunelTablebox = true
    // let payload = {}
    // payload.ip = "10.32.138.245"
    // payload.sn = "G1NB1XY000348"
    // let ress = await adoptDevice(payload)
    // console.log(ress)
  }
}
</script>
<style lang="scss" scoped>
a {
  text-decoration: none;
}
.header {
  height: 50px;
  background: #eeeef6;
  display: flex;
  // position: absolute;
  flex: 1;
  align-items: center;
  justify-content: flex-end;
  .scan {
    width: 100px;

    margin-left: 20px;
    /deep/.el-badge__content.is-fixed {
      top: 5px;
    }
  }
}
.seach {
  width: 200px;
  height: 50px;
  display: flex;
  line-height: 50px;
  /deep/ .el-input__inner {
    width: 200px;
    height: 30px;
  }
}

.top-info {
  padding-right: 15px;
  font-size: 12px;
  color: #999;
  line-height: 14px;
  margin-left: 30px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  cursor: pointer;
  .username-tip {
    display: flex;
    white-space: nowrap;
    margin-left: -10px;
  }
  .admin {
    display: flex;
    .sprite {
      background: url("../../assets/img/bg_icon.png") no-repeat -41px -341px;
      width: 9px;
      height: 5px;
      justify-content: flex-end;
      align-items: center;
      margin-top: 5px;
      margin-left: 5px;
    }
  }
}
.drop-box {
  text-align: right;
  margin-top: 20px;
}
</style>