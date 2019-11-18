import {
  all,
  takeEvery,
} from 'redux-saga/effects'
import {
  USER_LOGIN,
  GET_USER_INFO,
} from '../action/user'
import {
  loginUserAsync,
  getUserInfoAsync,
} from './user'

export default function* saga() {
  yield all([
    takeEvery(USER_LOGIN, loginUserAsync),
    takeEvery(GET_USER_INFO, getUserInfoAsync),
  ])
}
