import api from '../api';

export const USECASES_FETCHED = 'USECASES_FETCHED';
export const usecasesFetched = usecases => ({
  type: USECASES_FETCHED,
  usecases
});

export const FETCH_USECASES_ERROR = 'FETCH_USECASES_ERROR';
export const fetchUsecasesError = error => ({
  type: FETCH_USECASES_ERROR,
  error
});

export const FETCH_USECASES = 'FETCH_USECASES';
export const fetchUsecases = projectId => dispatch => {
  dispatch({
    type: FETCH_USECASES
  });

  return api.getUsecasesForProject(projectId)
    .then(usecases => {
      dispatch(usecasesFetched(usecases));
    })
    .catch(err => {
      dispatch(fetchUsecasesError(err));
    });
};

