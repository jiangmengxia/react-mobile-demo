/*
 * @Description: 
 * @Author: 
 * @Date: 2019-10-24 19:04:57
 * @LastEditors: 
 * @LastEditTime: 2019-10-28 15:10:34
 */
import axios from 'axios'
import { Toast } from 'antd-mobile'
import { generateUUID } from 'utils'
import history from 'router/history'
import _ from 'lodash'
import Loading from 'components/loading/loading';
import connectWebViewJavascriptBridge from 'decorators/jsBridge'
// import { setLocalStorage, getLocalStorage } from 'utils/userInfo';
import { androidStorage } from "utils"

const whiteList = ['class_not_start']
let needLoadingRequestCount = 0
let requestQueue = []

// 参考 https://www.cnblogs.com/chenhuichao/p/9566262.html
function showFullScreenLoading() {
  if (needLoadingRequestCount === 0) {
    Loading.show()
  }
  needLoadingRequestCount++
}

function hideFullScreenLoading() {
  if (needLoadingRequestCount <= 0) return;
  needLoadingRequestCount--
  if (needLoadingRequestCount === 0) {
    _.debounce(() => Loading.hide(), 300)()
  }
}

function addRequestQueue(req) {
  if (req.reTry) return
  requestQueue.push(Object.assign(req, {
    id: generateUUID(),
  }))
}

function removeRequestQueue(req) {
  requestQueue = requestQueue.filter((item) => item.id !== req.id)
}

const instance = axios.create({
  // 开发环境设置/api配合webpack proxy解决跨域
  baseURL: process.env.NODE_ENV === 'development' ? '/api' : '',
  timeout: 15000,
  headers: {},
})

instance.all = axios.all;
instance.spread = axios.spread;

/**
 * 判断当前时间和存储的时间是不是同一天。
 * @param time
 * @returns {boolean}
 */
function checkIsSameDay(time) {
  return new Date(time).toDateString() === new Date().toDateString();
  // return Date.now() - time < 1000 * 60;
}

/**
 * 判断是否需要跳转首页
 */
function checkoutNeedToHome() {
  // let lastTime = getLocalStorage('lastTime');
  let lastTime = androidStorage.getItem('lastTime')
  const now = Date.now();
  if (!lastTime) {
    // setLocalStorage('lastTime', now);
    androidStorage.setItem('lastTime', now)
    lastTime = now;
  }

  const isSameDay = checkIsSameDay(lastTime);
  if (!isSameDay) {
    // setLocalStorage('lastTime', now);
    androidStorage.setItem('lastTime', now)
    connectWebViewJavascriptBridge((bridge) => {
      bridge.callHandler('goHome')
    })
  }
}

instance.interceptors.request.use((config) => {

  checkoutNeedToHome();

  if (config.showLoading) {
    showFullScreenLoading()
  }
  addRequestQueue(config)
  // if (process.env.PROXY === 'true') {
  //   config.url = `/api${config.url}`
  // }
  const user = JSON.parse(androidStorage.getItem('userInfo') || null)
  const t = Date.now()

  // 仅用于190911测试
  // config.headers['ACCESS-TOKEN'] = ''//'x4+4O205HtdDq2qWh8K7LuEoiLH7FebRgb+GIJSg2JAjF0hQQZmm1DbxNDbrXu4ytlnrm4AAZI16PV7GHHl9lw==';

  if (user) {
    config.headers['ACCESS-TOKEN'] = user.token;
    config.headers['ACCESS-USER'] = user.username;
    config.headers['ACCESS-TIMESTAMP'] = user.timestamp;
  }
  const token = config.params
    ? config.params.token
    : config.data
      ? config.data.token
      : null
  if (token) {

    config.headers['ACCESS-TOKEN'] = token;
  }
  if (config.method === 'get') {
    config.params = config.params || {}
    Object.assign(config.params, {
      t,
    })
  } else {
    if (config.headers['Content-Type'] === 'multipart/form-data') {
      config.data.append('t', t)
    } else {
      config.data = config.data || {}
      Object.assign(config.data, {
        t,
      })
    }
  }
  return config
})

instance.interceptors.response.use((response) => {
  if (response.config.showLoading) {
    hideFullScreenLoading()
  }
  removeRequestQueue(response.config);
  const data = response.data || {};
  data.ok = data.code === '00000';
  data.ok || whiteList.includes(data.code) || Toast.info(data.msg, 3, null, false)
  /**
   * 上课状态异常，直接跳转安卓首页
   */
  if (data.code === 'EL999') {
    connectWebViewJavascriptBridge((bridge) => {
      bridge.callHandler('goHome')
    })
  }
  return data
}, (error) => {
  if (error.config && error.config.showLoading) {
    hideFullScreenLoading()
  }

  if (error.message.indexOf('timeout') > -1) {
    console.warn('请求失败');
    // Refresh.show({
    //   onRefresh: () => {
    //     Refresh.hide()
    //     window.location.reload()
    //   },
    // })
    // // 参考 https://www.cnblogs.com/ljx20180807/p/9921347.html
    // let backoff = new Promise(resolve => {
    //   Refresh.show({
    //     onRefresh: () => {
    //       Refresh.hide()
    //       resolve()
    //     }
    //   })
    // })

    //   // 只能重发第一个超时的请求
    //   for (let i = 0; i < requestQueue.length; i++) {
    //     const item = requestQueue[i]
    //     return instance(Object.assign(item, {
    //       url: item.url.indexOf(baseURL) > -1
    //           ? item.url.slice(baseURL.length)
    //           : item.url,
    //       reTry: true,
    //     }))
    //   }
    // })
  }

  if (error.response) {
    const errorData = {
      code: error.response.status,
      ok: false,
      data: {},
      msg: '系统繁忙，刷新下再试试呗',
    }
    if (errorData.code === 403) {
      androidStorage.clear()
      history.push('/login')
      return Promise.resolve(errorData)
    }
    // http错误 弹出提示
    Toast.info(errorData.msg, 3, null, false)
    return Promise.resolve(errorData)
  }
  console.log(error)
  return Promise.resolve({
    ok: false,
    data: {},
    msg: '',
    code: error.message,
  })
})

export default instance
