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
    // const { lineDetail, lineName, isUpDownName, isUpDown } = this.data;
    // this.updateBusWaiting(lineName, isUpDown)
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
          busNo: "\u6D59L\xB7" + b.busNo,
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
    console.log('zoom');
    if (this.data.viewHeight === 0.5) {
      this.setData({
        mapStyle: 1,
        viewHeight: 1
      });
    } else {
      this.setData({
        mapStyle: 0,
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
    var _data = this.data,
        lineName = _data.lineName,
        isUpDown = _data.isUpDown;

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImluZGV4Lnd4cCJdLCJuYW1lcyI6WyJkYXRhIiwidGl0bGUiLCJ0aXAiLCJsb2NhdGlvbiIsImhpZGV2aWV3Iiwic2NhbGUiLCJub3RpY2UiLCJsaW5lTmFtZSIsImlzVXBEb3duIiwibGluZSIsInN0YXRpb25zTGVuZ3RoIiwibGluZURldGFpbCIsImlzVXBEb3duTmFtZSIsImJ1c1dhaXRpbmciLCJtYXJrZXJzIiwibWFwU3R5bGUiLCJ2aWV3SGVpZ2h0IiwicmVIZWlnaHQiLCJtaW4iLCJtYXgiLCJwb2x5bGluZSIsInBvaW50cyIsImNvbG9yIiwid2lkdGgiLCJkb3R0ZWRMaW5lIiwib25Mb2FkIiwib3B0aW9ucyIsImRlY29kZVVSSUNvbXBvbmVudCIsInNldERhdGEiLCJ3eCIsInNob3dMb2FkaW5nIiwidXBkYXRlTGluZSIsInVwZGF0ZUJ1c1dhaXRpbmciLCJvblNob3ciLCJwYXJhbXMiLCJzdGF0aW9uTnVtIiwiQnVzIiwiZ2V0QnVzV2FpdGluZyIsInRoZW4iLCJKU09OIiwicGFyc2UiLCJyZXMiLCJidXMiLCJsZW5ndGgiLCJmaWx0ZXJCdXMiLCJtYXAiLCJsb2NhdGlvbkFycmF5IiwiR2xvYmFsIiwid2dzODR0b2djajAyIiwiYiIsImxuZyIsImxhdCIsInB1c2giLCJpY29uUGF0aCIsImdldFZhbCIsImlkIiwiYnVzTm8iLCJsYXRpdHVkZSIsImxvbmdpdHVkZSIsImhlaWdodCIsImFscGhhIiwibGFiZWwiLCJjb250ZW50IiwiYXdheSIsImZhY3RvciIsImlzU3RhdGlvbiIsImxhc3RTdGF0aW9uIiwicmV2ZXJzZSIsImhpZGVMb2FkaW5nIiwiZ2V0TGluZSIsInN0YXRpb25zIiwicCIsImkiLCJzdGF0aW9uSWQiLCJzdGF0aW9uTmFtZSIsInN0YXJ0U3RhdGlvbiIsImVuZFN0YXRpb24iLCJsaW5lSW5mbyIsInNldE5hdmlnYXRpb25CYXJUaXRsZSIsImhhbmRsZVpvb20iLCJjb25zb2xlIiwibG9nIiwiaGFuZGxlQ29udmVyc2lvbiIsImhhbmRsZVJlZnJlc2giLCJtIiwiZmlsdGVyIiwiZiIsImhhbmRsZUxvY2F0aW9uIiwiaGFuZGxlU2V0TG9jYXRpb25DZW50ZXIiLCJlIiwiY3VycmVudFRhcmdldCIsImRhdGFzZXQiLCJyZWdpb25jaGFuZ2UiLCJ0eXBlIiwibWFya2VydGFwIiwibWFya2VySWQiLCJjb250cm9sdGFwIiwiY29udHJvbElkIl0sIm1hcHBpbmdzIjoiOzs7Ozs7QUFBQTs7OztBQUNBOzs7Ozs7O0FBYUVBLFFBQU07QUFBQTtBQUFBO0FBQUE7O0FBQ0pDLFdBQU8sTUFESDtBQUVKQyxTQUFLLE1BRkQ7QUFHSkMsY0FBVSxFQUhOO0FBSUpDLGNBQVUsSUFKTjtBQUtKQyxXQUFPLEVBTEg7QUFNSkMsWUFBUSxFQU5KO0FBT0pDLGNBQVUsRUFQTjtBQVFKQyxjQUFVLENBUk47QUFTSkMsVUFBTSxFQVRGO0FBVUpDLG9CQUFnQixDQVZaO0FBV0pDLGdCQUFZLEVBWFI7QUFZSkMsa0JBQWMsRUFaVjtBQWFKQyxnQkFBWSxFQWJSO0FBY0pDLGFBQVMsRUFkTDtBQWVKQyxjQUFVLEVBZk47QUFnQkpDLGdCQUFZLEdBaEJSO0FBaUJKQyxjQUFVO0FBQ1JDLFdBQUssR0FERztBQUVSQyxXQUFLO0FBRkcsS0FqQk47QUFxQkpDLGNBQVUsQ0FDUjtBQUNFQyxjQUFRLEVBRFY7QUFFRUMsYUFBTyxXQUZUO0FBR0VDLGFBQU8sQ0FIVDtBQUlFQyxrQkFBWTtBQUpkLEtBRFE7QUFyQk4sRztBQThCTkMsUSxrQkFBUUMsTyxFQUFTO0FBQ2YsUUFBTW5CLFdBQVdvQixtQkFBbUJELFFBQVFuQixRQUEzQixDQUFqQjtBQUNBLFFBQU1DLFdBQVdtQixtQkFBbUJELFFBQVFsQixRQUEzQixDQUFqQjtBQUNBLFNBQUtvQixPQUFMLENBQWEsRUFBRXJCLGtCQUFGLEVBQVlDLGtCQUFaLEVBQWI7QUFDQXFCLE9BQUdDLFdBQUgsQ0FBZTtBQUNiN0IsYUFBTztBQURNLEtBQWY7QUFHQSxTQUFLOEIsVUFBTCxDQUFnQnhCLFFBQWhCLEVBQTBCQyxR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O0FBRE0sS0FBZjtBQU5lLGdCQVNnQixLQUFLRCxJQVRyQjtBQUFBLFFBU1BPLFFBVE8sU0FTUEEsUUFUTztBQUFBLFFBU0dDLFFBVEgsU0FTR0EsUUFUSDs7QUFVZixTQUFLd0IsZ0JBQUwsQ0FBc0J6QixRQUF0QixFQUFnQ0MsUUFBaEM7QUFDRCxHO0FBQ0QrRSxnQiw0QkFBa0I7QUFDaEIsU0FBSzNELE9BQUwsQ0FBYTtBQUNYekIsZ0JBQVU0QyxpQkFBT08sTUFBUCxDQUFjLGVBQWQ7QUFEQyxLQUFiO0FBR0QsRztBQUNEa0MseUIsbUNBQXlCQyxDLEVBQUc7QUFBQSxRQUNsQkMsYUFEa0IsR0FDQUQsQ0FEQSxDQUNsQkMsYUFEa0I7QUFBQSxRQUVsQkMsT0FGa0IsR0FFTkQsYUFGTSxDQUVsQkMsT0FGa0I7QUFBQSxRQUdsQnhGLFFBSGtCLEdBR0x3RixPQUhLLENBR2xCeEYsUUFIa0I7O0FBSTFCLFNBQUt5QixPQUFMLENBQWEsRUFBRXpCLGtCQUFGLEVBQWI7QUFDRCxHO0FBQ0R5RixjLHdCQUFjSCxDLEVBQUc7QUFDZlQsWUFBUUMsR0FBUixDQUFZUSxFQUFFSSxJQUFkO0FBQ0QsRztBQUNEQyxXLHFCQUFXTCxDLEVBQUc7QUFDWlQsWUFBUUMsR0FBUixDQUFZUSxFQUFFTSxRQUFkO0FBQ0QsRztBQUNEQyxZLHNCQUFZUCxDLEVBQUc7QUFDYlQsWUFBUUMsR0FBUixDQUFZUSxFQUFFUSxTQUFkO0FBQ0QiLCJmaWxlIjoiaW5kZXgud3hwIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IEJ1cyBmcm9tIFwiLi4vLi4vbW9kZWxzL2FwaVwiO1xyXG5pbXBvcnQgR2xvYmFsIGZyb20gXCIuLi8uLi9tb2RlbHMvZ2xvYmFsXCI7XHJcblxyXG5leHBvcnQgZGVmYXVsdCB7XHJcbiAgY29uZmlnOiB7XHJcbiAgICBkaXNhYmxlU2Nyb2xsOiB0cnVlLFxyXG4gICAgbmF2aWdhdGlvbkJhclRpdGxlVGV4dDogXCLot6/nur9cIixcclxuICAgIHVzaW5nQ29tcG9uZW50czoge1xyXG4gICAgICBcImxheW91dC1oZWFkXCI6IFwibGF5b3V0L2hlYWRcIixcclxuICAgICAgXCJ3eGMtbGlzdFwiOiBcIkBtaW51aS93eGMtbGlzdFwiLFxyXG4gICAgICBcInd4Yy1pY29uXCI6IFwiQG1pbnVpL3d4Yy1pY29uXCIsXHJcbiAgICAgICd3eGMtYWJub3InOiAnQG1pbnVpL3d4Yy1hYm5vcicsXHJcbiAgICB9XHJcbiAgfSxcclxuICBkYXRhOiB7XHJcbiAgICB0aXRsZTogJ+epuuepuue6v+i3rycsXHJcbiAgICB0aXA6ICfnqbrnqbrlpoLkuZ8nLFxyXG4gICAgbG9jYXRpb246IHt9LFxyXG4gICAgaGlkZXZpZXc6IHRydWUsXHJcbiAgICBzY2FsZTogMTQsXHJcbiAgICBub3RpY2U6ICcnLFxyXG4gICAgbGluZU5hbWU6IFwiXCIsXHJcbiAgICBpc1VwRG93bjogMCxcclxuICAgIGxpbmU6IHt9LFxyXG4gICAgc3RhdGlvbnNMZW5ndGg6IDAsXHJcbiAgICBsaW5lRGV0YWlsOiB7fSxcclxuICAgIGlzVXBEb3duTmFtZTogJycsXHJcbiAgICBidXNXYWl0aW5nOiB7fSxcclxuICAgIG1hcmtlcnM6IFtdLFxyXG4gICAgbWFwU3R5bGU6ICcnLFxyXG4gICAgdmlld0hlaWdodDogMC41LFxyXG4gICAgcmVIZWlnaHQ6IHtcclxuICAgICAgbWluOiAwLjUsXHJcbiAgICAgIG1heDogMFxyXG4gICAgfSxcclxuICAgIHBvbHlsaW5lOiBbXHJcbiAgICAgIHtcclxuICAgICAgICBwb2ludHM6IFtdLFxyXG4gICAgICAgIGNvbG9yOiBcIiNGRjAwMDBERFwiLFxyXG4gICAgICAgIHdpZHRoOiAyLFxyXG4gICAgICAgIGRvdHRlZExpbmU6IHRydWVcclxuICAgICAgfVxyXG4gICAgXVxyXG4gIH0sXHJcbiAgb25Mb2FkIChvcHRpb25zKSB7XHJcbiAgICBjb25zdCBsaW5lTmFtZSA9IGRlY29kZVVSSUNvbXBvbmVudChvcHRpb25zLmxpbmVOYW1lKTtcclxuICAgIGNvbnN0IGlzVXBEb3duID0gZGVjb2RlVVJJQ29tcG9uZW50KG9wdGlvbnMuaXNVcERvd24pO1xyXG4gICAgdGhpcy5zZXREYXRhKHsgbGluZU5hbWUsIGlzVXBEb3duIH0pO1xyXG4gICAgd3guc2hvd0xvYWRpbmcoe1xyXG4gICAgICB0aXRsZTogJ+WKoOi9veS4rScsXHJcbiAgICB9KVxyXG4gICAgdGhpcy51cGRhdGVMaW5lKGxpbmVOYW1lLCBpc1VwRG93bilcclxuICAgIHRoaXMudXBkYXRlQnVzV2FpdGluZyhsaW5lTmFtZSwgaXNVcERvd24pXHJcbiAgfSxcclxuICBvblNob3cgKCkge1xyXG4gICAgLy8gY29uc3QgeyBsaW5lRGV0YWlsLCBsaW5lTmFtZSwgaXNVcERvd25OYW1lLCBpc1VwRG93biB9ID0gdGhpcy5kYXRhO1xyXG4gICAgLy8gdGhpcy51cGRhdGVCdXNXYWl0aW5nKGxpbmVOYW1lLCBpc1VwRG93bilcclxuICB9LFxyXG4gIHVwZGF0ZUJ1c1dhaXRpbmcgKGxpbmVOYW1lLCBpc1VwRG93bikge1xyXG4gICAgY29uc3QgcGFyYW1zID0geyBsaW5lTmFtZSwgaXNVcERvd24sIHN0YXRpb25OdW06IDEgfTtcclxuICAgIEJ1cy5nZXRCdXNXYWl0aW5nKHBhcmFtcywge30sIGZhbHNlKS50aGVuKHJlcyA9PiB7XHJcbiAgICAgIGNvbnN0IGJ1c1dhaXRpbmcgPSBKU09OLnBhcnNlKHJlcy5kYXRhLmRhdGEpO1xyXG4gICAgICBjb25zdCB7IGJ1cyB9ID0gYnVzV2FpdGluZztcclxuICAgICAgY29uc3QgaGlkZXZpZXcgPSBidXMubGVuZ3RoID09PSAwID8gZmFsc2UgOiB0cnVlO1xyXG4gICAgICBjb25zdCBtYXJrZXJzID0gdGhpcy5kYXRhLm1hcmtlcnM7XHJcbiAgICAgIGNvbnN0IGZpbHRlckJ1cyA9IGJ1cy5tYXAoYiA9PiB7XHJcbiAgICAgICAgY29uc3QgbG9jYXRpb25BcnJheSA9IEdsb2JhbC53Z3M4NHRvZ2NqMDIoYi5sbmcsIGIubGF0KTtcclxuICAgICAgICBtYXJrZXJzLnB1c2goe1xyXG4gICAgICAgICAgaWNvblBhdGg6IEdsb2JhbC5nZXRWYWwoXCJidXMtaWNvbi1wbmdcIiksXHJcbiAgICAgICAgICBpZDogYi5idXNObyxcclxuICAgICAgICAgIHRpdGxlOiBiLmJ1c05vLFxyXG4gICAgICAgICAgbGF0aXR1ZGU6IGxvY2F0aW9uQXJyYXlbMV0sXHJcbiAgICAgICAgICBsb25naXR1ZGU6IGxvY2F0aW9uQXJyYXlbMF0sXHJcbiAgICAgICAgICB3aWR0aDogMjUsXHJcbiAgICAgICAgICBoZWlnaHQ6IDI1LFxyXG4gICAgICAgICAgYWxwaGE6IDEsXHJcbiAgICAgICAgICBsYWJlbDoge1xyXG4gICAgICAgICAgICBjb250ZW50OiBiLmJ1c05vXHJcbiAgICAgICAgICB9XHJcbiAgICAgICAgfSlcclxuICAgICAgICByZXR1cm4ge1xyXG4gICAgICAgICAgbG9uZ2l0dWRlOiBsb2NhdGlvbkFycmF5WzBdLFxyXG4gICAgICAgICAgbGF0aXR1ZGU6IGxvY2F0aW9uQXJyYXlbMV0sXHJcbiAgICAgICAgICBidXNObzogYOa1mUzCtyR7Yi5idXNOb31gLFxyXG4gICAgICAgICAgYXdheTogYi5hd2F5LFxyXG4gICAgICAgICAgZmFjdG9yOiBiLmZhY3RvcixcclxuICAgICAgICAgIGlzU3RhdGlvbjogYi5pc1N0YXRpb24sXHJcbiAgICAgICAgICBsYXN0U3RhdGlvbjogYi5sYXN0U3RhdGlvbixcclxuICAgICAgICAgIGxvY2F0aW9uOiB7XHJcbiAgICAgICAgICAgIGxvbmdpdHVkZTogbG9jYXRpb25BcnJheVswXSxcclxuICAgICAgICAgICAgbGF0aXR1ZGU6IGxvY2F0aW9uQXJyYXlbMV1cclxuICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgIH0pLnJldmVyc2UoKVxyXG4gICAgICBidXNXYWl0aW5nLmJ1cyA9IGZpbHRlckJ1c1xyXG4gICAgICB0aGlzLnNldERhdGEoeyBidXNXYWl0aW5nLCBtYXJrZXJzLCBoaWRldmlldyB9KTtcclxuICAgICAgd3guaGlkZUxvYWRpbmcoKVxyXG4gICAgfSk7XHJcbiAgfSxcclxuICB1cGRhdGVMaW5lIChsaW5lTmFtZSwgaXNVcERvd24pIHtcclxuICAgIGNvbnN0IHBhcmFtcyA9IHsgbGluZU5hbWUsIGlzVXBEb3duIH07XHJcbiAgICBCdXMuZ2V0TGluZShwYXJhbXMsIHt9LCBmYWxzZSkudGhlbihyZXMgPT4ge1xyXG4gICAgICBjb25zdCBsaW5lID0gSlNPTi5wYXJzZShyZXMuZGF0YS5kYXRhKTtcclxuICAgICAgY29uc3QgbWFya2VycyA9IFtdO1xyXG4gICAgICBjb25zdCBwb2ludHMgPSBsaW5lLnN0YXRpb25zLm1hcCgocCwgaSkgPT4ge1xyXG4gICAgICAgIGNvbnN0IGxvY2F0aW9uQXJyYXkgPSBHbG9iYWwud2dzODR0b2djajAyKHAubG5nLCBwLmxhdCk7XHJcbiAgICAgICAgbWFya2Vycy5wdXNoKHtcclxuICAgICAgICAgIGljb25QYXRoOiBHbG9iYWwuZ2V0VmFsKFwibG9jYXRpb24tcG5nXCIpLFxyXG4gICAgICAgICAgaWQ6IHAuc3RhdGlvbklkLFxyXG4gICAgICAgICAgdGl0bGU6IHAuc3RhdGlvbk5hbWUsXHJcbiAgICAgICAgICBsYXRpdHVkZTogbG9jYXRpb25BcnJheVsxXSxcclxuICAgICAgICAgIGxvbmdpdHVkZTogbG9jYXRpb25BcnJheVswXSxcclxuICAgICAgICAgIHdpZHRoOiAyNSxcclxuICAgICAgICAgIGhlaWdodDogMjUsXHJcbiAgICAgICAgICBhbHBoYTogMC44LFxyXG4gICAgICAgICAgbGFiZWw6IHtcclxuICAgICAgICAgICAgY29udGVudDogcC5zdGF0aW9uTmFtZVxyXG4gICAgICAgICAgfVxyXG4gICAgICAgIH0pO1xyXG4gICAgICAgIHJldHVybiB7XHJcbiAgICAgICAgICBsb25naXR1ZGU6IGxvY2F0aW9uQXJyYXlbMF0sXHJcbiAgICAgICAgICBsYXRpdHVkZTogbG9jYXRpb25BcnJheVsxXVxyXG4gICAgICAgIH07XHJcbiAgICAgIH0pO1xyXG4gICAgICBjb25zdCBwb2x5bGluZSA9IHRoaXMuZGF0YS5wb2x5bGluZTtcclxuICAgICAgcG9seWxpbmVbMF0ucG9pbnRzID0gcG9pbnRzO1xyXG4gICAgICBjb25zdCBpc1VwRG93bk5hbWUgPSBpc1VwRG93biA9PSAwID8gJ+S4iuihjCcgOiAn5LiL6KGMJztcclxuICAgICAgY29uc3Qgc3RhdGlvbnNMZW5ndGggPSBsaW5lLnN0YXRpb25zLmxlbmd0aDtcclxuICAgICAgY29uc3QgbGluZURldGFpbCA9IHtcclxuICAgICAgICBzdGFydFN0YXRpb246IGxpbmUuc3RhdGlvbnNbMF0uc3RhdGlvbk5hbWUsXHJcbiAgICAgICAgZW5kU3RhdGlvbjogbGluZS5zdGF0aW9uc1tzdGF0aW9uc0xlbmd0aCAtIDFdLnN0YXRpb25OYW1lLFxyXG4gICAgICB9XHJcbiAgICAgIGNvbnN0IG5vdGljZSA9IGAke2xpbmVOYW1lfToke2lzVXBEb3duTmFtZX0u6LW35aeL56uZOiR7bGluZURldGFpbC5zdGFydFN0YXRpb259LOe7iOeCueermToke2xpbmVEZXRhaWwuZW5kU3RhdGlvbn0uJHtsaW5lLmxpbmVJbmZvfWBcclxuICAgICAgd3guc2V0TmF2aWdhdGlvbkJhclRpdGxlKHtcclxuICAgICAgICB0aXRsZTogYCR7bGluZURldGFpbC5zdGFydFN0YXRpb259IOKGkiAke2xpbmVEZXRhaWwuZW5kU3RhdGlvbn1gXHJcbiAgICAgIH0pXHJcbiAgICAgIHRoaXMuc2V0RGF0YSh7XHJcbiAgICAgICAgaXNVcERvd25OYW1lLFxyXG4gICAgICAgIGxpbmVEZXRhaWwsXHJcbiAgICAgICAgc3RhdGlvbnNMZW5ndGgsXHJcbiAgICAgICAgbGluZSxcclxuICAgICAgICBub3RpY2UsXHJcbiAgICAgICAgcG9seWxpbmUsXHJcbiAgICAgICAgbWFya2VycyxcclxuICAgICAgICBsb2NhdGlvbjogR2xvYmFsLmdldFZhbChcImxvY2F0aW9uLWRhdGFcIilcclxuICAgICAgfSk7XHJcbiAgICAgIHd4LmhpZGVMb2FkaW5nKClcclxuICAgIH0pO1xyXG4gIH0sXHJcbiAgaGFuZGxlWm9vbSAoKSB7XHJcbiAgICBjb25zb2xlLmxvZygnem9vbScpXHJcbiAgICBpZiAodGhpcy5kYXRhLnZpZXdIZWlnaHQgPT09IDAuNSkge1xyXG4gICAgICB0aGlzLnNldERhdGEoe1xyXG4gICAgICAgIG1hcFN0eWxlOiAxLFxyXG4gICAgICAgIHZpZXdIZWlnaHQ6IDFcclxuICAgICAgfSlcclxuICAgIH0gZWxzZSB7XHJcbiAgICAgIHRoaXMuc2V0RGF0YSh7XHJcbiAgICAgICAgbWFwU3R5bGU6IDAsXHJcbiAgICAgICAgdmlld0hlaWdodDogMC41XHJcbiAgICAgIH0pXHJcbiAgICB9XHJcbiAgfSxcclxuICBoYW5kbGVDb252ZXJzaW9uICgpIHtcclxuICAgIGNvbnN0IGlzVXBEb3duID0gMSAtIHRoaXMuZGF0YS5pc1VwRG93bjtcclxuICAgIGNvbnN0IHsgbGluZU5hbWUgfSA9IHRoaXMuZGF0YTtcclxuICAgIGNvbnN0IGlzVXBEb3duTmFtZSA9IGlzVXBEb3duID09IDAgPyAn5LiK6KGMJyA6ICfkuIvooYwnO1xyXG4gICAgd3guc2hvd0xvYWRpbmcoe1xyXG4gICAgICB0aXRsZTogYOaNouS4uiR7aXNVcERvd25OYW1lfWAsXHJcbiAgICB9KVxyXG4gICAgdGhpcy51cGRhdGVMaW5lKGxpbmVOYW1lLCBpc1VwRG93bik7XHJcbiAgICB0aGlzLnVwZGF0ZUJ1c1dhaXRpbmcobGluZU5hbWUsIGlzVXBEb3duKTtcclxuICAgIHRoaXMuc2V0RGF0YSh7XHJcbiAgICAgIGlzVXBEb3duLCBpc1VwRG93bk5hbWVcclxuICAgIH0pXHJcbiAgfSxcclxuICBoYW5kbGVSZWZyZXNoICgpIHtcclxuICAgIGNvbnN0IHsgbWFya2VycyB9ID0gdGhpcy5kYXRhO1xyXG4gICAgLy8gY29uc29sZS5sb2cobWFya2VycylcclxuICAgIGNvbnN0IG0gPSBtYXJrZXJzLmZpbHRlcihmID0+IGYuYWxwaGEgPCAxKVxyXG4gICAgdGhpcy5zZXREYXRhKHsgbWFya2VyczogbSB9KVxyXG4gICAgLy8gY29uc29sZS5sb2cobSlcclxuICAgIHd4LnNob3dMb2FkaW5nKHtcclxuICAgICAgdGl0bGU6ICfliLfmlrDkuK0nLFxyXG4gICAgfSlcclxuICAgIGNvbnN0IHsgbGluZU5hbWUsIGlzVXBEb3duIH0gPSB0aGlzLmRhdGE7XHJcbiAgICB0aGlzLnVwZGF0ZUJ1c1dhaXRpbmcobGluZU5hbWUsIGlzVXBEb3duKTtcclxuICB9LFxyXG4gIGhhbmRsZUxvY2F0aW9uICgpIHtcclxuICAgIHRoaXMuc2V0RGF0YSh7XHJcbiAgICAgIGxvY2F0aW9uOiBHbG9iYWwuZ2V0VmFsKFwibG9jYXRpb24tZGF0YVwiKVxyXG4gICAgfSlcclxuICB9LFxyXG4gIGhhbmRsZVNldExvY2F0aW9uQ2VudGVyIChlKSB7XHJcbiAgICBjb25zdCB7IGN1cnJlbnRUYXJnZXQgfSA9IGU7XHJcbiAgICBjb25zdCB7IGRhdGFzZXQgfSA9IGN1cnJlbnRUYXJnZXQ7XHJcbiAgICBjb25zdCB7IGxvY2F0aW9uIH0gPSBkYXRhc2V0O1xyXG4gICAgdGhpcy5zZXREYXRhKHsgbG9jYXRpb24gfSlcclxuICB9LFxyXG4gIHJlZ2lvbmNoYW5nZSAoZSkge1xyXG4gICAgY29uc29sZS5sb2coZS50eXBlKTtcclxuICB9LFxyXG4gIG1hcmtlcnRhcCAoZSkge1xyXG4gICAgY29uc29sZS5sb2coZS5tYXJrZXJJZCk7XHJcbiAgfSxcclxuICBjb250cm9sdGFwIChlKSB7XHJcbiAgICBjb25zb2xlLmxvZyhlLmNvbnRyb2xJZCk7XHJcbiAgfVxyXG59OyJdfQ==