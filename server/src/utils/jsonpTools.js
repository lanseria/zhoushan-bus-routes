const got = require('got')
/**
 * Method 1 convert jsonp() to json
 */
exports.convertJsonp = async function (request, url, refer) {
  const response = await got.get(url, {
    headers: {
      referer: refer ? `https://${refer}/` : 'https://c.y.qq.com/',
      host: refer ? refer : 'c.y.qq.com'
    },
    query: request.query
  })
  let ret = response.body
  if (typeof ret === 'string') {
    const reg = /^\w+\(({[^]+})\)$/
    const matches = ret.match(reg)
    if (matches) {
      ret = JSON.parse(matches[1])
    }
  }
  return ret
}
/**
 * Methods 2 ToFix Json Data Format error
 */
exports.FixJsonp = async function (request, url, refer) {
  const response = await got.get(url, {
    headers: {
      referer: refer ? `https://${refer}/` : 'https://c.y.qq.com/',
      host: refer ? refer : 'c.y.qq.com'
    },
    query: request.query
  })
  return JSON.parse(response.body)
}

exports.getFromServer = async function (query) {
  const url = `http://122.226.17.46:10251/buswechat/weixin/getWaiting.action`
  const response = await got.get(url, {
    headers: {
      referer: 'http://122.226.17.46:10251/buswechat/weixin/initLinePage.action',
      host: '122.226.17.46:10251',
      'Cookie': 'JSESSIONID=CC04CD40CB1AF84D35E8AF68C04EE4F5',
      'User-Agent': 'Mozilla/5.0 (iPhone; CPU iPhone OS 11_0 like Mac OS X) AppleWebKit/604.1.38 (KHTML, like Gecko) Version/11.0 Mobile/15A372 Safari/604.1',
      'X-Requested-With': 'XMLHttpRequest'
    },
    query: query
  })
  const fatalData = JSON.parse(response.body)
  fatalData.buses = JSON.parse(fatalData.buses)
  return fatalData
}

exports.PackagingData = function (data) {
  return {
    code: 0,
    data: data,
    timestamp: Date.now()
  }
}
