import projectsReducer from './projects';
import {
  PROJECTS_FETCHED,
  FETCH_PROJECTS_BY_USER,
  FETCH_PROJECTS_ERROR
} from '../actions/projects';

describe('Projects Reducer', () => {
  let prevState = {
    loading: false,
    list: [],
    error: null
  };

  it('should start empty', () => {
    const state = projectsReducer(undefined, { type: '' });

    expect(state).toEqual({
      loading: false,
      list: [],
      error: null
    });
  });

  it('should set loading to true on FETCH_PROJECTS_BY_USER', () => {
    const action = { type: FETCH_PROJECTS_BY_USER };
    const state = projectsReducer(prevState, action);

    expect(state.loading).toBe(true);
  });

  describe('when PROJECTS_FETCHED', () => {
    const action = {
      type: PROJECTS_FETCHED,
      projects: ['p1', 'p2', 'p3']
    };
    prevState = { ...prevState, loading: true };

    it('should set loading to false', () => {
      const state = projectsReducer(prevState, action);

      expect(state.loading).toBe(false);
    });

    it('should set list from action', () => {
      const state = projectsReducer(prevState, action);

      expect(state.list).toEqual(action.projects);
    });
  });

  describe('when FETCH_PROJECTS_ERROR', () => {
    const action = {
      type: FETCH_PROJECTS_ERROR,
      error: new Error('booom!!')
    };
    prevState = {
      ...prevState,
      loading: true,
      list: ['p1', 'p2']
    };

    it('should set error from action', () => {
      const state = projectsReducer(prevState, action);

      expect(state.error).toEqual(action.error);
    });

    it('should set loading to false', () => {
      const state = projectsReducer(prevState, action);

      expect(state.loading).toBe(false);
    });
  });
});
