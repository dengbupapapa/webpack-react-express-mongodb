const app = require('./node/app');
const arg = require('./arguments.config.js');

app.set('port', arg.PORT + 1 || 8080);
app.listen(app.get('port'), function() {
    if (!arg.env) {
        console.log('Server started: http://localhost:' + app.get('port'));
    }
});