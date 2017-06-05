const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const logger = require('morgan');
const middleware = require('./middleware/index.js');
const asyncRequest = require('./request/index.js');
const arg = require('../arguments.config.js');
const useResources = require('../useResources.js');
const proxy = require('express-http-proxy');
const url = require('url');

const apiProxy = proxy(arg.fileServerAddress, { //文件服务器
    proxyReqPathResolver: (req) => url.parse(req.url).path,
});

app.use(logger('dev'));
app.use('/storage', apiProxy);
app.disable('x-powered-by'); //禁用x-powered-by
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: true
}));

middleware.init(app); //middleware

asyncRequest.init(app); //minirouter
if (!arg.env) {
    useResources.init(app);
} //useResources

app.use(function(err, req, res, next) { //errer middleware
    console.log(err);
    res.send(err);
});

module.exports = app;