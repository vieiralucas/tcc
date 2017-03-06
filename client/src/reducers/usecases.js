import {
  FETCH_USECASES,
  USECASES_FETCHED,
  FETCH_USECASES_ERROR,

  USECASE_CREATED,

  UPDATING_USECASE,
  USECASE_UPDATED,
  UPDATE_USECASE_ERROR,

  REMOVING_USECASE,
  USECASE_REMOVED,
  REMOVE_USECASE_ERROR
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

    case USECASE_CREATED:
      return { ...state, list: [...state.list, action.usecase] };

    case UPDATING_USECASE:
      return { ...state, loading: true };
    case USECASE_UPDATED:
      return {
        ...state,
        loading: false,
        list: state.list.map(u => {
          if (u._id === action.usecase._id) {
            return action.usecase;
          }

          return u;
        })
      }
    case UPDATE_USECASE_ERROR:
      return { ...state, loading: false, error: action.error };

    case REMOVING_USECASE:
      return { ...state, loading: true };
    case USECASE_REMOVED:
      return {
        ...state,
        loading: false,
        list: state.list.filter(u => u._id !== action.usecase._id)
      };
    case REMOVE_USECASE_ERROR:
      return { ...state, loading: false, error: action.error };

    default:
      return state;
  }
};

export default usecases;
