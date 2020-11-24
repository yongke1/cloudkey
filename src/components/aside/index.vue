<style lang="scss" scoped>
.container-aside-box {
  font-size: 13px;
  position: relative;
  .foot-box {
    position: fixed;
    width: 220px;
    display: flex;
    height: 50px;
    bottom: 0;
    left: 0;
    border-top: 1px solid #434554;
    background-color: rgb(36, 38, 53);
    div {
      flex: 0.25;
      display: flex;
      align-items: center;
      justify-content: center;
      a {
        margin: 0;
      }
    }
    .icon {
      width: 22px;
      height: 22px;
    }
    .foot-img-info {
      background: url("~@assets/img/bg_icon.png") no-repeat -304px -40px;
    }
    .foot-img-hint {
      background: url("~@assets/img/bg_icon.png") no-repeat -216px -40px;
    }
    .foot-img-dialog {
      background: url("~@assets/img/bg_icon.png") no-repeat -346px -40px;
    }
    .foot-img-setting {
      background: url("~@assets/img/bg_icon.png") no-repeat -260px -40px;
    }

    .foot-img-info:hover {
      background: url("~@assets/img/bg_icon.png") no-repeat -304px -124px;
    }
    .foot-img-hint:hover {
      background: url("~@assets/img/bg_icon.png") no-repeat -216px -124px;
    }
    .foot-img-dialog:hover {
      background: url("~@assets/img/bg_icon.png") no-repeat -346px -124px;
    }
    .foot-img-setting:hover {
      background: url("~@assets/img/bg_icon.png") no-repeat -260px -124px;
    }
  }
}
.title_text {
  color: rgba(255, 255, 255, 0.6);
}
.title_text:hover {
  color: rgba(255, 255, 255, 1);
}
.serch {
  padding: 20px;
  border-top: 1px solid #434554;
  border-bottom: 1px solid #434554;
  color: white;
  .pull-down {
    background: url("~@assets/img/bg_icon.png") no-repeat -41px -341px;
    width: 9px;
    height: 5px;
    display: inline-block;
    position: relative;
    left: 5px;
  }
}
/deep/ .el-menu {
  border: 0 !important;
}

.key-home {
  display: inline-block;
  background: url("~@assets/img/bg_icon.png") no-repeat -40px -40px;
  margin-right: 10px;
  width: 22px;
  height: 22px;
}

.key-home-open {
  background: url("~@assets/img/bg_icon.png") no-repeat -40px -82px;
  margin-right: 10px;
  display: inline-block;
  width: 22px;
  height: 22px;
}
.menu-key-home:hover {
  .key-home {
    background: url("~@assets/img/bg_icon.png") no-repeat -40px -124px;
  }
  span {
    color: white;
  }
}
.key-monitor {
  background: url("~@assets/img/bg_icon.png") no-repeat -84px -40px;
}
.key-monitor-open {
  background: url("~@assets/img/bg_icon.png") no-repeat -84px -82px;
}
.menu-box-2:hover {
  .key-monitor {
    background: url("~@assets/img/bg_icon.png") no-repeat -84px -124px;
  }
  span {
    color: white;
  }
}
.key-config {
  background: url("~@assets/img/bg_icon.png") no-repeat -128px -40px;
}
.key-config-open {
  background: url("~@assets/img/bg_icon.png") no-repeat -128px -82px;
}
.menu-box-3:hover {
  .key-config {
    background: url("~@assets/img/bg_icon.png") no-repeat -128px -124px;
  }
  span {
    color: white;
  }
}
.key-main {
  background: url("~@assets/img/bg_icon.png") no-repeat -172px -40px;
}
.key-main-open {
  background: url("~@assets/img/bg_icon.png") no-repeat -172px -82px;
}

.menu-box-4:hover {
  .key-main {
    background: url("~@assets/img/bg_icon.png") no-repeat -172px -124px;
  }
  span {
    color: white;
  }
}
.icon {
  margin-right: 10px;
  display: inline-block;
  width: 22px;
  height: 22px;
}
.icon-overview {
  background: url("~@assets/img/bg_icon.png") no-repeat -41px -166px;
}
.icon-equipment {
  background: url("~@assets/img/bg_icon.png") no-repeat -75px -166px;
}
.icon-user {
  background: url("~@assets/img/bg_icon.png") no-repeat -109px -166px;
}
.menu-chiled-title {
  i {
    width: 14px;
    height: 14px;
    display: inline-block;
    margin-right: 10px;
  }
  span {
    font-size: 13px;
    color: rgba(255, 255, 255, 0.4);
  }
}
/deep/ .el-menu-item-group {
  li:hover {
    color: #4576e4 !important;
    &::before {
      background-color: #4576e4;
    }
  }
  li {
    color: rgba(255, 255, 255, 0.4) !important;
  }
  /deep/ .el-menu-item::before {
    content: "";
    display: block;
    width: 3px;
    height: 3px;
    border-radius: 50%;
    float: left;
    background-color: #9a9ba1;
    position: absolute;
    left: 20%;
    top: 1.4rem;
  }
  .el-menu-item {
    padding-left: 64px !important;
  }
}
/deep/ .el-menu-item-group__title {
  display: flex;
}
/deep/ .el-menu-item {
  position: relative !important;
}
/deep/ .el-submenu .el-menu-item {
  height: 40px;
  line-height: 40px;
}
</style>
<template>
  <div class="container-aside-box">
    <div class="serch">
      <span>FS&nbsp;Switch&nbsp;intelligen</span>
      <i class="pull-down"></i>
    </div>
    <el-menu class="el-menu-vertical-demo"
             @open="handleOpen"
             @close="handleClose"
             background-color="#242635"
             text-color="#9a9ba1"
             active-text-color="#ffffff"
             unique-opened
             collapse-transition
             router>
      <el-menu-item @click="clickDashboard">
        <div class="menu-key-home">
          <i :class="isOpenDash?'key-home-open':'key-home'"></i>
          <span>
            Doshboard
          </span>
        </div>
      </el-menu-item>

      <el-submenu index="1">
        <template slot="title">
          <div class="menu-box-2">
            <i :class="menuStatus[0].isOpen?'key-monitor-open icon':'key-monitor icon'"></i>
            <span>Monitor</span>
          </div>
        </template>
        <el-menu-item-group class="menu-chiled-title">
          <template slot="title">
            <i class="icon-overview"></i>
            <span>Overview</span>
          </template>
          <el-menu-item index="network">Network</el-menu-item>
          <el-menu-item index="alter">Alerts</el-menu-item>
          <el-menu-item index="DataInsight">Data Insight</el-menu-item>
        </el-menu-item-group>
        <el-menu-item-group class="menu-chiled-title">
          <template slot="title">
            <i class="icon-equipment"></i>
            <span>Overview</span>
          </template>
          <el-menu-item index="1-3">AP</el-menu-item>
          <el-menu-item index="gateway">Gateway</el-menu-item>
          <el-menu-item index="switch">Switch</el-menu-item>
          <el-menu-item index="1-3">AC</el-menu-item>
        </el-menu-item-group>
        <el-menu-item-group class="menu-chiled-title">
          <template slot="title">
            <i class="icon-user"></i>
            <span>User</span>
          </template>
          <el-menu-item index="1-3">User list</el-menu-item>
          <el-menu-item index="1-3">User experience</el-menu-item>
          <el-menu-item index="1-3">Certification manag...</el-menu-item>
        </el-menu-item-group>

        <!-- <el-submenu index="1-4">
          <template slot="title">选项4</template>
          <el-menu-item index="1-4-1">选项1</el-menu-item>
        </el-submenu> -->
      </el-submenu>
      <el-submenu index="2">
        <template slot="title">
          <div class="menu-box-3">
            <i :class="menuStatus[1].isOpen?'key-config-open icon':'key-config icon'"></i>
            <span>Config</span>
          </div>
        </template>
        <el-menu-item-group>
          <template slot="title">分组一</template>
          <el-menu-item index="1-1">选项1</el-menu-item>
          <el-menu-item index="Wireless">Wireless configuration</el-menu-item>
        </el-menu-item-group>
        <el-menu-item-group title="分组2">
          <el-menu-item index="1-3">选项3</el-menu-item>
        </el-menu-item-group>
        <el-submenu index="1-4">
          <template slot="title">选项4</template>
          <el-menu-item index="1-4-1">选项1</el-menu-item>
        </el-submenu>
      </el-submenu>
      <el-submenu index="3">
        <template slot="title">
          <div class="menu-box-4">
            <i :class="menuStatus[2].isOpen?'key-main-open icon':'key-main icon'"></i>
            <span>Maintenanc</span>
          </div>
        </template>
        <el-menu-item-group>
          <template slot="title">分组一</template>
          <el-menu-item index="1-1">选项1</el-menu-item>
          <el-menu-item index="1-2">选项2</el-menu-item>
        </el-menu-item-group>
        <el-menu-item-group title="分组2">
          <el-menu-item index="1-3">选项3</el-menu-item>
        </el-menu-item-group>
        <el-submenu index="1-4">
          <template slot="title">选项4</template>
          <el-menu-item index="1-4-1">选项1</el-menu-item>
        </el-submenu>
      </el-submenu>
      <!-- <el-submenu v-for="item in menuList"
                  :index="item.id"
                  :key="item.id">
        <template slot="title">
          <div :class="'menu-box-'+item.id">
            <i v-if="item.isOpen"
               :class="item.icon+'-open icon'"></i>
            <i v-else
               :class="item.icon+' icon'"></i>
            <span slot="title"
                  class="title_text"
                  :style="item.isOpen?'color: white;':''">{{item.text}}</span>
          </div>
        </template>
        <el-menu-item v-for="item1 in item.children"
                      :key="item1.id"
                      :index="item1.url">{{item1.text}}</el-menu-item>
      </el-submenu> -->
    </el-menu>
    <div class="foot-box">
      <div v-for="(item,index) in footImgList"
           :key="index">
        <a href="javascipt:;"
           :class="item.className+' icon'"></a>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: 'container-aside',
  computed: {

  },
  data () {
    return {
      //菜单列表
      menuList: [
        {
          icon: 'key-monitor',
          text: 'Monitor',
          id: '2',
          isOpen: false,
          children: [
            {
              text: 'IO单处理',
              id: '2-1',
              url: '/main/customerAudit'
            },
            {
              text: 'MP模块',
              id: '2-2',
              url: '/main/customerMp'
            },
            {
              text: 'TODO',
              id: '2-3',
              url: '/main/customerTodo'
            },
            {
              text: '待办项',
              id: '2-4',
              url: '/main/customerDealt'
            },
            {
              text: '发票管理',
              id: '2-5',
              url: '/main/customerInvoice'
            }
          ]
        }, {
          icon: 'key-config',
          text: 'Config',
          id: '3',
          isOpen: false,
          children: [
            {
              text: 'IO单处理',
              id: '2-1',
              url: '/main/customerAudit'
            },
            {
              text: 'MP模块',
              id: '2-2',
              url: '/main/customerMp'
            },
            {
              text: 'TODO',
              id: '2-3',
              url: '/main/customerTodo'
            },
            {
              text: '待办项',
              id: '2-4',
              url: '/main/customerDealt'
            },
            {
              text: '发票管理',
              id: '2-5',
              url: '/main/customerInvoice'
            }
          ]
        },
        {
          icon: 'key-main',
          text: 'Maintenanc',
          id: '4',
          isOpen: false,
          children: [
            {
              text: 'IO单处理',
              id: '2-1',
              url: '/main/customerAudit'
            },
            {
              text: 'MP模块',
              id: '2-2',
              url: '/main/customerMp'
            },
            {
              text: 'TODO',
              id: '2-3',
              url: '/main/customerTodo'
            },
            {
              text: '待办项',
              id: '2-4',
              url: '/main/customerDealt'
            },
            {
              text: '发票管理',
              id: '2-5',
              url: '/main/customerInvoice'
            }
          ]
        },
      ],
      isOpenDash: true,//是否打开dash 控制显示状态
      menuStatus: [{ name: 'monitor', id: 1, isOpen: false }, { name: 'config', id: 2, isOpen: false }, { name: 'main', id: 3, isOpen: false }],
      footImgList: [{ className: "foot-img-info" }, { className: "foot-img-hint" }, { className: "foot-img-dialog" }, { className: "foot-img-setting" }]
    }
  },
  mounted () {

  },
  methods: {
    handleOpen (key, keyPath) {
      this.isOpenDash = false;
      this.menuStatus.forEach(item => {
        if (+(keyPath[0]) === item.id) {
          item.isOpen = true
        } else {
          item.isOpen = false
        }
      })
    },
    handleClose () {

    },
    handleUrl () {

    },
    clickDashboard () {
      this.menuStatus.forEach(item => {
        item.isOpen = false
      })
      this.isOpenDash = true
      if (this.$route.name !== 'dashboard') {
        this.$router.push({ name: 'dashboard' })
      }
    }
  }
}
</script>