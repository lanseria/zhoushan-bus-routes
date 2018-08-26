'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _base = require('./base.js');

var _base2 = _interopRequireDefault(_base);

var _es6Promise = require('../packages/es6-promise/dist/es6-promise.js');

var _location = require('../common/lib/location.js');

var _location2 = _interopRequireDefault(_location);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Global = function (_Base) {
  _inherits(Global, _Base);

  function Global() {
    _classCallCheck(this, Global);

    return _possibleConstructorReturn(this, (Global.__proto__ || Object.getPrototypeOf(Global)).apply(this, arguments));
  }

  _createClass(Global, [{
    key: 'wgs84togcj02',
    value: function wgs84togcj02(lng, lat) {
      return _location2.default.wgs84togcj02(lng, lat);
    }
  }, {
    key: 'setLocationAsync',
    value: function setLocationAsync() {
      var _this2 = this;

      return wx.getLocation({
        type: "gcj02",
        success: function success(res) {
          _this2.setVal('location-data', {
            latitude: res.latitude,
            longitude: res.longitude,
            length: 800
          });
          return {
            lat: res.latitude,
            lng: res.longitude,
            length: 800
          };
        }
      });
    }
  }, {
    key: 'setLocation',
    value: function setLocation() {
      var _this3 = this;

      return new _es6Promise.Promise(function (resolve, reject) {
        wx.getLocation({
          type: "gcj02",
          success: function success(res) {
            _this3.setVal('location-data', {
              latitude: res.latitude,
              longitude: res.longitude,
              length: 800
            });
            return resolve({
              lat: res.latitude,
              lng: res.longitude,
              length: 800
            });
          }
        });
      });
    }
  }, {
    key: 'getHeadNoticeStatus',
    value: function getHeadNoticeStatus() {
      var status = wx.getStorageSync('HEADNOTICESTATUS');
      if (status === '') {
        this.setHeadNoticeStatus(this.isHeadNoticeShow);
        return true;
      } else {
        return status;
      }
    }
  }, {
    key: 'setHeadNoticeStatus',
    value: function setHeadNoticeStatus(val) {
      wx.setStorage({
        key: 'HEADNOTICESTATUS',
        data: val
      });
    }
  }, {
    key: 'getVal',
    value: function getVal(key) {
      return wx.getStorageSync(key);
    }
  }, {
    key: 'setVal',
    value: function setVal(key, val) {
      wx.setStorage({
        key: key,
        data: val
      });
    }
  }]);

  return Global;
}(_base2.default);

exports.default = new Global();
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImdsb2JhbC5qcyJdLCJuYW1lcyI6WyJHbG9iYWwiLCJsbmciLCJsYXQiLCJsb2NhdGlvbiIsIndnczg0dG9nY2owMiIsInd4IiwiZ2V0TG9jYXRpb24iLCJ0eXBlIiwic3VjY2VzcyIsInNldFZhbCIsImxhdGl0dWRlIiwicmVzIiwibG9uZ2l0dWRlIiwibGVuZ3RoIiwiUHJvbWlzZSIsInJlc29sdmUiLCJyZWplY3QiLCJzdGF0dXMiLCJnZXRTdG9yYWdlU3luYyIsInNldEhlYWROb3RpY2VTdGF0dXMiLCJpc0hlYWROb3RpY2VTaG93IiwidmFsIiwic2V0U3RvcmFnZSIsImtleSIsImRhdGEiLCJCYXNlIl0sIm1hcHBpbmdzIjoiOzs7Ozs7OztBQUFBOzs7O0FBQ0E7O0FBQ0E7Ozs7Ozs7Ozs7OztJQUVNQSxNOzs7Ozs7Ozs7OztpQ0FDVUMsRyxFQUFLQyxHLEVBQUs7QUFDdEIsYUFBT0MsbUJBQVNDLFlBQVQsQ0FBc0JILEdBQXRCLEVBQTJCQyxHQUEzQixDQUFQO0FBQ0Q7Ozt1Q0FDbUI7QUFBQTs7QUFDbEIsYUFBT0csR0FBR0MsV0FBSCxDQUFlO0FBQ3BCQyxjQUFNLE9BRGM7QUFFcEJDLGlCQUFTLHNCQUFPO0FBQ2QsaUJBQUtDLE1BQUwsQ0FBWSxlQUFaLEVBQTZCO0FBQzNCQyxzQkFBVUMsSUFBSUQsUUFEYTtBQUUzQkUsdUJBQVdELElBQUlDLFNBRlk7QUFHM0JDLG9CQUFRO0FBSG1CLFdBQTdCO0FBS0EsaUJBQU87QUFDTFgsaUJBQUtTLElBQUlELFFBREo7QUFFTFQsaUJBQUtVLElBQUlDLFNBRko7QUFHTEMsb0JBQVE7QUFISCxXQUFQO0FBS0Q7QUFibUIsT0FBZixDQUFQO0FBZUQ7OztrQ0FDYztBQUFBOztBQUNiLGFBQU8sSUFBSUMsbUJBQUosQ0FBWSxVQUFDQyxPQUFELEVBQVVDLE1BQVYsRUFBcUI7QUFDdENYLFdBQUdDLFdBQUgsQ0FBZTtBQUNiQyxnQkFBTSxPQURPO0FBRWJDLG1CQUFTLHNCQUFPO0FBQ2QsbUJBQUtDLE1BQUwsQ0FBWSxlQUFaLEVBQTZCO0FBQzNCQyx3QkFBVUMsSUFBSUQsUUFEYTtBQUUzQkUseUJBQVdELElBQUlDLFNBRlk7QUFHM0JDLHNCQUFRO0FBSG1CLGFBQTdCO0FBS0EsbUJBQU9FLFFBQVE7QUFDYmIsbUJBQUtTLElBQUlELFFBREk7QUFFYlQsbUJBQUtVLElBQUlDLFNBRkk7QUFHYkMsc0JBQVE7QUFISyxhQUFSLENBQVA7QUFLRDtBQWJZLFNBQWY7QUFlRCxPQWhCTSxDQUFQO0FBaUJEOzs7MENBRXNCO0FBQ3JCLFVBQU1JLFNBQVNaLEdBQUdhLGNBQUgsQ0FBa0Isa0JBQWxCLENBQWY7QUFDQSxVQUFJRCxXQUFXLEVBQWYsRUFBbUI7QUFDakIsYUFBS0UsbUJBQUwsQ0FBeUIsS0FBS0MsZ0JBQTlCO0FBQ0EsZUFBTyxJQUFQO0FBQ0QsT0FIRCxNQUdPO0FBQ0wsZUFBT0gsTUFBUDtBQUNEO0FBQ0Y7Ozt3Q0FFb0JJLEcsRUFBSztBQUN4QmhCLFNBQUdpQixVQUFILENBQWM7QUFDWkMsYUFBSyxrQkFETztBQUVaQyxjQUFNSDtBQUZNLE9BQWQ7QUFJRDs7OzJCQUVPRSxHLEVBQUs7QUFDWCxhQUFPbEIsR0FBR2EsY0FBSCxDQUFrQkssR0FBbEIsQ0FBUDtBQUNEOzs7MkJBRU9BLEcsRUFBS0YsRyxFQUFLO0FBQ2hCaEIsU0FBR2lCLFVBQUgsQ0FBYztBQUNaQyxhQUFLQSxHQURPO0FBRVpDLGNBQU1IO0FBRk0sT0FBZDtBQUlEOzs7O0VBbkVrQkksYzs7a0JBdUVOLElBQUl6QixNQUFKLEUiLCJmaWxlIjoiZ2xvYmFsLmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IEJhc2UgZnJvbSAnLi9iYXNlJ1xyXG5pbXBvcnQgeyBQcm9taXNlIH0gZnJvbSAnZXM2LXByb21pc2UnXHJcbmltcG9ydCBsb2NhdGlvbiBmcm9tICcuLi9jb21tb24vbGliL2xvY2F0aW9uJ1xyXG5cclxuY2xhc3MgR2xvYmFsIGV4dGVuZHMgQmFzZSB7XHJcbiAgd2dzODR0b2djajAyIChsbmcsIGxhdCkge1xyXG4gICAgcmV0dXJuIGxvY2F0aW9uLndnczg0dG9nY2owMihsbmcsIGxhdCk7XHJcbiAgfVxyXG4gIHNldExvY2F0aW9uQXN5bmMgKCkge1xyXG4gICAgcmV0dXJuIHd4LmdldExvY2F0aW9uKHtcclxuICAgICAgdHlwZTogXCJnY2owMlwiLFxyXG4gICAgICBzdWNjZXNzOiByZXMgPT4ge1xyXG4gICAgICAgIHRoaXMuc2V0VmFsKCdsb2NhdGlvbi1kYXRhJywge1xyXG4gICAgICAgICAgbGF0aXR1ZGU6IHJlcy5sYXRpdHVkZSxcclxuICAgICAgICAgIGxvbmdpdHVkZTogcmVzLmxvbmdpdHVkZSxcclxuICAgICAgICAgIGxlbmd0aDogODAwXHJcbiAgICAgICAgfSlcclxuICAgICAgICByZXR1cm4ge1xyXG4gICAgICAgICAgbGF0OiByZXMubGF0aXR1ZGUsXHJcbiAgICAgICAgICBsbmc6IHJlcy5sb25naXR1ZGUsXHJcbiAgICAgICAgICBsZW5ndGg6IDgwMFxyXG4gICAgICAgIH1cclxuICAgICAgfVxyXG4gICAgfSlcclxuICB9XHJcbiAgc2V0TG9jYXRpb24gKCkge1xyXG4gICAgcmV0dXJuIG5ldyBQcm9taXNlKChyZXNvbHZlLCByZWplY3QpID0+IHtcclxuICAgICAgd3guZ2V0TG9jYXRpb24oe1xyXG4gICAgICAgIHR5cGU6IFwiZ2NqMDJcIixcclxuICAgICAgICBzdWNjZXNzOiByZXMgPT4ge1xyXG4gICAgICAgICAgdGhpcy5zZXRWYWwoJ2xvY2F0aW9uLWRhdGEnLCB7XHJcbiAgICAgICAgICAgIGxhdGl0dWRlOiByZXMubGF0aXR1ZGUsXHJcbiAgICAgICAgICAgIGxvbmdpdHVkZTogcmVzLmxvbmdpdHVkZSxcclxuICAgICAgICAgICAgbGVuZ3RoOiA4MDBcclxuICAgICAgICAgIH0pXHJcbiAgICAgICAgICByZXR1cm4gcmVzb2x2ZSh7XHJcbiAgICAgICAgICAgIGxhdDogcmVzLmxhdGl0dWRlLFxyXG4gICAgICAgICAgICBsbmc6IHJlcy5sb25naXR1ZGUsXHJcbiAgICAgICAgICAgIGxlbmd0aDogODAwXHJcbiAgICAgICAgICB9KVxyXG4gICAgICAgIH1cclxuICAgICAgfSk7XHJcbiAgICB9KVxyXG4gIH1cclxuXHJcbiAgZ2V0SGVhZE5vdGljZVN0YXR1cyAoKSB7XHJcbiAgICBjb25zdCBzdGF0dXMgPSB3eC5nZXRTdG9yYWdlU3luYygnSEVBRE5PVElDRVNUQVRVUycpXHJcbiAgICBpZiAoc3RhdHVzID09PSAnJykge1xyXG4gICAgICB0aGlzLnNldEhlYWROb3RpY2VTdGF0dXModGhpcy5pc0hlYWROb3RpY2VTaG93KVxyXG4gICAgICByZXR1cm4gdHJ1ZVxyXG4gICAgfSBlbHNlIHtcclxuICAgICAgcmV0dXJuIHN0YXR1c1xyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgc2V0SGVhZE5vdGljZVN0YXR1cyAodmFsKSB7XHJcbiAgICB3eC5zZXRTdG9yYWdlKHtcclxuICAgICAga2V5OiAnSEVBRE5PVElDRVNUQVRVUycsXHJcbiAgICAgIGRhdGE6IHZhbFxyXG4gICAgfSlcclxuICB9XHJcblxyXG4gIGdldFZhbCAoa2V5KSB7XHJcbiAgICByZXR1cm4gd3guZ2V0U3RvcmFnZVN5bmMoa2V5KVxyXG4gIH1cclxuXHJcbiAgc2V0VmFsIChrZXksIHZhbCkge1xyXG4gICAgd3guc2V0U3RvcmFnZSh7XHJcbiAgICAgIGtleToga2V5LFxyXG4gICAgICBkYXRhOiB2YWxcclxuICAgIH0pXHJcbiAgfVxyXG5cclxufVxyXG5cclxuZXhwb3J0IGRlZmF1bHQgbmV3IEdsb2JhbCgpIl19