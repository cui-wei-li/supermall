<template>
  <div id="detail">
        <!--在html中，事件监听可以使用驼峰规则，而传入属性的话驼峰转换为'-'  -->
        <detail-nav-bar class="detail-nav" @titleClick="titleClick" ref="nav"></detail-nav-bar>
        <scroll class="content" ref="scroll"  :probe-type="3" @scroll="contentscroll">
            <detail-swiper :topImages="topImages"></detail-swiper>

            <detail-base-info :goods="goods"/>

            <detail-shop-info :shop="shop"/>

            <detail-goods-info :detail-info="detailInfo" @imageLoad="imageLoad"/>

            <detail-param-info ref="params" :param-info="paramInfo"/>

            <detail-comment-info ref="comment" :comment-info="commentInfo"/>

            <goods-list ref="recommend" :goods="recommends"/>

        </scroll>
        <back-top @click.native="backTop" v-show="isShowBackTop" />
        <detail-bottom-bar @addCart="addToCart" />
  </div>
</template>

<script>
import DetailNavBar from './childComps/DetailNavBar.vue'
import DetailSwiper from './childComps/DetailSwiper.vue'
import DetailBaseInfo from './childComps/DetailBaseInfo.vue'
import DetailShopInfo from './childComps/DetailShopInfo.vue'
import DetailGoodsInfo from './childComps/DetailGoodsInfo.vue'
import DetailParamInfo from './childComps/DetailParamInfo.vue'
import DetailCommentInfo from './childComps/DetailCommentInfo.vue'
import DetailBottomBar from './childComps/DetailBottomBar.vue'

import Scroll from 'components/common/scroll/Scroll'
import GoodsList from 'components/content/goods/GoodsList.vue'

import {getDetail,getRecommend,GoodsInfo,Shop,GoodsParam} from 'network/detail.js'
import {itemListenerMixin,backTopMixin} from 'common/mixin'
import {debounce} from 'common/utils'

import {mapActions} from 'vuex'

export default {
    name: 'Detail',
    mixins: [itemListenerMixin,backTopMixin],
    data() {
        return {
            iid: null,
            topImages: [],
            goods: {},
            shop: {},
            detailInfo: {},
            paramInfo: {},
            commentInfo: {},
            recommends: [],
            themeTopYs:[],
            getThemeTopYs: null,
            currentIndex: 0
        }
    },
    components: {
        DetailNavBar,
        DetailSwiper,
        DetailBaseInfo,
        DetailShopInfo,
        DetailGoodsInfo,
        DetailParamInfo,
        DetailCommentInfo,
        DetailBottomBar, 

        Scroll,
        GoodsList,
    },
    created() {
        //保存iid
        this.iid = this.$route.params.iid
        //请求详情数据
        getDetail(this.iid).then( (res) => {
            console.log(res);
            const data = res.result;
            //抽取所需要的数据
            this.topImages = data.itemInfo.topImages;
            this.goods = new GoodsInfo(data.itemInfo,data.columns,data.shopInfo.services);
            this.shop = new Shop(data.shopInfo);
            this.detailInfo = data.detailInfo;
            this.paramInfo = new GoodsParam(data.itemParams.info,data.itemParams.rule);
            if(data.rate.cRate !== 0){
                this.commentInfo = data.rate.list[0];
            } 
            //值不对：this.$refs.params.$el没有渲染
            //     this.themeTopYs = []

            //     this.themeTopYs.push(0)
            //     this.themeTopYs.push(this.$refs.params.$el.offsetTop)
            //     this.themeTopYs.push(this.$refs.comment.$el.offsetTop)
            //     this.themeTopYs.push(this.$refs.recommend.$el.offsetTop)
            // )

            //值不对：图片没有加载完
            // this.$nextTick( () => {
            //     this.themeTopYs = []

            //     this.themeTopYs.push(0)
            //     this.themeTopYs.push(this.$refs.params.$el.offsetTop)
            //     this.themeTopYs.push(this.$refs.comment.$el.offsetTop)
            //     this.themeTopYs.push(this.$refs.recommend.$el.offsetTop)
            // }) //该函数会在将前面的数据渲染完成，并请求下一次数据执行前会执行

            this.getThemeTopYs = debounce( () =>{
                this.themeTopYs = []
                this.themeTopYs.push(0)
                this.themeTopYs.push(this.$refs.params.$el.offsetTop)
                this.themeTopYs.push(this.$refs.comment.$el.offsetTop)
                this.themeTopYs.push(this.$refs.recommend.$el.offsetTop)
                this.themeTopYs.push(Number.MAX_VALUE)
                //console.log(this.themeTopYs)
            },500)
        })
        //获取推荐数据
        getRecommend().then( (res) => {
            console.log(res);
            this.recommends = res.data.list;
        })
    },
    mounted() {
        // const refresh = debounce(this.$refs.scroll.refresh,500);

        // this.itemImageListener =  () => {
        //     refresh();
        // }
        
        // this.$bus.$on('itemImageLoad',this.itemImageListener)
    },
    updated() {
        //值不对：图片没有加载完
        // this.themeTopYs = []

        // this.themeTopYs.push(0)
        // this.themeTopYs.push(this.$refs.params.$el.offsetTop)
        // this.themeTopYs.push(this.$refs.comment.$el.offsetTop)
        // this.themeTopYs.push(this.$refs.recommend.$el.offsetTop)
    },
    //因为Detail没有keep-alive,所以不会执行deactived()方法，离开时会执行destroyed()方法。
    destroyed() {
        this.$bus.$off('itemImageLoad',this.itemImageListener)
    },
    methods: {
        ...mapActions(['addCart']),
        imageLoad() {
            this.$refs.scroll.refresh();

            this.getThemeTopYs();
        },
        titleClick(index) {
            this.$refs.scroll.scrollTo(0,-this.themeTopYs[index],200);
        },
        contentscroll(position) {
            const positiony = -position.y

            // for(let i in this.themeTopYs){
                
            //     if((i < this.themeTopYs.length - 1 && positiony >= this.themeTopYs[parseInt(i)] && positiony < this.themeTopYs[parseInt(i)+1])
            //         || (i == this.themeTopYs.length - 1 && positiony >= this.themeTopYs[i])){
            //         this.currentIndex = i;
            //         console.log(i);
            //         this.$refs.nav.currentIndex = this.currentIndex;
            //     }
            // }

            for(let i = 0; i < this.themeTopYs.length-1; i++){
                if(this.currentIndex !== i && (positiony >= this.themeTopYs[parseInt(i)] && positiony < this.themeTopYs[parseInt(i)+1])){
                    this.currentIndex = i;
                    this.$refs.nav.currentIndex = this.currentIndex;
                }
            }

            this.isShowBackTop = positiony > 1000
        },
        addToCart() {
            //保存商品信息
            const product = {};
            product.image = this.topImages[0];
            product.title = this.goods.title;
            product.desc = this.goods.desc;
            product.price = this.goods. realPrice;
            product.iid = this.iid;

            //将商品添加到购物车(vuex保存状态)
            //this.$store.commit('addCart',product)
            // this.$store.dispatch('addCart',product).then( res => {
            //     console.log(res)
            // })
            this.addCart(product).then(res => {
                this.$toast.show(res,2000)
            })
        }
    }
}
</script>

<style scoped>
    #detail {
        position: relative;
        z-index: 9;
        background-color: #fff;
        height: 100vh;
    }

    .detail-nav {
        position: relative;
        z-index: 9;
        background-color: #fff;
    }

    .content {
        height: calc(100% - 44px - 49px);
        overflow: hidden;
    }
</style>