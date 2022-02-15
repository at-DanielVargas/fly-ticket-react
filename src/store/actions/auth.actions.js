import { AuthService } from '@services'

export const AuthActionTypes = {
  LOGIN_REQUEST: '@auth/LOGIN_REQUEST',
  LOGIN_SUCCESS: '@auth/LOGIN_SUCCESS',
  LOGIN_FAILURE: '@auth/LOGIN_FAILURE',
  LOGOUT: '@auth/LOGOUT',
  REGISTER_REQUEST: '@auth/REGISTER_REQUEST',
  REGISTER_SUCCESS: '@auth/REGISTER_SUCCESS',
  REGISTER_FAILURE: '@auth/REGISTER_FAILURE'
}

const login = ( { email, password } ) => {
  return async dispatch => {
    dispatch( { type: AuthActionTypes.LOGIN_REQUEST } )
    AuthService.login( { email, password } )
      .then( response => {
        dispatch( {
          type: AuthActionTypes.LOGIN_SUCCESS,
          payload: response.data
        } )
      } )
      .catch( error => {
        dispatch( {
          type: AuthActionTypes.LOGIN_FAILURE,
          payload: error.response.data
        } )
      } )
  }
}

const register = ( { user } ) => {
  return async dispatch => {
    dispatch( { type: AuthActionTypes.REGISTER_REQUEST } )
    AuthService.register( { user } )
      .then( response => {
        dispatch( {
          type: AuthActionTypes.REGISTER_SUCCESS,
          payload: response.data
        } )
      } )
      .catch( error => {
        dispatch( {
          type: AuthActionTypes.REGISTER_FAILURE,
          payload: error
        } )
      } )
  }
}

export const AuthActions = {
  login,
  register
}
