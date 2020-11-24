<template>
  <div class="poe flex">
    <div class="poeheader flex">
      <div class="poetitle">
        POE端口列表
      </div>
      <el-tooltip content="获取数据"
                  placement="bottom-start"
                  effect="light">
        <div class="blueremind"></div>
      </el-tooltip>
      <div class="poetab">
        <cloudTabgroup @group-change="groupChange"
                       :testgroup="['全部','供电','异常','关闭']" />
      </div>
    </div>
    <div class="poelist">
      <el-table :data="poelist"
                style="width: 100%">
        <el-table-column prop="interface"
                         label="端口"
                         width="249">
        </el-table-column>
        <el-table-column prop="swicthpoe"
                         label="POE开关"
                         width="243"
                         v-if="this.data.swicthpoe==enter">
        </el-table-column>

        <el-table-column label="供电状态"
                         width="250">
          <template slot-scope="scope">
            <div slot="reference"
                 class="name-wrapper">
              <el-tag size="medium"
                      type="success"
                      v-if="scope.row.powerstatus =='供电'">{{ scope.row.powerstatus }}</el-tag>
              <el-tag size="medium"
                      type="danger"
                      v-if="scope.row.powerstatus =='关闭'">{{ scope.row.powerstatus }}</el-tag>
              <el-tag size="medium"
                      type="warning"
                      v-if="scope.row.powerstatus =='异常'">{{ scope.row.powerstatus }}</el-tag>
            </div>
          </template>
        </el-table-column>
        <el-table-column prop="avgPower"
                         label="供电功率"
                         width="200">
        </el-table-column>
        <el-table-column prop="class"
                         label="PD Class"
                         width="186">
        </el-table-column>
        <el-table-column prop="abnormal"
                         width="154">
          <template slot="header">
            <div class="tabicon flex align-item-center">
              <span>异常描述</span>
              <el-tooltip content="仅在当前POE状态为异常时有效"
                          placement="bottom-start"
                          effect="light">
                <div class="blueremind"></div>
              </el-tooltip>
            </div>
          </template>
        </el-table-column>
      </el-table>
    </div>
  </div>
</template>
<script>
import { GetPOEList } from "@service/monitor/poe"
export default {
  data () {
    return {
      poelist: [],
      input1: '',
      input2: '',
      tableData: [{
        port: 'Port1',
        swicthpoe: "开启",
        powerstatus: '供电',
        electric: '2.75 W',
        PDClass: '2',
        abnormal: "--"
      }, {
        port: 'Port1',
        swicthpoe: "开启",
        powerstatus: '关闭',
        electric: '2.75 W',
        PDClass: '0',
        abnormal: "--"
      }, {
        port: 'Port1',
        swicthpoe: "开启",
        powerstatus: '异常',
        electric: '2.75 W',
        PDClass: '2',
        abnormal: "这是一条异常数据"
      }, {
        port: 'Port1',
        swicthpoe: "开启",
        powerstatus: '供电',
        electric: '2.75 W',
        PDClass: '2',
        abnormal: "--"
      }]
    }
  },
  props: {
    devicedid: {
      type: String
    },
  },
  methods: {
    groupChange (item, index) {
      console.log(item, index)
    },

    //获取poe列表
    async gitpoelist () {
      this.poedata = await GetPOEList({
        "deviceId": this.devicedid
      })
      typeof (this.poedata.data.data) === 'string' ? this.poelist = [] : this.poelist = this.poedata.data.data;

    }
  },
  mounted () {
    this.gitpoelist()
  }
}
</script>
<style lang="scss">
/deep/ .el-table th > .cell {
  display: flex;
}
.tabicon {
  span {
    padding-right: 2px;
  }
  /deep/ .el-tooltip__popper .is-dark .abnormal {
    background-color: #fff;
    color: #666666;
  }
}
.poe {
  width: 100%;
  flex-direction: column;
  padding-top: 15px;
  // align-items: center;
  .poeheader {
    align-items: center;
    height: 40px;
    .poetitle {
      font-size: 12px;
      font-family: Microsoft YaHei;
      font-weight: 400;
      color: #999999;
      line-height: 18px;
      padding-right: 2px;
    }
    .poetab {
      padding-left: 20px;
      display: flex;
    }
  }
  .poelist {
    width: 100%;
  }
}
</style>