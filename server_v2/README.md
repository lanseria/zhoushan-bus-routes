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
    line_name: "101路" // 中文需要 `Encode` 以防乱码
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

**3. 获取当前路线的公交状态**

**其他API**

**4. 获取公交新闻信息**