import loginReducer from './login';
import { LOGIN_USER, LOGIN_SUCCESS, LOGIN_FAILURE, LOGOUT_USER } from '../actions/login';

describe('Login Reducer', () => {
  beforeEach(() => {
    class LocalStorageMock {
      constructor() {
        this.store = {};
      }

      clear() {
        this.store = {};
      }

      getItem(key) {
        return this.store[key];
      }

      setItem(key, value) {
        this.store[key] = value.toString();
      }
    };

    global.localStorage = new LocalStorageMock;
  });

  afterEach(() => {
    delete global.localStorage;
  });

  it('should return user from localstorage', () => {
    localStorage.setItem('user', JSON.stringify({
      profile: {
        name: 'user',
        email: 'user@user.com'
      },
      token: 'token123'
    }));

    const state = loginReducer(undefined, { type: '' });
    expect(state).toEqual({
      user: {
        name: 'user',
        email: 'user@user.com'
      },
      err: null,
      isLoading: false
    });
  });

  it('should set isLoading to true when LOGIN_USER', () => {
    const state = loginReducer({ user: null, err: null, isLoading: false }, { type: LOGIN_USER });
    expect(state).toEqual({
      user: null,
      err: null,
      isLoading: true
    });
  });

  describe('when LOGIN_SUCCESS', () => {
    const action = {
      type: LOGIN_SUCCESS,
      user: {
        profile: {
          name: 'cool user',
          email: 'cool@user.com'
        },
        token: 'token123'
      }
    };
    const prevState = { user: null, err: null, isLoading: true };

    it('should set user from action', () => {
      const state = loginReducer(prevState, action);

      expect(state.user).toEqual(action.user.profile);
    });

    it('should isLoading to false', () => {
      const state = loginReducer(prevState, action);

      expect(state.isLoading).toBe(false);
    });
  });

  describe('when LOGIN_FAILURE', () => {
    const action = {
      type: LOGIN_FAILURE,
      err: new Error('User not found')
    };
    const prevState = { user: null, err: null, isLoading: true };

    it('should isLoading to false', () => {
      const state = loginReducer(prevState, action);

      expect(state.isLoading).toBe(false);
    });

    it('should set err from action', () => {
      const state = loginReducer(prevState, action);

      expect(state.err).toEqual(action.err);
    });
  });

  it('should set user to null when LOGOUT_USER', () => {
    const action = {
      type: LOGOUT_USER,
      err: new Error('User not found')
    };
    const prevState = { 
      user: {
        name: 'user',
        email: 'user@user.com'
      },
      isLoading: false,
      err: null
    };
    const state = loginReducer(prevState, action);

    expect(state).toEqual({
      user: null,
      isLoading: false,
      err: null
    });
  });
});
