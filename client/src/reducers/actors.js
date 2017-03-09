import {
  FETCH_ACTORS,
  ACTORS_FETCHED,
  FETCH_ACTORS_ERROR,

  ACTOR_CREATED,

  UPDATING_ACTOR,
  ACTOR_UPDATED,
  UPDATE_ACTOR_ERROR,

  REMOVING_ACTOR,
  ACTOR_REMOVED,
  REMOVE_ACTOR_ERROR
} from '../actions/actors';

const initialState = {
  loading: false,
  list: [],
  error: null
};

const actors = (state = initialState, action) => {
  switch(action.type) {
    case FETCH_ACTORS:
      return { ...state, loading: true };
    case ACTORS_FETCHED:
      return { ...state, loading: false, list: action.actors };
    case FETCH_ACTORS_ERROR:
      return { ...state, loading: false, error: action.error };

    case ACTOR_CREATED:
      return { ...state, list: [...state.list, action.actor] };

    case UPDATING_ACTOR:
      return { ...state, loading: true };
    case ACTOR_UPDATED:
      return {
        ...state,
        loading: false,
        list: state.list.map(u => {
          if (u._id === action.actor._id) {
            return action.actor;
          }

          return u;
        })
      }
    case UPDATE_ACTOR_ERROR:
      return { ...state, loading: false, error: action.error };

    case REMOVING_ACTOR:
      return { ...state, loading: true };
    case ACTOR_REMOVED:
      return {
        ...state,
        loading: false,
        list: state.list.filter(u => u._id !== action.actor._id)
      };
    case REMOVE_ACTOR_ERROR:
      return { ...state, loading: false, error: action.error };

    default:
      return state;
  }
};

export default actors;
