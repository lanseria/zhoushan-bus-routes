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
    key: 'mapCityLoction_new',

    // forEach 获取 [ {city: , location}] 结构
    value: function mapCityLoction_new(arr) {
      var newArr = [];
      arr.forEach(function (address, i) {
        var index = -1;
        var alreadyExists = newArr.some(function (newAddress, j) {
          if (address.stationName === newAddress.stationName) {
            index = j;
            return true;
          }
        });
        if (!alreadyExists) {
          newArr.push({
            stationName: address.stationName,
            busList: [address]
          });
        } else {
          newArr[index].busList.push(address);
        }
      });
      return newArr;
    }
  }, {
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImdsb2JhbC5qcyJdLCJuYW1lcyI6WyJHbG9iYWwiLCJhcnIiLCJuZXdBcnIiLCJmb3JFYWNoIiwiYWRkcmVzcyIsImkiLCJpbmRleCIsImFscmVhZHlFeGlzdHMiLCJzb21lIiwibmV3QWRkcmVzcyIsImoiLCJzdGF0aW9uTmFtZSIsInB1c2giLCJidXNMaXN0IiwibG5nIiwibGF0IiwibG9jYXRpb24iLCJ3Z3M4NHRvZ2NqMDIiLCJ3eCIsImdldExvY2F0aW9uIiwidHlwZSIsInN1Y2Nlc3MiLCJzZXRWYWwiLCJsYXRpdHVkZSIsInJlcyIsImxvbmdpdHVkZSIsImxlbmd0aCIsIlByb21pc2UiLCJyZXNvbHZlIiwicmVqZWN0Iiwic3RhdHVzIiwiZ2V0U3RvcmFnZVN5bmMiLCJzZXRIZWFkTm90aWNlU3RhdHVzIiwiaXNIZWFkTm90aWNlU2hvdyIsInZhbCIsInNldFN0b3JhZ2UiLCJrZXkiLCJkYXRhIiwiQmFzZSJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7QUFBQTs7OztBQUNBOztBQUNBOzs7Ozs7Ozs7Ozs7SUFFTUEsTTs7Ozs7Ozs7Ozs7O0FBQ0o7dUNBQ29CQyxHLEVBQUs7QUFDdkIsVUFBSUMsU0FBUyxFQUFiO0FBQ0FELFVBQUlFLE9BQUosQ0FBWSxVQUFDQyxPQUFELEVBQVVDLENBQVYsRUFBZ0I7QUFDMUIsWUFBSUMsUUFBUSxDQUFDLENBQWI7QUFDQSxZQUFJQyxnQkFBZ0JMLE9BQU9NLElBQVAsQ0FBWSxVQUFDQyxVQUFELEVBQWFDLENBQWIsRUFBbUI7QUFDakQsY0FBSU4sUUFBUU8sV0FBUixLQUF3QkYsV0FBV0UsV0FBdkMsRUFBb0Q7QUFDbERMLG9CQUFRSSxDQUFSO0FBQ0EsbUJBQU8sSUFBUDtBQUNEO0FBQ0YsU0FMbUIsQ0FBcEI7QUFNQSxZQUFJLENBQUNILGFBQUwsRUFBb0I7QUFDbEJMLGlCQUFPVSxJQUFQLENBQVk7QUFDVkQseUJBQWFQLFFBQVFPLFdBRFg7QUFFVkUscUJBQVMsQ0FBQ1QsT0FBRDtBQUZDLFdBQVo7QUFJRCxTQUxELE1BS087QUFDTEYsaUJBQU9JLEtBQVAsRUFBY08sT0FBZCxDQUFzQkQsSUFBdEIsQ0FBMkJSLE9BQTNCO0FBQ0Q7QUFDRixPQWhCRDtBQWlCQSxhQUFPRixNQUFQO0FBQ0Q7OztpQ0FDYVksRyxFQUFLQyxHLEVBQUs7QUFDdEIsYUFBT0MsbUJBQVNDLFlBQVQsQ0FBc0JILEdBQXRCLEVBQTJCQyxHQUEzQixDQUFQO0FBQ0Q7Ozt1Q0FDbUI7QUFBQTs7QUFDbEIsYUFBT0csR0FBR0MsV0FBSCxDQUFlO0FBQ3BCQyxjQUFNLE9BRGM7QUFFcEJDLGlCQUFTLHNCQUFPO0FBQ2QsaUJBQUtDLE1BQUwsQ0FBWSxlQUFaLEVBQTZCO0FBQzNCQyxzQkFBVUMsSUFBSUQsUUFEYTtBQUUzQkUsdUJBQVdELElBQUlDLFNBRlk7QUFHM0JDLG9CQUFRO0FBSG1CLFdBQTdCO0FBS0EsaUJBQU87QUFDTFgsaUJBQUtTLElBQUlELFFBREo7QUFFTFQsaUJBQUtVLElBQUlDLFNBRko7QUFHTEMsb0JBQVE7QUFISCxXQUFQO0FBS0Q7QUFibUIsT0FBZixDQUFQO0FBZUQ7OztrQ0FDYztBQUFBOztBQUNiLGFBQU8sSUFBSUMsbUJBQUosQ0FBWSxVQUFDQyxPQUFELEVBQVVDLE1BQVYsRUFBcUI7QUFDdENYLFdBQUdDLFdBQUgsQ0FBZTtBQUNiQyxnQkFBTSxPQURPO0FBRWJDLG1CQUFTLHNCQUFPO0FBQ2QsbUJBQUtDLE1BQUwsQ0FBWSxlQUFaLEVBQTZCO0FBQzNCQyx3QkFBVUMsSUFBSUQsUUFEYTtBQUUzQkUseUJBQVdELElBQUlDLFNBRlk7QUFHM0JDLHNCQUFRO0FBSG1CLGFBQTdCO0FBS0EsbUJBQU9FLFFBQVE7QUFDYmIsbUJBQUtTLElBQUlELFFBREk7QUFFYlQsbUJBQUtVLElBQUlDLFNBRkk7QUFHYkMsc0JBQVE7QUFISyxhQUFSLENBQVA7QUFLRDtBQWJZLFNBQWY7QUFlRCxPQWhCTSxDQUFQO0FBaUJEOzs7MENBRXNCO0FBQ3JCLFVBQU1JLFNBQVNaLEdBQUdhLGNBQUgsQ0FBa0Isa0JBQWxCLENBQWY7QUFDQSxVQUFJRCxXQUFXLEVBQWYsRUFBbUI7QUFDakIsYUFBS0UsbUJBQUwsQ0FBeUIsS0FBS0MsZ0JBQTlCO0FBQ0EsZUFBTyxJQUFQO0FBQ0QsT0FIRCxNQUdPO0FBQ0wsZUFBT0gsTUFBUDtBQUNEO0FBQ0Y7Ozt3Q0FFb0JJLEcsRUFBSztBQUN4QmhCLFNBQUdpQixVQUFILENBQWM7QUFDWkMsYUFBSyxrQkFETztBQUVaQyxjQUFNSDtBQUZNLE9BQWQ7QUFJRDs7OzJCQUVPRSxHLEVBQUs7QUFDWCxhQUFPbEIsR0FBR2EsY0FBSCxDQUFrQkssR0FBbEIsQ0FBUDtBQUNEOzs7MkJBRU9BLEcsRUFBS0YsRyxFQUFLO0FBQ2hCaEIsU0FBR2lCLFVBQUgsQ0FBYztBQUNaQyxhQUFLQSxHQURPO0FBRVpDLGNBQU1IO0FBRk0sT0FBZDtBQUlEOzs7O0VBekZrQkksYzs7a0JBNkZOLElBQUl0QyxNQUFKLEUiLCJmaWxlIjoiZ2xvYmFsLmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IEJhc2UgZnJvbSAnLi9iYXNlJ1xyXG5pbXBvcnQgeyBQcm9taXNlIH0gZnJvbSAnZXM2LXByb21pc2UnXHJcbmltcG9ydCBsb2NhdGlvbiBmcm9tICcuLi9jb21tb24vbGliL2xvY2F0aW9uJ1xyXG5cclxuY2xhc3MgR2xvYmFsIGV4dGVuZHMgQmFzZSB7XHJcbiAgLy8gZm9yRWFjaCDojrflj5YgWyB7Y2l0eTogLCBsb2NhdGlvbn1dIOe7k+aehFxyXG4gIG1hcENpdHlMb2N0aW9uX25ldyAoYXJyKSB7XHJcbiAgICBsZXQgbmV3QXJyID0gW107XHJcbiAgICBhcnIuZm9yRWFjaCgoYWRkcmVzcywgaSkgPT4ge1xyXG4gICAgICBsZXQgaW5kZXggPSAtMTtcclxuICAgICAgbGV0IGFscmVhZHlFeGlzdHMgPSBuZXdBcnIuc29tZSgobmV3QWRkcmVzcywgaikgPT4ge1xyXG4gICAgICAgIGlmIChhZGRyZXNzLnN0YXRpb25OYW1lID09PSBuZXdBZGRyZXNzLnN0YXRpb25OYW1lKSB7XHJcbiAgICAgICAgICBpbmRleCA9IGo7XHJcbiAgICAgICAgICByZXR1cm4gdHJ1ZTtcclxuICAgICAgICB9XHJcbiAgICAgIH0pO1xyXG4gICAgICBpZiAoIWFscmVhZHlFeGlzdHMpIHtcclxuICAgICAgICBuZXdBcnIucHVzaCh7XHJcbiAgICAgICAgICBzdGF0aW9uTmFtZTogYWRkcmVzcy5zdGF0aW9uTmFtZSxcclxuICAgICAgICAgIGJ1c0xpc3Q6IFthZGRyZXNzXVxyXG4gICAgICAgIH0pO1xyXG4gICAgICB9IGVsc2Uge1xyXG4gICAgICAgIG5ld0FycltpbmRleF0uYnVzTGlzdC5wdXNoKGFkZHJlc3MpO1xyXG4gICAgICB9XHJcbiAgICB9KTtcclxuICAgIHJldHVybiBuZXdBcnI7XHJcbiAgfVxyXG4gIHdnczg0dG9nY2owMiAobG5nLCBsYXQpIHtcclxuICAgIHJldHVybiBsb2NhdGlvbi53Z3M4NHRvZ2NqMDIobG5nLCBsYXQpO1xyXG4gIH1cclxuICBzZXRMb2NhdGlvbkFzeW5jICgpIHtcclxuICAgIHJldHVybiB3eC5nZXRMb2NhdGlvbih7XHJcbiAgICAgIHR5cGU6IFwiZ2NqMDJcIixcclxuICAgICAgc3VjY2VzczogcmVzID0+IHtcclxuICAgICAgICB0aGlzLnNldFZhbCgnbG9jYXRpb24tZGF0YScsIHtcclxuICAgICAgICAgIGxhdGl0dWRlOiByZXMubGF0aXR1ZGUsXHJcbiAgICAgICAgICBsb25naXR1ZGU6IHJlcy5sb25naXR1ZGUsXHJcbiAgICAgICAgICBsZW5ndGg6IDgwMFxyXG4gICAgICAgIH0pXHJcbiAgICAgICAgcmV0dXJuIHtcclxuICAgICAgICAgIGxhdDogcmVzLmxhdGl0dWRlLFxyXG4gICAgICAgICAgbG5nOiByZXMubG9uZ2l0dWRlLFxyXG4gICAgICAgICAgbGVuZ3RoOiA4MDBcclxuICAgICAgICB9XHJcbiAgICAgIH1cclxuICAgIH0pXHJcbiAgfVxyXG4gIHNldExvY2F0aW9uICgpIHtcclxuICAgIHJldHVybiBuZXcgUHJvbWlzZSgocmVzb2x2ZSwgcmVqZWN0KSA9PiB7XHJcbiAgICAgIHd4LmdldExvY2F0aW9uKHtcclxuICAgICAgICB0eXBlOiBcImdjajAyXCIsXHJcbiAgICAgICAgc3VjY2VzczogcmVzID0+IHtcclxuICAgICAgICAgIHRoaXMuc2V0VmFsKCdsb2NhdGlvbi1kYXRhJywge1xyXG4gICAgICAgICAgICBsYXRpdHVkZTogcmVzLmxhdGl0dWRlLFxyXG4gICAgICAgICAgICBsb25naXR1ZGU6IHJlcy5sb25naXR1ZGUsXHJcbiAgICAgICAgICAgIGxlbmd0aDogODAwXHJcbiAgICAgICAgICB9KVxyXG4gICAgICAgICAgcmV0dXJuIHJlc29sdmUoe1xyXG4gICAgICAgICAgICBsYXQ6IHJlcy5sYXRpdHVkZSxcclxuICAgICAgICAgICAgbG5nOiByZXMubG9uZ2l0dWRlLFxyXG4gICAgICAgICAgICBsZW5ndGg6IDgwMFxyXG4gICAgICAgICAgfSlcclxuICAgICAgICB9XHJcbiAgICAgIH0pO1xyXG4gICAgfSlcclxuICB9XHJcblxyXG4gIGdldEhlYWROb3RpY2VTdGF0dXMgKCkge1xyXG4gICAgY29uc3Qgc3RhdHVzID0gd3guZ2V0U3RvcmFnZVN5bmMoJ0hFQUROT1RJQ0VTVEFUVVMnKVxyXG4gICAgaWYgKHN0YXR1cyA9PT0gJycpIHtcclxuICAgICAgdGhpcy5zZXRIZWFkTm90aWNlU3RhdHVzKHRoaXMuaXNIZWFkTm90aWNlU2hvdylcclxuICAgICAgcmV0dXJuIHRydWVcclxuICAgIH0gZWxzZSB7XHJcbiAgICAgIHJldHVybiBzdGF0dXNcclxuICAgIH1cclxuICB9XHJcblxyXG4gIHNldEhlYWROb3RpY2VTdGF0dXMgKHZhbCkge1xyXG4gICAgd3guc2V0U3RvcmFnZSh7XHJcbiAgICAgIGtleTogJ0hFQUROT1RJQ0VTVEFUVVMnLFxyXG4gICAgICBkYXRhOiB2YWxcclxuICAgIH0pXHJcbiAgfVxyXG5cclxuICBnZXRWYWwgKGtleSkge1xyXG4gICAgcmV0dXJuIHd4LmdldFN0b3JhZ2VTeW5jKGtleSlcclxuICB9XHJcblxyXG4gIHNldFZhbCAoa2V5LCB2YWwpIHtcclxuICAgIHd4LnNldFN0b3JhZ2Uoe1xyXG4gICAgICBrZXk6IGtleSxcclxuICAgICAgZGF0YTogdmFsXHJcbiAgICB9KVxyXG4gIH1cclxuXHJcbn1cclxuXHJcbmV4cG9ydCBkZWZhdWx0IG5ldyBHbG9iYWwoKSJdfQ==