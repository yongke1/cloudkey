export default {
  data () {
    return {
      //在线信息
      onlineInfo: {
        SWITCHES: { online: 0, sum: 0 },
        AC: { online: 0, sum: 0 },
        AP: { online: 0, sum: 0 },
        GATEWAY: { online: 0, sum: 0 },
        USER: { online: 0, sum: 0 },
      },
      //device 设备列表
      devicesList: [],
    }
  }
}