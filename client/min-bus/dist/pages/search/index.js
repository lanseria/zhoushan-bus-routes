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
      return m.line_name.indexOf(e.detail.value) >= 0;
    });
    this.setData({
      filterLine: filterLine
    });
  }
});
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImluZGV4Lnd4cCJdLCJuYW1lcyI6WyJkYXRhIiwiJGxvYWRpbmciLCJpc1Nob3ciLCJhbGxMaW5lIiwiZmlsdGVyTGluZSIsIm9uTG9hZCIsImdldEFsbExpbmUiLCJzZXREYXRhIiwiQnVzIiwidGhlbiIsIkpTT04iLCJwYXJzZSIsInJlcyIsIm9uSW5wdXQiLCJlIiwiZmlsdGVyIiwibSIsImxpbmVfbmFtZSIsImluZGV4T2YiLCJkZXRhaWwiLCJ2YWx1ZSJdLCJtYXBwaW5ncyI6Ijs7Ozs7O0FBQUE7Ozs7Ozs7QUFhRUEsUUFBTTtBQUFBO0FBQUE7QUFBQTs7QUFDSkMsY0FBVTtBQUNSQyxjQUFRO0FBREEsS0FETjtBQUlKQyxhQUFTLEVBSkw7QUFLSkMsZ0JBQVk7QUFMUixHO0FBT05DLFEsb0JBQVU7QUFDUixTQUFLQyxVQUFMO0FBQ0QsRztBQUNEQSxZLHdCQUFjO0FBQUE7O0FBQ1osU0FBS0MsT0FBTCxDQUFhO0FBQ1hOLGdCQUFVO0FBQ1JDLGdCQUFRO0FBREE7QUFEQyxLQUFiO0FBS0FNLGtCQUFJRixVQUFKLEdBQWlCRyxJQUFqQixDQUFzQixlQUFPO0FBQzNCLFVBQU1OLFVBQVVPLEtBQUtDLEtBQUwsQ0FBV0MsSUFBSVosSUFBSixDQUFTQSxJQUFwQixDQUFoQjtBQUNBLFlBQUtPLE9BQUwsQ0FBYTtBQUNYSix3QkFEVztBQUVYQyxvQkFBWUQsT0FGRDtBQUdYRixrQkFBVTtBQUNSQyxrQkFBUTtBQURBO0FBSEMsT0FBYjtBQU9ELEtBVEQ7QUFVRCxHO0FBQ0RXLFMsbUJBQVFDLEMsRUFBRztBQUNULFFBQU1WLGFBQWEsS0FBS0osSUFBTCxDQUFVRyxPQUFWLENBQWtCWSxNQUFsQixDQUF5QixhQUFLO0FBQy9DLGFBQU9DLEVBQUVDLFNBQUYsQ0FBWUMsT0FBWixDQUFvQkosRUFBRUssTUFBRixDQUFTQyxLQUE3QixLQUF1QyxDQUE5QztBQUNELEtBRmtCLENBQW5CO0FBR0EsU0FBS2IsT0FBTCxDQUFhO0FBQ1hIO0FBRFcsS0FBYjtBQUdEIiwiZmlsZSI6ImluZGV4Lnd4cCIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBCdXMgZnJvbSBcIi4uLy4uL21vZGVscy9hcGlcIjtcbmV4cG9ydCBkZWZhdWx0IHtcbiAgY29uZmlnOiB7XG4gICAgZGlzYWJsZVNjcm9sbDogdHJ1ZSxcbiAgICBuYXZpZ2F0aW9uQmFyVGl0bGVUZXh0OiAn5pCc57SiJyxcbiAgICB1c2luZ0NvbXBvbmVudHM6IHtcbiAgICAgICd3eGMtaWNvbic6ICdAbWludWkvd3hjLWljb24nLFxuICAgICAgJ3d4Yy1zZWFyY2gnOiAnQG1pbnVpL3d4Yy1zZWFyY2gnLFxuICAgICAgJ3JvYWQtbGlzdCc6ICcuLi9jb21wb25lbnRzL3JvYWQtbGlzdCcsXG4gICAgICBcInd4Yy1sb2FkaW5nXCI6IFwiQG1pbnVpL3d4Yy1sb2FkaW5nXCIsXG4gICAgICBcInd4Yy1sb2FkbW9yZVwiOiBcIkBtaW51aS93eGMtbG9hZG1vcmVcIixcbiAgICB9XG4gIH0sXG4gIGRhdGE6IHtcbiAgICAkbG9hZGluZzoge1xuICAgICAgaXNTaG93OiBmYWxzZVxuICAgIH0sXG4gICAgYWxsTGluZTogW10sXG4gICAgZmlsdGVyTGluZTogW11cbiAgfSxcbiAgb25Mb2FkICgpIHtcbiAgICB0aGlzLmdldEFsbExpbmUoKTtcbiAgfSxcbiAgZ2V0QWxsTGluZSAoKSB7XG4gICAgdGhpcy5zZXREYXRhKHtcbiAgICAgICRsb2FkaW5nOiB7XG4gICAgICAgIGlzU2hvdzogdHJ1ZVxuICAgICAgfVxuICAgIH0pO1xuICAgIEJ1cy5nZXRBbGxMaW5lKCkudGhlbihyZXMgPT4ge1xuICAgICAgY29uc3QgYWxsTGluZSA9IEpTT04ucGFyc2UocmVzLmRhdGEuZGF0YSlcbiAgICAgIHRoaXMuc2V0RGF0YSh7XG4gICAgICAgIGFsbExpbmUsXG4gICAgICAgIGZpbHRlckxpbmU6IGFsbExpbmUsXG4gICAgICAgICRsb2FkaW5nOiB7XG4gICAgICAgICAgaXNTaG93OiBmYWxzZVxuICAgICAgICB9XG4gICAgICB9KVxuICAgIH0pXG4gIH0sXG4gIG9uSW5wdXQoZSkge1xuICAgIGNvbnN0IGZpbHRlckxpbmUgPSB0aGlzLmRhdGEuYWxsTGluZS5maWx0ZXIobSA9PiB7XG4gICAgICByZXR1cm4gbS5saW5lX25hbWUuaW5kZXhPZihlLmRldGFpbC52YWx1ZSkgPj0gMDtcbiAgICB9KVxuICAgIHRoaXMuc2V0RGF0YSh7XG4gICAgICBmaWx0ZXJMaW5lXG4gICAgfSlcbiAgfVxufSJdfQ==