import { LOGIN_USER, LOGIN_SUCCESS, LOGIN_FAILURE, LOGOUT_USER } from '../actions/login';

const fromLocalStorage = () => {
  try {
    return {
      user: JSON.parse(localStorage.getItem('user')),
      err: null,
      isLoading: false
    };
  } catch (e) {
    return {
      user: null,
      err: null,
      isLoading: false
    };
  }
};

const loginReducer = (state = fromLocalStorage(), action) => {
  switch (action.type) {
    case LOGIN_USER:
      return { ...state, isLoading: true };
    case LOGIN_SUCCESS:
      return { isLoading: false, user: action.user };
    case LOGIN_FAILURE:
      return { isLoading: false, user: null, err: action.err };
    case LOGOUT_USER:
      return { ...state, user: null };
    default:
      return state;
  }
};

export default loginReducer;
