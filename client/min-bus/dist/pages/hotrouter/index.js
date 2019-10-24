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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImluZGV4Lnd4cCJdLCJuYW1lcyI6WyJkYXRhIiwiJGxvYWRpbmciLCJpc1Nob3ciLCJzdHlsZSIsIm5lYXJMaW5lSW5mbyIsIkdsb2JhbCIsImdldFZhbCIsIm9uTG9hZCIsImdldE5lYXJMaW5lIiwic2V0TG9jYXRpb24iLCJ0aGVuIiwiQnVzIiwibG9jYXRpb24iLCJ0YWJzIiwiSlNPTiIsInBhcnNlIiwicmVzIiwic2V0VmFsIiwiY29udGVudCIsInNsaWNlIiwic2V0RGF0YSIsImxvY2F0aW9uSW5mbyIsIm9uU2hhcmVBcHBNZXNzYWdlIiwiZnJvbSIsImNvbnNvbGUiLCJsb2ciLCJ0YXJnZXQiLCJ0aXRsZSIsInBhdGgiXSwibWFwcGluZ3MiOiI7Ozs7OztBQUFBOztBQUNBOztBQUNBOzs7O0FBQ0E7Ozs7OztBQUZtRDs7QUFvQmpEQSxRQUFNO0FBQUE7QUFBQTtBQUFBOztBQUNKQyxjQUFVO0FBQ1JDLGNBQVE7QUFEQSxLQUROO0FBSUpDLFdBQU8sb0RBSkg7QUFLSkMsa0JBQWNDLGlCQUFPQyxNQUFQLENBQWMsY0FBZDtBQUxWLEc7QUFPTjtBQUNBQyxRLG9CQUFVLENBRVQsQztBQUNEQyxhLHlCQUFlO0FBQUE7O0FBQ2JILHFCQUFPSSxXQUFQLEdBQXFCQyxJQUFyQixDQUEwQixvQkFBWTtBQUNwQ0Msb0JBQUlILFdBQUosQ0FBZ0JJLFFBQWhCLEVBQTBCRixJQUExQixDQUErQixlQUFPO0FBQUEsWUFDNUJHLElBRDRCLEdBQ25CLE1BQUtiLElBRGMsQ0FDNUJhLElBRDRCOztBQUVwQyxZQUFNVCxlQUFlVSxLQUFLQyxLQUFMLENBQVdDLElBQUloQixJQUFKLENBQVNBLElBQXBCLENBQXJCO0FBQ0FLLHlCQUFPWSxNQUFQLENBQWMsY0FBZCxFQUE4QmIsWUFBOUI7QUFDQVMsYUFBSyxDQUFMLEVBQVFLLE9BQVIsR0FBa0JkLGFBQWFlLEtBQWIsQ0FBbUIsQ0FBbkIsRUFBc0IsRUFBdEIsQ0FBbEI7QUFDQSxjQUFLQyxPQUFMLENBQWE7QUFDWEMsd0JBQWNMLEdBREg7QUFFWFosb0NBRlc7QUFHWFMsb0JBSFc7QUFJWFosb0JBQVU7QUFDUkMsb0JBQVE7QUFEQTtBQUpDLFNBQWI7QUFRRCxPQWJEO0FBY0QsS0FmRDtBQWdCRCxHO0FBQ0RvQixtQiw2QkFBbUJOLEcsRUFBSztBQUN0QixRQUFJQSxJQUFJTyxJQUFKLEtBQWEsUUFBakIsRUFBMkI7QUFDekI7QUFDQUMsY0FBUUMsR0FBUixDQUFZVCxJQUFJVSxNQUFoQjtBQUNEO0FBQ0QsV0FBTztBQUNMQyxhQUFPLFVBREY7QUFFTEMsWUFBTTtBQUZELEtBQVA7QUFJRCIsImZpbGUiOiJpbmRleC53eHAiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBIT1NUIH0gZnJvbSBcIi4uLy4uL2NvbW1vbi9jb25maWdcIjtcclxuaW1wb3J0IHsgZ2V0RGF0YSB9IGZyb20gXCIuLi8uLi9jb21tb24vYXBpL2NvbW1vblwiOyAvL+iAgeaOpeWPo1xyXG5pbXBvcnQgQnVzIGZyb20gXCIuLi8uLi9tb2RlbHMvYXBpXCI7XHJcbmltcG9ydCBHbG9iYWwgZnJvbSBcIi4uLy4uL21vZGVscy9nbG9iYWxcIjtcclxuZXhwb3J0IGRlZmF1bHQge1xyXG4gIGNvbmZpZzoge1xyXG4gICAgbmF2aWdhdGlvbkJhclRpdGxlVGV4dDogJ+eDremXqOe6v+i3rycsXHJcbiAgICBkaXNhYmxlU2Nyb2xsOiB0cnVlLFxyXG4gICAgdXNpbmdDb21wb25lbnRzOiB7XHJcbiAgICAgIFwibGF5b3V0LWhlYWRcIjogXCJsYXlvdXQvaGVhZFwiLFxyXG4gICAgICBcImxheW91dC1mb290XCI6IFwibGF5b3V0L2Zvb3RcIixcclxuICAgICAgXCJ3eGMtYnV0dG9uXCI6IFwiQG1pbnVpL3d4Yy1idXR0b25cIixcclxuICAgICAgXCJ3eGMtaWNvblwiOiBcIkBtaW51aS93eGMtaWNvblwiLFxyXG4gICAgICBcInd4Yy1zZWFyY2hcIjogXCJAbWludWkvd3hjLXNlYXJjaFwiLFxyXG4gICAgICBcImluZGV4LWNhcmRcIjogXCIuLi9jb21wb25lbnRzL2hvdC1jYXJkXCIsXHJcbiAgICAgIFwid3hjLXRhYlwiOiBcIkBtaW51aS93eGMtdGFiXCIsXHJcbiAgICAgIFwid3hjLXRhYi1wYW5lbFwiOiBcIkBtaW51aS93eGMtdGFiL3BhbmVsXCIsXHJcbiAgICAgIFwid3hjLWxvYWRtb3JlXCI6IFwiQG1pbnVpL3d4Yy1sb2FkbW9yZVwiLFxyXG4gICAgICBcInd4Yy1sb2FkaW5nXCI6IFwiQG1pbnVpL3d4Yy1sb2FkaW5nXCJcclxuICAgIH1cclxuICB9LFxyXG4gIGRhdGE6IHtcclxuICAgICRsb2FkaW5nOiB7XHJcbiAgICAgIGlzU2hvdzogdHJ1ZVxyXG4gICAgfSxcclxuICAgIHN0eWxlOiBcImJhY2tncm91bmQ6ICNmZmY7Ym9yZGVyLXJhZGl1czogNjZycHg7Y29sb3I6ICMwMDA7XCIsXHJcbiAgICBuZWFyTGluZUluZm86IEdsb2JhbC5nZXRWYWwoJ05FQVJMSU5FSU5GTycpXHJcbiAgfSxcclxuICAvKiogbm90ZTog5ZyoIHd4cCDmlofku7bmiJbogIXpobXpnaLmlofku7bkuK3or7fljrvmjokgbWV0aG9kcyDljIXoo4UgKi9cclxuICBvbkxvYWQgKCkge1xyXG5cclxuICB9LFxyXG4gIGdldE5lYXJMaW5lICgpIHtcclxuICAgIEdsb2JhbC5zZXRMb2NhdGlvbigpLnRoZW4obG9jYXRpb24gPT4ge1xyXG4gICAgICBCdXMuZ2V0TmVhckxpbmUobG9jYXRpb24pLnRoZW4ocmVzID0+IHtcclxuICAgICAgICBjb25zdCB7IHRhYnMgfSA9IHRoaXMuZGF0YTtcclxuICAgICAgICBjb25zdCBuZWFyTGluZUluZm8gPSBKU09OLnBhcnNlKHJlcy5kYXRhLmRhdGEpO1xyXG4gICAgICAgIEdsb2JhbC5zZXRWYWwoJ05FQVJMSU5FSU5GTycsIG5lYXJMaW5lSW5mbylcclxuICAgICAgICB0YWJzWzBdLmNvbnRlbnQgPSBuZWFyTGluZUluZm8uc2xpY2UoMCwgMjApO1xyXG4gICAgICAgIHRoaXMuc2V0RGF0YSh7XHJcbiAgICAgICAgICBsb2NhdGlvbkluZm86IHJlcyxcclxuICAgICAgICAgIG5lYXJMaW5lSW5mbyxcclxuICAgICAgICAgIHRhYnMsXHJcbiAgICAgICAgICAkbG9hZGluZzoge1xyXG4gICAgICAgICAgICBpc1Nob3c6IGZhbHNlXHJcbiAgICAgICAgICB9XHJcbiAgICAgICAgfSk7XHJcbiAgICAgIH0pXHJcbiAgICB9KVxyXG4gIH0sXHJcbiAgb25TaGFyZUFwcE1lc3NhZ2UgKHJlcykge1xyXG4gICAgaWYgKHJlcy5mcm9tID09PSAnYnV0dG9uJykge1xyXG4gICAgICAvLyDmnaXoh6rpobXpnaLlhoXovazlj5HmjInpkq5cclxuICAgICAgY29uc29sZS5sb2cocmVzLnRhcmdldClcclxuICAgIH1cclxuICAgIHJldHVybiB7XHJcbiAgICAgIHRpdGxlOiAn6Iif5bGx5YWs5Lqk5a6e5pe25p+l6K+iJyxcclxuICAgICAgcGF0aDogJ3BhZ2VzL2hvdHJvdXRlci9pbmRleCdcclxuICAgIH1cclxuICB9XHJcbn0iXX0=