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

var _nearLineListJson = require("./nearLineList.json.js");

var _nearLineListJson2 = _interopRequireDefault(_nearLineListJson);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = Page({
  data: {
    "__code__": {
      readme: ""
    },

    isLoading: true,
    isShow: _global2.default.getHeadNoticeStatus(),
    style: "background: #fff;border-radius: 66rpx;color: #000;",
    locationInfo: {},
    nearLineList: _nearLineListJson2.default,
    historyLines: [],
    nearLineInfo: _global2.default.getVal('NEARLINEINFO')
  },
  /** note: 在 wxp 文件或者页面文件中请去掉 methods 包装 */
  onLoad: function onLoad() {
    this.saveData();
    this.getNearLine();
  },
  onShow: function onShow() {
    var hl = _global2.default.getVal('HistoryLines') || [];
    hl = hl.slice(0, 5);
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
        var nearLineInfo = res;
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
      url: 'https://limonplayer.cn/location_16px.png',
      success: function success(res) {
        if (res.statusCode === 200) {
          _global2.default.setVal('location-png', res.tempFilePath);
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
}); //老接口
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImluZGV4Lnd4cCJdLCJuYW1lcyI6WyJkYXRhIiwiaXNMb2FkaW5nIiwiaXNTaG93IiwiR2xvYmFsIiwiZ2V0SGVhZE5vdGljZVN0YXR1cyIsInN0eWxlIiwibG9jYXRpb25JbmZvIiwibmVhckxpbmVMaXN0IiwiQ2FjaGVSb3V0ZURhdGEiLCJoaXN0b3J5TGluZXMiLCJuZWFyTGluZUluZm8iLCJnZXRWYWwiLCJvbkxvYWQiLCJzYXZlRGF0YSIsImdldE5lYXJMaW5lIiwib25TaG93IiwiaGwiLCJzbGljZSIsInNldERhdGEiLCJtYXAiLCJsaW5lTmFtZSIsIm0iLCJsaW5lTm8iLCJnb3RvTGluZSIsImUiLCJjdXJyZW50VGFyZ2V0IiwiZGF0YXNldCIsInd4IiwibmF2aWdhdGVUbyIsInVybCIsImVuY29kZVVSSUNvbXBvbmVudCIsIm9uU2hhcmVBcHBNZXNzYWdlIiwicmVzIiwiZnJvbSIsImNvbnNvbGUiLCJsb2ciLCJ0YXJnZXQiLCJ0aXRsZSIsInBhdGgiLCJvbkNsaWNrIiwiZGV0YWlsIiwiY29tcG9uZW50SWQiLCJrZXkiLCJoYW5kbGVTaG93U2VhcmNoUGFnZSIsInNldExvY2F0aW9uIiwidGhlbiIsIkJ1cyIsImxvY2F0aW9uIiwidGFicyIsIkpTT04iLCJwYXJzZSIsInNldFZhbCIsIm1hcENpdHlMb2N0aW9uX25ldyIsImRvd25sb2FkRmlsZSIsInN1Y2Nlc3MiLCJzdGF0dXNDb2RlIiwidGVtcEZpbGVQYXRoIl0sIm1hcHBpbmdzIjoiOzs7Ozs7QUFBQTs7QUFDQTs7QUFDQTs7OztBQUNBOzs7O0FBQ0E7Ozs7Ozs7QUFpQkVBLFFBQU07QUFBQTtBQUFBO0FBQUE7O0FBQ0pDLGVBQVcsSUFEUDtBQUVKQyxZQUFRQyxpQkFBT0MsbUJBQVAsRUFGSjtBQUdKQyxXQUFPLG9EQUhIO0FBSUpDLGtCQUFjLEVBSlY7QUFLSkMsa0JBQWNDLDBCQUxWO0FBTUpDLGtCQUFjLEVBTlY7QUFPSkMsa0JBQWNQLGlCQUFPUSxNQUFQLENBQWMsY0FBZDtBQVBWLEc7QUFTTjtBQUNBQyxRLG9CQUFVO0FBQ1IsU0FBS0MsUUFBTDtBQUNBLFNBQUtDLFdBQUw7QUFDRCxHO0FBQ0RDLFEsb0JBQVU7QUFDUixRQUFJQyxLQUFLYixpQkFBT1EsTUFBUCxDQUFjLGNBQWQsS0FBaUMsRUFBMUM7QUFDQUssU0FBS0EsR0FBR0MsS0FBSCxDQUFTLENBQVQsRUFBWSxDQUFaLENBQUw7QUFDQSxTQUFLQyxPQUFMLENBQWE7QUFDWFQsb0JBQWNPLEdBQUdHLEdBQUgsQ0FBTyxhQUFLO0FBQ3hCLGVBQU87QUFDTEMsb0JBQVVDLENBREw7QUFFTEMsa0JBQVFEO0FBRkgsU0FBUDtBQUlELE9BTGE7QUFESCxLQUFiO0FBUUQsRztBQUNERSxVLG9CQUFVQyxDLEVBQUc7QUFDWCxRQUFNSixXQUFXSSxFQUFFQyxhQUFGLENBQWdCQyxPQUFoQixDQUF3Qk4sUUFBekM7QUFDQU8sT0FBR0MsVUFBSCxDQUFjO0FBQ1pDLHNEQUE4Q0MsbUJBQW1CVixRQUFuQjtBQURsQyxLQUFkO0FBR0QsRztBQUNEVyxtQiw2QkFBbUJDLEcsRUFBSztBQUN0QixRQUFJQSxJQUFJQyxJQUFKLEtBQWEsUUFBakIsRUFBMkI7QUFDekI7QUFDQUMsY0FBUUMsR0FBUixDQUFZSCxJQUFJSSxNQUFoQjtBQUNEO0FBQ0QsV0FBTztBQUNMQyxhQUFPLFVBREY7QUFFTEMsWUFBTTtBQUZELEtBQVA7QUFJRCxHOztBQUNEQyxXQUFTLGlCQUFVZixDQUFWLEVBQWE7QUFDcEJVLFlBQVFDLEdBQVIsa0JBQ2lCWCxFQUFFZ0IsTUFBRixDQUFTQyxXQUQxQixzQkFDc0RqQixFQUFFZ0IsTUFBRixDQUFTRSxHQUQvRDtBQUdELEc7QUFDREMsc0Isa0NBQXdCO0FBQ3RCaEIsT0FBR0MsVUFBSCxDQUFjO0FBQ1pDO0FBRFksS0FBZDtBQUdELEc7QUFDRGYsYSx5QkFBZTtBQUFBOztBQUNiLFNBQUtJLE9BQUwsQ0FBYTtBQUNYakIsaUJBQVc7QUFEQSxLQUFiO0FBR0FFLHFCQUFPeUMsV0FBUCxHQUFxQkMsSUFBckIsQ0FBMEIsb0JBQVk7QUFDcENDLG9CQUFJaEMsV0FBSixDQUFnQmlDLFFBQWhCLEVBQTBCRixJQUExQixDQUErQixlQUFPO0FBQUEsWUFDNUJHLElBRDRCLEdBQ25CLE1BQUtoRCxJQURjLENBQzVCZ0QsSUFENEI7O0FBRXBDLFlBQU10QyxlQUFldUMsS0FBS0MsS0FBTCxDQUFXbEIsSUFBSWhDLElBQUosQ0FBU0EsSUFBcEIsQ0FBckI7QUFDQUcseUJBQU9nRCxNQUFQLENBQWMsY0FBZCxFQUE4QnpDLFlBQTlCO0FBQ0EsY0FBS1EsT0FBTCxDQUFhO0FBQ1hYLHdCQUFjSixpQkFBT2lELGtCQUFQLENBQTBCMUMsWUFBMUIsQ0FESDtBQUVYSix3QkFBY3lDLFFBRkg7QUFHWHJDLG9DQUhXO0FBSVhULHFCQUFXO0FBSkEsU0FBYjtBQU1ELE9BVkQ7QUFXRCxLQVpEO0FBYUQsRztBQUNEWSxVLHNCQUFZO0FBQ1ZjLE9BQUcwQixZQUFILENBQWdCO0FBQ2R4QixXQUFLLDBDQURTO0FBRWR5QixlQUFTLGlCQUFVdEIsR0FBVixFQUFlO0FBQ3RCLFlBQUlBLElBQUl1QixVQUFKLEtBQW1CLEdBQXZCLEVBQTRCO0FBQzFCcEQsMkJBQU9nRCxNQUFQLENBQWMsY0FBZCxFQUE4Qm5CLElBQUl3QixZQUFsQztBQUNEO0FBQ0Y7QUFOYSxLQUFoQjtBQVFBN0IsT0FBRzBCLFlBQUgsQ0FBZ0I7QUFDZHhCLFdBQUsscUNBRFM7QUFFZHlCLGVBQVMsaUJBQVV0QixHQUFWLEVBQWU7QUFDdEIsWUFBSUEsSUFBSXVCLFVBQUosS0FBbUIsR0FBdkIsRUFBNEI7QUFDMUJwRCwyQkFBT2dELE1BQVAsQ0FBYyxjQUFkLEVBQThCbkIsSUFBSXdCLFlBQWxDO0FBQ0Q7QUFDRjtBQU5hLEtBQWhCO0FBUUQ7SUEzR2dEIiwiZmlsZSI6ImluZGV4Lnd4cCIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IEhPU1QgfSBmcm9tIFwiLi4vLi4vY29tbW9uL2NvbmZpZ1wiO1xyXG5pbXBvcnQgeyBnZXREYXRhIH0gZnJvbSBcIi4uLy4uL2NvbW1vbi9hcGkvY29tbW9uXCI7IC8v6ICB5o6l5Y+jXHJcbmltcG9ydCBCdXMgZnJvbSBcIi4uLy4uL21vZGVscy9hcGlcIjtcclxuaW1wb3J0IEdsb2JhbCBmcm9tIFwiLi4vLi4vbW9kZWxzL2dsb2JhbFwiO1xyXG5pbXBvcnQgQ2FjaGVSb3V0ZURhdGEgZnJvbSAnLi9uZWFyTGluZUxpc3QuanNvbidcclxuXHJcbmV4cG9ydCBkZWZhdWx0IHtcclxuICBjb25maWc6IHtcclxuICAgIGRpc2FibGVTY3JvbGw6IHRydWUsXHJcbiAgICB1c2luZ0NvbXBvbmVudHM6IHtcclxuICAgICAgJ3d4Yy1saXN0JzogJ0BtaW51aS93eGMtbGlzdCcsXHJcbiAgICAgIFwibGF5b3V0LWhlYWRcIjogXCJsYXlvdXQvaGVhZFwiLFxyXG4gICAgICBcImxheW91dC1mb290XCI6IFwibGF5b3V0L2Zvb3RcIixcclxuICAgICAgXCJ3eGMtYnV0dG9uXCI6IFwiQG1pbnVpL3d4Yy1idXR0b25cIixcclxuICAgICAgXCJ3eGMtaWNvblwiOiBcIkBtaW51aS93eGMtaWNvblwiLFxyXG4gICAgICBcInd4Yy1zZWFyY2hcIjogXCJAbWludWkvd3hjLXNlYXJjaFwiLFxyXG4gICAgICBcImluZGV4LWNhcmRcIjogXCIuLi9jb21wb25lbnRzL2luZGV4LWNhcmRcIixcclxuICAgICAgXCJ3eGMtbG9hZG1vcmVcIjogXCJAbWludWkvd3hjLWxvYWRtb3JlXCIsXHJcbiAgICAgIFwid3hjLWxvYWRpbmdcIjogXCJAbWludWkvd3hjLWxvYWRpbmdcIlxyXG4gICAgfVxyXG4gIH0sXHJcbiAgZGF0YToge1xyXG4gICAgaXNMb2FkaW5nOiB0cnVlLFxyXG4gICAgaXNTaG93OiBHbG9iYWwuZ2V0SGVhZE5vdGljZVN0YXR1cygpLFxyXG4gICAgc3R5bGU6IFwiYmFja2dyb3VuZDogI2ZmZjtib3JkZXItcmFkaXVzOiA2NnJweDtjb2xvcjogIzAwMDtcIixcclxuICAgIGxvY2F0aW9uSW5mbzoge30sXHJcbiAgICBuZWFyTGluZUxpc3Q6IENhY2hlUm91dGVEYXRhLFxyXG4gICAgaGlzdG9yeUxpbmVzOiBbXSxcclxuICAgIG5lYXJMaW5lSW5mbzogR2xvYmFsLmdldFZhbCgnTkVBUkxJTkVJTkZPJylcclxuICB9LFxyXG4gIC8qKiBub3RlOiDlnKggd3hwIOaWh+S7tuaIluiAhemhtemdouaWh+S7tuS4reivt+WOu+aOiSBtZXRob2RzIOWMheijhSAqL1xyXG4gIG9uTG9hZCAoKSB7XHJcbiAgICB0aGlzLnNhdmVEYXRhKCk7XHJcbiAgICB0aGlzLmdldE5lYXJMaW5lKCk7XHJcbiAgfSxcclxuICBvblNob3cgKCkge1xyXG4gICAgbGV0IGhsID0gR2xvYmFsLmdldFZhbCgnSGlzdG9yeUxpbmVzJykgfHwgW11cclxuICAgIGhsID0gaGwuc2xpY2UoMCwgNSlcclxuICAgIHRoaXMuc2V0RGF0YSh7XHJcbiAgICAgIGhpc3RvcnlMaW5lczogaGwubWFwKG0gPT4ge1xyXG4gICAgICAgIHJldHVybiB7XHJcbiAgICAgICAgICBsaW5lTmFtZTogbSxcclxuICAgICAgICAgIGxpbmVObzogbVxyXG4gICAgICAgIH1cclxuICAgICAgfSlcclxuICAgIH0pXHJcbiAgfSxcclxuICBnb3RvTGluZSAoZSkge1xyXG4gICAgY29uc3QgbGluZU5hbWUgPSBlLmN1cnJlbnRUYXJnZXQuZGF0YXNldC5saW5lTmFtZVxyXG4gICAgd3gubmF2aWdhdGVUbyh7XHJcbiAgICAgIHVybDogYC9wYWdlcy9saW5lL2luZGV4P2lzVXBEb3duPTAmbGluZU5hbWU9JHtlbmNvZGVVUklDb21wb25lbnQobGluZU5hbWUpfWBcclxuICAgIH0pXHJcbiAgfSxcclxuICBvblNoYXJlQXBwTWVzc2FnZSAocmVzKSB7XHJcbiAgICBpZiAocmVzLmZyb20gPT09ICdidXR0b24nKSB7XHJcbiAgICAgIC8vIOadpeiHqumhtemdouWGhei9rOWPkeaMiemSrlxyXG4gICAgICBjb25zb2xlLmxvZyhyZXMudGFyZ2V0KVxyXG4gICAgfVxyXG4gICAgcmV0dXJuIHtcclxuICAgICAgdGl0bGU6ICfoiJ/lsbHlhazkuqTlrp7ml7bmn6Xor6InLFxyXG4gICAgICBwYXRoOiAncGFnZXMvaG9tZS9pbmRleCdcclxuICAgIH1cclxuICB9LFxyXG4gIG9uQ2xpY2s6IGZ1bmN0aW9uIChlKSB7XHJcbiAgICBjb25zb2xlLmxvZyhcclxuICAgICAgYENvbXBvbmVudElkOiR7ZS5kZXRhaWwuY29tcG9uZW50SWR9LHlvdSBzZWxlY3RlZDoke2UuZGV0YWlsLmtleX1gXHJcbiAgICApO1xyXG4gIH0sXHJcbiAgaGFuZGxlU2hvd1NlYXJjaFBhZ2UgKCkge1xyXG4gICAgd3gubmF2aWdhdGVUbyh7XHJcbiAgICAgIHVybDogYC9wYWdlcy9zZWFyY2gvaW5kZXhgXHJcbiAgICB9KVxyXG4gIH0sXHJcbiAgZ2V0TmVhckxpbmUgKCkge1xyXG4gICAgdGhpcy5zZXREYXRhKHtcclxuICAgICAgaXNMb2FkaW5nOiB0cnVlXHJcbiAgICB9KTtcclxuICAgIEdsb2JhbC5zZXRMb2NhdGlvbigpLnRoZW4obG9jYXRpb24gPT4ge1xyXG4gICAgICBCdXMuZ2V0TmVhckxpbmUobG9jYXRpb24pLnRoZW4ocmVzID0+IHtcclxuICAgICAgICBjb25zdCB7IHRhYnMgfSA9IHRoaXMuZGF0YTtcclxuICAgICAgICBjb25zdCBuZWFyTGluZUluZm8gPSBKU09OLnBhcnNlKHJlcy5kYXRhLmRhdGEpXHJcbiAgICAgICAgR2xvYmFsLnNldFZhbCgnTkVBUkxJTkVJTkZPJywgbmVhckxpbmVJbmZvKVxyXG4gICAgICAgIHRoaXMuc2V0RGF0YSh7XHJcbiAgICAgICAgICBuZWFyTGluZUxpc3Q6IEdsb2JhbC5tYXBDaXR5TG9jdGlvbl9uZXcobmVhckxpbmVJbmZvKSxcclxuICAgICAgICAgIGxvY2F0aW9uSW5mbzogbG9jYXRpb24sXHJcbiAgICAgICAgICBuZWFyTGluZUluZm8sXHJcbiAgICAgICAgICBpc0xvYWRpbmc6IGZhbHNlXHJcbiAgICAgICAgfSk7XHJcbiAgICAgIH0pXHJcbiAgICB9KVxyXG4gIH0sXHJcbiAgc2F2ZURhdGEgKCkge1xyXG4gICAgd3guZG93bmxvYWRGaWxlKHtcclxuICAgICAgdXJsOiAnaHR0cHM6Ly9saW1vbnBsYXllci5jbi9sb2NhdGlvbl8xNnB4LnBuZycsXHJcbiAgICAgIHN1Y2Nlc3M6IGZ1bmN0aW9uIChyZXMpIHtcclxuICAgICAgICBpZiAocmVzLnN0YXR1c0NvZGUgPT09IDIwMCkge1xyXG4gICAgICAgICAgR2xvYmFsLnNldFZhbCgnbG9jYXRpb24tcG5nJywgcmVzLnRlbXBGaWxlUGF0aClcclxuICAgICAgICB9XHJcbiAgICAgIH1cclxuICAgIH0pXHJcbiAgICB3eC5kb3dubG9hZEZpbGUoe1xyXG4gICAgICB1cmw6ICdodHRwczovL2xpbW9ucGxheWVyLmNuL2J1c19pY29uLnBuZycsXHJcbiAgICAgIHN1Y2Nlc3M6IGZ1bmN0aW9uIChyZXMpIHtcclxuICAgICAgICBpZiAocmVzLnN0YXR1c0NvZGUgPT09IDIwMCkge1xyXG4gICAgICAgICAgR2xvYmFsLnNldFZhbCgnYnVzLWljb24tcG5nJywgcmVzLnRlbXBGaWxlUGF0aClcclxuICAgICAgICB9XHJcbiAgICAgIH1cclxuICAgIH0pXHJcbiAgfVxyXG59OyJdfQ==