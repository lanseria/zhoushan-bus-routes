import Base from './base'

class Global extends Base {
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
}

export default new Global()
