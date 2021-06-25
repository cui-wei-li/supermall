import Vue from 'vue'
import Vuex from 'vuex'
import mutations from './mutations'
import actions from './actions'
import getters from './getters'

//安装使用插件
Vue.use(Vuex)

const state = {
    cartList: []
}

//创建store对象
const store =  new Vuex.Store({
    state,
    //mutations唯一的目的：修改state的状态,原则：每个方法尽可能完成的事件比较单一
    // mutations: {
    //     addCounter(state,payload) {
    //         //product.count += 1;
    //         payload.count++
    //     },
    //     addToCart(state,payload) {
    //         state.cartList.push(payload)
    //     }
    // },
    mutations,
    // actions: {
    //     addCart(context,payload) {

    //         let product = context.state.cartList.find(item => item.iid === payload.iid)

    //         if(product){
    //             context.commit('addCounter',product)
    //         }else{
    //             payload.count = 1
    //             //context.state.cartList.push(payload)
    //             context.commit('addToCart',payload)
    //         }
    //     }
    // }
    actions,
    getters
})

//挂载到Vue实例上
export default store