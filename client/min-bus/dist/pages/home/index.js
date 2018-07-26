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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImluZGV4Lnd4cCJdLCJuYW1lcyI6WyJkYXRhIiwiJGxvYWRpbmciLCJpc1Nob3ciLCJHbG9iYWwiLCJnZXRIZWFkTm90aWNlU3RhdHVzIiwic3R5bGUiLCJsb2NhdGlvbkluZm8iLCJuZWFyTGluZUluZm8iLCJ0YWJzIiwidGl0bGUiLCJjb250ZW50Iiwib25Mb2FkIiwic2F2ZURhdGEiLCJnZXROZWFyTGluZSIsIm9uU2hvdyIsIm9uQ2xpY2siLCJlIiwiY29uc29sZSIsImxvZyIsImRldGFpbCIsImNvbXBvbmVudElkIiwia2V5IiwiaGFuZGxlU2hvd1NlYXJjaFBhZ2UiLCJ3eCIsIm5hdmlnYXRlVG8iLCJ1cmwiLCJzZXREYXRhIiwic2V0TG9jYXRpb24iLCJ0aGVuIiwiQnVzIiwibG9jYXRpb24iLCJKU09OIiwicGFyc2UiLCJyZXMiLCJzbGljZSIsImRvd25sb2FkRmlsZSIsInN1Y2Nlc3MiLCJzdGF0dXNDb2RlIiwic2V0VmFsIiwidGVtcEZpbGVQYXRoIl0sIm1hcHBpbmdzIjoiOzs7Ozs7QUFBQTs7QUFDQTs7QUFDQTs7OztBQUNBOzs7Ozs7QUFGbUQ7O0FBb0JqREEsUUFBTTtBQUFBO0FBQUE7QUFBQTs7QUFDSkMsY0FBVTtBQUNSQyxjQUFRO0FBREEsS0FETjtBQUlKQSxZQUFRQyxpQkFBT0MsbUJBQVAsRUFKSjtBQUtKQyxXQUFPLG9EQUxIO0FBTUpDLGtCQUFjLEVBTlY7QUFPSkMsa0JBQWMsRUFQVjtBQVFKQyxVQUFNLENBQ0osRUFBRUMsT0FBTyxJQUFULEVBQWVDLFNBQVMsRUFBeEIsRUFESSxFQUVKLEVBQUVELE9BQU8sSUFBVCxFQUFlQyxTQUFTLEVBQXhCLEVBRkksRUFHSixFQUFFRCxPQUFPLElBQVQsRUFBZUMsU0FBUyxFQUF4QixFQUhJO0FBUkYsRztBQWNOO0FBQ0FDLFEsb0JBQVU7QUFDUixTQUFLQyxRQUFMO0FBQ0EsU0FBS0MsV0FBTDtBQUNELEc7QUFDREMsUSxvQkFBUztBQUNQLFNBQUtELFdBQUw7QUFDRCxHOztBQUNERSxXQUFTLGlCQUFTQyxDQUFULEVBQVk7QUFDbkJDLFlBQVFDLEdBQVIsa0JBQ2lCRixFQUFFRyxNQUFGLENBQVNDLFdBRDFCLHNCQUNzREosRUFBRUcsTUFBRixDQUFTRSxHQUQvRDtBQUdELEc7QUFDREMsc0Isa0NBQXVCO0FBQ3JCQyxPQUFHQyxVQUFILENBQWM7QUFDWkM7QUFEWSxLQUFkO0FBR0QsRztBQUNEWixhLHlCQUFjO0FBQUE7O0FBQ1osU0FBS2EsT0FBTCxDQUFhO0FBQ1h6QixnQkFBVTtBQUNSQyxnQkFBUTtBQURBO0FBREMsS0FBYjtBQUtBQyxxQkFBT3dCLFdBQVAsR0FBcUJDLElBQXJCLENBQTBCLG9CQUFZO0FBQ3BDQyxvQkFBSWhCLFdBQUosQ0FBZ0JpQixRQUFoQixFQUEwQkYsSUFBMUIsQ0FBK0IsZUFBTztBQUFBLFlBQzVCcEIsSUFENEIsR0FDbkIsTUFBS1IsSUFEYyxDQUM1QlEsSUFENEI7O0FBRXBDLFlBQU1ELGVBQWV3QixLQUFLQyxLQUFMLENBQVdDLElBQUlqQyxJQUFKLENBQVNBLElBQXBCLENBQXJCO0FBQ0FRLGFBQUssQ0FBTCxFQUFRRSxPQUFSLEdBQWtCSCxhQUFhMkIsS0FBYixDQUFtQixDQUFuQixFQUFzQixFQUF0QixDQUFsQjtBQUNBLGNBQUtSLE9BQUwsQ0FBYTtBQUNYcEIsd0JBQWMyQixHQURIO0FBRVgxQixvQ0FGVztBQUdYQyxvQkFIVztBQUlYUCxvQkFBVTtBQUNSQyxvQkFBUTtBQURBO0FBSkMsU0FBYjtBQVFELE9BWkQ7QUFhRCxLQWREO0FBZUQsRztBQUNEVSxVLHNCQUFZO0FBQ1ZXLE9BQUdZLFlBQUgsQ0FBZ0I7QUFDZFYsV0FBSyw4Q0FEUztBQUVkVyxlQUFTLGlCQUFTSCxHQUFULEVBQWM7QUFDckIsWUFBSUEsSUFBSUksVUFBSixLQUFtQixHQUF2QixFQUE0QjtBQUMxQmxDLDJCQUFPbUMsTUFBUCxDQUFjLGNBQWQsRUFBOEJMLElBQUlNLFlBQWxDO0FBQ0Q7QUFDRjtBQU5hLEtBQWhCO0FBUUFoQixPQUFHWSxZQUFILENBQWdCO0FBQ2RWLFdBQUssc0RBRFM7QUFFZFcsZUFBUyxpQkFBU0gsR0FBVCxFQUFjO0FBQ3JCLFlBQUlBLElBQUlJLFVBQUosS0FBbUIsR0FBdkIsRUFBNEI7QUFDMUJsQywyQkFBT21DLE1BQVAsQ0FBYyxzQkFBZCxFQUFzQ0wsSUFBSU0sWUFBMUM7QUFDRDtBQUNGO0FBTmEsS0FBaEI7QUFRQWhCLE9BQUdZLFlBQUgsQ0FBZ0I7QUFDZFYsV0FBSyx5Q0FEUztBQUVkVyxlQUFTLGlCQUFTSCxHQUFULEVBQWM7QUFDckIsWUFBSUEsSUFBSUksVUFBSixLQUFtQixHQUF2QixFQUE0QjtBQUMxQmxDLDJCQUFPbUMsTUFBUCxDQUFjLGNBQWQsRUFBOEJMLElBQUlNLFlBQWxDO0FBQ0Q7QUFDRjtBQU5hLEtBQWhCO0FBUUQiLCJmaWxlIjoiaW5kZXgud3hwIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgSE9TVCB9IGZyb20gXCIuLi8uLi9jb21tb24vY29uZmlnXCI7XHJcbmltcG9ydCB7IGdldERhdGEgfSBmcm9tIFwiLi4vLi4vY29tbW9uL2FwaS9jb21tb25cIjsgLy/ogIHmjqXlj6NcclxuaW1wb3J0IEJ1cyBmcm9tIFwiLi4vLi4vbW9kZWxzL2FwaVwiO1xyXG5pbXBvcnQgR2xvYmFsIGZyb20gXCIuLi8uLi9tb2RlbHMvZ2xvYmFsXCI7XHJcblxyXG5leHBvcnQgZGVmYXVsdCB7XHJcbiAgY29uZmlnOiB7XHJcbiAgICBkaXNhYmxlU2Nyb2xsOiB0cnVlLFxyXG4gICAgdXNpbmdDb21wb25lbnRzOiB7XHJcbiAgICAgIFwibGF5b3V0LWhlYWRcIjogXCJsYXlvdXQvaGVhZFwiLFxyXG4gICAgICBcImxheW91dC1mb290XCI6IFwibGF5b3V0L2Zvb3RcIixcclxuICAgICAgXCJ3eGMtYnV0dG9uXCI6IFwiQG1pbnVpL3d4Yy1idXR0b25cIixcclxuICAgICAgXCJ3eGMtaWNvblwiOiBcIkBtaW51aS93eGMtaWNvblwiLFxyXG4gICAgICBcInd4Yy1zZWFyY2hcIjogXCJAbWludWkvd3hjLXNlYXJjaFwiLFxyXG4gICAgICBcImluZGV4LWNhcmRcIjogXCIuLi9jb21wb25lbnRzL2luZGV4LWNhcmRcIixcclxuICAgICAgXCJ3eGMtdGFiXCI6IFwiQG1pbnVpL3d4Yy10YWJcIixcclxuICAgICAgXCJ3eGMtdGFiLXBhbmVsXCI6IFwiQG1pbnVpL3d4Yy10YWIvcGFuZWxcIixcclxuICAgICAgXCJ3eGMtbG9hZG1vcmVcIjogXCJAbWludWkvd3hjLWxvYWRtb3JlXCIsXHJcbiAgICAgIFwid3hjLWxvYWRpbmdcIjogXCJAbWludWkvd3hjLWxvYWRpbmdcIlxyXG4gICAgfVxyXG4gIH0sXHJcbiAgZGF0YToge1xyXG4gICAgJGxvYWRpbmc6IHtcclxuICAgICAgaXNTaG93OiBmYWxzZVxyXG4gICAgfSxcclxuICAgIGlzU2hvdzogR2xvYmFsLmdldEhlYWROb3RpY2VTdGF0dXMoKSxcclxuICAgIHN0eWxlOiBcImJhY2tncm91bmQ6ICNmZmY7Ym9yZGVyLXJhZGl1czogNjZycHg7Y29sb3I6ICMwMDA7XCIsXHJcbiAgICBsb2NhdGlvbkluZm86IHt9LFxyXG4gICAgbmVhckxpbmVJbmZvOiBbXSxcclxuICAgIHRhYnM6IFtcclxuICAgICAgeyB0aXRsZTogXCLmjqjojZBcIiwgY29udGVudDogXCJcIiB9LFxyXG4gICAgICB7IHRpdGxlOiBcIuaUtuiXj1wiLCBjb250ZW50OiBcIlwiIH0sXHJcbiAgICAgIHsgdGl0bGU6IFwi5Y6G5Y+yXCIsIGNvbnRlbnQ6IFwiXCIgfVxyXG4gICAgXVxyXG4gIH0sXHJcbiAgLyoqIG5vdGU6IOWcqCB3eHAg5paH5Lu25oiW6ICF6aG16Z2i5paH5Lu25Lit6K+35Y675o6JIG1ldGhvZHMg5YyF6KOFICovXHJcbiAgb25Mb2FkICgpIHtcclxuICAgIHRoaXMuc2F2ZURhdGEoKTtcclxuICAgIHRoaXMuZ2V0TmVhckxpbmUoKTtcclxuICB9LFxyXG4gIG9uU2hvdygpIHtcclxuICAgIHRoaXMuZ2V0TmVhckxpbmUoKTtcclxuICB9LFxyXG4gIG9uQ2xpY2s6IGZ1bmN0aW9uKGUpIHtcclxuICAgIGNvbnNvbGUubG9nKFxyXG4gICAgICBgQ29tcG9uZW50SWQ6JHtlLmRldGFpbC5jb21wb25lbnRJZH0seW91IHNlbGVjdGVkOiR7ZS5kZXRhaWwua2V5fWBcclxuICAgICk7XHJcbiAgfSxcclxuICBoYW5kbGVTaG93U2VhcmNoUGFnZSgpIHtcclxuICAgIHd4Lm5hdmlnYXRlVG8oe1xyXG4gICAgICB1cmw6IGAvcGFnZXMvc2VhcmNoL2luZGV4YFxyXG4gICAgfSlcclxuICB9LFxyXG4gIGdldE5lYXJMaW5lKCkge1xyXG4gICAgdGhpcy5zZXREYXRhKHtcclxuICAgICAgJGxvYWRpbmc6IHtcclxuICAgICAgICBpc1Nob3c6IHRydWVcclxuICAgICAgfVxyXG4gICAgfSk7XHJcbiAgICBHbG9iYWwuc2V0TG9jYXRpb24oKS50aGVuKGxvY2F0aW9uID0+IHtcclxuICAgICAgQnVzLmdldE5lYXJMaW5lKGxvY2F0aW9uKS50aGVuKHJlcyA9PiB7XHJcbiAgICAgICAgY29uc3QgeyB0YWJzIH0gPSB0aGlzLmRhdGE7XHJcbiAgICAgICAgY29uc3QgbmVhckxpbmVJbmZvID0gSlNPTi5wYXJzZShyZXMuZGF0YS5kYXRhKTtcclxuICAgICAgICB0YWJzWzBdLmNvbnRlbnQgPSBuZWFyTGluZUluZm8uc2xpY2UoMCwgMTApO1xyXG4gICAgICAgIHRoaXMuc2V0RGF0YSh7XHJcbiAgICAgICAgICBsb2NhdGlvbkluZm86IHJlcyxcclxuICAgICAgICAgIG5lYXJMaW5lSW5mbyxcclxuICAgICAgICAgIHRhYnMsXHJcbiAgICAgICAgICAkbG9hZGluZzoge1xyXG4gICAgICAgICAgICBpc1Nob3c6IGZhbHNlXHJcbiAgICAgICAgICB9XHJcbiAgICAgICAgfSk7XHJcbiAgICAgIH0pXHJcbiAgICB9KVxyXG4gIH0sXHJcbiAgc2F2ZURhdGEgKCkge1xyXG4gICAgd3guZG93bmxvYWRGaWxlKHtcclxuICAgICAgdXJsOiAnaHR0cHM6Ly9hcGkubGltb25wbGF5ZXIuY24vbG9jYXRpb25fNzJweC5wbmcnLFxyXG4gICAgICBzdWNjZXNzOiBmdW5jdGlvbihyZXMpIHtcclxuICAgICAgICBpZiAocmVzLnN0YXR1c0NvZGUgPT09IDIwMCkge1xyXG4gICAgICAgICAgR2xvYmFsLnNldFZhbCgnbG9jYXRpb24tcG5nJywgcmVzLnRlbXBGaWxlUGF0aClcclxuICAgICAgICB9XHJcbiAgICAgIH1cclxuICAgIH0pXHJcbiAgICB3eC5kb3dubG9hZEZpbGUoe1xyXG4gICAgICB1cmw6ICdodHRwczovL2FwaS5saW1vbnBsYXllci5jbi9sb2NhdGlvbl9jb250cm9sXzcycHgucG5nJyxcclxuICAgICAgc3VjY2VzczogZnVuY3Rpb24ocmVzKSB7XHJcbiAgICAgICAgaWYgKHJlcy5zdGF0dXNDb2RlID09PSAyMDApIHtcclxuICAgICAgICAgIEdsb2JhbC5zZXRWYWwoJ2xvY2F0aW9uLWNvbnRyb2wtcG5nJywgcmVzLnRlbXBGaWxlUGF0aClcclxuICAgICAgICB9XHJcbiAgICAgIH1cclxuICAgIH0pXHJcbiAgICB3eC5kb3dubG9hZEZpbGUoe1xyXG4gICAgICB1cmw6ICdodHRwczovL2FwaS5saW1vbnBsYXllci5jbi9idXNfaWNvbi5wbmcnLFxyXG4gICAgICBzdWNjZXNzOiBmdW5jdGlvbihyZXMpIHtcclxuICAgICAgICBpZiAocmVzLnN0YXR1c0NvZGUgPT09IDIwMCkge1xyXG4gICAgICAgICAgR2xvYmFsLnNldFZhbCgnYnVzLWljb24tcG5nJywgcmVzLnRlbXBGaWxlUGF0aClcclxuICAgICAgICB9XHJcbiAgICAgIH1cclxuICAgIH0pXHJcbiAgfVxyXG59OyJdfQ==