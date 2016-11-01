var path = require('path');
var webpack = require('webpack');
var commonsPlugin = new webpack.optimize.CommonsChunkPlugin('common.js');
var config_option;
if(!process.env.ONLINE){
    config_option = {
        index:[
            'webpack-dev-server/client?http://0.0.0.0:8080',
            'webpack/hot/only-dev-server',
            './entry/index'
        ],
        news:[
            'webpack-dev-server/client?http://0.0.0.0:8080',
            'webpack/hot/only-dev-server',
            './entry/news'
        ],
        destination:[
            'webpack-dev-server/client?http://0.0.0.0:8080',
            'webpack/hot/only-dev-server',
            './entry/destination'
        ],
        social:[
            'webpack-dev-server/client?http://0.0.0.0:8080',
            'webpack/hot/only-dev-server',
            './entry/social'
        ],
        airport_pickup:[
            'webpack-dev-server/client?http://0.0.0.0:8080',
            'webpack/hot/only-dev-server',
            './entry/airport_pickup'
        ],
        stock:[
            'webpack-dev-server/client?http://0.0.0.0:8080',
            'webpack/hot/only-dev-server',
            './entry/stocks'
        ],
        about:[
            'webpack-dev-server/client?http://0.0.0.0:8080',
            'webpack/hot/only-dev-server',
            './entry/about'
        ],
        media:[
            'webpack-dev-server/client?http://0.0.0.0:8080',
            'webpack/hot/only-dev-server',
            './entry/media'
        ],
        game:[
            'webpack-dev-server/client?http://0.0.0.0:8080',
            'webpack/hot/only-dev-server',
            './entry/game'
        ],
        eyesonworld:[
            'webpack-dev-server/client?http://0.0.0.0:8080',
            'webpack/hot/only-dev-server',
            './entry/eyesonworld'
        ],
        ecommerce:[
            'webpack-dev-server/client?http://0.0.0.0:8080',
            'webpack/hot/only-dev-server',
            './entry/ecommerce'
        ]
    }
}else{
    config_option = {
        index: './entry/index',
        news: './entry/news',
        destination: './entry/destination',
        social: './entry/social',
        airport_pickup: './entry/airport_pickup',
        stock: './entry/stocks',
        about: './entry/about',
        media: './entry/media',
        game: './entry/game',
        eyesonworld: './entry/eyesonworld',
        ecommerce: './entry/ecommerce'
    }
}
module.exports = {
    entry:config_option,

    output: {
        path: path.join(__dirname, 'assets'),
        filename: '[name].js',
        publicPath: '/assets/'
    },
    resolve: {
        extensions: ['', '.coffee','.json', '.js','.css','.less','.jpg','.png','.gif']
    },
    plugins: [
        new webpack.optimize.OccurenceOrderPlugin(),
        new webpack.HotModuleReplacementPlugin(),
        new webpack.NoErrorsPlugin(),
        commonsPlugin
        // new webpack.DefinePlugin({
        // __DEVTOOLS__: !!process.env.DEBUG
        // })
    ],
    module: {
        loaders: [
            {
                test: /\.js$/,
                loaders: ['babel'],
                exclude: /node_modules/,
                include: __dirname
            },
            {
                test: /\.less/,
                loader: 'style-loader!css-loader!less-loader'
            },
            {
                test: /\.json/,
                loader: 'json-loader'
            },
            {
                test: /\.(css)$/,
                loader: 'style-loader!css-loader'
            },
            {
                test: /\.(png|jpg)$/,
                loader: 'url-loader?limit=8192'
            }
        ]
    }
}


// When inside Redux repo, prefer src to compiled version.
// You can safely delete these lines in your project.
// var reduxSrc = path.join(__dirname, '..', '..', 'src')
// var reduxNodeModules = path.join(__dirname, '..', '..', 'node_modules')
// var fs = require('fs')
// if (fs.existsSync(reduxSrc) && fs.existsSync(reduxNodeModules)) {
//   // Resolve Redux to source
//   module.exports.resolve = { alias: { 'redux': reduxSrc } }
//   // Compile Redux from source
//   module.exports.module.loaders.push({
//     test: /\.js$/,
//     loaders: ['babel'],
//     include: reduxSrc
//   })
// }
