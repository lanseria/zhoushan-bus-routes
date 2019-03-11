'use strict';

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
    showPopup: function showPopup() {
      var popupComponent = this.selectComponent('.J_Popup');
      popupComponent && popupComponent.show();
    },
    hidePopup: function hidePopup() {
      var popupComponent = this.selectComponent('.J_Popup');
      popupComponent && popupComponent.hide();
    },
    gotoLine: function gotoLine(e) {
      var lineName = e.currentTarget.dataset.lineName;
      // this.saveHistory(lineName)
      wx.navigateTo({
        url: '/pages/line/index?isUpDown=0&lineName=' + encodeURIComponent(lineName)
      });
    }
  }
});
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImluZGV4LWNhcmQud3hjIl0sIm5hbWVzIjpbInByb3BlcnRpZXMiLCJkYXRhIiwidHlwZSIsIk9iamVjdCIsInZhbHVlIiwibWV0aG9kcyIsInNob3dQb3B1cCIsInBvcHVwQ29tcG9uZW50Iiwic2VsZWN0Q29tcG9uZW50Iiwic2hvdyIsImhpZGVQb3B1cCIsImhpZGUiLCJnb3RvTGluZSIsImUiLCJsaW5lTmFtZSIsImN1cnJlbnRUYXJnZXQiLCJkYXRhc2V0Iiwid3giLCJuYXZpZ2F0ZVRvIiwidXJsIiwiZW5jb2RlVVJJQ29tcG9uZW50Il0sIm1hcHBpbmdzIjoiOzs7Ozs7QUFPRUEsY0FBWTtBQUNWQyxVQUFNO0FBQ0pDLFlBQU1DLE1BREY7QUFFSkMsYUFBTztBQUZIO0FBREksRztBQU1aSCxRQUFNLEU7QUFHTkksV0FBUztBQUNQQyxhQURPLHVCQUNNO0FBQ1gsVUFBSUMsaUJBQWlCLEtBQUtDLGVBQUwsQ0FBcUIsVUFBckIsQ0FBckI7QUFDQUQsd0JBQWtCQSxlQUFlRSxJQUFmLEVBQWxCO0FBQ0QsS0FKTTtBQUtQQyxhQUxPLHVCQUtNO0FBQ1gsVUFBSUgsaUJBQWlCLEtBQUtDLGVBQUwsQ0FBcUIsVUFBckIsQ0FBckI7QUFDQUQsd0JBQWtCQSxlQUFlSSxJQUFmLEVBQWxCO0FBQ0QsS0FSTTtBQVNQQyxZQVRPLG9CQVNHQyxDQVRILEVBU007QUFDWCxVQUFNQyxXQUFXRCxFQUFFRSxhQUFGLENBQWdCQyxPQUFoQixDQUF3QkYsUUFBekM7QUFDQTtBQUNBRyxTQUFHQyxVQUFILENBQWM7QUFDWkMsd0RBQThDQyxtQkFBbUJOLFFBQW5CO0FBRGxDLE9BQWQ7QUFHRDtBQWZNIiwiZmlsZSI6ImluZGV4LWNhcmQud3hjIiwic291cmNlc0NvbnRlbnQiOlsiZXhwb3J0IGRlZmF1bHQge1xyXG4gIGNvbmZpZzoge1xyXG4gICAgdXNpbmdDb21wb25lbnRzOiB7XHJcbiAgICAgICd3eGMtcG9wdXAnOiAnQG1pbnVpL3d4Yy1wb3B1cCcsXHJcbiAgICAgICdyb2FkLWxpc3QnOiAnLi4vY29tcG9uZW50cy9yb2FkLWxpc3QnXHJcbiAgICB9XHJcbiAgfSxcclxuICBwcm9wZXJ0aWVzOiB7XHJcbiAgICBkYXRhOiB7XHJcbiAgICAgIHR5cGU6IE9iamVjdCxcclxuICAgICAgdmFsdWU6IFtdXHJcbiAgICB9XHJcbiAgfSxcclxuICBkYXRhOiB7XHJcblxyXG4gIH0sXHJcbiAgbWV0aG9kczoge1xyXG4gICAgc2hvd1BvcHVwICgpIHtcclxuICAgICAgbGV0IHBvcHVwQ29tcG9uZW50ID0gdGhpcy5zZWxlY3RDb21wb25lbnQoJy5KX1BvcHVwJyk7XHJcbiAgICAgIHBvcHVwQ29tcG9uZW50ICYmIHBvcHVwQ29tcG9uZW50LnNob3coKTtcclxuICAgIH0sXHJcbiAgICBoaWRlUG9wdXAgKCkge1xyXG4gICAgICBsZXQgcG9wdXBDb21wb25lbnQgPSB0aGlzLnNlbGVjdENvbXBvbmVudCgnLkpfUG9wdXAnKTtcclxuICAgICAgcG9wdXBDb21wb25lbnQgJiYgcG9wdXBDb21wb25lbnQuaGlkZSgpO1xyXG4gICAgfSxcclxuICAgIGdvdG9MaW5lIChlKSB7XHJcbiAgICAgIGNvbnN0IGxpbmVOYW1lID0gZS5jdXJyZW50VGFyZ2V0LmRhdGFzZXQubGluZU5hbWVcclxuICAgICAgLy8gdGhpcy5zYXZlSGlzdG9yeShsaW5lTmFtZSlcclxuICAgICAgd3gubmF2aWdhdGVUbyh7XHJcbiAgICAgICAgdXJsOiBgL3BhZ2VzL2xpbmUvaW5kZXg/aXNVcERvd249MCZsaW5lTmFtZT0ke2VuY29kZVVSSUNvbXBvbmVudChsaW5lTmFtZSl9YFxyXG4gICAgICB9KVxyXG4gICAgfVxyXG4gIH1cclxufSJdfQ==