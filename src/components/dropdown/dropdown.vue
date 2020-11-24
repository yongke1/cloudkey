<template>
  <div>
    <el-dropdown trigger="click"
                 class="dropdown-ul"
                 @command="handleCommand"
                 placement='bottom-start'>
      <span class="el-dropdown-link">
        {{showcontentnew}}<i class="el-icon-arrow-down el-icon--right"></i>
      </span>

      <el-dropdown-menu slot="dropdown"
                        :style="{width:menuWidth+'px',height:menuHeight+'px'}">
        <el-dropdown-item v-for="(item,index) in dropdowncontent"
                          :key="index"
                          :command="item">{{item}}</el-dropdown-item>
      </el-dropdown-menu>
    </el-dropdown>
  </div>
</template>
<script>
export default {
  name: 'clouddropdown',
 data () {
    return {
      showcontentnew: this.showcontent
    }
  },
  props: {
    dropdowncontent: {
      type: Array
    },
    menuWidth: {
      type: Number,
      default: 200   //默认值 
    },
    menuHeight: {
      type: Number,

    },
    showcontent: {
      type: String,
    },
    fixedtitle: {
      type: String,
    }
  },
  methods: {
    handleCommand (command) {
      this.showcontentnew = this.fixedtitle + command
      this.change(command)
    },
    change (command) {
      this.$emit('clickitem-change', command)
    }
  }
}
</script>
<style lang="scss" scoped>
.dropdown-ul {
  scrollbar-width: none; /* Firefox */
  -ms-overflow-style: none; /* IE 10+ */
  ::-webkit-scrollbar {
    display: none; /* Chrome Safari */
  }
}
.el-dropdown-menu {
  width: 200px;
  padding: 0px 0px 0px 0px;
  //top: 20px;
  //height: 240px;
  margin-top: 0px;
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
.el-dropdown-link {
  color: #4576e4;
  font-size: 12px;
  font-family: Arial;
  font-weight: 400;
  cursor: pointer;
  margin-right: 20px;
}
/deep/.popper__arrow {
  border: 0;
}
/deep/.popper__arrow::after {
  content: none;
}
</style>