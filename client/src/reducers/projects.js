import {
  PROJECTS_FETCHED,
  FETCH_PROJECTS_BY_USER,
  FETCH_PROJECTS_ERROR
} from '../actions/projects';

const initialState = {
  list: [],
  loading: false,
  error: null
};

const projects = (state, action) => {
  switch (action.type) {
  case FETCH_PROJECTS_BY_USER:
    return { ...state, loading: true };
  case PROJECTS_FETCHED:
    return { ...state, list: action.projects, loading: false };
  case FETCH_PROJECTS_ERROR:
    return { ...state, loading: false, error: action.error };
  default:
    return initialState;
  }
};

export default projects;
