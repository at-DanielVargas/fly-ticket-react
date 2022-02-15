import { AuthActionTypes } from '../actions/auth.actions'

import { NETWORK_STATUS } from '@constants'

const initialState = {
  loginRequestStatus: NETWORK_STATUS.IDLE,
  registerRequestStatus: NETWORK_STATUS.IDLE,
  user: null,
  accessToken: null,
  loginError: null,
  registerError: null
}

export const authReducer = ( state = initialState, action ) => {
  switch ( action.type ) {
  case AuthActionTypes.LOGIN_REQUEST:
    return {
      ...state,
      loginRequestStatus: NETWORK_STATUS.LOADING,
      loginError: null
    }
  case AuthActionTypes.LOGIN_SUCCESS:
    return {
      ...state,
      loginRequestStatus: NETWORK_STATUS.IDLE,
      user: action.payload.user,
      accessToken: action.payload.accessToken,
      loginError: null
    }

  case AuthActionTypes.LOGIN_FAILURE:
    return {
      ...state,
      loginRequestStatus: NETWORK_STATUS.IDLE,
      user: null,
      accessToken: null,
      error: action.payload
    }

  case AuthActionTypes.REGISTER_REQUEST:
    return {
      ...state,
      registerRequestStatus: NETWORK_STATUS.LOADING
    }
  case AuthActionTypes.REGISTER_SUCCESS:
    return {
      ...state,
      registerRequestStatus: NETWORK_STATUS.IDLE,
      user: action.payload.user,
      accessToken: action.payload.accessToken,
      registerError: null
    }
  case AuthActionTypes.REGISTER_FAILURE:
    return {
      ...state,
      registerRequestStatus: NETWORK_STATUS.IDLE,
      registerError: action.payload
    }

  case AuthActionTypes.LOGOUT:
    return {
      ...state,
      isAuthenticated: false,
      user: null
    }
  default:
    return state
  }
}
