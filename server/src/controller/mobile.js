const lineRoutes = require('../tasks/line_routes.json')
const stations = require('../tasks/stations.json')
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
  const { query } = request
  ctx.body = PackagingData(stations[query.rid])
}

exports.getHotKey = async function (ctx) {
  // TODO 现在只是测试
  const hotRoutes = ['A56路']
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
