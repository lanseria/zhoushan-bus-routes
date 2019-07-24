"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _api = require("../../models/api.js");

var _api2 = _interopRequireDefault(_api);

var _global = require("../../models/global.js");

var _global2 = _interopRequireDefault(_global);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

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
    HistoryLines: [],
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
    var hl = _global2.default.getVal('HistoryLines');
    hl = [].concat(_toConsumableArray(new Set(hl)));
    this.HistoryLines = hl || [];
    this.HistoryLines.push(lineName);
    _global2.default.setVal('HistoryLines', this.HistoryLines);
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImluZGV4Lnd4cCJdLCJuYW1lcyI6WyJkYXRhIiwidGl0bGUiLCJ0aXAiLCJsb2NhdGlvbiIsImhpZGV2aWV3Iiwic2NhbGUiLCJub3RpY2UiLCJsaW5lTmFtZSIsImlzVXBEb3duIiwibGluZSIsInN0YXRpb25zTGVuZ3RoIiwibGluZURldGFpbCIsImlzVXBEb3duTmFtZSIsImJ1c1dhaXRpbmciLCJtYXJrZXJzIiwiSGlzdG9yeUxpbmVzIiwibWFwU3R5bGUiLCJ2aWV3SGVpZ2h0IiwicmVIZWlnaHQiLCJtaW4iLCJtYXgiLCJwb2x5bGluZSIsInBvaW50cyIsImNvbG9yIiwid2lkdGgiLCJkb3R0ZWRMaW5lIiwib25Mb2FkIiwib3B0aW9ucyIsImRlY29kZVVSSUNvbXBvbmVudCIsInNldERhdGEiLCJ3eCIsInNob3dMb2FkaW5nIiwiaGwiLCJHbG9iYWwiLCJnZXRWYWwiLCJTZXQiLCJwdXNoIiwic2V0VmFsIiwidXBkYXRlTGluZSIsInVwZGF0ZUJ1c1dhaXRpbmciLCJvblNob3ciLCJwYXJhbXMiLCJzdGF0aW9uTnVtIiwiQnVzIiwiZ2V0QnVzV2FpdGluZyIsInRoZW4iLCJKU09OIiwicGFyc2UiLCJyZXMiLCJidXMiLCJsZW5ndGgiLCJmaWx0ZXJCdXMiLCJtYXAiLCJsb2NhdGlvbkFycmF5Iiwid2dzODR0b2djajAyIiwiYiIsImxuZyIsImxhdCIsImljb25QYXRoIiwiaWQiLCJidXNObyIsImxhdGl0dWRlIiwibG9uZ2l0dWRlIiwiaGVpZ2h0IiwiYWxwaGEiLCJsYWJlbCIsImNvbnRlbnQiLCJhd2F5IiwiZmFjdG9yIiwiaXNTdGF0aW9uIiwibGFzdFN0YXRpb24iLCJyZXZlcnNlIiwiaGlkZUxvYWRpbmciLCJnZXRMaW5lIiwic3RhdGlvbnMiLCJwIiwiaSIsInN0YXRpb25JZCIsInN0YXRpb25OYW1lIiwic3RhcnRTdGF0aW9uIiwiZW5kU3RhdGlvbiIsImxpbmVJbmZvIiwic2V0TmF2aWdhdGlvbkJhclRpdGxlIiwiaGFuZGxlWm9vbSIsImNvbnNvbGUiLCJsb2ciLCJoYW5kbGVDb252ZXJzaW9uIiwiaGFuZGxlUmVmcmVzaCIsIm0iLCJmaWx0ZXIiLCJmIiwiaGFuZGxlTG9jYXRpb24iLCJoYW5kbGVTZXRMb2NhdGlvbkNlbnRlciIsImUiLCJjdXJyZW50VGFyZ2V0IiwiZGF0YXNldCIsInJlZ2lvbmNoYW5nZSIsInR5cGUiLCJtYXJrZXJ0YXAiLCJtYXJrZXJJZCIsImNvbnRyb2x0YXAiLCJjb250cm9sSWQiXSwibWFwcGluZ3MiOiI7Ozs7OztBQUFBOzs7O0FBQ0E7Ozs7Ozs7OztBQWFFQSxRQUFNO0FBQUE7QUFBQTtBQUFBOztBQUNKQyxXQUFPLE1BREg7QUFFSkMsU0FBSyxNQUZEO0FBR0pDLGNBQVUsRUFITjtBQUlKQyxjQUFVLElBSk47QUFLSkMsV0FBTyxFQUxIO0FBTUpDLFlBQVEsRUFOSjtBQU9KQyxjQUFVLEVBUE47QUFRSkMsY0FBVSxDQVJOO0FBU0pDLFVBQU0sRUFURjtBQVVKQyxvQkFBZ0IsQ0FWWjtBQVdKQyxnQkFBWSxFQVhSO0FBWUpDLGtCQUFjLEVBWlY7QUFhSkMsZ0JBQVksRUFiUjtBQWNKQyxhQUFTLEVBZEw7QUFlSkMsa0JBQWMsRUFmVjtBQWdCSkMsY0FBVSxFQWhCTjtBQWlCSkMsZ0JBQVksR0FqQlI7QUFrQkpDLGNBQVU7QUFDUkMsV0FBSyxHQURHO0FBRVJDLFdBQUs7QUFGRyxLQWxCTjtBQXNCSkMsY0FBVSxDQUNSO0FBQ0VDLGNBQVEsRUFEVjtBQUVFQyxhQUFPLFdBRlQ7QUFHRUMsYUFBTyxDQUhUO0FBSUVDLGtCQUFZO0FBSmQsS0FEUTtBQXRCTixHO0FBK0JOQyxRLGtCQUFRQyxPLEVBQVM7QUFDZixRQUFNcEIsV0FBV3FCLG1CQUFtQkQsUUFBUXBCLFFBQTNCLENBQWpCO0FBQ0EsUUFBTUMsV0FBV29CLG1CQUFtQkQsUUFBUW5CLFFBQTNCLENBQWpCO0FBQ0EsU0FBS3FCLE9BQUwsQ0FBYSxFQUFFdEIsa0JBQUYsRUFBWUMsa0JBQVosRUFBYjtBQUNBc0IsT0FBR0MsV0FBSCxDQUFlO0FBQ2I5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RCIsImZpbGUiOiJpbmRleC53eHAiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgQnVzIGZyb20gXCIuLi8uLi9tb2RlbHMvYXBpXCI7XHJcbmltcG9ydCBHbG9iYWwgZnJvbSBcIi4uLy4uL21vZGVscy9nbG9iYWxcIjtcclxuXHJcbmV4cG9ydCBkZWZhdWx0IHtcclxuICBjb25maWc6IHtcclxuICAgIGRpc2FibGVTY3JvbGw6IHRydWUsXHJcbiAgICBuYXZpZ2F0aW9uQmFyVGl0bGVUZXh0OiBcIui3r+e6v1wiLFxyXG4gICAgdXNpbmdDb21wb25lbnRzOiB7XHJcbiAgICAgIFwibGF5b3V0LWhlYWRcIjogXCJsYXlvdXQvaGVhZFwiLFxyXG4gICAgICBcInd4Yy1saXN0XCI6IFwiQG1pbnVpL3d4Yy1saXN0XCIsXHJcbiAgICAgIFwid3hjLWljb25cIjogXCJAbWludWkvd3hjLWljb25cIixcclxuICAgICAgJ3d4Yy1hYm5vcic6ICdAbWludWkvd3hjLWFibm9yJyxcclxuICAgIH1cclxuICB9LFxyXG4gIGRhdGE6IHtcclxuICAgIHRpdGxlOiAn56m656m657q/6LevJyxcclxuICAgIHRpcDogJ+epuuepuuWmguS5nycsXHJcbiAgICBsb2NhdGlvbjoge30sXHJcbiAgICBoaWRldmlldzogdHJ1ZSxcclxuICAgIHNjYWxlOiAxNCxcclxuICAgIG5vdGljZTogJycsXHJcbiAgICBsaW5lTmFtZTogXCJcIixcclxuICAgIGlzVXBEb3duOiAwLFxyXG4gICAgbGluZToge30sXHJcbiAgICBzdGF0aW9uc0xlbmd0aDogMCxcclxuICAgIGxpbmVEZXRhaWw6IHt9LFxyXG4gICAgaXNVcERvd25OYW1lOiAnJyxcclxuICAgIGJ1c1dhaXRpbmc6IHt9LFxyXG4gICAgbWFya2VyczogW10sXHJcbiAgICBIaXN0b3J5TGluZXM6IFtdLFxyXG4gICAgbWFwU3R5bGU6ICcnLFxyXG4gICAgdmlld0hlaWdodDogMC41LFxyXG4gICAgcmVIZWlnaHQ6IHtcclxuICAgICAgbWluOiAwLjUsXHJcbiAgICAgIG1heDogMFxyXG4gICAgfSxcclxuICAgIHBvbHlsaW5lOiBbXHJcbiAgICAgIHtcclxuICAgICAgICBwb2ludHM6IFtdLFxyXG4gICAgICAgIGNvbG9yOiBcIiNGRjAwMDBERFwiLFxyXG4gICAgICAgIHdpZHRoOiAyLFxyXG4gICAgICAgIGRvdHRlZExpbmU6IHRydWVcclxuICAgICAgfVxyXG4gICAgXVxyXG4gIH0sXHJcbiAgb25Mb2FkIChvcHRpb25zKSB7XHJcbiAgICBjb25zdCBsaW5lTmFtZSA9IGRlY29kZVVSSUNvbXBvbmVudChvcHRpb25zLmxpbmVOYW1lKTtcclxuICAgIGNvbnN0IGlzVXBEb3duID0gZGVjb2RlVVJJQ29tcG9uZW50KG9wdGlvbnMuaXNVcERvd24pO1xyXG4gICAgdGhpcy5zZXREYXRhKHsgbGluZU5hbWUsIGlzVXBEb3duIH0pO1xyXG4gICAgd3guc2hvd0xvYWRpbmcoe1xyXG4gICAgICB0aXRsZTogJ+WKoOi9veS4rScsXHJcbiAgICB9KVxyXG4gICAgbGV0IGhsID0gR2xvYmFsLmdldFZhbCgnSGlzdG9yeUxpbmVzJylcclxuICAgIGhsID0gWy4uLm5ldyBTZXQoaGwpXVxyXG4gICAgdGhpcy5IaXN0b3J5TGluZXMgPSBobCB8fCBbXVxyXG4gICAgdGhpcy5IaXN0b3J5TGluZXMucHVzaChsaW5lTmFtZSlcclxuICAgIEdsb2JhbC5zZXRWYWwoJ0hpc3RvcnlMaW5lcycsIHRoaXMuSGlzdG9yeUxpbmVzKVxyXG4gICAgdGhpcy51cGRhdGVMaW5lKGxpbmVOYW1lLCBpc1VwRG93bilcclxuICAgIHRoaXMudXBkYXRlQnVzV2FpdGluZyhsaW5lTmFtZSwgaXNVcERvd24pXHJcbiAgfSxcclxuICBvblNob3cgKCkge1xyXG4gICAgLy8gY29uc3QgeyBsaW5lRGV0YWlsLCBsaW5lTmFtZSwgaXNVcERvd25OYW1lLCBpc1VwRG93biB9ID0gdGhpcy5kYXRhO1xyXG4gICAgLy8gdGhpcy51cGRhdGVCdXNXYWl0aW5nKGxpbmVOYW1lLCBpc1VwRG93bilcclxuICB9LFxyXG4gIHVwZGF0ZUJ1c1dhaXRpbmcgKGxpbmVOYW1lLCBpc1VwRG93bikge1xyXG4gICAgY29uc3QgcGFyYW1zID0geyBsaW5lTmFtZSwgaXNVcERvd24sIHN0YXRpb25OdW06IDEgfTtcclxuICAgIEJ1cy5nZXRCdXNXYWl0aW5nKHBhcmFtcywge30sIGZhbHNlKS50aGVuKHJlcyA9PiB7XHJcbiAgICAgIGNvbnN0IGJ1c1dhaXRpbmcgPSBKU09OLnBhcnNlKHJlcy5kYXRhLmRhdGEpO1xyXG4gICAgICBjb25zdCB7IGJ1cyB9ID0gYnVzV2FpdGluZztcclxuICAgICAgY29uc3QgaGlkZXZpZXcgPSBidXMubGVuZ3RoID09PSAwID8gZmFsc2UgOiB0cnVlO1xyXG4gICAgICBjb25zdCBtYXJrZXJzID0gdGhpcy5kYXRhLm1hcmtlcnM7XHJcbiAgICAgIGNvbnN0IGZpbHRlckJ1cyA9IGJ1cy5tYXAoYiA9PiB7XHJcbiAgICAgICAgY29uc3QgbG9jYXRpb25BcnJheSA9IEdsb2JhbC53Z3M4NHRvZ2NqMDIoYi5sbmcsIGIubGF0KTtcclxuICAgICAgICBtYXJrZXJzLnB1c2goe1xyXG4gICAgICAgICAgaWNvblBhdGg6IEdsb2JhbC5nZXRWYWwoXCJidXMtaWNvbi1wbmdcIiksXHJcbiAgICAgICAgICBpZDogYi5idXNObyxcclxuICAgICAgICAgIHRpdGxlOiBiLmJ1c05vLFxyXG4gICAgICAgICAgbGF0aXR1ZGU6IGxvY2F0aW9uQXJyYXlbMV0sXHJcbiAgICAgICAgICBsb25naXR1ZGU6IGxvY2F0aW9uQXJyYXlbMF0sXHJcbiAgICAgICAgICB3aWR0aDogMjUsXHJcbiAgICAgICAgICBoZWlnaHQ6IDI1LFxyXG4gICAgICAgICAgYWxwaGE6IDEsXHJcbiAgICAgICAgICBsYWJlbDoge1xyXG4gICAgICAgICAgICBjb250ZW50OiBiLmJ1c05vXHJcbiAgICAgICAgICB9XHJcbiAgICAgICAgfSlcclxuICAgICAgICByZXR1cm4ge1xyXG4gICAgICAgICAgbG9uZ2l0dWRlOiBsb2NhdGlvbkFycmF5WzBdLFxyXG4gICAgICAgICAgbGF0aXR1ZGU6IGxvY2F0aW9uQXJyYXlbMV0sXHJcbiAgICAgICAgICBidXNObzogYOa1mUzCtyR7Yi5idXNOb31gLFxyXG4gICAgICAgICAgYXdheTogYi5hd2F5LFxyXG4gICAgICAgICAgZmFjdG9yOiBiLmZhY3RvcixcclxuICAgICAgICAgIGlzU3RhdGlvbjogYi5pc1N0YXRpb24sXHJcbiAgICAgICAgICBsYXN0U3RhdGlvbjogYi5sYXN0U3RhdGlvbixcclxuICAgICAgICAgIGxvY2F0aW9uOiB7XHJcbiAgICAgICAgICAgIGxvbmdpdHVkZTogbG9jYXRpb25BcnJheVswXSxcclxuICAgICAgICAgICAgbGF0aXR1ZGU6IGxvY2F0aW9uQXJyYXlbMV1cclxuICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgIH0pLnJldmVyc2UoKVxyXG4gICAgICBidXNXYWl0aW5nLmJ1cyA9IGZpbHRlckJ1c1xyXG4gICAgICB0aGlzLnNldERhdGEoeyBidXNXYWl0aW5nLCBtYXJrZXJzLCBoaWRldmlldyB9KTtcclxuICAgICAgd3guaGlkZUxvYWRpbmcoKVxyXG4gICAgfSk7XHJcbiAgfSxcclxuICB1cGRhdGVMaW5lIChsaW5lTmFtZSwgaXNVcERvd24pIHtcclxuICAgIGNvbnN0IHBhcmFtcyA9IHsgbGluZU5hbWUsIGlzVXBEb3duIH07XHJcbiAgICBCdXMuZ2V0TGluZShwYXJhbXMsIHt9LCBmYWxzZSkudGhlbihyZXMgPT4ge1xyXG4gICAgICBjb25zdCBsaW5lID0gSlNPTi5wYXJzZShyZXMuZGF0YS5kYXRhKTtcclxuICAgICAgY29uc3QgbWFya2VycyA9IFtdO1xyXG4gICAgICBjb25zdCBwb2ludHMgPSBsaW5lLnN0YXRpb25zLm1hcCgocCwgaSkgPT4ge1xyXG4gICAgICAgIGNvbnN0IGxvY2F0aW9uQXJyYXkgPSBHbG9iYWwud2dzODR0b2djajAyKHAubG5nLCBwLmxhdCk7XHJcbiAgICAgICAgbWFya2Vycy5wdXNoKHtcclxuICAgICAgICAgIGljb25QYXRoOiBHbG9iYWwuZ2V0VmFsKFwibG9jYXRpb24tcG5nXCIpLFxyXG4gICAgICAgICAgaWQ6IHAuc3RhdGlvbklkLFxyXG4gICAgICAgICAgdGl0bGU6IHAuc3RhdGlvbk5hbWUsXHJcbiAgICAgICAgICBsYXRpdHVkZTogbG9jYXRpb25BcnJheVsxXSxcclxuICAgICAgICAgIGxvbmdpdHVkZTogbG9jYXRpb25BcnJheVswXSxcclxuICAgICAgICAgIHdpZHRoOiAyNSxcclxuICAgICAgICAgIGhlaWdodDogMjUsXHJcbiAgICAgICAgICBhbHBoYTogMC44LFxyXG4gICAgICAgICAgbGFiZWw6IHtcclxuICAgICAgICAgICAgY29udGVudDogcC5zdGF0aW9uTmFtZVxyXG4gICAgICAgICAgfVxyXG4gICAgICAgIH0pO1xyXG4gICAgICAgIHJldHVybiB7XHJcbiAgICAgICAgICBsb25naXR1ZGU6IGxvY2F0aW9uQXJyYXlbMF0sXHJcbiAgICAgICAgICBsYXRpdHVkZTogbG9jYXRpb25BcnJheVsxXVxyXG4gICAgICAgIH07XHJcbiAgICAgIH0pO1xyXG4gICAgICBjb25zdCBwb2x5bGluZSA9IHRoaXMuZGF0YS5wb2x5bGluZTtcclxuICAgICAgcG9seWxpbmVbMF0ucG9pbnRzID0gcG9pbnRzO1xyXG4gICAgICBjb25zdCBpc1VwRG93bk5hbWUgPSBpc1VwRG93biA9PSAwID8gJ+S4iuihjCcgOiAn5LiL6KGMJztcclxuICAgICAgY29uc3Qgc3RhdGlvbnNMZW5ndGggPSBsaW5lLnN0YXRpb25zLmxlbmd0aDtcclxuICAgICAgY29uc3QgbGluZURldGFpbCA9IHtcclxuICAgICAgICBzdGFydFN0YXRpb246IGxpbmUuc3RhdGlvbnNbMF0uc3RhdGlvbk5hbWUsXHJcbiAgICAgICAgZW5kU3RhdGlvbjogbGluZS5zdGF0aW9uc1tzdGF0aW9uc0xlbmd0aCAtIDFdLnN0YXRpb25OYW1lLFxyXG4gICAgICB9XHJcbiAgICAgIGNvbnN0IG5vdGljZSA9IGAke2xpbmVOYW1lfToke2lzVXBEb3duTmFtZX0u6LW35aeL56uZOiR7bGluZURldGFpbC5zdGFydFN0YXRpb259LOe7iOeCueermToke2xpbmVEZXRhaWwuZW5kU3RhdGlvbn0uJHtsaW5lLmxpbmVJbmZvfWBcclxuICAgICAgd3guc2V0TmF2aWdhdGlvbkJhclRpdGxlKHtcclxuICAgICAgICB0aXRsZTogYCR7bGluZURldGFpbC5zdGFydFN0YXRpb259IOKGkiAke2xpbmVEZXRhaWwuZW5kU3RhdGlvbn1gXHJcbiAgICAgIH0pXHJcbiAgICAgIHRoaXMuc2V0RGF0YSh7XHJcbiAgICAgICAgaXNVcERvd25OYW1lLFxyXG4gICAgICAgIGxpbmVEZXRhaWwsXHJcbiAgICAgICAgc3RhdGlvbnNMZW5ndGgsXHJcbiAgICAgICAgbGluZSxcclxuICAgICAgICBub3RpY2UsXHJcbiAgICAgICAgcG9seWxpbmUsXHJcbiAgICAgICAgbWFya2VycyxcclxuICAgICAgICBsb2NhdGlvbjogR2xvYmFsLmdldFZhbChcImxvY2F0aW9uLWRhdGFcIilcclxuICAgICAgfSk7XHJcbiAgICAgIHd4LmhpZGVMb2FkaW5nKClcclxuICAgIH0pO1xyXG4gIH0sXHJcbiAgaGFuZGxlWm9vbSAoKSB7XHJcbiAgICBjb25zb2xlLmxvZygnem9vbScpXHJcbiAgICBpZiAodGhpcy5kYXRhLnZpZXdIZWlnaHQgPT09IDAuNSkge1xyXG4gICAgICB0aGlzLnNldERhdGEoe1xyXG4gICAgICAgIG1hcFN0eWxlOiAxLFxyXG4gICAgICAgIHZpZXdIZWlnaHQ6IDFcclxuICAgICAgfSlcclxuICAgIH0gZWxzZSB7XHJcbiAgICAgIHRoaXMuc2V0RGF0YSh7XHJcbiAgICAgICAgbWFwU3R5bGU6IDAsXHJcbiAgICAgICAgdmlld0hlaWdodDogMC41XHJcbiAgICAgIH0pXHJcbiAgICB9XHJcbiAgfSxcclxuICBoYW5kbGVDb252ZXJzaW9uICgpIHtcclxuICAgIGNvbnN0IGlzVXBEb3duID0gMSAtIHRoaXMuZGF0YS5pc1VwRG93bjtcclxuICAgIGNvbnN0IHsgbGluZU5hbWUgfSA9IHRoaXMuZGF0YTtcclxuICAgIGNvbnN0IGlzVXBEb3duTmFtZSA9IGlzVXBEb3duID09IDAgPyAn5LiK6KGMJyA6ICfkuIvooYwnO1xyXG4gICAgd3guc2hvd0xvYWRpbmcoe1xyXG4gICAgICB0aXRsZTogYOaNouS4uiR7aXNVcERvd25OYW1lfWAsXHJcbiAgICB9KVxyXG4gICAgdGhpcy51cGRhdGVMaW5lKGxpbmVOYW1lLCBpc1VwRG93bik7XHJcbiAgICB0aGlzLnVwZGF0ZUJ1c1dhaXRpbmcobGluZU5hbWUsIGlzVXBEb3duKTtcclxuICAgIHRoaXMuc2V0RGF0YSh7XHJcbiAgICAgIGlzVXBEb3duLCBpc1VwRG93bk5hbWVcclxuICAgIH0pXHJcbiAgfSxcclxuICBoYW5kbGVSZWZyZXNoICgpIHtcclxuICAgIGNvbnN0IHsgbWFya2VycyB9ID0gdGhpcy5kYXRhO1xyXG4gICAgLy8gY29uc29sZS5sb2cobWFya2VycylcclxuICAgIGNvbnN0IG0gPSBtYXJrZXJzLmZpbHRlcihmID0+IGYuYWxwaGEgPCAxKVxyXG4gICAgdGhpcy5zZXREYXRhKHsgbWFya2VyczogbSB9KVxyXG4gICAgLy8gY29uc29sZS5sb2cobSlcclxuICAgIHd4LnNob3dMb2FkaW5nKHtcclxuICAgICAgdGl0bGU6ICfliLfmlrDkuK0nLFxyXG4gICAgfSlcclxuICAgIGNvbnN0IHsgbGluZU5hbWUsIGlzVXBEb3duIH0gPSB0aGlzLmRhdGE7XHJcbiAgICB0aGlzLnVwZGF0ZUJ1c1dhaXRpbmcobGluZU5hbWUsIGlzVXBEb3duKTtcclxuICB9LFxyXG4gIGhhbmRsZUxvY2F0aW9uICgpIHtcclxuICAgIHRoaXMuc2V0RGF0YSh7XHJcbiAgICAgIGxvY2F0aW9uOiBHbG9iYWwuZ2V0VmFsKFwibG9jYXRpb24tZGF0YVwiKVxyXG4gICAgfSlcclxuICB9LFxyXG4gIGhhbmRsZVNldExvY2F0aW9uQ2VudGVyIChlKSB7XHJcbiAgICBjb25zdCB7IGN1cnJlbnRUYXJnZXQgfSA9IGU7XHJcbiAgICBjb25zdCB7IGRhdGFzZXQgfSA9IGN1cnJlbnRUYXJnZXQ7XHJcbiAgICBjb25zdCB7IGxvY2F0aW9uIH0gPSBkYXRhc2V0O1xyXG4gICAgdGhpcy5zZXREYXRhKHsgbG9jYXRpb24gfSlcclxuICB9LFxyXG4gIHJlZ2lvbmNoYW5nZSAoZSkge1xyXG4gICAgY29uc29sZS5sb2coZS50eXBlKTtcclxuICB9LFxyXG4gIG1hcmtlcnRhcCAoZSkge1xyXG4gICAgY29uc29sZS5sb2coZS5tYXJrZXJJZCk7XHJcbiAgfSxcclxuICBjb250cm9sdGFwIChlKSB7XHJcbiAgICBjb25zb2xlLmxvZyhlLmNvbnRyb2xJZCk7XHJcbiAgfVxyXG59OyJdfQ==