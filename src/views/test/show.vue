<template>
  <div>
    <!-- <dashBoard ref="dotit"> -->

    <!-- </dashBoard> -->
    <!-- <button @click="mesbox">{{addOrderVisible}}</button>
    <cloudMessageBox :titlecontent="'asdfghjkl'"
                     :visible.sync="addOrderVisible"
                     @confirm="addOrderconfirm"
                     :cellbtntext="'none'"
                     :sumbtntext="'sure'">
      <span>11111111</span>
      <div slot="footer">
      </div>
    </cloudMessageBox>
    <button @click="dianji">hhh</button> -->
    <!-- <cloudMessageBox :titlecontent="'asdfghjkl'"
                     :visible.sync="chulai"
                     @confirm="hhhhhhhh"
                     :cellbtntext="'none'"
                     :sumbtntext="'sure'"></cloudMessageBox> -->
    <!-- <showSearch /> -->
    <!-- <network :toshowtooltip="1" /> -->
    <!-- <cloudTabgroup @group-change="groupChange"
                   :testgroup="['one','two','three','four']" /> -->

    <!-- <clouddropdown :dropdowncontent='dropdowncontent' /> -->

    <br />
    <br />
    <br />
    <clouddropdown :showcontent="'Models: All'"
                   :fixedtitle="'Models: '"
                   :dropdowncontent="dropdowncontent" />
    <br />
    <br />
    <br />
    <lineChart :linechartlist='lineChartRes.data.cpu_info'
               :id="'chartfirst'"
               :max='100'
               :interval='25'
               :company="'Mb'"
               :tooldesc="'实时上网率'"
               :firstlinecolor="'#FF5858'"
               :lastlinecolor="'#FF9A00'"
               :firstlinebgcolor="'rgba(255,88,88,0.1)'"
               :lastlinebgcolor="'rgba(255,154,0,0.1)'" />

    <!-- <lineChart :linechartlist='lineChartRes.data.cpu_info'
               :id="'chatrlast'"
               :interval='10'
               :max='40'
               :company="'%'"
               :tooldesc="'在线无线终端/活跃终端'"
               :firstlinecolor="'#3ACC64'"
               :lastlinecolor="'#4676E4'"
               :firstlinebgcolor="'rgba(58,204,100,0.1)'"
               :lastlinebgcolor="'rgba(70,118,228,0.1)'" /> -->
  </div>
</template>
<script>
//import { GetSwitchInterface } from "@service/monitor/switch"
export default {
  data () {
    return {
      chulai: false,
      // connectionData: [
      //   { date: "2020/08/05", lable: "11:00", value: "0.95" },
      //   { date: "2020/08/05", lable: "12:00", value: "0.32" },
      //   { date: "2020/08/05", lable: "13:00", value: "0.85" },
      //   { date: "2020/08/05", lable: "14:00", value: "0.65" },
      //   { date: "2020/08/05", lable: "15:00", value: "0.7" },
      // ],
      // tit: '连接状态',
      // gtit: '连通',
      // htit: '断开',
      addOrderVisible: false,
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
      //面积图看效果假数据
      lineChartRes: require('../../../public/json/lineChartRes.json'),
    }
  },
  methods: {
    // mesbox () {
    //   this.addOrderVisible = true
    // },
    // addOrderconfirm () {      //确定后需要进行的事项
    //   this.addOrderVisible = false
    // },
    groupChange (item, index) {
      console.log(item, index)
    }
  },
  mounted () {
    // let payload = {
    //   "deviceId": "00D0F8-RG%2DS6120%2D20XS4VS2QXS-G1NB1XY000348",
    //   "productClass": "RG-S6120-20XS4VS2QXS"
    // }
    // GetSwitchInterface(payload).then(res => {
    //   //console.log(res.data.data.switch_config_data)
    //   console.log(eval("(" + res.data.data.switch_config_data + ")"))
    //   //let dataforswitch = eval("(" + res.data.data.switch_config_data + ")")
    //   console.log(res.data.data.interfaceValues)
    //   //console.log(Object.assign(dataforswitch, res.data.data.interfaceValues[+(dataforswitch.name)]))
    //   console.log(res)
    //   //this.$refs.dotestStatus.testStatus
    // })
    // this.$refs.dotit.connectionData = this.connectionData;
    // this.$refs.dotit.tit = this.tit;
    // this.$refs.dotit.gtit = this.gtit;
    // this.$refs.dotit.htit = this.htit;
    // console.log(this.test)
    // console.log(this.test.data.interfaceValues[1])
    // this.test.data.switch_config_data.forEach(element => {
    //   element.forEach(item => {
    //     item.forEach(item1 => {
    //       // item1[0] = this.test.data.interfaceValues[+(item1[0].value)]
    //       item1[0] = Object.assign(item1[0], this.test.data.interfaceValues[+(item1[0].value)]);
    //     })
    //   })
    // });
    // console.log(this.test)

    // console.log(this.test)
  }
}
</script>
<style>
</style>