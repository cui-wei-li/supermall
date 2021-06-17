import axios from 'axios'

export function require3(config,success,failure) {
    const instance = axios.create({
        baseURL: 'http://123.207.32.32:8000',
        timeout: 5000
    }) 

    //发送网络请求
    instance(config)
    .then( res => {
        success(res);
    }).catch( err => {
        failure(err);
    })
}

export function require1(config) {
    const instance = axios.create({
        baseURL: 'http://123.207.32.32:8000',
        timeout: 5000
    }) 

    //发送网络请求
    instance(config.baseConfig)
    .then( res => {
        config.success(res);
    }).catch( err => {
        config.failure(err);
    })
}

export function require2(config) {
     
    return new Promise( (resovle,rejetct) => {

        const instance = axios.create({
            baseURL: 'http://123.207.32.32:8000',
            timeout: 5000
        })

        instance(config).then( res => {
            resovle(res)
        }).catch(err => {
            rejetct(err)
        })
    })
}

//封装请求终极版
export function require(config) {
     
    //1、创建实例
    const instance = axios.create({
        baseURL: 'http://123.207.32.32:8000',
        timeout: 5000
    })


    /* axios.interceptors()拦截全局的请求 */
    //2、拦截实例的请求和响应
    instance.interceptors.request.use((config) => {

        return config;
    },(error) => {

        return error;
    });

    instance.interceptors.response.use((result) => {

        return result.data;
    },(error) => {

        return error;
    });

    //3、发送请求
    return instance(config)
}