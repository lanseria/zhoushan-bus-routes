'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = Component({
  data: {},
  methods: {
    handleJumpHome: function handleJumpHome() {
      wx.redirectTo({
        url: '/pages/home/index'
      });
    },
    handleJumpHotrouter: function handleJumpHotrouter() {
      wx.redirectTo({
        url: '/pages/hotrouter/index'
      });
    }
  }
});
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImZvb3Qud3hjIl0sIm5hbWVzIjpbImRhdGEiLCJtZXRob2RzIiwiaGFuZGxlSnVtcEhvbWUiLCJ3eCIsInJlZGlyZWN0VG8iLCJ1cmwiLCJoYW5kbGVKdW1wSG90cm91dGVyIl0sIm1hcHBpbmdzIjoiOzs7Ozs7QUFPRUEsUUFBTSxFO0FBQ05DLFdBQVM7QUFDUEMsa0JBRE8sNEJBQ1c7QUFDaEJDLFNBQUdDLFVBQUgsQ0FBYztBQUNaQyxhQUFLO0FBRE8sT0FBZDtBQUdELEtBTE07QUFNUEMsdUJBTk8saUNBTWdCO0FBQ3JCSCxTQUFHQyxVQUFILENBQWM7QUFDWkMsYUFBSztBQURPLE9BQWQ7QUFHRDtBQVZNIiwiZmlsZSI6ImZvb3Qud3hjIiwic291cmNlc0NvbnRlbnQiOlsiZXhwb3J0IGRlZmF1bHQge1xuICBjb25maWc6IHtcbiAgICB1c2luZ0NvbXBvbmVudHM6IHtcbiAgICAgICd3eGMtZmxleCc6ICdAbWludWkvd3hjLWZsZXgnLFxuICAgICAgJ3d4Yy1pY29uJzogJ0BtaW51aS93eGMtaWNvbidcbiAgICB9XG4gIH0sXG4gIGRhdGE6IHt9LFxuICBtZXRob2RzOiB7XG4gICAgaGFuZGxlSnVtcEhvbWUgKCkge1xuICAgICAgd3gucmVkaXJlY3RUbyh7XG4gICAgICAgIHVybDogJy9wYWdlcy9ob21lL2luZGV4J1xuICAgICAgfSlcbiAgICB9LFxuICAgIGhhbmRsZUp1bXBIb3Ryb3V0ZXIgKCkge1xuICAgICAgd3gucmVkaXJlY3RUbyh7XG4gICAgICAgIHVybDogJy9wYWdlcy9ob3Ryb3V0ZXIvaW5kZXgnXG4gICAgICB9KVxuICAgIH1cbiAgfVxufSJdfQ==