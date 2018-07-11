// import Fly from 'flyio'
// import wxEngine from 'flyio/dist/engine-wrapper'
// const fly = new Fly(wxEngine)
// var Fly = require('../lib/wx') // wx.js为您下载的源码文件
var Fly = require('flyio/dist/npm/wx') // npm引入方式
var fly = new Fly() // 创建fly实例

// 配置请求基地址
fly.config.baseURL = 'http://localhost:8080/api/'

// //添加请求拦截器
fly.interceptors.request.use((config, promise) => {
  // 给所有请求添加自定义header
  config.headers['TOKEN'] = 'a'
  // 可以通过promise.reject／resolve直接中止请求
  // promise.resolve("fake data")
  return config
})

// 添加响应拦截器，响应拦截器会在then/catch处理之前执行
fly.interceptors.response.use(
  (response, promise) => {
    console.log('fly', response)
    // 只将请求结果的data字段返回
    return response.data
  }, (err, promise) => {
    // 发生网络错误后会走到这里
    if (err.status === 400) {
      console.log('fly 400', err)
    }
    // promise.resolve('ssss')
    console.log('fly err', err)
  }

)
export default fly
