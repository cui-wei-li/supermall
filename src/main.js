import Vue from 'vue'
import App from './App.vue'
import router from './router/index.js'
import store from './store/index'
import toast from 'components/common/toast/index.js'
import FastClick from 'fastclick'
import VueLazyLoad from 'vue-lazyload'


//生产环境下减少警告的产生,提升性能
Vue.config.productionTip = false
//添加事件总线对象
Vue.prototype.$bus = new Vue()
//安装toast插件
Vue.use(toast)
//解决移动端300ms的延迟
FastClick.attach(document.body)
//使用图片懒加载
Vue.use(VueLazyLoad)
//使用方法：将img的src属性改为v-lazy

new Vue({
  render: h => h(App),
  router,
  store
}).$mount('#app')
