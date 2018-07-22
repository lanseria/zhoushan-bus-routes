"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _config = require("../../common/config.js");

var _common = require("../../common/api/common.js");

var _api = require("../../models/api.js");

var _api2 = _interopRequireDefault(_api);

var _global = require("../../models/global.js");

var _global2 = _interopRequireDefault(_global);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

//老接口
exports.default = Page({
  data: {
    "__code__": {
      readme: ""
    },

    $loading: {
      isShow: false
    },
    style: "background: #fff;border-radius: 66rpx;color: #000;",
    locationInfo: {},
    nearLineInfo: [],
    tabs: [{ title: "推荐", content: "" }, { title: "收藏", content: "" }, { title: "历史", content: "" }]
  },
  /** note: 在 wxp 文件或者页面文件中请去掉 methods 包装 */
  onLoad: function onLoad() {
    this.saveData();
    this.getNearLine();
  },
  onShow: function onShow() {
    this.getNearLine();
  },

  onClick: function onClick(e) {
    console.log("ComponentId:" + e.detail.componentId + ",you selected:" + e.detail.key);
  },
  handleShowSearchPage: function handleShowSearchPage() {
    wx.navigateTo({
      url: "/pages/search/index"
    });
  },
  getNearLine: function getNearLine() {
    var _this = this;

    this.setData({
      $loading: {
        isShow: true
      }
    });
    _global2.default.setLocation().then(function (location) {
      _api2.default.getNearLine(location).then(function (res) {
        var tabs = _this.data.tabs;

        var nearLineInfo = JSON.parse(res.data.data);
        tabs[0].content = nearLineInfo.slice(0, 10);
        _this.setData({
          locationInfo: res,
          nearLineInfo: nearLineInfo,
          tabs: tabs,
          $loading: {
            isShow: false
          }
        });
      });
    });
  },
  saveData: function saveData() {
    wx.downloadFile({
      url: 'https://api.limonplayer.cn/location_72px.png',
      success: function success(res) {
        if (res.statusCode === 200) {
          _global2.default.setVal('location-png', res.tempFilePath);
        }
      }
    });
    wx.downloadFile({
      url: 'https://api.limonplayer.cn/location_control_72px.png',
      success: function success(res) {
        if (res.statusCode === 200) {
          _global2.default.setVal('location-control-png', res.tempFilePath);
        }
      }
    });
    wx.downloadFile({
      url: 'https://api.limonplayer.cn/bus_icon.png',
      success: function success(res) {
        if (res.statusCode === 200) {
          _global2.default.setVal('bus-icon-png', res.tempFilePath);
        }
      }
    });
  }
});
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImluZGV4Lnd4cCJdLCJuYW1lcyI6WyJkYXRhIiwiJGxvYWRpbmciLCJpc1Nob3ciLCJzdHlsZSIsImxvY2F0aW9uSW5mbyIsIm5lYXJMaW5lSW5mbyIsInRhYnMiLCJ0aXRsZSIsImNvbnRlbnQiLCJvbkxvYWQiLCJzYXZlRGF0YSIsImdldE5lYXJMaW5lIiwib25TaG93Iiwib25DbGljayIsImUiLCJjb25zb2xlIiwibG9nIiwiZGV0YWlsIiwiY29tcG9uZW50SWQiLCJrZXkiLCJoYW5kbGVTaG93U2VhcmNoUGFnZSIsInd4IiwibmF2aWdhdGVUbyIsInVybCIsInNldERhdGEiLCJHbG9iYWwiLCJzZXRMb2NhdGlvbiIsInRoZW4iLCJCdXMiLCJsb2NhdGlvbiIsIkpTT04iLCJwYXJzZSIsInJlcyIsInNsaWNlIiwiZG93bmxvYWRGaWxlIiwic3VjY2VzcyIsInN0YXR1c0NvZGUiLCJzZXRWYWwiLCJ0ZW1wRmlsZVBhdGgiXSwibWFwcGluZ3MiOiI7Ozs7OztBQUFBOztBQUNBOztBQUNBOzs7O0FBQ0E7Ozs7OztBQUZtRDs7QUFrQmpEQSxRQUFNO0FBQUE7QUFBQTtBQUFBOztBQUNKQyxjQUFVO0FBQ1JDLGNBQVE7QUFEQSxLQUROO0FBSUpDLFdBQU8sb0RBSkg7QUFLSkMsa0JBQWMsRUFMVjtBQU1KQyxrQkFBYyxFQU5WO0FBT0pDLFVBQU0sQ0FDSixFQUFFQyxPQUFPLElBQVQsRUFBZUMsU0FBUyxFQUF4QixFQURJLEVBRUosRUFBRUQsT0FBTyxJQUFULEVBQWVDLFNBQVMsRUFBeEIsRUFGSSxFQUdKLEVBQUVELE9BQU8sSUFBVCxFQUFlQyxTQUFTLEVBQXhCLEVBSEk7QUFQRixHO0FBYU47QUFDQUMsUSxvQkFBVTtBQUNSLFNBQUtDLFFBQUw7QUFDQSxTQUFLQyxXQUFMO0FBQ0QsRztBQUNEQyxRLG9CQUFTO0FBQ1AsU0FBS0QsV0FBTDtBQUNELEc7O0FBQ0RFLFdBQVMsaUJBQVNDLENBQVQsRUFBWTtBQUNuQkMsWUFBUUMsR0FBUixrQkFDaUJGLEVBQUVHLE1BQUYsQ0FBU0MsV0FEMUIsc0JBQ3NESixFQUFFRyxNQUFGLENBQVNFLEdBRC9EO0FBR0QsRztBQUNEQyxzQixrQ0FBdUI7QUFDckJDLE9BQUdDLFVBQUgsQ0FBYztBQUNaQztBQURZLEtBQWQ7QUFHRCxHO0FBQ0RaLGEseUJBQWM7QUFBQTs7QUFDWixTQUFLYSxPQUFMLENBQWE7QUFDWHZCLGdCQUFVO0FBQ1JDLGdCQUFRO0FBREE7QUFEQyxLQUFiO0FBS0F1QixxQkFBT0MsV0FBUCxHQUFxQkMsSUFBckIsQ0FBMEIsb0JBQVk7QUFDcENDLG9CQUFJakIsV0FBSixDQUFnQmtCLFFBQWhCLEVBQTBCRixJQUExQixDQUErQixlQUFPO0FBQUEsWUFDNUJyQixJQUQ0QixHQUNuQixNQUFLTixJQURjLENBQzVCTSxJQUQ0Qjs7QUFFcEMsWUFBTUQsZUFBZXlCLEtBQUtDLEtBQUwsQ0FBV0MsSUFBSWhDLElBQUosQ0FBU0EsSUFBcEIsQ0FBckI7QUFDQU0sYUFBSyxDQUFMLEVBQVFFLE9BQVIsR0FBa0JILGFBQWE0QixLQUFiLENBQW1CLENBQW5CLEVBQXNCLEVBQXRCLENBQWxCO0FBQ0EsY0FBS1QsT0FBTCxDQUFhO0FBQ1hwQix3QkFBYzRCLEdBREg7QUFFWDNCLG9DQUZXO0FBR1hDLG9CQUhXO0FBSVhMLG9CQUFVO0FBQ1JDLG9CQUFRO0FBREE7QUFKQyxTQUFiO0FBUUQsT0FaRDtBQWFELEtBZEQ7QUFlRCxHO0FBQ0RRLFUsc0JBQVk7QUFDVlcsT0FBR2EsWUFBSCxDQUFnQjtBQUNkWCxXQUFLLDhDQURTO0FBRWRZLGVBQVMsaUJBQVNILEdBQVQsRUFBYztBQUNyQixZQUFJQSxJQUFJSSxVQUFKLEtBQW1CLEdBQXZCLEVBQTRCO0FBQzFCWCwyQkFBT1ksTUFBUCxDQUFjLGNBQWQsRUFBOEJMLElBQUlNLFlBQWxDO0FBQ0Q7QUFDRjtBQU5hLEtBQWhCO0FBUUFqQixPQUFHYSxZQUFILENBQWdCO0FBQ2RYLFdBQUssc0RBRFM7QUFFZFksZUFBUyxpQkFBU0gsR0FBVCxFQUFjO0FBQ3JCLFlBQUlBLElBQUlJLFVBQUosS0FBbUIsR0FBdkIsRUFBNEI7QUFDMUJYLDJCQUFPWSxNQUFQLENBQWMsc0JBQWQsRUFBc0NMLElBQUlNLFlBQTFDO0FBQ0Q7QUFDRjtBQU5hLEtBQWhCO0FBUUFqQixPQUFHYSxZQUFILENBQWdCO0FBQ2RYLFdBQUsseUNBRFM7QUFFZFksZUFBUyxpQkFBU0gsR0FBVCxFQUFjO0FBQ3JCLFlBQUlBLElBQUlJLFVBQUosS0FBbUIsR0FBdkIsRUFBNEI7QUFDMUJYLDJCQUFPWSxNQUFQLENBQWMsY0FBZCxFQUE4QkwsSUFBSU0sWUFBbEM7QUFDRDtBQUNGO0FBTmEsS0FBaEI7QUFRRCIsImZpbGUiOiJpbmRleC53eHAiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBIT1NUIH0gZnJvbSBcIi4uLy4uL2NvbW1vbi9jb25maWdcIjtcbmltcG9ydCB7IGdldERhdGEgfSBmcm9tIFwiLi4vLi4vY29tbW9uL2FwaS9jb21tb25cIjsgLy/ogIHmjqXlj6NcbmltcG9ydCBCdXMgZnJvbSBcIi4uLy4uL21vZGVscy9hcGlcIjtcbmltcG9ydCBHbG9iYWwgZnJvbSBcIi4uLy4uL21vZGVscy9nbG9iYWxcIjtcblxuZXhwb3J0IGRlZmF1bHQge1xuICBjb25maWc6IHtcbiAgICBkaXNhYmxlU2Nyb2xsOiB0cnVlLFxuICAgIHVzaW5nQ29tcG9uZW50czoge1xuICAgICAgXCJ3eGMtYnV0dG9uXCI6IFwiQG1pbnVpL3d4Yy1idXR0b25cIixcbiAgICAgIFwid3hjLWljb25cIjogXCJAbWludWkvd3hjLWljb25cIixcbiAgICAgIFwid3hjLXNlYXJjaFwiOiBcIkBtaW51aS93eGMtc2VhcmNoXCIsXG4gICAgICBcImluZGV4LWNhcmRcIjogXCIuLi9jb21wb25lbnRzL2luZGV4LWNhcmRcIixcbiAgICAgIFwid3hjLXRhYlwiOiBcIkBtaW51aS93eGMtdGFiXCIsXG4gICAgICBcInd4Yy10YWItcGFuZWxcIjogXCJAbWludWkvd3hjLXRhYi9wYW5lbFwiLFxuICAgICAgXCJ3eGMtbG9hZG1vcmVcIjogXCJAbWludWkvd3hjLWxvYWRtb3JlXCIsXG4gICAgICBcInd4Yy1sb2FkaW5nXCI6IFwiQG1pbnVpL3d4Yy1sb2FkaW5nXCJcbiAgICB9XG4gIH0sXG4gIGRhdGE6IHtcbiAgICAkbG9hZGluZzoge1xuICAgICAgaXNTaG93OiBmYWxzZVxuICAgIH0sXG4gICAgc3R5bGU6IFwiYmFja2dyb3VuZDogI2ZmZjtib3JkZXItcmFkaXVzOiA2NnJweDtjb2xvcjogIzAwMDtcIixcbiAgICBsb2NhdGlvbkluZm86IHt9LFxuICAgIG5lYXJMaW5lSW5mbzogW10sXG4gICAgdGFiczogW1xuICAgICAgeyB0aXRsZTogXCLmjqjojZBcIiwgY29udGVudDogXCJcIiB9LFxuICAgICAgeyB0aXRsZTogXCLmlLbol49cIiwgY29udGVudDogXCJcIiB9LFxuICAgICAgeyB0aXRsZTogXCLljoblj7JcIiwgY29udGVudDogXCJcIiB9XG4gICAgXVxuICB9LFxuICAvKiogbm90ZTog5ZyoIHd4cCDmlofku7bmiJbogIXpobXpnaLmlofku7bkuK3or7fljrvmjokgbWV0aG9kcyDljIXoo4UgKi9cbiAgb25Mb2FkICgpIHtcbiAgICB0aGlzLnNhdmVEYXRhKCk7XG4gICAgdGhpcy5nZXROZWFyTGluZSgpO1xuICB9LFxuICBvblNob3coKSB7XG4gICAgdGhpcy5nZXROZWFyTGluZSgpO1xuICB9LFxuICBvbkNsaWNrOiBmdW5jdGlvbihlKSB7XG4gICAgY29uc29sZS5sb2coXG4gICAgICBgQ29tcG9uZW50SWQ6JHtlLmRldGFpbC5jb21wb25lbnRJZH0seW91IHNlbGVjdGVkOiR7ZS5kZXRhaWwua2V5fWBcbiAgICApO1xuICB9LFxuICBoYW5kbGVTaG93U2VhcmNoUGFnZSgpIHtcbiAgICB3eC5uYXZpZ2F0ZVRvKHtcbiAgICAgIHVybDogYC9wYWdlcy9zZWFyY2gvaW5kZXhgXG4gICAgfSlcbiAgfSxcbiAgZ2V0TmVhckxpbmUoKSB7XG4gICAgdGhpcy5zZXREYXRhKHtcbiAgICAgICRsb2FkaW5nOiB7XG4gICAgICAgIGlzU2hvdzogdHJ1ZVxuICAgICAgfVxuICAgIH0pO1xuICAgIEdsb2JhbC5zZXRMb2NhdGlvbigpLnRoZW4obG9jYXRpb24gPT4ge1xuICAgICAgQnVzLmdldE5lYXJMaW5lKGxvY2F0aW9uKS50aGVuKHJlcyA9PiB7XG4gICAgICAgIGNvbnN0IHsgdGFicyB9ID0gdGhpcy5kYXRhO1xuICAgICAgICBjb25zdCBuZWFyTGluZUluZm8gPSBKU09OLnBhcnNlKHJlcy5kYXRhLmRhdGEpO1xuICAgICAgICB0YWJzWzBdLmNvbnRlbnQgPSBuZWFyTGluZUluZm8uc2xpY2UoMCwgMTApO1xuICAgICAgICB0aGlzLnNldERhdGEoe1xuICAgICAgICAgIGxvY2F0aW9uSW5mbzogcmVzLFxuICAgICAgICAgIG5lYXJMaW5lSW5mbyxcbiAgICAgICAgICB0YWJzLFxuICAgICAgICAgICRsb2FkaW5nOiB7XG4gICAgICAgICAgICBpc1Nob3c6IGZhbHNlXG4gICAgICAgICAgfVxuICAgICAgICB9KTtcbiAgICAgIH0pXG4gICAgfSlcbiAgfSxcbiAgc2F2ZURhdGEgKCkge1xuICAgIHd4LmRvd25sb2FkRmlsZSh7XG4gICAgICB1cmw6ICdodHRwczovL2FwaS5saW1vbnBsYXllci5jbi9sb2NhdGlvbl83MnB4LnBuZycsXG4gICAgICBzdWNjZXNzOiBmdW5jdGlvbihyZXMpIHtcbiAgICAgICAgaWYgKHJlcy5zdGF0dXNDb2RlID09PSAyMDApIHtcbiAgICAgICAgICBHbG9iYWwuc2V0VmFsKCdsb2NhdGlvbi1wbmcnLCByZXMudGVtcEZpbGVQYXRoKVxuICAgICAgICB9XG4gICAgICB9XG4gICAgfSlcbiAgICB3eC5kb3dubG9hZEZpbGUoe1xuICAgICAgdXJsOiAnaHR0cHM6Ly9hcGkubGltb25wbGF5ZXIuY24vbG9jYXRpb25fY29udHJvbF83MnB4LnBuZycsXG4gICAgICBzdWNjZXNzOiBmdW5jdGlvbihyZXMpIHtcbiAgICAgICAgaWYgKHJlcy5zdGF0dXNDb2RlID09PSAyMDApIHtcbiAgICAgICAgICBHbG9iYWwuc2V0VmFsKCdsb2NhdGlvbi1jb250cm9sLXBuZycsIHJlcy50ZW1wRmlsZVBhdGgpXG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9KVxuICAgIHd4LmRvd25sb2FkRmlsZSh7XG4gICAgICB1cmw6ICdodHRwczovL2FwaS5saW1vbnBsYXllci5jbi9idXNfaWNvbi5wbmcnLFxuICAgICAgc3VjY2VzczogZnVuY3Rpb24ocmVzKSB7XG4gICAgICAgIGlmIChyZXMuc3RhdHVzQ29kZSA9PT0gMjAwKSB7XG4gICAgICAgICAgR2xvYmFsLnNldFZhbCgnYnVzLWljb24tcG5nJywgcmVzLnRlbXBGaWxlUGF0aClcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH0pXG4gIH1cbn07Il19