/*
 * @Description: 
 * @Author: 
 * @Date: 2019-10-25 19:24:48
 * @LastEditors: 
 * @LastEditTime: 2019-10-25 23:06:02
 */

import './toast.less'
import Props from 'prop-types'
import { CSSTransition } from 'react-transition-group'
const defaultDuration = 2000
const defaultType = 'info'
export default class Toast extends React.Component {
    static props = {
        content: Props.string,
        modal: Props.bool,
        duration: Props.number,
        type: Props.oneOf['error', 'fail', 'info', 'warn', 'success'],
        white: Props.bool,//white=true时  icon不用展示
    }
    state = {
        visible: true
    }

    componentDidMount() {
        let { duration } = this.props
        duration = duration || defaultDuration
        setTimeout(() => {
            this.setState({ visible: false })
        }, duration)
    }
    render() {
        let { content, modal, type, white } = this.props
        type = type || defaultType
        let id = new Date()
        return (
            <CSSTransition
                unmountOnExit
                classNames="toastTransition"
                timeout={800}
                in={this.state.visible}
            >
                <section className='Toast_container' key={`toast_${id}`}>
                    {modal && <div className='toast-modal'></div>}
                    <div className='toast-box'>
                        {!white && <div className='toast-icon'><span className={`icon-${type} iconfont fz_50`}></span></div>}
                        <div className='content fz_40'>{content}</div>
                    </div>
                </section>
            </CSSTransition>
        )
    }
}


