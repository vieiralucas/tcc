import api from '../api';

import { LOGIN_USER, LOGIN_SUCCESS, LOGIN_FAILURE, LOGOUT_USER } from '../actions/login';
import { PROJECT_CREATED } from '../actions/projects';

const fromLocalStorage = () => {
  try {
    const user = JSON.parse(localStorage.getItem('user'));
    api.token = user.token;

    return {
      user: user.profile,
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
      return { isLoading: false, user: action.user.profile };
    case LOGIN_FAILURE:
      return { isLoading: false, user: null, err: action.err };
    case LOGOUT_USER:
      return { ...state, user: null };
    case PROJECT_CREATED:
      return {
        ...state,
        user: {
          ...state.user,
          projects: [...state.user.projects, action.project._id]
        }
      };
    default:
      return state;
  }
};

export default loginReducer;
