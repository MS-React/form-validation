import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import * as authActions from './authActions';
import { AUTH } from '../actions/actionTypes';

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

describe('authActions', () => {
  it('should create an action to start a login request', () => {
    const expectedAction = {
      type: AUTH.LOGIN_BEGIN
    };

    const result = authActions.loginRequest();

    expect(result).toEqual(expectedAction);
  });

  it('should create an action to handle a successfully login', () => {
    const user = {
      name: 'John'
    };

    const expectedAction = {
      type: AUTH.LOGIN_SUCCESS,
      user
    };

    const result = authActions.loginSuccess(user);

    expect(result).toEqual(expectedAction);
  });

  it('should create an action to handle a failed login', () => {
    const message = 'Testing an error.';
    const expectedAction = {
      type: AUTH.LOGIN_FAILED,
      message
    };

    const result = authActions.loginFailed(message);

    expect(result).toEqual(expectedAction);
  });

  it('should handle successful login when valid credentials provided', () => {
    const username = 'username';
    const password = 'password';
    const user = {
      name: 'John'
    };

    const store = mockStore({
      auth: {}
    });

    return store.dispatch(authActions.login({username, password})).then(() => {
      const actions = store.getActions();
      expect(actions[0]).toEqual({ type: AUTH.LOGIN_BEGIN });
      expect(actions[1]).toEqual({ type: AUTH.LOGIN_SUCCESS, user });
    });
  });

  it('should handle failed login when invalid credentials provided', () => {
    const username = 'invalid';
    const password = 'invalid';
    const message = 'Invalid credentials.';
    const store = mockStore({
      auth: {}
    });

    return store.dispatch(authActions.login(username, password)).then(() => {
      const actions = store.getActions();
      expect(actions[0]).toEqual({ type: AUTH.LOGIN_BEGIN });
      expect(actions[1]).toEqual({ type: AUTH.LOGIN_FAILED, message });
    });
  });
});
