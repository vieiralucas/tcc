import usecasesReducer from './usecases';

import {
  FETCH_USECASES,
  USECASES_FETCHED,
  FETCH_USECASES_ERROR
} from '../actions/usecases';

describe('Usecases Reducer', () => {
  let prevState;

  beforeEach(() => {
    prevState = {
      loading: false,
      list: [],
      error: null
    };
  });

  it('should start empty', () => {
    const state = usecasesReducer(undefined, { type: '' });

    expect(state).toEqual({
      loading: false,
      list: [],
      error: null
    });
  });

  it('should set loading to true on FETCH_USECASES', () => {
    const action = { type: FETCH_USECASES };
    const state = usecasesReducer(prevState, action);

    expect(state).toEqual({
      loading: true,
      list: [],
      error: null
    });
  });

  describe('when USECASES_FETCHED', () => {
    const action = {
      type: USECASES_FETCHED,
      usecases: ['u1', 'u2', 'u3']
    };

    prevState = { ...prevState, loading: true };

    it('should set loading to false', () => {
      const state = usecasesReducer(prevState, action);

      expect(state.loading).toBe(false);
    });

    it('should set list from action', () => {
      const state = usecasesReducer(prevState, action);

      expect(state.list).toEqual(action.usecases);
    });
  });

  describe('when FETCH_USECASES_ERROR', () => {
    const action = {
      type: FETCH_USECASES_ERROR,
      error: new Error('boom!!')
    };
    prevState = {
      ...prevState,
      loading: true,
      list: ['u1', 'u2']
    };

    it('should set error from action', () => {
      const state = usecasesReducer(prevState, action);

      expect(state.error).toEqual(action.error);
    });

    it('should set loading to false', () => {
      const state = usecasesReducer(prevState, action);

      expect(state.loading).toBe(false);
    });
  });
});
