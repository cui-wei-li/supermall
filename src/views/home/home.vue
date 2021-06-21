<template>
  <div id="home" class="wrapper">

    <nav-bar class="home-nav">
      <div slot="center">购物街</div>
    </nav-bar>

    <scroll class="content" 
            ref="scroll" 
            :probe-type="3" @scroll="contentScroll" 
            :pull-up-load="true" @pullingUp="loadMore">
      <home-swiper :banners="banners"></home-swiper>
      <recommend-view :recommends="recommends"></recommend-view>
      <feature-view></feature-view>
      <tab-control class="tab-control" :titles="['流行','新款','精选']" @tabClick="tabClick"/>
      <goods-list :goods="showGoods"/>
    </scroll>

    <!-- 组件不能监听点击，要想监听点击，必须加上.native 
    当我们需要监听一个组件的原生事件时，必须给对应的事件加上native修饰符，才能进行监听-->
    <back-top @click.native="backClick" v-show="isShowBackTop"/>
  </div>
</template>

<script>
import HomeSwiper from './childComps/HomeSwiper.vue'
import RecommendView from './childComps/RecommendView.vue'
import FeatureView from './childComps/FeatureView.vue'

import NavBar from  'components/common/navbar/NavBar.vue'
import TabControl from 'components/content/tabControl/TabControl'
import GoodsList from 'components/content/goods/GoodsList'
import Scroll from 'components/common/scroll/Scroll'
import BackTop from 'components/content/backTop/BackTop.vue'

import {getHomeMultidata,getHomeGoods} from 'network/home'
import {debounce} from 'common/utils.js'


export default {
    name: 'Home',
    components: {
      NavBar,
      TabControl,
      GoodsList,
      Scroll,
      BackTop,

      HomeSwiper,
      RecommendView,
      FeatureView, 
    },
    data() {
      return {
        banners: [],
        recommends: [],
        goods: {
          'pop': {page: 0, list: []},
          'new': {page: 0, list: []},
          'sell': {page: 0, list: []}
        },
        currentType: 'pop',
        isShowBackTop: false
      }
    },
    //创建好组件之后就要发送异步网络请求数据
    created() {
      //请求多个数据(异步操作)请求首页多个数据
      this.getHomeMultidata();

      //请求商品多个数据
      this.getHomeGoods('pop');
      this.getHomeGoods('new');
      this.getHomeGoods('sell');

    },
    mounted() {
      //监听事件总线
      const refresh = debounce(this.$refs.scroll.refresh,500);

      this.$bus.$on("itemImageLoad",() => {
        // this.$refs.scroll.refresh();
        refresh();
      })

    },
    computed: {
      showGoods() {
        return this.goods[this.currentType].list;
      }
    },
    methods: {
      getHomeMultidata() {
        getHomeMultidata().then(res => {
          console.log(res);
          this.banners = res.data.banner.list;
          this.recommends = res.data.recommend.list;
        })
      },
      getHomeGoods(type) {
        const page = this.goods[type].page + 1;
        getHomeGoods(type,page).then ( res => {
          //res是局部变量，在函数执行完之后会消失,所以采用data中的goods变量将res保存下来
          console.log(res);
          this.goods[type].list.push(...res.data.list);
          this.goods[type].page += 1;

          //因为scroll默认只能加载一次，所以必须刷新，完成上来加载更多
          this.$refs.scroll.finishPullUp();
        })
      },
      tabClick(index) {
        switch(index){
          case 0: 
            this.currentType = 'pop';
            break;
          case 1:
            this.currentType = 'new';
            break;
          case 2:
            this.currentType ='sell';
            break;
        }
      },
      backClick() {
        this.$refs.scroll.scrollTo(0,0,500)
      },
      contentScroll(position){
        //console.log(position);
        this.isShowBackTop = -position.y > 1000
      },
      loadMore() {
        console.log("上拉加载更多");
        this.getHomeGoods(this.currentType)
      },
      
    }
}
</script>

<style scoped>
  #home {
    height: 100vh;
    position: relative;
  }

  .home-nav {
    background-color: var(--color-tint);
    color: #fff;
    /* position: fixed;
    left: 0;
    right: 0;
    top: 0;
    z-index: 5; */
  }

  .tab-control {
    position: relative;
    /* top: 44px; */
    z-index: 9;
  }

  /* .content {
    height: calc(100% - 93px);
    overflow: hidden;
    margin-top: 44px;
  } */

  .content {
    overflow: hidden;

    position: absolute;
    top: 44px;
    bottom: 49px;
    left: 0;
    right: 0;
  }
</style>