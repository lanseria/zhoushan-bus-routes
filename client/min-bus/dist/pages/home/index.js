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
    nearLineInfo: _global2.default.getVal('NEARLINEINFO'),
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
        _global2.default.setVal('NEARLINEINFO', nearLineInfo);
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImluZGV4Lnd4cCJdLCJuYW1lcyI6WyJkYXRhIiwiJGxvYWRpbmciLCJpc1Nob3ciLCJHbG9iYWwiLCJnZXRIZWFkTm90aWNlU3RhdHVzIiwic3R5bGUiLCJsb2NhdGlvbkluZm8iLCJuZWFyTGluZUluZm8iLCJnZXRWYWwiLCJ0YWJzIiwidGl0bGUiLCJjb250ZW50Iiwib25Mb2FkIiwic2F2ZURhdGEiLCJnZXROZWFyTGluZSIsIm9uU2hvdyIsIm9uQ2xpY2siLCJlIiwiY29uc29sZSIsImxvZyIsImRldGFpbCIsImNvbXBvbmVudElkIiwia2V5IiwiaGFuZGxlU2hvd1NlYXJjaFBhZ2UiLCJ3eCIsIm5hdmlnYXRlVG8iLCJ1cmwiLCJzZXREYXRhIiwic2V0TG9jYXRpb24iLCJ0aGVuIiwiQnVzIiwibG9jYXRpb24iLCJKU09OIiwicGFyc2UiLCJyZXMiLCJzZXRWYWwiLCJzbGljZSIsImRvd25sb2FkRmlsZSIsInN1Y2Nlc3MiLCJzdGF0dXNDb2RlIiwidGVtcEZpbGVQYXRoIl0sIm1hcHBpbmdzIjoiOzs7Ozs7QUFBQTs7QUFDQTs7QUFDQTs7OztBQUNBOzs7Ozs7QUFGbUQ7O0FBb0JqREEsUUFBTTtBQUFBO0FBQUE7QUFBQTs7QUFDSkMsY0FBVTtBQUNSQyxjQUFRO0FBREEsS0FETjtBQUlKQSxZQUFRQyxpQkFBT0MsbUJBQVAsRUFKSjtBQUtKQyxXQUFPLG9EQUxIO0FBTUpDLGtCQUFjLEVBTlY7QUFPSkMsa0JBQWNKLGlCQUFPSyxNQUFQLENBQWMsY0FBZCxDQVBWO0FBUUpDLFVBQU0sQ0FDSixFQUFFQyxPQUFPLElBQVQsRUFBZUMsU0FBUyxFQUF4QixFQURJLEVBRUosRUFBRUQsT0FBTyxJQUFULEVBQWVDLFNBQVMsRUFBeEIsRUFGSSxFQUdKLEVBQUVELE9BQU8sSUFBVCxFQUFlQyxTQUFTLEVBQXhCLEVBSEk7QUFSRixHO0FBY047QUFDQUMsUSxvQkFBVTtBQUNSLFNBQUtDLFFBQUw7QUFDQSxTQUFLQyxXQUFMO0FBQ0QsRztBQUNEQyxRLG9CQUFTO0FBQ1AsU0FBS0QsV0FBTDtBQUNELEc7O0FBQ0RFLFdBQVMsaUJBQVNDLENBQVQsRUFBWTtBQUNuQkMsWUFBUUMsR0FBUixrQkFDaUJGLEVBQUVHLE1BQUYsQ0FBU0MsV0FEMUIsc0JBQ3NESixFQUFFRyxNQUFGLENBQVNFLEdBRC9EO0FBR0QsRztBQUNEQyxzQixrQ0FBdUI7QUFDckJDLE9BQUdDLFVBQUgsQ0FBYztBQUNaQztBQURZLEtBQWQ7QUFHRCxHO0FBQ0RaLGEseUJBQWM7QUFBQTs7QUFDWixTQUFLYSxPQUFMLENBQWE7QUFDWDFCLGdCQUFVO0FBQ1JDLGdCQUFRO0FBREE7QUFEQyxLQUFiO0FBS0FDLHFCQUFPeUIsV0FBUCxHQUFxQkMsSUFBckIsQ0FBMEIsb0JBQVk7QUFDcENDLG9CQUFJaEIsV0FBSixDQUFnQmlCLFFBQWhCLEVBQTBCRixJQUExQixDQUErQixlQUFPO0FBQUEsWUFDNUJwQixJQUQ0QixHQUNuQixNQUFLVCxJQURjLENBQzVCUyxJQUQ0Qjs7QUFFcEMsWUFBTUYsZUFBZXlCLEtBQUtDLEtBQUwsQ0FBV0MsSUFBSWxDLElBQUosQ0FBU0EsSUFBcEIsQ0FBckI7QUFDQUcseUJBQU9nQyxNQUFQLENBQWMsY0FBZCxFQUE4QjVCLFlBQTlCO0FBQ0FFLGFBQUssQ0FBTCxFQUFRRSxPQUFSLEdBQWtCSixhQUFhNkIsS0FBYixDQUFtQixDQUFuQixFQUFzQixFQUF0QixDQUFsQjtBQUNBLGNBQUtULE9BQUwsQ0FBYTtBQUNYckIsd0JBQWM0QixHQURIO0FBRVgzQixvQ0FGVztBQUdYRSxvQkFIVztBQUlYUixvQkFBVTtBQUNSQyxvQkFBUTtBQURBO0FBSkMsU0FBYjtBQVFELE9BYkQ7QUFjRCxLQWZEO0FBZ0JELEc7QUFDRFcsVSxzQkFBWTtBQUNWVyxPQUFHYSxZQUFILENBQWdCO0FBQ2RYLFdBQUssOENBRFM7QUFFZFksZUFBUyxpQkFBU0osR0FBVCxFQUFjO0FBQ3JCLFlBQUlBLElBQUlLLFVBQUosS0FBbUIsR0FBdkIsRUFBNEI7QUFDMUJwQywyQkFBT2dDLE1BQVAsQ0FBYyxjQUFkLEVBQThCRCxJQUFJTSxZQUFsQztBQUNEO0FBQ0Y7QUFOYSxLQUFoQjtBQVFBaEIsT0FBR2EsWUFBSCxDQUFnQjtBQUNkWCxXQUFLLHNEQURTO0FBRWRZLGVBQVMsaUJBQVNKLEdBQVQsRUFBYztBQUNyQixZQUFJQSxJQUFJSyxVQUFKLEtBQW1CLEdBQXZCLEVBQTRCO0FBQzFCcEMsMkJBQU9nQyxNQUFQLENBQWMsc0JBQWQsRUFBc0NELElBQUlNLFlBQTFDO0FBQ0Q7QUFDRjtBQU5hLEtBQWhCO0FBUUFoQixPQUFHYSxZQUFILENBQWdCO0FBQ2RYLFdBQUsseUNBRFM7QUFFZFksZUFBUyxpQkFBU0osR0FBVCxFQUFjO0FBQ3JCLFlBQUlBLElBQUlLLFVBQUosS0FBbUIsR0FBdkIsRUFBNEI7QUFDMUJwQywyQkFBT2dDLE1BQVAsQ0FBYyxjQUFkLEVBQThCRCxJQUFJTSxZQUFsQztBQUNEO0FBQ0Y7QUFOYSxLQUFoQjtBQVFEIiwiZmlsZSI6ImluZGV4Lnd4cCIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IEhPU1QgfSBmcm9tIFwiLi4vLi4vY29tbW9uL2NvbmZpZ1wiO1xuaW1wb3J0IHsgZ2V0RGF0YSB9IGZyb20gXCIuLi8uLi9jb21tb24vYXBpL2NvbW1vblwiOyAvL+iAgeaOpeWPo1xuaW1wb3J0IEJ1cyBmcm9tIFwiLi4vLi4vbW9kZWxzL2FwaVwiO1xuaW1wb3J0IEdsb2JhbCBmcm9tIFwiLi4vLi4vbW9kZWxzL2dsb2JhbFwiO1xuXG5leHBvcnQgZGVmYXVsdCB7XG4gIGNvbmZpZzoge1xuICAgIGRpc2FibGVTY3JvbGw6IHRydWUsXG4gICAgdXNpbmdDb21wb25lbnRzOiB7XG4gICAgICBcImxheW91dC1oZWFkXCI6IFwibGF5b3V0L2hlYWRcIixcbiAgICAgIFwibGF5b3V0LWZvb3RcIjogXCJsYXlvdXQvZm9vdFwiLFxuICAgICAgXCJ3eGMtYnV0dG9uXCI6IFwiQG1pbnVpL3d4Yy1idXR0b25cIixcbiAgICAgIFwid3hjLWljb25cIjogXCJAbWludWkvd3hjLWljb25cIixcbiAgICAgIFwid3hjLXNlYXJjaFwiOiBcIkBtaW51aS93eGMtc2VhcmNoXCIsXG4gICAgICBcImluZGV4LWNhcmRcIjogXCIuLi9jb21wb25lbnRzL2luZGV4LWNhcmRcIixcbiAgICAgIFwid3hjLXRhYlwiOiBcIkBtaW51aS93eGMtdGFiXCIsXG4gICAgICBcInd4Yy10YWItcGFuZWxcIjogXCJAbWludWkvd3hjLXRhYi9wYW5lbFwiLFxuICAgICAgXCJ3eGMtbG9hZG1vcmVcIjogXCJAbWludWkvd3hjLWxvYWRtb3JlXCIsXG4gICAgICBcInd4Yy1sb2FkaW5nXCI6IFwiQG1pbnVpL3d4Yy1sb2FkaW5nXCJcbiAgICB9XG4gIH0sXG4gIGRhdGE6IHtcbiAgICAkbG9hZGluZzoge1xuICAgICAgaXNTaG93OiB0cnVlXG4gICAgfSxcbiAgICBpc1Nob3c6IEdsb2JhbC5nZXRIZWFkTm90aWNlU3RhdHVzKCksXG4gICAgc3R5bGU6IFwiYmFja2dyb3VuZDogI2ZmZjtib3JkZXItcmFkaXVzOiA2NnJweDtjb2xvcjogIzAwMDtcIixcbiAgICBsb2NhdGlvbkluZm86IHt9LFxuICAgIG5lYXJMaW5lSW5mbzogR2xvYmFsLmdldFZhbCgnTkVBUkxJTkVJTkZPJyksXG4gICAgdGFiczogW1xuICAgICAgeyB0aXRsZTogXCLmjqjojZBcIiwgY29udGVudDogXCJcIiB9LFxuICAgICAgeyB0aXRsZTogXCLmlLbol49cIiwgY29udGVudDogXCJcIiB9LFxuICAgICAgeyB0aXRsZTogXCLljoblj7JcIiwgY29udGVudDogXCJcIiB9XG4gICAgXVxuICB9LFxuICAvKiogbm90ZTog5ZyoIHd4cCDmlofku7bmiJbogIXpobXpnaLmlofku7bkuK3or7fljrvmjokgbWV0aG9kcyDljIXoo4UgKi9cbiAgb25Mb2FkICgpIHtcbiAgICB0aGlzLnNhdmVEYXRhKCk7XG4gICAgdGhpcy5nZXROZWFyTGluZSgpO1xuICB9LFxuICBvblNob3coKSB7XG4gICAgdGhpcy5nZXROZWFyTGluZSgpO1xuICB9LFxuICBvbkNsaWNrOiBmdW5jdGlvbihlKSB7XG4gICAgY29uc29sZS5sb2coXG4gICAgICBgQ29tcG9uZW50SWQ6JHtlLmRldGFpbC5jb21wb25lbnRJZH0seW91IHNlbGVjdGVkOiR7ZS5kZXRhaWwua2V5fWBcbiAgICApO1xuICB9LFxuICBoYW5kbGVTaG93U2VhcmNoUGFnZSgpIHtcbiAgICB3eC5uYXZpZ2F0ZVRvKHtcbiAgICAgIHVybDogYC9wYWdlcy9zZWFyY2gvaW5kZXhgXG4gICAgfSlcbiAgfSxcbiAgZ2V0TmVhckxpbmUoKSB7XG4gICAgdGhpcy5zZXREYXRhKHtcbiAgICAgICRsb2FkaW5nOiB7XG4gICAgICAgIGlzU2hvdzogdHJ1ZVxuICAgICAgfVxuICAgIH0pO1xuICAgIEdsb2JhbC5zZXRMb2NhdGlvbigpLnRoZW4obG9jYXRpb24gPT4ge1xuICAgICAgQnVzLmdldE5lYXJMaW5lKGxvY2F0aW9uKS50aGVuKHJlcyA9PiB7XG4gICAgICAgIGNvbnN0IHsgdGFicyB9ID0gdGhpcy5kYXRhO1xuICAgICAgICBjb25zdCBuZWFyTGluZUluZm8gPSBKU09OLnBhcnNlKHJlcy5kYXRhLmRhdGEpO1xuICAgICAgICBHbG9iYWwuc2V0VmFsKCdORUFSTElORUlORk8nLCBuZWFyTGluZUluZm8pXG4gICAgICAgIHRhYnNbMF0uY29udGVudCA9IG5lYXJMaW5lSW5mby5zbGljZSgwLCAxMCk7XG4gICAgICAgIHRoaXMuc2V0RGF0YSh7XG4gICAgICAgICAgbG9jYXRpb25JbmZvOiByZXMsXG4gICAgICAgICAgbmVhckxpbmVJbmZvLFxuICAgICAgICAgIHRhYnMsXG4gICAgICAgICAgJGxvYWRpbmc6IHtcbiAgICAgICAgICAgIGlzU2hvdzogZmFsc2VcbiAgICAgICAgICB9XG4gICAgICAgIH0pO1xuICAgICAgfSlcbiAgICB9KVxuICB9LFxuICBzYXZlRGF0YSAoKSB7XG4gICAgd3guZG93bmxvYWRGaWxlKHtcbiAgICAgIHVybDogJ2h0dHBzOi8vYXBpLmxpbW9ucGxheWVyLmNuL2xvY2F0aW9uXzcycHgucG5nJyxcbiAgICAgIHN1Y2Nlc3M6IGZ1bmN0aW9uKHJlcykge1xuICAgICAgICBpZiAocmVzLnN0YXR1c0NvZGUgPT09IDIwMCkge1xuICAgICAgICAgIEdsb2JhbC5zZXRWYWwoJ2xvY2F0aW9uLXBuZycsIHJlcy50ZW1wRmlsZVBhdGgpXG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9KVxuICAgIHd4LmRvd25sb2FkRmlsZSh7XG4gICAgICB1cmw6ICdodHRwczovL2FwaS5saW1vbnBsYXllci5jbi9sb2NhdGlvbl9jb250cm9sXzcycHgucG5nJyxcbiAgICAgIHN1Y2Nlc3M6IGZ1bmN0aW9uKHJlcykge1xuICAgICAgICBpZiAocmVzLnN0YXR1c0NvZGUgPT09IDIwMCkge1xuICAgICAgICAgIEdsb2JhbC5zZXRWYWwoJ2xvY2F0aW9uLWNvbnRyb2wtcG5nJywgcmVzLnRlbXBGaWxlUGF0aClcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH0pXG4gICAgd3guZG93bmxvYWRGaWxlKHtcbiAgICAgIHVybDogJ2h0dHBzOi8vYXBpLmxpbW9ucGxheWVyLmNuL2J1c19pY29uLnBuZycsXG4gICAgICBzdWNjZXNzOiBmdW5jdGlvbihyZXMpIHtcbiAgICAgICAgaWYgKHJlcy5zdGF0dXNDb2RlID09PSAyMDApIHtcbiAgICAgICAgICBHbG9iYWwuc2V0VmFsKCdidXMtaWNvbi1wbmcnLCByZXMudGVtcEZpbGVQYXRoKVxuICAgICAgICB9XG4gICAgICB9XG4gICAgfSlcbiAgfVxufTsiXX0=