const Koa = require('koa');
const csrf = require('../../build/main/index');
let app =  new Koa();
app.proxy = true;

app.use(csrf({
  secure: false
}));

app.use(async (ctx, next) => {
  if (ctx.path === '/favicon.ico') {
    return
  }
  console.log('last token is :' + ctx.cookies.get('csrf'))
  console.log('now token is: ' + ctx.createCSRF())
  //ctx.verifyCSRF();
  ctx.body = 'hello you are good'
});

app.listen(12312 , () => {
  console.log(`${new Date()} ===>  listen 12312 ...`);
});
