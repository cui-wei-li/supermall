<template>
  <div id="detail">
        <detail-nav-bar class="detail-nav"></detail-nav-bar>
        <scroll class="content" ref="scroll">
            <detail-swiper :topImages="topImages"></detail-swiper>

            <detail-base-info :goods="goods"/>

            <detail-shop-info :shop="shop"/>

            <detail-goods-info :detail-info="detailInfo" @imageLoad="imageLoad"/>

            <detail-param-info :param-info="paramInfo"/>
        </scroll>
  </div>
</template>

<script>
import DetailNavBar from './childComps/DetailNavBar.vue'
import DetailSwiper from './childComps/DetailSwiper.vue'
import DetailBaseInfo from './childComps/DetailBaseInfo.vue'
import DetailShopInfo from './childComps/DetailShopInfo.vue'
import DetailGoodsInfo from './childComps/DetailGoodsInfo.vue'
import DetailParamInfo from './childComps/DetailParamInfo.vue'

import Scroll from 'components/common/scroll/Scroll'

import {getDetail,GoodsInfo,Shop,GoodsParam} from 'network/detail.js'

export default {
    name: 'Detail',
 
    data() {
        return {
            iid: null,
            topImages: [],
            goods: {},
            shop: {},
            detailInfo: {},
            paramInfo: {},
        }
    },
    components: {
        DetailNavBar,
        DetailSwiper,
        DetailBaseInfo,
        DetailShopInfo,
        DetailGoodsInfo,
        DetailParamInfo,

        Scroll,
        
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
        })
    },
    methods: {
        imageLoad() {
            this.$refs.scroll.refresh();
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
        height: calc(100% - 44px);
        overflow: hidden;
    }
</style>