const Router = require('koa-router')
const prefix = require('../../config')
const busController = require('./bus_controller')
const router = new Router({ prefix })
/**
 * 获取所有舟山公交线路
 * 
 * 暂时无其他参数
 */
router.get('/all_line', busController.getAllLine)
/**
 * 获取热门搜索词
 * 
 * 参数：lineNumber（为 encode 之后的，因为带有中文）
 */
router.get('/hot_key', busController.getHotKey)
/**
 * 获取路线停靠站
 * 
 * 参数：lineNumber（encode）
 * 上下行
 * 
 * 同时新增热度排名
 */
router.get('/line', busController.getLine)

/**
 * 获取实时信息
 * 
 * 参数：lineNumber（encode）
 * 上下行
 */

router.get('/bus_waiting', busController.getBusWaiting)

exports = module.exports = router
