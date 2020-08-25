const Koa = require("koa");
const path = require("path");
const static = require("koa-static");
const jsonp = require("koa-jsonp");
const router = require("./router");
const config = require("./config");
const { port, root } = config;

const app = new Koa();

app.use(static(path.join(__dirname, root)));

app.proxy = true;

app.use(jsonp());
app.use(router.routes()).use(router.allowedMethods());

module.exports = app.listen(port, () => {
  console.log(`app is listening at port ${port}\n舟山公交API服务Version_2`);
});
