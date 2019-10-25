// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init()

// 云函数入口函数
exports.main = async (event, context) => {
  const res = await cloud.callFunction({
    // 要调用的云函数名称
    name: 'post_from_server',
    // 传递给云函数的参数
    data: {
      apiUrl: '/line!getAllLines.action',
    }
  })
  return res.result
}