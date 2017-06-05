const glob = require('glob');
const path = require('path');

module.exports.init = function(app) {

    let dirname = __dirname.match(/.*\/(.*)/)[1];
    let reg = new RegExp(dirname + '(\/.*)');

    glob(path.join(__dirname, '@(**|!index.js)/**'), {
        nodir: true
    }, function(err, files) {

        if (err) {
            console.errer('request config glob errer!!!');
            return false
        }

        let logRoutes = files.map((item, i) => {

            let fileDir = item.match(reg)[1];
            let routerMini = require('.' + fileDir);

            if (typeof routerMini.route === 'function') {

                app.use(fileDir.replace(/\.js$/, ''), routerMini);

                return fileDir;

            }

        });

        console.log(logRoutes);

    });

}