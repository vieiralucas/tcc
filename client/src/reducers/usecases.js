import {
  FETCH_USECASES,
  USECASES_FETCHED,
  FETCH_USECASES_ERROR
} from '../actions/usecases';

const initialState = {
  loading: false,
  list: [],
  error: null
};

const usecases = (state = initialState, action) => {
  switch(action.type) {
    case FETCH_USECASES:
      return { ...state, loading: true };
    case USECASES_FETCHED:
      return { ...state, loading: false, list: action.usecases };
    case FETCH_USECASES_ERROR:
      return { ...state, loading: false, error: action.error };
    default:
      return state;
  }
};

export default usecases;
