import fly from '@/utils/fly'
const URLBaseInfo = 'account/baseInfo'
var account = {
  baseInfo: function (uid) {
    fly.get(URLBaseInfo, {uid: uid}).then(function (response) {
      return response
    })
  },
  updateBaseInfo: function (u) {
    fly.post(URLBaseInfo, u)
  }
}
export default account
