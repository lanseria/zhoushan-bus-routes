'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

exports.getData = getData;
function getData(url, params) {
  var PARAMS = {
    length: params.length,
    lat: fomatFloat(params.lat, 13),
    lng: fomatFloat(params.lng, 13)
  };
  var URL = url + ('?' + objectToParams(PARAMS));
  return new Promise(function (resolve, reject) {
    wx.request({
      url: URL, //仅为示例，并非真实的接口地址
      header: {
        'content-type': 'application/json' // 默认值
      },
      success: function success(res) {
        resolve(res.data);
      }
    });
  });
}

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImNvbW1vbi5qcyJdLCJuYW1lcyI6WyJnZXREYXRhIiwidXJsIiwicGFyYW1zIiwiUEFSQU1TIiwibGVuZ3RoIiwibGF0IiwiZm9tYXRGbG9hdCIsImxuZyIsIlVSTCIsIm9iamVjdFRvUGFyYW1zIiwiUHJvbWlzZSIsInJlc29sdmUiLCJyZWplY3QiLCJ3eCIsInJlcXVlc3QiLCJoZWFkZXIiLCJzdWNjZXNzIiwicmVzIiwiZGF0YSIsIm9iaiIsInN0ciIsIk9iamVjdCIsImVudHJpZXMiLCJtYXAiLCJrZXkiLCJ2YWwiLCJqb2luIiwidmFsdWUiLCJuIiwiZiIsIk1hdGgiLCJyb3VuZCIsInBvdyIsInMiLCJ0b1N0cmluZyIsInJzIiwiaW5kZXhPZiIsImkiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7O1FBQWdCQSxPLEdBQUFBLE87QUFBVCxTQUFTQSxPQUFULENBQWtCQyxHQUFsQixFQUF1QkMsTUFBdkIsRUFBK0I7QUFDcEMsTUFBTUMsU0FBUztBQUNiQyxZQUFRRixPQUFPRSxNQURGO0FBRWJDLFNBQUtDLFdBQVdKLE9BQU9HLEdBQWxCLEVBQXVCLEVBQXZCLENBRlE7QUFHYkUsU0FBS0QsV0FBV0osT0FBT0ssR0FBbEIsRUFBdUIsRUFBdkI7QUFIUSxHQUFmO0FBS0EsTUFBTUMsTUFBTVAsYUFBVVEsZUFBZU4sTUFBZixDQUFWLENBQVo7QUFDQSxTQUFPLElBQUlPLE9BQUosQ0FBWSxVQUFDQyxPQUFELEVBQVVDLE1BQVYsRUFBcUI7QUFDdENDLE9BQUdDLE9BQUgsQ0FBVztBQUNUYixXQUFLTyxHQURJLEVBQ0M7QUFDVk8sY0FBUTtBQUNOLHdCQUFnQixrQkFEVixDQUM2QjtBQUQ3QixPQUZDO0FBS1RDLGVBQVMsaUJBQUNDLEdBQUQsRUFBUztBQUNoQk4sZ0JBQVFNLElBQUlDLElBQVo7QUFDRDtBQVBRLEtBQVg7QUFTRCxHQVZNLENBQVA7QUFXRDs7QUFFRCxTQUFTVCxjQUFULENBQXdCVSxHQUF4QixFQUE2QjtBQUMzQixNQUFNQyxNQUFNQyxPQUFPQyxPQUFQLENBQWVILEdBQWYsRUFBb0JJLEdBQXBCLENBQXdCO0FBQUE7QUFBQSxRQUFFQyxHQUFGO0FBQUEsUUFBT0MsR0FBUDs7QUFBQSxXQUFtQkQsR0FBbkIsU0FBMEJDLEdBQTFCO0FBQUEsR0FBeEIsRUFBeURDLElBQXpELENBQThELEdBQTlELENBQVo7QUFDQSxTQUFPTixHQUFQO0FBQ0Q7O0FBRUQsU0FBU2QsVUFBVCxDQUFxQnFCLEtBQXJCLEVBQTRCQyxDQUE1QixFQUErQjtBQUM3QixNQUFJQyxJQUFJQyxLQUFLQyxLQUFMLENBQVdKLFFBQVFHLEtBQUtFLEdBQUwsQ0FBUyxFQUFULEVBQWFKLENBQWIsQ0FBbkIsSUFBc0NFLEtBQUtFLEdBQUwsQ0FBUyxFQUFULEVBQWFKLENBQWIsQ0FBOUM7QUFDQSxNQUFJSyxJQUFJSixFQUFFSyxRQUFGLEVBQVI7QUFDQSxNQUFJQyxLQUFLRixFQUFFRyxPQUFGLENBQVUsR0FBVixDQUFUO0FBQ0EsTUFBSUQsS0FBSyxDQUFULEVBQVk7QUFDVkYsU0FBSyxHQUFMO0FBQ0Q7QUFDRCxPQUFLLElBQUlJLElBQUlKLEVBQUU3QixNQUFGLEdBQVc2QixFQUFFRyxPQUFGLENBQVUsR0FBVixDQUF4QixFQUF3Q0MsSUFBSVQsQ0FBNUMsRUFBK0NTLEdBQS9DLEVBQW9EO0FBQ2xESixTQUFLLEdBQUw7QUFDRDtBQUNELFNBQU9BLElBQUksR0FBWDtBQUNEIiwiZmlsZSI6ImNvbW1vbi5qcyIsInNvdXJjZXNDb250ZW50IjpbImV4cG9ydCBmdW5jdGlvbiBnZXREYXRhICh1cmwsIHBhcmFtcykge1xyXG4gIGNvbnN0IFBBUkFNUyA9IHtcclxuICAgIGxlbmd0aDogcGFyYW1zLmxlbmd0aCxcclxuICAgIGxhdDogZm9tYXRGbG9hdChwYXJhbXMubGF0LCAxMyksXHJcbiAgICBsbmc6IGZvbWF0RmxvYXQocGFyYW1zLmxuZywgMTMpXHJcbiAgfVxyXG4gIGNvbnN0IFVSTCA9IHVybCArIGA/JHtvYmplY3RUb1BhcmFtcyhQQVJBTVMpfWBcclxuICByZXR1cm4gbmV3IFByb21pc2UoKHJlc29sdmUsIHJlamVjdCkgPT4ge1xyXG4gICAgd3gucmVxdWVzdCh7XHJcbiAgICAgIHVybDogVVJMLCAvL+S7heS4uuekuuS+i++8jOW5tumdnuecn+WunueahOaOpeWPo+WcsOWdgFxyXG4gICAgICBoZWFkZXI6IHtcclxuICAgICAgICAnY29udGVudC10eXBlJzogJ2FwcGxpY2F0aW9uL2pzb24nIC8vIOm7mOiupOWAvFxyXG4gICAgICB9LFxyXG4gICAgICBzdWNjZXNzOiAocmVzKSA9PiB7XHJcbiAgICAgICAgcmVzb2x2ZShyZXMuZGF0YSlcclxuICAgICAgfVxyXG4gICAgfSlcclxuICB9KVxyXG59XHJcblxyXG5mdW5jdGlvbiBvYmplY3RUb1BhcmFtcyhvYmopIHtcclxuICBjb25zdCBzdHIgPSBPYmplY3QuZW50cmllcyhvYmopLm1hcCgoW2tleSwgdmFsXSkgPT4gYCR7a2V5fT0ke3ZhbH1gKS5qb2luKCcmJylcclxuICByZXR1cm4gc3RyXHJcbn1cclxuXHJcbmZ1bmN0aW9uIGZvbWF0RmxvYXQgKHZhbHVlLCBuKSB7XHJcbiAgdmFyIGYgPSBNYXRoLnJvdW5kKHZhbHVlICogTWF0aC5wb3coMTAsIG4pKSAvIE1hdGgucG93KDEwLCBuKVxyXG4gIHZhciBzID0gZi50b1N0cmluZygpXHJcbiAgdmFyIHJzID0gcy5pbmRleE9mKCcuJylcclxuICBpZiAocnMgPCAwKSB7XHJcbiAgICBzICs9ICcuJ1xyXG4gIH1cclxuICBmb3IgKHZhciBpID0gcy5sZW5ndGggLSBzLmluZGV4T2YoJy4nKTsgaSA8IG47IGkrKykge1xyXG4gICAgcyArPSAnMCdcclxuICB9XHJcbiAgcmV0dXJuIHMgKyAnMSdcclxufSJdfQ==