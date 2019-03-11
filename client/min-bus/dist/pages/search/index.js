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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImluZGV4Lnd4cCJdLCJuYW1lcyI6WyJkYXRhIiwiJGxvYWRpbmciLCJpc1Nob3ciLCJhbGxMaW5lIiwiZmlsdGVyTGluZSIsIm9uTG9hZCIsImdldEFsbExpbmUiLCJzZXREYXRhIiwiQnVzIiwidGhlbiIsIkpTT04iLCJwYXJzZSIsInJlcyIsIm1hcCIsImxpbmVOYW1lIiwibSIsImxpbmVfbmFtZSIsImxpbmVObyIsImxpbmVfbm8iLCJvbklucHV0IiwiZSIsImZpbHRlciIsImluZGV4T2YiLCJkZXRhaWwiLCJ2YWx1ZSJdLCJtYXBwaW5ncyI6Ijs7Ozs7O0FBQUE7Ozs7Ozs7QUFhRUEsUUFBTTtBQUFBO0FBQUE7QUFBQTs7QUFDSkMsY0FBVTtBQUNSQyxjQUFRO0FBREEsS0FETjtBQUlKQyxhQUFTLEVBSkw7QUFLSkMsZ0JBQVk7QUFMUixHO0FBT05DLFEsb0JBQVU7QUFDUixTQUFLQyxVQUFMO0FBQ0QsRztBQUNEQSxZLHdCQUFjO0FBQUE7O0FBQ1osU0FBS0MsT0FBTCxDQUFhO0FBQ1hOLGdCQUFVO0FBQ1JDLGdCQUFRO0FBREE7QUFEQyxLQUFiO0FBS0FNLGtCQUFJRixVQUFKLEdBQWlCRyxJQUFqQixDQUFzQixlQUFPO0FBQzNCLFVBQUlOLFVBQVVPLEtBQUtDLEtBQUwsQ0FBV0MsSUFBSVosSUFBSixDQUFTQSxJQUFwQixDQUFkO0FBQ0FHLGdCQUFVQSxRQUFRVSxHQUFSLENBQVksYUFBSztBQUN6QixlQUFPO0FBQ0xDLG9CQUFVQyxFQUFFQyxTQURQO0FBRUxDLGtCQUFRRixFQUFFRztBQUZMLFNBQVA7QUFJRCxPQUxTLENBQVY7QUFNQSxZQUFLWCxPQUFMLENBQWE7QUFDWEosd0JBRFc7QUFFWEMsb0JBQVlELE9BRkQ7QUFHWEYsa0JBQVU7QUFDUkMsa0JBQVE7QUFEQTtBQUhDLE9BQWI7QUFPRCxLQWZEO0FBZ0JELEc7QUFDRGlCLFMsbUJBQVNDLEMsRUFBRztBQUNWLFFBQU1oQixhQUFhLEtBQUtKLElBQUwsQ0FBVUcsT0FBVixDQUFrQmtCLE1BQWxCLENBQXlCLGFBQUs7QUFDL0MsYUFBT04sRUFBRUQsUUFBRixDQUFXUSxPQUFYLENBQW1CRixFQUFFRyxNQUFGLENBQVNDLEtBQTVCLEtBQXNDLENBQTdDO0FBQ0QsS0FGa0IsQ0FBbkI7QUFHQSxTQUFLakIsT0FBTCxDQUFhO0FBQ1hIO0FBRFcsS0FBYjtBQUdEIiwiZmlsZSI6ImluZGV4Lnd4cCIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBCdXMgZnJvbSBcIi4uLy4uL21vZGVscy9hcGlcIjtcbmV4cG9ydCBkZWZhdWx0IHtcbiAgY29uZmlnOiB7XG4gICAgZGlzYWJsZVNjcm9sbDogdHJ1ZSxcbiAgICBuYXZpZ2F0aW9uQmFyVGl0bGVUZXh0OiAn5pCc57SiJyxcbiAgICB1c2luZ0NvbXBvbmVudHM6IHtcbiAgICAgICd3eGMtaWNvbic6ICdAbWludWkvd3hjLWljb24nLFxuICAgICAgJ3d4Yy1zZWFyY2gnOiAnQG1pbnVpL3d4Yy1zZWFyY2gnLFxuICAgICAgJ3JvYWQtbGlzdCc6ICcuLi9jb21wb25lbnRzL3JvYWQtbGlzdCcsXG4gICAgICBcInd4Yy1sb2FkaW5nXCI6IFwiQG1pbnVpL3d4Yy1sb2FkaW5nXCIsXG4gICAgICBcInd4Yy1sb2FkbW9yZVwiOiBcIkBtaW51aS93eGMtbG9hZG1vcmVcIixcbiAgICB9XG4gIH0sXG4gIGRhdGE6IHtcbiAgICAkbG9hZGluZzoge1xuICAgICAgaXNTaG93OiBmYWxzZVxuICAgIH0sXG4gICAgYWxsTGluZTogW10sXG4gICAgZmlsdGVyTGluZTogW11cbiAgfSxcbiAgb25Mb2FkICgpIHtcbiAgICB0aGlzLmdldEFsbExpbmUoKTtcbiAgfSxcbiAgZ2V0QWxsTGluZSAoKSB7XG4gICAgdGhpcy5zZXREYXRhKHtcbiAgICAgICRsb2FkaW5nOiB7XG4gICAgICAgIGlzU2hvdzogdHJ1ZVxuICAgICAgfVxuICAgIH0pO1xuICAgIEJ1cy5nZXRBbGxMaW5lKCkudGhlbihyZXMgPT4ge1xuICAgICAgbGV0IGFsbExpbmUgPSBKU09OLnBhcnNlKHJlcy5kYXRhLmRhdGEpXG4gICAgICBhbGxMaW5lID0gYWxsTGluZS5tYXAobSA9PiB7XG4gICAgICAgIHJldHVybiB7XG4gICAgICAgICAgbGluZU5hbWU6IG0ubGluZV9uYW1lLFxuICAgICAgICAgIGxpbmVObzogbS5saW5lX25vXG4gICAgICAgIH1cbiAgICAgIH0pXG4gICAgICB0aGlzLnNldERhdGEoe1xuICAgICAgICBhbGxMaW5lLFxuICAgICAgICBmaWx0ZXJMaW5lOiBhbGxMaW5lLFxuICAgICAgICAkbG9hZGluZzoge1xuICAgICAgICAgIGlzU2hvdzogZmFsc2VcbiAgICAgICAgfVxuICAgICAgfSlcbiAgICB9KVxuICB9LFxuICBvbklucHV0IChlKSB7XG4gICAgY29uc3QgZmlsdGVyTGluZSA9IHRoaXMuZGF0YS5hbGxMaW5lLmZpbHRlcihtID0+IHtcbiAgICAgIHJldHVybiBtLmxpbmVOYW1lLmluZGV4T2YoZS5kZXRhaWwudmFsdWUpID49IDA7XG4gICAgfSlcbiAgICB0aGlzLnNldERhdGEoe1xuICAgICAgZmlsdGVyTGluZVxuICAgIH0pXG4gIH1cbn0iXX0=