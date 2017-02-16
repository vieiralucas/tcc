import { push } from 'react-router-redux';

import api from '../api';

export const LOGIN_SUCCESS = 'LOGIN_SUCCESS';
export const loginSuccess = user => ({
  type: LOGIN_SUCCESS,
  user
});

export const LOGIN_FAILURE = 'LOGIN_FAILURE';
export const loginFailure = err => ({
  type: LOGIN_FAILURE,
  err
});

export const LOGIN_USER = 'LOGIN_USER';
export const loginUser = credentials => dispatch => {
  dispatch({
    type: LOGIN_USER
  });

  return api.getSession(credentials)
    .then(user => {
      dispatch(loginSuccess(user));
      dispatch(push('/'));
    })
    .catch(err => {
      dispatch(loginFailure(err.body));
    });
};

export const LOGOUT_USER = 'LOGOUT_USER';
export const logoutUser = () => ({
  type: LOGOUT_USER
});
