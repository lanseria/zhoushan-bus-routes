const lineRoutes = require('../tasks/line-routes.json')
const stations = require('../tasks/stations.json')
// const { convertJsonp, FixJsonp } = require('../utils/jsonpTools')
const { allLineRoutes } = lineRoutes

exports.lyric = async function (ctx) {
  const { request } = ctx
  ctx.body = await convertJsonp(request, urls.LYRIC)
}

exports.getHotKey = async function (ctx) {
  const hotRoutes = ['A56路']
  ctx.body = JSON.stringify(hotRoutes)
}

exports.search = async function (ctx) {
  const { request } = ctx
  const { query } = request
  const matchRoutes = allLineRoutes.filter(m => {
    m.indexOf(query.w) >= 0
  })
  console.log(matchRoutes)
  ctx.body = JSON.stringify(matchRoutes)
}
