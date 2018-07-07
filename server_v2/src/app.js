const Koa = require('koa');
const jsonp = require('koa-jsonp');
const mongoose = require('mongoose');
const router = require('./router');
const config = require('./config');
const {
  port
} = config;

const app = new Koa();
const db = mongoose.connection;

app.proxy = true;

app.use(jsonp());
app.use(router.routes()).use(router.allowedMethods());


mongoose.connect('mongodb://localhost:27017/test', {
  useNewUrlParser: true
});
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function () {
  console.log('mongodb has been connected!');
})

module.exports = app.listen(port, () => {
  console.log(`app is listening at port ${port}\n舟山公交API服务Version_2`)
})