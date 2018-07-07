# 舟山公交小程序的接口

## 接口说明

> 这是利用 `Postman` 工具来测试的，这里的统一接口前缀是 `http://122.226.17.46:10251/WifiBusInterface/transfer`

**1. 获得所有路线**

- API Name: `/line!getAllLines.action`

- Methods: `GET`

- Need Params: `null`

- Response Body: 

```js
[
  ...{
    line_no: 1,
    line_name: "101路" // 中文需要 `Encode` 以防乱码，因为这里是 Response，所以不需要
  }
]
```
- Design Detail: 由于这个接口是一个数组，我需要每日更新所有路线信息。利用 `node-schedule` 设定每日 `0` 时远程获取全部路线数据

-  `Mongo Schema` 结构: 
```js
const allLineSchema = new Schema({
  <object_id>,
  content: Schema.Types.Mixed,
  created_time: { type: Date, default: Date.now },
  updated_time: { type: Date, default: Date.now },
  area_id: Number
}) 
```

**2. 获取对应路线的站牌信息**

- API Name: `/line!getLine.action`

- Methods: `POST`

- Content-Type: `application/x-www-form-urlencoded` 

- Need Params: `isUpDown=0&lineName=B1%E8%B7%AF`(form 格式)

- Response Body:

```js
{
	"isUpDown": "0",
	"stations": [{
		"stationId": "2582",
		"lng": "122.3138634",
		"stationName": "东港站",
		"lat": "29.96713925"
	}],
	"lineInfo": "所属分公司:公交二分公司;首末班时间:06:30-21:00;票价：2元.",
	"points": [{
		"lng": "122.31386",
		"lat": "29.967141"
	}]
}
```

- Design Detail: 由于这个接口返回的是一个对象，同时在中间层做缓存，所以需要添加一个字段 `queryId` ，值为 `isUpDown` 字段与 `lineName` 字段的拼装。同样每日只更新一次。

- `Mongo Schema` 结构：
```js
const lineSchema = new Schema({
	<object_id>,
	lineInfo: '所属分公司:公交二分公司;首末班时间:06:30-21:00;票价：2元.',
	isUpDown: '0',
	stations: [{
		stationId: 2583, //Int
		lng: 122.3138634, //Double
		lat: 29.96713925 //Double
		stationName: '东港站' // String
	}] // 暂时省略 points
})
```

**3. 获取当前路线的交通阻塞状况**

- API Name: `/bus!queryRoadState.action`

- Methods: `POST`

- Content-Type: `application/x-www-form-urlencoded` 

- Need Params: `isUpDown=0&lineName=B1%E8%B7%AF`(form 格式)

- Response Body:

```js
[...{
	"state": "3", // 其中 state 表示阻塞程度 1是拥堵，2是缓行，3是畅通
	"labelNo": "0" // 其中 labelNo 表示对应站牌号
}]
```

- Design Detail: 由于这个接口返回的是一个数组，直接转发即可。此接口为实时性更新。无需缓存。

**4. 获取当前路线的公交状态**

- API Name: `/bus!getBusWaiting.action`

- Methods: `POST`

- Content-Type: `application/x-www-form-urlencoded` 

- Need Params: `isUpDown=0&lineName=B1%E8%B7%AF&stationNum=12`(form 格式)

- Response Body:

```js
{
	"message": "第1班车 (15226) 驶离檀枫新苑,即将进站;   第2班车 (15233) 驶离浙大站,距离本站还有3站,共6.9公里;   第3班车 (15225) 驶离舟山医院,距离本站还有6站,共12.0公里;  请做好乘车准备;",
	"bus": [...{
		"busNo": "15226",
		"lastStation": "11",
		"lng": "122.113266666667",
		"lat": "30.0184833333333",
		"isStation": "1",
		"away": "0",
		"factor": "8"
	}]
}
```

- Design Detail: 由于这个接口返回的是一个对象，直接转发接口。此接口为实时性更新。无需缓存。

**其他API**

**4. 获取公交新闻信息**