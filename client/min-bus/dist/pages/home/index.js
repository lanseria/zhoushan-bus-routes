"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _config = require("../../common/config.js");

var _common = require("../../common/api/common.js");

var _api = require("../../models/api.js");

var _api2 = _interopRequireDefault(_api);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

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
        _api2.default.getNearLine({
          lat: res.latitude,
          lng: res.longitude,
          length: 800
        }).then(function (res) {
          var tabs = _this.data.tabs;

          var nearLineInfo = JSON.parse(res.data.data);
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
        /**
         * 老接口
         */
        // getData(HOST + "/near_line", {
        //   lat: res.latitude,
        //   lng: res.longitude,
        //   length: 800
        // }).then(data => {
        //   const { tabs } = this.data;
        //   const nearLineInfo = JSON.parse(data.data);
        //   tabs[0].content = nearLineInfo.slice(0, 6);
        //   this.setData({
        //     locationInfo: res,
        //     nearLineInfo,
        //     tabs,
        //     $loading: {
        //       isShow: false
        //     }
        //   });
        // });
      }
    });
  }
}); //老接口
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImluZGV4Lnd4cCJdLCJuYW1lcyI6WyJkYXRhIiwiJGxvYWRpbmciLCJpc1Nob3ciLCJzdHlsZSIsImxvY2F0aW9uSW5mbyIsIm5lYXJMaW5lSW5mbyIsInRhYnMiLCJ0aXRsZSIsImNvbnRlbnQiLCJvbkxvYWQiLCJnZXROZWFyTGluZSIsIm9uQ2xpY2siLCJlIiwiY29uc29sZSIsImxvZyIsImRldGFpbCIsImNvbXBvbmVudElkIiwia2V5IiwiaGFuZGxlU2hvd1NlYXJjaFBhZ2UiLCJ3eCIsIm5hdmlnYXRlVG8iLCJ1cmwiLCJzZXREYXRhIiwiZ2V0TG9jYXRpb24iLCJ0eXBlIiwic3VjY2VzcyIsIkJ1cyIsImxhdCIsInJlcyIsImxhdGl0dWRlIiwibG5nIiwibG9uZ2l0dWRlIiwibGVuZ3RoIiwidGhlbiIsIkpTT04iLCJwYXJzZSIsInNsaWNlIl0sIm1hcHBpbmdzIjoiOzs7Ozs7QUFBQTs7QUFDQTs7QUFDQTs7Ozs7OztBQWdCRUEsUUFBTTtBQUFBO0FBQUE7QUFBQTs7QUFDSkMsY0FBVTtBQUNSQyxjQUFRO0FBREEsS0FETjtBQUlKQyxXQUFPLG9EQUpIO0FBS0pDLGtCQUFjLEVBTFY7QUFNSkMsa0JBQWMsRUFOVjtBQU9KQyxVQUFNLENBQ0osRUFBRUMsT0FBTyxJQUFULEVBQWVDLFNBQVMsRUFBeEIsRUFESSxFQUVKLEVBQUVELE9BQU8sSUFBVCxFQUFlQyxTQUFTLEVBQXhCLEVBRkksRUFHSixFQUFFRCxPQUFPLElBQVQsRUFBZUMsU0FBUyxFQUF4QixFQUhJO0FBUEYsRztBQWFOOztBQUVBQyxRLG9CQUFTO0FBQ1AsU0FBS0MsV0FBTDtBQUNELEc7O0FBQ0RDLFdBQVMsaUJBQVNDLENBQVQsRUFBWTtBQUNuQkMsWUFBUUMsR0FBUixrQkFDaUJGLEVBQUVHLE1BQUYsQ0FBU0MsV0FEMUIsc0JBQ3NESixFQUFFRyxNQUFGLENBQVNFLEdBRC9EO0FBR0QsRztBQUNEQyxzQixrQ0FBdUI7QUFDckJDLE9BQUdDLFVBQUgsQ0FBYztBQUNaQztBQURZLEtBQWQ7QUFHRCxHO0FBQ0RYLGEseUJBQWM7QUFBQTs7QUFDWixTQUFLWSxPQUFMLENBQWE7QUFDWHJCLGdCQUFVO0FBQ1JDLGdCQUFRO0FBREE7QUFEQyxLQUFiO0FBS0FpQixPQUFHSSxXQUFILENBQWU7QUFDYkMsWUFBTSxPQURPO0FBRWJDLGVBQVMsc0JBQU87QUFDZCxZQUFJekIsT0FBTyxFQUFYO0FBQ0EwQixzQkFBSWhCLFdBQUosQ0FBZ0I7QUFDZGlCLGVBQUtDLElBQUlDLFFBREs7QUFFZEMsZUFBS0YsSUFBSUcsU0FGSztBQUdkQyxrQkFBUTtBQUhNLFNBQWhCLEVBSUdDLElBSkgsQ0FJUSxlQUFPO0FBQUEsY0FDTDNCLElBREssR0FDSSxNQUFLTixJQURULENBQ0xNLElBREs7O0FBRWIsY0FBTUQsZUFBZTZCLEtBQUtDLEtBQUwsQ0FBV1AsSUFBSTVCLElBQUosQ0FBU0EsSUFBcEIsQ0FBckI7QUFDQU0sZUFBSyxDQUFMLEVBQVFFLE9BQVIsR0FBa0JILGFBQWErQixLQUFiLENBQW1CLENBQW5CLEVBQXNCLENBQXRCLENBQWxCO0FBQ0EsZ0JBQUtkLE9BQUwsQ0FBYTtBQUNYbEIsMEJBQWN3QixHQURIO0FBRVh2QixzQ0FGVztBQUdYQyxzQkFIVztBQUlYTCxzQkFBVTtBQUNSQyxzQkFBUTtBQURBO0FBSkMsV0FBYjtBQVFELFNBaEJEO0FBaUJBOzs7QUFHQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0Q7QUF6Q1ksS0FBZjtBQTJDRDtJQTlGZ0QiLCJmaWxlIjoiaW5kZXgud3hwIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgSE9TVCB9IGZyb20gXCIuLi8uLi9jb21tb24vY29uZmlnXCI7XG5pbXBvcnQgeyBnZXREYXRhIH0gZnJvbSBcIi4uLy4uL2NvbW1vbi9hcGkvY29tbW9uXCI7IC8v6ICB5o6l5Y+jXG5pbXBvcnQgQnVzIGZyb20gXCIuLi8uLi9tb2RlbHMvYXBpXCI7XG5cbmV4cG9ydCBkZWZhdWx0IHtcbiAgY29uZmlnOiB7XG4gICAgZGlzYWJsZVNjcm9sbDogdHJ1ZSxcbiAgICB1c2luZ0NvbXBvbmVudHM6IHtcbiAgICAgIFwid3hjLWJ1dHRvblwiOiBcIkBtaW51aS93eGMtYnV0dG9uXCIsXG4gICAgICBcInd4Yy1pY29uXCI6IFwiQG1pbnVpL3d4Yy1pY29uXCIsXG4gICAgICBcInd4Yy1zZWFyY2hcIjogXCJAbWludWkvd3hjLXNlYXJjaFwiLFxuICAgICAgXCJpbmRleC1jYXJkXCI6IFwiLi4vY29tcG9uZW50cy9pbmRleC1jYXJkXCIsXG4gICAgICBcInd4Yy10YWJcIjogXCJAbWludWkvd3hjLXRhYlwiLFxuICAgICAgXCJ3eGMtdGFiLXBhbmVsXCI6IFwiQG1pbnVpL3d4Yy10YWIvcGFuZWxcIixcbiAgICAgIFwid3hjLWxvYWRtb3JlXCI6IFwiQG1pbnVpL3d4Yy1sb2FkbW9yZVwiLFxuICAgICAgXCJ3eGMtbG9hZGluZ1wiOiBcIkBtaW51aS93eGMtbG9hZGluZ1wiXG4gICAgfVxuICB9LFxuICBkYXRhOiB7XG4gICAgJGxvYWRpbmc6IHtcbiAgICAgIGlzU2hvdzogZmFsc2VcbiAgICB9LFxuICAgIHN0eWxlOiBcImJhY2tncm91bmQ6ICNmZmY7Ym9yZGVyLXJhZGl1czogNjZycHg7Y29sb3I6ICMwMDA7XCIsXG4gICAgbG9jYXRpb25JbmZvOiB7fSxcbiAgICBuZWFyTGluZUluZm86IFtdLFxuICAgIHRhYnM6IFtcbiAgICAgIHsgdGl0bGU6IFwi5o6o6I2QXCIsIGNvbnRlbnQ6IFwiXCIgfSxcbiAgICAgIHsgdGl0bGU6IFwi5pS26JePXCIsIGNvbnRlbnQ6IFwiXCIgfSxcbiAgICAgIHsgdGl0bGU6IFwi5Y6G5Y+yXCIsIGNvbnRlbnQ6IFwiXCIgfVxuICAgIF1cbiAgfSxcbiAgLyoqIG5vdGU6IOWcqCB3eHAg5paH5Lu25oiW6ICF6aG16Z2i5paH5Lu25Lit6K+35Y675o6JIG1ldGhvZHMg5YyF6KOFICovXG5cbiAgb25Mb2FkKCkge1xuICAgIHRoaXMuZ2V0TmVhckxpbmUoKTtcbiAgfSxcbiAgb25DbGljazogZnVuY3Rpb24oZSkge1xuICAgIGNvbnNvbGUubG9nKFxuICAgICAgYENvbXBvbmVudElkOiR7ZS5kZXRhaWwuY29tcG9uZW50SWR9LHlvdSBzZWxlY3RlZDoke2UuZGV0YWlsLmtleX1gXG4gICAgKTtcbiAgfSxcbiAgaGFuZGxlU2hvd1NlYXJjaFBhZ2UoKSB7XG4gICAgd3gubmF2aWdhdGVUbyh7XG4gICAgICB1cmw6IGAvcGFnZXMvc2VhcmNoL2luZGV4YFxuICAgIH0pXG4gIH0sXG4gIGdldE5lYXJMaW5lKCkge1xuICAgIHRoaXMuc2V0RGF0YSh7XG4gICAgICAkbG9hZGluZzoge1xuICAgICAgICBpc1Nob3c6IHRydWVcbiAgICAgIH1cbiAgICB9KTtcbiAgICB3eC5nZXRMb2NhdGlvbih7XG4gICAgICB0eXBlOiBcIndnczg0XCIsXG4gICAgICBzdWNjZXNzOiByZXMgPT4ge1xuICAgICAgICBsZXQgZGF0YSA9IHt9O1xuICAgICAgICBCdXMuZ2V0TmVhckxpbmUoe1xuICAgICAgICAgIGxhdDogcmVzLmxhdGl0dWRlLFxuICAgICAgICAgIGxuZzogcmVzLmxvbmdpdHVkZSxcbiAgICAgICAgICBsZW5ndGg6IDgwMFxuICAgICAgICB9KS50aGVuKHJlcyA9PiB7XG4gICAgICAgICAgY29uc3QgeyB0YWJzIH0gPSB0aGlzLmRhdGE7XG4gICAgICAgICAgY29uc3QgbmVhckxpbmVJbmZvID0gSlNPTi5wYXJzZShyZXMuZGF0YS5kYXRhKTtcbiAgICAgICAgICB0YWJzWzBdLmNvbnRlbnQgPSBuZWFyTGluZUluZm8uc2xpY2UoMCwgNik7XG4gICAgICAgICAgdGhpcy5zZXREYXRhKHtcbiAgICAgICAgICAgIGxvY2F0aW9uSW5mbzogcmVzLFxuICAgICAgICAgICAgbmVhckxpbmVJbmZvLFxuICAgICAgICAgICAgdGFicyxcbiAgICAgICAgICAgICRsb2FkaW5nOiB7XG4gICAgICAgICAgICAgIGlzU2hvdzogZmFsc2VcbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9KTtcbiAgICAgICAgfSlcbiAgICAgICAgLyoqXG4gICAgICAgICAqIOiAgeaOpeWPo1xuICAgICAgICAgKi9cbiAgICAgICAgLy8gZ2V0RGF0YShIT1NUICsgXCIvbmVhcl9saW5lXCIsIHtcbiAgICAgICAgLy8gICBsYXQ6IHJlcy5sYXRpdHVkZSxcbiAgICAgICAgLy8gICBsbmc6IHJlcy5sb25naXR1ZGUsXG4gICAgICAgIC8vICAgbGVuZ3RoOiA4MDBcbiAgICAgICAgLy8gfSkudGhlbihkYXRhID0+IHtcbiAgICAgICAgLy8gICBjb25zdCB7IHRhYnMgfSA9IHRoaXMuZGF0YTtcbiAgICAgICAgLy8gICBjb25zdCBuZWFyTGluZUluZm8gPSBKU09OLnBhcnNlKGRhdGEuZGF0YSk7XG4gICAgICAgIC8vICAgdGFic1swXS5jb250ZW50ID0gbmVhckxpbmVJbmZvLnNsaWNlKDAsIDYpO1xuICAgICAgICAvLyAgIHRoaXMuc2V0RGF0YSh7XG4gICAgICAgIC8vICAgICBsb2NhdGlvbkluZm86IHJlcyxcbiAgICAgICAgLy8gICAgIG5lYXJMaW5lSW5mbyxcbiAgICAgICAgLy8gICAgIHRhYnMsXG4gICAgICAgIC8vICAgICAkbG9hZGluZzoge1xuICAgICAgICAvLyAgICAgICBpc1Nob3c6IGZhbHNlXG4gICAgICAgIC8vICAgICB9XG4gICAgICAgIC8vICAgfSk7XG4gICAgICAgIC8vIH0pO1xuICAgICAgfVxuICAgIH0pO1xuICB9XG59OyJdfQ==