import Vue from 'vue'
import VueRouter from 'vue-router'

//懒加载组件
const Home = () => import('views/home/home')
const Category = () => import('views/category/category')
const ShopCart = () => import('views/shopcart/shopcart')
const Profile = () => import('views/profile/profile')

Vue.use(VueRouter)

const routes = [
    {
        path: '/',
        redirect: '/home'
    },
    {
        path: '/home',
        component: Home
    },
    {
        path: '/category',
        component: Category
    },
    {
        path: '/shopcart',
        component: ShopCart
    },
    {
        path: '/profile',
        component: Profile
    }
]

const router = new VueRouter({

    routes,
    mode: 'history'

})

export default router;