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
      wx.navigateTo({
        url: '/pages/line/index?isUpDown=0&lineName=' + encodeURIComponent(lineName)
      });
    }
  }
});
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInJvYWQtbGlzdC53eGMiXSwibmFtZXMiOlsicHJvcGVydGllcyIsImRhdGEiLCJ0eXBlIiwiQXJyYXkiLCJ2YWx1ZSIsIm9ic2VydmVyIiwibmV3VmFsIiwib2xkVmFsIiwiY2hhbmdlZFBhdGgiLCJsZW5ndGgiLCJzZXREYXRhIiwiaGlkZXZpZXciLCJ0aXRsZSIsInRpcCIsIm1ldGhvZHMiLCJnb3RvTGluZSIsImUiLCJsaW5lTmFtZSIsImN1cnJlbnRUYXJnZXQiLCJkYXRhc2V0Iiwid3giLCJuYXZpZ2F0ZVRvIiwidXJsIiwiZW5jb2RlVVJJQ29tcG9uZW50Il0sIm1hcHBpbmdzIjoiOzs7Ozs7QUFTRUEsY0FBWTtBQUNWQyxVQUFNO0FBQ0pDLFlBQU1DLEtBREY7QUFFSkMsYUFBTyxFQUZIO0FBR0pDLGdCQUFVLGtCQUFVQyxNQUFWLEVBQWtCQyxNQUFsQixFQUEwQkMsV0FBMUIsRUFBdUM7QUFDL0MsWUFBSUYsT0FBT0csTUFBUCxLQUFrQixDQUF0QixFQUF5QjtBQUN2QixlQUFLQyxPQUFMLENBQWE7QUFDWEMsc0JBQVU7QUFEQyxXQUFiO0FBR0QsU0FKRCxNQUlPO0FBQ0wsZUFBS0QsT0FBTCxDQUFhO0FBQ1hDLHNCQUFVO0FBREMsV0FBYjtBQUdEO0FBQ0Y7QUFiRztBQURJLEc7QUFpQlpWLFFBQU07QUFDSlcsV0FBTyxNQURIO0FBRUpDLFNBQUssTUFGRDtBQUdKRixjQUFVO0FBSE4sRztBQUtORyxXQUFTO0FBQ1BDLFlBRE8sb0JBQ0dDLENBREgsRUFDTTtBQUNYLFVBQU1DLFdBQVdELEVBQUVFLGFBQUYsQ0FBZ0JDLE9BQWhCLENBQXdCRixRQUF6QztBQUNBRyxTQUFHQyxVQUFILENBQWM7QUFDWkMsd0RBQThDQyxtQkFBbUJOLFFBQW5CO0FBRGxDLE9BQWQ7QUFHRDtBQU5NIiwiZmlsZSI6InJvYWQtbGlzdC53eGMiLCJzb3VyY2VzQ29udGVudCI6WyJleHBvcnQgZGVmYXVsdCB7XHJcbiAgY29uZmlnOiB7XHJcbiAgICB1c2luZ0NvbXBvbmVudHM6IHtcclxuICAgICAgJ3d4Yy1saXN0JzogJ0BtaW51aS93eGMtbGlzdCcsXHJcbiAgICAgICd3eGMtaWNvbic6ICdAbWludWkvd3hjLWljb24nLFxyXG4gICAgICAnd3hjLWFibm9yJzogJ0BtaW51aS93eGMtYWJub3InLFxyXG4gICAgICBcInd4Yy1sb2FkbW9yZVwiOiBcIkBtaW51aS93eGMtbG9hZG1vcmVcIixcclxuICAgIH1cclxuICB9LFxyXG4gIHByb3BlcnRpZXM6IHtcclxuICAgIGRhdGE6IHtcclxuICAgICAgdHlwZTogQXJyYXksXHJcbiAgICAgIHZhbHVlOiBbXSxcclxuICAgICAgb2JzZXJ2ZXI6IGZ1bmN0aW9uIChuZXdWYWwsIG9sZFZhbCwgY2hhbmdlZFBhdGgpIHtcclxuICAgICAgICBpZiAobmV3VmFsLmxlbmd0aCA9PT0gMCkge1xyXG4gICAgICAgICAgdGhpcy5zZXREYXRhKHtcclxuICAgICAgICAgICAgaGlkZXZpZXc6IGZhbHNlXHJcbiAgICAgICAgICB9KVxyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICB0aGlzLnNldERhdGEoe1xyXG4gICAgICAgICAgICBoaWRldmlldzogdHJ1ZVxyXG4gICAgICAgICAgfSlcclxuICAgICAgICB9XHJcbiAgICAgIH1cclxuICAgIH1cclxuICB9LFxyXG4gIGRhdGE6IHtcclxuICAgIHRpdGxlOiAn56m656m657q/6LevJyxcclxuICAgIHRpcDogJ+epuuepuuWmguS5nycsXHJcbiAgICBoaWRldmlldzogdHJ1ZVxyXG4gIH0sXHJcbiAgbWV0aG9kczoge1xyXG4gICAgZ290b0xpbmUgKGUpIHtcclxuICAgICAgY29uc3QgbGluZU5hbWUgPSBlLmN1cnJlbnRUYXJnZXQuZGF0YXNldC5saW5lTmFtZVxyXG4gICAgICB3eC5uYXZpZ2F0ZVRvKHtcclxuICAgICAgICB1cmw6IGAvcGFnZXMvbGluZS9pbmRleD9pc1VwRG93bj0wJmxpbmVOYW1lPSR7ZW5jb2RlVVJJQ29tcG9uZW50KGxpbmVOYW1lKX1gXHJcbiAgICAgIH0pXHJcbiAgICB9LFxyXG4gIH1cclxufSJdfQ==