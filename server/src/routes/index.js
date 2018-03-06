import Router from 'koa-router';
import controllers from '../controllers';

const router = new Router();

router.get('/', controllers.hello);

export default router;
