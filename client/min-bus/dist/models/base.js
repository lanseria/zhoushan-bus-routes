'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _index = require('../packages/wx-promise-request/dist/index.js');

var _md = require('../common/lib/md5.js');

var _md2 = _interopRequireDefault(_md);

var _es6Promise = require('../packages/es6-promise/dist/es6-promise.js');

var _config = require('../common/config.js');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Base = function () {
  function Base() {
    _classCallCheck(this, Base);

    // 修改这里的地址为自己的服务器地址
    this.host = _config.HOST;
    this.isHeadNoticeShow = true;
  }

  _createClass(Base, [{
    key: 'url',
    value: function url(path) {
      return this.host + path;
    }

    /**
     * 带缓存的Http Get
     * @param {String} path 
     * @param {Object} data
     * @param {Boolean} allowCache 是否允许获取缓存数据
     */

  }, {
    key: 'get',
    value: function get(path) {
      var data = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
      var allowCache = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : true;

      var key = (0, _md2.default)(path + JSON.stringify(data));
      var val = null;
      if (allowCache) {
        val = wx.getStorageSync(key);
      }
      if (val) {
        return new _es6Promise.Promise(function (resolve, reject) {
          return resolve(val);
        });
      } else {
        return (0, _index.request)({
          url: this.url(path),
          data: data,
          header: {
            'content-type': 'application/json' // 默认值
          }
        }).then(function (res) {
          wx.setStorage({
            key: key,
            data: res
          });
          return res;
        });
      }
    }
  }]);

  return Base;
}();

exports.default = Base;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImJhc2UuanMiXSwibmFtZXMiOlsiQmFzZSIsImhvc3QiLCJIT1NUIiwiaXNIZWFkTm90aWNlU2hvdyIsInBhdGgiLCJkYXRhIiwiYWxsb3dDYWNoZSIsImtleSIsIkpTT04iLCJzdHJpbmdpZnkiLCJ2YWwiLCJ3eCIsImdldFN0b3JhZ2VTeW5jIiwiUHJvbWlzZSIsInJlc29sdmUiLCJyZWplY3QiLCJ1cmwiLCJoZWFkZXIiLCJ0aGVuIiwicmVzIiwic2V0U3RvcmFnZSJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7QUFBQTs7QUFDQTs7OztBQUNBOztBQUNBOzs7Ozs7SUFFTUEsSTtBQUNKLGtCQUFjO0FBQUE7O0FBQ1o7QUFDQSxTQUFLQyxJQUFMLEdBQVlDLFlBQVo7QUFDQSxTQUFLQyxnQkFBTCxHQUF3QixJQUF4QjtBQUNEOzs7O3dCQUVJQyxJLEVBQU07QUFDVCxhQUFPLEtBQUtILElBQUwsR0FBWUcsSUFBbkI7QUFDRDs7QUFFRDs7Ozs7Ozs7O3dCQU1LQSxJLEVBQW9DO0FBQUEsVUFBOUJDLElBQThCLHVFQUF2QixFQUF1QjtBQUFBLFVBQW5CQyxVQUFtQix1RUFBTixJQUFNOztBQUN2QyxVQUFJQyxNQUFNLGtCQUFJSCxPQUFPSSxLQUFLQyxTQUFMLENBQWVKLElBQWYsQ0FBWCxDQUFWO0FBQ0EsVUFBSUssTUFBTSxJQUFWO0FBQ0EsVUFBSUosVUFBSixFQUFnQjtBQUNkSSxjQUFNQyxHQUFHQyxjQUFILENBQWtCTCxHQUFsQixDQUFOO0FBQ0Q7QUFDRCxVQUFJRyxHQUFKLEVBQVM7QUFDUCxlQUFPLElBQUlHLG1CQUFKLENBQVksVUFBQ0MsT0FBRCxFQUFVQyxNQUFWLEVBQXFCO0FBQ3RDLGlCQUFPRCxRQUFRSixHQUFSLENBQVA7QUFDRCxTQUZNLENBQVA7QUFHRCxPQUpELE1BSU87QUFDTCxlQUFPLG9CQUFRO0FBQ2JNLGVBQUssS0FBS0EsR0FBTCxDQUFTWixJQUFULENBRFE7QUFFYkMsb0JBRmE7QUFHYlksa0JBQVE7QUFDTiw0QkFBZ0Isa0JBRFYsQ0FDNkI7QUFEN0I7QUFISyxTQUFSLEVBTUpDLElBTkksQ0FNQyxVQUFDQyxHQUFELEVBQVM7QUFDZlIsYUFBR1MsVUFBSCxDQUFjO0FBQ1piLG9CQURZO0FBRVpGLGtCQUFNYztBQUZNLFdBQWQ7QUFJQSxpQkFBT0EsR0FBUDtBQUNELFNBWk0sQ0FBUDtBQWFEO0FBQ0Y7Ozs7OztrQkFHWW5CLEkiLCJmaWxlIjoiYmFzZS5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IHJlcXVlc3QgfSBmcm9tICd3eC1wcm9taXNlLXJlcXVlc3QnXHJcbmltcG9ydCBtZDUgZnJvbSAnLi4vY29tbW9uL2xpYi9tZDUnXHJcbmltcG9ydCB7IFByb21pc2UgfSBmcm9tICdlczYtcHJvbWlzZSdcclxuaW1wb3J0IHsgSE9TVCB9IGZyb20gJy4uL2NvbW1vbi9jb25maWcnXHJcblxyXG5jbGFzcyBCYXNlIHtcclxuICBjb25zdHJ1Y3RvcigpIHtcclxuICAgIC8vIOS/ruaUuei/memHjOeahOWcsOWdgOS4uuiHquW3seeahOacjeWKoeWZqOWcsOWdgFxyXG4gICAgdGhpcy5ob3N0ID0gSE9TVFxyXG4gICAgdGhpcy5pc0hlYWROb3RpY2VTaG93ID0gdHJ1ZVxyXG4gIH1cclxuXHJcbiAgdXJsIChwYXRoKSB7XHJcbiAgICByZXR1cm4gdGhpcy5ob3N0ICsgcGF0aFxyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICog5bim57yT5a2Y55qESHR0cCBHZXRcclxuICAgKiBAcGFyYW0ge1N0cmluZ30gcGF0aCBcclxuICAgKiBAcGFyYW0ge09iamVjdH0gZGF0YVxyXG4gICAqIEBwYXJhbSB7Qm9vbGVhbn0gYWxsb3dDYWNoZSDmmK/lkKblhYHorrjojrflj5bnvJPlrZjmlbDmja5cclxuICAgKi9cclxuICBnZXQgKHBhdGgsIGRhdGEgPSB7fSwgYWxsb3dDYWNoZSA9IHRydWUpIHtcclxuICAgIGxldCBrZXkgPSBtZDUocGF0aCArIEpTT04uc3RyaW5naWZ5KGRhdGEpKVxyXG4gICAgbGV0IHZhbCA9IG51bGxcclxuICAgIGlmIChhbGxvd0NhY2hlKSB7XHJcbiAgICAgIHZhbCA9IHd4LmdldFN0b3JhZ2VTeW5jKGtleSlcclxuICAgIH1cclxuICAgIGlmICh2YWwpIHtcclxuICAgICAgcmV0dXJuIG5ldyBQcm9taXNlKChyZXNvbHZlLCByZWplY3QpID0+IHtcclxuICAgICAgICByZXR1cm4gcmVzb2x2ZSh2YWwpXHJcbiAgICAgIH0pXHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICByZXR1cm4gcmVxdWVzdCh7XHJcbiAgICAgICAgdXJsOiB0aGlzLnVybChwYXRoKSxcclxuICAgICAgICBkYXRhLFxyXG4gICAgICAgIGhlYWRlcjoge1xyXG4gICAgICAgICAgJ2NvbnRlbnQtdHlwZSc6ICdhcHBsaWNhdGlvbi9qc29uJyAvLyDpu5jorqTlgLxcclxuICAgICAgICB9XHJcbiAgICAgIH0pLnRoZW4oKHJlcykgPT4ge1xyXG4gICAgICAgIHd4LnNldFN0b3JhZ2Uoe1xyXG4gICAgICAgICAga2V5LFxyXG4gICAgICAgICAgZGF0YTogcmVzXHJcbiAgICAgICAgfSlcclxuICAgICAgICByZXR1cm4gcmVzXHJcbiAgICAgIH0pXHJcbiAgICB9XHJcbiAgfVxyXG59XHJcblxyXG5leHBvcnQgZGVmYXVsdCBCYXNlIl19