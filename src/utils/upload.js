var qiniu = require('qiniu-js')

// 需要填写你的 Access Key 和 Secret Key
qiniu.conf.ACCESS_KEY = 'PMd3jKnM4UbNj-9W_3tLPduTGANRxeUeOg6rOK8f'
qiniu.conf.SECRET_KEY = 'iizBDt_jtKEiy-aOoVBahQkIQ07AAI3A77vTZQrh'
var mac = new qiniu.auth.digest.Mac(qiniu.conf.ACCESS_KEY, qiniu.conf.SECRET_KEY)
// 要上传的空间
var bucket = 'test'

// 构建上传策略函数
function uptoken (bucket) {
  var putPolicy = new qiniu.rs.PutPolicy({scope: bucket})
  return putPolicy.uploadToken(mac)
}

// 生成上传 Token
// var token = uptoken(bucket)

// 要上传文件的本地路径
// var filePath = '/Users/lgs/workspace/xcx/face-xcx/static/images/home.png'
var config = new qiniu.conf.Config()
// 构造上传函数
var formUploader = new qiniu.form_up.FormUploader(config)
var putExtra = new qiniu.form_up.PutExtra()
var token = uptoken(bucket)
var upload = {
// 文件上传
  uploadFile: function (filePath) {
    let rst
    formUploader.putFile(token, null, filePath, putExtra, function (respErr, respBody, respInfo) {
      if (respErr) {
        throw respErr
      }
      // if (respInfo.statusCode === 200) {
      rst = respBody
      // }
      // } else {
      //   console.log(respInfo.statusCode)
      //   console.log(respBody)
      // }
      // return respInfo
    })
    return rst
  }
}
export default upload
