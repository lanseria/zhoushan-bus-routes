// 云函数入口文件
const cloud = require('wx-server-sdk')
const got = require('got');

const config = {
  gotHostPrefix: 'http://122.226.17.46:10251/WifiBusInterface/transfer',
}

cloud.init()

// 云函数入口函数
/**
 * event.apiUrl 链接
 * 1. /line!getNearLine.action
 * event.querystring 参数
 * 1. length=800&lat=30.0197900000001&lng=122.1067900000001
 */
exports.main = async (event, context) => {
  const url = config.gotHostPrefix + event.apiUrl;
  const response = await got.post(url, {
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
      'User-Agent': `BusXing/1.3.0 (iPhone; iOS 11.4.1; Scale/3.00)`
    },
    body: event.querystring,
  })
  return response.body;

}