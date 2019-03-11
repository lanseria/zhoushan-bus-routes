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
    style: "background: #fff;border-radius: 66rpx;color: #000;",
    nearLineInfo: _global2.default.getVal('NEARLINEINFO')
  },
  /** note: 在 wxp 文件或者页面文件中请去掉 methods 包装 */
  onLoad: function onLoad() {},
  getNearLine: function getNearLine() {
    var _this = this;

    _global2.default.setLocation().then(function (location) {
      _api2.default.getNearLine(location).then(function (res) {
        var tabs = _this.data.tabs;

        var nearLineInfo = JSON.parse(res.data.data);
        _global2.default.setVal('NEARLINEINFO', nearLineInfo);
        tabs[0].content = nearLineInfo.slice(0, 20);
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
  onShareAppMessage: function onShareAppMessage(res) {
    if (res.from === 'button') {
      // 来自页面内转发按钮
      console.log(res.target);
    }
    return {
      title: '舟山公交实时查询',
      path: 'pages/hotrouter/index'
    };
  }
});
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImluZGV4Lnd4cCJdLCJuYW1lcyI6WyJkYXRhIiwiJGxvYWRpbmciLCJpc1Nob3ciLCJzdHlsZSIsIm5lYXJMaW5lSW5mbyIsIkdsb2JhbCIsImdldFZhbCIsIm9uTG9hZCIsImdldE5lYXJMaW5lIiwic2V0TG9jYXRpb24iLCJ0aGVuIiwiQnVzIiwibG9jYXRpb24iLCJ0YWJzIiwiSlNPTiIsInBhcnNlIiwicmVzIiwic2V0VmFsIiwiY29udGVudCIsInNsaWNlIiwic2V0RGF0YSIsImxvY2F0aW9uSW5mbyIsIm9uU2hhcmVBcHBNZXNzYWdlIiwiZnJvbSIsImNvbnNvbGUiLCJsb2ciLCJ0YXJnZXQiLCJ0aXRsZSIsInBhdGgiXSwibWFwcGluZ3MiOiI7Ozs7OztBQUFBOztBQUNBOztBQUNBOzs7O0FBQ0E7Ozs7OztBQUZtRDs7QUFvQmpEQSxRQUFNO0FBQUE7QUFBQTtBQUFBOztBQUNKQyxjQUFVO0FBQ1JDLGNBQVE7QUFEQSxLQUROO0FBSUpDLFdBQU8sb0RBSkg7QUFLSkMsa0JBQWNDLGlCQUFPQyxNQUFQLENBQWMsY0FBZDtBQUxWLEc7QUFPTjtBQUNBQyxRLG9CQUFVLENBRVQsQztBQUNEQyxhLHlCQUFlO0FBQUE7O0FBQ2JILHFCQUFPSSxXQUFQLEdBQXFCQyxJQUFyQixDQUEwQixvQkFBWTtBQUNwQ0Msb0JBQUlILFdBQUosQ0FBZ0JJLFFBQWhCLEVBQTBCRixJQUExQixDQUErQixlQUFPO0FBQUEsWUFDNUJHLElBRDRCLEdBQ25CLE1BQUtiLElBRGMsQ0FDNUJhLElBRDRCOztBQUVwQyxZQUFNVCxlQUFlVSxLQUFLQyxLQUFMLENBQVdDLElBQUloQixJQUFKLENBQVNBLElBQXBCLENBQXJCO0FBQ0FLLHlCQUFPWSxNQUFQLENBQWMsY0FBZCxFQUE4QmIsWUFBOUI7QUFDQVMsYUFBSyxDQUFMLEVBQVFLLE9BQVIsR0FBa0JkLGFBQWFlLEtBQWIsQ0FBbUIsQ0FBbkIsRUFBc0IsRUFBdEIsQ0FBbEI7QUFDQSxjQUFLQyxPQUFMLENBQWE7QUFDWEMsd0JBQWNMLEdBREg7QUFFWFosb0NBRlc7QUFHWFMsb0JBSFc7QUFJWFosb0JBQVU7QUFDUkMsb0JBQVE7QUFEQTtBQUpDLFNBQWI7QUFRRCxPQWJEO0FBY0QsS0FmRDtBQWdCRCxHO0FBQ0RvQixtQiw2QkFBbUJOLEcsRUFBSztBQUN0QixRQUFJQSxJQUFJTyxJQUFKLEtBQWEsUUFBakIsRUFBMkI7QUFDekI7QUFDQUMsY0FBUUMsR0FBUixDQUFZVCxJQUFJVSxNQUFoQjtBQUNEO0FBQ0QsV0FBTztBQUNMQyxhQUFPLFVBREY7QUFFTEMsWUFBTTtBQUZELEtBQVA7QUFJRCIsImZpbGUiOiJpbmRleC53eHAiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBIT1NUIH0gZnJvbSBcIi4uLy4uL2NvbW1vbi9jb25maWdcIjtcbmltcG9ydCB7IGdldERhdGEgfSBmcm9tIFwiLi4vLi4vY29tbW9uL2FwaS9jb21tb25cIjsgLy/ogIHmjqXlj6NcbmltcG9ydCBCdXMgZnJvbSBcIi4uLy4uL21vZGVscy9hcGlcIjtcbmltcG9ydCBHbG9iYWwgZnJvbSBcIi4uLy4uL21vZGVscy9nbG9iYWxcIjtcbmV4cG9ydCBkZWZhdWx0IHtcbiAgY29uZmlnOiB7XG4gICAgbmF2aWdhdGlvbkJhclRpdGxlVGV4dDogJ+eDremXqOe6v+i3rycsXG4gICAgZGlzYWJsZVNjcm9sbDogdHJ1ZSxcbiAgICB1c2luZ0NvbXBvbmVudHM6IHtcbiAgICAgIFwibGF5b3V0LWhlYWRcIjogXCJsYXlvdXQvaGVhZFwiLFxuICAgICAgXCJsYXlvdXQtZm9vdFwiOiBcImxheW91dC9mb290XCIsXG4gICAgICBcInd4Yy1idXR0b25cIjogXCJAbWludWkvd3hjLWJ1dHRvblwiLFxuICAgICAgXCJ3eGMtaWNvblwiOiBcIkBtaW51aS93eGMtaWNvblwiLFxuICAgICAgXCJ3eGMtc2VhcmNoXCI6IFwiQG1pbnVpL3d4Yy1zZWFyY2hcIixcbiAgICAgIFwiaW5kZXgtY2FyZFwiOiBcIi4uL2NvbXBvbmVudHMvaG90LWNhcmRcIixcbiAgICAgIFwid3hjLXRhYlwiOiBcIkBtaW51aS93eGMtdGFiXCIsXG4gICAgICBcInd4Yy10YWItcGFuZWxcIjogXCJAbWludWkvd3hjLXRhYi9wYW5lbFwiLFxuICAgICAgXCJ3eGMtbG9hZG1vcmVcIjogXCJAbWludWkvd3hjLWxvYWRtb3JlXCIsXG4gICAgICBcInd4Yy1sb2FkaW5nXCI6IFwiQG1pbnVpL3d4Yy1sb2FkaW5nXCJcbiAgICB9XG4gIH0sXG4gIGRhdGE6IHtcbiAgICAkbG9hZGluZzoge1xuICAgICAgaXNTaG93OiB0cnVlXG4gICAgfSxcbiAgICBzdHlsZTogXCJiYWNrZ3JvdW5kOiAjZmZmO2JvcmRlci1yYWRpdXM6IDY2cnB4O2NvbG9yOiAjMDAwO1wiLFxuICAgIG5lYXJMaW5lSW5mbzogR2xvYmFsLmdldFZhbCgnTkVBUkxJTkVJTkZPJylcbiAgfSxcbiAgLyoqIG5vdGU6IOWcqCB3eHAg5paH5Lu25oiW6ICF6aG16Z2i5paH5Lu25Lit6K+35Y675o6JIG1ldGhvZHMg5YyF6KOFICovXG4gIG9uTG9hZCAoKSB7XG5cbiAgfSxcbiAgZ2V0TmVhckxpbmUgKCkge1xuICAgIEdsb2JhbC5zZXRMb2NhdGlvbigpLnRoZW4obG9jYXRpb24gPT4ge1xuICAgICAgQnVzLmdldE5lYXJMaW5lKGxvY2F0aW9uKS50aGVuKHJlcyA9PiB7XG4gICAgICAgIGNvbnN0IHsgdGFicyB9ID0gdGhpcy5kYXRhO1xuICAgICAgICBjb25zdCBuZWFyTGluZUluZm8gPSBKU09OLnBhcnNlKHJlcy5kYXRhLmRhdGEpO1xuICAgICAgICBHbG9iYWwuc2V0VmFsKCdORUFSTElORUlORk8nLCBuZWFyTGluZUluZm8pXG4gICAgICAgIHRhYnNbMF0uY29udGVudCA9IG5lYXJMaW5lSW5mby5zbGljZSgwLCAyMCk7XG4gICAgICAgIHRoaXMuc2V0RGF0YSh7XG4gICAgICAgICAgbG9jYXRpb25JbmZvOiByZXMsXG4gICAgICAgICAgbmVhckxpbmVJbmZvLFxuICAgICAgICAgIHRhYnMsXG4gICAgICAgICAgJGxvYWRpbmc6IHtcbiAgICAgICAgICAgIGlzU2hvdzogZmFsc2VcbiAgICAgICAgICB9XG4gICAgICAgIH0pO1xuICAgICAgfSlcbiAgICB9KVxuICB9LFxuICBvblNoYXJlQXBwTWVzc2FnZSAocmVzKSB7XG4gICAgaWYgKHJlcy5mcm9tID09PSAnYnV0dG9uJykge1xuICAgICAgLy8g5p2l6Ieq6aG16Z2i5YaF6L2s5Y+R5oyJ6ZKuXG4gICAgICBjb25zb2xlLmxvZyhyZXMudGFyZ2V0KVxuICAgIH1cbiAgICByZXR1cm4ge1xuICAgICAgdGl0bGU6ICfoiJ/lsbHlhazkuqTlrp7ml7bmn6Xor6InLFxuICAgICAgcGF0aDogJ3BhZ2VzL2hvdHJvdXRlci9pbmRleCdcbiAgICB9XG4gIH1cbn0iXX0=