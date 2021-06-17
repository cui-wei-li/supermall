import {require} from './request'

export function getHomeMultidata() {
    return require({
        url: '/home/multidata'
    })
}