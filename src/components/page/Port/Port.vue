<style lang="scss" scoped>
.pl19 {
  padding-left: 19px;
}
/deep/.el-input__inner {
  width: 360px;
  height: 30px;
  -webkit-appearance: none;
  background-color: #fff;
  background-image: none;
  border-radius: 4px;
  border: 1px solid #dcdfe6;
  box-sizing: border-box;
  color: #606266;
  display: inline-block;
  font-size: inherit;
  line-height: 40px;
  outline: 0;
  padding: 0px 10px;
  transition: border-color 0.2s cubic-bezier(0.645, 0.045, 0.355, 1);
}
/deep/ .el-input__icon {
  height: 110%;
}
.port {
  width: 100%;
  .portheader {
    width: 100%;
    background: #ffffff;
    box-shadow: 0px -1px 0px 0px rgba(164, 167, 181, 0.2);
    padding-bottom: 10px;
    .pagetitle {
      background-color: #fff;
    }
    .prompt {
      span {
        padding-left: 4px;
      }
    }
  }
  .portform {
    padding-top: 20px;
    border-top: 1px solid #a4a7b5;
    .submit {
      width: 16%;
    }
  }
}
</style>
<template>
  <div class="port flex flexcolumn">
    <div class="portheader flex align-item-center">
      <div class="pagetitle">
        <span class="fontsize font-fmaily color-info-title">端口配置</span>
      </div>
      <div class="prompt pl20 flex">
        <div class="oringe"></div>
        <span class="fontsize font-arial color-info-title fs-12 ">Please select the port to be configured</span>
      </div>
    </div>
    <div class="portform  flexcolumn flexwrap pl20">
      <div class="formtitle">
        <span class="fontsize font-arial color-info fs-12">端口已选择 Gi0/13</span>
      </div>
      <div class="flex justifyaround">
        <div class="flex flexcolumn align-item-center">
          <el-row type="flex"
                  class="row-bg">
            <el-col :span="4">
              <div class="grid-content bg-purple flex">
                <span class="fontsize color-info font-family">是否开启</span>
              </div>
            </el-col>
            <el-col :span="6">
              <div class="grid-content bg-purple-light">
                <el-select v-model="value"
                           placeholder="请选择">
                  <el-option v-for="item in options"
                             :key="item.value"
                             :label="item.label"
                             :value="item.value">
                  </el-option>
                </el-select>
              </div>
            </el-col>
          </el-row>
          <el-row type="flex"
                  class="row-bg paddingTop">
            <el-col :span="4">
              <div class="grid-content bg-purple">
                <span class="fontsize color-info font-family">双工模式</span>
              </div>
            </el-col>
            <el-col :span="6">
              <div class="grid-content bg-purple-light">
                <el-select v-model="value"
                           placeholder="请选择">
                  <el-option v-for="item in options"
                             :key="item.value"
                             :label="item.label"
                             :value="item.value">
                  </el-option>
                </el-select>
              </div>
            </el-col>
          </el-row>
          <el-row type="flex"
                  class="row-bg paddingTop pl19">
            <el-col :span="3">
              <div class="grid-content bg-purple">
                <span class="fontsize color-info font-family">速率</span>
              </div>
            </el-col>
            <el-col :span="6">
              <div class="grid-content bg-purple-light">
                <el-select v-model="value"
                           placeholder="请选择">
                  <el-option v-for="item in options"
                             :key="item.value"
                             :label="item.label"
                             :value="item.value">
                  </el-option>
                </el-select>
              </div>
            </el-col>
          </el-row>
          <el-row type="flex"
                  class="row-bg paddingTop">
            <el-col :span="4">
              <div class="grid-content bg-purple">
                <span class="fontsize color-info font-family">端口描述</span>
              </div>
            </el-col>
            <el-col :span="6">
              <div class="grid-content bg-purple-light">
                <el-select v-model="value"
                           placeholder="请选择">
                  <el-option v-for="item in options"
                             :key="item.value"
                             :label="item.label"
                             :value="item.value">
                  </el-option>
                </el-select>
              </div>
            </el-col>
          </el-row>
          <el-row type="flex"
                  class="row-bg paddingTop">
            <el-col :span="4">
              <div class="grid-content bg-purple">
                <span class="fontsize color-info font-family">POE开关</span>
              </div>
            </el-col>
            <el-col :span="6">
              <div class="grid-content bg-purple-light">
                <el-input placeholder="请输入内容"
                          v-model="input"
                          :disabled="true">
                </el-input>
              </div>
            </el-col>
          </el-row>
          <el-row type="flex"
                  class="row-bg paddingTop">
            <el-col :span="2">
              <div class="grid-content bg-purple">
              </div>
            </el-col>
          </el-row>
        </div>
        <div class="flex flexcolumn">
          <el-row type="flex"
                  class="row-bg">
            <el-col :span="5">
              <div class="grid-content bg-purple flex">
                <span class="fontsize color-info font-family">三层口开关</span>
              </div>
            </el-col>
            <el-col :span="6">
              <div class="grid-content bg-purple-light">
                <el-switch v-model="off"
                           active-color="#13ce66"
                           inactive-color="rgba(164, 167, 181, .4)"
                           @click="openStatus">
                </el-switch>
              </div>
            </el-col>
          </el-row>
          <div class="flex flexcolumn"
               v-if="!off">
            <el-row type="flex"
                    class="row-bg paddingTop">
              <el-col :span="5">
                <div class="grid-content bg-purple">
                  <span class="fontsize color-info font-family">端口类型</span>
                </div>
              </el-col>
              <el-col :span="6">
                <div class="grid-content bg-purple-light">
                  <el-select v-model="value"
                             placeholder="请选择"
                             @change="chnagePort">
                    <el-option v-for="item in options"
                               :key="item.value"
                               :label="item.label"
                               :value="item.value">
                    </el-option>
                  </el-select>
                </div>
              </el-col>
            </el-row>
            <el-row type="flex"
                    v-if="value=='1'|| value=='3'"
                    class="row-bg paddingTop"
                    :v-show="show">
              <el-col :span="5">
                <div class="grid-content bg-purple">
                  <span class="fontsize color-info font-family">Native ID</span>
                </div>
              </el-col>
              <el-col :span="6">
                <div class="grid-content bg-purple-light">
                  <el-input v-model="input"
                            placeholder="请输入内容"></el-input>
                </div>
              </el-col>
            </el-row>
            <el-row type="flex"
                    v-if="value=='2' || value=='1' || value=='3'"
                    class="row-bg paddingTop"
                    :v-show="show">
              <el-col :span="5">
                <div class="grid-content bg-purple">
                  <span class="fontsize color-info font-family">Alloeed VLAN</span>
                </div>
              </el-col>
              <el-col :span="6">
                <div class="grid-content bg-purple-light">
                  <el-input v-model="input"
                            placeholder="请输入内容"></el-input>
                </div>
              </el-col>
            </el-row>
            <el-row type="flex"
                    v-if="value=='3'"
                    class="row-bg paddingTop"
                    :v-show="show">
              <el-col :span="5">
                <div class="grid-content bg-purple">
                  <span class="fontsize color-info font-family">Tag类型</span>
                </div>
              </el-col>
              <el-col :span="6">
                <div class="grid-content bg-purple-light">
                  <el-select v-model="value"
                             placeholder="请选择">
                    <el-option v-for="item in options"
                               :key="item.value"
                               :label="item.label"
                               :value="item.value">
                    </el-option>
                  </el-select>
                </div>
              </el-col>
            </el-row>
          </div>
          <div class="flex flexcolumn"
               v-else>
            <el-row type="flex"
                    class="row-bg paddingTop">
              <el-col :span="4">
                <div class="grid-content bg-purple">
                  <span class="fontsize color-info font-family">IP地址类型</span>
                </div>
              </el-col>
              <el-col :span="6">
                <div class="grid-content bg-purple-light">
                  <el-select v-model="value"
                             placeholder="请选择"
                             aria-label="IP地址类型">
                    <el-option v-for="item in options"
                               :key="item.value"
                               :label="item.label"
                               :value="item.value">
                    </el-option>
                  </el-select>
                </div>
              </el-col>
            </el-row>

            <el-row type="flex"
                    class="row-bg paddingTop">
              <el-col :span="4">
                <div class="grid-content bg-purple">
                  <span class="fontsize color-info font-family">IP地址</span>
                </div>
              </el-col>
              <el-col :span="6">
                <div class="grid-content bg-purple-light">
                  <el-input v-model="input"
                            placeholder="请输入内容"></el-input>
                </div>
              </el-col>
            </el-row>

            <el-row type="flex"
                    class="row-bg paddingTop">
              <el-col :span="4">
                <div class="grid-content bg-purple">
                  <span class="fontsize color-info font-family">子网掩码</span>
                </div>
              </el-col>
              <el-col :span="6">
                <div class="grid-content bg-purple-light">
                  <el-input v-model="input"
                            placeholder="请输入内容"></el-input>
                </div>
              </el-col>
            </el-row>
          </div>
        </div>
      </div>
    </div>
    <div class="porttable paddingTop paddingBottom">
      <div class="tableheader flex">
        <div class="tabletitle">
          <span class="fontsize font-arial color-info-title fs-12">Log information</span>
        </div>
        <div class="tabledropdown pl20">
          <clouddropdown :showcontent="'Models: All'"
                         :fixedtitle="'Models:'"
                         :dropdowncontent="dropdowncontent" />
        </div>
        <div class="tabletabgroup ">
          <cloudTabgroup @group-change="groupChange"
                         :testgroup="['All','Turn On','Shut Down']" />
        </div>
        <div class="tabletabgroup pl20">
          <cloudTabgroup @group-change="group"
                         :testgroup="['All','Trunk','Access']" />
        </div>
      </div>
      <div class="porttablist paddingTop"
           v-if="isShowSwitchInfoTable">
        <el-table :data="tableData"
                  :span-method="arraySpanMethod"
                  stripe
                  style="width: 100%">
          <el-table-column prop="portName"
                           label="端口名称"
                           width="180">
          </el-table-column>
          <el-table-column prop="enable"
                           label="是否开启"
                           width="180">
            <template slot-scope="scope">
              <div slot="reference"
                   class="name-wrapper">
                <el-tag size="medium"
                        type="success"
                        Updated
                        upstream
                        v-if="scope.row.enable=='UP'">Trun On</el-tag>
                <el-tag type="danger"
                        v-if="scope.row.enable==='DOWN'">Shut Down</el-tag>
              </div>
            </template>
          </el-table-column>
          <el-table-column prop="actualSpeed"
                           label="状态（端口实际速率）">
            <template slot-scope="scope">
              <div slot="reference"
                   class="name-wrapper">
                <span v-if="scope.row.actualSpeed==='Unknown'">未连接</span>
                <span v-else>连接({{scope.row.actualSpeed}})</span>
              </div>
            </template>
          </el-table-column>
          <el-table-column prop="actualDuplex"
                           label="双工模式（实际生效）">
            <template slot-scope="scope">
              <div slot="reference"
                   class="name-wrapper">
                <span v-if="scope.row.actualDuplex==='UNKNOWN'">未连接</span>
                <span v-if="scope.row.actualDuplex==='FULL'">全双工</span>
                <span v-if="scope.row.actualDuplex==='HALF'">半双工</span>
              </div>
            </template>
          </el-table-column>
          <el-table-column prop="portTypeStr"
                           label="端口类型">
          </el-table-column>
          <el-table-column prop="vlanID"
                           label="VLAN">
            <template slot-scope="scope">
              <div slot="reference"
                   v-if="scope.row.portTypeStr==='access'">
                <span>{{scope.row.vlanID}}</span>
              </div>
              <div slot="reference"
                   v-if="scope.row.portTypeStr==='trunk'">
                <p>{{scope.row.nativeID===""?'--':scope.row.nativeID}}</p>
                <p>{{scope.row.allowedVlan===""?'--':scope.row.allowedVlan}}</p>
              </div>
            </template>
          </el-table-column>
          <el-table-column prop="actualPoe"
                           label="POE供电状态">
            <template slot-scope="scope">
              <div slot="reference">
                <span v-if="scope.row.actualPoe===null">{{scope.row.actualPoe}}</span>
                <span>{{scope.row.actualPoe}}</span>
                <span>{{scope.row.actualPoe}}</span>
              </div>
            </template>
          </el-table-column>
          <el-table-column prop="opration"
                           label="端口操作">
          </el-table-column>
        </el-table>
      </div>
    </div>
  </div>
</template>
<script>
import { GetPortsInfo } from "@service/monitor/port"
export default {
  data () {
    return {
      input: '',
      //开关
      off: false,
      show: true,
      options: [{
        value: '1',
        label: 'Trunk'
      }, {
        value: '2',
        label: 'Access'
      }, {
        value: '3',
        label: 'Hybrid'
      }],
      value: '',
      dropdowncontent: [
        'All',
        'On/offline',
        'Upgrade',
        'Restart',
        'AP mode',
        'Device port information',
        'Device VLAN changes',
        'Device module change'
      ],
      tableData: [{
        port: 'Gi0/1',
        turnon: 'Turn on',
        status: '王小虎',
        duplex: '全双工',
        portType: 'Trunk',
        vlan: '[Native Id] [Vllowed Vlan]1-4094',
        poestatus: '不支持',
        opration: '--'
      }, {
        port: 'Gi0/1',
        turnon: 'Turn on',
        status: '王小虎',
        duplex: '全双工',
        portType: 'Trunk',
        vlan: '[Native Id]<br/>[Vllowed Vlan]1-4094',
        poestatus: '不支持',
        opration: '--'
      }, {
        port: 'Gi0/1',
        status: '王小虎',
        turnon: 'Turn on',
        duplex: '全双工',
        portType: 'Trunk',
        vlan: '[Native Id]<br/>[Vllowed Vlan]1-4094',
        poestatus: '不支持',
        opration: '--'
      }, {
        port: 'Gi0/1',
        turnon: 'Shut Down',
        status: '未连接',
        duplex: '未连接',
        portType: 'Access',
        vlan: '[Native Id]<br/>[Vllowed Vlan]1-4094',
        poestatus: '不支持',
        opration: '--'
      }]
    }
  },
  methods: {
    groupChange (item, index) {
      console.log(item, index)
    },
    group () {

    },
    chnagePort (item) {
      // console.log(item, index)
      // this.options.type = 1
      if (item.value == "1") {
        this.show = false
      } else {
        this.show = true
      }
    },
    openStatus () {

    },
    //table合并列或行
    arraySpanMethod () {

    }
  },
  async created () {
    let res = await GetPortsInfo({ deviceId: "00D0F8-RG%252DS6120%252D20XS4VS2QXS-G1NB1XY000348" });
    this.tableData = res.data.data;
    // this.tableData[5].isThreeLayers = true;
    console.log(this.tableData)
    this.isShowSwitchInfoTable = true;
  }
}
</script>