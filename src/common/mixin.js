import {debounce} from './utils'
import BackTop from 'components/content/backTop/BackTop' 

export const itemListenerMixin = {
    data() {
        return {
            itemImageListener: null
        }
    },
    mounted() {
        const refresh = debounce(this.$refs.scroll.refresh,500);

        this.itemImageListener =  () => {
            refresh();
        }
        
        this.$bus.$on('itemImageLoad',this.itemImageListener)
    }
}

export const backTopMixin = {
    data() {
        return {
            isShowBackTop: false
        }
    },
    components: {
        BackTop
    },
    methods: {
        backTop() {
            this.$refs.scroll.scrollTo(0,0,300)
        }
    }
}