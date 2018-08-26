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
      var allowCache = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : true;

      var PARAMS = {
        length: params.length,
        lat: fomatFloat(params.lat, 13),
        lng: fomatFloat(params.lng, 13)
      };
      var URL = '/near_line?' + objectToParams(PARAMS);
      return this.get(URL, data, allowCache);
    }
  }, {
    key: 'getAllLine',
    value: function getAllLine() {
      var params = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : '';
      var data = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
      var allowCache = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : true;

      var URL = '/all_line';
      return this.get(URL, data, allowCache);
    }
  }, {
    key: 'getLine',
    value: function getLine() {
      var params = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : '';
      var data = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
      var allowCache = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : true;

      var URL = '/line?' + objectToParams(params);
      return this.get(URL, data, allowCache);
    }
  }, {
    key: 'getBusWaiting',
    value: function getBusWaiting() {
      var params = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : '';
      var data = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
      var allowCache = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : true;

      var URL = '/bus_waiting?' + objectToParams(params);
      return this.get(URL, data, allowCache);
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFwaS5qcyJdLCJuYW1lcyI6WyJCdXMiLCJwYXJhbXMiLCJkYXRhIiwiYWxsb3dDYWNoZSIsIlBBUkFNUyIsImxlbmd0aCIsImxhdCIsImZvbWF0RmxvYXQiLCJsbmciLCJVUkwiLCJvYmplY3RUb1BhcmFtcyIsImdldCIsIkJhc2UiLCJvYmoiLCJzdHIiLCJPYmplY3QiLCJlbnRyaWVzIiwibWFwIiwia2V5IiwidmFsIiwiam9pbiIsInZhbHVlIiwibiIsImYiLCJNYXRoIiwicm91bmQiLCJwb3ciLCJzIiwidG9TdHJpbmciLCJycyIsImluZGV4T2YiLCJpIl0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7O0FBQUE7Ozs7Ozs7Ozs7OztJQUVNQSxHOzs7Ozs7Ozs7OztnQ0FDU0MsTSxFQUFzQztBQUFBLFVBQTlCQyxJQUE4Qix1RUFBdkIsRUFBdUI7QUFBQSxVQUFuQkMsVUFBbUIsdUVBQU4sSUFBTTs7QUFDakQsVUFBTUMsU0FBUztBQUNiQyxnQkFBUUosT0FBT0ksTUFERjtBQUViQyxhQUFLQyxXQUFXTixPQUFPSyxHQUFsQixFQUF1QixFQUF2QixDQUZRO0FBR2JFLGFBQUtELFdBQVdOLE9BQU9PLEdBQWxCLEVBQXVCLEVBQXZCO0FBSFEsT0FBZjtBQUtBLFVBQU1DLHNCQUFvQkMsZUFBZU4sTUFBZixDQUExQjtBQUNBLGFBQU8sS0FBS08sR0FBTCxDQUFTRixHQUFULEVBQWNQLElBQWQsRUFBb0JDLFVBQXBCLENBQVA7QUFDRDs7O2lDQUVzRDtBQUFBLFVBQTNDRixNQUEyQyx1RUFBbEMsRUFBa0M7QUFBQSxVQUE5QkMsSUFBOEIsdUVBQXZCLEVBQXVCO0FBQUEsVUFBbkJDLFVBQW1CLHVFQUFOLElBQU07O0FBQ3JELFVBQU1NLGlCQUFOO0FBQ0EsYUFBTyxLQUFLRSxHQUFMLENBQVNGLEdBQVQsRUFBY1AsSUFBZCxFQUFvQkMsVUFBcEIsQ0FBUDtBQUNEOzs7OEJBRW1EO0FBQUEsVUFBM0NGLE1BQTJDLHVFQUFsQyxFQUFrQztBQUFBLFVBQTlCQyxJQUE4Qix1RUFBdkIsRUFBdUI7QUFBQSxVQUFuQkMsVUFBbUIsdUVBQU4sSUFBTTs7QUFDbEQsVUFBTU0saUJBQWVDLGVBQWVULE1BQWYsQ0FBckI7QUFDQSxhQUFPLEtBQUtVLEdBQUwsQ0FBU0YsR0FBVCxFQUFjUCxJQUFkLEVBQW9CQyxVQUFwQixDQUFQO0FBQ0Q7OztvQ0FFeUQ7QUFBQSxVQUEzQ0YsTUFBMkMsdUVBQWxDLEVBQWtDO0FBQUEsVUFBOUJDLElBQThCLHVFQUF2QixFQUF1QjtBQUFBLFVBQW5CQyxVQUFtQix1RUFBTixJQUFNOztBQUN4RCxVQUFNTSx3QkFBc0JDLGVBQWVULE1BQWYsQ0FBNUI7QUFDQSxhQUFPLEtBQUtVLEdBQUwsQ0FBU0YsR0FBVCxFQUFjUCxJQUFkLEVBQW9CQyxVQUFwQixDQUFQO0FBQ0Q7Ozs7RUF4QmVTLGM7O0FBMkJsQixTQUFTRixjQUFULENBQXlCRyxHQUF6QixFQUE4QjtBQUM1QixNQUFNQyxNQUFNQyxPQUFPQyxPQUFQLENBQWVILEdBQWYsRUFBb0JJLEdBQXBCLENBQXdCO0FBQUE7QUFBQSxRQUFFQyxHQUFGO0FBQUEsUUFBT0MsR0FBUDs7QUFBQSxXQUFtQkQsR0FBbkIsU0FBMEJDLEdBQTFCO0FBQUEsR0FBeEIsRUFBeURDLElBQXpELENBQThELEdBQTlELENBQVo7QUFDQSxTQUFPTixHQUFQO0FBQ0Q7O0FBRUQsU0FBU1AsVUFBVCxDQUFxQmMsS0FBckIsRUFBNEJDLENBQTVCLEVBQStCO0FBQzdCLE1BQUlDLElBQUlDLEtBQUtDLEtBQUwsQ0FBV0osUUFBUUcsS0FBS0UsR0FBTCxDQUFTLEVBQVQsRUFBYUosQ0FBYixDQUFuQixJQUFzQ0UsS0FBS0UsR0FBTCxDQUFTLEVBQVQsRUFBYUosQ0FBYixDQUE5QztBQUNBLE1BQUlLLElBQUlKLEVBQUVLLFFBQUYsRUFBUjtBQUNBLE1BQUlDLEtBQUtGLEVBQUVHLE9BQUYsQ0FBVSxHQUFWLENBQVQ7QUFDQSxNQUFJRCxLQUFLLENBQVQsRUFBWTtBQUNWRixTQUFLLEdBQUw7QUFDRDtBQUNELE9BQUssSUFBSUksSUFBSUosRUFBRXRCLE1BQUYsR0FBV3NCLEVBQUVHLE9BQUYsQ0FBVSxHQUFWLENBQXhCLEVBQXdDQyxJQUFJVCxDQUE1QyxFQUErQ1MsR0FBL0MsRUFBb0Q7QUFDbERKLFNBQUssR0FBTDtBQUNEO0FBQ0QsU0FBT0EsSUFBSSxHQUFYO0FBQ0Q7O2tCQUVjLElBQUkzQixHQUFKLEUiLCJmaWxlIjoiYXBpLmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IEJhc2UgZnJvbSAnLi9iYXNlJ1xyXG5cclxuY2xhc3MgQnVzIGV4dGVuZHMgQmFzZSB7XHJcbiAgZ2V0TmVhckxpbmUgKHBhcmFtcywgZGF0YSA9IHt9LCBhbGxvd0NhY2hlID0gdHJ1ZSkge1xyXG4gICAgY29uc3QgUEFSQU1TID0ge1xyXG4gICAgICBsZW5ndGg6IHBhcmFtcy5sZW5ndGgsXHJcbiAgICAgIGxhdDogZm9tYXRGbG9hdChwYXJhbXMubGF0LCAxMyksXHJcbiAgICAgIGxuZzogZm9tYXRGbG9hdChwYXJhbXMubG5nLCAxMylcclxuICAgIH1cclxuICAgIGNvbnN0IFVSTCA9IGAvbmVhcl9saW5lPyR7b2JqZWN0VG9QYXJhbXMoUEFSQU1TKX1gXHJcbiAgICByZXR1cm4gdGhpcy5nZXQoVVJMLCBkYXRhLCBhbGxvd0NhY2hlKVxyXG4gIH1cclxuXHJcbiAgZ2V0QWxsTGluZSAocGFyYW1zID0gJycsIGRhdGEgPSB7fSwgYWxsb3dDYWNoZSA9IHRydWUpIHtcclxuICAgIGNvbnN0IFVSTCA9IGAvYWxsX2xpbmVgXHJcbiAgICByZXR1cm4gdGhpcy5nZXQoVVJMLCBkYXRhLCBhbGxvd0NhY2hlKVxyXG4gIH1cclxuXHJcbiAgZ2V0TGluZSAocGFyYW1zID0gJycsIGRhdGEgPSB7fSwgYWxsb3dDYWNoZSA9IHRydWUpIHtcclxuICAgIGNvbnN0IFVSTCA9IGAvbGluZT8ke29iamVjdFRvUGFyYW1zKHBhcmFtcyl9YFxyXG4gICAgcmV0dXJuIHRoaXMuZ2V0KFVSTCwgZGF0YSwgYWxsb3dDYWNoZSlcclxuICB9XHJcblxyXG4gIGdldEJ1c1dhaXRpbmcgKHBhcmFtcyA9ICcnLCBkYXRhID0ge30sIGFsbG93Q2FjaGUgPSB0cnVlKSB7XHJcbiAgICBjb25zdCBVUkwgPSBgL2J1c193YWl0aW5nPyR7b2JqZWN0VG9QYXJhbXMocGFyYW1zKX1gXHJcbiAgICByZXR1cm4gdGhpcy5nZXQoVVJMLCBkYXRhLCBhbGxvd0NhY2hlKVxyXG4gIH1cclxufVxyXG5cclxuZnVuY3Rpb24gb2JqZWN0VG9QYXJhbXMgKG9iaikge1xyXG4gIGNvbnN0IHN0ciA9IE9iamVjdC5lbnRyaWVzKG9iaikubWFwKChba2V5LCB2YWxdKSA9PiBgJHtrZXl9PSR7dmFsfWApLmpvaW4oJyYnKVxyXG4gIHJldHVybiBzdHJcclxufVxyXG5cclxuZnVuY3Rpb24gZm9tYXRGbG9hdCAodmFsdWUsIG4pIHtcclxuICB2YXIgZiA9IE1hdGgucm91bmQodmFsdWUgKiBNYXRoLnBvdygxMCwgbikpIC8gTWF0aC5wb3coMTAsIG4pXHJcbiAgdmFyIHMgPSBmLnRvU3RyaW5nKClcclxuICB2YXIgcnMgPSBzLmluZGV4T2YoJy4nKVxyXG4gIGlmIChycyA8IDApIHtcclxuICAgIHMgKz0gJy4nXHJcbiAgfVxyXG4gIGZvciAodmFyIGkgPSBzLmxlbmd0aCAtIHMuaW5kZXhPZignLicpOyBpIDwgbjsgaSsrKSB7XHJcbiAgICBzICs9ICcwJ1xyXG4gIH1cclxuICByZXR1cm4gcyArICcxJ1xyXG59XHJcblxyXG5leHBvcnQgZGVmYXVsdCBuZXcgQnVzKCkiXX0=