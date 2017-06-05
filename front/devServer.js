const express = require('express');
const app = express();
const useResources = require('./useResources.js');
const arg = require('./arguments.config.js');
const proxy = require('express-http-proxy');
const url = require('url');

// const logger = require('morgan');
const apiProxy = proxy('localhost:' + (arg.PORT + 1), {
    proxyReqPathResolver: (req) => url.parse(req.url).path,
});
//app.use(logger('dev'));

useResources.init(app);
app.use(apiProxy);

app.set('port', (arg.PORT || 9000));
app.listen(app.get('port'), function() {
    console.log('Server started: http://localhost:' + app.get('port'));
});