import ReactDOM from 'react-dom'
import React, { Component } from 'react'
import PropTypes from 'prop-types'
import './index.less'

export default class Loading extends Component {
  static propTypes = {
    className: PropTypes.string,
  }

  render() {
    const {
      className,
      children,
    } = this.props

    return (
      <div
        className={`loading ${className}`}>
        <svg className="loading__wrapper" viewBox="25 25 50 50">
          <circle
            className="loading__circle"
            cx="50"
            cy="50"
            r="20"
            fill="none"
          />
        </svg>
        {children}
      </div>
    )
  }
}

Loading.newInstance = (properties, callback) => {
  const { getContainer, ...props } = properties || {}
  const div = document.createElement('div')
  if (getContainer) {
    const root = getContainer()
    root.appendChild(div)
  } else {
    document.body.appendChild(div)
  }

  let called = false;
  function ref(loading) {
    if (called) {
      return
    }
    called = true;
    callback({
      component: loading,
      destroy() {
        ReactDOM.unmountComponentAtNode(div)
        div.parentNode.removeChild(div)
      },
    })
  }

  ReactDOM.render(<Loading {...props} ref={ref} />, div)
}
