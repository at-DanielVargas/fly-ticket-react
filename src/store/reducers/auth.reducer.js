import { AuthActionTypes } from '../actions/auth.actions';

const initialState = {
  isAuthenticated: false,
  user: null,
  token: null,
  error: null
};

export const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case AuthActionTypes.LOGIN_REQUEST:
      return {
        ...state,
        isAuthenticated: true,
        token: action.payload.accessToken,
        user: action.payload
      };
    case AuthActionTypes.LOGOUT:
      return {
        ...state,
        isAuthenticated: false,
        user: null
      };
    default:
      return state;
  }
};
