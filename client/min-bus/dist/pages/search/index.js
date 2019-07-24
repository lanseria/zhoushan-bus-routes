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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImluZGV4Lnd4cCJdLCJuYW1lcyI6WyJkYXRhIiwiJGxvYWRpbmciLCJpc1Nob3ciLCJhbGxMaW5lIiwiZmlsdGVyTGluZSIsIm9uTG9hZCIsImdldEFsbExpbmUiLCJzZXREYXRhIiwiQnVzIiwidGhlbiIsIkpTT04iLCJwYXJzZSIsInJlcyIsIm1hcCIsImxpbmVOYW1lIiwibSIsImxpbmVfbmFtZSIsImxpbmVObyIsImxpbmVfbm8iLCJvbklucHV0IiwiZSIsImZpbHRlciIsImluZGV4T2YiLCJkZXRhaWwiLCJ2YWx1ZSJdLCJtYXBwaW5ncyI6Ijs7Ozs7O0FBQUE7Ozs7Ozs7QUFZRUEsUUFBTTtBQUFBO0FBQUE7QUFBQTs7QUFDSkMsY0FBVTtBQUNSQyxjQUFRO0FBREEsS0FETjtBQUlKQyxhQUFTLEVBSkw7QUFLSkMsZ0JBQVk7QUFMUixHO0FBT05DLFEsb0JBQVU7QUFDUixTQUFLQyxVQUFMO0FBQ0QsRztBQUNEQSxZLHdCQUFjO0FBQUE7O0FBQ1osU0FBS0MsT0FBTCxDQUFhO0FBQ1hOLGdCQUFVO0FBQ1JDLGdCQUFRO0FBREE7QUFEQyxLQUFiO0FBS0FNLGtCQUFJRixVQUFKLEdBQWlCRyxJQUFqQixDQUFzQixlQUFPO0FBQzNCLFVBQUlOLFVBQVVPLEtBQUtDLEtBQUwsQ0FBV0MsSUFBSVosSUFBSixDQUFTQSxJQUFwQixDQUFkO0FBQ0FHLGdCQUFVQSxRQUFRVSxHQUFSLENBQVksYUFBSztBQUN6QixlQUFPO0FBQ0xDLG9CQUFVQyxFQUFFQyxTQURQO0FBRUxDLGtCQUFRRixFQUFFRztBQUZMLFNBQVA7QUFJRCxPQUxTLENBQVY7QUFNQSxZQUFLWCxPQUFMLENBQWE7QUFDWEosd0JBRFc7QUFFWEMsb0JBQVlELE9BRkQ7QUFHWEYsa0JBQVU7QUFDUkMsa0JBQVE7QUFEQTtBQUhDLE9BQWI7QUFPRCxLQWZEO0FBZ0JELEc7QUFDRGlCLFMsbUJBQVNDLEMsRUFBRztBQUNWLFFBQU1oQixhQUFhLEtBQUtKLElBQUwsQ0FBVUcsT0FBVixDQUFrQmtCLE1BQWxCLENBQXlCLGFBQUs7QUFDL0MsYUFBT04sRUFBRUQsUUFBRixDQUFXUSxPQUFYLENBQW1CRixFQUFFRyxNQUFGLENBQVNDLEtBQTVCLEtBQXNDLENBQTdDO0FBQ0QsS0FGa0IsQ0FBbkI7QUFHQSxTQUFLakIsT0FBTCxDQUFhO0FBQ1hIO0FBRFcsS0FBYjtBQUdEIiwiZmlsZSI6ImluZGV4Lnd4cCIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBCdXMgZnJvbSBcIi4uLy4uL21vZGVscy9hcGlcIjtcbmV4cG9ydCBkZWZhdWx0IHtcbiAgY29uZmlnOiB7XG4gICAgZGlzYWJsZVNjcm9sbDogdHJ1ZSxcbiAgICBuYXZpZ2F0aW9uQmFyVGl0bGVUZXh0OiAn5pCc57SiJyxcbiAgICB1c2luZ0NvbXBvbmVudHM6IHtcbiAgICAgICd3eGMtaWNvbic6ICdAbWludWkvd3hjLWljb24nLFxuICAgICAgJ3d4Yy1zZWFyY2gnOiAnQG1pbnVpL3d4Yy1zZWFyY2gnLFxuICAgICAgXCJ3eGMtbG9hZGluZ1wiOiBcIkBtaW51aS93eGMtbG9hZGluZ1wiLFxuICAgICAgXCJ3eGMtbG9hZG1vcmVcIjogXCJAbWludWkvd3hjLWxvYWRtb3JlXCIsXG4gICAgfVxuICB9LFxuICBkYXRhOiB7XG4gICAgJGxvYWRpbmc6IHtcbiAgICAgIGlzU2hvdzogZmFsc2VcbiAgICB9LFxuICAgIGFsbExpbmU6IFtdLFxuICAgIGZpbHRlckxpbmU6IFtdXG4gIH0sXG4gIG9uTG9hZCAoKSB7XG4gICAgdGhpcy5nZXRBbGxMaW5lKCk7XG4gIH0sXG4gIGdldEFsbExpbmUgKCkge1xuICAgIHRoaXMuc2V0RGF0YSh7XG4gICAgICAkbG9hZGluZzoge1xuICAgICAgICBpc1Nob3c6IHRydWVcbiAgICAgIH1cbiAgICB9KTtcbiAgICBCdXMuZ2V0QWxsTGluZSgpLnRoZW4ocmVzID0+IHtcbiAgICAgIGxldCBhbGxMaW5lID0gSlNPTi5wYXJzZShyZXMuZGF0YS5kYXRhKVxuICAgICAgYWxsTGluZSA9IGFsbExpbmUubWFwKG0gPT4ge1xuICAgICAgICByZXR1cm4ge1xuICAgICAgICAgIGxpbmVOYW1lOiBtLmxpbmVfbmFtZSxcbiAgICAgICAgICBsaW5lTm86IG0ubGluZV9ub1xuICAgICAgICB9XG4gICAgICB9KVxuICAgICAgdGhpcy5zZXREYXRhKHtcbiAgICAgICAgYWxsTGluZSxcbiAgICAgICAgZmlsdGVyTGluZTogYWxsTGluZSxcbiAgICAgICAgJGxvYWRpbmc6IHtcbiAgICAgICAgICBpc1Nob3c6IGZhbHNlXG4gICAgICAgIH1cbiAgICAgIH0pXG4gICAgfSlcbiAgfSxcbiAgb25JbnB1dCAoZSkge1xuICAgIGNvbnN0IGZpbHRlckxpbmUgPSB0aGlzLmRhdGEuYWxsTGluZS5maWx0ZXIobSA9PiB7XG4gICAgICByZXR1cm4gbS5saW5lTmFtZS5pbmRleE9mKGUuZGV0YWlsLnZhbHVlKSA+PSAwO1xuICAgIH0pXG4gICAgdGhpcy5zZXREYXRhKHtcbiAgICAgIGZpbHRlckxpbmVcbiAgICB9KVxuICB9XG59Il19