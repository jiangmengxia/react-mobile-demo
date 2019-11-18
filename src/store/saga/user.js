import {
  put,
  call,
} from 'redux-saga/effects'
import {
  loginSuccessAction,
  loginFailureAction,
  getUserInfoSuccessAction,
  getUserInfoFailureAction,
} from '../action/user'
import history from 'src/history'
import * as api from 'services'
import { setUserInfo, clearUserInfo } from 'utils/userInfo'

export function* loginUserAsync({ payload }) {
  const res = yield call(api.login, payload)
  if (res.ok) {
    yield put(loginSuccessAction(res.data))
    setUserInfo(res.data)
    history.push('/home')
  } else {
    yield put(loginFailureAction(res.msg))
    clearUserInfo()
  }
  return res
}

export function* getUserInfoAsync({ payload }) {
  const res = yield call(api.getUserInfo, payload)
  if (res.ok) {
    yield put(getUserInfoSuccessAction(res.data))
  } else {
    yield put(getUserInfoFailureAction(res.msg))
  }
  return res
}
