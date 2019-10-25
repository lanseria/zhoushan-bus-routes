// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init()

// 云函数入口函数
/**
 * event.querystring 参数
 * 1. length=800&lat=30.0197900000001&lng=122.1067900000001
 */
exports.main = async (event, context) => {
  const res = await cloud.callFunction({
    // 要调用的云函数名称
    name: 'post_from_server',
    // 传递给云函数的参数
    data: {
      apiUrl: '/line!getNearLine.action',
      querystring: event.querystring,
    }
  })
  return res.result
}