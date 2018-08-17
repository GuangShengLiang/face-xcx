<template>
    <div class="container">
    <scroll-view scroll-y @scroll="scrollFn" @scrolltolower="toLow" @scrolltoupper="test">
    <div class="list-wrapper" v-for="(p, index) in rst" :key="index">
      <div @click="go(p.uid)" >
        <div class="list-wrapper">
          <div class="list-top">
              <img src="/static/images/search.png"/>
          </div>
          <div class="list-center">
            <div class="list-left">
            </div>
            <div class="list-right"></div>
          </div>
          <div class="list-bottom">
            <div class="list-left">
            {{p.nickName}} {{p.gender}} {{p.city}} {{p.age}}
            </div>
          </div>
          </div>
        </div>
      </div>
    </scroll-view>
  </div>
</template>

<script>
    export default {
      // props: {
      //   p: {
      //     type: Object
      //   },
      //   thisP: {
      //     type: Boolean
      //   }
      // },
      data () {
        return {
          page: 1,
          rst: []
        }
      },
      methods: {
        getList (page = 1) {
          // wx.showLoading({
          //   title: '加载中'
          // })
          // let res = await fly.get('topics', {
          //   tab: this.currentTab.type,
          //   page,
          //   limit: 20
          // })
          // if (res.success) {
          //   this.articleList = this.articleList.concat(res.data)
          // }
          console.log('getlist ', this.rst)
          this.rst = this.rst.concat([{uid: 2, nickName: 'BD', gender: '1', birthday: 'SH', city: '北京'},
            {uid: 2, nickName: 'BD', gender: '1', birthday: 'SH', city: '北京'},
            {uid: 2, nickName: 'BD', gender: '1', birthday: 'SH', city: '北京'},
            {uid: 2, nickName: 'BD', gender: '1', birthday: 'SH', city: '北京'},
            {uid: 2, nickName: 'BD', gender: '1', birthday: 'SH', city: '北京'},
            {uid: 2, nickName: 'BD', gender: '1', birthday: 'SH', city: '北京'},
            {uid: 3, nickName: 'CD', gender: '1', birthday: 'SH', city: '北京'}])
          // this.rst.push({uid: 3, nickName: 'CD', gender: '1', birthday: 'SH', city: '北京'})
          console.log('getlist after', this.rst)
          // wx.hideLoading()
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
        }
  },
  //   computed: {
  //     Distance () {
  //       return this.company.Distance.toFixed(0)
  //     }
  //   },
      beforeCreate () {
        console.log('beforeCreate')
        // this.getList(1)
      },
      created () {
        console.log('created')
        this.getList(1)
        console.log(this.rst)
      },
      onload () {
        console.log('onload ')
        this.getList(1)
      },
      onShow () {
        console.log('onShow ')
        // this.getList(1)
      },
      onReady () {
        console.log('onReady')
        this.getList(1)
      }
    }
</script>
<style scoped lang="scss">
.container{
    height: 100%;
    background: #f8f8fa;
  .list-wrapper{
    background: #fff;
    padding: 12px;
    height: 300px;
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
}
</style>