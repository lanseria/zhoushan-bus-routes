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

**2. 获取对应路线的站牌信息**


