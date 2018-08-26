"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = Component({
  properties: {
    data: {
      type: Object,
      value: []
    }
  },
  data: {},
  methods: {
    gotoLine: function gotoLine(e) {
      var lineName = e.currentTarget.dataset.lineName;
      // this.saveHistory(lineName)
      wx.navigateTo({
        url: "/pages/line/index?isUpDown=0&lineName=" + encodeURIComponent(lineName)
      });
    }
  }
});
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImluZGV4LWNhcmQud3hjIl0sIm5hbWVzIjpbInByb3BlcnRpZXMiLCJkYXRhIiwidHlwZSIsIk9iamVjdCIsInZhbHVlIiwibWV0aG9kcyIsImdvdG9MaW5lIiwiZSIsImxpbmVOYW1lIiwiY3VycmVudFRhcmdldCIsImRhdGFzZXQiLCJ3eCIsIm5hdmlnYXRlVG8iLCJ1cmwiLCJlbmNvZGVVUklDb21wb25lbnQiXSwibWFwcGluZ3MiOiI7Ozs7OztBQUtFQSxjQUFZO0FBQ1ZDLFVBQU07QUFDSkMsWUFBTUMsTUFERjtBQUVKQyxhQUFPO0FBRkg7QUFESSxHO0FBTVpILFFBQU0sRTtBQUdOSSxXQUFTO0FBQ1BDLFlBRE8sb0JBQ0dDLENBREgsRUFDTTtBQUNYLFVBQU1DLFdBQVdELEVBQUVFLGFBQUYsQ0FBZ0JDLE9BQWhCLENBQXdCRixRQUF6QztBQUNBO0FBQ0FHLFNBQUdDLFVBQUgsQ0FBYztBQUNaQyx3REFBOENDLG1CQUFtQk4sUUFBbkI7QUFEbEMsT0FBZDtBQUdEO0FBUE0iLCJmaWxlIjoiaW5kZXgtY2FyZC53eGMiLCJzb3VyY2VzQ29udGVudCI6WyJleHBvcnQgZGVmYXVsdCB7XHJcbiAgY29uZmlnOiB7XHJcbiAgICB1c2luZ0NvbXBvbmV0czoge1xyXG4gICAgfVxyXG4gIH0sXHJcbiAgcHJvcGVydGllczoge1xyXG4gICAgZGF0YToge1xyXG4gICAgICB0eXBlOiBPYmplY3QsXHJcbiAgICAgIHZhbHVlOiBbXVxyXG4gICAgfVxyXG4gIH0sXHJcbiAgZGF0YToge1xyXG4gICAgICBcclxuICB9LFxyXG4gIG1ldGhvZHM6IHtcclxuICAgIGdvdG9MaW5lIChlKSB7XHJcbiAgICAgIGNvbnN0IGxpbmVOYW1lID0gZS5jdXJyZW50VGFyZ2V0LmRhdGFzZXQubGluZU5hbWVcclxuICAgICAgLy8gdGhpcy5zYXZlSGlzdG9yeShsaW5lTmFtZSlcclxuICAgICAgd3gubmF2aWdhdGVUbyh7XHJcbiAgICAgICAgdXJsOiBgL3BhZ2VzL2xpbmUvaW5kZXg/aXNVcERvd249MCZsaW5lTmFtZT0ke2VuY29kZVVSSUNvbXBvbmVudChsaW5lTmFtZSl9YFxyXG4gICAgICB9KVxyXG4gICAgfVxyXG4gIH1cclxufSJdfQ==