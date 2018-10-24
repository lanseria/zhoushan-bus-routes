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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImluZGV4Lnd4cCJdLCJuYW1lcyI6WyJkYXRhIiwidGl0bGUiLCJ0aXAiLCJsb2NhdGlvbiIsImhpZGV2aWV3Iiwic2NhbGUiLCJub3RpY2UiLCJsaW5lTmFtZSIsImlzVXBEb3duIiwibGluZSIsInN0YXRpb25zTGVuZ3RoIiwibGluZURldGFpbCIsImlzVXBEb3duTmFtZSIsImJ1c1dhaXRpbmciLCJtYXJrZXJzIiwibWFwU3R5bGUiLCJ2aWV3SGVpZ2h0IiwicmVIZWlnaHQiLCJtaW4iLCJtYXgiLCJwb2x5bGluZSIsInBvaW50cyIsImNvbG9yIiwid2lkdGgiLCJkb3R0ZWRMaW5lIiwib25Mb2FkIiwib3B0aW9ucyIsImRlY29kZVVSSUNvbXBvbmVudCIsInNldERhdGEiLCJ3eCIsInNob3dMb2FkaW5nIiwidXBkYXRlTGluZSIsInVwZGF0ZUJ1c1dhaXRpbmciLCJvblNob3ciLCJwYXJhbXMiLCJzdGF0aW9uTnVtIiwiQnVzIiwiZ2V0QnVzV2FpdGluZyIsInRoZW4iLCJKU09OIiwicGFyc2UiLCJyZXMiLCJidXMiLCJsZW5ndGgiLCJmaWx0ZXJCdXMiLCJtYXAiLCJsb2NhdGlvbkFycmF5IiwiR2xvYmFsIiwid2dzODR0b2djajAyIiwiYiIsImxuZyIsImxhdCIsInB1c2giLCJpY29uUGF0aCIsImdldFZhbCIsImlkIiwiYnVzTm8iLCJsYXRpdHVkZSIsImxvbmdpdHVkZSIsImhlaWdodCIsImFscGhhIiwibGFiZWwiLCJjb250ZW50IiwiYXdheSIsImZhY3RvciIsImlzU3RhdGlvbiIsImxhc3RTdGF0aW9uIiwicmV2ZXJzZSIsImhpZGVMb2FkaW5nIiwiZ2V0TGluZSIsInN0YXRpb25zIiwicCIsImkiLCJzdGF0aW9uSWQiLCJzdGF0aW9uTmFtZSIsInN0YXJ0U3RhdGlvbiIsImVuZFN0YXRpb24iLCJsaW5lSW5mbyIsInNldE5hdmlnYXRpb25CYXJUaXRsZSIsImhhbmRsZVpvb20iLCJjb25zb2xlIiwibG9nIiwiaGFuZGxlQ29udmVyc2lvbiIsImhhbmRsZVJlZnJlc2giLCJtIiwiZmlsdGVyIiwiZiIsImhhbmRsZUxvY2F0aW9uIiwiaGFuZGxlU2V0TG9jYXRpb25DZW50ZXIiLCJlIiwiY3VycmVudFRhcmdldCIsImRhdGFzZXQiLCJyZWdpb25jaGFuZ2UiLCJ0eXBlIiwibWFya2VydGFwIiwibWFya2VySWQiLCJjb250cm9sdGFwIiwiY29udHJvbElkIl0sIm1hcHBpbmdzIjoiOzs7Ozs7QUFBQTs7OztBQUNBOzs7Ozs7O0FBYUVBLFFBQU07QUFBQTtBQUFBO0FBQUE7O0FBQ0pDLFdBQU8sTUFESDtBQUVKQyxTQUFLLE1BRkQ7QUFHSkMsY0FBVSxFQUhOO0FBSUpDLGNBQVUsSUFKTjtBQUtKQyxXQUFPLEVBTEg7QUFNSkMsWUFBUSxFQU5KO0FBT0pDLGNBQVUsRUFQTjtBQVFKQyxjQUFVLENBUk47QUFTSkMsVUFBTSxFQVRGO0FBVUpDLG9CQUFnQixDQVZaO0FBV0pDLGdCQUFZLEVBWFI7QUFZSkMsa0JBQWMsRUFaVjtBQWFKQyxnQkFBWSxFQWJSO0FBY0pDLGFBQVMsRUFkTDtBQWVKQyxjQUFVLEVBZk47QUFnQkpDLGdCQUFZLEdBaEJSO0FBaUJKQyxjQUFVO0FBQ1JDLFdBQUssR0FERztBQUVSQyxXQUFLO0FBRkcsS0FqQk47QUFxQkpDLGNBQVUsQ0FDUjtBQUNFQyxjQUFRLEVBRFY7QUFFRUMsYUFBTyxXQUZUO0FBR0VDLGFBQU8sQ0FIVDtBQUlFQyxrQkFBWTtBQUpkLEtBRFE7QUFyQk4sRztBQThCTkMsUSxrQkFBUUMsTyxFQUFTO0FBQ2YsUUFBTW5CLFdBQVdvQixtQkFBbUJELFFBQVFuQixRQUEzQixDQUFqQjtBQUNBLFFBQU1DLFdBQVdtQixtQkFBbUJELFFBQVFsQixRQUEzQixDQUFqQjtBQUNBLFNBQUtvQixPQUFMLENBQWEsRUFBRXJCLGtCQUFGLEVBQVlDLGtCQUFaLEVBQWI7QUFDQXFCLE9BQUdDLFdBQUgsQ0FBZTtBQUNiN0IsYUFBTztBQURNLEtBQWY7QUFHQSxTQUFLOEIsVUFBTCxDQUFnQnhCLFFBQWhCLEVBQTBCQyxRQUExQjtBQUNBLFNBQUt3QixnQkFBTCxDQUFzQnpCLFFBQXRCLEVBQWdDQyxRQUFoQztBQUNELEc7QUFDRHlCLFEsb0JBQVU7QUFBQSxnQkFDaUQsS0FBS2pDLElBRHREO0FBQUEsUUFDQVcsVUFEQSxTQUNBQSxVQURBO0FBQUEsUUFDWUosUUFEWixTQUNZQSxRQURaO0FBQUEsUUFDc0JLLFlBRHRCLFNBQ3NCQSxZQUR0QjtBQUFBLFFBQ29DSixRQURwQyxTQUNvQ0EsUUFEcEM7O0FBRVIsU0FBS3dCLGdCQUFMLENBQXNCekIsUUFBdEIsRUFBZ0NDLFFBQWhDO0FBQ0QsRztBQUNEd0Isa0IsNEJBQWtCekIsUSxFQUFVQyxRLEVBQVU7QUFBQTs7QUFDcEMsUUFBTTBCLFNBQVMsRUFBRTNCLGtCQUFGLEVBQVlDLGtCQUFaLEVBQXNCMkIsWUFBWSxDQUFsQyxFQUFmO0FBQ0FDLGtCQUFJQyxhQUFKLENBQWtCSCxNQUFsQixFQUEwQixFQUExQixFQUE4QixLQUE5QixFQUFxQ0ksSUFBckMsQ0FBMEMsZUFBTztBQUMvQyxVQUFNekIsYUFBYTBCLEtBQUtDLEtBQUwsQ0FBV0MsSUFBSXpDLElBQUosQ0FBU0EsSUFBcEIsQ0FBbkI7QUFEK0MsVUFFdkMwQyxHQUZ1QyxHQUUvQjdCLFVBRitCLENBRXZDNkIsR0FGdUM7O0FBRy9DLFVBQU10QyxXQUFXc0MsSUFBSUMsTUFBSixLQUFlLENBQWYsR0FBbUIsS0FBbkIsR0FBMkIsSUFBNUM7QUFDQSxVQUFNN0IsVUFBVSxNQUFLZCxJQUFMLENBQVVjLE9BQTFCO0FBQ0EsVUFBTThCLFlBQVlGLElBQUlHLEdBQUosQ0FBUSxhQUFLO0FBQzdCLFlBQU1DLGdCQUFnQkMsaUJBQU9DLFlBQVAsQ0FBb0JDLEVBQUVDLEdBQXRCLEVBQTJCRCxFQUFFRSxHQUE3QixDQUF0QjtBQUNBckMsZ0JBQVFzQyxJQUFSLENBQWE7QUFDWEMsb0JBQVVOLGlCQUFPTyxNQUFQLENBQWMsY0FBZCxDQURDO0FBRVhDLGNBQUlOLEVBQUVPLEtBRks7QUFHWHZELGlCQUFPZ0QsRUFBRU8sS0FIRTtBQUlYQyxvQkFBVVgsY0FBYyxDQUFkLENBSkM7QUFLWFkscUJBQVdaLGNBQWMsQ0FBZCxDQUxBO0FBTVh2QixpQkFBTyxFQU5JO0FBT1hvQyxrQkFBUSxFQVBHO0FBUVhDLGlCQUFPLENBUkk7QUFTWEMsaUJBQU87QUFDTEMscUJBQVNiLEVBQUVPO0FBRE47QUFUSSxTQUFiO0FBYUEsZUFBTztBQUNMRSxxQkFBV1osY0FBYyxDQUFkLENBRE47QUFFTFcsb0JBQVVYLGNBQWMsQ0FBZCxDQUZMO0FBR0xVLGlCQUFPUCxFQUFFTyxLQUhKO0FBSUxPLGdCQUFNZCxFQUFFYyxJQUpIO0FBS0xDLGtCQUFRZixFQUFFZSxNQUxMO0FBTUxDLHFCQUFXaEIsRUFBRWdCLFNBTlI7QUFPTEMsdUJBQWFqQixFQUFFaUIsV0FQVjtBQVFML0Qsb0JBQVU7QUFDUnVELHVCQUFXWixjQUFjLENBQWQsQ0FESDtBQUVSVyxzQkFBVVgsY0FBYyxDQUFkO0FBRkY7QUFSTCxTQUFQO0FBYUQsT0E1QmlCLEVBNEJmcUIsT0E1QmUsRUFBbEI7QUE2QkF0RCxpQkFBVzZCLEdBQVgsR0FBaUJFLFNBQWpCO0FBQ0EsWUFBS2hCLE9BQUwsQ0FBYSxFQUFFZixzQkFBRixFQUFjQyxnQkFBZCxFQUF1QlYsa0JBQXZCLEVBQWI7QUFDQXlCLFNBQUd1QyxXQUFIO0FBQ0QsS0FyQ0Q7QUFzQ0QsRztBQUNEckMsWSxzQkFBWXhCLFEsRUFBVUMsUSxFQUFVO0FBQUE7O0FBQzlCLFFBQU0wQixTQUFTLEVBQUUzQixrQkFBRixFQUFZQyxrQkFBWixFQUFmO0FBQ0E0QixrQkFBSWlDLE9BQUosQ0FBWW5DLE1BQVosRUFBb0IsRUFBcEIsRUFBd0IsS0FBeEIsRUFBK0JJLElBQS9CLENBQW9DLGVBQU87QUFDekMsVUFBTTdCLE9BQU84QixLQUFLQyxLQUFMLENBQVdDLElBQUl6QyxJQUFKLENBQVNBLElBQXBCLENBQWI7QUFDQSxVQUFNYyxVQUFVLEVBQWhCO0FBQ0EsVUFBTU8sU0FBU1osS0FBSzZELFFBQUwsQ0FBY3pCLEdBQWQsQ0FBa0IsVUFBQzBCLENBQUQsRUFBSUMsQ0FBSixFQUFVO0FBQ3pDLFlBQU0xQixnQkFBZ0JDLGlCQUFPQyxZQUFQLENBQW9CdUIsRUFBRXJCLEdBQXRCLEVBQTJCcUIsRUFBRXBCLEdBQTdCLENBQXRCO0FBQ0FyQyxnQkFBUXNDLElBQVIsQ0FBYTtBQUNYQyxvQkFBVU4saUJBQU9PLE1BQVAsQ0FBYyxjQUFkLENBREM7QUFFWEMsY0FBSWdCLEVBQUVFLFNBRks7QUFHWHhFLGlCQUFPc0UsRUFBRUcsV0FIRTtBQUlYakIsb0JBQVVYLGNBQWMsQ0FBZCxDQUpDO0FBS1hZLHFCQUFXWixjQUFjLENBQWQsQ0FMQTtBQU1YdkIsaUJBQU8sRUFOSTtBQU9Yb0Msa0JBQVEsRUFQRztBQVFYQyxpQkFBTyxHQVJJO0FBU1hDLGlCQUFPO0FBQ0xDLHFCQUFTUyxFQUFFRztBQUROO0FBVEksU0FBYjtBQWFBLGVBQU87QUFDTGhCLHFCQUFXWixjQUFjLENBQWQsQ0FETjtBQUVMVyxvQkFBVVgsY0FBYyxDQUFkO0FBRkwsU0FBUDtBQUlELE9BbkJjLENBQWY7QUFvQkEsVUFBTTFCLFdBQVcsT0FBS3BCLElBQUwsQ0FBVW9CLFFBQTNCO0FBQ0FBLGVBQVMsQ0FBVCxFQUFZQyxNQUFaLEdBQXFCQSxNQUFyQjtBQUNBLFVBQU1ULGVBQWVKLFlBQVksQ0FBWixHQUFnQixJQUFoQixHQUF1QixJQUE1QztBQUNBLFVBQU1FLGlCQUFpQkQsS0FBSzZELFFBQUwsQ0FBYzNCLE1BQXJDO0FBQ0EsVUFBTWhDLGFBQWE7QUFDakJnRSxzQkFBY2xFLEtBQUs2RCxRQUFMLENBQWMsQ0FBZCxFQUFpQkksV0FEZDtBQUVqQkUsb0JBQVluRSxLQUFLNkQsUUFBTCxDQUFjNUQsaUJBQWlCLENBQS9CLEVBQWtDZ0U7QUFGN0IsT0FBbkI7QUFJQSxVQUFNcEUsU0FBWUMsUUFBWixTQUF3QkssWUFBeEIsNEJBQTRDRCxXQUFXZ0UsWUFBdkQsNEJBQTJFaEUsV0FBV2lFLFVBQXRGLFNBQW9HbkUsS0FBS29FLFFBQS9HO0FBQ0FoRCxTQUFHaUQscUJBQUgsQ0FBeUI7QUFDdkI3RSxlQUFVVSxXQUFXZ0UsWUFBckIsZ0JBQXVDaEUsV0FBV2lFO0FBRDNCLE9BQXpCO0FBR0EsYUFBS2hELE9BQUwsQ0FBYTtBQUNYaEIsa0NBRFc7QUFFWEQsOEJBRlc7QUFHWEQsc0NBSFc7QUFJWEQsa0JBSlc7QUFLWEgsc0JBTFc7QUFNWGMsMEJBTlc7QUFPWE4sd0JBUFc7QUFRWFgsa0JBQVU0QyxpQkFBT08sTUFBUCxDQUFjLGVBQWQ7QUFSQyxPQUFiO0FBVUF6QixTQUFHdUMsV0FBSDtBQUNELEtBOUNEO0FBK0NELEc7QUFDRFcsWSx3QkFBYztBQUNaQyxZQUFRQyxHQUFSLENBQVksTUFBWjtBQUNBLFFBQUksS0FBS2pGLElBQUwsQ0FBVWdCLFVBQVYsS0FBeUIsR0FBN0IsRUFBa0M7QUFDaEMsV0FBS1ksT0FBTCxDQUFhO0FBQ1hiLGtCQUFVLENBREM7QUFFWEMsb0JBQVk7QUFGRCxPQUFiO0FBSUQsS0FMRCxNQUtPO0FBQ0wsV0FBS1ksT0FBTCxDQUFhO0FBQ1hiLGtCQUFVLENBREM7QUFFWEMsb0JBQVk7QUFGRCxPQUFiO0FBSUQ7QUFDRixHO0FBQ0RrRSxrQiw4QkFBb0I7QUFDbEIsUUFBTTFFLFdBQVcsSUFBSSxLQUFLUixJQUFMLENBQVVRLFFBQS9CO0FBRGtCLFFBRVZELFFBRlUsR0FFRyxLQUFLUCxJQUZSLENBRVZPLFFBRlU7O0FBR2xCLFFBQU1LLGVBQWVKLFlBQVksQ0FBWixHQUFnQixJQUFoQixHQUF1QixJQUE1QztBQUNBcUIsT0FBR0MsV0FBSCxDQUFlO0FBQ2I3Qiw4QkFBWVc7QUFEQyxLQUFmO0FBR0EsU0FBS21CLFVBQUwsQ0FBZ0J4QixRQUFoQixFQUEwQkMsUUFBMUI7QUFDQSxTQUFLd0IsZ0JBQUwsQ0FBc0J6QixRQUF0QixFQUFnQ0MsUUFBaEM7QUFDQSxTQUFLb0IsT0FBTCxDQUFhO0FBQ1hwQix3QkFEVyxFQUNESTtBQURDLEtBQWI7QUFHRCxHO0FBQ0R1RSxlLDJCQUFpQjtBQUFBLFFBQ1ByRSxPQURPLEdBQ0ssS0FBS2QsSUFEVixDQUNQYyxPQURPO0FBRWY7O0FBQ0EsUUFBTXNFLElBQUl0RSxRQUFRdUUsTUFBUixDQUFlO0FBQUEsYUFBS0MsRUFBRTFCLEtBQUYsR0FBVSxDQUFmO0FBQUEsS0FBZixDQUFWO0FBQ0EsU0FBS2hDLE9BQUwsQ0FBYSxFQUFFZCxTQUFTc0UsQ0FBWCxFQUFiO0FBQ0E7QUFDQXZELE9BQUdDLFdBQUgsQ0FBZTtBQUNiN0IsYUFBTztBQURNLEtBQWY7QUFOZSxpQkFTZ0IsS0FBS0QsSUFUckI7QUFBQSxRQVNQTyxRQVRPLFVBU1BBLFFBVE87QUFBQSxRQVNHQyxRQVRILFVBU0dBLFFBVEg7O0FBVWYsU0FBS3dCLGdCQUFMLENBQXNCekIsUUFBdEIsRUFBZ0NDLFFBQWhDO0FBQ0QsRztBQUNEK0UsZ0IsNEJBQWtCO0FBQ2hCLFNBQUszRCxPQUFMLENBQWE7QUFDWHpCLGdCQUFVNEMsaUJBQU9PLE1BQVAsQ0FBYyxlQUFkO0FBREMsS0FBYjtBQUdELEc7QUFDRGtDLHlCLG1DQUF5QkMsQyxFQUFHO0FBQUEsUUFDbEJDLGFBRGtCLEdBQ0FELENBREEsQ0FDbEJDLGFBRGtCO0FBQUEsUUFFbEJDLE9BRmtCLEdBRU5ELGFBRk0sQ0FFbEJDLE9BRmtCO0FBQUEsUUFHbEJ4RixRQUhrQixHQUdMd0YsT0FISyxDQUdsQnhGLFFBSGtCOztBQUkxQixTQUFLeUIsT0FBTCxDQUFhLEVBQUV6QixrQkFBRixFQUFiO0FBQ0QsRztBQUNEeUYsYyx3QkFBY0gsQyxFQUFHO0FBQ2ZULFlBQVFDLEdBQVIsQ0FBWVEsRUFBRUksSUFBZDtBQUNELEc7QUFDREMsVyxxQkFBV0wsQyxFQUFHO0FBQ1pULFlBQVFDLEdBQVIsQ0FBWVEsRUFBRU0sUUFBZDtBQUNELEc7QUFDREMsWSxzQkFBWVAsQyxFQUFHO0FBQ2JULFlBQVFDLEdBQVIsQ0FBWVEsRUFBRVEsU0FBZDtBQUNEIiwiZmlsZSI6ImluZGV4Lnd4cCIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBCdXMgZnJvbSBcIi4uLy4uL21vZGVscy9hcGlcIjtcclxuaW1wb3J0IEdsb2JhbCBmcm9tIFwiLi4vLi4vbW9kZWxzL2dsb2JhbFwiO1xyXG5cclxuZXhwb3J0IGRlZmF1bHQge1xyXG4gIGNvbmZpZzoge1xyXG4gICAgZGlzYWJsZVNjcm9sbDogdHJ1ZSxcclxuICAgIG5hdmlnYXRpb25CYXJUaXRsZVRleHQ6IFwi6Lev57q/XCIsXHJcbiAgICB1c2luZ0NvbXBvbmVudHM6IHtcclxuICAgICAgXCJsYXlvdXQtaGVhZFwiOiBcImxheW91dC9oZWFkXCIsXHJcbiAgICAgIFwid3hjLWxpc3RcIjogXCJAbWludWkvd3hjLWxpc3RcIixcclxuICAgICAgXCJ3eGMtaWNvblwiOiBcIkBtaW51aS93eGMtaWNvblwiLFxyXG4gICAgICAnd3hjLWFibm9yJzogJ0BtaW51aS93eGMtYWJub3InLFxyXG4gICAgfVxyXG4gIH0sXHJcbiAgZGF0YToge1xyXG4gICAgdGl0bGU6ICfnqbrnqbrnur/ot68nLFxyXG4gICAgdGlwOiAn56m656m65aaC5LmfJyxcclxuICAgIGxvY2F0aW9uOiB7fSxcclxuICAgIGhpZGV2aWV3OiB0cnVlLFxyXG4gICAgc2NhbGU6IDE0LFxyXG4gICAgbm90aWNlOiAnJyxcclxuICAgIGxpbmVOYW1lOiBcIlwiLFxyXG4gICAgaXNVcERvd246IDAsXHJcbiAgICBsaW5lOiB7fSxcclxuICAgIHN0YXRpb25zTGVuZ3RoOiAwLFxyXG4gICAgbGluZURldGFpbDoge30sXHJcbiAgICBpc1VwRG93bk5hbWU6ICcnLFxyXG4gICAgYnVzV2FpdGluZzoge30sXHJcbiAgICBtYXJrZXJzOiBbXSxcclxuICAgIG1hcFN0eWxlOiAnJyxcclxuICAgIHZpZXdIZWlnaHQ6IDAuNSxcclxuICAgIHJlSGVpZ2h0OiB7XHJcbiAgICAgIG1pbjogMC41LFxyXG4gICAgICBtYXg6IDBcclxuICAgIH0sXHJcbiAgICBwb2x5bGluZTogW1xyXG4gICAgICB7XHJcbiAgICAgICAgcG9pbnRzOiBbXSxcclxuICAgICAgICBjb2xvcjogXCIjRkYwMDAwRERcIixcclxuICAgICAgICB3aWR0aDogMixcclxuICAgICAgICBkb3R0ZWRMaW5lOiB0cnVlXHJcbiAgICAgIH1cclxuICAgIF1cclxuICB9LFxyXG4gIG9uTG9hZCAob3B0aW9ucykge1xyXG4gICAgY29uc3QgbGluZU5hbWUgPSBkZWNvZGVVUklDb21wb25lbnQob3B0aW9ucy5saW5lTmFtZSk7XHJcbiAgICBjb25zdCBpc1VwRG93biA9IGRlY29kZVVSSUNvbXBvbmVudChvcHRpb25zLmlzVXBEb3duKTtcclxuICAgIHRoaXMuc2V0RGF0YSh7IGxpbmVOYW1lLCBpc1VwRG93biB9KTtcclxuICAgIHd4LnNob3dMb2FkaW5nKHtcclxuICAgICAgdGl0bGU6ICfliqDovb3kuK0nLFxyXG4gICAgfSlcclxuICAgIHRoaXMudXBkYXRlTGluZShsaW5lTmFtZSwgaXNVcERvd24pXHJcbiAgICB0aGlzLnVwZGF0ZUJ1c1dhaXRpbmcobGluZU5hbWUsIGlzVXBEb3duKVxyXG4gIH0sXHJcbiAgb25TaG93ICgpIHtcclxuICAgIGNvbnN0IHsgbGluZURldGFpbCwgbGluZU5hbWUsIGlzVXBEb3duTmFtZSwgaXNVcERvd24gfSA9IHRoaXMuZGF0YTtcclxuICAgIHRoaXMudXBkYXRlQnVzV2FpdGluZyhsaW5lTmFtZSwgaXNVcERvd24pXHJcbiAgfSxcclxuICB1cGRhdGVCdXNXYWl0aW5nIChsaW5lTmFtZSwgaXNVcERvd24pIHtcclxuICAgIGNvbnN0IHBhcmFtcyA9IHsgbGluZU5hbWUsIGlzVXBEb3duLCBzdGF0aW9uTnVtOiAxIH07XHJcbiAgICBCdXMuZ2V0QnVzV2FpdGluZyhwYXJhbXMsIHt9LCBmYWxzZSkudGhlbihyZXMgPT4ge1xyXG4gICAgICBjb25zdCBidXNXYWl0aW5nID0gSlNPTi5wYXJzZShyZXMuZGF0YS5kYXRhKTtcclxuICAgICAgY29uc3QgeyBidXMgfSA9IGJ1c1dhaXRpbmc7XHJcbiAgICAgIGNvbnN0IGhpZGV2aWV3ID0gYnVzLmxlbmd0aCA9PT0gMCA/IGZhbHNlIDogdHJ1ZTtcclxuICAgICAgY29uc3QgbWFya2VycyA9IHRoaXMuZGF0YS5tYXJrZXJzO1xyXG4gICAgICBjb25zdCBmaWx0ZXJCdXMgPSBidXMubWFwKGIgPT4ge1xyXG4gICAgICAgIGNvbnN0IGxvY2F0aW9uQXJyYXkgPSBHbG9iYWwud2dzODR0b2djajAyKGIubG5nLCBiLmxhdCk7XHJcbiAgICAgICAgbWFya2Vycy5wdXNoKHtcclxuICAgICAgICAgIGljb25QYXRoOiBHbG9iYWwuZ2V0VmFsKFwiYnVzLWljb24tcG5nXCIpLFxyXG4gICAgICAgICAgaWQ6IGIuYnVzTm8sXHJcbiAgICAgICAgICB0aXRsZTogYi5idXNObyxcclxuICAgICAgICAgIGxhdGl0dWRlOiBsb2NhdGlvbkFycmF5WzFdLFxyXG4gICAgICAgICAgbG9uZ2l0dWRlOiBsb2NhdGlvbkFycmF5WzBdLFxyXG4gICAgICAgICAgd2lkdGg6IDI1LFxyXG4gICAgICAgICAgaGVpZ2h0OiAyNSxcclxuICAgICAgICAgIGFscGhhOiAxLFxyXG4gICAgICAgICAgbGFiZWw6IHtcclxuICAgICAgICAgICAgY29udGVudDogYi5idXNOb1xyXG4gICAgICAgICAgfVxyXG4gICAgICAgIH0pXHJcbiAgICAgICAgcmV0dXJuIHtcclxuICAgICAgICAgIGxvbmdpdHVkZTogbG9jYXRpb25BcnJheVswXSxcclxuICAgICAgICAgIGxhdGl0dWRlOiBsb2NhdGlvbkFycmF5WzFdLFxyXG4gICAgICAgICAgYnVzTm86IGIuYnVzTm8sXHJcbiAgICAgICAgICBhd2F5OiBiLmF3YXksXHJcbiAgICAgICAgICBmYWN0b3I6IGIuZmFjdG9yLFxyXG4gICAgICAgICAgaXNTdGF0aW9uOiBiLmlzU3RhdGlvbixcclxuICAgICAgICAgIGxhc3RTdGF0aW9uOiBiLmxhc3RTdGF0aW9uLFxyXG4gICAgICAgICAgbG9jYXRpb246IHtcclxuICAgICAgICAgICAgbG9uZ2l0dWRlOiBsb2NhdGlvbkFycmF5WzBdLFxyXG4gICAgICAgICAgICBsYXRpdHVkZTogbG9jYXRpb25BcnJheVsxXVxyXG4gICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgfSkucmV2ZXJzZSgpXHJcbiAgICAgIGJ1c1dhaXRpbmcuYnVzID0gZmlsdGVyQnVzXHJcbiAgICAgIHRoaXMuc2V0RGF0YSh7IGJ1c1dhaXRpbmcsIG1hcmtlcnMsIGhpZGV2aWV3IH0pO1xyXG4gICAgICB3eC5oaWRlTG9hZGluZygpXHJcbiAgICB9KTtcclxuICB9LFxyXG4gIHVwZGF0ZUxpbmUgKGxpbmVOYW1lLCBpc1VwRG93bikge1xyXG4gICAgY29uc3QgcGFyYW1zID0geyBsaW5lTmFtZSwgaXNVcERvd24gfTtcclxuICAgIEJ1cy5nZXRMaW5lKHBhcmFtcywge30sIGZhbHNlKS50aGVuKHJlcyA9PiB7XHJcbiAgICAgIGNvbnN0IGxpbmUgPSBKU09OLnBhcnNlKHJlcy5kYXRhLmRhdGEpO1xyXG4gICAgICBjb25zdCBtYXJrZXJzID0gW107XHJcbiAgICAgIGNvbnN0IHBvaW50cyA9IGxpbmUuc3RhdGlvbnMubWFwKChwLCBpKSA9PiB7XHJcbiAgICAgICAgY29uc3QgbG9jYXRpb25BcnJheSA9IEdsb2JhbC53Z3M4NHRvZ2NqMDIocC5sbmcsIHAubGF0KTtcclxuICAgICAgICBtYXJrZXJzLnB1c2goe1xyXG4gICAgICAgICAgaWNvblBhdGg6IEdsb2JhbC5nZXRWYWwoXCJsb2NhdGlvbi1wbmdcIiksXHJcbiAgICAgICAgICBpZDogcC5zdGF0aW9uSWQsXHJcbiAgICAgICAgICB0aXRsZTogcC5zdGF0aW9uTmFtZSxcclxuICAgICAgICAgIGxhdGl0dWRlOiBsb2NhdGlvbkFycmF5WzFdLFxyXG4gICAgICAgICAgbG9uZ2l0dWRlOiBsb2NhdGlvbkFycmF5WzBdLFxyXG4gICAgICAgICAgd2lkdGg6IDI1LFxyXG4gICAgICAgICAgaGVpZ2h0OiAyNSxcclxuICAgICAgICAgIGFscGhhOiAwLjgsXHJcbiAgICAgICAgICBsYWJlbDoge1xyXG4gICAgICAgICAgICBjb250ZW50OiBwLnN0YXRpb25OYW1lXHJcbiAgICAgICAgICB9XHJcbiAgICAgICAgfSk7XHJcbiAgICAgICAgcmV0dXJuIHtcclxuICAgICAgICAgIGxvbmdpdHVkZTogbG9jYXRpb25BcnJheVswXSxcclxuICAgICAgICAgIGxhdGl0dWRlOiBsb2NhdGlvbkFycmF5WzFdXHJcbiAgICAgICAgfTtcclxuICAgICAgfSk7XHJcbiAgICAgIGNvbnN0IHBvbHlsaW5lID0gdGhpcy5kYXRhLnBvbHlsaW5lO1xyXG4gICAgICBwb2x5bGluZVswXS5wb2ludHMgPSBwb2ludHM7XHJcbiAgICAgIGNvbnN0IGlzVXBEb3duTmFtZSA9IGlzVXBEb3duID09IDAgPyAn5LiK6KGMJyA6ICfkuIvooYwnO1xyXG4gICAgICBjb25zdCBzdGF0aW9uc0xlbmd0aCA9IGxpbmUuc3RhdGlvbnMubGVuZ3RoO1xyXG4gICAgICBjb25zdCBsaW5lRGV0YWlsID0ge1xyXG4gICAgICAgIHN0YXJ0U3RhdGlvbjogbGluZS5zdGF0aW9uc1swXS5zdGF0aW9uTmFtZSxcclxuICAgICAgICBlbmRTdGF0aW9uOiBsaW5lLnN0YXRpb25zW3N0YXRpb25zTGVuZ3RoIC0gMV0uc3RhdGlvbk5hbWUsXHJcbiAgICAgIH1cclxuICAgICAgY29uc3Qgbm90aWNlID0gYCR7bGluZU5hbWV9OiR7aXNVcERvd25OYW1lfS7otbflp4vnq5k6JHtsaW5lRGV0YWlsLnN0YXJ0U3RhdGlvbn0s57uI54K556uZOiR7bGluZURldGFpbC5lbmRTdGF0aW9ufS4ke2xpbmUubGluZUluZm99YFxyXG4gICAgICB3eC5zZXROYXZpZ2F0aW9uQmFyVGl0bGUoe1xyXG4gICAgICAgIHRpdGxlOiBgJHtsaW5lRGV0YWlsLnN0YXJ0U3RhdGlvbn0g4oaSICR7bGluZURldGFpbC5lbmRTdGF0aW9ufWBcclxuICAgICAgfSlcclxuICAgICAgdGhpcy5zZXREYXRhKHtcclxuICAgICAgICBpc1VwRG93bk5hbWUsXHJcbiAgICAgICAgbGluZURldGFpbCxcclxuICAgICAgICBzdGF0aW9uc0xlbmd0aCxcclxuICAgICAgICBsaW5lLFxyXG4gICAgICAgIG5vdGljZSxcclxuICAgICAgICBwb2x5bGluZSxcclxuICAgICAgICBtYXJrZXJzLFxyXG4gICAgICAgIGxvY2F0aW9uOiBHbG9iYWwuZ2V0VmFsKFwibG9jYXRpb24tZGF0YVwiKVxyXG4gICAgICB9KTtcclxuICAgICAgd3guaGlkZUxvYWRpbmcoKVxyXG4gICAgfSk7XHJcbiAgfSxcclxuICBoYW5kbGVab29tICgpIHtcclxuICAgIGNvbnNvbGUubG9nKCd6b29tJylcclxuICAgIGlmICh0aGlzLmRhdGEudmlld0hlaWdodCA9PT0gMC41KSB7XHJcbiAgICAgIHRoaXMuc2V0RGF0YSh7XHJcbiAgICAgICAgbWFwU3R5bGU6IDEsXHJcbiAgICAgICAgdmlld0hlaWdodDogMVxyXG4gICAgICB9KVxyXG4gICAgfSBlbHNlIHtcclxuICAgICAgdGhpcy5zZXREYXRhKHtcclxuICAgICAgICBtYXBTdHlsZTogMCxcclxuICAgICAgICB2aWV3SGVpZ2h0OiAwLjVcclxuICAgICAgfSlcclxuICAgIH1cclxuICB9LFxyXG4gIGhhbmRsZUNvbnZlcnNpb24gKCkge1xyXG4gICAgY29uc3QgaXNVcERvd24gPSAxIC0gdGhpcy5kYXRhLmlzVXBEb3duO1xyXG4gICAgY29uc3QgeyBsaW5lTmFtZSB9ID0gdGhpcy5kYXRhO1xyXG4gICAgY29uc3QgaXNVcERvd25OYW1lID0gaXNVcERvd24gPT0gMCA/ICfkuIrooYwnIDogJ+S4i+ihjCc7XHJcbiAgICB3eC5zaG93TG9hZGluZyh7XHJcbiAgICAgIHRpdGxlOiBg5o2i5Li6JHtpc1VwRG93bk5hbWV9YCxcclxuICAgIH0pXHJcbiAgICB0aGlzLnVwZGF0ZUxpbmUobGluZU5hbWUsIGlzVXBEb3duKTtcclxuICAgIHRoaXMudXBkYXRlQnVzV2FpdGluZyhsaW5lTmFtZSwgaXNVcERvd24pO1xyXG4gICAgdGhpcy5zZXREYXRhKHtcclxuICAgICAgaXNVcERvd24sIGlzVXBEb3duTmFtZVxyXG4gICAgfSlcclxuICB9LFxyXG4gIGhhbmRsZVJlZnJlc2ggKCkge1xyXG4gICAgY29uc3QgeyBtYXJrZXJzIH0gPSB0aGlzLmRhdGE7XHJcbiAgICAvLyBjb25zb2xlLmxvZyhtYXJrZXJzKVxyXG4gICAgY29uc3QgbSA9IG1hcmtlcnMuZmlsdGVyKGYgPT4gZi5hbHBoYSA8IDEpXHJcbiAgICB0aGlzLnNldERhdGEoeyBtYXJrZXJzOiBtIH0pXHJcbiAgICAvLyBjb25zb2xlLmxvZyhtKVxyXG4gICAgd3guc2hvd0xvYWRpbmcoe1xyXG4gICAgICB0aXRsZTogJ+WIt+aWsOS4rScsXHJcbiAgICB9KVxyXG4gICAgY29uc3QgeyBsaW5lTmFtZSwgaXNVcERvd24gfSA9IHRoaXMuZGF0YTtcclxuICAgIHRoaXMudXBkYXRlQnVzV2FpdGluZyhsaW5lTmFtZSwgaXNVcERvd24pO1xyXG4gIH0sXHJcbiAgaGFuZGxlTG9jYXRpb24gKCkge1xyXG4gICAgdGhpcy5zZXREYXRhKHtcclxuICAgICAgbG9jYXRpb246IEdsb2JhbC5nZXRWYWwoXCJsb2NhdGlvbi1kYXRhXCIpXHJcbiAgICB9KVxyXG4gIH0sXHJcbiAgaGFuZGxlU2V0TG9jYXRpb25DZW50ZXIgKGUpIHtcclxuICAgIGNvbnN0IHsgY3VycmVudFRhcmdldCB9ID0gZTtcclxuICAgIGNvbnN0IHsgZGF0YXNldCB9ID0gY3VycmVudFRhcmdldDtcclxuICAgIGNvbnN0IHsgbG9jYXRpb24gfSA9IGRhdGFzZXQ7XHJcbiAgICB0aGlzLnNldERhdGEoeyBsb2NhdGlvbiB9KVxyXG4gIH0sXHJcbiAgcmVnaW9uY2hhbmdlIChlKSB7XHJcbiAgICBjb25zb2xlLmxvZyhlLnR5cGUpO1xyXG4gIH0sXHJcbiAgbWFya2VydGFwIChlKSB7XHJcbiAgICBjb25zb2xlLmxvZyhlLm1hcmtlcklkKTtcclxuICB9LFxyXG4gIGNvbnRyb2x0YXAgKGUpIHtcclxuICAgIGNvbnNvbGUubG9nKGUuY29udHJvbElkKTtcclxuICB9XHJcbn07Il19