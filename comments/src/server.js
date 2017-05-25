
const colors = require('colors');
const Koa = require('koa');
const Router = require('koa-router');
const bodyparser = require('koa-bodyparser');
const session = require('koa-session-minimal');
const redisStore = require('koa-redis');
const send = require('koa-send');
const serve = require('koa-static');
const mount = require('koa-mount');
const views = require('koa-views');
const path = require('path');

const { Page, Comment } = require('./models');

const app = new Koa();
const router = new Router();

app.use(require('koa-logger')());
app.use(session({
    store: redisStore()
}));
app.use(bodyparser());

// 中间件
router.use(async (ctx, next) => {
    let page_token = ctx.request.body.page_token;
    if (page_token) {
        let page = await Page.findOne({ token: page_token });
        if (!page) {
            page = new Page();
            page.token = page_token;
            await page.save();
        }
        ctx.state.page = page;
    }
    await next();
});

// 路由
router.post('/comments/comments', async (ctx, next) => {
    ctx.assert(ctx.state.page, 400, 'no token');
    let comments = await Comment.find({page_id: ctx.state.page._id});
    ctx.body = comments.map((x) => {
        return {
            id: x._id,
            page_id: x.page_id,
            reply_comment_id: x.reply_comment_id,
            nickname: x.nickname,
            content: x.content,
            created_date: x.created_date,
        };
    });
});
router.post('/comments/submit_comment', async (ctx, next) => {
    ctx.assert(ctx.state.page, 400, 'no token');
    let comment_content = ctx.request.body.comment_content;
    let comment_nickname = ctx.request.body.comment_nickname;
    let reply_comment_id = ctx.request.body.reply_comment_id;
    let comment = new Comment();
    comment.page_id = ctx.state.page._id;
    comment.content = comment_content;
    comment.nickname = comment_nickname;
    if (reply_comment_id) {
        comment.reply_comment_id = reply_comment_id;
    }
    await comment.save();
    ctx.body = 'OK';
});

app.use(mount(router.routes()));
app.use(mount('/comments', serve(path.join(__dirname, '..', 'views'))));
app.use(mount(serve(path.join(__dirname, '..', '..', 'public'))));

module.exports = app;