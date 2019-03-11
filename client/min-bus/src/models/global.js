import Base from './base'
import { Promise } from 'es6-promise'
import location from '../common/lib/location'

class Global extends Base {
  // forEach 获取 [ {city: , location}] 结构
  mapCityLoction_new (arr) {
    let newArr = [];
    arr.forEach((address, i) => {
      let index = -1;
      let alreadyExists = newArr.some((newAddress, j) => {
        if (address.stationName === newAddress.stationName) {
          index = j;
          return true;
        }
      });
      if (!alreadyExists) {
        newArr.push({
          stationName: address.stationName,
          busList: [address]
        });
      } else {
        newArr[index].busList.push(address);
      }
    });
    return newArr;
  }
  wgs84togcj02 (lng, lat) {
    return location.wgs84togcj02(lng, lat);
  }
  setLocationAsync () {
    return wx.getLocation({
      type: "gcj02",
      success: res => {
        this.setVal('location-data', {
          latitude: res.latitude,
          longitude: res.longitude,
          length: 800
        })
        return {
          lat: res.latitude,
          lng: res.longitude,
          length: 800
        }
      }
    })
  }
  setLocation () {
    return new Promise((resolve, reject) => {
      wx.getLocation({
        type: "gcj02",
        success: res => {
          this.setVal('location-data', {
            latitude: res.latitude,
            longitude: res.longitude,
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
