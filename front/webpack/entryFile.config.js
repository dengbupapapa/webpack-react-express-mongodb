let path, glob;

path = require("path");
glob = require('glob');

let files, srcDir, pattern, urls, excludeLess;

files = new Array();
srcDir = path.resolve(process.cwd(), 'source');
pattern = srcDir + '/static/less/**';
urls = glob.sync(pattern, {
    nodir: true
});

excludeLess = ['reset'];

urls.forEach(function(item) {

    let matchs = item.match(/static\/less\/(.+)\.(css|less)$/);

    if (!excludeLess.includes(matchs[1])) files.push('./' + matchs[0]);

});

let HtmlWebpackPlugin, arg, javascriptFiles, plugins;

HtmlWebpackPlugin = require('html-webpack-plugin');
arg = require('../arguments.config.js');
javascriptFiles = new Object();
plugins = new Array();

javascriptFiles['vendors'] = [
    'babel-polyfill',
    'react',
    'react-dom',
    'react-router',
    'redux',
    'react-redux',
    'redux-thunk',
    'redux-promise',
    'reselect',
    'immutable',
    'prop-types',
    './static/less/reset.less'
].concat(files);

javascriptFiles['index'] = ['./src/index.js'];

if (arg.env) {

    javascriptFiles['index'].push('webpack-hot-middleware/client?path=/__webpack_hmr&timeout=20000');

}

plugins.push(new HtmlWebpackPlugin({ //html出入口
    filename: './WEB-INF/index.html',
    template: './WEB-INF/index.html',
    inject: 'body',
    minify: {
        removeComments: !arg.env,
        collapseWhitespace: !arg.env,
        minifyJS: !arg.env,
        minifyCSS: !arg.env
    },
    cache: !arg.env
}))

module.exports = {
    javascriptFiles: javascriptFiles,
    plugins: plugins
};