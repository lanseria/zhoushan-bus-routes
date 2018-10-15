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

    isLoading: true,
    isShow: _global2.default.getHeadNoticeStatus(),
    style: "background: #fff;border-radius: 66rpx;color: #000;",
    locationInfo: {},
    nearLineInfo: _global2.default.getVal('NEARLINEINFO')
  },
  /** note: 在 wxp 文件或者页面文件中请去掉 methods 包装 */
  onLoad: function onLoad() {
    this.saveData();
  },
  onShow: function onShow() {
    this.getNearLine();
  },
  onShareAppMessage: function onShareAppMessage(res) {
    if (res.from === 'button') {
      // 来自页面内转发按钮
      console.log(res.target);
    }
    return {
      title: '舟山公交实时查询',
      path: 'pages/home/index'
    };
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

    // this.setData({
    //   isLoading: true
    // });
    _global2.default.setLocation().then(function (location) {
      _api2.default.getNearLine(location).then(function (res) {
        var tabs = _this.data.tabs;

        var nearLineInfo = JSON.parse(res.data.data);
        _global2.default.setVal('NEARLINEINFO', nearLineInfo);
        _this.setData({
          locationInfo: location,
          nearLineInfo: nearLineInfo,
          isLoading: false
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImluZGV4Lnd4cCJdLCJuYW1lcyI6WyJkYXRhIiwiaXNMb2FkaW5nIiwiaXNTaG93IiwiR2xvYmFsIiwiZ2V0SGVhZE5vdGljZVN0YXR1cyIsInN0eWxlIiwibG9jYXRpb25JbmZvIiwibmVhckxpbmVJbmZvIiwiZ2V0VmFsIiwib25Mb2FkIiwic2F2ZURhdGEiLCJvblNob3ciLCJnZXROZWFyTGluZSIsIm9uU2hhcmVBcHBNZXNzYWdlIiwicmVzIiwiZnJvbSIsImNvbnNvbGUiLCJsb2ciLCJ0YXJnZXQiLCJ0aXRsZSIsInBhdGgiLCJvbkNsaWNrIiwiZSIsImRldGFpbCIsImNvbXBvbmVudElkIiwia2V5IiwiaGFuZGxlU2hvd1NlYXJjaFBhZ2UiLCJ3eCIsIm5hdmlnYXRlVG8iLCJ1cmwiLCJzZXRMb2NhdGlvbiIsInRoZW4iLCJCdXMiLCJsb2NhdGlvbiIsInRhYnMiLCJKU09OIiwicGFyc2UiLCJzZXRWYWwiLCJzZXREYXRhIiwiZG93bmxvYWRGaWxlIiwic3VjY2VzcyIsInN0YXR1c0NvZGUiLCJ0ZW1wRmlsZVBhdGgiXSwibWFwcGluZ3MiOiI7Ozs7OztBQUFBOztBQUNBOztBQUNBOzs7O0FBQ0E7Ozs7OztBQUZtRDs7QUFrQmpEQSxRQUFNO0FBQUE7QUFBQTtBQUFBOztBQUNKQyxlQUFXLElBRFA7QUFFSkMsWUFBUUMsaUJBQU9DLG1CQUFQLEVBRko7QUFHSkMsV0FBTyxvREFISDtBQUlKQyxrQkFBYyxFQUpWO0FBS0pDLGtCQUFjSixpQkFBT0ssTUFBUCxDQUFjLGNBQWQ7QUFMVixHO0FBT047QUFDQUMsUSxvQkFBVTtBQUNSLFNBQUtDLFFBQUw7QUFDRCxHO0FBQ0RDLFEsb0JBQVU7QUFDUixTQUFLQyxXQUFMO0FBQ0QsRztBQUNEQyxtQiw2QkFBbUJDLEcsRUFBSztBQUN0QixRQUFJQSxJQUFJQyxJQUFKLEtBQWEsUUFBakIsRUFBMkI7QUFDekI7QUFDQUMsY0FBUUMsR0FBUixDQUFZSCxJQUFJSSxNQUFoQjtBQUNEO0FBQ0QsV0FBTztBQUNMQyxhQUFPLFVBREY7QUFFTEMsWUFBTTtBQUZELEtBQVA7QUFJRCxHOztBQUNEQyxXQUFTLGlCQUFVQyxDQUFWLEVBQWE7QUFDcEJOLFlBQVFDLEdBQVIsa0JBQ2lCSyxFQUFFQyxNQUFGLENBQVNDLFdBRDFCLHNCQUNzREYsRUFBRUMsTUFBRixDQUFTRSxHQUQvRDtBQUdELEc7QUFDREMsc0Isa0NBQXdCO0FBQ3RCQyxPQUFHQyxVQUFILENBQWM7QUFDWkM7QUFEWSxLQUFkO0FBR0QsRztBQUNEakIsYSx5QkFBZTtBQUFBOztBQUNiO0FBQ0E7QUFDQTtBQUNBVCxxQkFBTzJCLFdBQVAsR0FBcUJDLElBQXJCLENBQTBCLG9CQUFZO0FBQ3BDQyxvQkFBSXBCLFdBQUosQ0FBZ0JxQixRQUFoQixFQUEwQkYsSUFBMUIsQ0FBK0IsZUFBTztBQUFBLFlBQzVCRyxJQUQ0QixHQUNuQixNQUFLbEMsSUFEYyxDQUM1QmtDLElBRDRCOztBQUVwQyxZQUFNM0IsZUFBZTRCLEtBQUtDLEtBQUwsQ0FBV3RCLElBQUlkLElBQUosQ0FBU0EsSUFBcEIsQ0FBckI7QUFDQUcseUJBQU9rQyxNQUFQLENBQWMsY0FBZCxFQUE4QjlCLFlBQTlCO0FBQ0EsY0FBSytCLE9BQUwsQ0FBYTtBQUNYaEMsd0JBQWMyQixRQURIO0FBRVgxQixvQ0FGVztBQUdYTixxQkFBVztBQUhBLFNBQWI7QUFLRCxPQVREO0FBVUQsS0FYRDtBQVlELEc7QUFDRFMsVSxzQkFBWTtBQUNWaUIsT0FBR1ksWUFBSCxDQUFnQjtBQUNkVixXQUFLLDhDQURTO0FBRWRXLGVBQVMsaUJBQVUxQixHQUFWLEVBQWU7QUFDdEIsWUFBSUEsSUFBSTJCLFVBQUosS0FBbUIsR0FBdkIsRUFBNEI7QUFDMUJ0QywyQkFBT2tDLE1BQVAsQ0FBYyxjQUFkLEVBQThCdkIsSUFBSTRCLFlBQWxDO0FBQ0Q7QUFDRjtBQU5hLEtBQWhCO0FBUUFmLE9BQUdZLFlBQUgsQ0FBZ0I7QUFDZFYsV0FBSyxzREFEUztBQUVkVyxlQUFTLGlCQUFVMUIsR0FBVixFQUFlO0FBQ3RCLFlBQUlBLElBQUkyQixVQUFKLEtBQW1CLEdBQXZCLEVBQTRCO0FBQzFCdEMsMkJBQU9rQyxNQUFQLENBQWMsc0JBQWQsRUFBc0N2QixJQUFJNEIsWUFBMUM7QUFDRDtBQUNGO0FBTmEsS0FBaEI7QUFRQWYsT0FBR1ksWUFBSCxDQUFnQjtBQUNkVixXQUFLLHlDQURTO0FBRWRXLGVBQVMsaUJBQVUxQixHQUFWLEVBQWU7QUFDdEIsWUFBSUEsSUFBSTJCLFVBQUosS0FBbUIsR0FBdkIsRUFBNEI7QUFDMUJ0QywyQkFBT2tDLE1BQVAsQ0FBYyxjQUFkLEVBQThCdkIsSUFBSTRCLFlBQWxDO0FBQ0Q7QUFDRjtBQU5hLEtBQWhCO0FBUUQiLCJmaWxlIjoiaW5kZXgud3hwIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgSE9TVCB9IGZyb20gXCIuLi8uLi9jb21tb24vY29uZmlnXCI7XG5pbXBvcnQgeyBnZXREYXRhIH0gZnJvbSBcIi4uLy4uL2NvbW1vbi9hcGkvY29tbW9uXCI7IC8v6ICB5o6l5Y+jXG5pbXBvcnQgQnVzIGZyb20gXCIuLi8uLi9tb2RlbHMvYXBpXCI7XG5pbXBvcnQgR2xvYmFsIGZyb20gXCIuLi8uLi9tb2RlbHMvZ2xvYmFsXCI7XG5cbmV4cG9ydCBkZWZhdWx0IHtcbiAgY29uZmlnOiB7XG4gICAgZGlzYWJsZVNjcm9sbDogdHJ1ZSxcbiAgICB1c2luZ0NvbXBvbmVudHM6IHtcbiAgICAgIFwibGF5b3V0LWhlYWRcIjogXCJsYXlvdXQvaGVhZFwiLFxuICAgICAgXCJsYXlvdXQtZm9vdFwiOiBcImxheW91dC9mb290XCIsXG4gICAgICBcInd4Yy1idXR0b25cIjogXCJAbWludWkvd3hjLWJ1dHRvblwiLFxuICAgICAgXCJ3eGMtaWNvblwiOiBcIkBtaW51aS93eGMtaWNvblwiLFxuICAgICAgXCJ3eGMtc2VhcmNoXCI6IFwiQG1pbnVpL3d4Yy1zZWFyY2hcIixcbiAgICAgIFwiaW5kZXgtY2FyZFwiOiBcIi4uL2NvbXBvbmVudHMvaW5kZXgtY2FyZFwiLFxuICAgICAgXCJ3eGMtbG9hZG1vcmVcIjogXCJAbWludWkvd3hjLWxvYWRtb3JlXCIsXG4gICAgICBcInd4Yy1sb2FkaW5nXCI6IFwiQG1pbnVpL3d4Yy1sb2FkaW5nXCJcbiAgICB9XG4gIH0sXG4gIGRhdGE6IHtcbiAgICBpc0xvYWRpbmc6IHRydWUsXG4gICAgaXNTaG93OiBHbG9iYWwuZ2V0SGVhZE5vdGljZVN0YXR1cygpLFxuICAgIHN0eWxlOiBcImJhY2tncm91bmQ6ICNmZmY7Ym9yZGVyLXJhZGl1czogNjZycHg7Y29sb3I6ICMwMDA7XCIsXG4gICAgbG9jYXRpb25JbmZvOiB7fSxcbiAgICBuZWFyTGluZUluZm86IEdsb2JhbC5nZXRWYWwoJ05FQVJMSU5FSU5GTycpXG4gIH0sXG4gIC8qKiBub3RlOiDlnKggd3hwIOaWh+S7tuaIluiAhemhtemdouaWh+S7tuS4reivt+WOu+aOiSBtZXRob2RzIOWMheijhSAqL1xuICBvbkxvYWQgKCkge1xuICAgIHRoaXMuc2F2ZURhdGEoKTtcbiAgfSxcbiAgb25TaG93ICgpIHtcbiAgICB0aGlzLmdldE5lYXJMaW5lKCk7XG4gIH0sXG4gIG9uU2hhcmVBcHBNZXNzYWdlIChyZXMpIHtcbiAgICBpZiAocmVzLmZyb20gPT09ICdidXR0b24nKSB7XG4gICAgICAvLyDmnaXoh6rpobXpnaLlhoXovazlj5HmjInpkq5cbiAgICAgIGNvbnNvbGUubG9nKHJlcy50YXJnZXQpXG4gICAgfVxuICAgIHJldHVybiB7XG4gICAgICB0aXRsZTogJ+iIn+WxseWFrOS6pOWunuaXtuafpeivoicsXG4gICAgICBwYXRoOiAncGFnZXMvaG9tZS9pbmRleCdcbiAgICB9XG4gIH0sXG4gIG9uQ2xpY2s6IGZ1bmN0aW9uIChlKSB7XG4gICAgY29uc29sZS5sb2coXG4gICAgICBgQ29tcG9uZW50SWQ6JHtlLmRldGFpbC5jb21wb25lbnRJZH0seW91IHNlbGVjdGVkOiR7ZS5kZXRhaWwua2V5fWBcbiAgICApO1xuICB9LFxuICBoYW5kbGVTaG93U2VhcmNoUGFnZSAoKSB7XG4gICAgd3gubmF2aWdhdGVUbyh7XG4gICAgICB1cmw6IGAvcGFnZXMvc2VhcmNoL2luZGV4YFxuICAgIH0pXG4gIH0sXG4gIGdldE5lYXJMaW5lICgpIHtcbiAgICAvLyB0aGlzLnNldERhdGEoe1xuICAgIC8vICAgaXNMb2FkaW5nOiB0cnVlXG4gICAgLy8gfSk7XG4gICAgR2xvYmFsLnNldExvY2F0aW9uKCkudGhlbihsb2NhdGlvbiA9PiB7XG4gICAgICBCdXMuZ2V0TmVhckxpbmUobG9jYXRpb24pLnRoZW4ocmVzID0+IHtcbiAgICAgICAgY29uc3QgeyB0YWJzIH0gPSB0aGlzLmRhdGE7XG4gICAgICAgIGNvbnN0IG5lYXJMaW5lSW5mbyA9IEpTT04ucGFyc2UocmVzLmRhdGEuZGF0YSlcbiAgICAgICAgR2xvYmFsLnNldFZhbCgnTkVBUkxJTkVJTkZPJywgbmVhckxpbmVJbmZvKVxuICAgICAgICB0aGlzLnNldERhdGEoe1xuICAgICAgICAgIGxvY2F0aW9uSW5mbzogbG9jYXRpb24sXG4gICAgICAgICAgbmVhckxpbmVJbmZvLFxuICAgICAgICAgIGlzTG9hZGluZzogZmFsc2VcbiAgICAgICAgfSk7XG4gICAgICB9KVxuICAgIH0pXG4gIH0sXG4gIHNhdmVEYXRhICgpIHtcbiAgICB3eC5kb3dubG9hZEZpbGUoe1xuICAgICAgdXJsOiAnaHR0cHM6Ly9hcGkubGltb25wbGF5ZXIuY24vbG9jYXRpb25fNzJweC5wbmcnLFxuICAgICAgc3VjY2VzczogZnVuY3Rpb24gKHJlcykge1xuICAgICAgICBpZiAocmVzLnN0YXR1c0NvZGUgPT09IDIwMCkge1xuICAgICAgICAgIEdsb2JhbC5zZXRWYWwoJ2xvY2F0aW9uLXBuZycsIHJlcy50ZW1wRmlsZVBhdGgpXG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9KVxuICAgIHd4LmRvd25sb2FkRmlsZSh7XG4gICAgICB1cmw6ICdodHRwczovL2FwaS5saW1vbnBsYXllci5jbi9sb2NhdGlvbl9jb250cm9sXzcycHgucG5nJyxcbiAgICAgIHN1Y2Nlc3M6IGZ1bmN0aW9uIChyZXMpIHtcbiAgICAgICAgaWYgKHJlcy5zdGF0dXNDb2RlID09PSAyMDApIHtcbiAgICAgICAgICBHbG9iYWwuc2V0VmFsKCdsb2NhdGlvbi1jb250cm9sLXBuZycsIHJlcy50ZW1wRmlsZVBhdGgpXG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9KVxuICAgIHd4LmRvd25sb2FkRmlsZSh7XG4gICAgICB1cmw6ICdodHRwczovL2FwaS5saW1vbnBsYXllci5jbi9idXNfaWNvbi5wbmcnLFxuICAgICAgc3VjY2VzczogZnVuY3Rpb24gKHJlcykge1xuICAgICAgICBpZiAocmVzLnN0YXR1c0NvZGUgPT09IDIwMCkge1xuICAgICAgICAgIEdsb2JhbC5zZXRWYWwoJ2J1cy1pY29uLXBuZycsIHJlcy50ZW1wRmlsZVBhdGgpXG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9KVxuICB9XG59OyJdfQ==