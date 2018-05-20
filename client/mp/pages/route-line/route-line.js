const selectDownOrUp = ['down', 'up']
const app = getApp()
const config = app.config

function delHtmlTag(str) {
  return str.replace(/<[^>]+>/g, "");//去掉所有的html标记
}

Page({

  /**
   * 页面的初始数据
   */
  data: {
    theme: config.theme,
    themeBackgroundColor: '',
    themeBackgroundColorL: '',
    themeColor: '',
    themeBackgroundColorLWithColorL: '',
    iconColor: 'rgba(255,255,255,0.5)',

    routeId: '',
    originRouteData: {},
    downOrUp: selectDownOrUp[0],
    currentRouteStations: [],
    nameOfStartAndEnd: {},
    timeMsg: ''
  },
  watch: {//需要监听的字段
    'downOrUp': function (value) {
      const { downOrUp, originRouteData } = this.data
      this.setData({
        currentRouteStations: originRouteData[downOrUp]
      })
    },
    'currentRouteStations': function (value) {
      setTimeout(() => {
        const { currentRouteStations } = this.data
        const cLength = currentRouteStations.length
        const nameOfStartAndEnd = {
          start: currentRouteStations[0].name,
          end: currentRouteStations[cLength - 1].name
        }
        this.setData({
          nameOfStartAndEnd: nameOfStartAndEnd
        })
      }, 100)
    }
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

    this.initTheme()

    app.initWatch(this)
    var that = this
    this.setData({
      routeId: decodeURIComponent(options.id),
      downOrUp: decodeURIComponent(options.downOrUp)
    })
    this._getDetail()
    wx.showNavigationBarLoading()
    const { routeId, downOrUp } = this.data
    const query = {
      lineName: routeId.substr(0, routeId.length - 1),
      isUpDown: downOrUp === 'down' ? 1 : 0,
      stationNum: 1
    }
    this._getThisStationInfo(query)
    this.$getThisStationDetailInterval = setInterval(() => {
      this._getThisStationInfo(query)
    }, 10000)
  },

  initTheme: function () {
    if (this.data.theme === 'light') {
      wx.setNavigationBarColor({
        frontColor: '#ffffff',
        backgroundColor: '#405f80',
      })
      this.setData({
        themeBackgroundColor: 'background-color: #eee',
        themeBackgroundColorL: 'background-color: rgba(255, 255, 255, 0.5);',
        themeColor: 'color: rgba(0, 0, 0, 0.5)',
        themeBackgroundColorLWithColorL: 'color: rgba(0, 0, 0, 0.5);background-color:  rgba(255, 255, 255, 0.5);',
        iconColor: 'rgba(0,0,0,0.5)'
      })
    }
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {
    
  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {
    clearInterval(this.$getThisStationDetailInterval)
  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {
    
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
    
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
    return {
      title: `公交等候状态：${this.data.routeId}: ${this.data.nameOfStartAndEnd.start}开往${this.data.nameOfStartAndEnd.end}`,
      path: `/pages/route-line/route-line?id=${encodeURIComponent(this.data.routeId)}&downOrUp=${this.data.downOrUp}`,
      success: () => {
        wx.showToast({
          title: '成功',
          icon: 'success',
          duration: 2000
        })
      }
    }
  },

  jumpToDetail: function (e) {
    const rid = e.currentTarget.dataset.routeId
    const sid = e.currentTarget.dataset.stationId
    wx.navigateTo({
      url: `/pages/detail/detail?sid=${encodeURIComponent(sid)}&rid=${encodeURIComponent(rid)}&downOrUp=down`
    })
  },

  handleTransRoute: function () {
    this._refreshCurrentLine()
    const idx = selectDownOrUp.findIndex(m => m === this.data.downOrUp)
    this.setData({
      downOrUp: selectDownOrUp[1 - idx]
    })
  },
  _refreshCurrentLine() {
    const { currentRouteStations } = this.data
    this.setData({
      currentRouteStations: currentRouteStations.map((m, i) => {
        return {
          color: '15b1ca',
          name: m.name
        }
      })
    })
  },
  _getDetail () {
    wx.request({
      url: 'https://api.limonplayer.cn/jsonp/zhoushanbus/detail?rid=' + encodeURIComponent(this.data.routeId),
      header: {
        "content-type": "json"
      },
      success: (res) => {
        if (res.statusCode === 200) {
          const data = res.data.data
          for (const key in data) {
            if (data.hasOwnProperty(key)) {
              let element = data[key]
              element = element.map((m, i) => {
                return {
                  color: '15b1ca',
                  name: m
                }
              })
              data[key] = element
            }
          }
          this.setData({
            originRouteData: data,
            currentRouteStations: data[this.data.downOrUp]
          })
          wx.setNavigationBarTitle({
            title: this.data.routeId,
          })
          wx.hideNavigationBarLoading()
        }
      }
    })
  },
  _getThisStationInfo (query) {
    var that = this
    wx.request({
      url: 'https://api.limonplayer.cn/jsonp/zhoushanbus/getThisStation?',
      data: query,
      header: {
        "content-type": "json"
      },
      success: function (res) {
        if (res.statusCode === 200) {
          const { buses, msg} = res.data.data
          that.setData({
            timeMsg: delHtmlTag(msg)
          })
          that._refreshCurrentLine()
          buses.map(abus => {
            const lastStation = parseInt(abus.lastStation)
            const isStation = abus.isStation
            const { currentRouteStations } = that.data
            let color = ''
            if (isStation === '1') {
              color = 'ffcd32' // 途中
              currentRouteStations[lastStation].color = color
              that.setData({
                currentRouteStations
              })
            } else {
              color = '5fe27b' // 进站
              currentRouteStations[lastStation - 1].color = color
              that.setData({
                currentRouteStations
              })
            }
          })
        } else if (res.statusCode === 500) {
          wx.showToast({
            title: '获取失败，服务未响应',
            icon: 'none',
            duration: 2000
          })
        }
      }
    })
  }
})