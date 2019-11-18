/*
 * @Description: 
 * @Author: 
 * @Date: 2019-10-25 19:42:51
 * @LastEditors: 
 * @LastEditTime: 2019-10-28 14:24:52
 */
import Toast from './toast'

import ReactDom from 'react-dom'

let toastRoot = document.createElement('div')
toastRoot.id = 'toastRoot'
document.body.append(toastRoot)

export const $toast = {
    error: (data) => {
        if (data instanceof String) {
            ReactDom.render(<Toast content={data} white={true} type='error' />, toastRoot)
        }
        else {
            let { content, duration, modal, white } = data
            ReactDom.render(<Toast content={content} white={white} duration={duration} modal={modal} type='error' />, toastRoot)
        }
    },
    info: (data) => {
        if (data instanceof String) {
            ReactDom.render(<Toast content={data} white={true} type='info' />, toastRoot)
        }
        else {
            let { content, duration, modal, white } = data
            ReactDom.render(<Toast content={content} white={white} duration={duration} modal={modal} type='info' />, toastRoot)
        }
    },
    warn: (data) => {
        if (data instanceof String) {
            ReactDom.render(<Toast content={data} white={true} type='warn' />, toastRoot)
        }
        else {
            let { content, duration, modal, white } = data
            ReactDom.render(<Toast content={content} white={white} duration={duration} modal={modal} type='warn' />, toastRoot)
        }
    },
    success: (data) => {
        if (data instanceof String) {
            ReactDom.render(<Toast content={data} white={true} type='success' />, toastRoot)
        }
        else {
            let { content, duration, modal, white } = data
            ReactDom.render(<Toast content={content} white={white} duration={duration} modal={modal} type='success' />, toastRoot)
        }
    },
    fail: (data) => {
        if (data instanceof String) {
            ReactDom.render(<Toast content={data} white={true} type='fail' />, toastRoot)
        }
        else {
            let { content, duration, modal } = data
            ReactDom.render(<Toast content={content} white={white} duration={duration} modal={modal} type='fail' />, toastRoot)
        }
    },
}
