<template>
  <div class="container">
 <div class="list" v-for="(company, index) in companys" :key="index">
      <div @click="go(company.Number)" >
        <lists :company="company"></lists>
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
      companys: [{Name: 'A', Salary65: '100', WorkCity: 'SH', emplType: '1', Education: 'NO', CompanyName: 'ZZ'},
        {Name: 'A', Salary65: '100', WorkCity: 'SH', emplType: '1', Education: 'NO', CompanyName: 'ZZ'},
        {Name: 'A', Salary65: '100', WorkCity: 'SH', emplType: '1', Education: 'NO', CompanyName: 'ZZ'}]
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
      vm.companys = [{Name: 'A', Salary65: '100', WorkCity: 'SH', emplType: '1', Education: 'NO', CompanyName: 'ZZ'},
        {Name: 'A', Salary65: '100', WorkCity: 'SH', emplType: '1', Education: 'NO', CompanyName: 'ZZ'},
        {Name: 'A', Salary65: '100', WorkCity: 'SH', emplType: '1', Education: 'NO', CompanyName: 'ZZ'}]
      // request('/home').then((data) => {
      //   if (data.StatusCode === ERR_OK) {
      //     vm.companys = data.Positions
      //     wx.stopPullDownRefresh()
      //     wx.hideNavigationBarLoading()
      //   }
      // })
    },
    onPullDownRefresh: function () { // 监听下拉刷新事件
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
