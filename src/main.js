import Vue from 'vue'
import App from './App'

Vue.config.productionTip = false
App.mpType = 'app'

const app = new Vue(App)
app.$mount()

export default {
  // 这个字段走 app.json
  config: {
    // 页面前带有 ^ 符号的，会被编译成首页，其他页面可以选填，我们会自动把 webpack entry 里面的入口页面加进去
    pages: ['pages/logs/main', '^pages/dian/main', 'pages/mine/main', 'pages/index/main'],
    window: {
      backgroundTextStyle: 'light',
      navigationBarBackgroundColor: '#fff',
      navigationBarTitleText: 'face',
      navigationBarTextStyle: 'black'
    },
    tabBar: {
      color: '#666666',
      selectedColor: '#000000',
      borderStyle: 'white',
      backgroundColor: '#f8f9fb',
      list: [
        {
          text: '点点',
          pagePath: 'pages/dian/main',
          iconPath: 'static/images/board.png',
          selectedIconPath: 'static/images/board-actived.png'
        },
        {
          text: '附近',
          pagePath: 'pages/index/main',
          iconPath: 'static/images/board.png',
          selectedIconPath: 'static/images/board-actived.png'
        },
        {
          text: '消息',
          pagePath: 'pages/index/main',
          iconPath: 'static/images/search.png',
          selectedIconPath: 'static/images/search-actived.png'
        },
        {
          text: '我的',
          pagePath: 'pages/mine/main',
          iconPath: 'static/images/profile.png',
          selectedIconPath: 'eatic/images/profile-actived.png'
        }
      ]
    }
  }
}
