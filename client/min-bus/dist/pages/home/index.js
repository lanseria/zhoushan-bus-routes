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
      isShow: true
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImluZGV4Lnd4cCJdLCJuYW1lcyI6WyJkYXRhIiwiJGxvYWRpbmciLCJpc1Nob3ciLCJHbG9iYWwiLCJnZXRIZWFkTm90aWNlU3RhdHVzIiwic3R5bGUiLCJsb2NhdGlvbkluZm8iLCJuZWFyTGluZUluZm8iLCJ0YWJzIiwidGl0bGUiLCJjb250ZW50Iiwib25Mb2FkIiwic2F2ZURhdGEiLCJnZXROZWFyTGluZSIsIm9uU2hvdyIsIm9uQ2xpY2siLCJlIiwiY29uc29sZSIsImxvZyIsImRldGFpbCIsImNvbXBvbmVudElkIiwia2V5IiwiaGFuZGxlU2hvd1NlYXJjaFBhZ2UiLCJ3eCIsIm5hdmlnYXRlVG8iLCJ1cmwiLCJzZXREYXRhIiwic2V0TG9jYXRpb24iLCJ0aGVuIiwiQnVzIiwibG9jYXRpb24iLCJKU09OIiwicGFyc2UiLCJyZXMiLCJzbGljZSIsImRvd25sb2FkRmlsZSIsInN1Y2Nlc3MiLCJzdGF0dXNDb2RlIiwic2V0VmFsIiwidGVtcEZpbGVQYXRoIl0sIm1hcHBpbmdzIjoiOzs7Ozs7QUFBQTs7QUFDQTs7QUFDQTs7OztBQUNBOzs7Ozs7QUFGbUQ7O0FBb0JqREEsUUFBTTtBQUFBO0FBQUE7QUFBQTs7QUFDSkMsY0FBVTtBQUNSQyxjQUFRO0FBREEsS0FETjtBQUlKQSxZQUFRQyxpQkFBT0MsbUJBQVAsRUFKSjtBQUtKQyxXQUFPLG9EQUxIO0FBTUpDLGtCQUFjLEVBTlY7QUFPSkMsa0JBQWMsRUFQVjtBQVFKQyxVQUFNLENBQ0osRUFBRUMsT0FBTyxJQUFULEVBQWVDLFNBQVMsRUFBeEIsRUFESSxFQUVKLEVBQUVELE9BQU8sSUFBVCxFQUFlQyxTQUFTLEVBQXhCLEVBRkksRUFHSixFQUFFRCxPQUFPLElBQVQsRUFBZUMsU0FBUyxFQUF4QixFQUhJO0FBUkYsRztBQWNOO0FBQ0FDLFEsb0JBQVU7QUFDUixTQUFLQyxRQUFMO0FBQ0EsU0FBS0MsV0FBTDtBQUNELEc7QUFDREMsUSxvQkFBUztBQUNQLFNBQUtELFdBQUw7QUFDRCxHOztBQUNERSxXQUFTLGlCQUFTQyxDQUFULEVBQVk7QUFDbkJDLFlBQVFDLEdBQVIsa0JBQ2lCRixFQUFFRyxNQUFGLENBQVNDLFdBRDFCLHNCQUNzREosRUFBRUcsTUFBRixDQUFTRSxHQUQvRDtBQUdELEc7QUFDREMsc0Isa0NBQXVCO0FBQ3JCQyxPQUFHQyxVQUFILENBQWM7QUFDWkM7QUFEWSxLQUFkO0FBR0QsRztBQUNEWixhLHlCQUFjO0FBQUE7O0FBQ1osU0FBS2EsT0FBTCxDQUFhO0FBQ1h6QixnQkFBVTtBQUNSQyxnQkFBUTtBQURBO0FBREMsS0FBYjtBQUtBQyxxQkFBT3dCLFdBQVAsR0FBcUJDLElBQXJCLENBQTBCLG9CQUFZO0FBQ3BDQyxvQkFBSWhCLFdBQUosQ0FBZ0JpQixRQUFoQixFQUEwQkYsSUFBMUIsQ0FBK0IsZUFBTztBQUFBLFlBQzVCcEIsSUFENEIsR0FDbkIsTUFBS1IsSUFEYyxDQUM1QlEsSUFENEI7O0FBRXBDLFlBQU1ELGVBQWV3QixLQUFLQyxLQUFMLENBQVdDLElBQUlqQyxJQUFKLENBQVNBLElBQXBCLENBQXJCO0FBQ0FRLGFBQUssQ0FBTCxFQUFRRSxPQUFSLEdBQWtCSCxhQUFhMkIsS0FBYixDQUFtQixDQUFuQixFQUFzQixFQUF0QixDQUFsQjtBQUNBLGNBQUtSLE9BQUwsQ0FBYTtBQUNYcEIsd0JBQWMyQixHQURIO0FBRVgxQixvQ0FGVztBQUdYQyxvQkFIVztBQUlYUCxvQkFBVTtBQUNSQyxvQkFBUTtBQURBO0FBSkMsU0FBYjtBQVFELE9BWkQ7QUFhRCxLQWREO0FBZUQsRztBQUNEVSxVLHNCQUFZO0FBQ1ZXLE9BQUdZLFlBQUgsQ0FBZ0I7QUFDZFYsV0FBSyw4Q0FEUztBQUVkVyxlQUFTLGlCQUFTSCxHQUFULEVBQWM7QUFDckIsWUFBSUEsSUFBSUksVUFBSixLQUFtQixHQUF2QixFQUE0QjtBQUMxQmxDLDJCQUFPbUMsTUFBUCxDQUFjLGNBQWQsRUFBOEJMLElBQUlNLFlBQWxDO0FBQ0Q7QUFDRjtBQU5hLEtBQWhCO0FBUUFoQixPQUFHWSxZQUFILENBQWdCO0FBQ2RWLFdBQUssc0RBRFM7QUFFZFcsZUFBUyxpQkFBU0gsR0FBVCxFQUFjO0FBQ3JCLFlBQUlBLElBQUlJLFVBQUosS0FBbUIsR0FBdkIsRUFBNEI7QUFDMUJsQywyQkFBT21DLE1BQVAsQ0FBYyxzQkFBZCxFQUFzQ0wsSUFBSU0sWUFBMUM7QUFDRDtBQUNGO0FBTmEsS0FBaEI7QUFRQWhCLE9BQUdZLFlBQUgsQ0FBZ0I7QUFDZFYsV0FBSyx5Q0FEUztBQUVkVyxlQUFTLGlCQUFTSCxHQUFULEVBQWM7QUFDckIsWUFBSUEsSUFBSUksVUFBSixLQUFtQixHQUF2QixFQUE0QjtBQUMxQmxDLDJCQUFPbUMsTUFBUCxDQUFjLGNBQWQsRUFBOEJMLElBQUlNLFlBQWxDO0FBQ0Q7QUFDRjtBQU5hLEtBQWhCO0FBUUQiLCJmaWxlIjoiaW5kZXgud3hwIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgSE9TVCB9IGZyb20gXCIuLi8uLi9jb21tb24vY29uZmlnXCI7XG5pbXBvcnQgeyBnZXREYXRhIH0gZnJvbSBcIi4uLy4uL2NvbW1vbi9hcGkvY29tbW9uXCI7IC8v6ICB5o6l5Y+jXG5pbXBvcnQgQnVzIGZyb20gXCIuLi8uLi9tb2RlbHMvYXBpXCI7XG5pbXBvcnQgR2xvYmFsIGZyb20gXCIuLi8uLi9tb2RlbHMvZ2xvYmFsXCI7XG5cbmV4cG9ydCBkZWZhdWx0IHtcbiAgY29uZmlnOiB7XG4gICAgZGlzYWJsZVNjcm9sbDogdHJ1ZSxcbiAgICB1c2luZ0NvbXBvbmVudHM6IHtcbiAgICAgIFwibGF5b3V0LWhlYWRcIjogXCJsYXlvdXQvaGVhZFwiLFxuICAgICAgXCJsYXlvdXQtZm9vdFwiOiBcImxheW91dC9mb290XCIsXG4gICAgICBcInd4Yy1idXR0b25cIjogXCJAbWludWkvd3hjLWJ1dHRvblwiLFxuICAgICAgXCJ3eGMtaWNvblwiOiBcIkBtaW51aS93eGMtaWNvblwiLFxuICAgICAgXCJ3eGMtc2VhcmNoXCI6IFwiQG1pbnVpL3d4Yy1zZWFyY2hcIixcbiAgICAgIFwiaW5kZXgtY2FyZFwiOiBcIi4uL2NvbXBvbmVudHMvaW5kZXgtY2FyZFwiLFxuICAgICAgXCJ3eGMtdGFiXCI6IFwiQG1pbnVpL3d4Yy10YWJcIixcbiAgICAgIFwid3hjLXRhYi1wYW5lbFwiOiBcIkBtaW51aS93eGMtdGFiL3BhbmVsXCIsXG4gICAgICBcInd4Yy1sb2FkbW9yZVwiOiBcIkBtaW51aS93eGMtbG9hZG1vcmVcIixcbiAgICAgIFwid3hjLWxvYWRpbmdcIjogXCJAbWludWkvd3hjLWxvYWRpbmdcIlxuICAgIH1cbiAgfSxcbiAgZGF0YToge1xuICAgICRsb2FkaW5nOiB7XG4gICAgICBpc1Nob3c6IHRydWVcbiAgICB9LFxuICAgIGlzU2hvdzogR2xvYmFsLmdldEhlYWROb3RpY2VTdGF0dXMoKSxcbiAgICBzdHlsZTogXCJiYWNrZ3JvdW5kOiAjZmZmO2JvcmRlci1yYWRpdXM6IDY2cnB4O2NvbG9yOiAjMDAwO1wiLFxuICAgIGxvY2F0aW9uSW5mbzoge30sXG4gICAgbmVhckxpbmVJbmZvOiBbXSxcbiAgICB0YWJzOiBbXG4gICAgICB7IHRpdGxlOiBcIuaOqOiNkFwiLCBjb250ZW50OiBcIlwiIH0sXG4gICAgICB7IHRpdGxlOiBcIuaUtuiXj1wiLCBjb250ZW50OiBcIlwiIH0sXG4gICAgICB7IHRpdGxlOiBcIuWOhuWPslwiLCBjb250ZW50OiBcIlwiIH1cbiAgICBdXG4gIH0sXG4gIC8qKiBub3RlOiDlnKggd3hwIOaWh+S7tuaIluiAhemhtemdouaWh+S7tuS4reivt+WOu+aOiSBtZXRob2RzIOWMheijhSAqL1xuICBvbkxvYWQgKCkge1xuICAgIHRoaXMuc2F2ZURhdGEoKTtcbiAgICB0aGlzLmdldE5lYXJMaW5lKCk7XG4gIH0sXG4gIG9uU2hvdygpIHtcbiAgICB0aGlzLmdldE5lYXJMaW5lKCk7XG4gIH0sXG4gIG9uQ2xpY2s6IGZ1bmN0aW9uKGUpIHtcbiAgICBjb25zb2xlLmxvZyhcbiAgICAgIGBDb21wb25lbnRJZDoke2UuZGV0YWlsLmNvbXBvbmVudElkfSx5b3Ugc2VsZWN0ZWQ6JHtlLmRldGFpbC5rZXl9YFxuICAgICk7XG4gIH0sXG4gIGhhbmRsZVNob3dTZWFyY2hQYWdlKCkge1xuICAgIHd4Lm5hdmlnYXRlVG8oe1xuICAgICAgdXJsOiBgL3BhZ2VzL3NlYXJjaC9pbmRleGBcbiAgICB9KVxuICB9LFxuICBnZXROZWFyTGluZSgpIHtcbiAgICB0aGlzLnNldERhdGEoe1xuICAgICAgJGxvYWRpbmc6IHtcbiAgICAgICAgaXNTaG93OiB0cnVlXG4gICAgICB9XG4gICAgfSk7XG4gICAgR2xvYmFsLnNldExvY2F0aW9uKCkudGhlbihsb2NhdGlvbiA9PiB7XG4gICAgICBCdXMuZ2V0TmVhckxpbmUobG9jYXRpb24pLnRoZW4ocmVzID0+IHtcbiAgICAgICAgY29uc3QgeyB0YWJzIH0gPSB0aGlzLmRhdGE7XG4gICAgICAgIGNvbnN0IG5lYXJMaW5lSW5mbyA9IEpTT04ucGFyc2UocmVzLmRhdGEuZGF0YSk7XG4gICAgICAgIHRhYnNbMF0uY29udGVudCA9IG5lYXJMaW5lSW5mby5zbGljZSgwLCAxMCk7XG4gICAgICAgIHRoaXMuc2V0RGF0YSh7XG4gICAgICAgICAgbG9jYXRpb25JbmZvOiByZXMsXG4gICAgICAgICAgbmVhckxpbmVJbmZvLFxuICAgICAgICAgIHRhYnMsXG4gICAgICAgICAgJGxvYWRpbmc6IHtcbiAgICAgICAgICAgIGlzU2hvdzogZmFsc2VcbiAgICAgICAgICB9XG4gICAgICAgIH0pO1xuICAgICAgfSlcbiAgICB9KVxuICB9LFxuICBzYXZlRGF0YSAoKSB7XG4gICAgd3guZG93bmxvYWRGaWxlKHtcbiAgICAgIHVybDogJ2h0dHBzOi8vYXBpLmxpbW9ucGxheWVyLmNuL2xvY2F0aW9uXzcycHgucG5nJyxcbiAgICAgIHN1Y2Nlc3M6IGZ1bmN0aW9uKHJlcykge1xuICAgICAgICBpZiAocmVzLnN0YXR1c0NvZGUgPT09IDIwMCkge1xuICAgICAgICAgIEdsb2JhbC5zZXRWYWwoJ2xvY2F0aW9uLXBuZycsIHJlcy50ZW1wRmlsZVBhdGgpXG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9KVxuICAgIHd4LmRvd25sb2FkRmlsZSh7XG4gICAgICB1cmw6ICdodHRwczovL2FwaS5saW1vbnBsYXllci5jbi9sb2NhdGlvbl9jb250cm9sXzcycHgucG5nJyxcbiAgICAgIHN1Y2Nlc3M6IGZ1bmN0aW9uKHJlcykge1xuICAgICAgICBpZiAocmVzLnN0YXR1c0NvZGUgPT09IDIwMCkge1xuICAgICAgICAgIEdsb2JhbC5zZXRWYWwoJ2xvY2F0aW9uLWNvbnRyb2wtcG5nJywgcmVzLnRlbXBGaWxlUGF0aClcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH0pXG4gICAgd3guZG93bmxvYWRGaWxlKHtcbiAgICAgIHVybDogJ2h0dHBzOi8vYXBpLmxpbW9ucGxheWVyLmNuL2J1c19pY29uLnBuZycsXG4gICAgICBzdWNjZXNzOiBmdW5jdGlvbihyZXMpIHtcbiAgICAgICAgaWYgKHJlcy5zdGF0dXNDb2RlID09PSAyMDApIHtcbiAgICAgICAgICBHbG9iYWwuc2V0VmFsKCdidXMtaWNvbi1wbmcnLCByZXMudGVtcEZpbGVQYXRoKVxuICAgICAgICB9XG4gICAgICB9XG4gICAgfSlcbiAgfVxufTsiXX0=