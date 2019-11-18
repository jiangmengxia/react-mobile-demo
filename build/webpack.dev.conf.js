/*
 * @Description:
 * @Author: Ymh
 * @Date: 2019-09-28 10:36:33
 * @LastEditors: Please set LastEditors
 * @LastEditTime: 2019-11-18 19:04:32
 */
const webpackBaseConfig = require('./webpack.base.conf')
const merge = require('webpack-merge')
const webpack = require('webpack')
const path = require('path')
const px2rem = require('postcss-px2rem')


// webpackBaseConfig.module.rules.push({
//     test: /\.(css|less)$/,
//     use: [
//         // {
//         //     loader: MiniCssExtractPlugin.loader
//         // },
//         {
//             loader: 'style-loader'
//         },
//         {
//             loader: 'css-loader',
//         },
//         {
//             loader: 'postcss-loader',
//         },
//         {
//             loader: 'less-loader',
//             options: {
//                 javascriptEnabled: true
//             }
//         },
//     ]
// })

module.exports = merge(webpackBaseConfig, {
    mode: 'development',
    devtool: 'cheap-module-eval-source-map',
    entry: {
        app: path.join(__dirname, '../src/index.js'),
    },
    output: {
        path: path.resolve(__dirname, '../dist'),
        filename: '[name].js',
        chunkFilename: '[name][contenthash].js',
        publicPath: '/'
    },
    module: {
        rules: [
            {
                test: /\.(css|less)$/,
                use: [
                    //会影响css更新时热更新
                    // {
                    //     loader: MiniCssExtractPlugin.loader
                    // },
                    {
                        loader: 'style-loader'
                    },
                    {
                        loader: 'css-loader',
                    },
                    {
                        loader: 'postcss-loader',
                        options: {
                            plugins: [
                                px2rem({ remUnit: 75 })
                            ]
                        }
                    },
                    {
                        loader: 'less-loader',
                        options: {
                            javascriptEnabled: true
                        }
                    },
                ]
            },
        ]
    },
    devServer: {
        contentBase: path.join(__dirname, "../dist"),
        inline: true,
        clientLogLevel: 'warning',
        // historyApiFallback: false,
        //history模式下需要配置
        // historyApiFallback: {
        //     rewrites: [
        //         { from: /.*/, to: path.posix.join('/', 'index.html') },
        //     ],
        // },
        hot: true,
        // contentBase: false, // since we use CopyWebpackPlugin.
        // compress: true,
        host: '0.0.0.0',
        port: 8082,
        open: true,
        overlay: { warnings: false, errors: true },
        // publicPath: '/',
        proxy: {
            '/api': {
                target: 'http://test-schoolmaster.91jzx.cn',
                // target: 'http://test-hera.91jzx.cn',
                // target: 'http://10.0.4.142:15300', //张磊
                // target: 'http://10.0.4.229:15300',//北海
                // target: 'http://10.0.0.15:11100',
                changeOrigin: true,
                pathRewrite: { '^/api': '' },
            },
            // '/api/rest': {
            //     // target: 'http://test-hera.91jzx.cn',
            //     // target: 'http://10.0.4.142:15300', //张磊
            //     // target: 'http://10.0.4.229:15300',//北海
            //     // target: 'http://10.0.0.15:11100',
            //     // target: 'http://10.0.0.227:11710', // 南山
            //     // target: 'http://10.0.0.16:11710', // 开发环境
            //     target: 'http://test-president.91jzx.cn',//测试环境
            //     changeOrigin: true,
            //     pathRewrite: { '^/api': '' },
            // },
        },
        // quiet: true, // necessary for FriendlyErrorsPlugin
        watchOptions: {
            poll: false,
        },
    },
    //配置自带插件--watch的刷新频率
    watchOptions: {
        poll: 1000,//监测修改的时间(ms)
        aggregateTimeout: 500,//防止重复按键，500毫秒内算按一次
        ignored: /node_modules/,//不监测
    },
    plugins: [
        new webpack.HotModuleReplacementPlugin(),
    ]
})
