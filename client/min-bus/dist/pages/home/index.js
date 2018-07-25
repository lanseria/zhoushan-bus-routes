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
    isShow: _global2.default.getHeadNoticeStatus(),
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImluZGV4Lnd4cCJdLCJuYW1lcyI6WyJkYXRhIiwiJGxvYWRpbmciLCJpc1Nob3ciLCJHbG9iYWwiLCJnZXRIZWFkTm90aWNlU3RhdHVzIiwic3R5bGUiLCJsb2NhdGlvbkluZm8iLCJuZWFyTGluZUluZm8iLCJ0YWJzIiwidGl0bGUiLCJjb250ZW50Iiwib25Mb2FkIiwic2F2ZURhdGEiLCJnZXROZWFyTGluZSIsIm9uU2hvdyIsIm9uQ2xpY2siLCJlIiwiY29uc29sZSIsImxvZyIsImRldGFpbCIsImNvbXBvbmVudElkIiwia2V5IiwiaGFuZGxlU2hvd1NlYXJjaFBhZ2UiLCJ3eCIsIm5hdmlnYXRlVG8iLCJ1cmwiLCJzZXREYXRhIiwic2V0TG9jYXRpb24iLCJ0aGVuIiwiQnVzIiwibG9jYXRpb24iLCJKU09OIiwicGFyc2UiLCJyZXMiLCJzbGljZSIsImRvd25sb2FkRmlsZSIsInN1Y2Nlc3MiLCJzdGF0dXNDb2RlIiwic2V0VmFsIiwidGVtcEZpbGVQYXRoIl0sIm1hcHBpbmdzIjoiOzs7Ozs7QUFBQTs7QUFDQTs7QUFDQTs7OztBQUNBOzs7Ozs7QUFGbUQ7O0FBb0JqREEsUUFBTTtBQUFBO0FBQUE7QUFBQTs7QUFDSkMsY0FBVTtBQUNSQyxjQUFRO0FBREEsS0FETjtBQUlKQSxZQUFRQyxpQkFBT0MsbUJBQVAsRUFKSjtBQUtKQyxXQUFPLG9EQUxIO0FBTUpDLGtCQUFjLEVBTlY7QUFPSkMsa0JBQWMsRUFQVjtBQVFKQyxVQUFNLENBQ0osRUFBRUMsT0FBTyxJQUFULEVBQWVDLFNBQVMsRUFBeEIsRUFESSxFQUVKLEVBQUVELE9BQU8sSUFBVCxFQUFlQyxTQUFTLEVBQXhCLEVBRkksRUFHSixFQUFFRCxPQUFPLElBQVQsRUFBZUMsU0FBUyxFQUF4QixFQUhJO0FBUkYsRztBQWNOO0FBQ0FDLFEsb0JBQVU7QUFDUixTQUFLQyxRQUFMO0FBQ0EsU0FBS0MsV0FBTDtBQUNELEc7QUFDREMsUSxvQkFBUztBQUNQLFNBQUtELFdBQUw7QUFDRCxHOztBQUNERSxXQUFTLGlCQUFTQyxDQUFULEVBQVk7QUFDbkJDLFlBQVFDLEdBQVIsa0JBQ2lCRixFQUFFRyxNQUFGLENBQVNDLFdBRDFCLHNCQUNzREosRUFBRUcsTUFBRixDQUFTRSxHQUQvRDtBQUdELEc7QUFDREMsc0Isa0NBQXVCO0FBQ3JCQyxPQUFHQyxVQUFILENBQWM7QUFDWkM7QUFEWSxLQUFkO0FBR0QsRztBQUNEWixhLHlCQUFjO0FBQUE7O0FBQ1osU0FBS2EsT0FBTCxDQUFhO0FBQ1h6QixnQkFBVTtBQUNSQyxnQkFBUTtBQURBO0FBREMsS0FBYjtBQUtBQyxxQkFBT3dCLFdBQVAsR0FBcUJDLElBQXJCLENBQTBCLG9CQUFZO0FBQ3BDQyxvQkFBSWhCLFdBQUosQ0FBZ0JpQixRQUFoQixFQUEwQkYsSUFBMUIsQ0FBK0IsZUFBTztBQUFBLFlBQzVCcEIsSUFENEIsR0FDbkIsTUFBS1IsSUFEYyxDQUM1QlEsSUFENEI7O0FBRXBDLFlBQU1ELGVBQWV3QixLQUFLQyxLQUFMLENBQVdDLElBQUlqQyxJQUFKLENBQVNBLElBQXBCLENBQXJCO0FBQ0FRLGFBQUssQ0FBTCxFQUFRRSxPQUFSLEdBQWtCSCxhQUFhMkIsS0FBYixDQUFtQixDQUFuQixFQUFzQixFQUF0QixDQUFsQjtBQUNBLGNBQUtSLE9BQUwsQ0FBYTtBQUNYcEIsd0JBQWMyQixHQURIO0FBRVgxQixvQ0FGVztBQUdYQyxvQkFIVztBQUlYUCxvQkFBVTtBQUNSQyxvQkFBUTtBQURBO0FBSkMsU0FBYjtBQVFELE9BWkQ7QUFhRCxLQWREO0FBZUQsRztBQUNEVSxVLHNCQUFZO0FBQ1ZXLE9BQUdZLFlBQUgsQ0FBZ0I7QUFDZFYsV0FBSyw4Q0FEUztBQUVkVyxlQUFTLGlCQUFTSCxHQUFULEVBQWM7QUFDckIsWUFBSUEsSUFBSUksVUFBSixLQUFtQixHQUF2QixFQUE0QjtBQUMxQmxDLDJCQUFPbUMsTUFBUCxDQUFjLGNBQWQsRUFBOEJMLElBQUlNLFlBQWxDO0FBQ0Q7QUFDRjtBQU5hLEtBQWhCO0FBUUFoQixPQUFHWSxZQUFILENBQWdCO0FBQ2RWLFdBQUssc0RBRFM7QUFFZFcsZUFBUyxpQkFBU0gsR0FBVCxFQUFjO0FBQ3JCLFlBQUlBLElBQUlJLFVBQUosS0FBbUIsR0FBdkIsRUFBNEI7QUFDMUJsQywyQkFBT21DLE1BQVAsQ0FBYyxzQkFBZCxFQUFzQ0wsSUFBSU0sWUFBMUM7QUFDRDtBQUNGO0FBTmEsS0FBaEI7QUFRQWhCLE9BQUdZLFlBQUgsQ0FBZ0I7QUFDZFYsV0FBSyx5Q0FEUztBQUVkVyxlQUFTLGlCQUFTSCxHQUFULEVBQWM7QUFDckIsWUFBSUEsSUFBSUksVUFBSixLQUFtQixHQUF2QixFQUE0QjtBQUMxQmxDLDJCQUFPbUMsTUFBUCxDQUFjLGNBQWQsRUFBOEJMLElBQUlNLFlBQWxDO0FBQ0Q7QUFDRjtBQU5hLEtBQWhCO0FBUUQiLCJmaWxlIjoiaW5kZXgud3hwIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgSE9TVCB9IGZyb20gXCIuLi8uLi9jb21tb24vY29uZmlnXCI7XG5pbXBvcnQgeyBnZXREYXRhIH0gZnJvbSBcIi4uLy4uL2NvbW1vbi9hcGkvY29tbW9uXCI7IC8v6ICB5o6l5Y+jXG5pbXBvcnQgQnVzIGZyb20gXCIuLi8uLi9tb2RlbHMvYXBpXCI7XG5pbXBvcnQgR2xvYmFsIGZyb20gXCIuLi8uLi9tb2RlbHMvZ2xvYmFsXCI7XG5cbmV4cG9ydCBkZWZhdWx0IHtcbiAgY29uZmlnOiB7XG4gICAgZGlzYWJsZVNjcm9sbDogdHJ1ZSxcbiAgICB1c2luZ0NvbXBvbmVudHM6IHtcbiAgICAgIFwibGF5b3V0LWhlYWRcIjogXCJsYXlvdXQvaGVhZFwiLFxuICAgICAgXCJsYXlvdXQtZm9vdFwiOiBcImxheW91dC9mb290XCIsXG4gICAgICBcInd4Yy1idXR0b25cIjogXCJAbWludWkvd3hjLWJ1dHRvblwiLFxuICAgICAgXCJ3eGMtaWNvblwiOiBcIkBtaW51aS93eGMtaWNvblwiLFxuICAgICAgXCJ3eGMtc2VhcmNoXCI6IFwiQG1pbnVpL3d4Yy1zZWFyY2hcIixcbiAgICAgIFwiaW5kZXgtY2FyZFwiOiBcIi4uL2NvbXBvbmVudHMvaW5kZXgtY2FyZFwiLFxuICAgICAgXCJ3eGMtdGFiXCI6IFwiQG1pbnVpL3d4Yy10YWJcIixcbiAgICAgIFwid3hjLXRhYi1wYW5lbFwiOiBcIkBtaW51aS93eGMtdGFiL3BhbmVsXCIsXG4gICAgICBcInd4Yy1sb2FkbW9yZVwiOiBcIkBtaW51aS93eGMtbG9hZG1vcmVcIixcbiAgICAgIFwid3hjLWxvYWRpbmdcIjogXCJAbWludWkvd3hjLWxvYWRpbmdcIlxuICAgIH1cbiAgfSxcbiAgZGF0YToge1xuICAgICRsb2FkaW5nOiB7XG4gICAgICBpc1Nob3c6IGZhbHNlXG4gICAgfSxcbiAgICBpc1Nob3c6IEdsb2JhbC5nZXRIZWFkTm90aWNlU3RhdHVzKCksXG4gICAgc3R5bGU6IFwiYmFja2dyb3VuZDogI2ZmZjtib3JkZXItcmFkaXVzOiA2NnJweDtjb2xvcjogIzAwMDtcIixcbiAgICBsb2NhdGlvbkluZm86IHt9LFxuICAgIG5lYXJMaW5lSW5mbzogW10sXG4gICAgdGFiczogW1xuICAgICAgeyB0aXRsZTogXCLmjqjojZBcIiwgY29udGVudDogXCJcIiB9LFxuICAgICAgeyB0aXRsZTogXCLmlLbol49cIiwgY29udGVudDogXCJcIiB9LFxuICAgICAgeyB0aXRsZTogXCLljoblj7JcIiwgY29udGVudDogXCJcIiB9XG4gICAgXVxuICB9LFxuICAvKiogbm90ZTog5ZyoIHd4cCDmlofku7bmiJbogIXpobXpnaLmlofku7bkuK3or7fljrvmjokgbWV0aG9kcyDljIXoo4UgKi9cbiAgb25Mb2FkICgpIHtcbiAgICB0aGlzLnNhdmVEYXRhKCk7XG4gICAgdGhpcy5nZXROZWFyTGluZSgpO1xuICB9LFxuICBvblNob3coKSB7XG4gICAgdGhpcy5nZXROZWFyTGluZSgpO1xuICB9LFxuICBvbkNsaWNrOiBmdW5jdGlvbihlKSB7XG4gICAgY29uc29sZS5sb2coXG4gICAgICBgQ29tcG9uZW50SWQ6JHtlLmRldGFpbC5jb21wb25lbnRJZH0seW91IHNlbGVjdGVkOiR7ZS5kZXRhaWwua2V5fWBcbiAgICApO1xuICB9LFxuICBoYW5kbGVTaG93U2VhcmNoUGFnZSgpIHtcbiAgICB3eC5uYXZpZ2F0ZVRvKHtcbiAgICAgIHVybDogYC9wYWdlcy9zZWFyY2gvaW5kZXhgXG4gICAgfSlcbiAgfSxcbiAgZ2V0TmVhckxpbmUoKSB7XG4gICAgdGhpcy5zZXREYXRhKHtcbiAgICAgICRsb2FkaW5nOiB7XG4gICAgICAgIGlzU2hvdzogdHJ1ZVxuICAgICAgfVxuICAgIH0pO1xuICAgIEdsb2JhbC5zZXRMb2NhdGlvbigpLnRoZW4obG9jYXRpb24gPT4ge1xuICAgICAgQnVzLmdldE5lYXJMaW5lKGxvY2F0aW9uKS50aGVuKHJlcyA9PiB7XG4gICAgICAgIGNvbnN0IHsgdGFicyB9ID0gdGhpcy5kYXRhO1xuICAgICAgICBjb25zdCBuZWFyTGluZUluZm8gPSBKU09OLnBhcnNlKHJlcy5kYXRhLmRhdGEpO1xuICAgICAgICB0YWJzWzBdLmNvbnRlbnQgPSBuZWFyTGluZUluZm8uc2xpY2UoMCwgMTApO1xuICAgICAgICB0aGlzLnNldERhdGEoe1xuICAgICAgICAgIGxvY2F0aW9uSW5mbzogcmVzLFxuICAgICAgICAgIG5lYXJMaW5lSW5mbyxcbiAgICAgICAgICB0YWJzLFxuICAgICAgICAgICRsb2FkaW5nOiB7XG4gICAgICAgICAgICBpc1Nob3c6IGZhbHNlXG4gICAgICAgICAgfVxuICAgICAgICB9KTtcbiAgICAgIH0pXG4gICAgfSlcbiAgfSxcbiAgc2F2ZURhdGEgKCkge1xuICAgIHd4LmRvd25sb2FkRmlsZSh7XG4gICAgICB1cmw6ICdodHRwczovL2FwaS5saW1vbnBsYXllci5jbi9sb2NhdGlvbl83MnB4LnBuZycsXG4gICAgICBzdWNjZXNzOiBmdW5jdGlvbihyZXMpIHtcbiAgICAgICAgaWYgKHJlcy5zdGF0dXNDb2RlID09PSAyMDApIHtcbiAgICAgICAgICBHbG9iYWwuc2V0VmFsKCdsb2NhdGlvbi1wbmcnLCByZXMudGVtcEZpbGVQYXRoKVxuICAgICAgICB9XG4gICAgICB9XG4gICAgfSlcbiAgICB3eC5kb3dubG9hZEZpbGUoe1xuICAgICAgdXJsOiAnaHR0cHM6Ly9hcGkubGltb25wbGF5ZXIuY24vbG9jYXRpb25fY29udHJvbF83MnB4LnBuZycsXG4gICAgICBzdWNjZXNzOiBmdW5jdGlvbihyZXMpIHtcbiAgICAgICAgaWYgKHJlcy5zdGF0dXNDb2RlID09PSAyMDApIHtcbiAgICAgICAgICBHbG9iYWwuc2V0VmFsKCdsb2NhdGlvbi1jb250cm9sLXBuZycsIHJlcy50ZW1wRmlsZVBhdGgpXG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9KVxuICAgIHd4LmRvd25sb2FkRmlsZSh7XG4gICAgICB1cmw6ICdodHRwczovL2FwaS5saW1vbnBsYXllci5jbi9idXNfaWNvbi5wbmcnLFxuICAgICAgc3VjY2VzczogZnVuY3Rpb24ocmVzKSB7XG4gICAgICAgIGlmIChyZXMuc3RhdHVzQ29kZSA9PT0gMjAwKSB7XG4gICAgICAgICAgR2xvYmFsLnNldFZhbCgnYnVzLWljb24tcG5nJywgcmVzLnRlbXBGaWxlUGF0aClcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH0pXG4gIH1cbn07Il19