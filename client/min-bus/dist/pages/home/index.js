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
    nearLineList: [],
    historyLines: [],
    nearLineInfo: _global2.default.getVal('NEARLINEINFO')
  },
  /** note: 在 wxp 文件或者页面文件中请去掉 methods 包装 */
  onLoad: function onLoad() {
    this.saveData();
    this.getNearLine();
  },
  onShow: function onShow() {
    var hl = _global2.default.getVal('HistoryLines').slice(0, 5);
    this.setData({
      historyLines: hl.map(function (m) {
        return {
          lineName: m,
          lineNo: m
        };
      })
    });
  },
  gotoLine: function gotoLine(e) {
    var lineName = e.currentTarget.dataset.lineName;
    wx.navigateTo({
      url: "/pages/line/index?isUpDown=0&lineName=" + encodeURIComponent(lineName)
    });
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

    this.setData({
      isLoading: true
    });
    _global2.default.setLocation().then(function (location) {
      _api2.default.getNearLine(location).then(function (res) {
        var tabs = _this.data.tabs;

        var nearLineInfo = JSON.parse(res.data.data);
        _global2.default.setVal('NEARLINEINFO', nearLineInfo);
        _this.setData({
          nearLineList: _global2.default.mapCityLoction_new(nearLineInfo),
          locationInfo: location,
          nearLineInfo: nearLineInfo,
          isLoading: false
        });
      });
    });
  },
  saveData: function saveData() {
    wx.downloadFile({
      url: 'https://limonplayer.cn/location_72px.png',
      success: function success(res) {
        if (res.statusCode === 200) {
          _global2.default.setVal('location-png', res.tempFilePath);
        }
      }
    });
    wx.downloadFile({
      url: 'https://limonplayer.cn/location_control_72px.png',
      success: function success(res) {
        if (res.statusCode === 200) {
          _global2.default.setVal('location-control-png', res.tempFilePath);
        }
      }
    });
    wx.downloadFile({
      url: 'https://limonplayer.cn/bus_icon.png',
      success: function success(res) {
        if (res.statusCode === 200) {
          _global2.default.setVal('bus-icon-png', res.tempFilePath);
        }
      }
    });
  }
});
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImluZGV4Lnd4cCJdLCJuYW1lcyI6WyJkYXRhIiwiaXNMb2FkaW5nIiwiaXNTaG93IiwiR2xvYmFsIiwiZ2V0SGVhZE5vdGljZVN0YXR1cyIsInN0eWxlIiwibG9jYXRpb25JbmZvIiwibmVhckxpbmVMaXN0IiwiaGlzdG9yeUxpbmVzIiwibmVhckxpbmVJbmZvIiwiZ2V0VmFsIiwib25Mb2FkIiwic2F2ZURhdGEiLCJnZXROZWFyTGluZSIsIm9uU2hvdyIsImhsIiwic2xpY2UiLCJzZXREYXRhIiwibWFwIiwibGluZU5hbWUiLCJtIiwibGluZU5vIiwiZ290b0xpbmUiLCJlIiwiY3VycmVudFRhcmdldCIsImRhdGFzZXQiLCJ3eCIsIm5hdmlnYXRlVG8iLCJ1cmwiLCJlbmNvZGVVUklDb21wb25lbnQiLCJvblNoYXJlQXBwTWVzc2FnZSIsInJlcyIsImZyb20iLCJjb25zb2xlIiwibG9nIiwidGFyZ2V0IiwidGl0bGUiLCJwYXRoIiwib25DbGljayIsImRldGFpbCIsImNvbXBvbmVudElkIiwia2V5IiwiaGFuZGxlU2hvd1NlYXJjaFBhZ2UiLCJzZXRMb2NhdGlvbiIsInRoZW4iLCJCdXMiLCJsb2NhdGlvbiIsInRhYnMiLCJKU09OIiwicGFyc2UiLCJzZXRWYWwiLCJtYXBDaXR5TG9jdGlvbl9uZXciLCJkb3dubG9hZEZpbGUiLCJzdWNjZXNzIiwic3RhdHVzQ29kZSIsInRlbXBGaWxlUGF0aCJdLCJtYXBwaW5ncyI6Ijs7Ozs7O0FBQUE7O0FBQ0E7O0FBQ0E7Ozs7QUFDQTs7Ozs7O0FBRm1EOztBQW1CakRBLFFBQU07QUFBQTtBQUFBO0FBQUE7O0FBQ0pDLGVBQVcsSUFEUDtBQUVKQyxZQUFRQyxpQkFBT0MsbUJBQVAsRUFGSjtBQUdKQyxXQUFPLG9EQUhIO0FBSUpDLGtCQUFjLEVBSlY7QUFLSkMsa0JBQWMsRUFMVjtBQU1KQyxrQkFBYyxFQU5WO0FBT0pDLGtCQUFjTixpQkFBT08sTUFBUCxDQUFjLGNBQWQ7QUFQVixHO0FBU047QUFDQUMsUSxvQkFB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Q0Y7QUFOYSxLQUFoQjtBQVFEIiwiZmlsZSI6ImluZGV4Lnd4cCIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IEhPU1QgfSBmcm9tIFwiLi4vLi4vY29tbW9uL2NvbmZpZ1wiO1xuaW1wb3J0IHsgZ2V0RGF0YSB9IGZyb20gXCIuLi8uLi9jb21tb24vYXBpL2NvbW1vblwiOyAvL+iAgeaOpeWPo1xuaW1wb3J0IEJ1cyBmcm9tIFwiLi4vLi4vbW9kZWxzL2FwaVwiO1xuaW1wb3J0IEdsb2JhbCBmcm9tIFwiLi4vLi4vbW9kZWxzL2dsb2JhbFwiO1xuXG5leHBvcnQgZGVmYXVsdCB7XG4gIGNvbmZpZzoge1xuICAgIGRpc2FibGVTY3JvbGw6IHRydWUsXG4gICAgdXNpbmdDb21wb25lbnRzOiB7XG4gICAgICAnd3hjLWxpc3QnOiAnQG1pbnVpL3d4Yy1saXN0JyxcbiAgICAgIFwibGF5b3V0LWhlYWRcIjogXCJsYXlvdXQvaGVhZFwiLFxuICAgICAgXCJsYXlvdXQtZm9vdFwiOiBcImxheW91dC9mb290XCIsXG4gICAgICBcInd4Yy1idXR0b25cIjogXCJAbWludWkvd3hjLWJ1dHRvblwiLFxuICAgICAgXCJ3eGMtaWNvblwiOiBcIkBtaW51aS93eGMtaWNvblwiLFxuICAgICAgXCJ3eGMtc2VhcmNoXCI6IFwiQG1pbnVpL3d4Yy1zZWFyY2hcIixcbiAgICAgIFwiaW5kZXgtY2FyZFwiOiBcIi4uL2NvbXBvbmVudHMvaW5kZXgtY2FyZFwiLFxuICAgICAgXCJ3eGMtbG9hZG1vcmVcIjogXCJAbWludWkvd3hjLWxvYWRtb3JlXCIsXG4gICAgICBcInd4Yy1sb2FkaW5nXCI6IFwiQG1pbnVpL3d4Yy1sb2FkaW5nXCJcbiAgICB9XG4gIH0sXG4gIGRhdGE6IHtcbiAgICBpc0xvYWRpbmc6IHRydWUsXG4gICAgaXNTaG93OiBHbG9iYWwuZ2V0SGVhZE5vdGljZVN0YXR1cygpLFxuICAgIHN0eWxlOiBcImJhY2tncm91bmQ6ICNmZmY7Ym9yZGVyLXJhZGl1czogNjZycHg7Y29sb3I6ICMwMDA7XCIsXG4gICAgbG9jYXRpb25JbmZvOiB7fSxcbiAgICBuZWFyTGluZUxpc3Q6IFtdLFxuICAgIGhpc3RvcnlMaW5lczogW10sXG4gICAgbmVhckxpbmVJbmZvOiBHbG9iYWwuZ2V0VmFsKCdORUFSTElORUlORk8nKVxuICB9LFxuICAvKiogbm90ZTog5ZyoIHd4cCDmlofku7bmiJbogIXpobXpnaLmlofku7bkuK3or7fljrvmjokgbWV0aG9kcyDljIXoo4UgKi9cbiAgb25Mb2FkICgpIHtcbiAgICB0aGlzLnNhdmVEYXRhKCk7XG4gICAgdGhpcy5nZXROZWFyTGluZSgpO1xuICB9LFxuICBvblNob3cgKCkge1xuICAgIGNvbnN0IGhsID0gR2xvYmFsLmdldFZhbCgnSGlzdG9yeUxpbmVzJykuc2xpY2UoMCwgNSlcbiAgICB0aGlzLnNldERhdGEoe1xuICAgICAgaGlzdG9yeUxpbmVzOiBobC5tYXAobSA9PiB7XG4gICAgICAgIHJldHVybiB7XG4gICAgICAgICAgbGluZU5hbWU6IG0sXG4gICAgICAgICAgbGluZU5vOiBtXG4gICAgICAgIH1cbiAgICAgIH0pXG4gICAgfSlcbiAgfSxcbiAgZ290b0xpbmUgKGUpIHtcbiAgICBjb25zdCBsaW5lTmFtZSA9IGUuY3VycmVudFRhcmdldC5kYXRhc2V0LmxpbmVOYW1lXG4gICAgd3gubmF2aWdhdGVUbyh7XG4gICAgICB1cmw6IGAvcGFnZXMvbGluZS9pbmRleD9pc1VwRG93bj0wJmxpbmVOYW1lPSR7ZW5jb2RlVVJJQ29tcG9uZW50KGxpbmVOYW1lKX1gXG4gICAgfSlcbiAgfSxcbiAgb25TaGFyZUFwcE1lc3NhZ2UgKHJlcykge1xuICAgIGlmIChyZXMuZnJvbSA9PT0gJ2J1dHRvbicpIHtcbiAgICAgIC8vIOadpeiHqumhtemdouWGhei9rOWPkeaMiemSrlxuICAgICAgY29uc29sZS5sb2cocmVzLnRhcmdldClcbiAgICB9XG4gICAgcmV0dXJuIHtcbiAgICAgIHRpdGxlOiAn6Iif5bGx5YWs5Lqk5a6e5pe25p+l6K+iJyxcbiAgICAgIHBhdGg6ICdwYWdlcy9ob21lL2luZGV4J1xuICAgIH1cbiAgfSxcbiAgb25DbGljazogZnVuY3Rpb24gKGUpIHtcbiAgICBjb25zb2xlLmxvZyhcbiAgICAgIGBDb21wb25lbnRJZDoke2UuZGV0YWlsLmNvbXBvbmVudElkfSx5b3Ugc2VsZWN0ZWQ6JHtlLmRldGFpbC5rZXl9YFxuICAgICk7XG4gIH0sXG4gIGhhbmRsZVNob3dTZWFyY2hQYWdlICgpIHtcbiAgICB3eC5uYXZpZ2F0ZVRvKHtcbiAgICAgIHVybDogYC9wYWdlcy9zZWFyY2gvaW5kZXhgXG4gICAgfSlcbiAgfSxcbiAgZ2V0TmVhckxpbmUgKCkge1xuICAgIHRoaXMuc2V0RGF0YSh7XG4gICAgICBpc0xvYWRpbmc6IHRydWVcbiAgICB9KTtcbiAgICBHbG9iYWwuc2V0TG9jYXRpb24oKS50aGVuKGxvY2F0aW9uID0+IHtcbiAgICAgIEJ1cy5nZXROZWFyTGluZShsb2NhdGlvbikudGhlbihyZXMgPT4ge1xuICAgICAgICBjb25zdCB7IHRhYnMgfSA9IHRoaXMuZGF0YTtcbiAgICAgICAgY29uc3QgbmVhckxpbmVJbmZvID0gSlNPTi5wYXJzZShyZXMuZGF0YS5kYXRhKVxuICAgICAgICBHbG9iYWwuc2V0VmFsKCdORUFSTElORUlORk8nLCBuZWFyTGluZUluZm8pXG4gICAgICAgIHRoaXMuc2V0RGF0YSh7XG4gICAgICAgICAgbmVhckxpbmVMaXN0OiBHbG9iYWwubWFwQ2l0eUxvY3Rpb25fbmV3KG5lYXJMaW5lSW5mbyksXG4gICAgICAgICAgbG9jYXRpb25JbmZvOiBsb2NhdGlvbixcbiAgICAgICAgICBuZWFyTGluZUluZm8sXG4gICAgICAgICAgaXNMb2FkaW5nOiBmYWxzZVxuICAgICAgICB9KTtcbiAgICAgIH0pXG4gICAgfSlcbiAgfSxcbiAgc2F2ZURhdGEgKCkge1xuICAgIHd4LmRvd25sb2FkRmlsZSh7XG4gICAgICB1cmw6ICdodHRwczovL2xpbW9ucGxheWVyLmNuL2xvY2F0aW9uXzcycHgucG5nJyxcbiAgICAgIHN1Y2Nlc3M6IGZ1bmN0aW9uIChyZXMpIHtcbiAgICAgICAgaWYgKHJlcy5zdGF0dXNDb2RlID09PSAyMDApIHtcbiAgICAgICAgICBHbG9iYWwuc2V0VmFsKCdsb2NhdGlvbi1wbmcnLCByZXMudGVtcEZpbGVQYXRoKVxuICAgICAgICB9XG4gICAgICB9XG4gICAgfSlcbiAgICB3eC5kb3dubG9hZEZpbGUoe1xuICAgICAgdXJsOiAnaHR0cHM6Ly9saW1vbnBsYXllci5jbi9sb2NhdGlvbl9jb250cm9sXzcycHgucG5nJyxcbiAgICAgIHN1Y2Nlc3M6IGZ1bmN0aW9uIChyZXMpIHtcbiAgICAgICAgaWYgKHJlcy5zdGF0dXNDb2RlID09PSAyMDApIHtcbiAgICAgICAgICBHbG9iYWwuc2V0VmFsKCdsb2NhdGlvbi1jb250cm9sLXBuZycsIHJlcy50ZW1wRmlsZVBhdGgpXG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9KVxuICAgIHd4LmRvd25sb2FkRmlsZSh7XG4gICAgICB1cmw6ICdodHRwczovL2xpbW9ucGxheWVyLmNuL2J1c19pY29uLnBuZycsXG4gICAgICBzdWNjZXNzOiBmdW5jdGlvbiAocmVzKSB7XG4gICAgICAgIGlmIChyZXMuc3RhdHVzQ29kZSA9PT0gMjAwKSB7XG4gICAgICAgICAgR2xvYmFsLnNldFZhbCgnYnVzLWljb24tcG5nJywgcmVzLnRlbXBGaWxlUGF0aClcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH0pXG4gIH1cbn07Il19