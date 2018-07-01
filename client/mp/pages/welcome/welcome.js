const app = getApp();
const config = app.config;
const wafer = require('../../vendors/wafer-client-sdk/index');
const lab = require('../../lib/lab');

wafer.setLoginUrl(`https://` + config.host + '/login');

Page({

  /**
   * 页面的初始数据
   */
  data: {
    status: 'waiting',
    name: '舟山公交实时状态查询小程序',
    updateDetail: [
      "新增亮蓝色主题!!",
      "新增欢迎页（一次会话只会出现一次）",
      "修复一些界面显示问题",
      "如有问题与建议可访问如下地址",
      "https://github.com/Lanseria",
      "本小程序是官方服务的转发，如果官方服务出错，小程序也无法正确获取数据"
    ],
    version: "v1.9 Beta",
    url: 'https://' + config.host + '/me',
    requesting: false,
    hintLine1: config.helloWords,
    hintLine2: ''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    // this.request()
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    
  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {
    
  },

  enterIn () {
    wx.redirectTo({
      url: '/pages/search/search'
    })
  },

  request() {
    this.setData({
      requesting: true,
      status: 'waiting',
      hintLine2: '...'
    });
    wafer.request({
      login: true,
      url: this.data.url,
      method: 'GET',
      success: (res) => {
        if (+res.statusCode == 200) {
          if (res.data.openId) {
            this.setData({
              status: 'success',
              // hintLine1: 'Hello',
              hintLine2: res.data.nickName,
              avatarUrl: res.data.avatarUrl
            });
            lab.finish('session');
          } else {
            this.setData({
              status: 'warn',
              hintLine2: '未获取到 openId'
            });
            console.error('会话获取失败', res.data);
          }
        } else {
          this.setData({
            status: 'warn',
            hintLine2: '响应码：' + res.statusCode
          });
        }
      },
      fail: (error) => {
        this.setData({
          status: 'warn',
          hintLine1: '获取失败',
          hintLine2: error.message
        });
      },
      complete: () => {
        this.setData({
          requesting: false
        });
      }
    });
  }
})