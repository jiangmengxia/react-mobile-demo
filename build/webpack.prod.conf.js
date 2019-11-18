/*
 * @Description: 
 * @Author: Ymh
 * @Date: 2019-09-28 10:36:47
 * @LastEditors: Please set LastEditors
 * @LastEditTime: 2019-11-18 14:24:31
 */
// const path = require('path')
const baseConfig = require('./webpack.base.conf')
const merge = require('webpack-merge')
const scriptExtHtmlWebpackPlugin = require('script-ext-html-webpack-plugin')
const webpack = require('webpack')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const optimizeCss = require('optimize-css-assets-webpack-plugin');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');

module.exports = merge(baseConfig, {
    mode: 'production',
    module: {
        rules: [
            {
                test: /\.(css|less)$/,
                use: [
                    {
                        loader: MiniCssExtractPlugin.loader
                    },
                    // {
                    //     loader: 'style-loader'
                    // },
                    {
                        loader: 'css-loader',
                    },
                    {
                        loader: 'postcss-loader',
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
    plugins: [
        //css压缩，去除无用comments
        new optimizeCss({
            assetNameRegExp: /\.style\.css$/g,
            cssProcessor: require('cssnano'),
            cssProcessorOptions: { discardComments: { removeAll: true } },
            canPrint: true
        }),
        new UglifyJsPlugin({
            uglifyOptions: {
                warnings: false,
                parse: {},
                compress: {},
                mangle: true, // Note `mangle.properties` is `false` by default.
                output: null,
                toplevel: false,
                nameCache: null,
                ie8: false,
                keep_fnames: false,
                cache: false,   //是否启用文件缓存，默认缓存在node_modules/.cache/uglifyjs-webpack-plugin.目录
                parallel: true,  //使用多进程并行运行来提高构建速度
            },
        }),
        new MiniCssExtractPlugin({
            // filename: 'css/[name].css',
            // chunkFilename: 'css/[id].css',
        }),
        new webpack.NamedChunksPlugin(),
        new webpack.NoEmitOnErrorsPlugin(),
        new scriptExtHtmlWebpackPlugin({  // 给script标签加上defer
            defaultAttribute: 'defer'
        }),
    ],
    optimization: {
        minimizer: [
            new optimizeCss(),
            new UglifyJsPlugin({
                uglifyOptions: {
                    warnings: false,
                    parse: {},
                    compress: {},
                    mangle: true, // Note `mangle.properties` is `false` by default.
                    output: null,
                    toplevel: false,
                    nameCache: null,
                    ie8: false,
                    keep_fnames: false,
                    cache: false,   //是否启用文件缓存，默认缓存在node_modules/.cache/uglifyjs-webpack-plugin.目录
                    parallel: true,  //使用多进程并行运行来提高构建速度
                },
            }),
        ],
        /**
         * 提取webpack运行时的代码
         */
        runtimeChunk: {
            name: 'manifest',
        },
        // splitChunks: {
        //     chunks: 'all',
        //     minSize: 0,
        //     minChunks: 1,
        //     maxAsyncRequests: 5,
        //     maxInitialRequests: 3,
        //     automaticNameDelimiter: '~',
        //     name: true,
        //     cacheGroups: {}
        // }
    }
})
