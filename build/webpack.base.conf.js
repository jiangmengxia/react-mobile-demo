/*
 * @Description: 
 * @Author: Ymh
 * @Date: 2019-09-28 10:37:00
 * @LastEditors: Please set LastEditors
 * @LastEditTime: 2019-11-18 19:02:53
 */

const path = require('path')
const htmlWebpackPlugin = require('html-webpack-plugin')
const copyWebpackPlugin = require('copy-webpack-plugin')
const fs = require('fs')
const webpack = require('webpack')


function resolve(dir) {
    return path.join(__dirname, '..', dir)
}

/**
 * 所有配置resolve.alias的配置项，目的使得src下第一个目录可以直接通过name去访问
 */
const srcFiles = fs.readdirSync(resolve('src'))
let resolveConfig = {}
srcFiles.forEach((item, key) => {
    resolveConfig[item] = resolve(`src/${item}`)
})


module.exports = {
    // context: path.resolve(__dirname, '../'),
    entry: {
        app: path.join(__dirname, '../src/index.js'),
    },
    output: {
        path: path.join(__dirname, '../dist'),
        filename: 'js/[name].js',
        chunkFilename: 'js/[name][contenthash].js',
    },
    resolve: {
        extensions: ['.js', '.less', '.json'],
        alias: {
            '@': resolve('src'),
            'apis': resolve('src/services/apis'),
            '@ant-design/icons': 'purched-antd-icons',//使antd按需加载
            // '@ant-design/icons/lib/dist$': path.resolve(__dirname, './src/config/icons.js'),
            ...resolveConfig
        }
    },
    module: {
        rules: [
            {
                test: /\.(js|jsx)$/,
                loader: 'babel-loader',
                exclude: /node_modules/,
                // include: [resolve('src'), resolve('node_modules/webpack-dev-server/client')],
                options: {
                    cacheDirectory: true,
                    compact: true,
                }
            },
            // {
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
            // },
            {
                test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
                use: [
                    {
                        loader: 'url-loader',
                        options: {
                            limit: 10000,
                            name: 'img/[name].[hash:7].[ext]'
                        }
                    },
                    // @description: 在typePng压缩80%的基础上又二次压缩了60%,肉眼未看出明显失真。
                    {
                        loader: 'image-webpack-loader',
                        options: {
                            mozjpeg: {
                                progressive: true,
                                quality: 65
                            },
                            // optipng.enabled: false will disable optipng
                            optipng: {
                                enabled: false,
                            },
                            pngquant: {
                                quality: [0.65, 0.90],
                                speed: 4
                            },
                            gifsicle: {
                                interlaced: false,
                            },
                            // the webp option will enable WEBP
                            webp: {
                                quality: 75
                            }
                        }
                    },
                ]
            },
            {
                test: /\.(mp4|webm|ogg|mp3|wav|flac|aac)(\?.*)?$/,
                loader: 'url-loader',
                options: {
                    limit: 10000,
                    name: 'media/[name].[hash:7].[ext]'
                }
            },
            {
                test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/,
                loader: 'url-loader',
                options: {
                    limit: 10000,
                    name: 'fonts/[name].[hash:7].[ext]'
                }
            }
        ]
    },
    plugins: [
        //阻止moment默认将所有语言包加载进来
        new webpack.ContextReplacementPlugin(
            /moment[\\\/]locale$/,
            /^\.\/(zh-cn)$/
        ),
        new htmlWebpackPlugin({
            title: 'Hello World app',
            template: path.join(__dirname, '../index.html'),
            // favicon: './src/assets/images/logo.png',
            minify: { // 压缩HTML文件
                removeComments: true, // 移除HTML中的注释
                collapseWhitespace: true, // 删除空白符与换行符
                minifyCSS: true// 压缩内联css
            },
            inject: true,
        }),
        // new MiniCssExtractPlugin(),
        new webpack.ProvidePlugin({
            React: 'react'
        }),
        new copyWebpackPlugin([{
            from: path.resolve(__dirname, '../src/static'),
            to: path.resolve(__dirname, '../dist/static'),
            ignore: ['.*']
        }]),
    ],
    optimization: {
        splitChunks: {
            chunks: 'all',
            minSize: 0,
            minChunks: 1,
            maxAsyncRequests: 5,
            maxInitialRequests: 3,
            automaticNameDelimiter: '~',
            name: true,
            cacheGroups: {
                commons: {
                    name: 'commons',
                    chunks: 'async',
                    minChunks: 2,
                    reuseExistingChunk: true,
                    priority: 90
                }
            }
        }
    },
}
