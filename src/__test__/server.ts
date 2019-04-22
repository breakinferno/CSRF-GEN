import Koa from 'koa';
import csrf from '../index';
import Router from 'koa-router';
import views from 'koa-views';
import path from 'path';
import koaBody from 'koa-body';
const router = new Router();
let app =  new Koa();
app.proxy = true;

app.use(csrf({
  secure: false,
}));

app.use(koaBody());

app.use(views(path.join(__dirname), {
  extension: 'ejs',
}));

router.get('/', async (ctx: Koa.Context) => {
  const csrf =  ctx.createCSRF();
  console.log('last token is :' + ctx.cookies.get('csrf'));
  console.log('now token is: ' + csrf);

  let title = 'hello csrf';
  await ctx.render('index', {
    title,
    CSRF: csrf,
  });
});

router.post('/verify', (ctx: Koa.Context) => {
  let body = ctx.request.body;
  if (ctx.verifyCSRF(body.csrf)) {
    return ctx.body = 'success';
  }
  return ctx.body = 'failed';

});

app.use(router.routes());

const server = app.listen(12312 , () => {
  console.log(`${new Date()} ===>  listen 12312 ...`);
});

export default server;
