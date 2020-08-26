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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImhvdC1jYXJkLnd4YyJdLCJuYW1lcyI6WyJwcm9wZXJ0aWVzIiwiZGF0YSIsInR5cGUiLCJPYmplY3QiLCJ2YWx1ZSIsIm1ldGhvZHMiLCJnb3RvTGluZSIsImUiLCJsaW5lTmFtZSIsImN1cnJlbnRUYXJnZXQiLCJkYXRhc2V0Iiwid3giLCJuYXZpZ2F0ZVRvIiwidXJsIiwiZW5jb2RlVVJJQ29tcG9uZW50Il0sIm1hcHBpbmdzIjoiOzs7Ozs7QUFLRUEsY0FBWTtBQUNWQyxVQUFNO0FBQ0pDLFlBQU1DLE1BREY7QUFFSkMsYUFBTztBQUZIO0FBREksRztBQU1aSCxRQUFNLEU7QUFHTkksV0FBUztBQUNQQyxZQURPLG9CQUNHQyxDQURILEVBQ007QUFDWCxVQUFNQyxXQUFXRCxFQUFFRSxhQUFGLENBQWdCQyxPQUFoQixDQUF3QkYsUUFBekM7QUFDQTtBQUNBRyxTQUFHQyxVQUFILENBQWM7QUFDWkMsd0RBQThDQyxtQkFBbUJOLFFBQW5CO0FBRGxDLE9BQWQ7QUFHRDtBQVBNIiwiZmlsZSI6ImhvdC1jYXJkLnd4YyIsInNvdXJjZXNDb250ZW50IjpbImV4cG9ydCBkZWZhdWx0IHtcclxuICBjb25maWc6IHtcclxuICAgIHVzaW5nQ29tcG9uZXRzOiB7XHJcbiAgICB9XHJcbiAgfSxcclxuICBwcm9wZXJ0aWVzOiB7XHJcbiAgICBkYXRhOiB7XHJcbiAgICAgIHR5cGU6IE9iamVjdCxcclxuICAgICAgdmFsdWU6IFtdXHJcbiAgICB9XHJcbiAgfSxcclxuICBkYXRhOiB7XHJcblxyXG4gIH0sXHJcbiAgbWV0aG9kczoge1xyXG4gICAgZ290b0xpbmUgKGUpIHtcclxuICAgICAgY29uc3QgbGluZU5hbWUgPSBlLmN1cnJlbnRUYXJnZXQuZGF0YXNldC5saW5lTmFtZVxyXG4gICAgICAvLyB0aGlzLnNhdmVIaXN0b3J5KGxpbmVOYW1lKVxyXG4gICAgICB3eC5uYXZpZ2F0ZVRvKHtcclxuICAgICAgICB1cmw6IGAvcGFnZXMvbGluZS9pbmRleD9pc1VwRG93bj0wJmxpbmVOYW1lPSR7ZW5jb2RlVVJJQ29tcG9uZW50KGxpbmVOYW1lKX1gXHJcbiAgICAgIH0pXHJcbiAgICB9XHJcbiAgfVxyXG59Il19