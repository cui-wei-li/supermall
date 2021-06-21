import {require} from './request'

export function getHomeMultidata() {
    return require({
        url: '/home/multidata'
    })
}

export function getHomeGoods(type,page) {
    return require({
        url: '/home/data',
        params: {
            type,
            page
        }
    })
}