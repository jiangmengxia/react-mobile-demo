/*
 * @Description: 
 * @Author: Ymh
 * @Date: 2019-09-28 10:05:49
 * @LastEditors: Please set LastEditors
 * @LastEditTime: 2019-11-18 19:02:07
 */

// import 'assets/fonts/common/iconfont.css'
// import './utils/mobile'
import 'assets/less/index.less'

import ReactDOM from 'react-dom'
// import React from 'react'
import Router from './router'
import 'lib-flexible'


// import { dateFormat } from 'utils'
// console.log(dateFormat(new Date(), 'yyyy-MM-dd hh-mm-ss'))

// import { login } from 'services/apis'


//toast 测试

// import { $toast } from 'components/Toast'
// $toast.error('error')

// import { connectWebViewJavascriptBridge } from 'decorators'

// connectWebViewJavascriptBridge((bridge) => {
//     bridge.init((message, responseCallback) => {
//         console.log('JS got a message', message)
//         const data = {
//             'Javascript Responds': '测试中文!',
//         }
//         if (responseCallback) {
//             console.log('JS responding with', data)
//             responseCallback(data)
//         }
//     })

//     bridge.registerHandler('onBack', (data, responseCallback) => {
//         if (history.length > 1) {
//             history.goBack()
//             responseCallback && responseCallback(true)
//         } else {
//             responseCallback && responseCallback(false)
//         }
//     })
// })

ReactDOM.render(
    Router,
    document.getElementById('root')
)