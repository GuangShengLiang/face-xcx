import fly from '@/utils/fly'
const URLBaseInfo = 'account/baseInfo'
const URLUploadToken = 'account/upload/token'
var account = {
  baseInfo: function (uid) {
    fly.get(URLBaseInfo, {uid: uid}).then(function (response) {
      return response
    })
  },
  updateBaseInfo: function (u) {
    fly.post(URLBaseInfo, u)
  },
  uploadToken: function () {
    fly.get(URLUploadToken).then(function (response) {
      return response
    })
  }
}
export default account
