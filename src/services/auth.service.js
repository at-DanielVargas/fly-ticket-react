import { RestService } from '@services';

const login = ({ email, password }) => {
  return RestService.post('/login', { email, password });
};

const register = ({ user }) => {
  return RestService.post('/register', { user });
};

export const AuthService = {
  login,
  register
};
