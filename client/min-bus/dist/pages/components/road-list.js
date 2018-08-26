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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInJvYWQtbGlzdC53eGMiXSwibmFtZXMiOlsicHJvcGVydGllcyIsImRhdGEiLCJ0eXBlIiwiQXJyYXkiLCJ2YWx1ZSIsIm9ic2VydmVyIiwibmV3VmFsIiwib2xkVmFsIiwiY2hhbmdlZFBhdGgiLCJsZW5ndGgiLCJzZXREYXRhIiwiaGlkZXZpZXciLCJ0aXRsZSIsInRpcCIsIm1ldGhvZHMiLCJnb3RvTGluZSIsImUiLCJsaW5lTmFtZSIsImN1cnJlbnRUYXJnZXQiLCJkYXRhc2V0Iiwic2F2ZUhpc3RvcnkiLCJ3eCIsIm5hdmlnYXRlVG8iLCJ1cmwiLCJlbmNvZGVVUklDb21wb25lbnQiXSwibWFwcGluZ3MiOiI7Ozs7OztBQVNFQSxjQUFZO0FBQ1ZDLFVBQU07QUFDSkMsWUFBTUMsS0FERjtBQUVKQyxhQUFPLEVBRkg7QUFHSkMsZ0JBQVUsa0JBQVNDLE1BQVQsRUFBaUJDLE1BQWpCLEVBQXlCQyxXQUF6QixFQUFzQztBQUM3QyxZQUFJRixPQUFPRyxNQUFQLEtBQWtCLENBQXRCLEVBQXlCO0FBQ3ZCLGVBQUtDLE9BQUwsQ0FBYTtBQUNYQyxzQkFBVTtBQURDLFdBQWI7QUFHRCxTQUpELE1BSU87QUFDTixlQUFLRCxPQUFMLENBQWE7QUFDVkMsc0JBQVU7QUFEQSxXQUFiO0FBR0E7QUFDSDtBQWJHO0FBREksRztBQWlCWlYsUUFBTTtBQUNKVyxXQUFPLE1BREg7QUFFSkMsU0FBSyxNQUZEO0FBR0pGLGNBQVU7QUFITixHO0FBS05HLFdBQVM7QUFDUEMsWUFETyxvQkFDR0MsQ0FESCxFQUNNO0FBQ1gsVUFBTUMsV0FBV0QsRUFBRUUsYUFBRixDQUFnQkMsT0FBaEIsQ0FBd0JGLFFBQXpDO0FBQ0EsV0FBS0csV0FBTCxDQUFpQkgsUUFBakI7QUFDQUksU0FBR0MsVUFBSCxDQUFjO0FBQ1pDLHdEQUE4Q0MsbUJBQW1CUCxRQUFuQjtBQURsQyxPQUFkO0FBR0QsS0FQTTtBQVFQRyxlQVJPLHlCQVFRLENBRWQ7QUFWTSIsImZpbGUiOiJyb2FkLWxpc3Qud3hjIiwic291cmNlc0NvbnRlbnQiOlsiZXhwb3J0IGRlZmF1bHQge1xyXG4gIGNvbmZpZzoge1xyXG4gICAgdXNpbmdDb21wb25lbnRzOiB7XHJcbiAgICAgICd3eGMtbGlzdCc6ICdAbWludWkvd3hjLWxpc3QnLFxyXG4gICAgICAnd3hjLWljb24nOiAnQG1pbnVpL3d4Yy1pY29uJyxcclxuICAgICAgJ3d4Yy1hYm5vcic6ICdAbWludWkvd3hjLWFibm9yJyxcclxuICAgICAgXCJ3eGMtbG9hZG1vcmVcIjogXCJAbWludWkvd3hjLWxvYWRtb3JlXCIsXHJcbiAgICB9XHJcbiAgfSxcclxuICBwcm9wZXJ0aWVzOiB7XHJcbiAgICBkYXRhOiB7XHJcbiAgICAgIHR5cGU6IEFycmF5LFxyXG4gICAgICB2YWx1ZTogW10sXHJcbiAgICAgIG9ic2VydmVyOiBmdW5jdGlvbihuZXdWYWwsIG9sZFZhbCwgY2hhbmdlZFBhdGgpIHtcclxuICAgICAgICAgaWYgKG5ld1ZhbC5sZW5ndGggPT09IDApIHtcclxuICAgICAgICAgICB0aGlzLnNldERhdGEoe1xyXG4gICAgICAgICAgICAgaGlkZXZpZXc6IGZhbHNlXHJcbiAgICAgICAgICAgfSlcclxuICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgIHRoaXMuc2V0RGF0YSh7XHJcbiAgICAgICAgICAgICBoaWRldmlldzogdHJ1ZVxyXG4gICAgICAgICAgIH0pXHJcbiAgICAgICAgIH1cclxuICAgICAgfVxyXG4gICAgfVxyXG4gIH0sXHJcbiAgZGF0YToge1xyXG4gICAgdGl0bGU6ICfnqbrnqbrnur/ot68nLFxyXG4gICAgdGlwOiAn56m656m65aaC5LmfJyxcclxuICAgIGhpZGV2aWV3OiB0cnVlXHJcbiAgfSxcclxuICBtZXRob2RzOiB7IFxyXG4gICAgZ290b0xpbmUgKGUpIHtcclxuICAgICAgY29uc3QgbGluZU5hbWUgPSBlLmN1cnJlbnRUYXJnZXQuZGF0YXNldC5saW5lTmFtZVxyXG4gICAgICB0aGlzLnNhdmVIaXN0b3J5KGxpbmVOYW1lKVxyXG4gICAgICB3eC5uYXZpZ2F0ZVRvKHtcclxuICAgICAgICB1cmw6IGAvcGFnZXMvbGluZS9pbmRleD9pc1VwRG93bj0wJmxpbmVOYW1lPSR7ZW5jb2RlVVJJQ29tcG9uZW50KGxpbmVOYW1lKX1gXHJcbiAgICAgIH0pXHJcbiAgICB9LFxyXG4gICAgc2F2ZUhpc3RvcnkgKCkge1xyXG5cclxuICAgIH1cclxuICB9XHJcbn0iXX0=