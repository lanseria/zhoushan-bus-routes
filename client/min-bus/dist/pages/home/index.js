"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _config = require("../../common/config.js");

var _common = require("../../common/api/common.js");

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
    wx.getLocation({
      type: "wgs84",
      success: function success(res) {
        var data = {};
        (0, _common.getData)(_config.HOST + "/near_line", {
          lat: res.latitude,
          lng: res.longitude,
          length: 800
        }).then(function (data) {
          var tabs = _this.data.tabs;

          var nearLineInfo = JSON.parse(data.data);
          tabs[0].content = nearLineInfo.slice(0, 6);
          _this.setData({
            locationInfo: res,
            nearLineInfo: nearLineInfo,
            tabs: tabs,
            $loading: {
              isShow: false
            }
          });
        });
      }
    });
  }
});
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImluZGV4Lnd4cCJdLCJuYW1lcyI6WyJkYXRhIiwiJGxvYWRpbmciLCJpc1Nob3ciLCJzdHlsZSIsImxvY2F0aW9uSW5mbyIsIm5lYXJMaW5lSW5mbyIsInRhYnMiLCJ0aXRsZSIsImNvbnRlbnQiLCJvbkxvYWQiLCJnZXROZWFyTGluZSIsIm9uQ2xpY2siLCJlIiwiY29uc29sZSIsImxvZyIsImRldGFpbCIsImNvbXBvbmVudElkIiwia2V5IiwiaGFuZGxlU2hvd1NlYXJjaFBhZ2UiLCJ3eCIsIm5hdmlnYXRlVG8iLCJ1cmwiLCJzZXREYXRhIiwiZ2V0TG9jYXRpb24iLCJ0eXBlIiwic3VjY2VzcyIsIkhPU1QiLCJsYXQiLCJyZXMiLCJsYXRpdHVkZSIsImxuZyIsImxvbmdpdHVkZSIsImxlbmd0aCIsInRoZW4iLCJKU09OIiwicGFyc2UiLCJzbGljZSJdLCJtYXBwaW5ncyI6Ijs7Ozs7O0FBQUE7O0FBQ0E7OztBQWdCRUEsUUFBTTtBQUFBO0FBQUE7QUFBQTs7QUFDSkMsY0FBVTtBQUNSQyxjQUFRO0FBREEsS0FETjtBQUlKQyxXQUFPLG9EQUpIO0FBS0pDLGtCQUFjLEVBTFY7QUFNSkMsa0JBQWMsRUFOVjtBQU9KQyxVQUFNLENBQ0osRUFBRUMsT0FBTyxJQUFULEVBQWVDLFNBQVMsRUFBeEIsRUFESSxFQUVKLEVBQUVELE9BQU8sSUFBVCxFQUFlQyxTQUFTLEVBQXhCLEVBRkksRUFHSixFQUFFRCxPQUFPLElBQVQsRUFBZUMsU0FBUyxFQUF4QixFQUhJO0FBUEYsRztBQWFOOztBQUVBQyxRLG9CQUFTO0FBQ1AsU0FBS0MsV0FBTDtBQUNELEc7O0FBQ0RDLFdBQVMsaUJBQVNDLENBQVQsRUFBWTtBQUNuQkMsWUFBUUMsR0FBUixrQkFDaUJGLEVBQUVHLE1BQUYsQ0FBU0MsV0FEMUIsc0JBQ3NESixFQUFFRyxNQUFGLENBQVNFLEdBRC9EO0FBR0QsRztBQUNEQyxzQixrQ0FBdUI7QUFDckJDLE9BQUdDLFVBQUgsQ0FBYztBQUNaQztBQURZLEtBQWQ7QUFHRCxHO0FBQ0RYLGEseUJBQWM7QUFBQTs7QUFDWixTQUFLWSxPQUFMLENBQWE7QUFDWHJCLGdCQUFVO0FBQ1JDLGdCQUFRO0FBREE7QUFEQyxLQUFiO0FBS0FpQixPQUFHSSxXQUFILENBQWU7QUFDYkMsWUFBTSxPQURPO0FBRWJDLGVBQVMsc0JBQU87QUFDZCxZQUFJekIsT0FBTyxFQUFYO0FBQ0EsNkJBQVEwQixlQUFPLFlBQWYsRUFBNkI7QUFDM0JDLGVBQUtDLElBQUlDLFFBRGtCO0FBRTNCQyxlQUFLRixJQUFJRyxTQUZrQjtBQUczQkMsa0JBQVE7QUFIbUIsU0FBN0IsRUFJR0MsSUFKSCxDQUlRLGdCQUFRO0FBQUEsY0FDTjNCLElBRE0sR0FDRyxNQUFLTixJQURSLENBQ05NLElBRE07O0FBRWQsY0FBTUQsZUFBZTZCLEtBQUtDLEtBQUwsQ0FBV25DLEtBQUtBLElBQWhCLENBQXJCO0FBQ0FNLGVBQUssQ0FBTCxFQUFRRSxPQUFSLEdBQWtCSCxhQUFhK0IsS0FBYixDQUFtQixDQUFuQixFQUFzQixDQUF0QixDQUFsQjtBQUNBLGdCQUFLZCxPQUFMLENBQWE7QUFDWGxCLDBCQUFjd0IsR0FESDtBQUVYdkIsc0NBRlc7QUFHWEMsc0JBSFc7QUFJWEwsc0JBQVU7QUFDUkMsc0JBQVE7QUFEQTtBQUpDLFdBQWI7QUFRRCxTQWhCRDtBQWlCRDtBQXJCWSxLQUFmO0FBdUJEIiwiZmlsZSI6ImluZGV4Lnd4cCIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IEhPU1QgfSBmcm9tIFwiLi4vLi4vY29tbW9uL2NvbmZpZ1wiO1xuaW1wb3J0IHsgZ2V0RGF0YSB9IGZyb20gXCIuLi8uLi9jb21tb24vYXBpL2NvbW1vblwiO1xuXG5leHBvcnQgZGVmYXVsdCB7XG4gIGNvbmZpZzoge1xuICAgIGRpc2FibGVTY3JvbGw6IHRydWUsXG4gICAgdXNpbmdDb21wb25lbnRzOiB7XG4gICAgICBcInd4Yy1idXR0b25cIjogXCJAbWludWkvd3hjLWJ1dHRvblwiLFxuICAgICAgXCJ3eGMtaWNvblwiOiBcIkBtaW51aS93eGMtaWNvblwiLFxuICAgICAgXCJ3eGMtc2VhcmNoXCI6IFwiQG1pbnVpL3d4Yy1zZWFyY2hcIixcbiAgICAgIFwiaW5kZXgtY2FyZFwiOiBcIi4uL2NvbXBvbmVudHMvaW5kZXgtY2FyZFwiLFxuICAgICAgXCJ3eGMtdGFiXCI6IFwiQG1pbnVpL3d4Yy10YWJcIixcbiAgICAgIFwid3hjLXRhYi1wYW5lbFwiOiBcIkBtaW51aS93eGMtdGFiL3BhbmVsXCIsXG4gICAgICBcInd4Yy1sb2FkbW9yZVwiOiBcIkBtaW51aS93eGMtbG9hZG1vcmVcIixcbiAgICAgIFwid3hjLWxvYWRpbmdcIjogXCJAbWludWkvd3hjLWxvYWRpbmdcIlxuICAgIH1cbiAgfSxcbiAgZGF0YToge1xuICAgICRsb2FkaW5nOiB7XG4gICAgICBpc1Nob3c6IGZhbHNlXG4gICAgfSxcbiAgICBzdHlsZTogXCJiYWNrZ3JvdW5kOiAjZmZmO2JvcmRlci1yYWRpdXM6IDY2cnB4O2NvbG9yOiAjMDAwO1wiLFxuICAgIGxvY2F0aW9uSW5mbzoge30sXG4gICAgbmVhckxpbmVJbmZvOiBbXSxcbiAgICB0YWJzOiBbXG4gICAgICB7IHRpdGxlOiBcIuaOqOiNkFwiLCBjb250ZW50OiBcIlwiIH0sXG4gICAgICB7IHRpdGxlOiBcIuaUtuiXj1wiLCBjb250ZW50OiBcIlwiIH0sXG4gICAgICB7IHRpdGxlOiBcIuWOhuWPslwiLCBjb250ZW50OiBcIlwiIH1cbiAgICBdXG4gIH0sXG4gIC8qKiBub3RlOiDlnKggd3hwIOaWh+S7tuaIluiAhemhtemdouaWh+S7tuS4reivt+WOu+aOiSBtZXRob2RzIOWMheijhSAqL1xuXG4gIG9uTG9hZCgpIHtcbiAgICB0aGlzLmdldE5lYXJMaW5lKCk7XG4gIH0sXG4gIG9uQ2xpY2s6IGZ1bmN0aW9uKGUpIHtcbiAgICBjb25zb2xlLmxvZyhcbiAgICAgIGBDb21wb25lbnRJZDoke2UuZGV0YWlsLmNvbXBvbmVudElkfSx5b3Ugc2VsZWN0ZWQ6JHtlLmRldGFpbC5rZXl9YFxuICAgICk7XG4gIH0sXG4gIGhhbmRsZVNob3dTZWFyY2hQYWdlKCkge1xuICAgIHd4Lm5hdmlnYXRlVG8oe1xuICAgICAgdXJsOiBgL3BhZ2VzL3NlYXJjaC9pbmRleGBcbiAgICB9KVxuICB9LFxuICBnZXROZWFyTGluZSgpIHtcbiAgICB0aGlzLnNldERhdGEoe1xuICAgICAgJGxvYWRpbmc6IHtcbiAgICAgICAgaXNTaG93OiB0cnVlXG4gICAgICB9XG4gICAgfSk7XG4gICAgd3guZ2V0TG9jYXRpb24oe1xuICAgICAgdHlwZTogXCJ3Z3M4NFwiLFxuICAgICAgc3VjY2VzczogcmVzID0+IHtcbiAgICAgICAgbGV0IGRhdGEgPSB7fTtcbiAgICAgICAgZ2V0RGF0YShIT1NUICsgXCIvbmVhcl9saW5lXCIsIHtcbiAgICAgICAgICBsYXQ6IHJlcy5sYXRpdHVkZSxcbiAgICAgICAgICBsbmc6IHJlcy5sb25naXR1ZGUsXG4gICAgICAgICAgbGVuZ3RoOiA4MDBcbiAgICAgICAgfSkudGhlbihkYXRhID0+IHtcbiAgICAgICAgICBjb25zdCB7IHRhYnMgfSA9IHRoaXMuZGF0YTtcbiAgICAgICAgICBjb25zdCBuZWFyTGluZUluZm8gPSBKU09OLnBhcnNlKGRhdGEuZGF0YSk7XG4gICAgICAgICAgdGFic1swXS5jb250ZW50ID0gbmVhckxpbmVJbmZvLnNsaWNlKDAsIDYpO1xuICAgICAgICAgIHRoaXMuc2V0RGF0YSh7XG4gICAgICAgICAgICBsb2NhdGlvbkluZm86IHJlcyxcbiAgICAgICAgICAgIG5lYXJMaW5lSW5mbyxcbiAgICAgICAgICAgIHRhYnMsXG4gICAgICAgICAgICAkbG9hZGluZzoge1xuICAgICAgICAgICAgICBpc1Nob3c6IGZhbHNlXG4gICAgICAgICAgICB9XG4gICAgICAgICAgfSk7XG4gICAgICAgIH0pO1xuICAgICAgfVxuICAgIH0pO1xuICB9XG59OyJdfQ==