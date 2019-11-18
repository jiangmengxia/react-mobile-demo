/*
 * @Description: 
 * @Author: Ymh
 * @Date: 2019-09-28 10:27:24
 * @LastEditors: Please set LastEditors
 * @LastEditTime: 2019-11-18 17:22:11
 */
import React, { Component } from 'react'
import { LazyBox } from '../../components/_LazyBox/LazyBox'

const list = [
    'https://ss0.baidu.com/6ONWsjip0QIZ8tyhnq/it/u=77137359,932165256&fm=173&app=49&f=JPEG?w=312&h=208&s=72C427E2460A3157D2F5CC0D030060C3',
    'https://ss1.baidu.com/6ONXsjip0QIZ8tyhnq/it/u=4250843623,617106713&fm=173&app=49&f=JPEG?w=312&h=208&s=92131FC5241203D4468928380300E041',
    'https://ss1.baidu.com/6ONXsjip0QIZ8tyhnq/it/u=3584785147,1402930910&fm=173&app=49&f=JPEG?w=312&h=208&s=5768B9442F173ECC7D49109C0300C0C1',
    'https://ss1.baidu.com/6ONXsjip0QIZ8tyhnq/it/u=1048863553,3608612730&fm=173&app=49&f=JPEG?w=312&h=208&s=14E6D1B6466048B61EB1FAFA0300801D',
]
export default class MyPage extends Component {
    state = {
        scrollTop: 0,
        objList: []
    }
    componentDidMount() {
        // login({}).then(res => { })
        for (let i = 0; i < 20000; i++) {
            this.state.objList.push(
                list[i % 3]
            )
        }
        this.setState({ objList: this.state.objList })
    }

    onScroll(e) {
        // console.log(e.target.scrollTop)
        this.setState({ scrollTop: e.target.scrollTop })
    }
    render() {
        return (
            <LazyBox className='Home_container' style={{ height: '100%', overflow: 'scroll' }} onScroll={this.onScroll.bind(this)}>
                <h1>测试lazyBox,不在视口内图片不显示，在视口内才显示</h1>
                {this.state.objList.map((img, index) => {
                    return <img key={index}
                        // index={index}
                        // scrollTop={this.state.scrollTop}
                        src={img}
                        style={{ width: '100%', height: 600 }} />
                })}
            </LazyBox>
        )
    }
}
