import jsonp from '@/common/js/jsonp'
import { options, baseUrl } from './config'

export function getHotKey () {
  const url = baseUrl + '/getHotKey'
  const data = Object.assign({}, {
  })
  return jsonp(url, data, options)
}

export function search (query) {
  const url = baseUrl + '/search'
  const data = Object.assign({}, {
    w: query
  })
  return jsonp(url, data, options)
}

export function getRouteLineDetail (query) {
  const url = baseUrl + '/detail'
  const data = Object.assign({}, {
    rid: query
  })
  return jsonp(url, data, options)
}

export function getThisStationDetail (query) {
  const url = baseUrl + '/getThisStation'
  const data = query
  return jsonp(url, data, options)
}
