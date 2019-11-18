import Loading from './index'

let loadingInstance = null

function createLoadingInstance(properties, callback) {
  if (loadingInstance) {
    loadingInstance.destroy()
    loadingInstance = null
  }

  Loading.newInstance(properties, (loading) => {
    loadingInstance = loading
    callback && callback(loading)
  })
}

export default {
  show() {
    return createLoadingInstance()
  },
  hide() {
    if (loadingInstance) {
      loadingInstance.destroy()
      loadingInstance = null
    }
  },
}
