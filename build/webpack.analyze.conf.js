/*
 * @Description: 线上发布
 * @Author: Ymh
 * @Date: 2019-09-28 10:36:47
 * @LastEditors: Please set LastEditors
 * @LastEditTime: 2019-11-18 14:25:23
 */
// const path = require('path')
const prodConfig = require('./webpack.prod.conf')
const merge = require('webpack-merge')
// const path = require('path')
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;

module.exports = merge(prodConfig, {
    plugins: [
        new BundleAnalyzerPlugin(
            {
                analyzerMode: 'server',
                analyzerHost: '0.0.0.0',
                analyzerPort: 8999,
                reportFilename: 'report.html',
                defaultSizes: 'parsed',
                openAnalyzer: true,
                generateStatsFile: false,
                statsFilename: 'stats.json',
                statsOptions: null,
                logLevel: 'info'
            }
        ),
    ]
})
