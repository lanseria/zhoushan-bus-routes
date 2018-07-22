'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _global = require('../../models/global.js');

var _global2 = _interopRequireDefault(_global);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = Component({
  data: {
    notice: '公交平台将在每日0点－6点进行系统升级，升级期间将暂停服务，敬请谅解。',
    isShow: _global2.default.getHeadNoticeStatus()
  },
  methods: {
    onClose: function onClose() {
      _global2.default.setHeadNoticeStatus(false);
      wx.showToast({ title: 'closed' });
    }
  }
});
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImhlYWQud3hjIl0sIm5hbWVzIjpbImRhdGEiLCJub3RpY2UiLCJpc1Nob3ciLCJHbG9iYWwiLCJnZXRIZWFkTm90aWNlU3RhdHVzIiwibWV0aG9kcyIsIm9uQ2xvc2UiLCJzZXRIZWFkTm90aWNlU3RhdHVzIiwid3giLCJzaG93VG9hc3QiLCJ0aXRsZSJdLCJtYXBwaW5ncyI6Ijs7Ozs7O0FBQUE7Ozs7Ozs7QUFPRUEsUUFBTTtBQUNKQyxZQUFRLHFDQURKO0FBRUpDLFlBQVFDLGlCQUFPQyxtQkFBUDtBQUZKLEc7QUFJTkMsV0FBUztBQUNQQyxXQURPLHFCQUNHO0FBQ1JILHVCQUFPSSxtQkFBUCxDQUEyQixLQUEzQjtBQUNBQyxTQUFHQyxTQUFILENBQWEsRUFBQ0MsT0FBTyxRQUFSLEVBQWI7QUFDRDtBQUpNIiwiZmlsZSI6ImhlYWQud3hjIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IEdsb2JhbCBmcm9tIFwiLi4vLi4vbW9kZWxzL2dsb2JhbFwiO1xuZXhwb3J0IGRlZmF1bHQge1xuICBjb25maWc6IHtcbiAgICB1c2luZ0NvbXBvbmVudHM6IHtcbiAgICAgICd3eGMtbm90aWNlJzogJ0BtaW51aS93eGMtbm90aWNlJ1xuICAgIH1cbiAgfSxcbiAgZGF0YToge1xuICAgIG5vdGljZTogJ+WFrOS6pOW5s+WPsOWwhuWcqOavj+aXpTDngrnvvI0254K56L+b6KGM57O757uf5Y2H57qn77yM5Y2H57qn5pyf6Ze05bCG5pqC5YGc5pyN5Yqh77yM5pWs6K+36LCF6Kej44CCJyxcbiAgICBpc1Nob3c6IEdsb2JhbC5nZXRIZWFkTm90aWNlU3RhdHVzKClcbiAgfSxcbiAgbWV0aG9kczoge1xuICAgIG9uQ2xvc2UoKSB7XG4gICAgICBHbG9iYWwuc2V0SGVhZE5vdGljZVN0YXR1cyhmYWxzZSlcbiAgICAgIHd4LnNob3dUb2FzdCh7dGl0bGU6ICdjbG9zZWQnfSk7XG4gICAgfVxuICB9XG59Il19