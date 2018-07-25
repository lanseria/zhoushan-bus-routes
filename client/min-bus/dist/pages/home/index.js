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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImluZGV4Lnd4cCJdLCJuYW1lcyI6WyJkYXRhIiwiJGxvYWRpbmciLCJpc1Nob3ciLCJzdHlsZSIsImxvY2F0aW9uSW5mbyIsIm5lYXJMaW5lSW5mbyIsInRhYnMiLCJ0aXRsZSIsImNvbnRlbnQiLCJvbkxvYWQiLCJzYXZlRGF0YSIsImdldE5lYXJMaW5lIiwib25TaG93Iiwib25DbGljayIsImUiLCJjb25zb2xlIiwibG9nIiwiZGV0YWlsIiwiY29tcG9uZW50SWQiLCJrZXkiLCJoYW5kbGVTaG93U2VhcmNoUGFnZSIsInd4IiwibmF2aWdhdGVUbyIsInVybCIsInNldERhdGEiLCJHbG9iYWwiLCJzZXRMb2NhdGlvbiIsInRoZW4iLCJCdXMiLCJsb2NhdGlvbiIsIkpTT04iLCJwYXJzZSIsInJlcyIsInNsaWNlIiwiZG93bmxvYWRGaWxlIiwic3VjY2VzcyIsInN0YXR1c0NvZGUiLCJzZXRWYWwiLCJ0ZW1wRmlsZVBhdGgiXSwibWFwcGluZ3MiOiI7Ozs7OztBQUFBOztBQUNBOztBQUNBOzs7O0FBQ0E7Ozs7OztBQUZtRDs7QUFvQmpEQSxRQUFNO0FBQUE7QUFBQTtBQUFBOztBQUNKQyxjQUFVO0FBQ1JDLGNBQVE7QUFEQSxLQUROO0FBSUpDLFdBQU8sb0RBSkg7QUFLSkMsa0JBQWMsRUFMVjtBQU1KQyxrQkFBYyxFQU5WO0FBT0pDLFVBQU0sQ0FDSixFQUFFQyxPQUFPLElBQVQsRUFBZUMsU0FBUyxFQUF4QixFQURJLEVBRUosRUFBRUQsT0FBTyxJQUFULEVBQWVDLFNBQVMsRUFBeEIsRUFGSSxFQUdKLEVBQUVELE9BQU8sSUFBVCxFQUFlQyxTQUFTLEVBQXhCLEVBSEk7QUFQRixHO0FBYU47QUFDQUMsUSxvQkFBVTtBQUNSLFNBQUtDLFFBQUw7QUFDQSxTQUFLQyxXQUFMO0FBQ0QsRztBQUNEQyxRLG9CQUFTO0FBQ1AsU0FBS0QsV0FBTDtBQUNELEc7O0FBQ0RFLFdBQVMsaUJBQVNDLENBQVQsRUFBWTtBQUNuQkMsWUFBUUMsR0FBUixrQkFDaUJGLEVBQUVHLE1BQUYsQ0FBU0MsV0FEMUIsc0JBQ3NESixFQUFFRyxNQUFGLENBQVNFLEdBRC9EO0FBR0QsRztBQUNEQyxzQixrQ0FBdUI7QUFDckJDLE9BQUdDLFVBQUgsQ0FBYztBQUNaQztBQURZLEtBQWQ7QUFHRCxHO0FBQ0RaLGEseUJBQWM7QUFBQTs7QUFDWixTQUFLYSxPQUFMLENBQWE7QUFDWHZCLGdCQUFVO0FBQ1JDLGdCQUFRO0FBREE7QUFEQyxLQUFiO0FBS0F1QixxQkFBT0MsV0FBUCxHQUFxQkMsSUFBckIsQ0FBMEIsb0JBQVk7QUFDcENDLG9CQUFJakIsV0FBSixDQUFnQmtCLFFBQWhCLEVBQTBCRixJQUExQixDQUErQixlQUFPO0FBQUEsWUFDNUJyQixJQUQ0QixHQUNuQixNQUFLTixJQURjLENBQzVCTSxJQUQ0Qjs7QUFFcEMsWUFBTUQsZUFBZXlCLEtBQUtDLEtBQUwsQ0FBV0MsSUFBSWhDLElBQUosQ0FBU0EsSUFBcEIsQ0FBckI7QUFDQU0sYUFBSyxDQUFMLEVBQVFFLE9BQVIsR0FBa0JILGFBQWE0QixLQUFiLENBQW1CLENBQW5CLEVBQXNCLEVBQXRCLENBQWxCO0FBQ0EsY0FBS1QsT0FBTCxDQUFhO0FBQ1hwQix3QkFBYzRCLEdBREg7QUFFWDNCLG9DQUZXO0FBR1hDLG9CQUhXO0FBSVhMLG9CQUFVO0FBQ1JDLG9CQUFRO0FBREE7QUFKQyxTQUFiO0FBUUQsT0FaRDtBQWFELEtBZEQ7QUFlRCxHO0FBQ0RRLFUsc0JBQVk7QUFDVlcsT0FBR2EsWUFBSCxDQUFnQjtBQUNkWCxXQUFLLDhDQURTO0FBRWRZLGVBQVMsaUJBQVNILEdBQVQsRUFBYztBQUNyQixZQUFJQSxJQUFJSSxVQUFKLEtBQW1CLEdBQXZCLEVBQTRCO0FBQzFCWCwyQkFBT1ksTUFBUCxDQUFjLGNBQWQsRUFBOEJMLElBQUlNLFlBQWxDO0FBQ0Q7QUFDRjtBQU5hLEtBQWhCO0FBUUFqQixPQUFHYSxZQUFILENBQWdCO0FBQ2RYLFdBQUssc0RBRFM7QUFFZFksZUFBUyxpQkFBU0gsR0FBVCxFQUFjO0FBQ3JCLFlBQUlBLElBQUlJLFVBQUosS0FBbUIsR0FBdkIsRUFBNEI7QUFDMUJYLDJCQUFPWSxNQUFQLENBQWMsc0JBQWQsRUFBc0NMLElBQUlNLFlBQTFDO0FBQ0Q7QUFDRjtBQU5hLEtBQWhCO0FBUUFqQixPQUFHYSxZQUFILENBQWdCO0FBQ2RYLFdBQUsseUNBRFM7QUFFZFksZUFBUyxpQkFBU0gsR0FBVCxFQUFjO0FBQ3JCLFlBQUlBLElBQUlJLFVBQUosS0FBbUIsR0FBdkIsRUFBNEI7QUFDMUJYLDJCQUFPWSxNQUFQLENBQWMsY0FBZCxFQUE4QkwsSUFBSU0sWUFBbEM7QUFDRDtBQUNGO0FBTmEsS0FBaEI7QUFRRCIsImZpbGUiOiJpbmRleC53eHAiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBIT1NUIH0gZnJvbSBcIi4uLy4uL2NvbW1vbi9jb25maWdcIjtcbmltcG9ydCB7IGdldERhdGEgfSBmcm9tIFwiLi4vLi4vY29tbW9uL2FwaS9jb21tb25cIjsgLy/ogIHmjqXlj6NcbmltcG9ydCBCdXMgZnJvbSBcIi4uLy4uL21vZGVscy9hcGlcIjtcbmltcG9ydCBHbG9iYWwgZnJvbSBcIi4uLy4uL21vZGVscy9nbG9iYWxcIjtcblxuZXhwb3J0IGRlZmF1bHQge1xuICBjb25maWc6IHtcbiAgICBkaXNhYmxlU2Nyb2xsOiB0cnVlLFxuICAgIHVzaW5nQ29tcG9uZW50czoge1xuICAgICAgXCJsYXlvdXQtaGVhZFwiOiBcImxheW91dC9oZWFkXCIsXG4gICAgICBcImxheW91dC1mb290XCI6IFwibGF5b3V0L2Zvb3RcIixcbiAgICAgIFwid3hjLWJ1dHRvblwiOiBcIkBtaW51aS93eGMtYnV0dG9uXCIsXG4gICAgICBcInd4Yy1pY29uXCI6IFwiQG1pbnVpL3d4Yy1pY29uXCIsXG4gICAgICBcInd4Yy1zZWFyY2hcIjogXCJAbWludWkvd3hjLXNlYXJjaFwiLFxuICAgICAgXCJpbmRleC1jYXJkXCI6IFwiLi4vY29tcG9uZW50cy9pbmRleC1jYXJkXCIsXG4gICAgICBcInd4Yy10YWJcIjogXCJAbWludWkvd3hjLXRhYlwiLFxuICAgICAgXCJ3eGMtdGFiLXBhbmVsXCI6IFwiQG1pbnVpL3d4Yy10YWIvcGFuZWxcIixcbiAgICAgIFwid3hjLWxvYWRtb3JlXCI6IFwiQG1pbnVpL3d4Yy1sb2FkbW9yZVwiLFxuICAgICAgXCJ3eGMtbG9hZGluZ1wiOiBcIkBtaW51aS93eGMtbG9hZGluZ1wiXG4gICAgfVxuICB9LFxuICBkYXRhOiB7XG4gICAgJGxvYWRpbmc6IHtcbiAgICAgIGlzU2hvdzogZmFsc2VcbiAgICB9LFxuICAgIHN0eWxlOiBcImJhY2tncm91bmQ6ICNmZmY7Ym9yZGVyLXJhZGl1czogNjZycHg7Y29sb3I6ICMwMDA7XCIsXG4gICAgbG9jYXRpb25JbmZvOiB7fSxcbiAgICBuZWFyTGluZUluZm86IFtdLFxuICAgIHRhYnM6IFtcbiAgICAgIHsgdGl0bGU6IFwi5o6o6I2QXCIsIGNvbnRlbnQ6IFwiXCIgfSxcbiAgICAgIHsgdGl0bGU6IFwi5pS26JePXCIsIGNvbnRlbnQ6IFwiXCIgfSxcbiAgICAgIHsgdGl0bGU6IFwi5Y6G5Y+yXCIsIGNvbnRlbnQ6IFwiXCIgfVxuICAgIF1cbiAgfSxcbiAgLyoqIG5vdGU6IOWcqCB3eHAg5paH5Lu25oiW6ICF6aG16Z2i5paH5Lu25Lit6K+35Y675o6JIG1ldGhvZHMg5YyF6KOFICovXG4gIG9uTG9hZCAoKSB7XG4gICAgdGhpcy5zYXZlRGF0YSgpO1xuICAgIHRoaXMuZ2V0TmVhckxpbmUoKTtcbiAgfSxcbiAgb25TaG93KCkge1xuICAgIHRoaXMuZ2V0TmVhckxpbmUoKTtcbiAgfSxcbiAgb25DbGljazogZnVuY3Rpb24oZSkge1xuICAgIGNvbnNvbGUubG9nKFxuICAgICAgYENvbXBvbmVudElkOiR7ZS5kZXRhaWwuY29tcG9uZW50SWR9LHlvdSBzZWxlY3RlZDoke2UuZGV0YWlsLmtleX1gXG4gICAgKTtcbiAgfSxcbiAgaGFuZGxlU2hvd1NlYXJjaFBhZ2UoKSB7XG4gICAgd3gubmF2aWdhdGVUbyh7XG4gICAgICB1cmw6IGAvcGFnZXMvc2VhcmNoL2luZGV4YFxuICAgIH0pXG4gIH0sXG4gIGdldE5lYXJMaW5lKCkge1xuICAgIHRoaXMuc2V0RGF0YSh7XG4gICAgICAkbG9hZGluZzoge1xuICAgICAgICBpc1Nob3c6IHRydWVcbiAgICAgIH1cbiAgICB9KTtcbiAgICBHbG9iYWwuc2V0TG9jYXRpb24oKS50aGVuKGxvY2F0aW9uID0+IHtcbiAgICAgIEJ1cy5nZXROZWFyTGluZShsb2NhdGlvbikudGhlbihyZXMgPT4ge1xuICAgICAgICBjb25zdCB7IHRhYnMgfSA9IHRoaXMuZGF0YTtcbiAgICAgICAgY29uc3QgbmVhckxpbmVJbmZvID0gSlNPTi5wYXJzZShyZXMuZGF0YS5kYXRhKTtcbiAgICAgICAgdGFic1swXS5jb250ZW50ID0gbmVhckxpbmVJbmZvLnNsaWNlKDAsIDEwKTtcbiAgICAgICAgdGhpcy5zZXREYXRhKHtcbiAgICAgICAgICBsb2NhdGlvbkluZm86IHJlcyxcbiAgICAgICAgICBuZWFyTGluZUluZm8sXG4gICAgICAgICAgdGFicyxcbiAgICAgICAgICAkbG9hZGluZzoge1xuICAgICAgICAgICAgaXNTaG93OiBmYWxzZVxuICAgICAgICAgIH1cbiAgICAgICAgfSk7XG4gICAgICB9KVxuICAgIH0pXG4gIH0sXG4gIHNhdmVEYXRhICgpIHtcbiAgICB3eC5kb3dubG9hZEZpbGUoe1xuICAgICAgdXJsOiAnaHR0cHM6Ly9hcGkubGltb25wbGF5ZXIuY24vbG9jYXRpb25fNzJweC5wbmcnLFxuICAgICAgc3VjY2VzczogZnVuY3Rpb24ocmVzKSB7XG4gICAgICAgIGlmIChyZXMuc3RhdHVzQ29kZSA9PT0gMjAwKSB7XG4gICAgICAgICAgR2xvYmFsLnNldFZhbCgnbG9jYXRpb24tcG5nJywgcmVzLnRlbXBGaWxlUGF0aClcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH0pXG4gICAgd3guZG93bmxvYWRGaWxlKHtcbiAgICAgIHVybDogJ2h0dHBzOi8vYXBpLmxpbW9ucGxheWVyLmNuL2xvY2F0aW9uX2NvbnRyb2xfNzJweC5wbmcnLFxuICAgICAgc3VjY2VzczogZnVuY3Rpb24ocmVzKSB7XG4gICAgICAgIGlmIChyZXMuc3RhdHVzQ29kZSA9PT0gMjAwKSB7XG4gICAgICAgICAgR2xvYmFsLnNldFZhbCgnbG9jYXRpb24tY29udHJvbC1wbmcnLCByZXMudGVtcEZpbGVQYXRoKVxuICAgICAgICB9XG4gICAgICB9XG4gICAgfSlcbiAgICB3eC5kb3dubG9hZEZpbGUoe1xuICAgICAgdXJsOiAnaHR0cHM6Ly9hcGkubGltb25wbGF5ZXIuY24vYnVzX2ljb24ucG5nJyxcbiAgICAgIHN1Y2Nlc3M6IGZ1bmN0aW9uKHJlcykge1xuICAgICAgICBpZiAocmVzLnN0YXR1c0NvZGUgPT09IDIwMCkge1xuICAgICAgICAgIEdsb2JhbC5zZXRWYWwoJ2J1cy1pY29uLXBuZycsIHJlcy50ZW1wRmlsZVBhdGgpXG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9KVxuICB9XG59OyJdfQ==