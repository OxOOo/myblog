const path = require('path');
const http = require('http');
const fs = require('fs');
const log4js = require('log4js');

// 运行版本
let env_test = exports.env_test = process.env.NODE_ENV == 'test';
let env_production = exports.env_production = process.env.NODE_ENV == 'production';
let env_development = exports.env_development = !env_test && !env_production;

// 日志相关
log4js.configure({
	appenders: [
		{ type: 'console' }
	]
});
const Log = exports.Log = log4js.getLogger();

// 数据库相关
const DB = exports.DB = {
	HOSTNAME: "127.0.0.1",
	DATABASE: env_production ? "blog_comments" : "blog_comments_test"
};
