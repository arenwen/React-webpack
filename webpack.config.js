var webpack = require("webpack");
//var commonsPlugin = new webpack.optimize.CommonsChunkPlugin('common.js');
module.exports = {
    entry: [
        'webpack-dev-server/client?http://127.0.0.1:3001', // WebpackDevServer host and port
        'webpack/hot/only-dev-server',
        './assets/js/entry.js',
    ],
    output: {
        path: __dirname + '/assets/',
        publicPath: "/assets/",
        filename: 'bundle.js'
    },
    resolve: {
        extensions: ['', '.coffee', '.js','.css','.less']
    },
    module: {
        loaders: [
            {
                test: /\.js$/,
                exclude: /node_modules/,
                loader: 'react-hot!jsx-loader?harmony'
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
            },
            {
                test: /\.js?$/,
                exclude: /node_modules/,
                loader: 'babel-loader'
            }
        ]
    },
    plugins: [
        new webpack.HotModuleReplacementPlugin(),
        new webpack.NoErrorsPlugin(),
        //commonsPlugin
        // new webpack.optimize.MinChunkSizePlugin(minSize)
    ],
};