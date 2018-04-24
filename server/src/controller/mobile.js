const lineRoutes = require('../tasks/line_routes.json')
const stations = require('../tasks/stations.json')
const _ = require('lodash')
const { readHotRoutesFile, writeHotRoutesFile, readIpRecordFile, writeIpRecordFile } = require('./json')
const { PackagingData, getFromServer } = require('../utils/jsonpTools')
const { allLineRoutes } = lineRoutes

exports.getThisStation = async function (ctx) {
  const { request } = ctx
  const { query } = request
  const data = await getFromServer(query)
  ctx.body = PackagingData(data)
}

exports.detail = async function (ctx) {
  const { request } = ctx
  const { query, ip } = request
  // 记录路线热度，并排序 这里只有新的ip地址才可以新增热度路线
  const { ipRecord } = readIpRecordFile()
  // 校验
  let rid = ''
  const idx = allLineRoutes.findIndex(m => m === query.rid)
  if (idx < 0) {
    const decodeRid = decodeURIComponent(query.rid)
    const idx1 = allLineRoutes.findIndex(m => m === decodeRid)
    if (idx1 < 0) {
      console.log("使用 ascii编码", query.rid)
      rid = query.rid.replace("è·¯", "路")
    } else {
      console.log("使用 新编码", decodeRid)
      rid = decodeRid
    }
  } else {
    console.log("使用 旧编码")
    rid = query.rid
  }
  const ipIndex = ipRecord.findIndex(m => m.ip === ip)
  if (ipIndex >= 0) {
    ipRecord[ipIndex].count++
  } else {
    ipRecord.push({ ip, count: 1 })
    const { hotRoutes } = readHotRoutesFile()
    const index = hotRoutes.findIndex(m => m.name === rid)
    if (index >= 0) {
      hotRoutes[index].count ++
    } else {
      hotRoutes.push({ name: rid, count: 1})
    }
    writeHotRoutesFile({hotRoutes})
  }
  writeIpRecordFile({ipRecord})

  ctx.body = PackagingData(stations[rid])
}

exports.getHotKey = async function (ctx) {
  let { hotRoutes } = readHotRoutesFile()
  hotRoutes = _(hotRoutes).sortBy(['count']).reverse().map('name').slice(0, 10).value()
  ctx.body = PackagingData(hotRoutes)
}

exports.search = async function (ctx) {
  const { request } = ctx
  const { query } = request
  const matchRoutes = allLineRoutes.filter(m => {
    return m.indexOf(query.w) >= 0
  })
  ctx.body = PackagingData(matchRoutes)
}
