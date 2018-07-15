'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = Page({
  data: {
    '__code__': {
      readme: ''
    },

    style: 'background: #fff;border-radius: 66rpx;color: #000;'
  },
  /** note: 在 wxp 文件或者页面文件中请去掉 methods 包装 */
  methods: {
    onSubmit: function onSubmit(e) {
      console.log(e.detail.formId);
    }
  }
});
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImluZGV4Lnd4cCJdLCJuYW1lcyI6WyJkYXRhIiwic3R5bGUiLCJtZXRob2RzIiwib25TdWJtaXQiLCJlIiwiY29uc29sZSIsImxvZyIsImRldGFpbCIsImZvcm1JZCJdLCJtYXBwaW5ncyI6Ijs7Ozs7O0FBUUVBLFFBQU07QUFBQTtBQUFBO0FBQUE7O0FBQ0pDLFdBQU87QUFESCxHO0FBR047QUFDQUMsV0FBUztBQUNQQyxZQURPLG9CQUNFQyxDQURGLEVBQ0s7QUFDVkMsY0FBUUMsR0FBUixDQUFZRixFQUFFRyxNQUFGLENBQVNDLE1BQXJCO0FBQ0Q7QUFITSIsImZpbGUiOiJpbmRleC53eHAiLCJzb3VyY2VzQ29udGVudCI6WyJleHBvcnQgZGVmYXVsdCB7XG4gIGNvbmZpZzoge1xuICAgIHVzaW5nQ29tcG9uZW50czoge1xuICAgICAgJ3d4Yy1idXR0b24nOiAnQG1pbnVpL3d4Yy1idXR0b24nLFxuICAgICAgJ3d4Yy1pY29uJzogJ0BtaW51aS93eGMtaWNvbicsXG4gICAgICAnd3hjLXNlYXJjaCc6ICdAbWludWkvd3hjLXNlYXJjaCdcbiAgICB9XG4gIH0sXG4gIGRhdGE6IHtcbiAgICBzdHlsZTogJ2JhY2tncm91bmQ6ICNmZmY7Ym9yZGVyLXJhZGl1czogNjZycHg7Y29sb3I6ICMwMDA7J1xuICB9LFxuICAvKiogbm90ZTog5ZyoIHd4cCDmlofku7bmiJbogIXpobXpnaLmlofku7bkuK3or7fljrvmjokgbWV0aG9kcyDljIXoo4UgKi9cbiAgbWV0aG9kczoge1xuICAgIG9uU3VibWl0KGUpIHtcbiAgICAgIGNvbnNvbGUubG9nKGUuZGV0YWlsLmZvcm1JZClcbiAgICB9XG4gIH1cbn0iXX0=