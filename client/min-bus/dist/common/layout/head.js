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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImhlYWQud3hjIl0sIm5hbWVzIjpbInByb3BlcnRpZXMiLCJub3RpY2UiLCJ0eXBlIiwiU3RyaW5nIiwidmFsdWUiLCJpc1Nob3ciLCJCb29sZWFuIiwiZGF0YSIsIkdsb2JhbCIsImdldEhlYWROb3RpY2VTdGF0dXMiLCJtZXRob2RzIiwib25DbG9zZSIsInNldEhlYWROb3RpY2VTdGF0dXMiLCJ3eCIsInNob3dUb2FzdCIsInRpdGxlIl0sIm1hcHBpbmdzIjoiOzs7Ozs7QUFBQTs7Ozs7OztBQU9FQSxjQUFZO0FBQ1ZDLFlBQVE7QUFDTkMsWUFBTUMsTUFEQTtBQUVOQyxhQUFPO0FBRkQsS0FERTtBQUtWQyxZQUFRO0FBQ05ILFlBQU1JLE9BREE7QUFFTkYsYUFBTztBQUZEO0FBTEUsRztBQVVaRyxRQUFNO0FBQ0pGLFlBQVFHLGlCQUFPQyxtQkFBUDtBQURKLEc7QUFHTkMsV0FBUztBQUNQQyxXQURPLHFCQUNHO0FBQ1JILHVCQUFPSSxtQkFBUCxDQUEyQixLQUEzQjtBQUNBQyxTQUFHQyxTQUFILENBQWEsRUFBQ0MsT0FBTyxRQUFSLEVBQWI7QUFDRDtBQUpNIiwiZmlsZSI6ImhlYWQud3hjIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IEdsb2JhbCBmcm9tIFwiLi4vLi4vbW9kZWxzL2dsb2JhbFwiO1xuZXhwb3J0IGRlZmF1bHQge1xuICBjb25maWc6IHtcbiAgICB1c2luZ0NvbXBvbmVudHM6IHtcbiAgICAgICd3eGMtbm90aWNlJzogJ0BtaW51aS93eGMtbm90aWNlJ1xuICAgIH1cbiAgfSxcbiAgcHJvcGVydGllczoge1xuICAgIG5vdGljZToge1xuICAgICAgdHlwZTogU3RyaW5nLFxuICAgICAgdmFsdWU6ICflhazkuqTlubPlj7DlsIblnKjmr4/ml6Uw54K577yNNueCuei/m+ihjOezu+e7n+WNh+e6p++8jOWNh+e6p+acn+mXtOWwhuaaguWBnOacjeWKoe+8jOaVrOivt+iwheino+OAgidcbiAgICB9LFxuICAgIGlzU2hvdzoge1xuICAgICAgdHlwZTogQm9vbGVhbixcbiAgICAgIHZhbHVlOiB0cnVlXG4gICAgfVxuICB9LFxuICBkYXRhOiB7XG4gICAgaXNTaG93OiBHbG9iYWwuZ2V0SGVhZE5vdGljZVN0YXR1cygpXG4gIH0sXG4gIG1ldGhvZHM6IHtcbiAgICBvbkNsb3NlKCkge1xuICAgICAgR2xvYmFsLnNldEhlYWROb3RpY2VTdGF0dXMoZmFsc2UpXG4gICAgICB3eC5zaG93VG9hc3Qoe3RpdGxlOiAnY2xvc2VkJ30pO1xuICAgIH1cbiAgfVxufSJdfQ==