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
  const ipIndex = ipRecord.findIndex(m => m.ip === ip)
  if (ipIndex >= 0) {
    ipRecord[ipIndex].count++
  } else {
    ipRecord.push({ ip, count: 1 })
    const { hotRoutes } = readHotRoutesFile()
    const index = hotRoutes.findIndex(m => m.name === query.rid)
    if (index >= 0) {
      hotRoutes[index].count ++
    } else {
      hotRoutes.push({ name: query.rid, count: 1})
    }
    writeHotRoutesFile({hotRoutes})
  }
  writeIpRecordFile({ipRecord})

  ctx.body = PackagingData(stations[query.rid])
}

exports.getHotKey = async function (ctx) {
  let { hotRoutes } = readHotRoutesFile()
  hotRoutes = _(hotRoutes).sortBy(['count']).reverse().map('name').value()
  // hotRoutes = _.map(_.reverse(_.sortBy(hotRoutes, ['count'])), 'name')
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
