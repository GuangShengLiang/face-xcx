<template>
      <div class="weui-cells weui-cells_after-title">
        <div class="weui-cell">
          <div class="weui-cell__bd">头像</div>
          <div class="weui-cell__ft weui-cell__ft_in-access"></div>
        </div>
      <picker class="weui-cells weui-cells_after-title" @change="bindPickerChange" :value="index" :range="sexArr">
        <div class="weui-cell">
          <div class="weui-cell__bd">性别</div>
          <div class="weui-cell__ft weui-cell__ft_in-access">{{userInfo.sex}}</div>
        </div>
      </picker>
      </div>
</template>

<script>
import card from '@/components/card'

export default {
  data () {
    return {
      sexArr: ['男', '女'],
      sexIndex: 0,
      motto: 'Hello World',
      userInfo: {sex: '男'}
    }
  },

  components: {
    card
  },

  methods: {
    bindPickerChange (e) {
      this.userInfo.sex = this.sexArr[e.mp.detail.value]
    },
    bindViewTap () {
      const url = '../logs/main'
      wx.navigateTo({ url })
    },
    openSex () {
      wx.showActionSheet({
        itemList: ['男', '女'],
        success: function (res) {
          // this.userInfo.sex = this.itemList[0]
          console.log(this.itemList[0])
        }
      })
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
    clickHandle (msg, ev) {
      console.log('clickHandle:', msg, ev)
    }
  },

  created () {
    // 调用应用实例的方法获取全局数据
    this.getUserInfo()
  },

  onReady () {
    this.userInfo = {sex: '男'}
  }
}
</script>

<style scoped>
.userinfo {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.userinfo-avatar {
  width: 128rpx;
  height: 128rpx;
  margin: 20rpx;
  border-radius: 50%;
}

.userinfo-nickname {
  color: #aaa;
}

.usermotto {
  margin-top: 150px;
}

.form-control {
  display: block;
  padding: 0 12px;
  margin-bottom: 5px;
  border: 1px solid #ccc;
}

.counter {
  display: inline-block;
  margin: 10px auto;
  padding: 5px 10px;
  color: blue;
  border: 1px solid blue;
}
</style>
