export const USER_LOGIN = 'USER_LOGIN'
export const USER_LOGIN_SUCCESS = 'USER_LOGIN_SUCCESS'
export const USER_LOGIN_FAILURE = 'USER_LOGIN_FAILURE'

export const loginAction = (payload) => {
  return {
    type: USER_LOGIN,
    payload,
  }
}

export const loginSuccessAction = (payload) => {
  return {
    type: USER_LOGIN_SUCCESS,
    payload,
  }
}

export const loginFailureAction = (payload) => {
  return {
    type: USER_LOGIN_FAILURE,
    payload,
  }
}

export const GET_USER_INFO = 'GET_USER_INFO'
export const GET_USER_INFO_SUCCESS = 'GET_USER_INFO_SUCCESS'
export const GET_USER_INFO_FAILURE = 'GET_USER_INFO_FAILURE'

export const getUserInfoAction = (payload) => {
  return {
    type: GET_USER_INFO,
    payload,
  }
}

export const getUserInfoSuccessAction = (payload) => {
  return {
    type: GET_USER_INFO_SUCCESS,
    payload,
  }
}

export const getUserInfoFailureAction = (payload) => {
  return {
    type: GET_USER_INFO_FAILURE,
    payload,
  }
}
