// const selectDownOrUp = ['down', 'up']
const app = getApp()
const config = app.config

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
    isUpDown: 0,
    currentRouteStations: [],
    nameOfStartAndEnd: {},
    templateMsg: '',
    timeMsg: ''
  },
  watch: {//需要监听的字段
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
      isUpDown: decodeURIComponent(options.isUpDown)
    })
    this._getDetail()
    wx.showNavigationBarLoading()
    const { routeId, isUpDown } = this.data
    const query = {
      lineName: encodeURIComponent(this.data.routeId),
      isUpDown: this.data.isUpDown,
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
      path: `/pages/route-line/route-line?id=${encodeURIComponent(this.data.routeId)}&isUpDown=${this.data.isUpDown}`,
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
      url: `/pages/detail/detail?sid=${encodeURIComponent(sid)}&rid=${encodeURIComponent(rid)}&isUpDown=${this.data.isUpDown}`
    })
  },

  handleTransRoute: function () {
    this._refreshCurrentLine()
    this.setData({
      isUpDown: 1 - this.data.isUpDown < 0 ? 0 : 1 - this.data.isUpDown
    })
    this._getDetail()
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
      url: `https://api.limonplayer.cn/jsonp/zhoushanbus/line?lineName=${encodeURIComponent(this.data.routeId)}&isUpDown=${this.data.isUpDown}`,
      header: {
        "content-type": "json"
      },
      success: (res) => {
        if (res.statusCode === 200) {
          const data = JSON.parse(res.data.data);
          const { stations } = data;
          // console.log(data)
          // console.log(stations);
          const ele = [];
          for( const i of stations) {
            // console.log(i);
            ele.push({
              ...i,
              color: '15b1ca'
            })
          }
          this.setData({
            templateMsg: data.lineInfo,
            currentRouteStations: ele
          })
          // for (const key in stations) {
          //   if (data.hasOwnProperty(key)) {
          //     let element = data[key]
          //     element = element.map((m, i) => {
          //       return {
          //         color: '15b1ca',
          //         name: m
          //       }
          //     })
          //     data[key] = element
          //   }
          // }
          // this.setData({
          //   originRouteData: data,
          //   currentRouteStations: data[this.data.downOrUp]
          // })
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
      url: 'https://api.limonplayer.cn/jsonp/zhoushanbus/bus_waiting?',
      data: query,
      header: {
        "content-type": "json"
      },
      success: function (res) {
        if (res.statusCode === 200) {
          const { message, bus } = JSON.parse(res.data.data)
          console.log(res.data.data)
          that.setData({
            timeMsg: message ? message : '运营已结束，末班车已发出'
          })
          that._refreshCurrentLine()
          bus.map(abus => {
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