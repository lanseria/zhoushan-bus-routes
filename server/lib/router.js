const Router = require('koa-router');
const prefix = require('../../config');
const mobileController = require('./controller/mobile');
const router = new Router({ prefix });
/**
 * mobile 页获取关键字搜索路线
 */
router.get('/search', mobileController.search);
/**
 * mobile 页获取热门搜索词
 */
router.get('/getHotKey', mobileController.getHotKey);
/**
 * mobile 页获取路线停靠站
 */
router.get('/detail', mobileController.detail);

router.get('/detail', mobileController.detail);

router.get('/getThisStation', mobileController.getThisStation);

exports = module.exports = router;