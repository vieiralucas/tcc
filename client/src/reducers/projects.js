import {
  PROJECTS_FETCHED,
  FETCH_PROJECTS_BY_USER,
  FETCH_PROJECTS_ERROR,
  PROJECT_CREATED
} from '../actions/projects';

const initialState = {
  list: [],
  loading: false,
  error: null
};

const projects = (state = initialState, action) => {
  switch (action.type) {
  case FETCH_PROJECTS_BY_USER:
    return { list: [], loading: true, error: null };
  case PROJECTS_FETCHED:
    return { list: action.projects, loading: false, error: null };
  case FETCH_PROJECTS_ERROR:
    return { list: [], loading: false, error: action.error };
  case PROJECT_CREATED:
    return { ...state, list: [...state.list, action.project ]};
  default:
    return state;
  }
};

export default projects;
