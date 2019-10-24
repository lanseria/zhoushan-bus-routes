'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _global = require('../../models/global.js');

var _global2 = _interopRequireDefault(_global);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = Component({
  properties: {
    notice: {
      type: String,
      value: '公交平台将在每日0点－6点进行系统升级，升级期间将暂停服务，敬请谅解。'
    },
    isShow: {
      type: Boolean,
      value: true
    }
  },
  data: {
    isShow: _global2.default.getHeadNoticeStatus()
  },
  methods: {
    onClose: function onClose() {
      _global2.default.setHeadNoticeStatus(false);
      wx.showToast({ title: 'closed' });
    }
  }
});
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImhlYWQud3hjIl0sIm5hbWVzIjpbInByb3BlcnRpZXMiLCJub3RpY2UiLCJ0eXBlIiwiU3RyaW5nIiwidmFsdWUiLCJpc1Nob3ciLCJCb29sZWFuIiwiZGF0YSIsIkdsb2JhbCIsImdldEhlYWROb3RpY2VTdGF0dXMiLCJtZXRob2RzIiwib25DbG9zZSIsInNldEhlYWROb3RpY2VTdGF0dXMiLCJ3eCIsInNob3dUb2FzdCIsInRpdGxlIl0sIm1hcHBpbmdzIjoiOzs7Ozs7QUFBQTs7Ozs7OztBQU9FQSxjQUFZO0FBQ1ZDLFlBQVE7QUFDTkMsWUFBTUMsTUFEQTtBQUVOQyxhQUFPO0FBRkQsS0FERTtBQUtWQyxZQUFRO0FBQ05ILFlBQU1JLE9BREE7QUFFTkYsYUFBTztBQUZEO0FBTEUsRztBQVVaRyxRQUFNO0FBQ0pGLFlBQVFHLGlCQUFPQyxtQkFBUDtBQURKLEc7QUFHTkMsV0FBUztBQUNQQyxXQURPLHFCQUNHO0FBQ1JILHVCQUFPSSxtQkFBUCxDQUEyQixLQUEzQjtBQUNBQyxTQUFHQyxTQUFILENBQWEsRUFBQ0MsT0FBTyxRQUFSLEVBQWI7QUFDRDtBQUpNIiwiZmlsZSI6ImhlYWQud3hjIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IEdsb2JhbCBmcm9tIFwiLi4vLi4vbW9kZWxzL2dsb2JhbFwiO1xyXG5leHBvcnQgZGVmYXVsdCB7XHJcbiAgY29uZmlnOiB7XHJcbiAgICB1c2luZ0NvbXBvbmVudHM6IHtcclxuICAgICAgJ3d4Yy1ub3RpY2UnOiAnQG1pbnVpL3d4Yy1ub3RpY2UnXHJcbiAgICB9XHJcbiAgfSxcclxuICBwcm9wZXJ0aWVzOiB7XHJcbiAgICBub3RpY2U6IHtcclxuICAgICAgdHlwZTogU3RyaW5nLFxyXG4gICAgICB2YWx1ZTogJ+WFrOS6pOW5s+WPsOWwhuWcqOavj+aXpTDngrnvvI0254K56L+b6KGM57O757uf5Y2H57qn77yM5Y2H57qn5pyf6Ze05bCG5pqC5YGc5pyN5Yqh77yM5pWs6K+36LCF6Kej44CCJ1xyXG4gICAgfSxcclxuICAgIGlzU2hvdzoge1xyXG4gICAgICB0eXBlOiBCb29sZWFuLFxyXG4gICAgICB2YWx1ZTogdHJ1ZVxyXG4gICAgfVxyXG4gIH0sXHJcbiAgZGF0YToge1xyXG4gICAgaXNTaG93OiBHbG9iYWwuZ2V0SGVhZE5vdGljZVN0YXR1cygpXHJcbiAgfSxcclxuICBtZXRob2RzOiB7XHJcbiAgICBvbkNsb3NlKCkge1xyXG4gICAgICBHbG9iYWwuc2V0SGVhZE5vdGljZVN0YXR1cyhmYWxzZSlcclxuICAgICAgd3guc2hvd1RvYXN0KHt0aXRsZTogJ2Nsb3NlZCd9KTtcclxuICAgIH1cclxuICB9XHJcbn0iXX0=