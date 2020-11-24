<template>
  <div class="gateway flex flexcolumn">
    <div class="gatewayheader flex justifybetween">
      <div class="gatewaytitle flex">
        <span class="fs-14  color-9A  font-fmaily">Gateway</span>
        <div class="flex pl20">
          <clouddropdown :showcontent="'State: All'"
                         :fixedtitle="'State: '"
                         :dropdowncontent="dropdowncontent" />
        </div>
      </div>
      <div class="gatewaybtn flex">
        <div class="flex">
          <div class="rightfive">
            <el-button type="primary"
                       plain
                       size="mini"
                       @click="showCli">EWEB</el-button>
          </div>
          <div class="rightsix pl10">
            <el-button type="primary"
                       plain
                       size="mini">命令行助手</el-button>
          </div>
          <div class="rightseven pl10">
            <el-button type="primary"
                       plain
                       size="mini">Telent</el-button>
          </div>
          <div class="righteight pl10">
            <el-button type="primary"
                       plain
                       size="mini">SSH</el-button>
          </div>
          <div class="flex pl20">
            <div class="boxleft flex plr-20">
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
              <div class="refresh pl20">
                <el-tooltip class="item"
                            effect="dark"
                            content="Refresh"
                            placement="bottom">
                  <div class="refre"></div>
                </el-tooltip>
              </div>
            </div>
            <div class="search pl20">
              <el-tooltip class="item"
                          effect="dark"
                          content="Search"
                          placement="bottom">
                <div class="searchleft"></div>
              </el-tooltip>

            </div>

          </div>
        </div>
      </div>
    </div>
    <cloud-messagebox :visible.sync="eweb">

    </cloud-messagebox>
    <div class="gatewaytable">
      <el-table ref="multipleTable"
                :data="devicesList"
                tooltip-effect="dark"
                style="width: 100%"
                @selection-change="handleSelectionChange">
        <el-table-column type="selection"
                         width="55">
        </el-table-column>
        <el-table-column prop="serialNumber"
                         label="设备序列号"
                         width="214">
          <template slot-scope="scope">
            <div class="flex">
              <div class="sprite"></div>
              <a class="buttonText pl20">{{ scope.row.serialNumber}}</a>
            </div>
          </template>
        </el-table-column>
        <el-table-column prop="equipmentstatu"
                         label="设备状态"
                         width="180">
          <template slot-scope="scope">
            <div slot="reference"
                 class="name-wrapper">
              <el-tag size="medium">{{scope.row.equipmentstatu}}</el-tag>
            </div>
          </template>
        </el-table-column>
        <el-table-column prop="equipmentname"
                         label="设备名称"
                         width="134">
        </el-table-column>
        <el-table-column prop="address"
                         label="管理地址"
                         width="118">
        </el-table-column>
        <el-table-column prop="export"
                         label="出口地址"
                         width="161">
        </el-table-column>
        <el-table-column prop="offlinetime"
                         label="最后离线时间"
                         width="164">
        </el-table-column>
        <el-table-column prop="device"
                         label="设备型号"
                         width="208">
        </el-table-column>
        <el-table-column prop="version"
                         label="软件版本"
                         width="311">
        </el-table-column>
        <el-table-column prop="remarks"
                         label="备注"
                         width="334">
        </el-table-column>
        <el-table-column label="操作"
                         width="148"
                         fixed="right"
                         show-overflow-tooltip>
          <template slot-scope="scope">
            <div class="flex align-item-center ">
              <div class="delete"></div>
              <el-button class="pl5"
                         @click="handleClick(scope.row)"
                         type="text"
                         size="small">删除</el-button>
              <div class="flex pl20 align-item-center">
                <div class="edit"></div>
                <el-button type="text"
                           size="small">编辑</el-button>
              </div>
            </div>
          </template>
        </el-table-column>

      </el-table>
    </div>
  </div>
</template>
<script>
export default {
  data () {
    return {
      eweb:false,
      off: false,
      dropdowncontent: [
        'All',
        '已连接',
        '同步中',
        '正在重启',
        '正在采用',
        '心跳丢失',
        '连接断开',
        '已被其他控制器管理',
        '升级中',
        '等待采用'
      ],
      devicesList: [{
        serialNumber: 'CAL909C074917',
        equipmentstatu: 'Connected',
        equipmentname: 'ES205GC-P',
        address: '1.0.0.5',
        export: '218.104.234.202',
        offlinetime: '2020/07/22 08:50',
        device: 'NBS5710-24GT4SFP-E-P',
        version: 'ESW_1.0(1)B1P2,Release(07141309)',
        remarks: 'NBS5710-24GT4SFP-E-PNBS5710-24GE-PNBS'
      },],
      multipleSelection: []
    }
  },
  methods: {
    handleSelectionChange (val) {
      this.multipleSelection = val;
    },
    handleClick () {
      console.log(111);
    },
    handedit () {
      alert('编辑');
    },
    showCli () {
      this.eweb = true
    },
    changestyle () {

    }
  },
}
</script>
<style lang="scss" scoped>
.pl10 {
  padding-left: 10px;
}
.gateway {
  width: 100%;
  padding-top: 10px;
  .gatewayheader {
    padding: 19px 20px 17px 20px;
    span {
      font-weight: 400;
      line-height: 18px;
    }
    .boxleft {
      border-left: 1px solid rgba(164, 167, 181, 0.2);
    }
    .search {
      border-left: 1px solid rgba(164, 167, 181, 0.2);
    }
  }
  .gatewaytable {
    display: flex;
    .sprite {
      background: url("~@assets/img/bg_icon.png") no-repeat -1714px -499px;
      width: 36px;
      height: 12px;
    }
    .buttonText {
      text-decoration: none;
      color: #4676e4;
      cursor: pointer;
    }
  }
}
</style>