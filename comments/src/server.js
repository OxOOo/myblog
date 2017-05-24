
const colors = require('colors');
const Koa = require('koa');
const Router = require('koa-router');
const bodyParser = require('koa-bodyparser');
const session = require('koa-session-minimal');
const redisStore = require('koa-redis');
const send = require('koa-send');
const serve = require('koa-static');
const mount = require('koa-mount');
const views = require('koa-views');
const path = require('path');

const app = new Koa();
const router = new Router();

app.use(require('koa-logger')());
app.use(session({
    store: redisStore()
}));
app.use(bodyParser());
app.use(views(__dirname + '/../views', {
    map: {
        html: 'ejs'
    }
}));

// 路由



app.use(mount(router.routes()));
app.use(mount(serve(path.join(__dirname, '..', '..', 'public'))));

module.exports = app;