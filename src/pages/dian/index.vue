<template>
  <div class="container">
 <div class="list" v-for="(p, index) in rst" :key="index">
      <div @click="go(p.uid)" >
        <lists :p="p"></lists>
      </div>
    </div>
  </div>
</template>

<script>
import lists from '@/components/list.vue'
// import {request, ERR_OK} from '@/utils/api'

export default {
  data () {
    return {
      motto: 'Hello World',
      userInfo: {},
      rst: [{uid: 1, nickName: 'A', gender: '0', birthday: 'SH', city: '上海'},
        {uid: 2, nickName: 'B', gender: '1', birthday: 'SH', city: '北京'},
        {uid: 3, nickName: 'C', gender: '1', birthday: 'SH', city: '北京'}]
    }
  },

  components: {
    lists
  },

  methods: {
    bindViewTap () {
      const url = '../logs/main'
      wx.navigateTo({ url })
    },
    getUserInfo () {
      // 调用登录接口
      wx.login({
        success: () => {
          wx.getUserInfo({
            success: (res) => {
              this.userInfo = res.userInfo
            }
          })
        }
      })
    },
    _getData () {
      let vm = this
      vm.rst = [{uid: 1, nickName: 'A1', gender: '0', birthday: 'SH', city: '上海'},
        {uid: 2, nickName: 'B', gender: '1', birthday: 'SH', city: '北京'},
        {uid: 3, nickName: 'C', gender: '1', birthday: 'SH', city: '北京'}]
      // request('/home').then((data) => {
      //   if (data.StatusCode === ERR_OK) {
      //     vm.companys = data.Positions
      //     wx.stopPullDownRefresh()
      //     wx.hideNavigationBarLoading()
      //   }
      // })
    },
    onPullDownRefresh: function () { // 监听下拉刷新事件
      console.log('loadding')
      wx.showNavigationBarLoading()
      this._getData()
    },
    onReachBottom: function () {
      console.log('加载')
    },
    onShow: function () {
      wx.startPullDownRefresh()
    }
  },
  created () {
    // 调用应用实例的方法获取全局数据
    this.getUserInfo()
  }
}
</script>
<style scoped lang="scss">
  .container{
    background: #f8f8fa;
    .list{
      margin-top: 10px;
    }
      .bottom{
        display: flex;
        line-height: 43.6px;
        .p{
          flex: 1;
          overflow: hidden;
          line-height: 43.6px;
          position: relative;
          .avatar{
            width: 25px;
            height: 25px;
            display: inline-block;
            vertical-align: top;
            border: 1px solid #f8f8fa;
            position: absolute;
            top: 10px;
            border-radius: 50%;
            overflow: hidden;
            open-data{
              width: 100%;
              height: 100%;
            }
          }
          span{
            padding-left: 26px;
          }
        }
        span{
          flex: 0 0 80px;
          text-align: right;
        }
      }
    }
</style>
