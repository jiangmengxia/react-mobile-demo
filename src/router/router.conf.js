/*
 * @Description: 
 * @Author: Ymh
 * @Date: 2019-09-28 10:24:59
 * @LastEditors: Please set LastEditors
 * @LastEditTime: 2019-11-18 17:10:27
 */
import { lazy } from 'react'

export const routes = [
    {
        path: '/home',
        component: lazy(() => import('../views/Home/HomePage')),
    },
    {
        path: '/my',
        component: lazy(() => import('../views/My/MyPage')),
    }
]