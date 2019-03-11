'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = Component({
  properties: {
    data: {
      type: Array,
      value: [],
      observer: function observer(newVal, oldVal, changedPath) {
        if (newVal.length === 0) {
          this.setData({
            hideview: false
          });
        } else {
          this.setData({
            hideview: true
          });
        }
      }
    }
  },
  data: {
    title: '空空线路',
    tip: '空空如也',
    hideview: true
  },
  methods: {
    gotoLine: function gotoLine(e) {
      var lineName = e.currentTarget.dataset.lineName;
      this.saveHistory(lineName);
      wx.navigateTo({
        url: '/pages/line/index?isUpDown=0&lineName=' + encodeURIComponent(lineName)
      });
    },
    saveHistory: function saveHistory() {}
  }
});
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInJvYWQtbGlzdC53eGMiXSwibmFtZXMiOlsicHJvcGVydGllcyIsImRhdGEiLCJ0eXBlIiwiQXJyYXkiLCJ2YWx1ZSIsIm9ic2VydmVyIiwibmV3VmFsIiwib2xkVmFsIiwiY2hhbmdlZFBhdGgiLCJsZW5ndGgiLCJzZXREYXRhIiwiaGlkZXZpZXciLCJ0aXRsZSIsInRpcCIsIm1ldGhvZHMiLCJnb3RvTGluZSIsImUiLCJsaW5lTmFtZSIsImN1cnJlbnRUYXJnZXQiLCJkYXRhc2V0Iiwic2F2ZUhpc3RvcnkiLCJ3eCIsIm5hdmlnYXRlVG8iLCJ1cmwiLCJlbmNvZGVVUklDb21wb25lbnQiXSwibWFwcGluZ3MiOiI7Ozs7OztBQVNFQSxjQUFZO0FBQ1ZDLFVBQU07QUFDSkMsWUFBTUMsS0FERjtBQUVKQyxhQUFPLEVBRkg7QUFHSkMsZ0JBQVUsa0JBQVVDLE1BQVYsRUFBa0JDLE1BQWxCLEVBQTBCQyxXQUExQixFQUF1QztBQUMvQyxZQUFJRixPQUFPRyxNQUFQLEtBQWtCLENBQXRCLEVBQXlCO0FBQ3ZCLGVBQUtDLE9BQUwsQ0FBYTtBQUNYQyxzQkFBVTtBQURDLFdBQWI7QUFHRCxTQUpELE1BSU87QUFDTCxlQUFLRCxPQUFMLENBQWE7QUFDWEMsc0JBQVU7QUFEQyxXQUFiO0FBR0Q7QUFDRjtBQWJHO0FBREksRztBQWlCWlYsUUFBTTtBQUNKVyxXQUFPLE1BREg7QUFFSkMsU0FBSyxNQUZEO0FBR0pGLGNBQVU7QUFITixHO0FBS05HLFdBQVM7QUFDUEMsWUFETyxvQkFDR0MsQ0FESCxFQUNNO0FBQ1gsVUFBTUMsV0FBV0QsRUFBRUUsYUFBRixDQUFnQkMsT0FBaEIsQ0FBd0JGLFFBQXpDO0FBQ0EsV0FBS0csV0FBTCxDQUFpQkgsUUFBakI7QUFDQUksU0FBR0MsVUFBSCxDQUFjO0FBQ1pDLHdEQUE4Q0MsbUJBQW1CUCxRQUFuQjtBQURsQyxPQUFkO0FBR0QsS0FQTTtBQVFQRyxlQVJPLHlCQVFRLENBRWQ7QUFWTSIsImZpbGUiOiJyb2FkLWxpc3Qud3hjIiwic291cmNlc0NvbnRlbnQiOlsiZXhwb3J0IGRlZmF1bHQge1xyXG4gIGNvbmZpZzoge1xyXG4gICAgdXNpbmdDb21wb25lbnRzOiB7XHJcbiAgICAgICd3eGMtbGlzdCc6ICdAbWludWkvd3hjLWxpc3QnLFxyXG4gICAgICAnd3hjLWljb24nOiAnQG1pbnVpL3d4Yy1pY29uJyxcclxuICAgICAgJ3d4Yy1hYm5vcic6ICdAbWludWkvd3hjLWFibm9yJyxcclxuICAgICAgXCJ3eGMtbG9hZG1vcmVcIjogXCJAbWludWkvd3hjLWxvYWRtb3JlXCIsXHJcbiAgICB9XHJcbiAgfSxcclxuICBwcm9wZXJ0aWVzOiB7XHJcbiAgICBkYXRhOiB7XHJcbiAgICAgIHR5cGU6IEFycmF5LFxyXG4gICAgICB2YWx1ZTogW10sXHJcbiAgICAgIG9ic2VydmVyOiBmdW5jdGlvbiAobmV3VmFsLCBvbGRWYWwsIGNoYW5nZWRQYXRoKSB7XHJcbiAgICAgICAgaWYgKG5ld1ZhbC5sZW5ndGggPT09IDApIHtcclxuICAgICAgICAgIHRoaXMuc2V0RGF0YSh7XHJcbiAgICAgICAgICAgIGhpZGV2aWV3OiBmYWxzZVxyXG4gICAgICAgICAgfSlcclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgdGhpcy5zZXREYXRhKHtcclxuICAgICAgICAgICAgaGlkZXZpZXc6IHRydWVcclxuICAgICAgICAgIH0pXHJcbiAgICAgICAgfVxyXG4gICAgICB9XHJcbiAgICB9XHJcbiAgfSxcclxuICBkYXRhOiB7XHJcbiAgICB0aXRsZTogJ+epuuepuue6v+i3rycsXHJcbiAgICB0aXA6ICfnqbrnqbrlpoLkuZ8nLFxyXG4gICAgaGlkZXZpZXc6IHRydWVcclxuICB9LFxyXG4gIG1ldGhvZHM6IHtcclxuICAgIGdvdG9MaW5lIChlKSB7XHJcbiAgICAgIGNvbnN0IGxpbmVOYW1lID0gZS5jdXJyZW50VGFyZ2V0LmRhdGFzZXQubGluZU5hbWVcclxuICAgICAgdGhpcy5zYXZlSGlzdG9yeShsaW5lTmFtZSlcclxuICAgICAgd3gubmF2aWdhdGVUbyh7XHJcbiAgICAgICAgdXJsOiBgL3BhZ2VzL2xpbmUvaW5kZXg/aXNVcERvd249MCZsaW5lTmFtZT0ke2VuY29kZVVSSUNvbXBvbmVudChsaW5lTmFtZSl9YFxyXG4gICAgICB9KVxyXG4gICAgfSxcclxuICAgIHNhdmVIaXN0b3J5ICgpIHtcclxuXHJcbiAgICB9XHJcbiAgfVxyXG59Il19