<template>
  <div class="content">
    <div class="tabbox switch-overview">
      <!-- 头部 -->
      <div class="tabhead clear">
        <div class="leftOne">
          Swich
        </div>
        <div class="lefttwo">
          <clouddropdown :showcontent="'State: All'"
                         :fixedtitle="'State: '"
                         :dropdowncontent="switchstate" />
        </div>
        <div class="leftthree">
          <clouddropdown :showcontent="'Models: All'"
                         :fixedtitle="'Models: '"
                         :dropdowncontent="switchModels" />
        </div>

        <div class="rightone"><i class="el-icon-search"></i></div>
        <div class="righttwo"><i class="el-icon-refresh"></i></div>
        <div class="rightthree">
          <el-switch v-model="switchValue"
                     active-color="#13ce66"
                     inactive-color="#ff4949">
          </el-switch>
        </div>
        <div class="rightfour">
          <el-dropdown trigger="click"
                       placement='bottom-start'
                       @command="handleCommand">
            <el-button type="primary"
                       plain
                       size="mini"
                       @click='morebtnclick'>
              More<i class="el-icon-arrow-down el-icon--right"></i>
            </el-button>
            <el-dropdown-menu slot="dropdown">
              <el-dropdown-item v-for="(item,index) in switchmore"
                                :key="index"
                                :command="item">{{item}}</el-dropdown-item>
            </el-dropdown-menu>
          </el-dropdown>
          <el-drawer :visible.sync="drawercopy"
                     :withHeader="false"
                     size="21%">
            <div class="drawermore-box">
              <div class="drawer-title">
                <div class="title-left">
                  <div class="device-name">复制配置(ES205GC-P)
                  </div>
                </div>
                <div class="title-right">
                  <div class="close-img"
                       @click="drawercopy = false">
                  </div>
                </div>
              </div>
              <div class="tipsbox">
                <div class="tipscontent">
                  <i></i>选中需要复制配置的设备已在列表中过滤
                </div>
                <div class="copybtn">
                  <el-button type="primary"
                             plain
                             size="mini">Copy</el-button>
                </div>
              </div>
              <el-table :data="gridData"
                        stripe>
                <el-table-column type="selection"
                                 width="45">
                </el-table-column>
                <el-table-column property="id"
                                 label="设备序列号"
                                 width="120"></el-table-column>
                <el-table-column property="mac"
                                 label="MAC"
                                 width="144"></el-table-column>
                <el-table-column property="name"
                                 label="设备名称"
                                 width="122"></el-table-column>
              </el-table>
            </div>
          </el-drawer>
        </div>
        <div class="rightfive">
          <el-button type="primary"
                     plain
                     size="mini">SSH</el-button>
        </div>
        <div class="rightseven">
          <el-button type="primary"
                     plain
                     size="mini">Command Assis</el-button>
        </div>
        <div class="righteight">
          <el-button type="primary"
                     plain
                     size="mini"
                     @click="opentunl">EWEB</el-button>
        </div>
      </div>
      <!--eweb 弹窗-->
      <radar-Loading custom-class="tipmessage"
                     v-if="isShowEwebMes"
                     :visible.sync="isShowEwebMes"
                     width="27%"
                     @radarCloseChange="showTunle"
                     :desc="'自动搜索中，请稍后...'"
                     :status="2">
      </radar-Loading>
      <!---隧道创建-->
      <!-- <div class="flex tunlCreate"> -->
      <cloudMessageBox width="400px"
                       :titlecontent="'隧道创建'"
                       :isShowBtn="false"
                       :visible.sync="isShowTunle"
                       :isShowTarget="false">
        <div class="biaoshi">
          <div class="sprite1"></div>
          <span class="tishileft"
                style="color:green">隧道创建成功,Web配置已连接!</span>
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
               target="_black">以IP方式打开</a>
          </div>
          <span slot="footer"></span>
        </div>
      </cloudMessageBox>

      <!-- </div> -->
      <!-- 表单 -->
      <div class="tabfather">
        <el-table :data="devicesList"
                  :row-style="{height:'50px',fontSize:'12px'}"
                  @selection-change="handleSelectionChange"
                  header-row-class-name="tableHead"
                  stripe
                  ref="switchTable"
                  style="width: 100%"
                  @cell-mouse-enter='hoverin'
                  @cell-mouse-leave='hoverout'>
          <el-table-column type="selection"
                           width="55">
          </el-table-column>
          <el-table-column prop="serialNumber"
                           label="S/N"
                           width="199">
            <template slot-scope="scope">
              <div class="sprite clear"></div>
              <a @click="showDetails(scope.row)"
                 class="buttonText">{{scope.row.serialNumber}}</a>
            </template>
          </el-table-column>
          <el-table-column class-name="status-col"
                           label="State"
                           width="167">
            <template slot-scope="scope">
              <!-- <el-tag :type="scope.row.status=='1'?'info':'success'">{{scope.row.state}}</el-tag> -->
              <el-tag size="mini"
                      effect="plain"
                      :type="scope.row.state | statusFilter">{{scope.row.statetext}}</el-tag>
            </template>
          </el-table-column>
          <el-table-column prop="macAddress"
                           label="MAC"
                           width="151">
          </el-table-column>
          <el-table-column prop="productClass"
                           label="Name"
                           width="116">
          </el-table-column>
          <el-table-column prop="managementAddress"
                           label="Management address"
                           width="160">
          </el-table-column>
          <el-table-column prop="exitAddress"
                           label="Exit address"
                           width="133">
          </el-table-column>
          <el-table-column prop="lastInform"
                           label="Last offline"
                           width="134">
          </el-table-column>
          <el-table-column prop="productClass"
                           label="Model"
                           width="179">
          </el-table-column>
          <el-table-column prop="softwareVersion"
                           label="Software version"
                           width="282">
          </el-table-column>
          <el-table-column prop="id"
                           label="Note"
                           width="303">
          </el-table-column>
          <el-table-column label="Actions"
                           width="150">
            <template slot-scope="scope">
              <el-button @click="handleClick(scope.row)"
                         type="text"
                         size="small"
                         class="deletebtn"><i class="el-icon-delete"></i>Delete</el-button>
              <el-button @click='handedit()'
                         type="text"
                         size="small"
                         class="outlinebtn"><i class="el-icon-edit-outline"></i>Edit</el-button>

            </template>
          </el-table-column>
          <el-table-column style="display:none">
            <template slot-scope="scope">
              <div class="hovershow"
                   style="color:#ffbf00;"
                   v-show="scope.row.showRightOp">
                <div>
                  <el-button @click="handleClick(scope.row)"
                             type="text"
                             size="small"
                             class="deletebtn"><i class="el-icon-delete"></i>Delete</el-button>
                  <el-button @click='handedit()'
                             type="text"
                             size="small"
                             class="outlinebtn"><i class="el-icon-edit-outline"></i>Edit</el-button>
                </div>
              </div>
            </template>
          </el-table-column>
        </el-table>
      </div>
    </div>
    <!-- 交换机详情 -->
    <el-drawer :visible.sync="showDrawer"
               :modal="false"
               size="75%"
               v-if="showDrawer"
               :withHeader="false"
               :before-close="handleClose">
      <div class="drawer-box">
        <!-- 头部按钮 -->
        <div class="drawer-title">
          <div class="title-left">
            <div class="bg-img"></div>
            <div class="device-name">NBR6215-E</div>
          </div>
          <div class="title-right">
            <cloud-button selType="primary"
                          btnText="EWEB"
                          class="drawer-btn mg-r10"
                          @click="opentunl"></cloud-button>
            <cloud-button selType="primary"
                          class="drawer-btn mg-r10"
                          btnText="SSH"
                          @click="showCli"></cloud-button>
            <cloud-button selType="primary"
                          class="drawer-btn mg-r10"
                          btnText="命令行助手"></cloud-button>
            <div class="lable">
            </div>
            <div class="close-img"
                 @click="showDrawer = false">
            </div>
          </div>
        </div>
        <!-- 交换机口图 -->
        <div class="switch-box">
          <!--左侧图表 -->
          <div class="box-left">
            <div class="left-head">
              <div class="head-l">
                <span class="l-desc">
                  Interface
                </span>
                <div class="warning-content">
                  <i class="warning"></i>
                  <span>
                    Don't support configure in uplink & downlink port Simultaneously
                  </span>
                </div>
              </div>
              <div class="head-r">
                <cloud-button selType="primary"
                              class="mg-r10"
                              btnText="Select all downlinks port"></cloud-button>
                <cloud-button selType="primary"
                              btnText="Cancel"></cloud-button>
              </div>
            </div>
            <div class="left-content">
              <div class="content">
                <network :toshowtooltip='0'
                         :switchData="switchData"
                         :switchPortdata="switchPortData"
                         @gitid='getInterfaceId' />

              </div>
              <div class="lable"></div>
              <div class="content-desc flex">
                <div class="desc-l">
                  <div class="desc-item"
                       v-for="(item,index) in switchStatus"
                       :key="index">
                    <div :class="['flag',colorCalss(item.status)]"></div>
                    <span>
                      {{item.text}}
                    </span>
                  </div>
                </div>
                <!-- ToolTip -->
                <div class="desc-r theme-font flex">
                  <span>Illustration</span>
                  <el-tooltip popper-class="switch-tooltip"
                              effect="light"
                              placement="bottom-end">
                    <div slot="content"
                         class="tooltip-box flex">
                      <div class="instruction item"
                           :style="i===0?'flex:0.33':i===1?'margin:0 20px;':''"
                           v-for="(items,i) in switchHoverList.title"
                           :key="i">
                        <p class="item-title">
                          {{items}}
                        </p>
                        <div class="instruction-box flex"
                             v-for="(item,index) in i==0?switchHoverList.instruction:i==1?switchHoverList.portRote:switchHoverList.portStatus"
                             :key="index">
                          <div :style="`width: 14px;height: 14px;background:url('${switchHoverList.spriteImg}') no-repeat ${item.imgUrl}`"
                               :class="i===2?item.className:''"></div>
                          <span>{{item.text}}</span>
                        </div>
                      </div>
                    </div>
                    <i class="tooltip"></i>
                  </el-tooltip>
                </div>
              </div>
            </div>
          </div>
          <!-- 交换机图右侧信息编辑栏 -->
          <div class="box-right">
            <span class="info-title fs-14">Information</span>
            <div class="flex item"
                 v-clickoutside="handleEditClose">
              <label>Name</label>
              <div class="flex align-item-center"
                   :style="isShowNameEditInput?'flex:0.9':''"
                   v-if="isShowNameEditInput">
                <input type="text"
                       class="edit-name"
                       ref="editName"
                       v-model="Information.productClass">
              </div>
              <div v-else>
                <span>{{Information.productClass}}</span>
                &nbsp;
                <i class="edit icon"
                   style="margin-left:4px;"
                   @click="isShowEdit('editName')"></i>
              </div>
            </div>
            <div class="flex item">
              <label>Model</label>
              <div>
                {{Information.productClass}}
              </div>
            </div>
            <div class="flex item">
              <label>S/N</label>
              <div>
                {{Information.serialNumber}}
              </div>
            </div>
            <div class="flex item">
              <label>MAC address</label>
              <div>
                {{Information.macAddress}}
              </div>
            </div>
            <div class="flex item">
              <label>Version</label>
              <div>
                {{Information.softwareVersion}}
              </div>
            </div>
            <div class="flex item">
              <label>Management address</label>
              <div>
                {{Information.managementAddress}}
              </div>
            </div>
            <div class="flex item"
                 v-clickoutside="handleEditClose">
              <label>Note</label>
              <div class="flex align-item-center"
                   :style="isShowNoteEditInput?'flex:0.9':''"
                   v-if="isShowNoteEditInput">
                <input type="text"
                       class="edit-name"
                       ref="editNote"
                       v-model="Information.id">
              </div>
              <div v-else>
                <span>{{Information.id}}</span>
                &nbsp;
                <i class="edit icon"
                   style="margin-left:4px;"
                   @click="isShowEdit('editNote')"></i>
              </div>
            </div>
          </div>
        </div>

        <!-- tabs -->
        <div class="drawer-tabs">
          <el-tabs v-model="activeName"
                   @tab-click="clickTabs">
            <el-tab-pane label="Overview"
                         name="Overview">
              <div class="overview-box">
                <!-- cpu图表 -->
                <div class="cpu-chart">
                  <div class="cpu-title">
                    <span class="title-name">
                      CPU & RAM
                    </span>
                    <div class="title-desc">
                      <div class="desc-item">
                        <div class="lable green"></div>
                        <span>CPU</span>
                      </div>
                      <div class="desc-item">
                        <div class="lable blue"></div>
                        <span>RAM</span>
                      </div>
                    </div>
                  </div>
                  <div class="cpu-content">
                    <areaChart :id="'areaChart'"
                               :chartData="areaChartData"></areaChart>
                  </div>
                </div>
                <!-- 连接状态 -->
                <div class="conn">
                  <div class="conn-box flex">
                    <div class="conn-left flex">
                      <span>Status</span>
                      <!-- <el-radio-group v-model="connTabPosition">
                        <el-radio-button label="24h">24h</el-radio-button>
                        <el-radio-button label="days">7&nbsp;days</el-radio-button>
                      </el-radio-group> -->
                      <cloudTabgroup @group-change="groupChangedashboard"
                                     :testgroup="['24h','7 days']" />
                    </div>
                    <div class="conn-right flex">
                      <div class="conn-success flex">
                        <div class="circle bg-success"></div>
                        <div>Connected</div>
                      </div>
                      <div class="conn-disable flex">
                        <div class="circle bg-disable"></div>
                        <div>Disconnected</div>
                      </div>
                    </div>
                  </div>
                  <!-- 连接状态图 -->
                  <dashBoard :connectionData='getconnectlist'
                             style="margin-bottom:50px">
                  </dashBoard>
                </div>
                <!-- 速率图title -->
                <div class="flex rate-title fs-12 color-9A">
                  <div class="rate-title-l flex align-item-center">
                    <span class="rate-title-desc">
                      Rate trend
                      <el-tooltip popper-class="rate-trend-tooltip"
                                  effect="light"
                                  content="Up/down ratein in 5 mins"
                                  placement="top-start">
                        <i></i>
                      </el-tooltip>
                    </span>
                    <el-dropdown class="rate-trend-ul"
                                 placement="bottom-star"
                                 trigger="click"
                                 v-if="showDrawer"
                                 @command="rateDropHandle">
                      <span class="el-dropdown-link"
                            v-text="rateDropValue">
                      </span>
                      <i class="el-icon-arrow-down el-icon--right"></i>
                      <el-dropdown-menu slot="dropdown">
                        <el-dropdown-item v-for="(item,index) in interfaceValuesArray"
                                          :command="`Gi 0/${index}`"
                                          :key="index">{{`Gi 0/${+(index)}`}}</el-dropdown-item>
                      </el-dropdown-menu>
                    </el-dropdown>
                  </div>
                  <div class="rate-title-r flex align-item-center">
                    Uplink port
                  </div>
                </div>
                <!-- 速率图 -->
                <div class="rate-box flex">
                  <div class="rate-chart">
                    <!-- <rateChart></rateChart> -->
                    <areaChart :id="'rateChart'"
                               :width="'92%'"
                               :unit="'Mbps'"
                               :key="nowDate"
                               :chartData="switchRateChartsArray[switchRateChartsStatus].info"></areaChart>
                  </div>
                  <div class="rate-info fs-12 color-info">
                    <div class="flex align-item-center info-item">
                      <span>Port</span>
                      <span>Gi0/1</span>
                    </div>
                    <div class="flex align-item-center info-item">
                      <span>Port rate</span>
                      <span>1000M</span>
                    </div>
                    <div class="flex align-item-center info-item">
                      <span>Duplex mode</span>
                      <span>Full duplex</span>
                    </div>
                    <div class="flex align-item-center info-item">
                      <span>Up/down traffic
                        <el-tooltip popper-class="rate-trend-tooltip"
                                    effect="light"
                                    content="Up/down ratein in 5 mins"
                                    placement="top-start">
                          <i></i>
                        </el-tooltip>
                      </span>
                      <span>Unknown</span>
                    </div>
                    <div class="flex align-item-center info-item">
                      <span>Up/down rate</span>
                      <span>Unknown</span>
                    </div>
                  </div>
                </div>

                <!--neibor表格-->
                <div class="nerborbox fs-12 color-9A">
                  <div class="nerbor-title-box">
                    <span class="nerbor-title-left">Neighbor Device</span>
                    <span class="nerbor-title-con">
                      <el-tooltip popper-class="rate-trend-tooltip"
                                  effect="light"
                                  content=""
                                  placement="top-start"
                                  :disabled='true'>
                        <i></i>
                      </el-tooltip>
                      Please trigger a topo update in <span :style="{color:'#4676E4'}">Overview > Network</span> first
                    </span>
                    <div class="clear refreshicon"></div>
                  </div>
                  <template>
                    <el-table :data="neibortableData"
                              stripe
                              style="width: 100%">
                      <el-table-column prop="localport"
                                       label="Local port"
                                       width="104">
                      </el-table-column>
                      <el-table-column prop="localportstatus"
                                       label="Local port status"
                                       width="125">
                      </el-table-column>
                      <el-table-column prop="peerport"
                                       label="Peer port"
                                       width="89">
                      </el-table-column>
                      <el-table-column prop="peerportstatus"
                                       label="Peer port status"
                                       width="123">
                      </el-table-column>
                      <el-table-column prop="name"
                                       label="Name"
                                       width="126">
                      </el-table-column>
                      <el-table-column prop="sn"
                                       label="S/N"
                                       width="144">
                      </el-table-column>
                      <el-table-column prop="model"
                                       label="Device Model"
                                       width="113">
                      </el-table-column>
                      <el-table-column prop="state"
                                       label="Device state"
                                       width="105">
                      </el-table-column>
                      <el-table-column prop="trafficUp,trafficDown"
                                       label="Up/down traffic"
                                       width="198">
                        <template slot-scope="scope">
                          <span class="upicon">{{scope.row.trafficUp}} <i></i></span>
                          <span class="downicon">{{scope.row.trafficDown}} <i></i></span>
                        </template>
                      </el-table-column>
                      <el-table-column prop="rateUp,rateDown"
                                       label="Up/down rate"
                                       width="172">
                        <template slot-scope="scope">
                          <span class="upicon">{{scope.row.rateUp}} <i></i></span>
                          <span class="downicon"> {{scope.row.rateDown}} <i></i></span>
                        </template>
                      </el-table-column>
                    </el-table>
                  </template>
                </div>

                <!--loginfor表格-->
                <div class="loginfor fs-12 color-9A">
                  <div class="loginfor-title-box flex">
                    <span class="loginfor-title-left">Log information</span>
                    <clouddropdown :dropdowncontent='downcontent' />
                    <cloudTabgroup @group-change="groupChange"
                                   :testgroup="['Device history','Config log','Port history']" />
                  </div>
                  <template>
                    <el-table :data="switchLogArray"
                              stripe
                              style="width: 100%">
                      <el-table-column prop="action"
                                       label="Type"
                                       width="200">
                      </el-table-column>
                      <el-table-column prop="datetime"
                                       label="Update"
                                       width="200">
                      </el-table-column>
                      <el-table-column prop="logContent"
                                       label="Log"
                                       width="900">
                      </el-table-column>
                    </el-table>
                  </template>
                </div>
              </div>
            </el-tab-pane>
            <!-- Port -->
            <el-tab-pane label="Port"
                         name="Port">
              <Port :deviceId="showDetailsId"></Port>
            </el-tab-pane>
            <!-- Config -->
            <el-tab-pane label="Config"
                         name="Config">
              <Config :devicedid='showDetailsId'
                      :interfaceid='interfaceid'></Config>
            </el-tab-pane>
            <!-- POE -->
            <el-tab-pane label="POE"
                         name="POE">
              <Poe :devicedid='showDetailsId'></Poe>
            </el-tab-pane>
            <!-- Diagnose -->
            <el-tab-pane label="Diagnose"
                         name="Diagnose">
              <Diagnose :interfacealias='interfacealias'
                        :devicedid='showDetailsId'></Diagnose>
            </el-tab-pane>
          </el-tabs>
        </div>
      </div>
    </el-drawer>
    <!-- 隧道创建loading -->
    <radar-Loading custom-class="tipmessage"
                   v-if="isShowSSHMes"
                   width="27%"
                   :visible.sync="isShowSSHMes"
                   @radarCloseChange="radarCloseChange"
                   :desc="'SSH创建中，请稍后...'"
                   :status="1">
    </radar-Loading>
    <!-- WebCli -->
    <cloudMessageBox width="800px"
                     :titlecontent="'SSH创建'"
                     :isShowBtn="false"
                     :visible.sync="isShowCli"
                     :isShowTarget="true">
      <iframe src="http://10.32.138.11:2222/ssh/host/10.32.138.245?port=22&ur=admin&pwd=fs.com123"
              frameborder="0"
              width="100%"
              height="720">
      </iframe>
    </cloudMessageBox>
  </div>
</template>
<script>
// CpuWithRam, GetSwitchCharts 
import areaChart from "@components/chart/switch/areaChart"
import { devices, GetSwitchNeighbours, CpuWithRam, GetSwitchCharts, GetSwitchInterface, GetFSDeviceLog, DeleteDevice } from "@service/monitor/switch"
import Config from "@components/page/config/config"
import Poe from "@components/page/Poe/Poe"
import Diagnose from "@components/page/Diagnose/Diagnose"
import Port from "@components/page/Port/Port"
import mixin from "@assets/js/mixin/mixin";
const clickoutside = {
  bind (el, binding) {
    function documentHandler (e) {
      if (el.contains(e.target)) {
        return false;
      }
      if (el && binding.expression) {
        // console.log(el);
        binding.value(e);
      }
    }
    el.__vueClickOutside__ = documentHandler;
    document.addEventListener("click", documentHandler);
  },
  unbind (el) {
    document.removeEventListener("click", el.__vueClickOutside__);
    delete el.__vueClickOutside__;
  }
};

export default {
  name: "cloudSwitch",
  mixins: [mixin],
  data () {
    return {
      //eweb 弹框显示
      isShowEwebMes: false,
      //隧道创建
      isShowTunle: false,
      showDetailsId: '',
      showDetailsClass: '',
      changedashindex: '',
      //state下拉数据
      switchstate: [
        'All',
        'ES205GC-P',
        'NBS228F',
        'S5750C'
      ],
      //models下拉数据
      switchModels: [
        'All',
        'Connected',
        'Povisioning',
        'Restarting',
        'Adopting',
        'Heartbeat Missed',
        'Disconnected',
        'Managed By Other',
        'Upgrading',
        'Pending Adoption'
      ],
      //more下拉数据
      switchmore: [
        'Upgrade',
        'Copy',
        'Restart',
        'Export device',
        'Delivery config'
      ],
      //more中copy的抽屉
      drawercopy: false,
      flag: false,
      rowid: '',
      rowdata: [],
      //switch开关
      switchValue: true,
      //device 设备列表
      // devicesList: [],
      //点击详情，显示抽屉
      showDrawer: false,
      //交换机窗口状态描
      switchStatus: [
        {
          status: 0,
          text: '1G/10G/20G'
        },
        {
          status: 1,
          text: '10M/100M'
        },
        {
          status: 2,
          text: 'Abnormal'
        },
        {
          status: 3,
          text: 'Disconnected'
        },
        {
          status: 4,
          text: 'Closed'
        },
      ],
      //详情抽屉默认显示overView页面tabs
      activeName: "Overview",
      //速率图默认tabs
      connTabPosition: "24h",
      //交换机口Info列表
      switchHoverList: {
        spriteImg: require('@assets/img/bg_icon.png'),
        title: ['Legend Instruction', 'Port Role', 'Port Status'],
        //传输指令
        instruction: [
          { imgUrl: "-42px -592px", text: "Printer" },
          { imgUrl: "-76px -592px", text: "Server" },
          { imgUrl: "-110px -592px", text: "PC" },
          { imgUrl: "-144px -592px", text: "Network Bridge" },
          { imgUrl: "-178px -592px", text: "Wireless AP" },
          { imgUrl: "-212px -592px", text: "Hikvision Camera" },
          { imgUrl: "-246px -592px", text: "IPAD" },
          { imgUrl: "-279px -592px", text: "Gateway" },
        ],
        //交换机口硬件
        portRote: [
          { imgUrl: "-313px -592px", text: "Electrical port" },
          { imgUrl: "-347px -592px", text: "Fibre optical port" },
          { imgUrl: "-380px -592px", text: "Uplinks" },
          { imgUrl: "-414px -592px", text: "POE power port" },
          { imgUrl: "-448px -592px", text: "Abnormal power supply" },
          { imgUrl: "-482px -592px", text: "Blocked port" },
          { imgUrl: "-516px -592px", text: "WAN Port" },
          { imgUrl: "-550px -592px", text: "Aggregate Port" },
          { imgUrl: "-584px -592px", text: "Downlinks" },
        ],
        //交换机口状态
        portStatus: [
          { className: "success", text: "1G/2.5G/10G" },
          { className: "warning", text: "10M/100M" },
          { className: "error", text: "Abnormal" },
          { className: "disable", text: "Disconnected" },
          { className: "closed", text: "Closed" },
        ]
      },
      //Name编辑输入框的显示
      isShowNameEditInput: false,
      //Note编辑输入框的提示
      isShowNoteEditInput: false,
      //交换机图标右侧信息编辑
      Information: {},
      //交换机图表数据
      switchPortData: [],
      switchData: [],
      //速率title下拉model
      rateDropValue: "Port: Gi 0/1",

      //neibor下拉列表数据
      downcontent: [
        'All',
        'On/offline',
        'Upgrade',
        'Restart',
        'AP mode',
        'Device port information',
        'Device VLAN changes',
        'Device module change'
      ],
      //neibor表格数据
      neibortable: {},
      neibortableData: [],
      //loginfor表格数据
      switchLogArray: [],
      //连接状态数据
      getconnectlist: [],
      multipleSelection: '',
      gridData: [{
        id: 'CAN91EV012',
        mac: '0074.9c58.68969',
        name: 'CAL82010156'
      }, {
        id: 'CAN91EV012',
        mac: '0074.9c58.68969',
        name: 'CAL82010156'
      }, {
        id: 'CAN91EV012',
        mac: '0074.9c58.68969',
        name: 'CAL82010156'
      }, {
        id: 'CAN91EV012',
        mac: '0074.9c58.68969',
        name: 'CAL82010156'
      }],
      //面积图看效果假数据
      areaChartRes: require('../../../public/json/cpuChartRes.json'),
      areaChartData: undefined,
      //是否显示SSH弹窗
      isShowSSHMes: false,
      //cli弹窗开关
      isShowCli: false,
      //交换机id
      interfaceid: '',
      //alias值
      interfacealias: '',
      //interfaceValues
      interfaceValuesArray: undefined,
      //获取交换机近1小时走势图表Array
      switchRateChartsArray: undefined,
      //获取交换机近1小时走势图表Array 默认索引0
      switchRateChartsStatus: 0,
      //用于刷新key的变量
      nowDate: Date.now(),
      //连接状态数据7days 24h
      connectionStatusData: {
        twentyFourHours: "",//二十四小时
        sevenDays: ""//七天
      }
    }
  },
  directives: {
    clickoutside
  },
  components: {
    areaChart,
    Config,
    Poe,
    Diagnose,
    Port
  },
  computed: {

  },
  filters: {
    statusFilter (status) {
      const statusMap = {
        7: 'success',
        1: 'success',
        2: 'warning',
        3: 'warning',
        8: 'warning',
        6: 'warning',
        4: 'danger',
        5: 'danger',
        0: 'success',
      }
      return statusMap[status]
    },
  },
  methods: {
    morebtnclick () {
      if (this.multipleSelection == '') {
        this.$notify({
          title: '警告',
          message: '这是一条警告的提示消息',
          type: 'warning'
        });
      } else {
        console.log('22222')
      }
    },
    handleCommand (command) {
      console.log(command);
      if (command == 'Copy') {
        this.drawercopy = true
      }
    },
    //delete
    async handleClick (row) {
      let res = await DeleteDevice({ deviceId: row.id });
      devices().then(res => {
        this.devicesList = res.data.data;
        this.devicesList.forEach(item => {
          item.showRightOp = false
          item.statetext = ''
          if (item.state == 0) {
            item.statetext = 'Connected'
          } else if (item.state == 5) {
            item.statetext = 'Disconnected'
          }
        })
      })
      console.log(res)
    },
    //edit
    handedit () {
      alert('编辑');
    },
    //移入显示Table右侧Action
    hoverin (row) {
      row.showRightOp = true;
      this.$forceUpdate()    //强制更新dom
      let scrollLeft = this.dom.scrollLeft
      let scrollwidth = 2109 - (document.body.clientWidth - 220 - 60) - 80 - 150
      if (scrollLeft >= scrollwidth) {
        row.showRightOp = false
      } else {
        row.showRightOp = true;
      }
    },
    //移出隐藏Table右侧Action
    hoverout (row) {
      row.showRightOp = false
      this.$forceUpdate()
    },
    handleSelectionChange (val) {
      this.multipleSelection = val;
      console.log(val)
    },
    getList () {     //switch列表数据
      devices().then(res => {
        this.devicesList = res.data.data;
        this.devicesList.forEach(item => {
          item.showRightOp = false
          item.statetext = ''
          if (item.state == 0) {
            item.statetext = 'Connected'
          } else if (item.state == 5) {
            item.statetext = 'Disconnected'
          }
        })
      }).catch(e => {
        // throw new Error(e)
        console.log(e)
      })
    },
    //交换机接口列表
    async getinterface () {
      this.switchPortData = await GetSwitchInterface(
        {
          //"deviceId": this.showDetailsId,
          //"productClass": this.showDetailsClass
          "deviceId": '00D0F8-S5310%2D24GT4XS-G1PT4MT00082A',
          "productClass": 'S5310-24GT4XS'
        }
      )
      if (this.switchPortData.data.data != null) {
        this.filtersInterfaceValues();//获取InterfaceValues
        this.switchData = eval('(' + this.switchPortData.data.data.switch_config_data + ')')
        this.switchPortData.data.data.sprite_bg = require('@assets/img/bg_icon.png')
        this.switchData.forEach(element => {
          element.forEach(line => {
            //console.log(line)
            line.forEach(inter => {
              inter.align = ''
              inter = Object.assign(inter, this.switchPortData.data.data.interfaceValues[+(inter.name)])       //合并数组
              inter.isActive = false
              inter.FiberStatus = Math.ceil(Math.random() * 9)                                   //生成1-9随机数
              if (inter.enable == 'true') {
                if (inter.status == 'Down') {
                  inter.align = 'Disconnected'
                } else if (inter.status == 'onload') {
                  inter.align = 'abnormal'
                } else if (inter.status == 'Up') {
                  if (inter.type == 'Fiber') {
                    inter.align = 'Fiber'
                  } else {
                    inter.align = 'copper'
                  }
                }
              } else {
                inter.align = 'closed'
              }
            })
          })
        })
      } else {
        alert('没有数据')
      }
    },
    //获取端口下拉列表
    filtersInterfaceValues () {
      this.interfaceValuesArray = this.switchPortData.data.data.interfaceValues;
    },
    //交换机id alias获取
    getInterfaceId (e, item) {
      this.interfaceid = e
      this.interfacealias = item.alias
    },
    //Neibor 列表数据
    async getneiborlist () {
      this.neibortable = await GetSwitchNeighbours({
        //"node": this.showDetailsId
        "node": '00D0F8-S5310%2D24GT4XS-G1PT4MT00082A'
      })
      this.neibortableData = this.neibortable.data.data
    },
    //获取交换机日志
    async getSwitchLog () {
      let res = await GetFSDeviceLog({ sn: "S5310-24GT4XS" });//获取交换机日志
      this.switchLogArray = res.data.data;
    },
    //展示抽屉，显示交换机详情
    async showDetails (row) {
      this.showDetailsId = row.id
      this.showDetailsClass = row.productClass
      this.Information = row
      //CPU,RAM图表数据
      // let res = await CpuWithRam({ node: this.showDetailsId })//cpuChart  //00D0F8-RG%2DS6120%2D20XS4VS2QXS-G1NB1XY000348
      let res = await CpuWithRam({ node: "00D0F8-RG%2DS6120%2D20XS4VS2QXS-G1NB1XY000348" })
      this.areaChartData = res.data.data.cpu_info;
      this.connectionStatusData.twentyFourHours = res.data.data.cpu_connected_1
      this.connectionStatusData.sevenDays = res.data.data.cpu_connected_7
      this.getconnectlist = this.connectionStatusData.twentyFourHours
      //交换机一个小时走势图
      let ress = await GetSwitchCharts({
        deviceId: this.showDetailsId
      });
      this.switchRateChartsArray = ress.data.data;
      // this.switchRateChartsArray[1].info[2].rateDown = 10000
      // this.switchRateChartsArray[1].info[2].rateUp = 10000
      // this.switchRateChartsArray[1].info[3].rateDown = 5555
      // this.switchRateChartsArray[1].info[3].rateUp = 5555
      this.filterRateChart();
      this.getinterface();//获取交换机接口列表
      this.getneiborlist();//Neibor 列表数据
      this.getSwitchLog();//获取交换机日志
      this.showDrawer = true
    },
    // 除以两个1024
    filterRateChart () {
      this.switchRateChartsArray.forEach(item => {
        item.info.forEach(element => {
          element.rateDown = (+(element.rateDown) / 1024 / 1024).toFixed(2)
          element.rateUp = (+(element.rateUp) / 1024 / 1024).toFixed(2)
        })
      })
    },
    //关闭抽屉
    handleClose () {
      this.showDrawer = false
    },
    //交换机状态描述Class返回color
    colorCalss: (status) => {
      // 对象隐射写法
      const colorCalss = {
        0: () => {
          return 'success'
        },
        1: () => {
          return 'warning'
        },
        2: () => {
          return 'error'
        },
        3: () => {
          return 'disable'
        },
        4: () => {
          return 'failed'
        }
      };
      return colorCalss[status]();
    },
    //点击tabs切换
    clickTabs (status, e) {
      console.log(status, e)
    },
    //编辑图标
    handleEditClose (e) {
      if (e.target.className === "edit icon" || e.target.className === 'edit-name') {
        return
      }
      this.isShowNameEditInput = false
      this.isShowNoteEditInput = false
    },
    //是否显示编辑输入框（交换机图右侧Info）
    isShowEdit (name) {
      if (name === 'editName') {
        this.isShowNameEditInput = !this.isShowNameEditInput
        this.isShowNoteEditInput = false
      } else {
        this.isShowNoteEditInput = !this.isShowNoteEditInput
        this.isShowNameEditInput = false
      }
      this.$nextTick(() => {
        this.$refs[name].focus()
      })
    },
    //速率图下拉Gi 切换回调
    rateDropHandle (command) {
      this.rateDropValue = "Port: " + command;
      //选择了哪一项
      let id = +(command.split('/')[1]) - 1;
      this.switchRateChartsStatus = id;
      this.nowDate = Date.now()
    },
    //24h 7days图表数据切换回调
    groupChangedashboard (item) {
      if (item.index == 1) {
        this.getconnectlist = this.connectionStatusData.sevenDays;
      } else {
        this.getconnectlist = this.connectionStatusData.twentyFourHours;
      }
    },
    groupChange (item, index) {
      console.log(item, index)
    },
    //打开搜索弹框
    opentunl () {
      this.isShowEwebMes = true
    },
    showTunle (status) {
      if (status) {
        this.isShowTunle = true
      }
    },

    //点击SSH显示CLI工具
    showCli () {
      this.isShowSSHMes = !this.isShowSSHMes
    },
    //SSH创建完毕回调
    radarCloseChange (status) {
      if (status) {
        this.isShowCli = true
      }
    },
    test () {
      console.log(this.devicesList)
    }
  },

  async created () {
    this.getList()
    // GetSwitchCharts()//近7天
  },
  mounted () {
    this.dom = this.$refs.switchTable.bodyWrapper;       //获取element表格的dom元素
    this.dom.addEventListener('scroll', this.hoverin);    //获取dom元素的滚动条
  },
  watch: {
    Information: () => {

    }
  }
}
</script>
<style lang="scss">
.el-tooltip__popper.is-light[x-placement^="bottom-end"] .popper__arrow::after,
.el-tooltip__popper.is-light[x-placement^="top-start"] .popper__arrow::after {
  border-top-color: #fff;
  border-bottom-color: #fff;
}
.el-tooltip__popper.is-light[x-placement^="bottom-end"] .popper__arrow,
.el-tooltip__popper.is-light[x-placement^="top-start"] .popper__arrow {
  border-top-color: #fff;
  border-bottom-color: #fff;
}

.hovershow {
  position: fixed;
  right: 30px;
}
.hovershow > div {
  position: relative;
  top: -17px;
  width: 150px;
  //background-color: rgba(245, 247, 250, 1);
  text-align: center;
  background: linear-gradient(
    to right,
    rgba(0, 0, 0, 0) 0%,
    rgba(245, 247, 250, 1) 20%
  );
  background-size: cover;
}
.tunlCreate {
  /deep/.el-dialog__body {
    box-shadow: 0px -1px 0px 0px rgba(164, 167, 181, 0.2);
    border-radius: 3px;
    height: 230px;
    .biaoshi {
      display: flex;
      width: 100%;
      height: 43px;
      margin-top: -15px;
      .sprite1 {
        text-align: center;
        background: url("../../assets/img/bg_icon.png") no-repeat -84px -549px;
        width: 23px;
        height: 23px;
        margin-top: -5px;
      }
      .tishileft {
        flex: 1;
        font-size: 12px;
        margin-left: 10px;
        font-family: Microsoft YaHei;
        font-weight: 400;
        color: #39cc64;
      }
    }
    .qusition {
      width: 348px;
      height: 65px;
      font-size: 12px;
      font-family: Microsoft YaHei;
      font-weight: 400;
      color: #666666;
      line-height: 18px;
      padding-left: 20px;
    }
    .leftone {
      display: flex;
      margin-top: 20px;
      .prompt {
        background: url("../../assets/img/bg_icon.png") no-repeat -367px -335px;
        width: 23px;
        height: 23px;
        margin-top: 5px;
      }
      .lefttow {
        margin-top: 3px;
        margin-left: 4px;
        width: 108px;
        height: 12px;
        font-size: 12px;
        font-family: Microsoft YaHei;
        font-weight: 400;
        color: #9a9a9a;
        line-height: 18px;
      }
    }
    .jupmfooter {
      display: flex;
      justify-content: flex-end;
      .ipjump {
        padding: 1rem;
        height: 30px;
        background: #ffffff;
        border: 1px solid #e3ebfb;
        border-radius: 3px;
        display: flex;
        justify-content: center;
        align-items: center;
        .ip {
          height: 12px;
          font-size: 12px;
          font-family: Microsoft YaHei;
          font-weight: 400;
          color: #4676e4;
          line-height: 18px;
          opacity: 0.8;
        }
      }
      .domain {
        padding: 1rem;
        height: 30px;
        background: #e3ebfb;
        border-radius: 3px;
        margin-left: 10px;
        display: flex;
        justify-content: center;
        align-items: center;

        a {
          text-align: center;
          width: 116px;
          height: 12px;
          font-size: 12px;
          font-family: Microsoft YaHei;
          font-weight: 400;
          color: #4576e4;
          line-height: 18px;
        }
      }
    }
  }
}
</style>
<style lang="scss" scoped>
@import "~@assets/css/switch_overview.scss";
/deep/ :focus {
  outline: 0;
}
/deep/ .el-drawer__body {
  border: 1px solid rgba(164, 168, 182, 0.6);
  box-shadow: -6px 1px 30px 0px rgba(36, 38, 54, 0.2);
}
/deep/ .el-dropdown-menu {
  width: 200px;
  padding: 5px 0;
  top: 20px;
  overflow-y: scroll;
  height: 230px;
}
/deep/.popper__arrow {
  border: 0;
}
/deep/.popper__arrow::after {
  content: none;
}
.el-dropdown-menu {
  width: 200px;
  padding: 0px 0px 0px 0px;
  //top: 20px;
  //height: 240px;
  margin-top: 20px;
}
.el-dropdown-menu__item:focus,
.el-dropdown-menu__item:not(.is-disabled):hover {
  background: rgba(164, 168, 182, 0.2);
  color: #9a9a9a;
}
.el-dropdown-menu__item {
  line-height: 30px;
  font-size: 12px;
}
.content {
  width: 100%;
  .tabbox {
    width: 100%;
    box-sizing: border-box;
    padding: 10px 10px 10px 10px;
    .tabhead {
      width: 100%;
      padding-left: 20px;
      height: 50px;
      background: #ffffff;
      .leftOne {
        width: 40px;
        height: 50px;
        line-height: 50px;
        font-size: 14px;
        font-family: Arial;
        font-weight: 400;
        color: #999999;
        float: left;
      }
      .lefttwo {
        height: 50px;
        line-height: 50px;
        font-size: 12px;
        font-family: Arial;
        font-weight: 400;
        color: #4576e4;
        float: left;
        margin-left: 20px;
      }
      .leftthree {
        height: 50px;
        line-height: 50px;
        font-size: 12px;
        font-family: Arial;
        font-weight: 400;
        color: #4576e4;
        float: left;
        margin-left: 20px;
      }
      .rightone {
        float: right;
        width: 56px;
        height: 30px;
        line-height: 30px;
        padding-left: 20px;
        margin-top: 10px;
        border-left: 1px solid #cccccc;
      }
      .righttwo {
        float: right;
        width: 50px;
        height: 30px;
        line-height: 30px;
        padding-left: 17px;
        margin-top: 10px;
      }
      .rightthree {
        float: right;
        width: 50px;
        height: 30px;
        line-height: 30px;
        padding-left: 5px;
        margin-top: 10px;
      }
      .rightfive {
        margin-left: 10px;
        margin-right: 10px;
      }
      .rightsix {
        margin-left: 10px;
      }
      .rightseven {
        margin-left: 10px;
      }
    }
    .tabfather {
      width: 100%;
      box-sizing: border-box;
      padding: 20px 20px 20px 20px;
      padding-top: 0;
    }
  }
  .drawer-box {
    height: 100vh;
    overflow-y: scroll;
    .drawer-title {
      display: flex;
      justify-content: space-between;
      box-shadow: 0px -1px 10px 0px rgba(164, 168, 182, 0.6);
      .title-left {
        display: flex;
        align-items: center;
        .bg-img {
          background: url("~@assets/img/bg_icon.png") no-repeat -1714px -499px;
          width: 36px;
          height: 12px;
          margin-left: 19px;
          margin-right: 11px;
        }
        .device-name {
          font-size: 14px;
          color: #343434;
        }
      }
      .title-right {
        display: flex;
        align-items: center;
        .drawer-btn {
          padding-top: 7px;
          padding-bottom: 7px;
        }
        .lable {
          margin-left: 20px;
          margin-right: 20px;
          width: 1px;
          height: 30px;
          background: #a4a8b6;
          opacity: 0.2;
        }
        .close-img {
          background: url("~@assets/img/bg_icon.png") no-repeat -163px -337px;
          width: 10px;
          height: 10px;
          margin-right: 19px;
          cursor: pointer;
        }
      }
    }
    .switch-box {
      margin: 20px;
      display: flex;
      .box-left {
        flex: 0.65;
        border: 1px solid rgba(164, 168, 182, 0.2);
        margin-right: 20px;
        padding: 20px;
        padding-top: 0;
        .left-head {
          display: flex;
          justify-content: space-between;
          margin-bottom: 10px;
          margin-top: 10px;
          .head-l {
            display: flex;
            align-items: center;
            .l-desc {
              font-size: 12px;
              color: #9a9a9a;
            }
            .warning-content {
              margin-left: 20px;
              color: #9a9a9a;
              span {
                font-size: 14px;
              }
              .warning {
                background: url("~@assets/img/bg_icon.png") no-repeat -367px -335px;
                width: 13px;
                height: 13px;
                display: inline-block;
              }
            }
          }
          .head-r {
            display: flex;
          }
        }
        .left-content {
          background: #f6f6f7;
          border-radius: 2px;
          // height: 204px;
          padding: 20px;
          .content {
            height: 144px;
          }
          .content-desc {
            // height: 59px;
            padding-top: 13px;
            justify-content: space-between;
            .desc-l {
              display: flex;
              .desc-item {
                margin-right: 19px;
                font-size: 12px;
                color: #999999;
                display: flex;
                align-items: center;
                .flag {
                  width: 7px;
                  height: 7px;
                  margin-right: 5px;
                }
              }
            }
            .desc-r {
              color: #666666;
              align-items: center;
              span {
                margin-right: 4px;
              }
              .tooltip {
                background: url("~@assets/img/bg_icon.png") no-repeat -400px -335px;
                width: 13px;
                height: 13px;
                display: inline-block;
              }
            }
          }
          .lable {
            height: 1px;
            box-shadow: 0px -1px 0px 0px rgba(164, 168, 182, 0.2);
          }
        }
      }
      .box-right {
        flex: 0.35;
        border: 1px solid rgba(164, 168, 182, 0.2);
        padding: 20px 20px 34px 20px;
        font-size: 12px;
        color: #666666;
        .item {
          justify-content: space-between;
          margin-top: 20px;
          line-height: 12px;
          .edit {
            display: inline-block;
            background: url("~@assets/img/bg_icon.png") no-repeat -390px -366px;
            width: 12px;
            height: 12px;
          }
          .edit-name {
            // direction: rtl;
            text-align: right;
            width: 100%;
            border: none;
            box-shadow: 0px 1px 0px 0px #4676e4;
          }
        }
      }
    }
    .drawer-tabs {
      margin: 20px;
      padding: 5px 20px 5px;
      border: 1px solid rgba(164, 167, 181, 0.2);
      /deep/ .el-tabs__item {
        color: #999999;
        font-size: 14px;
      }
      /deep/ .el-tabs__item.is-active {
        color: #4576e4;
      }
      /deep/ .el-tabs__active-bar {
        background-color: #4576e4;
      }
      .overview-box {
        margin-top: 35px;
        .cpu-chart {
          .cpu-title {
            display: flex;
            justify-content: space-between;
            padding-bottom: 11px;
            border-bottom: 1px solid rgba(164, 168, 182, 0.2);
            .title-name {
              font-size: 12px;
              color: #9a9a9a;
            }
            .title-desc {
              display: flex;
              font-size: 12px;
              color: #9a9a9a;
              .desc-item {
                margin-left: 22px;
                .lable {
                  width: 11px;
                  height: 7px;
                  margin-right: 5px;
                  display: inline-block;
                }
                .green {
                  background-image: url("~@assets/img/chart/green.png");
                }
                .blue {
                  background-image: url("~@assets/img/chart/blue.png");
                }
              }
            }
          }
          .cpu-content {
            width: 100%;
            height: 200px;
          }
        }
        .conn-box {
          justify-content: space-between;
          align-items: center;
          padding: 10px 0;
          border-bottom: 1px solid rgba(164, 167, 181, 0.2);
          .conn-left {
            span {
              margin-right: 19px;
              font-size: 12px;
              color: #999999;
              line-height: 26px;
            }
            /deep/ .el-radio-button__inner {
              padding: 6px 15px;
              border-radius: 3px 0px 0px 3px;
              border: 1px solid #242635;
              box-shadow: -1px 0 0 0 #242635;
            }
            /deep/ .el-radio-button__inner:hover {
              background: rgba(255, 255, 255, 0.2);
              color: rgba(0, 0, 0, 1);
            }
            /deep/
              .el-radio-button__orig-radio:checked
              + .el-radio-button__inner {
              background: #242635;
              color: white;
            }
          }
          .conn-right {
            color: #999999;
            font-size: 12px;
            .conn-success {
              align-items: center;
              margin-right: 20px;
            }
            .conn-success :first-child {
              margin-right: 4px;
            }
            .conn-disable {
              align-items: center;
              .disable {
                width: 6px;
                height: 6px;
                background: #39cc64;
                border-radius: 50%;
              }
            }
            .conn-disable :first-child {
              margin-right: 4px;
            }
          }
        }
        .rate-title {
          margin-top: 30px;
          .rate-title-l {
            flex: 0.7;
            margin-right: 50px;
            height: 40px;
            // box-shadow: 0px -1px 0px 0px rgba(164, 168, 182, 0.2);
            border-bottom: 1px solid rgba(164, 168, 182, 0.2);
            .rate-title-desc {
              margin-right: 37px;
              position: relative;
              i {
                display: inline-block;
                background: url("~@assets/img/bg_icon.png") no-repeat -400px -335px;
                width: 13px;
                height: 13px;
                position: absolute;
                right: -16px;
              }
            }
            .rate-trend-ul {
              /deep/ .el-dropdown-menu {
                width: 200px;
                padding: 5px 0;
                top: 20px;
                overflow-y: scroll;
                height: 230px;
              }
              scrollbar-width: none; /* Firefox */
              -ms-overflow-style: none; /* IE 10+ */
              ::-webkit-scrollbar {
                display: none; /* Chrome Safari */
              }

              .el-dropdown-menu__item:focus,
              .el-dropdown-menu__item:not(.is-disabled):hover {
                background: rgba(164, 168, 182, 0.2);
                color: #9a9a9a;
              }
              .el-dropdown-menu__item {
                line-height: 30px;
                font-size: 12px;
              }
            }
          }
          .rate-title-r {
            flex: 0.3;
            border-bottom: 1px solid rgba(164, 168, 182, 0.2);
          }
        }
        .rate-box {
          .rate-chart {
            flex: 0.7;
            margin-right: 50px;
            margin-top: 25px;
          }
          .rate-info {
            flex: 0.3;
            margin-top: 15px;
            .info-item {
              justify-content: space-between;
              margin-top: 20px;
              i {
                display: flex;
              }
            }
            .info-item:first-child {
              margin-top: 15px;
            }
          }
        }
        .nerborbox {
          .nerbor-title-left {
            margin-right: 32px;
          }
          .nerbor-title-box {
            width: 100%;
            height: 40px;
            line-height: 40px;
            .nerbor-title-con {
              margin-right: 37px;
              position: relative;
              i {
                display: inline-block;
                background: url("~@assets/img/bg_icon.png") no-repeat -367px -335px;
                width: 13px;
                height: 13px;
                position: absolute;
                left: -13px;
                top: 0px;
              }
            }
            .refreshicon {
              background: url("~@assets/img/bg_icon.png") no-repeat -143px -302px;
              width: 16px;
              height: 16px;
              float: right;
            }
          }
          .upicon {
            position: relative;
            margin-right: 20px;
            i {
              display: inline-block;
              width: 7px;
              height: 12px;
              background: url("~@assets/img/bg_icon.png") no-repeat -622px -335px;
              margin-top: 4px;
            }
          }
          .downicon {
            position: relative;
            i {
              display: inline-block;
              width: 7px;
              height: 12px;
              background: url("~@assets/img/bg_icon.png") no-repeat -649px -334px;
            }
          }
        }
        .loginfor {
          .loginfor-title-box {
            width: 100%;
            height: 40px;
            line-height: 40px;
            .loginfor-title-left {
              margin-right: 37px;
            }
          }
        }
      }
    }
  }
}
.el-dropdown-link {
  cursor: pointer;
  color: #4576e4;
  font-size: 12px;
  font-family: Arial;
  font-weight: 400;
  .el-icon-arrow-down {
    font-size: 12px;
  }
}
.rightfour,
.rightfive,
.rightsix,
.rightseven,
.righteight {
  float: right;
  height: 30px;
  margin-top: 10px;
  .drawermore-box {
    height: 50px;
    .drawer-title {
      height: 100%;
      border-bottom: 1px solid rgba(164, 168, 182, 0.6);
      display: flex;
      .title-left {
        flex: 1;
        align-items: center;
        height: 100%;
        line-height: 50px;
        .device-name {
          font-size: 14px;
          font-family: Microsoft YaHei;
          font-weight: 400;
          color: #343434;
          line-height: 50px;
          margin-left: 20px;
        }
      }
      .title-right {
        align-items: center;

        .close-img {
          background: url("~@assets/img/bg_icon.png") no-repeat -163px -337px;
          width: 10px;
          height: 10px;
          margin-right: 19px;
          margin-top: 20px;
          cursor: pointer;
        }
      }
    }
    .tipsbox {
      height: 50px;
      display: flex;
      .tipscontent {
        display: flex;
        flex: 1;
        font-size: 12px;
        font-family: Microsoft YaHei;
        font-weight: 400;
        color: #9a9a9a;
        line-height: 50px;
        i {
          display: inline-block;
          width: 13px;
          height: 13px;
          background: url("~@assets/img/bg_icon.png") no-repeat -367px -335px;
          margin-right: 4px;
          margin-top: 19px;
          margin-left: 20px;
        }
      }
      .copybtn {
        margin-right: 20px;
        margin-top: 10px;
      }
    }
  }
  // ::-webkit-scrollbar-thumb {
  //   background-color: #a1a3a9;
  //   border-radius: 3px;
  // }
}
.ro,
.rt,
.re,
.rf,
.rv {
  height: 30px;
  line-height: 30px;
  margin: auto;
  font-size: 12px;
  font-family: Arial;
  font-weight: 400;
  color: black;
}

.tableHead {
  color: #999999;
  font-size: 12px;
  font-family: Arial;
  font-weight: 400;
}
.el-table__header tr,
.el-table__header th {
  padding: 0;
  height: 40px;
}
.el-table__body tr,
.el-table__body td {
  padding: 0;
  height: 40px;
}
.buttonText {
  text-decoration: none;
  color: #4676e4;
  cursor: pointer;
}

.el-dropdown {
  vertical-align: top;
}
.el-dropdown + .el-dropdown {
  margin-left: 15px;
}
.el-icon-arrow-down {
  font-size: 12px;
}
.sprite {
  background: url("~@assets/img/bg_icon.png") no-repeat -1714px -499px;
  width: 36px;
  height: 12px;
  float: left;
  margin-top: 5px;
  margin-right: 19px;
}
// /deep/.el-dialog__wrapper {
// /deep/ .el-dialog {
// }
// }
</style>