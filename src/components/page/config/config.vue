<template>
  <div class="config">
    <div class="configtitle">
      <div class="titlelog">
        VLAN列表
      </div>
      <div class="caozuo">
        <div class="tianjia"
             @click="openMessagebox">
          <div class="plus"></div>
          <div class="add">
            Add Vlan
          </div>
          <cloudMessageBox width="400px"
                           :titlecontent="'Add VLAN'"
                           :visible.sync="addOrderVisible"
                           @confirm="addOrderconfirm"
                           :cellbtntext="'Cancel'"
                           :sumbtntext="'Confirm'">
            <span class="fontsize color-info font-arial pt20">Vlan ID</span>
            <div class="input">
              <el-input v-model="inputVlan"
                        placeholder="Input"></el-input>
            </div>
          </cloudMessageBox>
        </div>
        <div class="refresh">
          <el-tooltip class="item"
                      effect="dark"
                      content="Refresh"
                      placement="bottom">
            <div class="refre"></div>
          </el-tooltip>
        </div>
      </div>
    </div>
    <div class="vlantab paddingtop10">
      <!-- <el-table :data="tableData.filter(data => !search || data.name.toLowerCase().includes)" -->
      <el-table :data="vlanList"
                stripe
                style="width: 100%">
        <el-table-column label="Vlan ID"
                         prop="id"
                         width="122">
        </el-table-column>
        <el-table-column label="包含端口"
                         prop="ports"
                         width="1040">
        </el-table-column>
        <el-table-column label="操作"
                         width="119">
          <template slot-scope="scope">
            <i class="el-icon-delete"
               size="mini"
               type="danger"
               @click="handleDelete(scope.$index, scope.row)">Delete</i>
          </template>
        </el-table-column>
      </el-table>
      <cloudMessageBox width="400px"
                       :titlecontent="'删除'"
                       :visible.sync="deletemessagebox"
                       @confirm="deletemessage"
                       :cellbtntext="'Cancel'"
                       :sumbtntext="'Confirm'">
        <span class="color-info fontsize font-fmaily ">
          确认删除VLAN ID吗？
        </span>
      </cloudMessageBox>
    </div>
    <div class="tabtwo">
      <div class="titletwo">
        SVI&DHCP
      </div>
      <div class="sviadd">
        <div class="control"
             @click="openSvi">
          <div class="plus"></div>
          <div class="adddh">
            Add SVI&DHCP
          </div>
        </div>
        <cloudMessageBox width="400px"
                         :titlecontent="'Add SVI&DHCP'"
                         :visible.sync="addSvimessage"
                         @confirm="deleteconfirm"
                         :cellbtntext="'Cancel'"
                         :sumbtntext="'Confirm'">
          <div class="inputmessage">
            <div class="paddingTop paddingBottom">
              <span class="fontsize color-info font-arial">Vlan ID</span>
              <el-input v-model="interfaceid"
                        @interfaceid="show"></el-input>

            </div>
            <div class="paddingtop10 paddingBottom">
              <span class="fontsize color-info font-arial">IP地址</span>
              <el-input v-model="inputIp"></el-input>
            </div>
            <div class="paddingtop10 paddingBottom">
              <span class="fontsize color-info font-arial">子网掩码</span>
              <el-input v-model="inputChildre"></el-input>
            </div>
            <div class="paddingtop10 paddingBottom">
              <span class="fontsize color-info font-arial">DHCP服务</span>
              <el-switch v-model="dhcp"
                         active-color="#13ce66"
                         inactive-color="#DCDFE6">
              </el-switch>
            </div>
            <div v-show="dhcp"
                 class="dhcpserve">
              <div class="flex flexcolumn paddingtop10 paddingBottom">
                <span class="fontsize color-info font-arial">名称</span>
                <el-input v-model="interfaceid"
                          placeholder="Input"></el-input>
              </div>
              <div class="flex flexcolumn paddingtop10 paddingBottom">
                <span class="fontsize color-info font-arial">
                  Ip分配网段
                </span>
                <el-input v-model="dhcpip"
                          placeholder="Input"></el-input>

              </div>
              <div class="flex flexcolumn paddingtop10 paddingBottom">
                <span class="fontsize color-info font-arial">掩码</span>

                <el-input v-model="dhcpaddress"
                          placeholder="Input"></el-input>
              </div>
              <div class="flex flexcolumn paddingtop10 paddingBottom">
                <span class="fontsize color-info font-arial">网关地址</span>

                <el-input v-model="dhcpgateway"
                          placeholder="Input"></el-input>
              </div>
              <div class="flex align-item-center "> <input type="checkbox"
                       class="radio"
                       v-model="inputcheckbox"><span class="fontsize color-info font-arial paddingleft10">高级选项</span>
              </div>
              <div class="flex flexcolumn"
                   v-show="inputcheckbox">
                <div class="lasettiem paddingTop">
                  <div class="timetitle flex">
                    租用时间
                  </div>
                  <div class="flex justifybetweent">
                    <div class="demo-input-suffix flex ">
                      <div class="flex">
                        <el-input placeholder="Input"
                                  v-model="input1"
                                  class="hireTime">
                        </el-input>
                      </div>
                      <div class="flex paddingleft10">
                        <el-select v-model="gis.value"
                                   placeholder="Gi"
                                   class="selectGi">
                          <el-option v-for="item in gis"
                                     :key="item.value"
                                     :label="item.label"
                                     :value="item.value">
                          </el-option>
                        </el-select>

                      </div>
                    </div>
                  </div>
                </div>
                <!--input-->
                <div class="flex justifybetweent paddingTop">
                  <div class="flex">
                    <span class="fontsize font-family color-info">不分配IP段</span>
                    <div class="flex align-item-center paddingLeft5">
                      <div class="blueremind"></div>
                    </div>
                  </div>
                  <div class="flex">
                    <div class="flex align-item-center">
                      <div class="addblue"></div>
                    </div>
                    <div class="flex paddingLeft5">
                      <span class="fontsize font-family color-info">Vlan ID</span>
                    </div>
                  </div>
                </div>
                <div class="flex inputTo align-item-center">
                  <div class="flex">
                    <el-input placeholder="Input"
                              v-model="input2"
                              class="Inputleft">
                    </el-input>
                  </div>
                  <div class="flex to align-item-center justifycenter">
                    <span class="fontsize color-info font-family">To</span>
                  </div>
                  <div class="flex ">
                    <el-input placeholder="Input"
                              v-model="input1"
                              class="Inputleft">
                    </el-input>
                  </div>
                  <div class="flex paddingleft10">
                    <div class="delete"></div>
                  </div>
                </div>
                <div class="flex paddingTop">
                  <span class="fontsize color-info font-family">DNS服务器</span>
                </div>
                <div class="flex paddingtop10">
                  <el-input type="textarea"
                            :autosize="{ minRows: 2, maxRows: 4}"
                            placeholder="请输入内容"
                            v-model="textarea2">
                  </el-input>
                </div>
              </div>
            </div>
          </div>
        </cloudMessageBox>

        <div class="refresh">
          <el-tooltip class="item"
                      effect="dark"
                      content="Refresh"
                      placement="bottom">
            <div class="refre"></div>
          </el-tooltip>
        </div>
      </div>
    </div>
    <div class="tabsvi">
      <el-table :data='svilist'
                stripe
                style="width: 100%">
        <el-table-column label="Vlan ID"
                         prop="interface"
                         width="122">
        </el-table-column>
        <el-table-column label="SVI"
                         prop="priIp"
                         width="319">
        </el-table-column>
        <el-table-column label="DHCP地址池名称"
                         prop="secIp"
                         width="730">
        </el-table-column>
        <el-table-column label="操作"
                         width="119">
          <template slot-scope="scope">
            <i size="mini"
               class="el-icon-delete"
               type="danger"
               @click="deleteSvi(scope.$index,
               scope.row)">Delete</i>
          </template>
        </el-table-column>
      </el-table>
      <cloudMessageBox width="400px"
                       :titlecontent="'删除'"
                       :visible.sync="addSvidelete"
                       @confirm="deleteconfirm"
                       :cellbtntext="'Cancel'"
                       :sumbtntext="'Confirm'">
        <span>确认要删除Vlan ID</span>
      </cloudMessageBox>

    </div>
    <div class="dhcptitle">
      <div class="titlethree">
        DHCP Snooping
      </div>
    </div>
    <div class="dhcpswicth">
      <span>
        DHCP Snooping
      </span>
      <div class="open">
        <el-switch v-model="value1"
                   active-color="#13ce66"
                   inactive-color="rgba(164, 167, 181, 0.4)">
        </el-switch>
      </div>
    </div>
    <div class="promptport">
      <div class="prcontent">
        <div class="caveat">
        </div>
        <div class="wenzi">
          信任的端口（默认开启识别到的上联口）
        </div>
      </div>
      <div class="controlbtn">
        <div class="select">
          <cloud-button selType="primary"
                        btnText="Select all configurable ports" />

        </div>
        <div class="quxiao">
          <cloud-button selType="primary"
                        btnText="Cancel" />
        </div>
        <div class="save">
          <cloud-button selType="primary"
                        btnText="Save"
                        @click="openSave" />
        </div>
        <cloudMessageBox width="400px"
                         :titlecontent="'Save'"
                         :visible.sync="Savemessage"
                         @confirm="Savecfirm"
                         :cellbtntext="'none'"
                         :sumbtntext="'sure'">
          DHCP Snooping配置发生了改变，是否保存吗？
        </cloudMessageBox>

        <div class="refresh">
          <el-tooltip class="item"
                      effect="dark"
                      content="Refresh"
                      placement="bottom">
            <div class="refre"></div>
          </el-tooltip>
        </div>
      </div>
    </div>
    <!-- <div class="dhcpmath">
      <network v-if="value1"
               style="padding-top: 30px;"
               :toshowtooltip="1" />
      <div v-else
           class="nomath">
        <span>No matching data</span>
      </div>
    </div> -->
    <div class="Description">
      <div class="border">
        <div class="sprise">
          <div class="Selected"></div>
          <span class="fontsize color-info-title font-fmaily">Selected</span>
        </div>
        <div class="sprise2">
          <div class="Unselected"></div>
          <span class="fontsize color-info-title font-fmaily ">Unselected</span>

        </div>
        <div class="sprise3">
          <div class="Not"></div>
          <span class="fontsize color-info-title font-fmaily ">Not Optional</span>

        </div>
        <div class="sprise4">
          <div class="Uplinks"></div>
          <span class="fontsize color-info font-arial paddingLeft5">Uplinks</span>

        </div>
        <div class="sprise5">
          <div class="Electrical"></div>
          <span class="fontsize color-info font-arial paddingLeft5">Electrical port</span>

        </div>
        <div class="sprise6">
          <div class="Fibre"></div>
          <span class="fontsize color-info font-arial paddingLeft5">Fibre optical port</span>
        </div>
      </div>
    </div>
    <div class="titlepeizi">
      <div class="titlelog">
        防环路配置
      </div>
    </div>
    <div class="Switchport">
      <span class="fontsize color-info font-arial">
        RLDP开关
      </span>
      <div class="scport"
           @click="openRldp">
        <el-switch v-model="rldps"
                   active-color="#13ce66"
                   @change="changeType"
                   inactive-color="rgba(164, 167, 181, 0.4)">
        </el-switch>
      </div>
    </div>
    <cloudMessageBox custom-class="tipmessage"
                     width="400px"
                     :titlecontent="'Tips'"
                     :visible.sync="switchMessage"
                     @confirm="swicthconfirm"
                     :cellbtntext="'none'"
                     :sumbtntext="'sure'"
                     @changeType="msgConfirm">
      <span class="fontsize color-info font-arial">
        确认关闭 RLDP 吗？
      </span>
    </cloudMessageBox>
    <div class="controlsnoping">
      <div class="Warningsnoping">
        <div class="warning"></div>
        <span class="fontsize color-info font-arial">
          信任的端口（默认开启识别到的上联口）
        </span>
      </div>
      <div class="conbt">
        <div class="sel">
          <cloud-button selType="primary"
                        btnText="Select all configurable ports"
                        :selDisabled="false"
                        @click="test(222)" />
        </div>
        <div class="canel">
          <cloud-button selType="primary"
                        btnText="Cancel"
                        :selDisabled="false"
                        @click="test(222)" />
        </div>
        <div class="refresh">
          <el-tooltip class="item"
                      effect="dark"
                      content="Refresh"
                      placement="bottom">
            <div class="refre"></div>
          </el-tooltip>
        </div>
      </div>
    </div>
    <div class="mathbox"
         v-if="show">
      <div class="math">
        <!-- <network style="padding-top: 30px;"
                 :toshowtooltip="1" /> -->
      </div>
      <div class="footer">
        <div class="border">
          <div class="warn">
            <div class="flex align-item-center">
              <div class="red cube"></div>
              <span class="fontsize color-info-title font-fmaily paddingLeft5">
                只告警(warning)
              </span>
            </div>
            <div class="paddingLeft">
              <div class="green cube"></div>
              <span class="fontsize color-info-title font-fmaily paddingLeft5">
                告警且阻塞报文转发(block)
              </span>
            </div>
            <div class="paddingLeft">
              <div class="oringe1 cube"></div>
              <span class="fontsize color-info-title font-fmaily paddingLeft5">
                告警且关闭端口
              </span>
            </div>
            <div class="paddingLeft">
              <div class="blue cube"></div>
              <span class="fontsize color-info-title font-fmaily paddingLeft5">
                关闭端口所在的
              </span>
            </div>
            <div class="paddingLeft">
              <div class="gray cube"></div>
              <span class="fontsize color-info-title font-fmaily paddingLeft5">不可配置</span>
            </div>
            <div class="paddingLeft">
              <div class="black"></div>
              <span class="fontsize color-info-title font-fmaily paddingLeft5">关闭检测</span>
            </div>
            <div class="paddingLeft">
              <div class="Uplinks"></div>
              <span class="fontsize color-info font-fmaily paddingLeft5">Uplinks</span>
            </div>
            <div class="paddingLeft">
              <div class="Electrical"></div>
              <span class="fontsize color-info font-arial paddingLeft5">Electrical port</span>
            </div>
            <div class="paddingLeft">
              <div class="Fibre"></div>
              <span class="fontsize color-info font-arial paddingLeft5">Fibre optical port</span>
            </div>
          </div>
          <div class="pirot">
            <span class="fontsize color-info font-arial paddingLeft5">Prompt</span>
            <el-tooltip placement="bottom"
                        effect="light">
              <div slot="content"
                   class="color-info">1、若上联口不为三层口，默认选中上联口，如<br />果DHCP服务器所在设备连接非上联口请选择对<br />应端口；<br />2、通过鼠标左键点击可以进行“选中”和“取<br />消选中”操作。</div>
              <div class="remind"></div>
            </el-tooltip>
          </div>
        </div>

      </div>
    </div>
    <div class="Configuration">
      <div class="fontsize color-9A ">
        端口配置
      </div>
      <div class="Warningsnoping">
        <div class="warning"></div>
        <span class="fontsize color-9A paddingLeft5">
          Please select the port to be configured
        </span>
      </div>
    </div>
    <div class="submit">
      <div class="title fontsize color-333 ">
        端口已选择 Gi0/13；Gi0/17；Gi0/18；Gi0/20；Gi0/22
      </div>
    </div>
    <div class="detect">
      <!-- 11111 -->
      <div class="flex justifyaround  paddingTop"
           style="width:100%">
        <div class="flex justifystart align-item-center"
             style="flex:0.8">
          <span class="fontsize font-fmaily color-info">检查类型</span>
          <div class="flex pl20">
            <el-select v-model="options1.value"
                       placeholder="请选择">
              <el-option v-for="item in options1"
                         :key="item.value"
                         :label="item.label"
                         :value="item.value">
              </el-option>
            </el-select>
          </div>
        </div>
        <div class="flex justifyend align-item-center">
          <span class="fontsize font-fmaily color-info">环路处理</span>
          <div class="flex paddingLeft5">
            <div class="blueremind"></div>
          </div>
          <div class="flex pl20">
            <el-select v-model="options2.value"
                       placeholder="请选择">
              <el-option v-for="item in options2"
                         :key="item.value"
                         :label="item.label"
                         :value="item.value">
              </el-option>
            </el-select>
          </div>
        </div>
      </div>
    </div>
    <div class="flex justifycenter">
      <div class="save paddingTop"
           style="flex:0.83;">
        <cloud-button selType="primary"
                      btnText="Save"
                      @click="openSave" />
      </div>
    </div>
    <div class="serve">
      <div class="titlefuwu">
        <span class="fontsize color-9A font-arial ">
          Service配置
        </span>
      </div>
      <div class="servetab">
        <el-table :data="tableData"
                  style="width: 100%">
          <el-table-column label="服务类型"
                           width="180">
            <template>
              WEB GUI
            </template>
          </el-table-column>
          <el-table-column label="开关"
                           width="332">
            <template slot-scope="scope">
              <el-switch v-model="scope.row.type"
                         active-color="#13ce66"
                         inactive-color="rgba(164, 167, 181, 0.4)">
              </el-switch>
            </template>
          </el-table-column>
          <el-table-column label="相关参数">
            <template slot-scope="scope">
              <el-input placeholder="请输入密码"
                        class="input-password"
                        show-password
                        v-model="scope.row.input"></el-input>
            </template>
          </el-table-column>
        </el-table>
      </div>
    </div>
    <!--隧道管理静态-->
    <div class="tunnel flex align-item-center">
      <div class="tunmanagement">
        <div class="vtunleft flex align-item-center">
          <div class="tuntitle">
            隧道管理
          </div>
          <el-tooltip class="item"
                      popper-class="tunnelts"
                      effect="light"
                      content="如果隧道不可用，请关闭隧道再重新创建"
                      placement="bottom">

            <div class="blueremind"></div>
          </el-tooltip>
          <div class="gloalb">
            <cloudTabgroup @group-change="groupChange"
                           :testgroup="['This Equipment','Global']" />
          </div>
        </div>
        <div class="vlantun flex "
             @click="openTunel">
          <div class="flex align-item-center padding20">
            <div class="plus"></div>
            <span class="fontsize font-arial colorskyblue">Add Tunnel</span>
          </div>
          <div class="flex pl20">
            <div class="refre"></div>

          </div>
        </div>

      </div>
      <cloudMessageBox width="400px"
                       :titlecontent="'Add Tunnel'"
                       :visible.sync="tunnelMessage"
                       @confirm="tunnelconfirm"
                       :cellbtntext="'cancel'"
                       :sumbtntext="'confirm'">
        <div class="flex flexcolumn">
          <div class="tunelheader flex paddingTop paddingBottom align-item-center">
            <div class="exlmation"></div>
            <span class="fontsize color-info font-fmaily paddingLeft5">本设备不支持隧道功能，可以通过其他设备中转</span>
          </div>
          <div class="felx flexcolumn paddingtop10">
            <span class="fontsize color-info font-fmaily">中转设备</span>
            <el-select v-model="transit"
                       placeholder="请选择">
              <el-option v-for="item in transits"
                         :key="item.value"
                         :label="item.label"
                         :value="item.value">
              </el-option>
            </el-select>
          </div>
          <div class="flex paddingtop10">
            <span class="fontsize color-info">隧道服务类型</span>
          </div>
          <div class="flex">
            <el-input v-model="inputtunel"
                      placeholder="Input"></el-input>
          </div>
          <div class="flex paddingtop10 ">
            <span>端口</span>
          </div>
          <div class="flex">
            <el-input v-model="inputtunel"
                      placeholder="Input"></el-input>
          </div>
        </div>
      </cloudMessageBox>
      <div class="tuntable">
        <el-table :data="tundata"
                  style="width: 100%">
          <el-table-column prop="date"
                           label="服务类型"
                           width="161">
          </el-table-column>
          <el-table-column prop="iptransit"
                           label="中转设备"
                           width="179">
          </el-table-column>
          <el-table-column prop="host"
                           label="主机"
                           width="195">
          </el-table-column>
          <el-table-column prop="protnumber"
                           label="端口号"
                           width="146">
          </el-table-column>
          <el-table-column prop="port"
                           label="目的端口"
                           width="136">
          </el-table-column>
          <el-table-column prop="time"
                           label="到期时间"
                           width="211">
          </el-table-column>
          <el-table-column label="状态"
                           width="137">
            <template slot-scope="scope">
              <span style="margin-left: 10px"
                    v-if="scope.row.status=='关闭'">{{ scope.row.status}}</span>
              <div class="flex align-item-center"
                   v-if="scope.row.status=='异常'">
                <div class="flex mg-r10">
                  <el-tag size="medium"
                          type="danger">{{ scope.row.status}}</el-tag>
                </div>
                <div class="blueremind"></div>

              </div>
            </template>
          </el-table-column>
          <el-table-column prop="add"
                           label="操作"
                           width="111">
            <template slot-scope="scope">
              <div class="flex align-item-center"
                   @click="openTunel">
                <div class="addblue"></div>
                <span>{{ scope.row.add }}</span>
              </div>
            </template>
          </el-table-column>
        </el-table>
      </div>
    </div>
    <!-- <button @click="test">点我</button> -->
    <div class="backup flex align-item-center paddingTop">
      <div class="backupcontrol flex align-item-center">
        <div class="backuplog fontsize color-9A ">
          备份列表
        </div>
        <div class="backupbtn flex align-item-center">
          <div class="currentbtn paddingLeft">
            <cloud-button selType="primary"
                          btnText="当前配置"
                          @click="opencurrent" />
            <cloudMessageBox width="400px"
                             :titlecontent="'配置详情'"
                             :visible.sync="CurrentConfiguration">
              <span>当前文件配置</span>
              <span slot="footer">
                <cloud-button selType="primary"
                              btnText="备份" />
              </span>
            </cloudMessageBox>
          </div>
          <div class="downbtn paddingLeft">
            <cloud-button width="400px"
                          selType="primary"
                          btnText="下载配置文件"
                          @click="opendown" />
            <cloudMessageBox width="400px"
                             :titlecontent="'Add Tunnel'"
                             :visible.sync="downMessage">
              <span>下载文件配置</span>
              <span slot="footer"></span>
            </cloudMessageBox>

          </div>
          <div class="restorebtn paddingLeft">
            <cloud-button width="400px"
                          selType="primary"
                          btnText="恢复配置"
                          @click="openrestore" />
            <cloudMessageBox width="400px"
                             :titlecontent="'Add Tunnel'"
                             :visible.sync="restoreMessage"
                             @confirm="restoreconfirm"
                             :cellbtntext="'cancel'"
                             :sumbtntext="'confirm'">
              <span>
                确定要恢复这个备份文件到设备，恢复文件会导致设备重启？
              </span>
            </cloudMessageBox>

          </div>
          <div class="deletebtn paddingLeft">
            <cloud-button width="400px"
                          selType="primary"
                          btnText="删除配置文件"
                          @click="opendelete" />
            <cloudMessageBox width="400px"
                             :titlecontent="'删除配置'"
                             :visible.sync="deleteBtnMessage"
                             @confirm="deleteBtnconfirm"
                             :cellbtntext="'cancel'"
                             :sumbtntext="'confirm'">
              <span>删除文件配置</span>
            </cloudMessageBox>
          </div>

          <div class="comparebtn paddingLeft">
            <cloud-button selType="primary"
                          btnText="配置对比"
                          @click="opencompare" />
            <cloudMessageBox width="400px"
                             :titlecontent="'配置对比'"
                             :visible.sync="compareBtnMessage">
              <span>配置对比</span>
              <span slot="footer"></span>
            </cloudMessageBox>
          </div>
        </div>
      </div>
      <div class="backuptab">
        <el-table ref="multipleTable"
                  :data="backupData"
                  tooltip-effect="dark"
                  style="width: 100%"
                  @selection-change="handleSelectionChange">
          <el-table-column type="selection"
                           width="55">
          </el-table-column>
          <el-table-column prop="file"
                           label="备份文件名"
                           width="290">
          </el-table-column>
          <el-table-column prop="name"
                           label="文件大小"
                           width="108">
          </el-table-column>
          <el-table-column prop="backuptime"
                           label="备份时间"
                           width="180">
          </el-table-column>
          <el-table-column prop="type"
                           label="备份类型"
                           width="100">
          </el-table-column>
          <el-table-column prop="MD5"
                           label="MD5"
                           width="270">
          </el-table-column>
          <el-table-column prop="remarks"
                           label="备注"
                           width="180">
          </el-table-column>

          <el-table-column prop="edit"
                           label="操作"
                           show-overflow-tooltip>
            <template slot-scope="scope">
              <div class="flex align-item-center"
                   @click="openedit">
                <div class="edit"></div>
                <span class="paddingLeft5">{{ scope.row.edit }}</span>
              </div>
            </template>

          </el-table-column>
        </el-table>
      </div>
      <cloudMessageBox width="400px"
                       :titlecontent="'删除配置'"
                       :visible.sync="editMessage"
                       @confirm="editconfirm"
                       :cellbtntext="'cancel'"
                       :sumbtntext="'confirm'">
        <div class="flex flexcolumn">
          <span class="fontsize font-arial">Remark</span>
          <el-input v-model="inputedit"
                    placeholder="input"></el-input>
        </div>
      </cloudMessageBox>
    </div>
  </div>
</template>
<script>
import { GetVLanList, AddVLan, DeleteVLan } from "@service/monitor/config"
import { GetSVIList } from "@service/monitor/config"
export default {
  name: "Config",
  data () {
    return {
      input1: '',
      input2: '',
      vlantab: [],
      vlanList: [],
      gis: [{
        value: '选项1',
        label: '关闭检测'
      }, {
        value: '选项2',
        label: '只告警(warning)'
      }, {
        value: '选项3',
        label: '告警且阻塞报文转发(block)'
      }, {
        value: '选项4',
        label: '告警且关闭端口(shutdown port)'
      }],
      inputcheckbox: false,
      inputedit: '',
      inputtunel: '',
      //隧道弹框的select
      transit: '',
      transits: [{
        value: '选项1',
        label: '关闭检测'
      }, {
        value: '选项2',
        label: '只告警(warning)'
      }, {
        value: '选项3',
        label: '告警且阻塞报文转发(block)'
      }, {
        value: '选项4',
        label: '告警且关闭端口(shutdown port)'
      }],
      inputIp: '',
      inputChildre: '',
      dhcp: false,
      inputSvi: '',
      show: true,
      inputVlan: '',
      // visible: true,
      backupData: [{
        file: 'G1PT4MT00082A_2020-08-19-12-00-43.txt',
        name: '1979k',
        backuptime: '2020/08/19 17:25:45',
        type: '手动',
        MD5: '86476bc51d60675cb5fac15117c3cd26',
        remarks: '这是一条备注详情详情情',
        edit: 'Edit Remark'
      }, {
        file: 'G1PT4MT00082A_2020-08-19-12-00-43.txt',
        name: '1979k',
        backuptime: '2020/08/19 17:25:45',
        type: '手动',
        MD5: '86476bc51d60675cb5fac15117c3cd26',
        remarks: '这是一条备注详情详情情',
        edit: 'Edit Remark'

      }, {
        file: 'G1PT4MT00082A_2020-08-19-12-00-43.txt',
        name: '1979k',
        backuptime: '2020/08/19 17:25:45',
        type: '手动',
        MD5: '86476bc51d60675cb5fac15117c3cd26',
        remarks: '这是一条备注详情详情情',
        edit: 'Edit Remark'

      }, {
        file: 'G1PT4MT00082A_2020-08-19-12-00-43.txt',
        name: '1979k',
        backuptime: '2020/08/19 17:25:45',
        type: '手动',
        MD5: '86476bc51d60675cb5fac15117c3cd26',
        remarks: '这是一条备注详情详情情',
        edit: 'Edit Remark'

      }, {
        file: 'G1PT4MT00082A_2020-08-19-12-00-43.txt',
        name: '1979k',
        backuptime: '2020/08/19 17:25:45',
        type: '手动',
        MD5: '86476bc51d60675cb5fac15117c3cd26',
        remarks: '这是一条备注详情详情情',
        edit: 'Edit Remark'

      }, {
        file: 'G1PT4MT00082A_2020-08-19-12-00-43.txt',
        name: '1979k',
        backuptime: '2020/08/19 17:25:45',
        type: '手动',
        MD5: '86476bc51d60675cb5fac15117c3cd26',
        remarks: '这是一条备注详情详情情',
        edit: 'Edit Remark'

      }, {
        file: 'G1PT4MT00082A_2020-08-19-12-00-43.txt',
        name: '1979k',
        backuptime: '2020/08/19 17:25:45',
        type: '手动',
        MD5: '86476bc51d60675cb5fac15117c3cd26',
        remarks: '这是一条备注详情详情情',
        edit: 'Edit Remark'

      }],
      multipleSelection: [],
      tundata: [{
        date: 'Telent',
        iptransit: '172.16.105.1',
        host: '47.104.212.228',
        protnumber: 65455,
        port: 80,
        time: '2020/08/26 17:25',
        status: '关闭',
        add: 'Add Again'
      }, {
        date: 'Telent',
        iptransit: '172.16.105.1',
        host: '47.104.212.228',
        protnumber: 65455,
        port: 80,
        time: '2020/08/26 17:25',
        status: '异常',
        add: 'Add Again'

      }, {
        date: 'Telent',
        iptransit: '172.16.105.1',
        host: '47.104.212.228',
        protnumber: 65455,
        port: 80,
        time: '2020/08/26 17:25',
        status: '关闭',
        add: 'Add Again'

      }, {
        date: 'Telent',
        iptransit: '172.16.105.1',
        host: '47.104.212.228',
        protnumber: 65455,
        port: 80,
        time: '2020/08/26 17:25',
        status: '异常',
        add: 'Add Again'

      }],
      pass: true,
      input: '',
      select: '',
      options1: [{
        value: '选项1',
        label: '环路检测'
      }],
      options2: [{
        value: '选项1',
        label: '关闭检测'
      }, {
        value: '选项2',
        label: '只告警(warning)'
      }, {
        value: '选项3',
        label: '告警且阻塞报文转发(block)'
      }, {
        value: '选项4',
        label: '告警且关闭端口(shutdown port)'
      }],
      surroundings: '',
      rldps: true,
      value1: true,
      tableData: [{
        id: '100',
        type: true,
        name: '王小虎',
      },
      {
        id: '101',
        type: false,
        name: '王小虎',
      },
      {
        id: '102',
        type: true,
        name: '王小虎',
      },],
      search: '',
      //添加add vlan
      addOrderVisible: false,
      //删除
      deletemessagebox: false,
      //svi
      addSvimessage: false,
      //svidelete
      addSvidelete: false,
      //save 保存弹框
      Savemessage: false,
      //开关确认弹框
      switchMessage: false,
      //当前配置弹框
      CurrentConfiguration: false,
      //隧道管理弹框
      tunnelMessage: false,
      //下载btn弹框
      downMessage: false,
      //恢复设置弹框
      restoreMessage: false,
      //删除配置btn弹框
      deleteBtnMessage: false,
      //配置对比
      compareBtnMessage: false,
      //编辑btn 弹框
      editMessage: false,

      handid: '',

      //DHCP
      dhcpip: '',
      dhcpaddress: '',
      dhcpgateway: '',


      //svi
      svidata: [],
      svilist: [],
    }
  },
  props: {
    devicedid: {
      type: String
    },
    interfaceid: {
      type: String
    },
  },
  methods: {
    //添加vlanid
    openMessagebox () {
      this.addOrderVisible = true
    },
    //确定后需要进行的事项
    addOrderconfirm () {
      this.getaddvlan()
      this.addOrderVisible = false
    },
    //删除vlan 二次确认弹框
    handleDelete (index, row) {
      console.log(index, row);
      this.handid = row.id
      this.deletemessagebox = true
    },
    //确定后需要进行的事项
    deletemessage () {
      this.getdeletevlan()
      this.deletemessagebox = false
    },
    //点击【Add SVI&DHCP】出现弹窗，样式如下：
    openSvi () {
      this.addSvimessage = true
    },
    addSvi () {
      this.addSvimessage = false
    },
    //svi删除
    deleteSvi (index, row) {
      console.log(index, row);
      this.addSvidelete = true
    },
    //删除确认隐藏弹框
    deleteconfirm () {
      this.addSvidelete = false
    },
    //save保存弹框
    openSave () {
      this.Savemessage = true
    },

    //确认隐藏
    Savecfirm () {
      this.Savemessage = false
    },

    //开关弹框
    openRldp () {
      this.switchMessage = true
    },
    swicthconfirm () {
      this.switchMessage = false
    },

    //隧道管理弹框
    openTunel () {
      this.tunnelMessage = true
    },
    tunnelconfirm () {
      this.tunnelMessage = false
    },

    //当前配置弹框
    opencurrent () {
      this.CurrentConfiguration = true
    },

    //下载的btn弹框
    opendown () {
      this.downMessage = true
    },
    //恢复设置
    openrestore () {
      this.restoreMessage = true
    },
    restoreconfirm () {
      this.restoreMessage = false
    },
    //删除的btn弹框显示
    opendelete () {
      this.deleteBtnMessage = true
    },
    deleteBtnconfirm () {
      this.deleteBtnMessage = false
    },
    //配置对比
    opencompare () {
      this.compareBtnMessage = true
    },
    //编辑弹框
    openedit () {
      this.editMessage = true
    },
    editconfirm () {
      this.editMessage = false
    },
    //全选单选
    handleSelectionChange (val) {
      this.multipleSelection = val;
    },
    groupChange (item, index) {
      console.log(item, index)
    },
    //保存
    saveClick () {
      alert('已经保存')
    },
    changeType () {
      this.rldps = !this.rldps
    },
    msgConfirm (res) {
      this.rldps = res
    },
    //获取vlan列表
    async getvlanlist () {
      this.vlantab = await GetVLanList({
        'deviceId': this.devicedid
        // 'deviceId': '00D0F8-S5310%2D24GT4XS-G1PT4MT00082A'
      })
      if ({}.toString.call(this.vlantab.data.data) === "[object Array]") {
        this.vlanList = this.vlantab.data.data;
      } else {
        this.vlanList = [];
      }
    },
    //获取vlan添加接口
    async getaddvlan () {
      if (this.inputVlan != '') {
        let res = await AddVLan({
          "deviceId": this.devicedid,
          "portId": this.inputVlan
        })
        if (res.data.success) {
          this.getvlanlist()
        } else {
          alert('添加不成功')
        }
      } else {
        alert('input为空');
      }
    },
    //获取vlan删除接口
    async getdeletevlan () {
      let res = await DeleteVLan({
        "deviceId": this.devicedid,
        "portId": this.handid
      })
      if (res.data.success) {
        this.getvlanlist()
      } else {
        alert('添加不成功')
      }
    },
    //   async getaddsvi () {
    //     let res = await DeleteVLan({
    //       "deviceId": this.devicedid,
    //       "portId": this.interfaceid,
    //       "IP": this.inputIp,
    //       "address": this.inputChildre
    //     })
    //     console.log(res)
    //   },

    //获取svi列表
    async getsvilist () {
      this.svidata = await GetSVIList({
        //'deviceId': this.devicedid
        deviceId: '00D0F8-S5310%2D24GT4XS-G1PT4MT00082A'
      })
      if ({}.toString.call(this.svidata.data.data) === "[object Array]") {
        this.svilist = this.svidata.data.data;
      } else {
        this.svilist = [];
      }
    },
    test () {
      //tundata	tableData	svilist  vlanList
      console.log(this.svilist)
    }
  },
  mounted () {
    this.getvlanlist();
    this.getsvilist()
  }
}
</script>
<style lang="scss" scoped>
/deep/ .el-input__icon {
  height: 110%;
}
/deep/ .el-table td,
.el-table th {
  padding: 15px 0;
}
/deep/ .el-dialog__body {
  padding: 0 20px;
}
/deep/ .el-dialog__title {
  font-size: 14px;
}
/deep/ .el-input__inner {
  width: 360px;
  height: 30px;
  line-height: 30px;
  padding: 0 10px;
  border-radius: 2px;
  border: 1px solid rgba(164, 167, 181, 0.6);
  margin-top: 5px;
}
.plus {
  background: url("~@assets/img/bg_icon.png") no-repeat -241px -337px;
  width: 9px;
  height: 9px;
}
.radio {
  width: 14px;
  height: 14px;
}
/deep/ .el-dialog__body {
  font-size: 12px;
  padding: 20px 20px;
  color: #656565;
}
/deep/ .el-tooltip__popper.is-dark {
  color: rgba(101, 101, 101, 1);
  background-color: rgba(255, 255, 255, 1);
  max-width: 270px;
}
/deep/ .el-tooltip__popper {
  color: rgba(101, 101, 101, 1);
  background-color: rgba(255, 255, 255, 1);
  max-width: 270px;
}
/deep/ .el-tooltip__popper {
  max-width: 270px;
}
.blueremind {
  background: url("~@assets/img/bg_icon.png") no-repeat -400px -335px;
  width: 13px;
  height: 13px;
}
.config {
  width: 100%;
  max-width: 1340px;
  display: flex;
  flex-direction: column;
  background: #f6f6f7;
  .configtitle {
    padding-top: 17px;
    width: 100%;
    display: flex;
    justify-content: space-between;
    align-items: center;
    background-color: #fff;
    padding-bottom: 16px;
    border-bottom: 1px solid rgba(164, 168, 182, 0.2);
    .titlelog {
      text-align: center;
      font-size: 12px;
      font-family: Arial;
      font-weight: 400;
      color: #9a9a9a;
      line-height: 18px;
      // padding-left: 20px;
    }
    .caozuo {
      display: flex;
      .tianjia {
        display: flex;
        align-items: center;
        padding-right: 20px;
        border-right: 1px solid rgba(164, 167, 181, 0.2);
        .plus {
          background: url("~@assets/img/bg_icon.png") no-repeat -241px -337px;
          width: 9px;
          height: 9px;
        }
        .add {
          font-size: 12px;
          font-family: Arial;
          font-weight: 400;
          color: #4676e4;
          line-height: 18px;
        }
        /deep/ .el-dialog {
          background-color: red;
          /deep/ .el-dialog__body {
            font-size: 12px;
            padding: 20px 20px;
            color: #656565;
            span {
              color: #656565;
            }
          }
        }
      }
      .refresh {
        width: 36px;
        height: 30px;
        display: flex;
        justify-content: flex-start;
        align-items: center;
        padding-left: 20px;
        .refre {
          background: url("~@assets/img/bg_icon.png") no-repeat -143px -302px;
          width: 16px;
          height: 16px;
          align-items: center;
        }
        .refre:hover {
          background: url("~@assets/img/bg_icon.png") no-repeat -179px -302px;
          width: 16px;
          height: 16px;
          align-items: center;
        }
      }
    }
  }
  .vlantab {
    width: 100%;
    display: flex;
    align-items: center;
    background-color: #fff;
    /deep/ .el-icon-delete,
    .el-icon-edit-outline {
      width: 50px;
    }
  }
  .tabtwo {
    padding-top: 28px;
    width: 100%;
    display: flex;
    justify-content: space-between;
    align-items: center;
    background-color: #fff;
    border-bottom: 1px solid rgba(164, 168, 182, 0.2);
    .titletwo {
      text-align: center;
      font-size: 12px;
      font-family: Arial;
      font-weight: 400;
      color: #9a9a9a;
      line-height: 18px;
    }
    .sviadd {
      display: flex;
      align-items: center;
      .control {
        display: flex;
        align-items: center;
        // border-right: 1px solid rgba(164, 167, 181, 0.2);
        padding-right: 20px;
        .plus {
          background: url("~@assets/img/bg_icon.png") no-repeat -241px -337px;
          width: 9px;
          height: 9px;
        }
        .adddh {
          font-size: 12px;
          font-family: Arial;
          font-weight: 400;
          color: #4676e4;
          line-height: 18px;
        }
        .inputmessagebox {
          align-content: center;
        }
      }
      .refresh {
        width: 36px;
        height: 30px;
        display: flex;
        // justify-content: flex-start;
        align-items: center;
        padding-left: 20px;
        .refre {
          background: url("~@assets/img/bg_icon.png") no-repeat -143px -302px;
          width: 16px;
          height: 16px;
          align-items: center;
        }
        .refre:hover {
          background: url("~@assets/img/bg_icon.png") no-repeat -179px -302px;
          width: 16px;
          height: 16px;
          align-items: center;
        }
      }
    }
  }
  .tabsvi {
    width: 100%;
    display: flex;
    align-items: center;
    background-color: #fff;
    /deep/ .el-icon-delete,
    .el-icon-edit-outline {
      width: 50px;
    }
  }
  .dhcptitle {
    padding-top: 28px;
    padding-bottom: 14px;
    width: 100%;
    height: 36px;
    display: flex;
    align-items: center;
    background-color: #fff;
    border-bottom: 1px solid rgba(164, 168, 182, 0.2);
    .titlethree {
      text-align: center;
      font-size: 12px;
      font-family: Arial;
      font-weight: 400;
      color: #9a9a9a;
      line-height: 18px;
    }
  }
  .dhcpswicth {
    display: flex;
    align-items: center;
    background-color: #fff;
    span {
      padding-top: 22px;
      padding-bottom: 12px;
      font-size: 12px;
      font-family: Arial;
      font-weight: 400;
      color: #343434;
      line-height: 18px;
    }
    .open {
      padding-left: 10px;
      padding-top: 2px;
      height: 16px;
      /deep/ .el-switch__core {
        text-align: center;
        width: 30px !important;
        height: 16px;
      }
      /deep/ .el-switch.is-checked .el-switch__core::after {
        margin-left: -15px;
      }
      /deep/ .el-switch__core:after {
        top: 0;
        width: 14px;
        height: 14px;
      }
    }
  }
  .promptport {
    width: 100%;
    height: 50px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    background-color: #fff;
    border-bottom: 1px solid rgba(164, 168, 182, 0.2);
    .prcontent {
      display: flex;
      height: 50px;
      align-items: center;
      background-color: #fff;
      // padding-left: 20px;
      // padding-top: 12px;
      // padding-bottom: 20px;
      .caveat {
        background: url("~@assets/img/bg_icon.png") no-repeat -367px -335px;
        width: 13px;
        height: 13px;
      }
      .wenzi {
        padding-left: 10px;
        font-size: 12px;
        font-family: Arial;
        font-weight: 400;
        color: #9a9a9a;
        line-height: 18px;
      }
    }
    .controlbtn {
      display: flex;
      align-items: center;
      .select {
        padding-left: 10px;
      }
      .quxiao {
        padding-left: 10px;
      }
      .save {
        padding-left: 20px;
        padding-right: 20px;
      }
      .refresh {
        height: 30px;
        display: flex;
        justify-content: flex-start;
        align-items: center;
        // border-right: 1px solid rgba(164, 167, 181, 0.2);
        padding-left: 20px;
        padding-right: 20px;
        border-left: 1px solid rgba(164, 167, 181, 0.2);
        .refre {
          background: url("~@assets/img/bg_icon.png") no-repeat -143px -302px;
          width: 16px;
          height: 16px;
          align-items: center;
        }
        .refre:hover {
          background: url("~@assets/img/bg_icon.png") no-repeat -179px -302px;
          width: 16px;
          height: 16px;
          align-items: center;
        }
      }
    }
    .dhcpmath {
      display: flex;
      justify-content: center;
      align-items: center;
      text-align: center;
      background: #f6f6f7;
      .nomath {
        display: flex;
        justify-content: center;
        align-items: center;
      }
    }
  }
  .Description {
    width: 100%;
    // height: 30px;
    display: flex;
    justify-content: flex-start;
    align-items: center;
    padding: 0 20px;
    background: #f6f6f7; // opacity: 0.2;
    .border {
      // border-top: 1px solid red;
      width: 100%;
      box-shadow: 0px -1px 0px 0px rgba(164, 168, 182, 0.2);
      display: flex;
      align-items: center;
      .sprise {
        display: flex;
        align-items: center;
        padding-top: 21px;
        padding-bottom: 22px;
        .Selected {
          width: 7px;
          height: 7px;
          background-color: #39cc64;
        }
        span {
          padding-left: 5px;
          font-size: 12px;
          font-family: Arial;
          font-weight: 400;
          color: #999999;
          line-height: 18px;
        }
      }
      .sprise2 {
        display: flex;
        align-items: center;
        padding-left: 20px;
        .Unselected {
          width: 7px;
          height: 7px;
          background: #333333;
        }
        span {
          padding-left: 5px;
          font-size: 12px;
          font-family: Arial;
          font-weight: 400;
          color: #999999;
          line-height: 18px;
        }
      }
      .sprise3 {
        display: flex;
        align-items: center;
        padding-left: 20px;

        // padding-top: 13px;
        .Not {
          width: 7px;
          height: 7px;
          background: #999999;
        }
        span {
          padding-left: 5px;
          font-size: 12px;
          font-family: Arial;
          font-weight: 400;
          color: #999999;
          line-height: 18px;
        }
      }
      .sprise4 {
        display: flex;
        align-items: center;
        padding-left: 20px;

        // background-color: #a4a7b5;
        .Uplinks {
          padding-left: 5px;

          background: url("~@assets/img/bg_icon.png") no-repeat -380px -592px;
          width: 14px;
          height: 14px;
        }
      }
      .sprise5 {
        display: flex;
        padding-left: 20px;
        // background-color: #a4a7b5;
        .Electrical {
          padding-left: 5px;

          background: url("~@assets/img/bg_icon.png") no-repeat -313px -592px;
          width: 14px;
          height: 14px;
        }
      }
      .sprise6 {
        display: flex;
        padding-left: 20px;
        .Fibre {
          padding-left: 5px;

          background: url("~@assets/img/bg_icon.png") no-repeat -347px -592px;
          width: 14px;
          height: 14px;
        }
      }
      .pirot {
        display: flex;
        align-items: center;
        span {
          font-size: 12px;
          font-family: Arial;
          font-weight: 400;
          color: #666666;
          line-height: 18px;
          padding-left: 5px;
        }
        .remind {
          background: url("~@assets/img/bg_icon.png") no-repeat -400px -335px;
          width: 13px;
          height: 13px;
        }
      }
    }
  }
  .titlepeizi {
    width: 100%;
    display: flex;
    justify-content: flex-start;
    align-items: center;
    border-bottom: 1px solid #a4a7b5;
    background-color: #fff;
    .titlelog {
      font-size: 12px;
      font-family: Microsoft YaHei;
      font-weight: 400;
      color: #999999;
      line-height: 18px;
      padding-bottom: 15px;
    }
  }
  .Switchport {
    display: flex;
    align-items: center;
    padding-top: 22px;
    padding-bottom: 13px;
    background-color: #fff;
    span {
      font-size: 12px;
      font-family: Arial;
      font-weight: 400;
      color: #333333;
      line-height: 18px;
    }
    .scport {
      padding-left: 10px;
      height: 16px;
      padding-top: -1px;
      /deep/.el-dialog {
        width: 400px;
      }
    }
  }

  .controlsnoping {
    display: flex;
    justify-content: space-between;
    align-items: center;
    .Warningsnoping {
      display: flex;
      align-items: center;
      .warning {
        padding-top: 2px;
        background: url("~@assets/img/bg_icon.png") no-repeat -367px -335px;
        width: 23px;
        height: 23px;
      }
    }
    .conbt {
      display: flex;
      align-items: center;
      padding-bottom: 10px;
      .sel {
        padding-left: 20px;
      }
      .canel {
        padding-left: 20px;
        padding-right: 20px;
      }
      .refresh {
        height: 30px;
        display: flex;
        justify-content: flex-start;
        align-items: center;
        // border-right: 1px solid rgba(164, 167, 181, 0.2);
        padding-left: 20px;
        padding-right: 20px;
        border-left: 1px solid rgba(164, 167, 181, 0.2);
        .refre {
          background: url("~@assets/img/bg_icon.png") no-repeat -143px -302px;
          width: 16px;
          height: 16px;
          align-items: center;
        }
        .refre:hover {
          background: url("~@assets/img/bg_icon.png") no-repeat -179px -302px;
          width: 16px;
          height: 16px;
          align-items: center;
        }
      }
    }
  }
  .mathbox {
    display: flex;
    flex-direction: column;
    justify-content: center;

    border-radius: 2px;
    .math {
      display: flex;
      align-items: center;
    }
    .footer {
      display: flex;
      align-items: center;
      padding: 0 20px;
      .border {
        width: 100%;
        box-shadow: 0px -1px 0px 0px rgba(164, 168, 182, 0.2);
        display: flex;
        justify-content: space-between;
        align-items: center;
        .warn {
          display: flex;
          justify-content: space-around;
          align-items: center;
          padding-top: 20px;
          padding-bottom: 27px;
          .red {
            padding-left: -20px;
            background-color: #ff5858;
          }
          .paddingLeft {
            .green {
              background-color: #3acc64;
            }
            .blue {
              background-color: #4676e4;
            }
            .oringe1 {
              background-color: #f5a624;
            }
            .gray {
              background-color: #9a9a9a;
            }
            .black {
              background-color: #343434;
            }
            .Uplinks {
              background: url("~@assets/img/bg_icon.png") no-repeat -380px -592px;
              width: 14px;
              height: 14px;
            }
            .Electrical {
              background: url("~@assets/img/bg_icon.png") no-repeat -313px -592px;
              width: 14px;
              height: 14px;
            }
            .Fibre {
              background: url("~@assets/img/bg_icon.png") no-repeat -347px -592px;
              width: 14px;
              height: 14px;
            }
          }
        }
        .pirot {
          display: flex;
          align-items: center;
          span {
            font-size: 12px;
            font-family: Arial;
            font-weight: 400;
            color: #666666;
            line-height: 18px;
            padding-right: 2px;
          }
          .remind {
            background: url("~@assets/img/bg_icon.png") no-repeat -400px -335px;
            width: 13px;
            height: 13px;
          }
        }
      }
    }
  }
  .Configuration {
    display: flex;
    align-items: center;
    background-color: #fff;
    padding-top: 20px;
    padding-bottom: 21px;
    .Warningsnoping {
      display: flex;
      align-items: center;
      padding-left: 20px;
      .warning {
        background: url("~@assets/img/bg_icon.png") no-repeat -367px -335px;
        width: 13px;
        height: 13px;
      }
    }
    .submit {
      width: 100%;
      display: flex;
      align-items: center;
      flex-direction: column;
      padding: 20px 0;
      .title {
        display: flex;
      }
    }
  }
  .detect {
    width: 100%;
    display: flex;
    justify-content: space-around;
    align-items: center;
    .types {
      display: flex;
      span {
        font-size: 12px;
        font-family: Microsoft YaHei;
        font-weight: 400;
        color: #666666;
        line-height: 18px;
      }
      .typeselet {
        padding-left: 20px;
        padding-top: 20px;
        .typebtn {
          align-items: center;
          /deep/ .el-select {
            width: 100%;
          }
        }
      }
      .savebtn {
        padding-left: 85px;
        align-items: center;
      }
    }
    .deal {
      display: flex;
      justify-content: space-around;
      align-items: center;
      span {
        font-size: 12px;
        font-family: Microsoft YaHei;
        font-weight: 400;
        color: #666666;
        line-height: 18px;
        padding-right: 5px;
      }
      .blueremind {
        background: url("~@assets/img/bg_icon.png") no-repeat -400px -335px;
        width: 13px;
        height: 13px;
      }
      .dealbtn {
        padding-left: 20px;
        align-items: center;
      }
    }
  }
  .serve {
    background: #ffffff;
    padding-top: 20px;
    .titlefuwu {
      background: #ffffff;
      align-items: center;
    }
    .servetab {
      align-items: center;
    }
  }

  .tunnel {
    width: 100%;
    flex-direction: column;
    padding-top: 40px;
    background-color: #fff;
    .tunmanagement {
      width: 100%;
      display: flex;
      justify-content: space-between;
      align-items: center;
      .vtunleft {
        display: flex;
        .tuntitle {
          align-items: center;
          padding-right: 5px;
        }
        .gloalb {
          align-items: center;
          padding-left: 20px;
        }
      }
      .vlantun {
        justify-content: flex-start;
        align-items: center;
      }
    }
    .tuntable {
      width: 100%;
    }
  }
  .backup {
    width: 100%;
    flex-direction: column;
    background-color: #fff;
    .backupcontrol {
      width: 100%;
      justify-content: space-between;
      background-color: #fff;
      .backuplog {
        align-content: center;
      }
      .backupbtn {
        justify-content: center;
        align-items: center;

        .currentbtn {
          padding-top: 10px;
          align-items: center;
        }
        .downbtn {
          padding-top: 10px;
        }
        .restorebtn {
          padding-top: 10px;
        }
        .deletebtn {
          padding-top: 10px;
        }
        .comparebtn {
          padding-top: 10px;
        }
      }
    }
    .backuptab {
      width: 100%;
      display: flex;
      align-items: center;
    }
  }
}
.input-password {
  /deep/ .el-input__inner {
    border: none;
    width: 20%;
    border-bottom: 1px solid rgba(199, 201, 211, 1);
    border-radius: 0;
    display: inline-block;
    background-color: #fff;
  }
}
.hireTime {
  width: 210px;
  /deep/ .el-input__inner {
    width: 100%;
    padding: 0 10px;
    border-bottom: 1px solid rgba(199, 201, 211, 1);
    border-radius: 0;
    display: inline-block;
    background-color: #fff;
    border-radius: 2px;
  }
}
.selectGi {
  width: 140px;
  /deep/ .el-input__inner {
    width: 100%;
    // width: 33.3%;
    padding: 0 10px;
    border-bottom: 1px solid rgba(199, 201, 211, 1);
    border-radius: 0;
    display: inline-block;
    background-color: #fff;
    border-radius: 2px;
  }
}
.global {
  width: 100%;
}
.inputTo {
  .Inputleft {
    /deep/ .el-input__inner {
      width: 152px;
      height: 30px;
    }
  }
  .to {
    width: 34px;
    height: 30px;
    margin-top: 5px;
    text-align: center;
    border-top: 1px solid rgba(164, 167, 181, 0.6);
    border-bottom: 1px solid rgba(164, 167, 181, 0.6);
    background: rgba(200, 202, 211, 0.2);
  }
}
</style>
