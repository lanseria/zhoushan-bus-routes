import Base from './base'
import { Promise } from 'es6-promise'
import location from '../common/lib/location'

class Global extends Base {
  wgs84togcj02 (lng, lat) {
    return location.wgs84togcj02(lng, lat);
  }
  setLocation () {
    return new Promise((resolve, reject) => {
      wx.getLocation({
        type: "gcj02",
        success: res => {
          this.setVal('location-data', {
            lat: res.latitude,
            lng: res.longitude,
            length: 800
          })
          return resolve({
            lat: res.latitude,
            lng: res.longitude,
            length: 800
          })
        }
      });
    })
  }

  getHeadNoticeStatus () {
    const status = wx.getStorageSync('HEADNOTICESTATUS')
    if (status === '') {
      this.setHeadNoticeStatus(this.isHeadNoticeShow)
      return true
    } else {
      return status
    }
  }

  setHeadNoticeStatus (val) {
    wx.setStorage({
      key: 'HEADNOTICESTATUS',
      data: val
    })
  }

  getVal (key) {
    return wx.getStorageSync(key)
  }

  setVal (key, val) {
    wx.setStorage({
      key: key,
      data: val
    })
  }

}

export default new Global()
