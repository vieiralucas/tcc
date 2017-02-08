import api from '../api';

export const PROJECTS_FETCHED = 'PROJECTS_FETCHED';
const projectsFetched = projects => ({
  type: PROJECTS_FETCHED,
  projects
});

export const FETCH_PROJECTS_ERROR = 'FETCH_PROJECTS_ERROR';
const fetchProjectsError = error => ({
  type: FETCH_PROJECTS_ERROR,
  error
});

export const FETCH_PROJECTS_BY_USER = 'FETCH_PROJECTS_BY_USER';
export const fetchProjectsByUser = user => dispatch => {
  dispatch({
    type: FETCH_PROJECTS_BY_USER
  });

  return api.getProjectsByEmail(user.email)
    .then(projects => {
      dispatch(projectsFetched(projects));
    })
    .catch(err => {
      dispatch(fetchProjectsError(err));
    });
};
