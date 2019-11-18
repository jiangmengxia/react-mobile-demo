/*
 * @Description: 
 * @Author: Ymh
 * @Date: 2019-09-28 18:42:21
 * @LastEditors: Please set LastEditors
 * @LastEditTime: 2019-10-25 17:48:28
 */


module.exports = {
  presets: [
    ["@babel/env", { modules: false }],
    "@babel/react"
  ],
  plugins: [
    'dynamic-import-webpack',
    ['@babel/plugin-transform-runtime', {
      'absoluteRuntime': false,
      'corejs': false,
      'helpers': true,
      'regenerator': true,
      'useESModules': false,
    }],
    ['@babel/plugin-proposal-decorators', { legacy: true }],
    ['@babel/plugin-proposal-class-properties', { loose: false }],
    // ['import', { libraryName: 'antd-mobile', style: true, libraryDirectory: 'es' }],
    // 'lodash',
  ],
}