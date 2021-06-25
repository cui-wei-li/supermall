<template>
    <div class="bottom-bar">
        <div class="check-content">
            <check-button class="check-button" @click.native="checkClick" :is-checked="isSelectAll"/>
            <span>全选</span>
        </div>

        <div class="price">
            合计 {{totalPrice}}
        </div>

        <div class="calculate" @click="calcClick">
            去计算 ({{checkLength}})
        </div>
    </div>
</template>

<script>
import CheckButton from 'components/content/checkButton/CheckButton.vue'
export default {
    name: "CartBottomBar",
    components: { 
        CheckButton
    },
    computed: {
        totalPrice() {
            return '￥' + this.$store.state.cartList.filter( item => {
                return item.checked
            }).reduce( (preValue,item) =>{
                return preValue + item.price * item.count
            },0).toFixed(2)
        },
        checkLength() {
            return this.$store.state.cartList.filter(item => item.checked).length
        },
        isSelectAll() {
            //return !(this.$store.state.cartList.filter(item => !item.checked).length)
            if(this.$store.state.cartList.length === 0) {
                return false
            }
            return !(this.$store.state.cartList.find(item => !item.checked))
        }
    },
    methods: {
        checkClick() {
            if(this.isSelectAll){
                this.$store.state.cartList.forEach(item => item.checked=false)
            }else {
                this.$store.state.cartList.forEach(item => item.checked=true)
            }
        },
        calcClick() {
            if(this.checkLength === 0){
                this.$toast.show("请选择购买的商品",2000)
            }
        }
    }
}
</script>

<style scoped>
    .bottom-bar {
        height: 40px;
        background-color: #eee;
        position: relative;
        line-height: 40px;
        display: flex;
    }

    .check-content {
        display: flex;
        align-items: center;
        margin-left: 10px;
        width: 80px;
    }

    .check-button {
        width: 25px;
        height: 25px;
        line-height: 20px;
        margin-right: 5px;
    }

    .price {
        margin-left: 30px;
        flex: 1;
    }

    .calculate {
        width: 80px;
        background-color: red;
        color: #fff;
        text-align: center;
    }

</style>