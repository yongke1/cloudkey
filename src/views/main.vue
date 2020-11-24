<style lang="scss" scoped>
.container {
  .el-aside {
    min-height: calc(100vh);
    background-color: #242635;
    .logo-box {
      height: 50px;
      display: flex;
      align-items: center;
      padding: 0 20px;
    }
  }
  .el-main {
    padding: 0;
  }
}
</style>
<template>
  <div class="container">
    <el-container>
      <el-aside width="220px">
        <div class="logo-box">
          <img src="@assets/img/login/logo.png">
        </div>
        <containerAside></containerAside>
      </el-aside>
      <el-main>
        <toubu></toubu>
        <router-view></router-view>
      </el-main>
    </el-container>
  </div>
</template>
<script>
import containerAside from '@/components/aside/'; //侧边栏
import toubu from '../components/toubu/'
export default {
  name: "home",
  components: {
    containerAside,
    toubu
  },
  data () {
    return {

    }
  },
  mounted () {

  },
  methods: {

  }
}
</script>