import Toast from './Toast'

const obj = {}

obj.install = function(Vue) {
    //1.创建组件构造器
    const toastCountrustor = Vue.extend(Toast)
    //2、new方式 根据组件构造器，创建组件对象
    const toast = new toastCountrustor()
    //3、将足见对象，手动挂载到某一个对象上
    toast.$mount(document.createElement('div'))

    document.body.appendChild(toast.$el)
    Vue.prototype.$toast = toast
}

export default obj