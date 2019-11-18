
import React, { useEffect } from 'react'

export const isJzxDevice = /jzx-android/.test(window.navigator.userAgent)

/* connectJsBridge的使用方法
  @connectJsBridge({
    title: '', // webview标题
    showTitle: true, // 申明是否展示原生导航栏
    actions: ['setTitle', 'goHome'], // 申明要调用的原生方法
  })
  class Demo extends Component {
    componentDidMount() {
      this.props.jsBridge.setTitle('我是标题')

      // 添加物理返回按键事件监听
      this.props.jsBridge.listen('onBack', (data, responseCallback) => {
        this.props.history.goBack()
        responseCallback && responseCallback(true)
      })
    }

    render() {
      return <div onClick={this.props.jsBridge.goHome}>goHome</div>
    }
  }
 */

/**
 * 可调用方法(action)：
 * getUser, goHome, login, setTitle, setLeftText, setRightText,
 * close, netWorkState, showTitle, hideTitle, setStatusBarColor,
 * goClassManage,
 */

export const connectJsBridge = ({
  title = '',
  showTitle = false,
  actions = [],
  debug = false,
}) => {
  let hasHandlerQueueFirstRuned = false
  let handlerQueue = [
    // 预设设置标题
    (bridge) => {
      debug && console.log('setTitle', title)
      bridge.callHandler('setTitle', title)
    },
    // 设置标题是否展示
    showTitle
      ? (bridge) => {
        debug && console.log('showTitle')
        bridge.callHandler('showTitle')
      }
      : (bridge) => {
        debug && console.log('hideTitle')
        bridge.callHandler('hideTitle')
      },
  ]
  const jsBridgeAddHandler = (handler) => {
    handlerQueue.push(handler)
    if (hasHandlerQueueFirstRuned) {
      jsBridgeHandlerEmiter()
    }
  }
  const jsBridgeHandlerEmiter = () => {
    handlerQueue.map((callHandler) => callHandler(window.WebViewJavascriptBridge))
    handlerQueue = []
    hasHandlerQueueFirstRuned = true
  }
  const callHandlerActions = actions.reduce((result, actionName) => {
    if (actionName) {
      result[actionName] = (params = '') => jsBridgeAddHandler((bridge) => {
        debug && console.log(actionName, params)
        return new Promise(res => bridge.callHandler(actionName, params, responseData => res(responseData)))
      })
    }
    return result
  }, {})
  return WrappedComponent => {
    function connectJsBridgeDecorator(props) {
      useEffect(() => {
        if (window.WebViewJavascriptBridge) {
          jsBridgeHandlerEmiter()
        } else {
          document.addEventListener(
            'WebViewJavascriptBridgeReady',
            jsBridgeHandlerEmiter,
            false
          )
        }
        return () => {
          document.removeEventListener(
            'WebViewJavascriptBridgeReady',
            jsBridgeHandlerEmiter,
            false
          )
        }
      })
      return <WrappedComponent
        {...props}
        jsBridge={{
          ...callHandlerActions,
          listen(eventType, handle) {
            jsBridgeAddHandler((bridge) => {
              bridge.registerHandler(eventType, (...args) => {
                console.log(eventType, ...args)
                handle(...args)
              })
            })
          },
        }}
      />
    }
    return connectJsBridgeDecorator
  }
}

export default function connectWebViewJavascriptBridge(callback) {
  const jsBridgeHandle = () => {
    callback(window.WebViewJavascriptBridge)
  }
  if (window.WebViewJavascriptBridge) {
    jsBridgeHandle()
  } else {
    document.addEventListener(
      'WebViewJavascriptBridgeReady',
      jsBridgeHandle,
      false
    )
  }
  return () => document.removeEventListener('WebViewJavascriptBridgeReady', jsBridgeHandle, false)
}
