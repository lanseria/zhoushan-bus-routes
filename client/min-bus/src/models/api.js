import Base from './base'

class Bus extends Base {
  getNearLine (params, data = {}, allowCache = true) {
    const PARAMS = {
      length: params.length,
      lat: fomatFloat(params.lat, 13),
      lng: fomatFloat(params.lng, 13)
    }
    const URL = `/near_line?${objectToParams(PARAMS)}`
    return this.get(URL, data, allowCache)
  }

  getAllLine (params = '', data = {}, allowCache = true) {
    const URL = `/all_line`
    return this.get(URL, data, allowCache)
  }
}

function objectToParams (obj) {
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

export default new Bus()