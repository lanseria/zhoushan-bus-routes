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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImluZGV4Lnd4cCJdLCJuYW1lcyI6WyJkYXRhIiwidGl0bGUiLCJ0aXAiLCJsb2NhdGlvbiIsImhpZGV2aWV3Iiwic2NhbGUiLCJub3RpY2UiLCJsaW5lTmFtZSIsImlzVXBEb3duIiwibGluZSIsInN0YXRpb25zTGVuZ3RoIiwibGluZURldGFpbCIsImlzVXBEb3duTmFtZSIsImJ1c1dhaXRpbmciLCJtYXJrZXJzIiwibWFwU3R5bGUiLCJ2aWV3SGVpZ2h0IiwicmVIZWlnaHQiLCJtaW4iLCJtYXgiLCJwb2x5bGluZSIsInBvaW50cyIsImNvbG9yIiwid2lkdGgiLCJkb3R0ZWRMaW5lIiwib25Mb2FkIiwib3B0aW9ucyIsImRlY29kZVVSSUNvbXBvbmVudCIsInNldERhdGEiLCJ3eCIsInNob3dMb2FkaW5nIiwidXBkYXRlTGluZSIsInVwZGF0ZUJ1c1dhaXRpbmciLCJvblNob3ciLCJwYXJhbXMiLCJzdGF0aW9uTnVtIiwiQnVzIiwiZ2V0QnVzV2FpdGluZyIsInRoZW4iLCJKU09OIiwicGFyc2UiLCJyZXMiLCJidXMiLCJsZW5ndGgiLCJmaWx0ZXJCdXMiLCJtYXAiLCJsb2NhdGlvbkFycmF5IiwiR2xvYmFsIiwid2dzODR0b2djajAyIiwiYiIsImxuZyIsImxhdCIsInB1c2giLCJpY29uUGF0aCIsImdldFZhbCIsImlkIiwiYnVzTm8iLCJsYXRpdHVkZSIsImxvbmdpdHVkZSIsImhlaWdodCIsImFscGhhIiwibGFiZWwiLCJjb250ZW50IiwiYXdheSIsImZhY3RvciIsImlzU3RhdGlvbiIsImxhc3RTdGF0aW9uIiwicmV2ZXJzZSIsImhpZGVMb2FkaW5nIiwiZ2V0TGluZSIsInN0YXRpb25zIiwicCIsImkiLCJzdGF0aW9uSWQiLCJzdGF0aW9uTmFtZSIsInN0YXJ0U3RhdGlvbiIsImVuZFN0YXRpb24iLCJsaW5lSW5mbyIsInNldE5hdmlnYXRpb25CYXJUaXRsZSIsImhhbmRsZVpvb20iLCJoYW5kbGVDb252ZXJzaW9uIiwiaGFuZGxlUmVmcmVzaCIsIm0iLCJmaWx0ZXIiLCJmIiwiaGFuZGxlTG9jYXRpb24iLCJoYW5kbGVTZXRMb2NhdGlvbkNlbnRlciIsImUiLCJjdXJyZW50VGFyZ2V0IiwiZGF0YXNldCIsInJlZ2lvbmNoYW5nZSIsImNvbnNvbGUiLCJsb2ciLCJ0eXBlIiwibWFya2VydGFwIiwibWFya2VySWQiLCJjb250cm9sdGFwIiwiY29udHJvbElkIl0sIm1hcHBpbmdzIjoiOzs7Ozs7QUFBQTs7OztBQUNBOzs7Ozs7O0FBYUVBLFFBQU07QUFBQTtBQUFBO0FBQUE7O0FBQ0pDLFdBQU8sTUFESDtBQUVKQyxTQUFLLE1BRkQ7QUFHSkMsY0FBVSxFQUhOO0FBSUpDLGNBQVUsSUFKTjtBQUtKQyxXQUFPLEVBTEg7QUFNSkMsWUFBUSxFQU5KO0FBT0pDLGNBQVUsRUFQTjtBQVFKQyxjQUFVLENBUk47QUFTSkMsVUFBTSxFQVRGO0FBVUpDLG9CQUFnQixDQVZaO0FBV0pDLGdCQUFZLEVBWFI7QUFZSkMsa0JBQWMsRUFaVjtBQWFKQyxnQkFBWSxFQWJSO0FBY0pDLGFBQVMsRUFkTDtBQWVKQyxjQUFVLEVBZk47QUFnQkpDLGdCQUFZLEdBaEJSO0FBaUJKQyxjQUFVO0FBQ1JDLFdBQUssR0FERztBQUVSQyxXQUFLO0FBRkcsS0FqQk47QUFxQkpDLGNBQVUsQ0FDUjtBQUNFQyxjQUFRLEVBRFY7QUFFRUMsYUFBTyxXQUZUO0FBR0VDLGFBQU8sQ0FIVDtBQUlFQyxrQkFBWTtBQUpkLEtBRFE7QUFyQk4sRztBQThCTkMsUSxrQkFBT0MsTyxFQUFTO0FBQ2QsUUFBTW5CLFdBQVdvQixtQkFBbUJELFFBQVFuQixRQUEzQixDQUFqQjtBQUNBLFFBQU1DLFdBQVdtQixtQkFBbUJELFFBQVFsQixRQUEzQixDQUFqQjtBQUNBLFNBQUtvQixPQUFMLENBQWEsRUFBRXJCLGtCQUFGLEVBQVlDLGtCQUFaLEVBQWI7QUFDQXFCLE9BQUdDLFdBQUgsQ0FBZTtBQUNiN0IsYUFBTztBQURNLEtBQWY7QUFHQSxTQUFLOEIsVUFBTCxDQUFnQnhCLFFBQWhCLEVBQTBCQyxR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QUFSLENBQWU7QUFBQSxhQUFLQyxFQUFFeEIsS0FBRixHQUFVLENBQWY7QUFBQSxLQUFmLENBQVY7QUFDQSxTQUFLaEMsT0FBTCxDQUFhLEVBQUNkLFNBQVNvRSxDQUFWLEVBQWI7QUFDQTtBQUNBckQsT0FBR0MsV0FBSCxDQUFlO0FBQ2I3QixhQUFPO0FBRE0sS0FBZjtBQU5lLGlCQVNnQixLQUFLRCxJQVRyQjtBQUFBLFFBU1BPLFFBVE8sVUFTUEEsUUFUTztBQUFBLFFBU0dDLFFBVEgsVUFTR0EsUUFUSDs7QUFVZixTQUFLd0IsZ0JBQUwsQ0FBc0J6QixRQUF0QixFQUFnQ0MsUUFBaEM7QUFDRCxHO0FBQ0Q2RSxnQiw0QkFBa0I7QUFDaEIsU0FBS3pELE9BQUwsQ0FBYTtBQUNYekIsZ0JBQVU0QyxpQkFBT08sTUFBUCxDQUFjLGVBQWQ7QUFEQyxLQUFiO0FBR0QsRztBQUNEZ0MseUIsbUNBQXlCQyxDLEVBQUc7QUFBQSxRQUNuQkMsYUFEbUIsR0FDRkQsQ0FERSxDQUNuQkMsYUFEbUI7QUFBQSxRQUVuQkMsT0FGbUIsR0FFUkQsYUFGUSxDQUVuQkMsT0FGbUI7QUFBQSxRQUduQnRGLFFBSG1CLEdBR1BzRixPQUhPLENBR25CdEYsUUFIbUI7O0FBSTFCLFNBQUt5QixPQUFMLENBQWEsRUFBQ3pCLGtCQUFELEVBQWI7QUFDRCxHO0FBQ0R1RixjLHdCQUFhSCxDLEVBQUc7QUFDZEksWUFBUUMsR0FBUixDQUFZTCxFQUFFTSxJQUFkO0FBQ0QsRztBQUNEQyxXLHFCQUFVUCxDLEVBQUc7QUFDWEksWUFBUUMsR0FBUixDQUFZTCxFQUFFUSxRQUFkO0FBQ0QsRztBQUNEQyxZLHNCQUFXVCxDLEVBQUc7QUFDWkksWUFBUUMsR0FBUixDQUFZTCxFQUFFVSxTQUFkO0FBQ0QiLCJmaWxlIjoiaW5kZXgud3hwIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IEJ1cyBmcm9tIFwiLi4vLi4vbW9kZWxzL2FwaVwiO1xyXG5pbXBvcnQgR2xvYmFsIGZyb20gXCIuLi8uLi9tb2RlbHMvZ2xvYmFsXCI7XHJcblxyXG5leHBvcnQgZGVmYXVsdCB7XHJcbiAgY29uZmlnOiB7XHJcbiAgICBkaXNhYmxlU2Nyb2xsOiB0cnVlLFxyXG4gICAgbmF2aWdhdGlvbkJhclRpdGxlVGV4dDogXCLot6/nur9cIixcclxuICAgIHVzaW5nQ29tcG9uZW50czoge1xyXG4gICAgICBcImxheW91dC1oZWFkXCI6IFwibGF5b3V0L2hlYWRcIixcclxuICAgICAgXCJ3eGMtbGlzdFwiOiBcIkBtaW51aS93eGMtbGlzdFwiLFxyXG4gICAgICBcInd4Yy1pY29uXCI6IFwiQG1pbnVpL3d4Yy1pY29uXCIsXHJcbiAgICAgICd3eGMtYWJub3InOiAnQG1pbnVpL3d4Yy1hYm5vcicsXHJcbiAgICB9XHJcbiAgfSxcclxuICBkYXRhOiB7XHJcbiAgICB0aXRsZTogJ+epuuepuue6v+i3rycsXHJcbiAgICB0aXA6ICfnqbrnqbrlpoLkuZ8nLFxyXG4gICAgbG9jYXRpb246IHt9LFxyXG4gICAgaGlkZXZpZXc6IHRydWUsXHJcbiAgICBzY2FsZTogMTQsXHJcbiAgICBub3RpY2U6ICcnLFxyXG4gICAgbGluZU5hbWU6IFwiXCIsXHJcbiAgICBpc1VwRG93bjogMCxcclxuICAgIGxpbmU6IHt9LFxyXG4gICAgc3RhdGlvbnNMZW5ndGg6IDAsXHJcbiAgICBsaW5lRGV0YWlsOiB7fSxcclxuICAgIGlzVXBEb3duTmFtZTogJycsXHJcbiAgICBidXNXYWl0aW5nOiB7fSxcclxuICAgIG1hcmtlcnM6IFtdLFxyXG4gICAgbWFwU3R5bGU6ICcnLFxyXG4gICAgdmlld0hlaWdodDogMC41LFxyXG4gICAgcmVIZWlnaHQ6IHtcclxuICAgICAgbWluOiAwLjUsXHJcbiAgICAgIG1heDogMFxyXG4gICAgfSxcclxuICAgIHBvbHlsaW5lOiBbXHJcbiAgICAgIHtcclxuICAgICAgICBwb2ludHM6IFtdLFxyXG4gICAgICAgIGNvbG9yOiBcIiNGRjAwMDBERFwiLFxyXG4gICAgICAgIHdpZHRoOiAyLFxyXG4gICAgICAgIGRvdHRlZExpbmU6IHRydWVcclxuICAgICAgfVxyXG4gICAgXVxyXG4gIH0sXHJcbiAgb25Mb2FkKG9wdGlvbnMpIHtcclxuICAgIGNvbnN0IGxpbmVOYW1lID0gZGVjb2RlVVJJQ29tcG9uZW50KG9wdGlvbnMubGluZU5hbWUpO1xyXG4gICAgY29uc3QgaXNVcERvd24gPSBkZWNvZGVVUklDb21wb25lbnQob3B0aW9ucy5pc1VwRG93bik7XHJcbiAgICB0aGlzLnNldERhdGEoeyBsaW5lTmFtZSwgaXNVcERvd24gfSk7XHJcbiAgICB3eC5zaG93TG9hZGluZyh7XHJcbiAgICAgIHRpdGxlOiAn5Yqg6L295LitJyxcclxuICAgIH0pXHJcbiAgICB0aGlzLnVwZGF0ZUxpbmUobGluZU5hbWUsIGlzVXBEb3duKVxyXG4gICAgdGhpcy51cGRhdGVCdXNXYWl0aW5nKGxpbmVOYW1lLCBpc1VwRG93bilcclxuICB9LFxyXG4gIG9uU2hvdygpIHtcclxuICAgIGNvbnN0IHsgbGluZURldGFpbCwgbGluZU5hbWUsIGlzVXBEb3duTmFtZSwgaXNVcERvd24gfSA9IHRoaXMuZGF0YTtcclxuICAgIHRoaXMudXBkYXRlQnVzV2FpdGluZyhsaW5lTmFtZSwgaXNVcERvd24pXHJcbiAgfSxcclxuICB1cGRhdGVCdXNXYWl0aW5nIChsaW5lTmFtZSwgaXNVcERvd24pIHtcclxuICAgIGNvbnN0IHBhcmFtcyA9IHsgbGluZU5hbWUsIGlzVXBEb3duLCBzdGF0aW9uTnVtOiAxIH07XHJcbiAgICBCdXMuZ2V0QnVzV2FpdGluZyhwYXJhbXMsIHt9LCBmYWxzZSkudGhlbihyZXMgPT4ge1xyXG4gICAgICBjb25zdCBidXNXYWl0aW5nID0gSlNPTi5wYXJzZShyZXMuZGF0YS5kYXRhKTtcclxuICAgICAgY29uc3QgeyBidXMgfSA9IGJ1c1dhaXRpbmc7XHJcbiAgICAgIGNvbnN0IGhpZGV2aWV3ID0gYnVzLmxlbmd0aCA9PT0gMCA/IGZhbHNlIDogdHJ1ZTtcclxuICAgICAgY29uc3QgbWFya2VycyA9IHRoaXMuZGF0YS5tYXJrZXJzO1xyXG4gICAgICBjb25zdCBmaWx0ZXJCdXMgPSBidXMubWFwKGIgPT4ge1xyXG4gICAgICAgIGNvbnN0IGxvY2F0aW9uQXJyYXkgPSBHbG9iYWwud2dzODR0b2djajAyKGIubG5nLCBiLmxhdCk7XHJcbiAgICAgICAgbWFya2Vycy5wdXNoKHtcclxuICAgICAgICAgIGljb25QYXRoOiBHbG9iYWwuZ2V0VmFsKFwiYnVzLWljb24tcG5nXCIpLFxyXG4gICAgICAgICAgaWQ6IGIuYnVzTm8sXHJcbiAgICAgICAgICB0aXRsZTogYi5idXNObyxcclxuICAgICAgICAgIGxhdGl0dWRlOiBsb2NhdGlvbkFycmF5WzFdLFxyXG4gICAgICAgICAgbG9uZ2l0dWRlOiBsb2NhdGlvbkFycmF5WzBdLFxyXG4gICAgICAgICAgd2lkdGg6IDI1LFxyXG4gICAgICAgICAgaGVpZ2h0OiAyNSxcclxuICAgICAgICAgIGFscGhhOiAxLFxyXG4gICAgICAgICAgbGFiZWw6IHtcclxuICAgICAgICAgICAgY29udGVudDogYi5idXNOb1xyXG4gICAgICAgICAgfVxyXG4gICAgICAgIH0pXHJcbiAgICAgICAgcmV0dXJuIHtcclxuICAgICAgICAgIGxvbmdpdHVkZTogbG9jYXRpb25BcnJheVswXSxcclxuICAgICAgICAgIGxhdGl0dWRlOiBsb2NhdGlvbkFycmF5WzFdLFxyXG4gICAgICAgICAgYnVzTm86IGIuYnVzTm8sXHJcbiAgICAgICAgICBhd2F5OiBiLmF3YXksXHJcbiAgICAgICAgICBmYWN0b3I6IGIuZmFjdG9yLFxyXG4gICAgICAgICAgaXNTdGF0aW9uOiBiLmlzU3RhdGlvbixcclxuICAgICAgICAgIGxhc3RTdGF0aW9uOiBiLmxhc3RTdGF0aW9uLFxyXG4gICAgICAgICAgbG9jYXRpb246IHtcclxuICAgICAgICAgICAgbG9uZ2l0dWRlOiBsb2NhdGlvbkFycmF5WzBdLFxyXG4gICAgICAgICAgICBsYXRpdHVkZTogbG9jYXRpb25BcnJheVsxXVxyXG4gICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgfSkucmV2ZXJzZSgpXHJcbiAgICAgIGJ1c1dhaXRpbmcuYnVzID0gZmlsdGVyQnVzXHJcbiAgICAgIHRoaXMuc2V0RGF0YSh7YnVzV2FpdGluZywgbWFya2VycywgaGlkZXZpZXd9KTtcclxuICAgICAgd3guaGlkZUxvYWRpbmcoKVxyXG4gICAgfSk7XHJcbiAgfSxcclxuICB1cGRhdGVMaW5lIChsaW5lTmFtZSwgaXNVcERvd24pIHtcclxuICAgIGNvbnN0IHBhcmFtcyA9IHsgbGluZU5hbWUsIGlzVXBEb3duIH07XHJcbiAgICBCdXMuZ2V0TGluZShwYXJhbXMsIHt9LCBmYWxzZSkudGhlbihyZXMgPT4ge1xyXG4gICAgICBjb25zdCBsaW5lID0gSlNPTi5wYXJzZShyZXMuZGF0YS5kYXRhKTtcclxuICAgICAgY29uc3QgbWFya2VycyA9IFtdO1xyXG4gICAgICBjb25zdCBwb2ludHMgPSBsaW5lLnN0YXRpb25zLm1hcCgocCwgaSkgPT4ge1xyXG4gICAgICAgIGNvbnN0IGxvY2F0aW9uQXJyYXkgPSBHbG9iYWwud2dzODR0b2djajAyKHAubG5nLCBwLmxhdCk7XHJcbiAgICAgICAgbWFya2Vycy5wdXNoKHtcclxuICAgICAgICAgIGljb25QYXRoOiBHbG9iYWwuZ2V0VmFsKFwibG9jYXRpb24tcG5nXCIpLFxyXG4gICAgICAgICAgaWQ6IHAuc3RhdGlvbklkLFxyXG4gICAgICAgICAgdGl0bGU6IHAuc3RhdGlvbk5hbWUsXHJcbiAgICAgICAgICBsYXRpdHVkZTogbG9jYXRpb25BcnJheVsxXSxcclxuICAgICAgICAgIGxvbmdpdHVkZTogbG9jYXRpb25BcnJheVswXSxcclxuICAgICAgICAgIHdpZHRoOiAyNSxcclxuICAgICAgICAgIGhlaWdodDogMjUsXHJcbiAgICAgICAgICBhbHBoYTogMC44LFxyXG4gICAgICAgICAgbGFiZWw6IHtcclxuICAgICAgICAgICAgY29udGVudDogcC5zdGF0aW9uTmFtZVxyXG4gICAgICAgICAgfVxyXG4gICAgICAgIH0pO1xyXG4gICAgICAgIHJldHVybiB7XHJcbiAgICAgICAgICBsb25naXR1ZGU6IGxvY2F0aW9uQXJyYXlbMF0sXHJcbiAgICAgICAgICBsYXRpdHVkZTogbG9jYXRpb25BcnJheVsxXVxyXG4gICAgICAgIH07XHJcbiAgICAgIH0pO1xyXG4gICAgICBjb25zdCBwb2x5bGluZSA9IHRoaXMuZGF0YS5wb2x5bGluZTtcclxuICAgICAgcG9seWxpbmVbMF0ucG9pbnRzID0gcG9pbnRzO1xyXG4gICAgICBjb25zdCBpc1VwRG93bk5hbWUgPSBpc1VwRG93biA9PSAwID8gJ+S4iuihjCcgOiAn5LiL6KGMJztcclxuICAgICAgY29uc3Qgc3RhdGlvbnNMZW5ndGggPSBsaW5lLnN0YXRpb25zLmxlbmd0aDtcclxuICAgICAgY29uc3QgbGluZURldGFpbCA9IHtcclxuICAgICAgICBzdGFydFN0YXRpb246IGxpbmUuc3RhdGlvbnNbMF0uc3RhdGlvbk5hbWUsXHJcbiAgICAgICAgZW5kU3RhdGlvbjogbGluZS5zdGF0aW9uc1tzdGF0aW9uc0xlbmd0aCAtIDFdLnN0YXRpb25OYW1lLFxyXG4gICAgICB9XHJcbiAgICAgIGNvbnN0IG5vdGljZSA9IGAke2xpbmVOYW1lfToke2lzVXBEb3duTmFtZX0u6LW35aeL56uZOiR7bGluZURldGFpbC5zdGFydFN0YXRpb259LOe7iOeCueermToke2xpbmVEZXRhaWwuZW5kU3RhdGlvbn0uJHtsaW5lLmxpbmVJbmZvfWBcclxuICAgICAgd3guc2V0TmF2aWdhdGlvbkJhclRpdGxlKHtcclxuICAgICAgICB0aXRsZTogYCR7bGluZURldGFpbC5zdGFydFN0YXRpb259IOKGkiAke2xpbmVEZXRhaWwuZW5kU3RhdGlvbn1gXHJcbiAgICAgIH0pXHJcbiAgICAgIHRoaXMuc2V0RGF0YSh7XHJcbiAgICAgICAgaXNVcERvd25OYW1lLFxyXG4gICAgICAgIGxpbmVEZXRhaWwsXHJcbiAgICAgICAgc3RhdGlvbnNMZW5ndGgsXHJcbiAgICAgICAgbGluZSxcclxuICAgICAgICBub3RpY2UsXHJcbiAgICAgICAgcG9seWxpbmUsXHJcbiAgICAgICAgbWFya2VycyxcclxuICAgICAgICBsb2NhdGlvbjogR2xvYmFsLmdldFZhbChcImxvY2F0aW9uLWRhdGFcIilcclxuICAgICAgfSk7XHJcbiAgICAgIHd4LmhpZGVMb2FkaW5nKClcclxuICAgIH0pO1xyXG4gIH0sXHJcbiAgaGFuZGxlWm9vbSAoKSB7XHJcbiAgICBpZiAodGhpcy5kYXRhLnZpZXdIZWlnaHQgPT09IDAuNSkge1xyXG4gICAgICB0aGlzLnNldERhdGEoe1xyXG4gICAgICAgIG1hcFN0eWxlOiBgaGVpZ2h0OiA5MHZoO2AsXHJcbiAgICAgICAgdmlld0hlaWdodDogMVxyXG4gICAgICB9KSBcclxuICAgIH0gZWxzZSB7XHJcbiAgICAgIHRoaXMuc2V0RGF0YSh7XHJcbiAgICAgICAgbWFwU3R5bGU6IGBgLFxyXG4gICAgICAgIHZpZXdIZWlnaHQ6IDAuNVxyXG4gICAgICB9KSAgXHJcbiAgICB9XHJcbiAgfSxcclxuICBoYW5kbGVDb252ZXJzaW9uICgpIHtcclxuICAgIGNvbnN0IGlzVXBEb3duID0gMSAtIHRoaXMuZGF0YS5pc1VwRG93bjtcclxuICAgIGNvbnN0IHsgbGluZU5hbWUgfSA9IHRoaXMuZGF0YTtcclxuICAgIGNvbnN0IGlzVXBEb3duTmFtZSA9IGlzVXBEb3duID09IDAgPyAn5LiK6KGMJyA6ICfkuIvooYwnO1xyXG4gICAgd3guc2hvd0xvYWRpbmcoe1xyXG4gICAgICB0aXRsZTogYOaNouS4uiR7aXNVcERvd25OYW1lfWAsXHJcbiAgICB9KVxyXG4gICAgdGhpcy51cGRhdGVMaW5lKGxpbmVOYW1lLCBpc1VwRG93bik7XHJcbiAgICB0aGlzLnVwZGF0ZUJ1c1dhaXRpbmcobGluZU5hbWUsIGlzVXBEb3duKTtcclxuICAgIHRoaXMuc2V0RGF0YSh7XHJcbiAgICAgIGlzVXBEb3duLCBpc1VwRG93bk5hbWVcclxuICAgIH0pXHJcbiAgfSxcclxuICBoYW5kbGVSZWZyZXNoICgpIHtcclxuICAgIGNvbnN0IHsgbWFya2VycyB9ID0gdGhpcy5kYXRhO1xyXG4gICAgLy8gY29uc29sZS5sb2cobWFya2VycylcclxuICAgIGNvbnN0IG0gPSBtYXJrZXJzLmZpbHRlcihmID0+IGYuYWxwaGEgPCAxKVxyXG4gICAgdGhpcy5zZXREYXRhKHttYXJrZXJzOiBtfSlcclxuICAgIC8vIGNvbnNvbGUubG9nKG0pXHJcbiAgICB3eC5zaG93TG9hZGluZyh7XHJcbiAgICAgIHRpdGxlOiAn5Yi35paw5LitJyxcclxuICAgIH0pXHJcbiAgICBjb25zdCB7IGxpbmVOYW1lLCBpc1VwRG93biB9ID0gdGhpcy5kYXRhO1xyXG4gICAgdGhpcy51cGRhdGVCdXNXYWl0aW5nKGxpbmVOYW1lLCBpc1VwRG93bik7XHJcbiAgfSxcclxuICBoYW5kbGVMb2NhdGlvbiAoKSB7XHJcbiAgICB0aGlzLnNldERhdGEoe1xyXG4gICAgICBsb2NhdGlvbjogR2xvYmFsLmdldFZhbChcImxvY2F0aW9uLWRhdGFcIilcclxuICAgIH0pXHJcbiAgfSxcclxuICBoYW5kbGVTZXRMb2NhdGlvbkNlbnRlciAoZSkge1xyXG4gICAgY29uc3Qge2N1cnJlbnRUYXJnZXR9ID0gZTtcclxuICAgIGNvbnN0IHtkYXRhc2V0fSA9IGN1cnJlbnRUYXJnZXQ7XHJcbiAgICBjb25zdCB7bG9jYXRpb259ID0gZGF0YXNldDtcclxuICAgIHRoaXMuc2V0RGF0YSh7bG9jYXRpb259KVxyXG4gIH0sXHJcbiAgcmVnaW9uY2hhbmdlKGUpIHtcclxuICAgIGNvbnNvbGUubG9nKGUudHlwZSk7XHJcbiAgfSxcclxuICBtYXJrZXJ0YXAoZSkge1xyXG4gICAgY29uc29sZS5sb2coZS5tYXJrZXJJZCk7XHJcbiAgfSxcclxuICBjb250cm9sdGFwKGUpIHtcclxuICAgIGNvbnNvbGUubG9nKGUuY29udHJvbElkKTtcclxuICB9XHJcbn07Il19