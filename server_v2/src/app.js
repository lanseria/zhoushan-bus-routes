const Koa = require('koa');
const jsonp = require('koa-jsonp');
const router = require('./router');
const config = require('./config');
const { port } = config;

const app = new Koa();

app.proxy = true;

app.use(jsonp());
app.use();

module.exports = app.listen(port, () => {
  console.log(`app is listening at port ${port}\n舟山公交API服务Version_2`)
})
