"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _api = require("../../models/api.js");

var _api2 = _interopRequireDefault(_api);

var _global = require("../../models/global.js");

var _global2 = _interopRequireDefault(_global);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = Page({
  data: {
    "__code__": {
      readme: ""
    },

    title: '空空线路',
    tip: '空空如也',
    location: {},
    hideview: true,
    scale: 14,
    notice: '',
    lineName: "",
    isUpDown: 0,
    line: {},
    stationsLength: 0,
    lineDetail: {},
    isUpDownName: '',
    busWaiting: {},
    markers: [],
    mapStyle: '',
    viewHeight: 0.5,
    reHeight: {
      min: 0.5,
      max: 0
    },
    polyline: [{
      points: [],
      color: "#FF0000DD",
      width: 2,
      dottedLine: true
    }]
  },
  onLoad: function onLoad(options) {
    var lineName = decodeURIComponent(options.lineName);
    var isUpDown = decodeURIComponent(options.isUpDown);
    this.setData({ lineName: lineName, isUpDown: isUpDown });
    wx.showLoading({
      title: '加载中'
    });
    this.updateLine(lineName, isUpDown);
    this.updateBusWaiting(lineName, isUpDown);
  },
  onShow: function onShow() {
    var _data = this.data,
        lineDetail = _data.lineDetail,
        lineName = _data.lineName,
        isUpDownName = _data.isUpDownName,
        isUpDown = _data.isUpDown;

    this.updateBusWaiting(lineName, isUpDown);
  },
  updateBusWaiting: function updateBusWaiting(lineName, isUpDown) {
    var _this = this;

    var params = { lineName: lineName, isUpDown: isUpDown, stationNum: 1 };
    _api2.default.getBusWaiting(params, {}, false).then(function (res) {
      var busWaiting = JSON.parse(res.data.data);
      var bus = busWaiting.bus;

      var hideview = bus.length === 0 ? false : true;
      var markers = _this.data.markers;
      var filterBus = bus.map(function (b) {
        var locationArray = _global2.default.wgs84togcj02(b.lng, b.lat);
        markers.push({
          iconPath: _global2.default.getVal("bus-icon-png"),
          id: b.busNo,
          title: b.busNo,
          latitude: locationArray[1],
          longitude: locationArray[0],
          width: 25,
          height: 25,
          alpha: 1,
          label: {
            content: b.busNo
          }
        });
        return {
          longitude: locationArray[0],
          latitude: locationArray[1],
          busNo: b.busNo,
          away: b.away,
          factor: b.factor,
          isStation: b.isStation,
          lastStation: b.lastStation,
          location: {
            longitude: locationArray[0],
            latitude: locationArray[1]
          }
        };
      }).reverse();
      busWaiting.bus = filterBus;
      _this.setData({ busWaiting: busWaiting, markers: markers, hideview: hideview });
      wx.hideLoading();
    });
  },
  updateLine: function updateLine(lineName, isUpDown) {
    var _this2 = this;

    var params = { lineName: lineName, isUpDown: isUpDown };
    _api2.default.getLine(params, {}, false).then(function (res) {
      var line = JSON.parse(res.data.data);
      var markers = [];
      var points = line.stations.map(function (p, i) {
        var locationArray = _global2.default.wgs84togcj02(p.lng, p.lat);
        markers.push({
          iconPath: _global2.default.getVal("location-png"),
          id: p.stationId,
          title: p.stationName,
          latitude: locationArray[1],
          longitude: locationArray[0],
          width: 25,
          height: 25,
          alpha: 0.8,
          label: {
            content: p.stationName
          }
        });
        return {
          longitude: locationArray[0],
          latitude: locationArray[1]
        };
      });
      var polyline = _this2.data.polyline;
      polyline[0].points = points;
      var isUpDownName = isUpDown == 0 ? '上行' : '下行';
      var stationsLength = line.stations.length;
      var lineDetail = {
        startStation: line.stations[0].stationName,
        endStation: line.stations[stationsLength - 1].stationName
      };
      var notice = lineName + ":" + isUpDownName + ".\u8D77\u59CB\u7AD9:" + lineDetail.startStation + ",\u7EC8\u70B9\u7AD9:" + lineDetail.endStation + "." + line.lineInfo;
      wx.setNavigationBarTitle({
        title: lineDetail.startStation + " \u2192 " + lineDetail.endStation
      });
      _this2.setData({
        isUpDownName: isUpDownName,
        lineDetail: lineDetail,
        stationsLength: stationsLength,
        line: line,
        notice: notice,
        polyline: polyline,
        markers: markers,
        location: _global2.default.getVal("location-data")
      });
      wx.hideLoading();
    });
  },
  handleZoom: function handleZoom() {
    if (this.data.viewHeight === 0.5) {
      this.setData({
        mapStyle: "height: 90vh;",
        viewHeight: 1
      });
    } else {
      this.setData({
        mapStyle: "",
        viewHeight: 0.5
      });
    }
  },
  handleConversion: function handleConversion() {
    var isUpDown = 1 - this.data.isUpDown;
    var lineName = this.data.lineName;

    var isUpDownName = isUpDown == 0 ? '上行' : '下行';
    wx.showLoading({
      title: "\u6362\u4E3A" + isUpDownName
    });
    this.updateLine(lineName, isUpDown);
    this.updateBusWaiting(lineName, isUpDown);
    this.setData({
      isUpDown: isUpDown, isUpDownName: isUpDownName
    });
  },
  handleRefresh: function handleRefresh() {
    var markers = this.data.markers;
    // console.log(markers)

    var m = markers.filter(function (f) {
      return f.alpha < 1;
    });
    this.setData({ markers: m });
    // console.log(m)
    wx.showLoading({
      title: '刷新中'
    });
    var _data2 = this.data,
        lineName = _data2.lineName,
        isUpDown = _data2.isUpDown;

    this.updateBusWaiting(lineName, isUpDown);
  },
  handleLocation: function handleLocation() {
    this.setData({
      location: _global2.default.getVal("location-data")
    });
  },
  handleSetLocationCenter: function handleSetLocationCenter(e) {
    var currentTarget = e.currentTarget;
    var dataset = currentTarget.dataset;
    var location = dataset.location;

    this.setData({ location: location });
  },
  regionchange: function regionchange(e) {
    console.log(e.type);
  },
  markertap: function markertap(e) {
    console.log(e.markerId);
  },
  controltap: function controltap(e) {
    console.log(e.controlId);
  }
});
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImluZGV4Lnd4cCJdLCJuYW1lcyI6WyJkYXRhIiwidGl0bGUiLCJ0aXAiLCJsb2NhdGlvbiIsImhpZGV2aWV3Iiwic2NhbGUiLCJub3RpY2UiLCJsaW5lTmFtZSIsImlzVXBEb3duIiwibGluZSIsInN0YXRpb25zTGVuZ3RoIiwibGluZURldGFpbCIsImlzVXBEb3duTmFtZSIsImJ1c1dhaXRpbmciLCJtYXJrZXJzIiwibWFwU3R5bGUiLCJ2aWV3SGVpZ2h0IiwicmVIZWlnaHQiLCJtaW4iLCJtYXgiLCJwb2x5bGluZSIsInBvaW50cyIsImNvbG9yIiwid2lkdGgiLCJkb3R0ZWRMaW5lIiwib25Mb2FkIiwib3B0aW9ucyIsImRlY29kZVVSSUNvbXBvbmVudCIsInNldERhdGEiLCJ3eCIsInNob3dMb2FkaW5nIiwidXBkYXRlTGluZSIsInVwZGF0ZUJ1c1dhaXRpbmciLCJvblNob3ciLCJwYXJhbXMiLCJzdGF0aW9uTnVtIiwiQnVzIiwiZ2V0QnVzV2FpdGluZyIsInRoZW4iLCJKU09OIiwicGFyc2UiLCJyZXMiLCJidXMiLCJsZW5ndGgiLCJmaWx0ZXJCdXMiLCJtYXAiLCJsb2NhdGlvbkFycmF5IiwiR2xvYmFsIiwid2dzODR0b2djajAyIiwiYiIsImxuZyIsImxhdCIsInB1c2giLCJpY29uUGF0aCIsImdldFZhbCIsImlkIiwiYnVzTm8iLCJsYXRpdHVkZSIsImxvbmdpdHVkZSIsImhlaWdodCIsImFscGhhIiwibGFiZWwiLCJjb250ZW50IiwiYXdheSIsImZhY3RvciIsImlzU3RhdGlvbiIsImxhc3RTdGF0aW9uIiwicmV2ZXJzZSIsImhpZGVMb2FkaW5nIiwiZ2V0TGluZSIsInN0YXRpb25zIiwicCIsImkiLCJzdGF0aW9uSWQiLCJzdGF0aW9uTmFtZSIsInN0YXJ0U3RhdGlvbiIsImVuZFN0YXRpb24iLCJsaW5lSW5mbyIsInNldE5hdmlnYXRpb25CYXJUaXRsZSIsImhhbmRsZVpvb20iLCJoYW5kbGVDb252ZXJzaW9uIiwiaGFuZGxlUmVmcmVzaCIsIm0iLCJmaWx0ZXIiLCJmIiwiaGFuZGxlTG9jYXRpb24iLCJoYW5kbGVTZXRMb2NhdGlvbkNlbnRlciIsImUiLCJjdXJyZW50VGFyZ2V0IiwiZGF0YXNldCIsInJlZ2lvbmNoYW5nZSIsImNvbnNvbGUiLCJsb2ciLCJ0eXBlIiwibWFya2VydGFwIiwibWFya2VySWQiLCJjb250cm9sdGFwIiwiY29udHJvbElkIl0sIm1hcHBpbmdzIjoiOzs7Ozs7QUFBQTs7OztBQUNBOzs7Ozs7O0FBYUVBLFFBQU07QUFBQTtBQUFBO0FBQUE7O0FBQ0pDLFdBQU8sTUFESDtBQUVKQyxTQUFLLE1BRkQ7QUFHSkMsY0FBVSxFQUhOO0FBSUpDLGNBQVUsSUFKTjtBQUtKQyxXQUFPLEVBTEg7QUFNSkMsWUFBUSxFQU5KO0FBT0pDLGNBQVUsRUFQTjtBQVFKQyxjQUFVLENBUk47QUFTSkMsVUFBTSxFQVRGO0FBVUpDLG9CQUFnQixDQVZaO0FBV0pDLGdCQUFZLEVBWFI7QUFZSkMsa0JBQWMsRUFaVjtBQWFKQyxnQkFBWSxFQWJSO0FBY0pDLGFBQVMsRUFkTDtBQWVKQyxjQUFVLEVBZk47QUFnQkpDLGdCQUFZLEdBaEJSO0FBaUJKQyxjQUFVO0FBQ1JDLFdBQUssR0FERztBQUVSQyxXQUFLO0FBRkcsS0FqQk47QUFxQkpDLGNBQVUsQ0FDUjtBQUNFQyxjQUFRLEVBRFY7QUFFRUMsYUFBTyxXQUZUO0FBR0VDLGFBQU8sQ0FIVDtBQUlFQyxrQkFBWTtBQUpkLEtBRFE7QUFyQk4sRztBQThCTkMsUSxrQkFBUUMsTyxFQUFTO0FBQ2YsUUFBTW5CLFdBQVdvQixtQkFBbUJELFFBQVFuQixRQUEzQixDQUFqQjtBQUNBLFFBQU1DLFdBQVdtQixtQkFBbUJELFFBQVFsQixRQUEzQixDQUFqQjtBQUNBLFNBQUtvQixPQUFMLENBQWEsRUFBRXJCLGtCQUFGLEVBQVlDLGtCQUFaLEVBQWI7QUFDQXFCLE9BQUdDLFdBQUgsQ0FBZTtBQUNiN0IsYUFBTztBQURNLEtBQWY7QUFHQSxTQUFLOEIsVUFBTCxDQUFnQnhCLFFBQWhCLEVBQTBCQyxR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QUFSLENBQWU7QUFBQSxhQUFLQyxFQUFFeEIsS0FBRixHQUFVLENBQWY7QUFBQSxLQUFmLENBQVY7QUFDQSxTQUFLaEMsT0FBTCxDQUFhLEVBQUVkLFNBQVNvRSxDQUFYLEVBQWI7QUFDQTtBQUNBckQsT0FBR0MsV0FBSCxDQUFlO0FBQ2I3QixhQUFPO0FBRE0sS0FBZjtBQU5lLGlCQVNnQixLQUFLRCxJQVRyQjtBQUFBLFFBU1BPLFFBVE8sVUFTUEEsUUFUTztBQUFBLFFBU0dDLFFBVEgsVUFTR0EsUUFUSDs7QUFVZixTQUFLd0IsZ0JBQUwsQ0FBc0J6QixRQUF0QixFQUFnQ0MsUUFBaEM7QUFDRCxHO0FBQ0Q2RSxnQiw0QkFBa0I7QUFDaEIsU0FBS3pELE9BQUwsQ0FBYTtBQUNYekIsZ0JBQVU0QyxpQkFBT08sTUFBUCxDQUFjLGVBQWQ7QUFEQyxLQUFiO0FBR0QsRztBQUNEZ0MseUIsbUNBQXlCQyxDLEVBQUc7QUFBQSxRQUNsQkMsYUFEa0IsR0FDQUQsQ0FEQSxDQUNsQkMsYUFEa0I7QUFBQSxRQUVsQkMsT0FGa0IsR0FFTkQsYUFGTSxDQUVsQkMsT0FGa0I7QUFBQSxRQUdsQnRGLFFBSGtCLEdBR0xzRixPQUhLLENBR2xCdEYsUUFIa0I7O0FBSTFCLFNBQUt5QixPQUFMLENBQWEsRUFBRXpCLGtCQUFGLEVBQWI7QUFDRCxHO0FBQ0R1RixjLHdCQUFjSCxDLEVBQUc7QUFDZkksWUFBUUMsR0FBUixDQUFZTCxFQUFFTSxJQUFkO0FBQ0QsRztBQUNEQyxXLHFCQUFXUCxDLEVBQUc7QUFDWkksWUFBUUMsR0FBUixDQUFZTCxFQUFFUSxRQUFkO0FBQ0QsRztBQUNEQyxZLHNCQUFZVCxDLEVBQUc7QUFDYkksWUFBUUMsR0FBUixDQUFZTCxFQUFFVSxTQUFkO0FBQ0QiLCJmaWxlIjoiaW5kZXgud3hwIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IEJ1cyBmcm9tIFwiLi4vLi4vbW9kZWxzL2FwaVwiO1xyXG5pbXBvcnQgR2xvYmFsIGZyb20gXCIuLi8uLi9tb2RlbHMvZ2xvYmFsXCI7XHJcblxyXG5leHBvcnQgZGVmYXVsdCB7XHJcbiAgY29uZmlnOiB7XHJcbiAgICBkaXNhYmxlU2Nyb2xsOiB0cnVlLFxyXG4gICAgbmF2aWdhdGlvbkJhclRpdGxlVGV4dDogXCLot6/nur9cIixcclxuICAgIHVzaW5nQ29tcG9uZW50czoge1xyXG4gICAgICBcImxheW91dC1oZWFkXCI6IFwibGF5b3V0L2hlYWRcIixcclxuICAgICAgXCJ3eGMtbGlzdFwiOiBcIkBtaW51aS93eGMtbGlzdFwiLFxyXG4gICAgICBcInd4Yy1pY29uXCI6IFwiQG1pbnVpL3d4Yy1pY29uXCIsXHJcbiAgICAgICd3eGMtYWJub3InOiAnQG1pbnVpL3d4Yy1hYm5vcicsXHJcbiAgICB9XHJcbiAgfSxcclxuICBkYXRhOiB7XHJcbiAgICB0aXRsZTogJ+epuuepuue6v+i3rycsXHJcbiAgICB0aXA6ICfnqbrnqbrlpoLkuZ8nLFxyXG4gICAgbG9jYXRpb246IHt9LFxyXG4gICAgaGlkZXZpZXc6IHRydWUsXHJcbiAgICBzY2FsZTogMTQsXHJcbiAgICBub3RpY2U6ICcnLFxyXG4gICAgbGluZU5hbWU6IFwiXCIsXHJcbiAgICBpc1VwRG93bjogMCxcclxuICAgIGxpbmU6IHt9LFxyXG4gICAgc3RhdGlvbnNMZW5ndGg6IDAsXHJcbiAgICBsaW5lRGV0YWlsOiB7fSxcclxuICAgIGlzVXBEb3duTmFtZTogJycsXHJcbiAgICBidXNXYWl0aW5nOiB7fSxcclxuICAgIG1hcmtlcnM6IFtdLFxyXG4gICAgbWFwU3R5bGU6ICcnLFxyXG4gICAgdmlld0hlaWdodDogMC41LFxyXG4gICAgcmVIZWlnaHQ6IHtcclxuICAgICAgbWluOiAwLjUsXHJcbiAgICAgIG1heDogMFxyXG4gICAgfSxcclxuICAgIHBvbHlsaW5lOiBbXHJcbiAgICAgIHtcclxuICAgICAgICBwb2ludHM6IFtdLFxyXG4gICAgICAgIGNvbG9yOiBcIiNGRjAwMDBERFwiLFxyXG4gICAgICAgIHdpZHRoOiAyLFxyXG4gICAgICAgIGRvdHRlZExpbmU6IHRydWVcclxuICAgICAgfVxyXG4gICAgXVxyXG4gIH0sXHJcbiAgb25Mb2FkIChvcHRpb25zKSB7XHJcbiAgICBjb25zdCBsaW5lTmFtZSA9IGRlY29kZVVSSUNvbXBvbmVudChvcHRpb25zLmxpbmVOYW1lKTtcclxuICAgIGNvbnN0IGlzVXBEb3duID0gZGVjb2RlVVJJQ29tcG9uZW50KG9wdGlvbnMuaXNVcERvd24pO1xyXG4gICAgdGhpcy5zZXREYXRhKHsgbGluZU5hbWUsIGlzVXBEb3duIH0pO1xyXG4gICAgd3guc2hvd0xvYWRpbmcoe1xyXG4gICAgICB0aXRsZTogJ+WKoOi9veS4rScsXHJcbiAgICB9KVxyXG4gICAgdGhpcy51cGRhdGVMaW5lKGxpbmVOYW1lLCBpc1VwRG93bilcclxuICAgIHRoaXMudXBkYXRlQnVzV2FpdGluZyhsaW5lTmFtZSwgaXNVcERvd24pXHJcbiAgfSxcclxuICBvblNob3cgKCkge1xyXG4gICAgY29uc3QgeyBsaW5lRGV0YWlsLCBsaW5lTmFtZSwgaXNVcERvd25OYW1lLCBpc1VwRG93biB9ID0gdGhpcy5kYXRhO1xyXG4gICAgdGhpcy51cGRhdGVCdXNXYWl0aW5nKGxpbmVOYW1lLCBpc1VwRG93bilcclxuICB9LFxyXG4gIHVwZGF0ZUJ1c1dhaXRpbmcgKGxpbmVOYW1lLCBpc1VwRG93bikge1xyXG4gICAgY29uc3QgcGFyYW1zID0geyBsaW5lTmFtZSwgaXNVcERvd24sIHN0YXRpb25OdW06IDEgfTtcclxuICAgIEJ1cy5nZXRCdXNXYWl0aW5nKHBhcmFtcywge30sIGZhbHNlKS50aGVuKHJlcyA9PiB7XHJcbiAgICAgIGNvbnN0IGJ1c1dhaXRpbmcgPSBKU09OLnBhcnNlKHJlcy5kYXRhLmRhdGEpO1xyXG4gICAgICBjb25zdCB7IGJ1cyB9ID0gYnVzV2FpdGluZztcclxuICAgICAgY29uc3QgaGlkZXZpZXcgPSBidXMubGVuZ3RoID09PSAwID8gZmFsc2UgOiB0cnVlO1xyXG4gICAgICBjb25zdCBtYXJrZXJzID0gdGhpcy5kYXRhLm1hcmtlcnM7XHJcbiAgICAgIGNvbnN0IGZpbHRlckJ1cyA9IGJ1cy5tYXAoYiA9PiB7XHJcbiAgICAgICAgY29uc3QgbG9jYXRpb25BcnJheSA9IEdsb2JhbC53Z3M4NHRvZ2NqMDIoYi5sbmcsIGIubGF0KTtcclxuICAgICAgICBtYXJrZXJzLnB1c2goe1xyXG4gICAgICAgICAgaWNvblBhdGg6IEdsb2JhbC5nZXRWYWwoXCJidXMtaWNvbi1wbmdcIiksXHJcbiAgICAgICAgICBpZDogYi5idXNObyxcclxuICAgICAgICAgIHRpdGxlOiBiLmJ1c05vLFxyXG4gICAgICAgICAgbGF0aXR1ZGU6IGxvY2F0aW9uQXJyYXlbMV0sXHJcbiAgICAgICAgICBsb25naXR1ZGU6IGxvY2F0aW9uQXJyYXlbMF0sXHJcbiAgICAgICAgICB3aWR0aDogMjUsXHJcbiAgICAgICAgICBoZWlnaHQ6IDI1LFxyXG4gICAgICAgICAgYWxwaGE6IDEsXHJcbiAgICAgICAgICBsYWJlbDoge1xyXG4gICAgICAgICAgICBjb250ZW50OiBiLmJ1c05vXHJcbiAgICAgICAgICB9XHJcbiAgICAgICAgfSlcclxuICAgICAgICByZXR1cm4ge1xyXG4gICAgICAgICAgbG9uZ2l0dWRlOiBsb2NhdGlvbkFycmF5WzBdLFxyXG4gICAgICAgICAgbGF0aXR1ZGU6IGxvY2F0aW9uQXJyYXlbMV0sXHJcbiAgICAgICAgICBidXNObzogYi5idXNObyxcclxuICAgICAgICAgIGF3YXk6IGIuYXdheSxcclxuICAgICAgICAgIGZhY3RvcjogYi5mYWN0b3IsXHJcbiAgICAgICAgICBpc1N0YXRpb246IGIuaXNTdGF0aW9uLFxyXG4gICAgICAgICAgbGFzdFN0YXRpb246IGIubGFzdFN0YXRpb24sXHJcbiAgICAgICAgICBsb2NhdGlvbjoge1xyXG4gICAgICAgICAgICBsb25naXR1ZGU6IGxvY2F0aW9uQXJyYXlbMF0sXHJcbiAgICAgICAgICAgIGxhdGl0dWRlOiBsb2NhdGlvbkFycmF5WzFdXHJcbiAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICB9KS5yZXZlcnNlKClcclxuICAgICAgYnVzV2FpdGluZy5idXMgPSBmaWx0ZXJCdXNcclxuICAgICAgdGhpcy5zZXREYXRhKHsgYnVzV2FpdGluZywgbWFya2VycywgaGlkZXZpZXcgfSk7XHJcbiAgICAgIHd4LmhpZGVMb2FkaW5nKClcclxuICAgIH0pO1xyXG4gIH0sXHJcbiAgdXBkYXRlTGluZSAobGluZU5hbWUsIGlzVXBEb3duKSB7XHJcbiAgICBjb25zdCBwYXJhbXMgPSB7IGxpbmVOYW1lLCBpc1VwRG93biB9O1xyXG4gICAgQnVzLmdldExpbmUocGFyYW1zLCB7fSwgZmFsc2UpLnRoZW4ocmVzID0+IHtcclxuICAgICAgY29uc3QgbGluZSA9IEpTT04ucGFyc2UocmVzLmRhdGEuZGF0YSk7XHJcbiAgICAgIGNvbnN0IG1hcmtlcnMgPSBbXTtcclxuICAgICAgY29uc3QgcG9pbnRzID0gbGluZS5zdGF0aW9ucy5tYXAoKHAsIGkpID0+IHtcclxuICAgICAgICBjb25zdCBsb2NhdGlvbkFycmF5ID0gR2xvYmFsLndnczg0dG9nY2owMihwLmxuZywgcC5sYXQpO1xyXG4gICAgICAgIG1hcmtlcnMucHVzaCh7XHJcbiAgICAgICAgICBpY29uUGF0aDogR2xvYmFsLmdldFZhbChcImxvY2F0aW9uLXBuZ1wiKSxcclxuICAgICAgICAgIGlkOiBwLnN0YXRpb25JZCxcclxuICAgICAgICAgIHRpdGxlOiBwLnN0YXRpb25OYW1lLFxyXG4gICAgICAgICAgbGF0aXR1ZGU6IGxvY2F0aW9uQXJyYXlbMV0sXHJcbiAgICAgICAgICBsb25naXR1ZGU6IGxvY2F0aW9uQXJyYXlbMF0sXHJcbiAgICAgICAgICB3aWR0aDogMjUsXHJcbiAgICAgICAgICBoZWlnaHQ6IDI1LFxyXG4gICAgICAgICAgYWxwaGE6IDAuOCxcclxuICAgICAgICAgIGxhYmVsOiB7XHJcbiAgICAgICAgICAgIGNvbnRlbnQ6IHAuc3RhdGlvbk5hbWVcclxuICAgICAgICAgIH1cclxuICAgICAgICB9KTtcclxuICAgICAgICByZXR1cm4ge1xyXG4gICAgICAgICAgbG9uZ2l0dWRlOiBsb2NhdGlvbkFycmF5WzBdLFxyXG4gICAgICAgICAgbGF0aXR1ZGU6IGxvY2F0aW9uQXJyYXlbMV1cclxuICAgICAgICB9O1xyXG4gICAgICB9KTtcclxuICAgICAgY29uc3QgcG9seWxpbmUgPSB0aGlzLmRhdGEucG9seWxpbmU7XHJcbiAgICAgIHBvbHlsaW5lWzBdLnBvaW50cyA9IHBvaW50cztcclxuICAgICAgY29uc3QgaXNVcERvd25OYW1lID0gaXNVcERvd24gPT0gMCA/ICfkuIrooYwnIDogJ+S4i+ihjCc7XHJcbiAgICAgIGNvbnN0IHN0YXRpb25zTGVuZ3RoID0gbGluZS5zdGF0aW9ucy5sZW5ndGg7XHJcbiAgICAgIGNvbnN0IGxpbmVEZXRhaWwgPSB7XHJcbiAgICAgICAgc3RhcnRTdGF0aW9uOiBsaW5lLnN0YXRpb25zWzBdLnN0YXRpb25OYW1lLFxyXG4gICAgICAgIGVuZFN0YXRpb246IGxpbmUuc3RhdGlvbnNbc3RhdGlvbnNMZW5ndGggLSAxXS5zdGF0aW9uTmFtZSxcclxuICAgICAgfVxyXG4gICAgICBjb25zdCBub3RpY2UgPSBgJHtsaW5lTmFtZX06JHtpc1VwRG93bk5hbWV9Lui1t+Wni+ermToke2xpbmVEZXRhaWwuc3RhcnRTdGF0aW9ufSznu4jngrnnq5k6JHtsaW5lRGV0YWlsLmVuZFN0YXRpb259LiR7bGluZS5saW5lSW5mb31gXHJcbiAgICAgIHd4LnNldE5hdmlnYXRpb25CYXJUaXRsZSh7XHJcbiAgICAgICAgdGl0bGU6IGAke2xpbmVEZXRhaWwuc3RhcnRTdGF0aW9ufSDihpIgJHtsaW5lRGV0YWlsLmVuZFN0YXRpb259YFxyXG4gICAgICB9KVxyXG4gICAgICB0aGlzLnNldERhdGEoe1xyXG4gICAgICAgIGlzVXBEb3duTmFtZSxcclxuICAgICAgICBsaW5lRGV0YWlsLFxyXG4gICAgICAgIHN0YXRpb25zTGVuZ3RoLFxyXG4gICAgICAgIGxpbmUsXHJcbiAgICAgICAgbm90aWNlLFxyXG4gICAgICAgIHBvbHlsaW5lLFxyXG4gICAgICAgIG1hcmtlcnMsXHJcbiAgICAgICAgbG9jYXRpb246IEdsb2JhbC5nZXRWYWwoXCJsb2NhdGlvbi1kYXRhXCIpXHJcbiAgICAgIH0pO1xyXG4gICAgICB3eC5oaWRlTG9hZGluZygpXHJcbiAgICB9KTtcclxuICB9LFxyXG4gIGhhbmRsZVpvb20gKCkge1xyXG4gICAgaWYgKHRoaXMuZGF0YS52aWV3SGVpZ2h0ID09PSAwLjUpIHtcclxuICAgICAgdGhpcy5zZXREYXRhKHtcclxuICAgICAgICBtYXBTdHlsZTogYGhlaWdodDogOTB2aDtgLFxyXG4gICAgICAgIHZpZXdIZWlnaHQ6IDFcclxuICAgICAgfSlcclxuICAgIH0gZWxzZSB7XHJcbiAgICAgIHRoaXMuc2V0RGF0YSh7XHJcbiAgICAgICAgbWFwU3R5bGU6IGBgLFxyXG4gICAgICAgIHZpZXdIZWlnaHQ6IDAuNVxyXG4gICAgICB9KVxyXG4gICAgfVxyXG4gIH0sXHJcbiAgaGFuZGxlQ29udmVyc2lvbiAoKSB7XHJcbiAgICBjb25zdCBpc1VwRG93biA9IDEgLSB0aGlzLmRhdGEuaXNVcERvd247XHJcbiAgICBjb25zdCB7IGxpbmVOYW1lIH0gPSB0aGlzLmRhdGE7XHJcbiAgICBjb25zdCBpc1VwRG93bk5hbWUgPSBpc1VwRG93biA9PSAwID8gJ+S4iuihjCcgOiAn5LiL6KGMJztcclxuICAgIHd4LnNob3dMb2FkaW5nKHtcclxuICAgICAgdGl0bGU6IGDmjaLkuLoke2lzVXBEb3duTmFtZX1gLFxyXG4gICAgfSlcclxuICAgIHRoaXMudXBkYXRlTGluZShsaW5lTmFtZSwgaXNVcERvd24pO1xyXG4gICAgdGhpcy51cGRhdGVCdXNXYWl0aW5nKGxpbmVOYW1lLCBpc1VwRG93bik7XHJcbiAgICB0aGlzLnNldERhdGEoe1xyXG4gICAgICBpc1VwRG93biwgaXNVcERvd25OYW1lXHJcbiAgICB9KVxyXG4gIH0sXHJcbiAgaGFuZGxlUmVmcmVzaCAoKSB7XHJcbiAgICBjb25zdCB7IG1hcmtlcnMgfSA9IHRoaXMuZGF0YTtcclxuICAgIC8vIGNvbnNvbGUubG9nKG1hcmtlcnMpXHJcbiAgICBjb25zdCBtID0gbWFya2Vycy5maWx0ZXIoZiA9PiBmLmFscGhhIDwgMSlcclxuICAgIHRoaXMuc2V0RGF0YSh7IG1hcmtlcnM6IG0gfSlcclxuICAgIC8vIGNvbnNvbGUubG9nKG0pXHJcbiAgICB3eC5zaG93TG9hZGluZyh7XHJcbiAgICAgIHRpdGxlOiAn5Yi35paw5LitJyxcclxuICAgIH0pXHJcbiAgICBjb25zdCB7IGxpbmVOYW1lLCBpc1VwRG93biB9ID0gdGhpcy5kYXRhO1xyXG4gICAgdGhpcy51cGRhdGVCdXNXYWl0aW5nKGxpbmVOYW1lLCBpc1VwRG93bik7XHJcbiAgfSxcclxuICBoYW5kbGVMb2NhdGlvbiAoKSB7XHJcbiAgICB0aGlzLnNldERhdGEoe1xyXG4gICAgICBsb2NhdGlvbjogR2xvYmFsLmdldFZhbChcImxvY2F0aW9uLWRhdGFcIilcclxuICAgIH0pXHJcbiAgfSxcclxuICBoYW5kbGVTZXRMb2NhdGlvbkNlbnRlciAoZSkge1xyXG4gICAgY29uc3QgeyBjdXJyZW50VGFyZ2V0IH0gPSBlO1xyXG4gICAgY29uc3QgeyBkYXRhc2V0IH0gPSBjdXJyZW50VGFyZ2V0O1xyXG4gICAgY29uc3QgeyBsb2NhdGlvbiB9ID0gZGF0YXNldDtcclxuICAgIHRoaXMuc2V0RGF0YSh7IGxvY2F0aW9uIH0pXHJcbiAgfSxcclxuICByZWdpb25jaGFuZ2UgKGUpIHtcclxuICAgIGNvbnNvbGUubG9nKGUudHlwZSk7XHJcbiAgfSxcclxuICBtYXJrZXJ0YXAgKGUpIHtcclxuICAgIGNvbnNvbGUubG9nKGUubWFya2VySWQpO1xyXG4gIH0sXHJcbiAgY29udHJvbHRhcCAoZSkge1xyXG4gICAgY29uc29sZS5sb2coZS5jb250cm9sSWQpO1xyXG4gIH1cclxufTsiXX0=