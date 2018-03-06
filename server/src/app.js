import Koa from 'koa';
import bodyParser from 'koa-bodyparser';
import router from './routes';
import config from './config';

const app = new Koa();

app.use(bodyParser());

app.use(router.routes());

app.listen(config.port, () => {
  console.log(`listening on port ${config.port}`)
})
