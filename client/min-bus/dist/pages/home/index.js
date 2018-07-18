'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _config = require('../../common/config.js');

var _common = require('../../common/api/common.js');

exports.default = Page({
  data: {
    '__code__': {
      readme: ''
    },

    style: 'background: #fff;border-radius: 66rpx;color: #000;',
    locationInfo: {},
    nearLineInfo: []
  },
  /** note: 在 wxp 文件或者页面文件中请去掉 methods 包装 */

  onLoad: function onLoad() {
    this.getNearLine();
  },
  getNearLine: function getNearLine() {
    var _this = this;

    wx.getLocation({
      type: 'wgs84',
      success: function success(res) {
        var data = {};
        (0, _common.getData)(_config.HOST + '/near_line', {
          lat: res.latitude,
          lng: res.longitude,
          length: 800
        }).then(function (data) {
          _this.setData({
            locationInfo: res,
            nearLineInfo: JSON.parse(data.data)
          });
        });
      }
    });
  }
});
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImluZGV4Lnd4cCJdLCJuYW1lcyI6WyJkYXRhIiwic3R5bGUiLCJsb2NhdGlvbkluZm8iLCJuZWFyTGluZUluZm8iLCJvbkxvYWQiLCJnZXROZWFyTGluZSIsInd4IiwiZ2V0TG9jYXRpb24iLCJ0eXBlIiwic3VjY2VzcyIsInJlcyIsIkhPU1QiLCJsYXQiLCJsYXRpdHVkZSIsImxuZyIsImxvbmdpdHVkZSIsImxlbmd0aCIsInRoZW4iLCJzZXREYXRhIiwiSlNPTiIsInBhcnNlIl0sIm1hcHBpbmdzIjoiOzs7Ozs7QUFBQTs7QUFDQTs7O0FBVUVBLFFBQU07QUFBQTtBQUFBO0FBQUE7O0FBQ0pDLFdBQU8sb0RBREg7QUFFSkMsa0JBQWMsRUFGVjtBQUdKQyxrQkFBYztBQUhWLEc7QUFLTjs7QUFFQUMsUSxvQkFBVTtBQUNSLFNBQUtDLFdBQUw7QUFDRCxHO0FBRURBLGEseUJBQWU7QUFBQTs7QUFDYkMsT0FBR0MsV0FBSCxDQUFlO0FBQ2JDLFlBQU0sT0FETztBQUViQyxlQUFTLGlCQUFDQyxHQUFELEVBQVM7QUFDaEIsWUFBSVYsT0FBTyxFQUFYO0FBQ0EsNkJBQVFXLGVBQU8sWUFBZixFQUE2QjtBQUMzQkMsZUFBS0YsSUFBSUcsUUFEa0I7QUFFM0JDLGVBQUtKLElBQUlLLFNBRmtCO0FBRzNCQyxrQkFBUTtBQUhtQixTQUE3QixFQUlHQyxJQUpILENBSVEsVUFBQ2pCLElBQUQsRUFBVTtBQUNoQixnQkFBS2tCLE9BQUwsQ0FBYTtBQUNYaEIsMEJBQWNRLEdBREg7QUFFWFAsMEJBQWNnQixLQUFLQyxLQUFMLENBQVdwQixLQUFLQSxJQUFoQjtBQUZILFdBQWI7QUFJRCxTQVREO0FBVUQ7QUFkWSxLQUFmO0FBZ0JEIiwiZmlsZSI6ImluZGV4Lnd4cCIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7SE9TVH0gZnJvbSAnLi4vLi4vY29tbW9uL2NvbmZpZydcbmltcG9ydCB7Z2V0RGF0YX0gZnJvbSAnLi4vLi4vY29tbW9uL2FwaS9jb21tb24nXG5cbmV4cG9ydCBkZWZhdWx0IHtcbiAgY29uZmlnOiB7XG4gICAgdXNpbmdDb21wb25lbnRzOiB7XG4gICAgICAnd3hjLWJ1dHRvbic6ICdAbWludWkvd3hjLWJ1dHRvbicsXG4gICAgICAnd3hjLWljb24nOiAnQG1pbnVpL3d4Yy1pY29uJyxcbiAgICAgICd3eGMtc2VhcmNoJzogJ0BtaW51aS93eGMtc2VhcmNoJ1xuICAgIH1cbiAgfSxcbiAgZGF0YToge1xuICAgIHN0eWxlOiAnYmFja2dyb3VuZDogI2ZmZjtib3JkZXItcmFkaXVzOiA2NnJweDtjb2xvcjogIzAwMDsnLFxuICAgIGxvY2F0aW9uSW5mbzoge30sXG4gICAgbmVhckxpbmVJbmZvOiBbXVxuICB9LFxuICAvKiogbm90ZTog5ZyoIHd4cCDmlofku7bmiJbogIXpobXpnaLmlofku7bkuK3or7fljrvmjokgbWV0aG9kcyDljIXoo4UgKi9cblxuICBvbkxvYWQgKCkge1xuICAgIHRoaXMuZ2V0TmVhckxpbmUoKVxuICB9LFxuXG4gIGdldE5lYXJMaW5lICgpIHtcbiAgICB3eC5nZXRMb2NhdGlvbih7XG4gICAgICB0eXBlOiAnd2dzODQnLFxuICAgICAgc3VjY2VzczogKHJlcykgPT4ge1xuICAgICAgICBsZXQgZGF0YSA9IHt9XG4gICAgICAgIGdldERhdGEoSE9TVCArICcvbmVhcl9saW5lJywge1xuICAgICAgICAgIGxhdDogcmVzLmxhdGl0dWRlLFxuICAgICAgICAgIGxuZzogcmVzLmxvbmdpdHVkZSxcbiAgICAgICAgICBsZW5ndGg6IDgwMFxuICAgICAgICB9KS50aGVuKChkYXRhKSA9PiB7XG4gICAgICAgICAgdGhpcy5zZXREYXRhKHtcbiAgICAgICAgICAgIGxvY2F0aW9uSW5mbzogcmVzLFxuICAgICAgICAgICAgbmVhckxpbmVJbmZvOiBKU09OLnBhcnNlKGRhdGEuZGF0YSlcbiAgICAgICAgICB9KVxuICAgICAgICB9KVxuICAgICAgfVxuICAgIH0pXG4gIH1cbn0iXX0=