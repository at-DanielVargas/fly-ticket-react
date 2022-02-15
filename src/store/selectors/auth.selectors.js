export const AuthSelectors = {
  selectAuthState: state => ( state.auth.accessToken ? true : false ),
  selectLoginRequestStatus: state => state.auth.loginRequestStatus,
  selectLoginError: state => state.auth.error
}
