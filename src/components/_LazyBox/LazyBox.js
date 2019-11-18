/*
 * @Description: 
 * @LastEditTime: 2019-11-18 17:09:04
 */
import React, { Component, Fragment } from 'react'

export class LazyBox extends Component {
    state = {
        // objSrc: '',
        ref: null,
        scrollTop: 0,
        threshold: 100,
        threshold2: 1500,
        maxThreshold: 4000,//超过不用显示
        // visible: true
    }
    componentDidMount() {
        this.setImageState('up')
    }

    componentWillReceiveProps(next) {
        // console.log(next)
        if (this.state.scrollTop !== next.scrollTop) {
            // console.log(prev.scrollTop, next.scrollTop)
            if (this.state.scrollTop < next.scrollTop) {
                this.setImageState('up')
            } else {
                this.setImageState('down')
            }
            this.state.scrollTop = next.scrollTop
            // this.setImageState()
        }
    }

    setImageState(direction) {
        if (!this.state.ref) return
        let windowHeight = document.body.clientHeight
        let ref = this.state.ref
        let { x, y, width, height, left, right, top, bottom } = ref.getBoundingClientRect()
        let { threshold, threshold2 } = this.state
        // if (this.props.index === 3) {
        //     // console.log(ref.getBoundingClientRect())
        // }

        if (top >= - threshold && (top < windowHeight)) {
            this.setState({
                objSrc: this.props.src
            })
        }
        else if (top < 0 && bottom > -threshold) {
            this.setState({
                objSrc: this.props.src
            })
        }
        else {
            //不在视口，自动隐藏src
            if (direction === 'up') {
                if (bottom < threshold2) {
                    this.setState({
                        objSrc: this.props.src
                    })
                    return
                }
            } else {
                if (top < -threshold2) {
                    this.setState({
                        objSrc: this.props.src
                    })
                    return
                }
            }
            this.setState({
                objSrc: null
            })
        }
    }

    onScroll(e) {
        // this.setState({ scrollTop: e.target.scrollTop })
    }
    render() {
        const { style } = this.props
        let { objSrc } = this.state
        return (
            <div className='LazyBox' onScroll={this.onScroll.bind(this)}>
                {this.props.children}
            </div>
        )
    }
}
