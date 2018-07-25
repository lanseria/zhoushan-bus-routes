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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImhlYWQud3hjIl0sIm5hbWVzIjpbInByb3BlcnRpZXMiLCJub3RpY2UiLCJ0eXBlIiwiU3RyaW5nIiwidmFsdWUiLCJkYXRhIiwiaXNTaG93IiwiR2xvYmFsIiwiZ2V0SGVhZE5vdGljZVN0YXR1cyIsIm1ldGhvZHMiLCJvbkNsb3NlIiwic2V0SGVhZE5vdGljZVN0YXR1cyIsInd4Iiwic2hvd1RvYXN0IiwidGl0bGUiXSwibWFwcGluZ3MiOiI7Ozs7OztBQUFBOzs7Ozs7O0FBT0VBLGNBQVk7QUFDVkMsWUFBUTtBQUNOQyxZQUFNQyxNQURBO0FBRU5DLGFBQU87QUFGRDtBQURFLEc7QUFNWkMsUUFBTTtBQUNKQyxZQUFRQyxpQkFBT0MsbUJBQVA7QUFESixHO0FBR05DLFdBQVM7QUFDUEMsV0FETyxxQkFDRztBQUNSSCx1QkFBT0ksbUJBQVAsQ0FBMkIsS0FBM0I7QUFDQUMsU0FBR0MsU0FBSCxDQUFhLEVBQUNDLE9BQU8sUUFBUixFQUFiO0FBQ0Q7QUFKTSIsImZpbGUiOiJoZWFkLnd4YyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBHbG9iYWwgZnJvbSBcIi4uLy4uL21vZGVscy9nbG9iYWxcIjtcbmV4cG9ydCBkZWZhdWx0IHtcbiAgY29uZmlnOiB7XG4gICAgdXNpbmdDb21wb25lbnRzOiB7XG4gICAgICAnd3hjLW5vdGljZSc6ICdAbWludWkvd3hjLW5vdGljZSdcbiAgICB9XG4gIH0sXG4gIHByb3BlcnRpZXM6IHtcbiAgICBub3RpY2U6IHtcbiAgICAgIHR5cGU6IFN0cmluZyxcbiAgICAgIHZhbHVlOiAn5YWs5Lqk5bmz5Y+w5bCG5Zyo5q+P5pelMOeCue+8jTbngrnov5vooYzns7vnu5/ljYfnuqfvvIzljYfnuqfmnJ/pl7TlsIbmmoLlgZzmnI3liqHvvIzmlazor7fosIXop6PjgIInXG4gICAgfVxuICB9LFxuICBkYXRhOiB7XG4gICAgaXNTaG93OiBHbG9iYWwuZ2V0SGVhZE5vdGljZVN0YXR1cygpXG4gIH0sXG4gIG1ldGhvZHM6IHtcbiAgICBvbkNsb3NlKCkge1xuICAgICAgR2xvYmFsLnNldEhlYWROb3RpY2VTdGF0dXMoZmFsc2UpXG4gICAgICB3eC5zaG93VG9hc3Qoe3RpdGxlOiAnY2xvc2VkJ30pO1xuICAgIH1cbiAgfVxufSJdfQ==