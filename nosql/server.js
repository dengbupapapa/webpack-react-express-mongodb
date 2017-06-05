const app = require('./receive/app.js');
const arg = require('./arguments.config.js')

app.set('port', arg.POST);
app.listen(app.get('port'), () => {
    console.log('Server started: http://localhost:' + app.get('port'));
})