<template>
  <div class="recommend">
     <div v-for="item in  recommends" class="recommend-item">
         <a :href="item.link">
             <img :src="item.image" alt="">
             <div>{{item.title}}</div>
         </a>
     </div>
  </div>
</template>

<script>
export default {
    name: "RecommendView",
    props: {
        recommends: {
            type: Array,
            //当默认值是数组或对象时,默认值必须是一个函数 
            default() {
                return []
            }
        }
    }
}
</script>

<style>

    .recommend {
        display: flex;
        width: 100%;
        text-align: center;
        font-size: 12px;
        padding: 10px 0 20px;
        border-bottom: 10px solid #eee;
    }

    .recommend-item {
        flex: 1;
    }

    .recommend-item img {
        width: 60px;
        height: 60px;
        margin-bottom: 10px;
    }
</style>