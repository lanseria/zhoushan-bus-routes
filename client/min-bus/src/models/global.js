import Base from './base'

class Global extends Base {
  getHead () {
    return this.getHeadNoticeStatus()
  }

  setHead (val) {
    this.setHeadNoticeStatus(val)
  }
}

export default new Global()
