<template>
  <div id="app">
    <!-- keep-alive 路由跳转之后created函数里的不会重新执行，为了获取不同的商品，所以要排除detail的页面  -->
    <keep-alive exclude="Detail">
      <router-view></router-view>
    </keep-alive>
    <main-tab-bar/>
  </div>
</template>

<script>
import MainTabBar from 'components/content/tabbar/MainTabBar.vue'

export default {
  name: 'App',
  components: {
    MainTabBar
  }
}
</script>

<style>
  @import "./assets/css/base.css";
</style>
