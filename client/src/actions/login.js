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

  const config = {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(credentials)
  };
  return fetch('api/sessions', config)
    .then(response => {
      return response.json()
        .then(body => {
          if (!response.ok) {
            throw new Error(body.reason);
          }

          return body;
        });
    })
    .then(user => {
      localStorage.setItem('user', JSON.stringify(user));
      dispatch(loginSuccess(user));
    })
    .catch(err => {
      dispatch(loginFailure(err));
    });
};

export const LOGOUT_USER = 'LOGOUT_USER';
export const logoutUser = () => ({
  type: LOGOUT_USER
});
