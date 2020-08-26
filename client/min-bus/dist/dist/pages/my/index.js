'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _global = require('../../models/global.js');

var _global2 = _interopRequireDefault(_global);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = Page({
  data: {
    '__code__': {
      readme: ''
    }
  },
  clearHistoryLines: function clearHistoryLines() {
    _global2.default.setVal('HistoryLines', []);
  }
});
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImluZGV4Lnd4cCJdLCJuYW1lcyI6WyJkYXRhIiwiY2xlYXJIaXN0b3J5TGluZXMiLCJHbG9iYWwiLCJzZXRWYWwiXSwibWFwcGluZ3MiOiI7Ozs7OztBQUFBOzs7Ozs7O0FBVUVBLFFBQU07QUFBQTtBQUFBO0FBQUE7QUFBQSxHO0FBQ05DLG1CLCtCQUFxQjtBQUNuQkMscUJBQU9DLE1BQVAsQ0FBYyxjQUFkLEVBQStCLEVBQS9CO0FBQ0QiLCJmaWxlIjoiaW5kZXgud3hwIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IEdsb2JhbCBmcm9tIFwiLi4vLi4vbW9kZWxzL2dsb2JhbFwiO1xyXG5leHBvcnQgZGVmYXVsdCB7XHJcbiAgY29uZmlnOiB7XHJcbiAgICBuYXZpZ2F0aW9uQmFyVGl0bGVUZXh0OiAn5oiR55qEJyxcclxuICAgIHVzaW5nQ29tcG9uZW50czoge1xyXG4gICAgICAnd3hjLWJ1dHRvbic6ICdAbWludWkvd3hjLWJ1dHRvbicsXHJcbiAgICAgICd3eGMtaWNvbic6ICdAbWludWkvd3hjLWljb24nLFxyXG4gICAgICAnd3hjLXBhbmVsJzogJ0BtaW51aS93eGMtcGFuZWwnLFxyXG4gICAgfVxyXG4gIH0sXHJcbiAgZGF0YToge30sXHJcbiAgY2xlYXJIaXN0b3J5TGluZXMgKCkge1xyXG4gICAgR2xvYmFsLnNldFZhbCgnSGlzdG9yeUxpbmVzJyAsIFtdKVxyXG4gIH1cclxufSJdfQ==