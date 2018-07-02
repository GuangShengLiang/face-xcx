<template>
      <div class="weui-cells weui-cells_after-title">
        <div class="weui-cell">
                <div class="weui-uploader__files" id="uploaderFiles">
                  <div v-for="(item ,index) in files" :key="index">
                    <div class="weui-uploader__file">
                      <image class="weui-uploader__img" :src="item" mode="aspectFill" @click="predivImage" :id="item" />
                      <div class="delete-icon" @click="deleteImg" :id="item"></div>
                    </div>
                  </div>
                </div>
        <div class="weui-cell__bd">
        <div class="weui-uploader__input-box">
          <div class="weui-uploader__input" @click="chooseImage"></div>
        </div>
        </div>
        </div>
        <div class="weui-cell">
          <div class="weui-cell__bd">头像</div>
          <div class="weui-cell__ft weui-cell__ft_in-access"></div>
        </div>
      <div class="weui-cells weui-cells_after-title">
        <div class="weui-cell">
          <div class="weui-cell__bd">昵称</div>
          <div class="weui-cell__ft">
            <input class="" v-model="userInfo.nickName"/>
          </div>
          </div>
      </div>
      <picker class="weui-cells weui-cells_after-title" @change="bindPickerChange" :value="index" :range="sexArr">
        <div class="weui-cell">
          <div class="weui-cell__bd">性别</div>
          <div class="weui-cell__ft weui-cell__ft_in-access">{{userInfo.sex}}</div>
        </div>
      </picker>
      <picker mode="date" value="date" start="1970-01-01" end="2018-01-01" @change="bindDateChange">
        <div class="weui-cell">
          <div class="weui-cell__bd">生日</div>
          <div class="weui-cell__ft weui-cell__ft_in-access">{{userInfo.brithday}}</div>
        </div>
      </picker> 
      <div class="weui-cells__title">简介</div>
      <div class="weui-cells weui-cells_after-title">
        <div class="weui-cell">
          <div class="weui-cell__bd">
            <textarea class="" style="height: 5.0em" />
            <div class="weui-textarea-counter">0/200</div>
          </div>
        </div>
      </div>
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
      userInfo: { sex: '男', brithday: '2000-01-01', nickName: 'GS.L' }
    }
  },

  components: {
    card
  },

  methods: {
    bindPickerChange (e) {
      console.log('选中的值为：' + this.sexArr[e.mp.detail.value])
      this.userInfo.sex = this.sexArr[e.mp.detail.value]
    },
    bindViewTap () {
      const url = '../logs/main'
      wx.navigateTo({ url })
    },
    chooseImage (e) {
      let _this = this
      wx.chooseImage({
        count: 1, // 默认9
        sizeType: ['original', 'compressed'], // 可以指定是原图还是压缩图，默认二者都有
        sourceType: ['album', 'camera'], // 可以指定来源是相册还是相机，默认二者都有
        success: function (res) {
          console.log('成功上传：' + res.tempFilePaths)
          // 返回选定照片的本地文件路径列表，tempFilePath可以作为img标签的src属性显示图片
          _this.files = _this.files.concat(res.tempFilePaths)
        },
        fail: function () {
          console.log('fail')
        },
        complete: function () {
          console.log('commplete')
        }
      })
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
    bindDateChange (e) {
      this.userInfo.brithday = e.mp.detail.value
    },
    getUserInfo () {
      // 调用登录接口
      wx.login({
        success: () => {
          wx.getUserInfo({
            success: res => {
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
    this.userInfo = { sex: '男', brithday: '2000-01-01', nickName: 'GS.L' }
    wx.setNavigationBarTitle({ title: '修改资料' })
  }
}
</script>