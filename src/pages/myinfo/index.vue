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
          <div class="weui-uploader__input" @tap="uploadTap"></div>
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
          <div class="weui-cell__ft weui-cell__ft_in-access">{{sexArr[userInfo.gender]}}</div>
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
      <div>
    <mpvue-cropper ref="cropper" :option="cropperOpt" @ready="cropperReady" @beforeDraw="cropperBeforeDraw"
      @beforeImageLoad="cropperBeforeImageLoad" @beforeLoad="cropperLoad"></mpvue-cropper>
    <div class="cropper-buttons">
      <div class="upload" @tap="uploadTap"> 重新选择 </div>
      <div class="getCropperImage" @tap="getCropperImage"> 完成 </div>
    </div>
  </div>
</div>
</template>
<script>
import account from '@/utils/api/account'
import upload from '@/utils/upload'
import MpvueCropper from 'mpvue-cropper'

let wecropper

const device = wx.getSystemInfoSync()
const width = device.windowWidth
const height = device.windowHeight - 50

export default {
  data () {
    return {
      sexArr: ['男', '女'],
      userInfo: {brithday: '2011-01-01', nickName: 'll'},
      cropperOpt: {
        id: 'cropper',
        width,
        height,
        scale: 2.5,
        zoom: 8,
        cut: {
          x: (width - 300) / 2,
          y: (height - 300) / 2,
          width: 300,
          height: 300
        }
      }
    }
  },
  components: {
    MpvueCropper
  },

  methods: {
    cropperReady (...args) {
      console.log('cropper ready!')
    },
    cropperBeforeImageLoad (...args) {
      console.log('before image load')
    },
    cropperLoad (...args) {
      console.log('image loaded')
    },
    cropperBeforeDraw (...args) {
      // Todo: 绘制水印等等
    },
    uploadTap () {
      wx.chooseImage({
        count: 1, // 默认9
        sizeType: ['original', 'compressed'], // 可以指定是原图还是压缩图，默认二者都有
        sourceType: ['album', 'camera'], // 可以指定来源是相册还是相机，默认二者都有
        success: (res) => {
          const src = res.tempFilePaths[0]
          //  获取裁剪图片资源后，给data添加src属性及其值
          console.log('wecropper', wecropper)
          wecropper.pushOrigin(src)
        }
      })
    },
    getCropperImage () {
      wecropper.getCropperImage()
        .then((src) => {
          // wx.previewImage({
          //   current: '', // 当前显示图片的http链接
          //   urls: [src] // 需要预览的图片http链接列表
          // })
          console.log(src)
          upload.uploadFile(src)
          // console.log(res)
        }).catch(e => {
          console.error('获取图片失败')
        })
    },

    bindPickerChange (e) {
      console.log('选中的值为：' + this.sexArr[e.mp.detail.value])
      this.userInfo.gender = e.mp.detail.value
      account.updateBaseInfo(this.userInfo)
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
    openGender () {
      wx.showActionSheet({
        itemList: ['男', '女'],
        success: function (res) {
          console.log('sex', res)
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
  mounted () {
    wecropper = this.$refs.cropper
  },
  beforeCreate () {
    // this.userInfo = account.baseInfo(1)
  },
  created () {
    // 调用应用实例的方法获取全局数据
    // this.getUserInfo()
    // this.userInfo = account.baseInfo(1)
  },
  onLoad () {
    // this.userInfo = account.baseInfo(1)
  },
  onShow () {
    // this.userInfo = account.baseInfo(1)
  },
  onReady () {
    this.userInfo.nickName = 'dd'
    wx.setNavigationBarTitle({ title: '修改资料' })
  }
}
</script>
<style>
.cropper-wrapper{
    position: relative;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    justify-content: center;
    height: 100%;
    background-color: #e5e5e5;
}

.cropper-buttons{
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    justify-content: center;
    position: absolute;
    bottom: 0;
    left: 0;
    width: 100%;
    height: 50px;
    line-height: 50px;
}

.cropper-buttons .upload, .cropper-buttons .getCropperImage{
    width: 50%;
    text-align: center;
}

.cropper{
    position: absolute;
    top: 0;
    left: 0;
}

.cropper-buttons{
    background-color: rgba(0, 0, 0, 0.95);
    color: #04b00f;
}
</style>