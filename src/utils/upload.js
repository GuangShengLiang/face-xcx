import * as qiniu from 'qiniu-js'

var config = {}
var putExtra = {
  fname: '',
  params: {},
  mimeType: [] || null
}
function upload (file, token) {
  var observer = {
    next (res) {
    // ...
    },
    error (err) {
      console.log(err)
    },
    complete (res) {
    // ...
      console.log(res)
    }
  }
  var observable = qiniu.upload(file, null, token, putExtra, config)
  observable.subscribe(observer) // 上传开始
}
export default upload
