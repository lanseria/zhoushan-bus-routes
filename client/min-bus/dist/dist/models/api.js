'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _base = require('./base.js');

var _base2 = _interopRequireDefault(_base);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Bus = function (_Base) {
  _inherits(Bus, _Base);

  function Bus() {
    _classCallCheck(this, Bus);

    return _possibleConstructorReturn(this, (Bus.__proto__ || Object.getPrototypeOf(Bus)).apply(this, arguments));
  }

  _createClass(Bus, [{
    key: 'getNearLine',
    value: function getNearLine(params) {
      var data = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
      var allowCache = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : false;

      var PARAMS = {
        length: params.length,
        lat: fomatFloat(params.lat, 13),
        lng: fomatFloat(params.lng, 13)
      };
      // var URL = '/near_line?' + objectToParams(PARAMS);
      return new Promise((resolve, reject) => {
        wx.cloud.init()
        wx.cloud.callFunction({
          name: 'near_line',
          data: {
            querystring: objectToParams(PARAMS),
          },
          success: res => {
            resolve(res.result)
          },
          fail: err => {
            reject(err)
          },
        })
      })
    }
  }, {
    key: 'getAllLine',
    value: function getAllLine() {
      var params = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : '';
      var data = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
      var allowCache = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : false;

      return new Promise((resolve, reject) => {
        wx.cloud.init()
        wx.cloud.callFunction({
          name: 'all_line',
          data: {
            // querystring: objectToParams(PARAMS),
          },
          success: res => {
            resolve(res.result)
          },
          fail: err => {
            reject(err)
          },
        })
      })
      // var URL = '/all_line';
      // return this.get(URL, data, allowCache);
    }
  }, {
    key: 'getLine',
    value: function getLine() {
      var params = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : '';
      var data = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
      var allowCache = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : false;

      // var URL = '/line?' + objectToParams(params);
      // return this.get(URL, data, allowCache);
      return new Promise((resolve, reject) => {
        wx.cloud.init()
        wx.cloud.callFunction({
          name: 'line',
          data: {
            querystring: objectToParams(params),
          },
          success: res => {
            resolve(res.result)
          },
          fail: err => {
            reject(err)
          },
        })
      })
    }
  }, {
    key: 'getBusWaiting',
    value: function getBusWaiting() {
      var params = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : '';
      var data = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
      var allowCache = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : false;

      // var URL = '/bus_waiting?' + objectToParams(params);
      // return this.get(URL, data, allowCache);
      return new Promise((resolve, reject) => {
        wx.cloud.init()
        wx.cloud.callFunction({
          name: 'bus_waiting',
          data: {
            querystring: objectToParams(params),
          },
          success: res => {
            resolve(res.result)
          },
          fail: err => {
            reject(err)
          },
        })
      })
    }
  }]);

  return Bus;
}(_base2.default);

function objectToParams(obj) {
  var str = Object.entries(obj).map(function (_ref) {
    var _ref2 = _slicedToArray(_ref, 2),
        key = _ref2[0],
        val = _ref2[1];

    return key + '=' + val;
  }).join('&');
  return str;
}

function fomatFloat(value, n) {
  var f = Math.round(value * Math.pow(10, n)) / Math.pow(10, n);
  var s = f.toString();
  var rs = s.indexOf('.');
  if (rs < 0) {
    s += '.';
  }
  for (var i = s.length - s.indexOf('.'); i < n; i++) {
    s += '0';
  }
  return s + '1';
}

exports.default = new Bus();
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFwaS5qcyJdLCJuYW1lcyI6WyJCdXMiLCJwYXJhbXMiLCJkYXRhIiwiYWxsb3dDYWNoZSIsIlBBUkFNUyIsImxlbmd0aCIsImxhdCIsImZvbWF0RmxvYXQiLCJsbmciLCJVUkwiLCJvYmplY3RUb1BhcmFtcyIsImdldCIsIkJhc2UiLCJvYmoiLCJzdHIiLCJPYmplY3QiLCJlbnRyaWVzIiwibWFwIiwia2V5IiwidmFsIiwiam9pbiIsInZhbHVlIiwibiIsImYiLCJNYXRoIiwicm91bmQiLCJwb3ciLCJzIiwidG9TdHJpbmciLCJycyIsImluZGV4T2YiLCJpIl0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7O0FBQUE7Ozs7Ozs7Ozs7OztJQUVNQSxHOzs7Ozs7Ozs7OztnQ0FDU0MsTSxFQUF1QztBQUFBLFVBQS9CQyxJQUErQix1RUFBeEIsRUFBd0I7QUFBQSxVQUFwQkMsVUFBb0IsdUVBQVAsS0FBTzs7QUFDbEQsVUFBTUMsU0FBUztBQUNiQyxnQkFBUUosT0FBT0ksTUFERjtBQUViQyxhQUFLQyxXQUFXTixPQUFPSyxHQUFsQixFQUF1QixFQUF2QixDQUZRO0FBR2JFLGFBQUtELFdBQVdOLE9BQU9PLEdBQWxCLEVBQXVCLEVBQXZCO0FBSFEsT0FBZjtBQUtBLFVBQU1DLHNCQUFvQkMsZUFBZU4sTUFBZixDQUExQjtBQUNBLGFBQU8sS0FBS08sR0FBTCxDQUFTRixHQUFULEVBQWNQLElBQWQsRUFBb0JDLFVBQXBCLENBQVA7QUFDRDs7O2lDQUV1RDtBQUFBLFVBQTVDRixNQUE0Qyx1RUFBbkMsRUFBbUM7QUFBQSxVQUEvQkMsSUFBK0IsdUVBQXhCLEVBQXdCO0FBQUEsVUFBcEJDLFVBQW9CLHVFQUFQLEtBQU87O0FBQ3RELFVBQU1NLGlCQUFOO0FBQ0EsYUFBTyxLQUFLRSxHQUFMLENBQVNGLEdBQVQsRUFBY1AsSUFBZCxFQUFvQkMsVUFBcEIsQ0FBUDtBQUNEOzs7OEJBRW9EO0FBQUEsVUFBNUNGLE1BQTRDLHVFQUFuQyxFQUFtQztBQUFBLFVBQS9CQyxJQUErQix1RUFBeEIsRUFBd0I7QUFBQSxVQUFwQkMsVUFBb0IsdUVBQVAsS0FBTzs7QUFDbkQsVUFBTU0saUJBQWVDLGVBQWVULE1BQWYsQ0FBckI7QUFDQSxhQUFPLEtBQUtVLEdBQUwsQ0FBU0YsR0FBVCxFQUFjUCxJQUFkLEVBQW9CQyxVQUFwQixDQUFQO0FBQ0Q7OztvQ0FFMEQ7QUFBQSxVQUE1Q0YsTUFBNEMsdUVBQW5DLEVBQW1DO0FBQUEsVUFBL0JDLElBQStCLHVFQUF4QixFQUF3QjtBQUFBLFVBQXBCQyxVQUFvQix1RUFBUCxLQUFPOztBQUN6RCxVQUFNTSx3QkFBc0JDLGVBQWVULE1BQWYsQ0FBNUI7QUFDQSxhQUFPLEtBQUtVLEdBQUwsQ0FBU0YsR0FBVCxFQUFjUCxJQUFkLEVBQW9CQyxVQUFwQixDQUFQO0FBQ0Q7Ozs7RUF4QmVTLGM7O0FBMkJsQixTQUFTRixjQUFULENBQXlCRyxHQUF6QixFQUE4QjtBQUM1QixNQUFNQyxNQUFNQyxPQUFPQyxPQUFQLENBQWVILEdBQWYsRUFBb0JJLEdBQXBCLENBQXdCO0FBQUE7QUFBQSxRQUFFQyxHQUFGO0FBQUEsUUFBT0MsR0FBUDs7QUFBQSxXQUFtQkQsR0FBbkIsU0FBMEJDLEdBQTFCO0FBQUEsR0FBeEIsRUFBeURDLElBQXpELENBQThELEdBQTlELENBQVo7QUFDQSxTQUFPTixHQUFQO0FBQ0Q7O0FBRUQsU0FBU1AsVUFBVCxDQUFxQmMsS0FBckIsRUFBNEJDLENBQTVCLEVBQStCO0FBQzdCLE1BQUlDLElBQUlDLEtBQUtDLEtBQUwsQ0FBV0osUUFBUUcsS0FBS0UsR0FBTCxDQUFTLEVBQVQsRUFBYUosQ0FBYixDQUFuQixJQUFzQ0UsS0FBS0UsR0FBTCxDQUFTLEVBQVQsRUFBYUosQ0FBYixDQUE5QztBQUNBLE1BQUlLLElBQUlKLEVBQUVLLFFBQUYsRUFBUjtBQUNBLE1BQUlDLEtBQUtGLEVBQUVHLE9BQUYsQ0FBVSxHQUFWLENBQVQ7QUFDQSxNQUFJRCxLQUFLLENBQVQsRUFBWTtBQUNWRixTQUFLLEdBQUw7QUFDRDtBQUNELE9BQUssSUFBSUksSUFBSUosRUFBRXRCLE1BQUYsR0FBV3NCLEVBQUVHLE9BQUYsQ0FBVSxHQUFWLENBQXhCLEVBQXdDQyxJQUFJVCxDQUE1QyxFQUErQ1MsR0FBL0MsRUFBb0Q7QUFDbERKLFNBQUssR0FBTDtBQUNEO0FBQ0QsU0FBT0EsSUFBSSxHQUFYO0FBQ0Q7O2tCQUVjLElBQUkzQixHQUFKLEUiLCJmaWxlIjoiYXBpLmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IEJhc2UgZnJvbSAnLi9iYXNlJ1xyXG5cclxuY2xhc3MgQnVzIGV4dGVuZHMgQmFzZSB7XHJcbiAgZ2V0TmVhckxpbmUgKHBhcmFtcywgZGF0YSA9IHt9LCBhbGxvd0NhY2hlID0gZmFsc2UpIHtcclxuICAgIGNvbnN0IFBBUkFNUyA9IHtcclxuICAgICAgbGVuZ3RoOiBwYXJhbXMubGVuZ3RoLFxyXG4gICAgICBsYXQ6IGZvbWF0RmxvYXQocGFyYW1zLmxhdCwgMTMpLFxyXG4gICAgICBsbmc6IGZvbWF0RmxvYXQocGFyYW1zLmxuZywgMTMpXHJcbiAgICB9XHJcbiAgICBjb25zdCBVUkwgPSBgL25lYXJfbGluZT8ke29iamVjdFRvUGFyYW1zKFBBUkFNUyl9YFxyXG4gICAgcmV0dXJuIHRoaXMuZ2V0KFVSTCwgZGF0YSwgYWxsb3dDYWNoZSlcclxuICB9XHJcblxyXG4gIGdldEFsbExpbmUgKHBhcmFtcyA9ICcnLCBkYXRhID0ge30sIGFsbG93Q2FjaGUgPSBmYWxzZSkge1xyXG4gICAgY29uc3QgVVJMID0gYC9hbGxfbGluZWBcclxuICAgIHJldHVybiB0aGlzLmdldChVUkwsIGRhdGEsIGFsbG93Q2FjaGUpXHJcbiAgfVxyXG5cclxuICBnZXRMaW5lIChwYXJhbXMgPSAnJywgZGF0YSA9IHt9LCBhbGxvd0NhY2hlID0gZmFsc2UpIHtcclxuICAgIGNvbnN0IFVSTCA9IGAvbGluZT8ke29iamVjdFRvUGFyYW1zKHBhcmFtcyl9YFxyXG4gICAgcmV0dXJuIHRoaXMuZ2V0KFVSTCwgZGF0YSwgYWxsb3dDYWNoZSlcclxuICB9XHJcblxyXG4gIGdldEJ1c1dhaXRpbmcgKHBhcmFtcyA9ICcnLCBkYXRhID0ge30sIGFsbG93Q2FjaGUgPSBmYWxzZSkge1xyXG4gICAgY29uc3QgVVJMID0gYC9idXNfd2FpdGluZz8ke29iamVjdFRvUGFyYW1zKHBhcmFtcyl9YFxyXG4gICAgcmV0dXJuIHRoaXMuZ2V0KFVSTCwgZGF0YSwgYWxsb3dDYWNoZSlcclxuICB9XHJcbn1cclxuXHJcbmZ1bmN0aW9uIG9iamVjdFRvUGFyYW1zIChvYmopIHtcclxuICBjb25zdCBzdHIgPSBPYmplY3QuZW50cmllcyhvYmopLm1hcCgoW2tleSwgdmFsXSkgPT4gYCR7a2V5fT0ke3ZhbH1gKS5qb2luKCcmJylcclxuICByZXR1cm4gc3RyXHJcbn1cclxuXHJcbmZ1bmN0aW9uIGZvbWF0RmxvYXQgKHZhbHVlLCBuKSB7XHJcbiAgdmFyIGYgPSBNYXRoLnJvdW5kKHZhbHVlICogTWF0aC5wb3coMTAsIG4pKSAvIE1hdGgucG93KDEwLCBuKVxyXG4gIHZhciBzID0gZi50b1N0cmluZygpXHJcbiAgdmFyIHJzID0gcy5pbmRleE9mKCcuJylcclxuICBpZiAocnMgPCAwKSB7XHJcbiAgICBzICs9ICcuJ1xyXG4gIH1cclxuICBmb3IgKHZhciBpID0gcy5sZW5ndGggLSBzLmluZGV4T2YoJy4nKTsgaSA8IG47IGkrKykge1xyXG4gICAgcyArPSAnMCdcclxuICB9XHJcbiAgcmV0dXJuIHMgKyAnMSdcclxufVxyXG5cclxuZXhwb3J0IGRlZmF1bHQgbmV3IEJ1cygpIl19