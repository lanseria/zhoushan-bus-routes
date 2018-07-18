export function getData (url, params) {
  const PARAMS = {
    length: params.length,
    lat: fomatFloat(params.lat, 13),
    lng: fomatFloat(params.lng, 13)
  }
  const URL = url + `?${objectToParams(PARAMS)}`
  return new Promise((resolve, reject) => {
    wx.request({
      url: URL, //仅为示例，并非真实的接口地址
      header: {
        'content-type': 'application/json' // 默认值
      },
      success: (res) => {
        resolve(res.data)
      }
    })
  })
}

function objectToParams(obj) {
  const str = Object.entries(obj).map(([key, val]) => `${key}=${val}`).join('&')
  return str
}

function fomatFloat (value, n) {
  var f = Math.round(value * Math.pow(10, n)) / Math.pow(10, n)
  var s = f.toString()
  var rs = s.indexOf('.')
  if (rs < 0) {
    s += '.'
  }
  for (var i = s.length - s.indexOf('.'); i < n; i++) {
    s += '0'
  }
  return s + '1'
}