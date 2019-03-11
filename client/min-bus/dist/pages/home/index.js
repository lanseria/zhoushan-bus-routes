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
    nearLineInfo: _global2.default.getVal('NEARLINEINFO')
  },
  /** note: 在 wxp 文件或者页面文件中请去掉 methods 包装 */
  onLoad: function onLoad() {
    this.saveData();
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

    this.setData({
      isLoading: true
    });
    _global2.default.setLocation().then(function (location) {
      _api2.default.getNearLine(location).then(function (res) {
        var tabs = _this.data.tabs;

        var nearLineInfo = JSON.parse(res.data.data);
        console.log(_global2.default.mapCityLoction_new(nearLineInfo));
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImluZGV4Lnd4cCJdLCJuYW1lcyI6WyJkYXRhIiwiaXNMb2FkaW5nIiwiaXNTaG93IiwiR2xvYmFsIiwiZ2V0SGVhZE5vdGljZVN0YXR1cyIsInN0eWxlIiwibG9jYXRpb25JbmZvIiwibmVhckxpbmVMaXN0IiwibmVhckxpbmVJbmZvIiwiZ2V0VmFsIiwib25Mb2FkIiwic2F2ZURhdGEiLCJnZXROZWFyTGluZSIsIm9uU2hhcmVBcHBNZXNzYWdlIiwicmVzIiwiZnJvbSIsImNvbnNvbGUiLCJsb2ciLCJ0YXJnZXQiLCJ0aXRsZSIsInBhdGgiLCJvbkNsaWNrIiwiZSIsImRldGFpbCIsImNvbXBvbmVudElkIiwia2V5IiwiaGFuZGxlU2hvd1NlYXJjaFBhZ2UiLCJ3eCIsIm5hdmlnYXRlVG8iLCJ1cmwiLCJzZXREYXRhIiwic2V0TG9jYXRpb24iLCJ0aGVuIiwiQnVzIiwibG9jYXRpb24iLCJ0YWJzIiwiSlNPTiIsInBhcnNlIiwibWFwQ2l0eUxvY3Rpb25fbmV3Iiwic2V0VmFsIiwiZG93bmxvYWRGaWxlIiwic3VjY2VzcyIsInN0YXR1c0NvZGUiLCJ0ZW1wRmlsZVBhdGgiXSwibWFwcGluZ3MiOiI7Ozs7OztBQUFBOztBQUNBOztBQUNBOzs7O0FBQ0E7Ozs7OztBQUZtRDs7QUFrQmpEQSxRQUFNO0FBQUE7QUFBQTtBQUFBOztBQUNKQyxlQUFXLElBRFA7QUFFSkMsWUFBUUMsaUJBQU9DLG1CQUFQLEVBRko7QUFHSkMsV0FBTyxvREFISDtBQUlKQyxrQkFBYyxFQUpWO0FBS0pDLGtCQUFjLEVBTFY7QUFNSkMsa0JBQWNMLGlCQUFPTSxNQUFQLENBQWMsY0FBZDtBQU5WLEc7QUFRTjtBQUNBQyxRLG9CQUFVO0FBQ1IsU0FBS0MsUUFBTDtBQUNBLFNBQUtDLFdBQUw7QUFDRCxHO0FBQ0RDLG1CLDZCQUFtQkMsRyxFQUFLO0FBQ3RCLFFBQUlBLElBQUlDLElBQUosS0FBYSxRQUFqQixFQUEyQjtBQUN6QjtBQUNBQyxjQUFRQyxHQUFSLENBQVlILElBQUlJLE1BQWhCO0FBQ0Q7QUFDRCxXQUFPO0FBQ0xDLGFBQU8sVUFERjtBQUVMQyxZQUFNO0FBRkQsS0FBUDtBQUlELEc7O0FBQ0RDLFdBQVMsaUJBQVVDLENBQVYsRUFBYTtBQUNwQk4sWUFBUUMsR0FBUixrQkFDaUJLLEVBQUVDLE1BQUYsQ0FBU0MsV0FEMUIsc0JBQ3NERixFQUFFQyxNQUFGLENBQVNFLEdBRC9EO0FBR0QsRztBQUNEQyxzQixrQ0FBd0I7QUFDdEJDLE9BQUdDLFVBQUgsQ0FBYztBQUNaQztBQURZLEtBQWQ7QUFHRCxHO0FBQ0RqQixhLHlCQUFlO0FBQUE7O0FBQ2IsU0FBS2tCLE9BQUwsQ0FBYTtBQUNYN0IsaUJBQVc7QUFEQSxLQUFiO0FBR0FFLHFCQUFPNEIsV0FBUCxHQUFxQkMsSUFBckIsQ0FBMEIsb0JBQVk7QUFDcENDLG9CQUFJckIsV0FBSixDQUFnQnNCLFFBQWhCLEVBQTBCRixJQUExQixDQUErQixlQUFPO0FBQUEsWUFDNUJHLElBRDRCLEdBQ25CLE1BQUtuQyxJQURjLENBQzVCbUMsSUFENEI7O0FBRXBDLFlBQU0zQixlQUFlNEIsS0FBS0MsS0FBTCxDQUFXdkIsSUFBSWQsSUFBSixDQUFTQSxJQUFwQixDQUFyQjtBQUNBZ0IsZ0JBQVFDLEdBQVIsQ0FBWWQsaUJBQU9tQyxrQkFBUCxDQUEwQjlCLFlBQTFCLENBQVo7QUFDQUwseUJBQU9vQyxNQUFQLENBQWMsY0FBZCxFQUE4Qi9CLFlBQTlCO0FBQ0EsY0FBS3NCLE9BQUwsQ0FBYTtBQUNYdkIsd0JBQWNKLGlCQUFPbUMsa0JBQVAsQ0FBMEI5QixZQUExQixDQURIO0FBRVhGLHdCQUFjNEIsUUFGSDtBQUdYMUIsb0NBSFc7QUFJWFAscUJBQVc7QUFKQSxTQUFiO0FBTUQsT0FYRDtBQVlELEtBYkQ7QUFjRCxHO0FBQ0RVLFUsc0JBQVk7QUFDVmdCLE9BQUdhLFlBQUgsQ0FBZ0I7QUFDZFgsV0FBSyw4Q0FEUztBQUVkWSxlQUFTLGlCQUFVM0IsR0FBVixFQUFlO0FBQ3RCLFlBQUlBLElBQUk0QixVQUFKLEtBQW1CLEdBQXZCLEVBQTRCO0FBQzFCdkMsMkJBQU9vQyxNQUFQLENBQWMsY0FBZCxFQUE4QnpCLElBQUk2QixZQUFsQztBQUNEO0FBQ0Y7QUFOYSxLQUFoQjtBQVFBaEIsT0FBR2EsWUFBSCxDQUFnQjtBQUNkWCxXQUFLLHNEQURTO0FBRWRZLGVBQVMsaUJBQVUzQixHQUFWLEVBQWU7QUFDdEIsWUFBSUEsSUFBSTRCLFVBQUosS0FBbUIsR0FBdkIsRUFBNEI7QUFDMUJ2QywyQkFBT29DLE1BQVAsQ0FBYyxzQkFBZCxFQUFzQ3pCLElBQUk2QixZQUExQztBQUNEO0FBQ0Y7QUFOYSxLQUFoQjtBQVFBaEIsT0FBR2EsWUFBSCxDQUFnQjtBQUNkWCxXQUFLLHlDQURTO0FBRWRZLGVBQVMsaUJBQVUzQixHQUFWLEVBQWU7QUFDdEIsWUFBSUEsSUFBSTRCLFVBQUosS0FBbUIsR0FBdkIsRUFBNEI7QUFDMUJ2QywyQkFBT29DLE1BQVAsQ0FBYyxjQUFkLEVBQThCekIsSUFBSTZCLFlBQWxDO0FBQ0Q7QUFDRjtBQU5hLEtBQWhCO0FBUUQiLCJmaWxlIjoiaW5kZXgud3hwIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgSE9TVCB9IGZyb20gXCIuLi8uLi9jb21tb24vY29uZmlnXCI7XG5pbXBvcnQgeyBnZXREYXRhIH0gZnJvbSBcIi4uLy4uL2NvbW1vbi9hcGkvY29tbW9uXCI7IC8v6ICB5o6l5Y+jXG5pbXBvcnQgQnVzIGZyb20gXCIuLi8uLi9tb2RlbHMvYXBpXCI7XG5pbXBvcnQgR2xvYmFsIGZyb20gXCIuLi8uLi9tb2RlbHMvZ2xvYmFsXCI7XG5cbmV4cG9ydCBkZWZhdWx0IHtcbiAgY29uZmlnOiB7XG4gICAgZGlzYWJsZVNjcm9sbDogdHJ1ZSxcbiAgICB1c2luZ0NvbXBvbmVudHM6IHtcbiAgICAgIFwibGF5b3V0LWhlYWRcIjogXCJsYXlvdXQvaGVhZFwiLFxuICAgICAgXCJsYXlvdXQtZm9vdFwiOiBcImxheW91dC9mb290XCIsXG4gICAgICBcInd4Yy1idXR0b25cIjogXCJAbWludWkvd3hjLWJ1dHRvblwiLFxuICAgICAgXCJ3eGMtaWNvblwiOiBcIkBtaW51aS93eGMtaWNvblwiLFxuICAgICAgXCJ3eGMtc2VhcmNoXCI6IFwiQG1pbnVpL3d4Yy1zZWFyY2hcIixcbiAgICAgIFwiaW5kZXgtY2FyZFwiOiBcIi4uL2NvbXBvbmVudHMvaW5kZXgtY2FyZFwiLFxuICAgICAgXCJ3eGMtbG9hZG1vcmVcIjogXCJAbWludWkvd3hjLWxvYWRtb3JlXCIsXG4gICAgICBcInd4Yy1sb2FkaW5nXCI6IFwiQG1pbnVpL3d4Yy1sb2FkaW5nXCJcbiAgICB9XG4gIH0sXG4gIGRhdGE6IHtcbiAgICBpc0xvYWRpbmc6IHRydWUsXG4gICAgaXNTaG93OiBHbG9iYWwuZ2V0SGVhZE5vdGljZVN0YXR1cygpLFxuICAgIHN0eWxlOiBcImJhY2tncm91bmQ6ICNmZmY7Ym9yZGVyLXJhZGl1czogNjZycHg7Y29sb3I6ICMwMDA7XCIsXG4gICAgbG9jYXRpb25JbmZvOiB7fSxcbiAgICBuZWFyTGluZUxpc3Q6IFtdLFxuICAgIG5lYXJMaW5lSW5mbzogR2xvYmFsLmdldFZhbCgnTkVBUkxJTkVJTkZPJylcbiAgfSxcbiAgLyoqIG5vdGU6IOWcqCB3eHAg5paH5Lu25oiW6ICF6aG16Z2i5paH5Lu25Lit6K+35Y675o6JIG1ldGhvZHMg5YyF6KOFICovXG4gIG9uTG9hZCAoKSB7XG4gICAgdGhpcy5zYXZlRGF0YSgpO1xuICAgIHRoaXMuZ2V0TmVhckxpbmUoKTtcbiAgfSxcbiAgb25TaGFyZUFwcE1lc3NhZ2UgKHJlcykge1xuICAgIGlmIChyZXMuZnJvbSA9PT0gJ2J1dHRvbicpIHtcbiAgICAgIC8vIOadpeiHqumhtemdouWGhei9rOWPkeaMiemSrlxuICAgICAgY29uc29sZS5sb2cocmVzLnRhcmdldClcbiAgICB9XG4gICAgcmV0dXJuIHtcbiAgICAgIHRpdGxlOiAn6Iif5bGx5YWs5Lqk5a6e5pe25p+l6K+iJyxcbiAgICAgIHBhdGg6ICdwYWdlcy9ob21lL2luZGV4J1xuICAgIH1cbiAgfSxcbiAgb25DbGljazogZnVuY3Rpb24gKGUpIHtcbiAgICBjb25zb2xlLmxvZyhcbiAgICAgIGBDb21wb25lbnRJZDoke2UuZGV0YWlsLmNvbXBvbmVudElkfSx5b3Ugc2VsZWN0ZWQ6JHtlLmRldGFpbC5rZXl9YFxuICAgICk7XG4gIH0sXG4gIGhhbmRsZVNob3dTZWFyY2hQYWdlICgpIHtcbiAgICB3eC5uYXZpZ2F0ZVRvKHtcbiAgICAgIHVybDogYC9wYWdlcy9zZWFyY2gvaW5kZXhgXG4gICAgfSlcbiAgfSxcbiAgZ2V0TmVhckxpbmUgKCkge1xuICAgIHRoaXMuc2V0RGF0YSh7XG4gICAgICBpc0xvYWRpbmc6IHRydWVcbiAgICB9KTtcbiAgICBHbG9iYWwuc2V0TG9jYXRpb24oKS50aGVuKGxvY2F0aW9uID0+IHtcbiAgICAgIEJ1cy5nZXROZWFyTGluZShsb2NhdGlvbikudGhlbihyZXMgPT4ge1xuICAgICAgICBjb25zdCB7IHRhYnMgfSA9IHRoaXMuZGF0YTtcbiAgICAgICAgY29uc3QgbmVhckxpbmVJbmZvID0gSlNPTi5wYXJzZShyZXMuZGF0YS5kYXRhKVxuICAgICAgICBjb25zb2xlLmxvZyhHbG9iYWwubWFwQ2l0eUxvY3Rpb25fbmV3KG5lYXJMaW5lSW5mbykpXG4gICAgICAgIEdsb2JhbC5zZXRWYWwoJ05FQVJMSU5FSU5GTycsIG5lYXJMaW5lSW5mbylcbiAgICAgICAgdGhpcy5zZXREYXRhKHtcbiAgICAgICAgICBuZWFyTGluZUxpc3Q6IEdsb2JhbC5tYXBDaXR5TG9jdGlvbl9uZXcobmVhckxpbmVJbmZvKSxcbiAgICAgICAgICBsb2NhdGlvbkluZm86IGxvY2F0aW9uLFxuICAgICAgICAgIG5lYXJMaW5lSW5mbyxcbiAgICAgICAgICBpc0xvYWRpbmc6IGZhbHNlXG4gICAgICAgIH0pO1xuICAgICAgfSlcbiAgICB9KVxuICB9LFxuICBzYXZlRGF0YSAoKSB7XG4gICAgd3guZG93bmxvYWRGaWxlKHtcbiAgICAgIHVybDogJ2h0dHBzOi8vYXBpLmxpbW9ucGxheWVyLmNuL2xvY2F0aW9uXzcycHgucG5nJyxcbiAgICAgIHN1Y2Nlc3M6IGZ1bmN0aW9uIChyZXMpIHtcbiAgICAgICAgaWYgKHJlcy5zdGF0dXNDb2RlID09PSAyMDApIHtcbiAgICAgICAgICBHbG9iYWwuc2V0VmFsKCdsb2NhdGlvbi1wbmcnLCByZXMudGVtcEZpbGVQYXRoKVxuICAgICAgICB9XG4gICAgICB9XG4gICAgfSlcbiAgICB3eC5kb3dubG9hZEZpbGUoe1xuICAgICAgdXJsOiAnaHR0cHM6Ly9hcGkubGltb25wbGF5ZXIuY24vbG9jYXRpb25fY29udHJvbF83MnB4LnBuZycsXG4gICAgICBzdWNjZXNzOiBmdW5jdGlvbiAocmVzKSB7XG4gICAgICAgIGlmIChyZXMuc3RhdHVzQ29kZSA9PT0gMjAwKSB7XG4gICAgICAgICAgR2xvYmFsLnNldFZhbCgnbG9jYXRpb24tY29udHJvbC1wbmcnLCByZXMudGVtcEZpbGVQYXRoKVxuICAgICAgICB9XG4gICAgICB9XG4gICAgfSlcbiAgICB3eC5kb3dubG9hZEZpbGUoe1xuICAgICAgdXJsOiAnaHR0cHM6Ly9hcGkubGltb25wbGF5ZXIuY24vYnVzX2ljb24ucG5nJyxcbiAgICAgIHN1Y2Nlc3M6IGZ1bmN0aW9uIChyZXMpIHtcbiAgICAgICAgaWYgKHJlcy5zdGF0dXNDb2RlID09PSAyMDApIHtcbiAgICAgICAgICBHbG9iYWwuc2V0VmFsKCdidXMtaWNvbi1wbmcnLCByZXMudGVtcEZpbGVQYXRoKVxuICAgICAgICB9XG4gICAgICB9XG4gICAgfSlcbiAgfVxufTsiXX0=