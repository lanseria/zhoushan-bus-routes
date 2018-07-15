const app = getApp()
const config = app.config
const { saveSearch, loadSearch, clearSearch, deleteSearch } = require('../../lib/util/cache.js')
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

    query: '',
    hotKey: [],
    result: [],
    allResult: [],
    searchHistory: []
  },
  watch: {//需要监听的字段
    'query': function (value) {
      this._debounce(this._getRes, 200)(this.data.query)
    }
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

    this.initTheme()

    app.initWatch(this)
    this._getResult()
    this._getHotKey()
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
    this.setData({
      searchHistory: loadSearch()
    })
  },
  bindKeyInput: function (e) {
    this.setData({
      query: e.detail.value
    })
  },
  addQuery: function (e) {
    const query = e.currentTarget.dataset.query
    this.setData({
      query: query
    })
  },
  clearQuery: function () {
    this.setData({
      query: ''
    })
  },
  deleteThisSearchHistory: function (e) {
    const query = e.currentTarget.dataset.query
    deleteSearch(query)
    this.onShow()
  },
  showConfirm: function () {
    wx.showModal({
      title: '慢着！',
      content: '是否清空清空所有搜索历史',
      confirmText: '清空',
      confirmColor: '#ffcd32',
      success: (res) => {
        if (res.confirm) {
          clearSearch()
          this.onShow()
        }
      }
    })
  },
  jumpToDetail: function (e) {
    const id = e.currentTarget.dataset.routeId
    saveSearch(id)
    wx.navigateTo({
      url: `/pages/route-line/route-line?id=${encodeURIComponent(id)}&isUpDown=0`
    })
  },
  _getHotKey: function () {
    wx.request({
      url: 'https://api.limonplayer.cn/jsonp/zhoushanbus/hot_key',
      header: {
        "content-type": "json"
      },
      success: (res) => {
        if (res.statusCode === 200) {
          this.setData({
            hotKey: res.data.data
          })
        }
      }
    })
  },
  _getRes: function () {
    const r = this.data.allResult.filter(m => {
      return m.line_name.indexOf(this.data.query) >= 0
    })
    console.log(r)
    this.setData({
      result: r
    })
  },
  _getResult: function () {
    wx.request({
      url: `https://api.limonplayer.cn/jsonp/zhoushanbus/all_line`,
      header: {
        "content-type": "json"
      },
      success: (res) => {
        if (res.statusCode === 200) {
          this.setData({
            allResult: JSON.parse(res.data.data)
          })
        }
      }
    })
  },
  _debounce: function (func, delay) {
    let timer
    return function (...args) {
      if (timer) {
        clearTimeout(timer)
      }
      timer = setTimeout(() => {
        func.apply(this, args)
      }, delay)
    }
  }
})