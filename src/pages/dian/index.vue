<template>
  <div class="container">
    <lists></lists>
  </div>
</template>

<script>
import lists from '@/components/list.vue'
// import {request, ERR_OK} from '@/utils/api'

export default {
  data () {
    return {
      page: 1,
      rst: [{uid: 2, nickName: 'B', gender: '1', birthday: 'SH', city: '北京'}]
    }
  },

  components: {
    lists
  },

  methods: {
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
    async getList (page = 1) {
      wx.showLoading({
        title: '加载中'
      })
      // let res = await fly.get('topics', {
      //   tab: this.currentTab.type,
      //   page,
      //   limit: 20
      // })
      // if (res.success) {
      //   this.articleList = this.articleList.concat(res.data)
      // }
      this.rst.concat([{uid: 2, nickName: 'B', gender: '1', birthday: 'SH', city: '北京'},
        {uid: 2, nickName: 'B', gender: '1', birthday: 'SH', city: '北京'},
        {uid: 2, nickName: 'B', gender: '1', birthday: 'SH', city: '北京'},
        {uid: 2, nickName: 'B', gender: '1', birthday: 'SH', city: '北京'},
        {uid: 2, nickName: 'B', gender: '1', birthday: 'SH', city: '北京'},
        {uid: 2, nickName: 'B', gender: '1', birthday: 'SH', city: '北京'},
        {uid: 3, nickName: 'C', gender: '1', birthday: 'SH', city: '北京'}])
      wx.hideLoading()
    },
    go (uid) {
      wx.navigateTo({
        url: `/pages/detail/main?uid=${uid}`
      })
    },
    scrollFn (e) {
      console.log(e)
    },
    toLow (e) {
      // 这里就是滚动到底部了
      console.log('to low')
      this.page++
      this.getList(this.page)
    },
    onShow: function () {
      wx.startPullDownRefresh()
    }
  },
  // computed: {
  //   list () {
  //     return this.articleList.map(item => {
  //       delete item.content
  //       return Object.assign(item, {
  //         createTime: this.formatTime(item.create_at),
  //         lastReplyTime: this.fromNow(item.last_reply_at)
  //       })
  //     })
  //   }
  // },
  async created () {
    this.getList()
  }
}
</script>
<style scoped lang="scss">
  .container{
    height: 100%;
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
    .list-wrapper{
    background: #fff;
    padding: 12px;
    box-sizing: border-box;
    .list-top, .list-center, .list-bottom{
      display: flex;
      font-size: 12px;
      color: #666666;
      line-height: 26px;
      .list-left{
        flex: 1;
        text-align: left;
      }
      .list-right{
        text-align: right;
        flex: 0 0 80px
      }
    }
    .list-top{
      line-height: 33.3px;
      font-size: 16px;
      font-weight: 700;
      .list-left{
        color: #282828;
      }
      .list-right{
        color: #ec675d;
      }
    }
    .list-center{
      line-height: 22px;
    }
    .list-bottom{
      line-height: 43.6px;
    }
  }
</style>
