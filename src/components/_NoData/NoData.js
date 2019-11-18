/*
 * @Description: 
 * @Author: 
 * @Date: 2019-10-28 08:51:49
 * @LastEditors: 
 * @LastEditTime: 2019-10-28 08:51:52
 */
/**
 * @Description:
 * @Author: Ymh
 * @Date: 2019-09-20 10:48:42
 * @LastEditors: Ymh
 * @LastEditTime: 2019-09-20 16:08:58
 */
import React, { Component } from 'react'
import PropTypes from 'prop-types'
import './NoData.less'
import TM_nodata from 'public/TM_nodata.png'

export default class NoData extends Component {
    static propTypes = {
        text: PropTypes.string, // 提示信息
    }
    render() {
        const { text } = this.props
        return <div className='no-data flex_row flex_center flex_space-around bgc_ff flex_full'
        >
            <div>
                <img src={ TM_nodata } className='img-nodata' />
                <div className='c_b0 fz_28 ta_center mb_20'>{text}</div>
            </div>
        </div>
    }
}