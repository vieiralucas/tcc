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
      setTimeout(() => dispatch(projectsFetched(projects)), 1000);
    })
    .catch(err => {
      dispatch(fetchProjectsError(err));
    });
};

export const CREATING_PROJECT = 'CREATING_PROJECT';

export const PROJECT_CREATED = 'PROJECT_CREATED';
export const projectCreated = project => ({
  type: PROJECT_CREATED,
  project
});

export const CREATE_PROJECT_ERROR = 'CREATE_PROJECT_ERROR';
export const createProjectError = err => ({
  type: CREATE_PROJECT_ERROR,
  err
});

export const createProject = (project, user) => dispatch => {
  dispatch({
    type: CREATING_PROJECT
  });

  return api.createProject(project)
    .then(nProject => {
      user.projects.push(nProject._id)

      return api.updateUser(user)
        .then(() => {
          dispatch(projectCreated(nProject));
        });
    })
    .catch(err => {
      dispatch(createProjectError(err));
    });
};
