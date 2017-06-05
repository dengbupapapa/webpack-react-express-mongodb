let path, webpack, arg;

path = require('path');
webpack = require('webpack');
arg = require('../arguments.config.js');

module.exports = {
    // cache: true,
    context: path.join(__dirname, '../source'),
    devtool: arg.env ? 'inline-source-map' : 'source-map', //cheap-source-map
    output: {
        path: path.join(__dirname, '../publish'),
        filename: 'javascript/[name].js' + (!arg.env ? '?[hash]' : ''),
        publicPath: '/',
        chunkFilename: path.join('javascript/chunk/[name].chunk.js') + (!arg.env ? '?[hash]' : '')
    },
    resolve: {
        alias: {
            //src下目录
            'rActions': path.join(__dirname, '../source/src/redux/actions'),
            'rReducers': path.join(__dirname, '../source/src/redux/reducers'),
            'rMiddleware': path.join(__dirname, '../source/src/redux/middleware'),
            'sRoutes': path.join(__dirname, '../source/src/routes'),
            //static下目录
            'jStatic': path.join(__dirname, '../source/static/javascript'),
            'lStatic': path.join(__dirname, '../source/static/less'),
            'iStatic': path.join(__dirname, '../source/static/images'),
            //module下目录
            'useModule': path.join(__dirname, '../source/src/module/use'),
            'widModule': path.join(__dirname, '../source/src/module/widget'),
        },
        extensions: ['', '.js', '.json', '.scss', '.css', '.less'],
    },
    module: {
        //noParse: [],
        loaders: [{
            test: /\.jsx?$/,
            exclude: /node_modules/,
            loader: 'babel',
            query: {
                plugins: []
            }
        }, {
            test: /\.(png|jpg|gif)$/,
            loader: 'url?limit=1000&name=images/[hash].[ext]'
        }, {
            test: /\.css$/,
            exclude: [/node_modules/, path.join(__dirname, '../source/static/less')]
        }, {
            test: /\.less$/,
            exclude: [/node_modules/, path.join(__dirname, '../source/static/less')]
        }, {
            test: /\.css$/,
            include: [/node_modules/, path.join(__dirname, '../source/static/less')]
        }, {
            test: /\.less$/,
            include: [/node_modules/, path.join(__dirname, '../source/static/less')]
        }, {
            test: /\.(eot|woff|ttf|svg)/,
            loader: 'file?name=elseFile/[hash]&prefix=font/'
        }]
    },
    plugins: [
        new webpack.optimize.CommonsChunkPlugin('vendors', path.join('javascript/public/[name].js') + (!arg.env ? '?[hash]' : '')),
        new webpack.DefinePlugin({
            'process.env': {
                NODE_ENV: JSON.stringify(process.env.NODE_ENV)
            }
        }),
        new webpack.ProvidePlugin({
            'React': 'react',
            'PropTypes': 'prop-types'
        })
    ]
};