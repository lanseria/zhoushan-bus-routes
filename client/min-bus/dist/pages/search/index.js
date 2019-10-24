'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _api = require('../../models/api.js');

var _api2 = _interopRequireDefault(_api);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = Page({
  data: {
    '__code__': {
      readme: ''
    },

    $loading: {
      isShow: false
    },
    allLine: [],
    filterLine: []
  },
  onLoad: function onLoad() {
    this.getAllLine();
  },
  getAllLine: function getAllLine() {
    var _this = this;

    this.setData({
      $loading: {
        isShow: true
      }
    });
    _api2.default.getAllLine().then(function (res) {
      var allLine = JSON.parse(res.data.data);
      allLine = allLine.map(function (m) {
        return {
          lineName: m.line_name,
          lineNo: m.line_no
        };
      });
      _this.setData({
        allLine: allLine,
        filterLine: allLine,
        $loading: {
          isShow: false
        }
      });
    });
  },
  onInput: function onInput(e) {
    var filterLine = this.data.allLine.filter(function (m) {
      return m.lineName.indexOf(e.detail.value) >= 0;
    });
    this.setData({
      filterLine: filterLine
    });
  }
});
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImluZGV4Lnd4cCJdLCJuYW1lcyI6WyJkYXRhIiwiJGxvYWRpbmciLCJpc1Nob3ciLCJhbGxMaW5lIiwiZmlsdGVyTGluZSIsIm9uTG9hZCIsImdldEFsbExpbmUiLCJzZXREYXRhIiwiQnVzIiwidGhlbiIsIkpTT04iLCJwYXJzZSIsInJlcyIsIm1hcCIsImxpbmVOYW1lIiwibSIsImxpbmVfbmFtZSIsImxpbmVObyIsImxpbmVfbm8iLCJvbklucHV0IiwiZSIsImZpbHRlciIsImluZGV4T2YiLCJkZXRhaWwiLCJ2YWx1ZSJdLCJtYXBwaW5ncyI6Ijs7Ozs7O0FBQUE7Ozs7Ozs7QUFhRUEsUUFBTTtBQUFBO0FBQUE7QUFBQTs7QUFDSkMsY0FBVTtBQUNSQyxjQUFRO0FBREEsS0FETjtBQUlKQyxhQUFTLEVBSkw7QUFLSkMsZ0JBQVk7QUFMUixHO0FBT05DLFEsb0JBQVU7QUFDUixTQUFLQyxVQUFMO0FBQ0QsRztBQUNEQSxZLHdCQUFjO0FBQUE7O0FBQ1osU0FBS0MsT0FBTCxDQUFhO0FBQ1hOLGdCQUFVO0FBQ1JDLGdCQUFRO0FBREE7QUFEQyxLQUFiO0FBS0FNLGtCQUFJRixVQUFKLEdBQWlCRyxJQUFqQixDQUFzQixlQUFPO0FBQzNCLFVBQUlOLFVBQVVPLEtBQUtDLEtBQUwsQ0FBV0MsSUFBSVosSUFBSixDQUFTQSxJQUFwQixDQUFkO0FBQ0FHLGdCQUFVQSxRQUFRVSxHQUFSLENBQVksYUFBSztBQUN6QixlQUFPO0FBQ0xDLG9CQUFVQyxFQUFFQyxTQURQO0FBRUxDLGtCQUFRRixFQUFFRztBQUZMLFNBQVA7QUFJRCxPQUxTLENBQVY7QUFNQSxZQUFLWCxPQUFMLENBQWE7QUFDWEosd0JBRFc7QUFFWEMsb0JBQVlELE9BRkQ7QUFHWEYsa0JBQVU7QUFDUkMsa0JBQVE7QUFEQTtBQUhDLE9BQWI7QUFPRCxLQWZEO0FBZ0JELEc7QUFDRGlCLFMsbUJBQVNDLEMsRUFBRztBQUNWLFFBQU1oQixhQUFhLEtBQUtKLElBQUwsQ0FBVUcsT0FBVixDQUFrQmtCLE1BQWxCLENBQXlCLGFBQUs7QUFDL0MsYUFBT04sRUFBRUQsUUFBRixDQUFXUSxPQUFYLENBQW1CRixFQUFFRyxNQUFGLENBQVNDLEtBQTVCLEtBQXNDLENBQTdDO0FBQ0QsS0FGa0IsQ0FBbkI7QUFHQSxTQUFLakIsT0FBTCxDQUFhO0FBQ1hIO0FBRFcsS0FBYjtBQUdEIiwiZmlsZSI6ImluZGV4Lnd4cCIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBCdXMgZnJvbSBcIi4uLy4uL21vZGVscy9hcGlcIjtcclxuZXhwb3J0IGRlZmF1bHQge1xyXG4gIGNvbmZpZzoge1xyXG4gICAgZGlzYWJsZVNjcm9sbDogdHJ1ZSxcclxuICAgIG5hdmlnYXRpb25CYXJUaXRsZVRleHQ6ICfmkJzntKInLFxyXG4gICAgdXNpbmdDb21wb25lbnRzOiB7XHJcbiAgICAgICd3eGMtaWNvbic6ICdAbWludWkvd3hjLWljb24nLFxyXG4gICAgICAnd3hjLXNlYXJjaCc6ICdAbWludWkvd3hjLXNlYXJjaCcsXHJcbiAgICAgICdyb2FkLWxpc3QnOiAnLi4vY29tcG9uZW50cy9yb2FkLWxpc3QnLFxyXG4gICAgICBcInd4Yy1sb2FkaW5nXCI6IFwiQG1pbnVpL3d4Yy1sb2FkaW5nXCIsXHJcbiAgICAgIFwid3hjLWxvYWRtb3JlXCI6IFwiQG1pbnVpL3d4Yy1sb2FkbW9yZVwiLFxyXG4gICAgfVxyXG4gIH0sXHJcbiAgZGF0YToge1xyXG4gICAgJGxvYWRpbmc6IHtcclxuICAgICAgaXNTaG93OiBmYWxzZVxyXG4gICAgfSxcclxuICAgIGFsbExpbmU6IFtdLFxyXG4gICAgZmlsdGVyTGluZTogW11cclxuICB9LFxyXG4gIG9uTG9hZCAoKSB7XHJcbiAgICB0aGlzLmdldEFsbExpbmUoKTtcclxuICB9LFxyXG4gIGdldEFsbExpbmUgKCkge1xyXG4gICAgdGhpcy5zZXREYXRhKHtcclxuICAgICAgJGxvYWRpbmc6IHtcclxuICAgICAgICBpc1Nob3c6IHRydWVcclxuICAgICAgfVxyXG4gICAgfSk7XHJcbiAgICBCdXMuZ2V0QWxsTGluZSgpLnRoZW4ocmVzID0+IHtcclxuICAgICAgbGV0IGFsbExpbmUgPSBKU09OLnBhcnNlKHJlcy5kYXRhLmRhdGEpXHJcbiAgICAgIGFsbExpbmUgPSBhbGxMaW5lLm1hcChtID0+IHtcclxuICAgICAgICByZXR1cm4ge1xyXG4gICAgICAgICAgbGluZU5hbWU6IG0ubGluZV9uYW1lLFxyXG4gICAgICAgICAgbGluZU5vOiBtLmxpbmVfbm9cclxuICAgICAgICB9XHJcbiAgICAgIH0pXHJcbiAgICAgIHRoaXMuc2V0RGF0YSh7XHJcbiAgICAgICAgYWxsTGluZSxcclxuICAgICAgICBmaWx0ZXJMaW5lOiBhbGxMaW5lLFxyXG4gICAgICAgICRsb2FkaW5nOiB7XHJcbiAgICAgICAgICBpc1Nob3c6IGZhbHNlXHJcbiAgICAgICAgfVxyXG4gICAgICB9KVxyXG4gICAgfSlcclxuICB9LFxyXG4gIG9uSW5wdXQgKGUpIHtcclxuICAgIGNvbnN0IGZpbHRlckxpbmUgPSB0aGlzLmRhdGEuYWxsTGluZS5maWx0ZXIobSA9PiB7XHJcbiAgICAgIHJldHVybiBtLmxpbmVOYW1lLmluZGV4T2YoZS5kZXRhaWwudmFsdWUpID49IDA7XHJcbiAgICB9KVxyXG4gICAgdGhpcy5zZXREYXRhKHtcclxuICAgICAgZmlsdGVyTGluZVxyXG4gICAgfSlcclxuICB9XHJcbn0iXX0=