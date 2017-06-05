const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const logger = require('morgan');
const middleware = require('./middleware/index.js');
const asyncRequest = require('./request/index.js');

app.use(logger('dev'));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: true
}));

middleware.init(app); //middleware

asyncRequest.init(app); //minirouter

app.use(function(err, req, res, next) { //errer middleware
    console.log(err);
    res.send(err);
});

module.exports = app;