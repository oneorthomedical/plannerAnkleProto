const path = require('path');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');
const dev = process.env.NODE_ENV  === "dev";

let config = {
    entry: {
        home : './assets/js/home.js',
        planification : './assets/js/app.js'
    },
    watch: dev,
    devtool: dev ? "cheap-module-eval-source-map" : "source-map",
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: '[name].js',
        publicPath: "/assets/"
    },
    module: {
        rules: [
            {
                test : /\.js$/,
                exclude: /(node_modules|bower_components)/,
                use: ['babel-loader']
            },
            {
                test :/\.css$/,
                use : ['style-loader', 'css-loader']
            }
        ],
    },
    resolve: {
        extensions: [".js",".json"]
    },
    plugins: [
    ],
    devServer: {
        contentBase: path.resolve(__dirname, "./dist"),
        historyApiFallback: true,
        inline: true,
        open: true,
        hot: true
    }
};
if(!dev){
    config.plugins.push(new UglifyJsPlugin(
        {
            sourceMap: true
        }
    ));
}
module.exports = config;
