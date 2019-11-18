/*
 * @Description: 
 * @LastEditTime: 2019-11-18 18:59:36
 */
import FastClick from 'fastclick'

FastClick.attach(document.body)

// 基准大小
const baseSize = 50
let rootFontSize = 50
let clientWidth = 750

// 设置 rem 函数
const setRem = () => {
  console.log('setRem')
  // 当前页面宽度相对于 750 宽的缩放比例
  clientWidth = document.documentElement.clientWidth
  const scale = clientWidth / 750
  rootFontSize = baseSize * Math.min(scale, 2)
  // 设置页面根节点字体大小
  document.documentElement.style.fontSize = rootFontSize + 'px'
}
// 初始化
setRem()
// 改变窗口大小时重新设置 rem
window.onresize = () => setRem()

export const getRootFontSize = () => rootFontSize

export const getClientWidth = () => clientWidth

// 设计尺寸转实际尺寸 designPx2ScreenPx
export const dpx2spx = designPx => designPx / 50 * rootFontSize
