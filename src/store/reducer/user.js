import Immutable from 'immutable'
import {
  USER_LOGIN_SUCCESS,
  USER_LOGIN_FAILURE,
  GET_USER_INFO_SUCCESS,
  GET_USER_INFO_FAILURE,
} from '../action/user'

const initialState = Immutable.fromJS({
  success: null,
  error: null,
})

export const user = (state = initialState, action = {}) => {
  switch (action.type) {
    case USER_LOGIN_SUCCESS:
    case GET_USER_INFO_SUCCESS:
      return state.set('success', action.payload)
    case USER_LOGIN_FAILURE:
    case GET_USER_INFO_FAILURE:
      return state.set('error', action.payload)
    default:
      return state
  }
};
