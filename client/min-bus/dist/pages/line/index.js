"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _api = require("../../models/api.js");

var _api2 = _interopRequireDefault(_api);

var _global = require("../../models/global.js");

var _global2 = _interopRequireDefault(_global);

var _es6Promise = require("../../packages/es6-promise/dist/es6-promise.js");

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
    var _this = this;

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
    this.updateLine(lineName, isUpDown).then(function () {
      _this.updateBusWaiting(lineName, isUpDown);
    });
  },
  onShow: function onShow() {
    // const { lineDetail, lineName, isUpDownName, isUpDown } = this.data;
    // this.updateBusWaiting(lineName, isUpDown)
  },
  updateBusWaiting: function updateBusWaiting(lineName, isUpDown) {
    var _this2 = this;

    var params = { lineName: lineName, isUpDown: isUpDown, stationNum: 1 };
    _api2.default.getBusWaiting(params, {}, false).then(function (res) {
      var busWaiting = res;
      var bus = busWaiting.bus;

      var hideview = bus.length === 0 ? false : true;
      var markers = _this2.data.markers;
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
      _this2.setData({ busWaiting: busWaiting, markers: markers, hideview: hideview });
      wx.hideLoading();
    });
  },
  updateLine: function updateLine(lineName, isUpDown) {
    var _this3 = this;

    return new _es6Promise.Promise(function (resolve, reject) {
      var params = { lineName: lineName, isUpDown: isUpDown };
      _api2.default.getLine(params, {}, false).then(function (res) {
        var line = res;
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
        var polyline = _this3.data.polyline;
        polyline[0].points = points;
        var isUpDownName = isUpDown == 0 ? '上行' : '下行';
        var stationsLength = line.stations.length;
        var lineDetail = {
          startStation: line.stations[0].stationName,
          endStation: line.stations[stationsLength - 1].stationName
        };
        var notice = lineName + ":" + isUpDownName + ".\u8D77\u59CB\u7AD9:" + lineDetail.startStation + ",\u7EC8\u70B9\u7AD9:" + lineDetail.endStation + "." + line.lineInfo;
        wx.setNavigationBarTitle({
          title: "(\u8D77)" + lineDetail.startStation + " \u2192 (\u7EC8)" + lineDetail.endStation
        });
        _this3.setData({
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
        resolve(true);
      }).catch(function () {
        reject(false);
      });
    });
  },
  handleZoom: function handleZoom() {
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
    var _this4 = this;

    var isUpDown = 1 - this.data.isUpDown;
    var lineName = this.data.lineName;

    var isUpDownName = isUpDown == 0 ? '上行' : '下行';
    wx.showLoading({
      title: "\u6362\u4E3A" + isUpDownName
    });
    this.updateLine(lineName, isUpDown).then(function () {
      _this4.updateBusWaiting(lineName, isUpDown);
    });
    this.setData({
      isUpDown: isUpDown, isUpDownName: isUpDownName
    });
  },
  handleRefresh: function handleRefresh() {
    var markers = this.data.markers;

    var m = markers.filter(function (f) {
      return f.alpha < 1;
    });
    this.setData({ markers: m });
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImluZGV4Lnd4cCJdLCJuYW1lcyI6WyJkYXRhIiwidGl0bGUiLCJ0aXAiLCJsb2NhdGlvbiIsImhpZGV2aWV3Iiwic2NhbGUiLCJub3RpY2UiLCJsaW5lTmFtZSIsImlzVXBEb3duIiwibGluZSIsInN0YXRpb25zTGVuZ3RoIiwibGluZURldGFpbCIsImlzVXBEb3duTmFtZSIsImJ1c1dhaXRpbmciLCJtYXJrZXJzIiwiSGlzdG9yeUxpbmVzIiwibWFwU3R5bGUiLCJ2aWV3SGVpZ2h0IiwicmVIZWlnaHQiLCJtaW4iLCJtYXgiLCJwb2x5bGluZSIsInBvaW50cyIsImNvbG9yIiwid2lkdGgiLCJkb3R0ZWRMaW5lIiwib25Mb2FkIiwib3B0aW9ucyIsImRlY29kZVVSSUNvbXBvbmVudCIsInNldERhdGEiLCJ3eCIsInNob3dMb2FkaW5nIiwiaGwiLCJHbG9iYWwiLCJnZXRWYWwiLCJTZXQiLCJwdXNoIiwic2V0VmFsIiwidXBkYXRlTGluZSIsInRoZW4iLCJ1cGRhdGVCdXNXYWl0aW5nIiwib25TaG93IiwicGFyYW1zIiwic3RhdGlvbk51bSIsIkJ1cyIsImdldEJ1c1dhaXRpbmciLCJKU09OIiwicGFyc2UiLCJyZXMiLCJidXMiLCJsZW5ndGgiLCJmaWx0ZXJCdXMiLCJtYXAiLCJsb2NhdGlvbkFycmF5Iiwid2dzODR0b2djajAyIiwiYiIsImxuZyIsImxhdCIsImljb25QYXRoIiwiaWQiLCJidXNObyIsImxhdGl0dWRlIiwibG9uZ2l0dWRlIiwiaGVpZ2h0IiwiYWxwaGEiLCJsYWJlbCIsImNvbnRlbnQiLCJhd2F5IiwiZmFjdG9yIiwiaXNTdGF0aW9uIiwibGFzdFN0YXRpb24iLCJyZXZlcnNlIiwiaGlkZUxvYWRpbmciLCJQcm9taXNlIiwicmVzb2x2ZSIsInJlamVjdCIsImdldExpbmUiLCJzdGF0aW9ucyIsInAiLCJpIiwic3RhdGlvbklkIiwic3RhdGlvbk5hbWUiLCJzdGFydFN0YXRpb24iLCJlbmRTdGF0aW9uIiwibGluZUluZm8iLCJzZXROYXZpZ2F0aW9uQmFyVGl0bGUiLCJjYXRjaCIsImhhbmRsZVpvb20iLCJoYW5kbGVDb252ZXJzaW9uIiwiaGFuZGxlUmVmcmVzaCIsIm0iLCJmaWx0ZXIiLCJmIiwiaGFuZGxlTG9jYXRpb24iLCJoYW5kbGVTZXRMb2NhdGlvbkNlbnRlciIsImUiLCJjdXJyZW50VGFyZ2V0IiwiZGF0YXNldCIsInJlZ2lvbmNoYW5nZSIsImNvbnNvbGUiLCJsb2ciLCJ0eXBlIiwibWFya2VydGFwIiwibWFya2VySWQiLCJjb250cm9sdGFwIiwiY29udHJvbElkIl0sIm1hcHBpbmdzIjoiOzs7Ozs7QUFBQTs7OztBQUNBOzs7O0FBQ0E7Ozs7Ozs7QUFZRUEsUUFBTTtBQUFBO0FBQUE7QUFBQTs7QUFDSkMsV0FBTyxNQURIO0FBRUpDLFNBQUssTUFGRDtBQUdKQyxjQUFVLEVBSE47QUFJSkMsY0FBVSxJQUpOO0FBS0pDLFdBQU8sRUFMSDtBQU1KQyxZQUFRLEVBTko7QUFPSkMsY0FBVSxFQVBOO0FBUUpDLGNBQVUsQ0FSTjtBQVNKQyxVQUFNLEVBVEY7QUFVSkMsb0JBQWdCLENBVlo7QUFXSkMsZ0JBQVksRUFYUjtBQVlKQyxrQkFBYyxFQVpWO0FBYUpDLGdCQUFZLEVBYlI7QUFjSkMsYUFBUyxFQWRMO0FBZUpDLGtCQUFjLEVBZlY7QUFnQkpDLGNBQVUsRUFoQk47QUFpQkpDLGdCQUFZLEdBakJSO0FBa0JKQyxjQUFVO0FBQ1JDLFdBQUssR0FERztBQUVSQyxXQUFLO0FBRkcsS0FsQk47QUFzQkpDLGNBQVUsQ0FDUjtBQUNFQyxjQUFRLEVBRFY7QUFFRUMsYUFBTyxXQUZUO0FBR0VDLGFBQU8sQ0FIVDtBQUlFQyxrQkFBWTtBQUpkLEtBRFE7QUF0Qk4sRztBQStCTkMsUSxrQkFBUUMsTyxFQUFTO0FBQUE7O0FBQ2YsUUFBTXBCLFdBQVdxQixtQkFBbUJELFFBQVFwQixRQUEzQixDQUFqQjtBQUNBLFFBQU1DLFdBQVdvQixtQkFBbUJELFFBQVFuQixRQUEzQixDQUFqQjtBQUNBLFNBQUtxQixPQUFMLENBQWEsRUFBRXRCLGtC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O0FBSTFCLFNBQUswQixPQUFMLENBQWEsRUFBRTFCLGtCQUFGLEVBQWI7QUFDRCxHO0FBQ0QrRixjLHdCQUFjSCxDLEVBQUc7QUFDZkksWUFBUUMsR0FBUixDQUFZTCxFQUFFTSxJQUFkO0FBQ0QsRztBQUNEQyxXLHFCQUFXUCxDLEVBQUc7QUFDWkksWUFBUUMsR0FBUixDQUFZTCxFQUFFUSxRQUFkO0FBQ0QsRztBQUNEQyxZLHNCQUFZVCxDLEVBQUc7QUFDYkksWUFBUUMsR0FBUixDQUFZTCxFQUFFVSxTQUFkO0FBQ0QiLCJmaWxlIjoiaW5kZXgud3hwIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IEJ1cyBmcm9tIFwiLi4vLi4vbW9kZWxzL2FwaVwiO1xyXG5pbXBvcnQgR2xvYmFsIGZyb20gXCIuLi8uLi9tb2RlbHMvZ2xvYmFsXCI7XHJcbmltcG9ydCB7IFByb21pc2UgfSBmcm9tICdlczYtcHJvbWlzZSdcclxuZXhwb3J0IGRlZmF1bHQge1xyXG4gIGNvbmZpZzoge1xyXG4gICAgZGlzYWJsZVNjcm9sbDogdHJ1ZSxcclxuICAgIG5hdmlnYXRpb25CYXJUaXRsZVRleHQ6IFwi6Lev57q/XCIsXHJcbiAgICB1c2luZ0NvbXBvbmVudHM6IHtcclxuICAgICAgXCJsYXlvdXQtaGVhZFwiOiBcImxheW91dC9oZWFkXCIsXHJcbiAgICAgIFwid3hjLWxpc3RcIjogXCJAbWludWkvd3hjLWxpc3RcIixcclxuICAgICAgXCJ3eGMtaWNvblwiOiBcIkBtaW51aS93eGMtaWNvblwiLFxyXG4gICAgICAnd3hjLWFibm9yJzogJ0BtaW51aS93eGMtYWJub3InLFxyXG4gICAgfVxyXG4gIH0sXHJcbiAgZGF0YToge1xyXG4gICAgdGl0bGU6ICfnqbrnqbrnur/ot68nLFxyXG4gICAgdGlwOiAn56m656m65aaC5LmfJyxcclxuICAgIGxvY2F0aW9uOiB7fSxcclxuICAgIGhpZGV2aWV3OiB0cnVlLFxyXG4gICAgc2NhbGU6IDE0LFxyXG4gICAgbm90aWNlOiAnJyxcclxuICAgIGxpbmVOYW1lOiBcIlwiLFxyXG4gICAgaXNVcERvd246IDAsXHJcbiAgICBsaW5lOiB7fSxcclxuICAgIHN0YXRpb25zTGVuZ3RoOiAwLFxyXG4gICAgbGluZURldGFpbDoge30sXHJcbiAgICBpc1VwRG93bk5hbWU6ICcnLFxyXG4gICAgYnVzV2FpdGluZzoge30sXHJcbiAgICBtYXJrZXJzOiBbXSxcclxuICAgIEhpc3RvcnlMaW5lczogW10sXHJcbiAgICBtYXBTdHlsZTogJycsXHJcbiAgICB2aWV3SGVpZ2h0OiAwLjUsXHJcbiAgICByZUhlaWdodDoge1xyXG4gICAgICBtaW46IDAuNSxcclxuICAgICAgbWF4OiAwXHJcbiAgICB9LFxyXG4gICAgcG9seWxpbmU6IFtcclxuICAgICAge1xyXG4gICAgICAgIHBvaW50czogW10sXHJcbiAgICAgICAgY29sb3I6IFwiI0ZGMDAwMEREXCIsXHJcbiAgICAgICAgd2lkdGg6IDIsXHJcbiAgICAgICAgZG90dGVkTGluZTogdHJ1ZVxyXG4gICAgICB9XHJcbiAgICBdXHJcbiAgfSxcclxuICBvbkxvYWQgKG9wdGlvbnMpIHtcclxuICAgIGNvbnN0IGxpbmVOYW1lID0gZGVjb2RlVVJJQ29tcG9uZW50KG9wdGlvbnMubGluZU5hbWUpO1xyXG4gICAgY29uc3QgaXNVcERvd24gPSBkZWNvZGVVUklDb21wb25lbnQob3B0aW9ucy5pc1VwRG93bik7XHJcbiAgICB0aGlzLnNldERhdGEoeyBsaW5lTmFtZSwgaXNVcERvd24gfSk7XHJcbiAgICB3eC5zaG93TG9hZGluZyh7XHJcbiAgICAgIHRpdGxlOiAn5Yqg6L295LitJyxcclxuICAgIH0pXHJcbiAgICBsZXQgaGwgPSBHbG9iYWwuZ2V0VmFsKCdIaXN0b3J5TGluZXMnKVxyXG4gICAgaGwgPSBbLi4ubmV3IFNldChobCldXHJcbiAgICB0aGlzLkhpc3RvcnlMaW5lcyA9IGhsIHx8IFtdXHJcbiAgICB0aGlzLkhpc3RvcnlMaW5lcy5wdXNoKGxpbmVOYW1lKVxyXG4gICAgR2xvYmFsLnNldFZhbCgnSGlzdG9yeUxpbmVzJywgdGhpcy5IaXN0b3J5TGluZXMpXHJcbiAgICB0aGlzLnVwZGF0ZUxpbmUobGluZU5hbWUsIGlzVXBEb3duKS50aGVuKCgpID0+IHtcclxuICAgICAgdGhpcy51cGRhdGVCdXNXYWl0aW5nKGxpbmVOYW1lLCBpc1VwRG93bilcclxuICAgIH0pXHJcbiAgfSxcclxuICBvblNob3cgKCkge1xyXG4gICAgLy8gY29uc3QgeyBsaW5lRGV0YWlsLCBsaW5lTmFtZSwgaXNVcERvd25OYW1lLCBpc1VwRG93biB9ID0gdGhpcy5kYXRhO1xyXG4gICAgLy8gdGhpcy51cGRhdGVCdXNXYWl0aW5nKGxpbmVOYW1lLCBpc1VwRG93bilcclxuICB9LFxyXG4gIHVwZGF0ZUJ1c1dhaXRpbmcgKGxpbmVOYW1lLCBpc1VwRG93bikge1xyXG4gICAgY29uc3QgcGFyYW1zID0geyBsaW5lTmFtZSwgaXNVcERvd24sIHN0YXRpb25OdW06IDEgfTtcclxuICAgIEJ1cy5nZXRCdXNXYWl0aW5nKHBhcmFtcywge30sIGZhbHNlKS50aGVuKHJlcyA9PiB7XHJcbiAgICAgIGNvbnN0IGJ1c1dhaXRpbmcgPSBKU09OLnBhcnNlKHJlcy5kYXRhLmRhdGEpO1xyXG4gICAgICBjb25zdCB7IGJ1cyB9ID0gYnVzV2FpdGluZztcclxuICAgICAgY29uc3QgaGlkZXZpZXcgPSBidXMubGVuZ3RoID09PSAwID8gZmFsc2UgOiB0cnVlO1xyXG4gICAgICBjb25zdCBtYXJrZXJzID0gdGhpcy5kYXRhLm1hcmtlcnM7XHJcbiAgICAgIGNvbnN0IGZpbHRlckJ1cyA9IGJ1cy5tYXAoYiA9PiB7XHJcbiAgICAgICAgY29uc3QgbG9jYXRpb25BcnJheSA9IEdsb2JhbC53Z3M4NHRvZ2NqMDIoYi5sbmcsIGIubGF0KTtcclxuICAgICAgICBtYXJrZXJzLnB1c2goe1xyXG4gICAgICAgICAgaWNvblBhdGg6IEdsb2JhbC5nZXRWYWwoXCJidXMtaWNvbi1wbmdcIiksXHJcbiAgICAgICAgICBpZDogYi5idXNObyxcclxuICAgICAgICAgIHRpdGxlOiBiLmJ1c05vLFxyXG4gICAgICAgICAgbGF0aXR1ZGU6IGxvY2F0aW9uQXJyYXlbMV0sXHJcbiAgICAgICAgICBsb25naXR1ZGU6IGxvY2F0aW9uQXJyYXlbMF0sXHJcbiAgICAgICAgICB3aWR0aDogMjUsXHJcbiAgICAgICAgICBoZWlnaHQ6IDI1LFxyXG4gICAgICAgICAgYWxwaGE6IDEsXHJcbiAgICAgICAgICBsYWJlbDoge1xyXG4gICAgICAgICAgICBjb250ZW50OiBiLmJ1c05vXHJcbiAgICAgICAgICB9XHJcbiAgICAgICAgfSlcclxuICAgICAgICByZXR1cm4ge1xyXG4gICAgICAgICAgbG9uZ2l0dWRlOiBsb2NhdGlvbkFycmF5WzBdLFxyXG4gICAgICAgICAgbGF0aXR1ZGU6IGxvY2F0aW9uQXJyYXlbMV0sXHJcbiAgICAgICAgICBidXNObzogYOa1mUzCtyR7Yi5idXNOb31gLFxyXG4gICAgICAgICAgYXdheTogYi5hd2F5LFxyXG4gICAgICAgICAgZmFjdG9yOiBiLmZhY3RvcixcclxuICAgICAgICAgIGlzU3RhdGlvbjogYi5pc1N0YXRpb24sXHJcbiAgICAgICAgICBsYXN0U3RhdGlvbjogYi5sYXN0U3RhdGlvbixcclxuICAgICAgICAgIGxvY2F0aW9uOiB7XHJcbiAgICAgICAgICAgIGxvbmdpdHVkZTogbG9jYXRpb25BcnJheVswXSxcclxuICAgICAgICAgICAgbGF0aXR1ZGU6IGxvY2F0aW9uQXJyYXlbMV1cclxuICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgIH0pLnJldmVyc2UoKVxyXG4gICAgICBidXNXYWl0aW5nLmJ1cyA9IGZpbHRlckJ1c1xyXG4gICAgICB0aGlzLnNldERhdGEoeyBidXNXYWl0aW5nLCBtYXJrZXJzLCBoaWRldmlldyB9KTtcclxuICAgICAgd3guaGlkZUxvYWRpbmcoKVxyXG4gICAgfSk7XHJcbiAgfSxcclxuICB1cGRhdGVMaW5lIChsaW5lTmFtZSwgaXNVcERvd24pIHtcclxuICAgIHJldHVybiBuZXcgUHJvbWlzZSgocmVzb2x2ZSwgcmVqZWN0KSA9PiB7XHJcbiAgICAgIGNvbnN0IHBhcmFtcyA9IHsgbGluZU5hbWUsIGlzVXBEb3duIH07XHJcbiAgICAgIEJ1cy5nZXRMaW5lKHBhcmFtcywge30sIGZhbHNlKS50aGVuKHJlcyA9PiB7XHJcbiAgICAgICAgY29uc3QgbGluZSA9IEpTT04ucGFyc2UocmVzLmRhdGEuZGF0YSk7XHJcbiAgICAgICAgY29uc3QgbWFya2VycyA9IFtdO1xyXG4gICAgICAgIGNvbnN0IHBvaW50cyA9IGxpbmUuc3RhdGlvbnMubWFwKChwLCBpKSA9PiB7XHJcbiAgICAgICAgICBjb25zdCBsb2NhdGlvbkFycmF5ID0gR2xvYmFsLndnczg0dG9nY2owMihwLmxuZywgcC5sYXQpO1xyXG4gICAgICAgICAgbWFya2Vycy5wdXNoKHtcclxuICAgICAgICAgICAgaWNvblBhdGg6IEdsb2JhbC5nZXRWYWwoXCJsb2NhdGlvbi1wbmdcIiksXHJcbiAgICAgICAgICAgIGlkOiBwLnN0YXRpb25JZCxcclxuICAgICAgICAgICAgdGl0bGU6IHAuc3RhdGlvbk5hbWUsXHJcbiAgICAgICAgICAgIGxhdGl0dWRlOiBsb2NhdGlvbkFycmF5WzFdLFxyXG4gICAgICAgICAgICBsb25naXR1ZGU6IGxvY2F0aW9uQXJyYXlbMF0sXHJcbiAgICAgICAgICAgIHdpZHRoOiAyNSxcclxuICAgICAgICAgICAgaGVpZ2h0OiAyNSxcclxuICAgICAgICAgICAgYWxwaGE6IDAuOCxcclxuICAgICAgICAgICAgbGFiZWw6IHtcclxuICAgICAgICAgICAgICBjb250ZW50OiBwLnN0YXRpb25OYW1lXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgcmV0dXJuIHtcclxuICAgICAgICAgICAgbG9uZ2l0dWRlOiBsb2NhdGlvbkFycmF5WzBdLFxyXG4gICAgICAgICAgICBsYXRpdHVkZTogbG9jYXRpb25BcnJheVsxXVxyXG4gICAgICAgICAgfTtcclxuICAgICAgICB9KTtcclxuICAgICAgICBjb25zdCBwb2x5bGluZSA9IHRoaXMuZGF0YS5wb2x5bGluZTtcclxuICAgICAgICBwb2x5bGluZVswXS5wb2ludHMgPSBwb2ludHM7XHJcbiAgICAgICAgY29uc3QgaXNVcERvd25OYW1lID0gaXNVcERvd24gPT0gMCA/ICfkuIrooYwnIDogJ+S4i+ihjCc7XHJcbiAgICAgICAgY29uc3Qgc3RhdGlvbnNMZW5ndGggPSBsaW5lLnN0YXRpb25zLmxlbmd0aDtcclxuICAgICAgICBjb25zdCBsaW5lRGV0YWlsID0ge1xyXG4gICAgICAgICAgc3RhcnRTdGF0aW9uOiBsaW5lLnN0YXRpb25zWzBdLnN0YXRpb25OYW1lLFxyXG4gICAgICAgICAgZW5kU3RhdGlvbjogbGluZS5zdGF0aW9uc1tzdGF0aW9uc0xlbmd0aCAtIDFdLnN0YXRpb25OYW1lLFxyXG4gICAgICAgIH1cclxuICAgICAgICBjb25zdCBub3RpY2UgPSBgJHtsaW5lTmFtZX06JHtpc1VwRG93bk5hbWV9Lui1t+Wni+ermToke2xpbmVEZXRhaWwuc3RhcnRTdGF0aW9ufSznu4jngrnnq5k6JHtsaW5lRGV0YWlsLmVuZFN0YXRpb259LiR7bGluZS5saW5lSW5mb31gXHJcbiAgICAgICAgd3guc2V0TmF2aWdhdGlvbkJhclRpdGxlKHtcclxuICAgICAgICAgIHRpdGxlOiBgKOi1tykke2xpbmVEZXRhaWwuc3RhcnRTdGF0aW9ufSDihpIgKOe7iCkke2xpbmVEZXRhaWwuZW5kU3RhdGlvbn1gXHJcbiAgICAgICAgfSlcclxuICAgICAgICB0aGlzLnNldERhdGEoe1xyXG4gICAgICAgICAgaXNVcERvd25OYW1lLFxyXG4gICAgICAgICAgbGluZURldGFpbCxcclxuICAgICAgICAgIHN0YXRpb25zTGVuZ3RoLFxyXG4gICAgICAgICAgbGluZSxcclxuICAgICAgICAgIG5vdGljZSxcclxuICAgICAgICAgIHBvbHlsaW5lLFxyXG4gICAgICAgICAgbWFya2VycyxcclxuICAgICAgICAgIGxvY2F0aW9uOiBHbG9iYWwuZ2V0VmFsKFwibG9jYXRpb24tZGF0YVwiKVxyXG4gICAgICAgIH0pO1xyXG4gICAgICAgIHd4LmhpZGVMb2FkaW5nKClcclxuICAgICAgICByZXNvbHZlKHRydWUpXHJcbiAgICAgIH0pLmNhdGNoKCgpID0+IHtyZWplY3QoZmFsc2UpfSk7XHJcbiAgICB9KVxyXG5cclxuICB9LFxyXG4gIGhhbmRsZVpvb20gKCkge1xyXG4gICAgaWYgKHRoaXMuZGF0YS52aWV3SGVpZ2h0ID09PSAwLjUpIHtcclxuICAgICAgdGhpcy5zZXREYXRhKHtcclxuICAgICAgICBtYXBTdHlsZTogMSxcclxuICAgICAgICB2aWV3SGVpZ2h0OiAxXHJcbiAgICAgIH0pXHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICB0aGlzLnNldERhdGEoe1xyXG4gICAgICAgIG1hcFN0eWxlOiAwLFxyXG4gICAgICAgIHZpZXdIZWlnaHQ6IDAuNVxyXG4gICAgICB9KVxyXG4gICAgfVxyXG4gIH0sXHJcbiAgaGFuZGxlQ29udmVyc2lvbiAoKSB7XHJcbiAgICBjb25zdCBpc1VwRG93biA9IDEgLSB0aGlzLmRhdGEuaXNVcERvd247XHJcbiAgICBjb25zdCB7IGxpbmVOYW1lIH0gPSB0aGlzLmRhdGE7XHJcbiAgICBjb25zdCBpc1VwRG93bk5hbWUgPSBpc1VwRG93biA9PSAwID8gJ+S4iuihjCcgOiAn5LiL6KGMJztcclxuICAgIHd4LnNob3dMb2FkaW5nKHtcclxuICAgICAgdGl0bGU6IGDmjaLkuLoke2lzVXBEb3duTmFtZX1gLFxyXG4gICAgfSlcclxuICAgIHRoaXMudXBkYXRlTGluZShsaW5lTmFtZSwgaXNVcERvd24pLnRoZW4oKCkgPT4ge1xyXG4gICAgICB0aGlzLnVwZGF0ZUJ1c1dhaXRpbmcobGluZU5hbWUsIGlzVXBEb3duKVxyXG4gICAgfSlcclxuICAgIHRoaXMuc2V0RGF0YSh7XHJcbiAgICAgIGlzVXBEb3duLCBpc1VwRG93bk5hbWVcclxuICAgIH0pXHJcbiAgfSxcclxuICBoYW5kbGVSZWZyZXNoICgpIHtcclxuICAgIGNvbnN0IHsgbWFya2VycyB9ID0gdGhpcy5kYXRhO1xyXG4gICAgY29uc3QgbSA9IG1hcmtlcnMuZmlsdGVyKGYgPT4gZi5hbHBoYSA8IDEpXHJcbiAgICB0aGlzLnNldERhdGEoeyBtYXJrZXJzOiBtIH0pXHJcbiAgICB3eC5zaG93TG9hZGluZyh7XHJcbiAgICAgIHRpdGxlOiAn5Yi35paw5LitJyxcclxuICAgIH0pXHJcbiAgICBjb25zdCB7IGxpbmVOYW1lLCBpc1VwRG93biB9ID0gdGhpcy5kYXRhO1xyXG4gICAgdGhpcy51cGRhdGVCdXNXYWl0aW5nKGxpbmVOYW1lLCBpc1VwRG93bik7XHJcbiAgfSxcclxuICBoYW5kbGVMb2NhdGlvbiAoKSB7XHJcbiAgICB0aGlzLnNldERhdGEoe1xyXG4gICAgICBsb2NhdGlvbjogR2xvYmFsLmdldFZhbChcImxvY2F0aW9uLWRhdGFcIilcclxuICAgIH0pXHJcbiAgfSxcclxuICBoYW5kbGVTZXRMb2NhdGlvbkNlbnRlciAoZSkge1xyXG4gICAgY29uc3QgeyBjdXJyZW50VGFyZ2V0IH0gPSBlO1xyXG4gICAgY29uc3QgeyBkYXRhc2V0IH0gPSBjdXJyZW50VGFyZ2V0O1xyXG4gICAgY29uc3QgeyBsb2NhdGlvbiB9ID0gZGF0YXNldDtcclxuICAgIHRoaXMuc2V0RGF0YSh7IGxvY2F0aW9uIH0pXHJcbiAgfSxcclxuICByZWdpb25jaGFuZ2UgKGUpIHtcclxuICAgIGNvbnNvbGUubG9nKGUudHlwZSk7XHJcbiAgfSxcclxuICBtYXJrZXJ0YXAgKGUpIHtcclxuICAgIGNvbnNvbGUubG9nKGUubWFya2VySWQpO1xyXG4gIH0sXHJcbiAgY29udHJvbHRhcCAoZSkge1xyXG4gICAgY29uc29sZS5sb2coZS5jb250cm9sSWQpO1xyXG4gIH1cclxufTsiXX0=