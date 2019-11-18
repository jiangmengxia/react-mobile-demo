/*
 * @Description: 
 * @LastEditTime: 2019-11-18 17:41:13
 */
import React, { Component } from 'react'
import './ThemeCard.less'

export default function (props) {
    let { className, style } = props
    return (
        <div className={`ThemeCard className`}
            style={style}
        >
            <div className='circle top'></div>
            <div className='circle left'></div>
            <div className='circle bottom'></div>
        </div>
    )
}
