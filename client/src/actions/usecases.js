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

export const CREATING_USECASE = 'CREATING_USECASE';

export const USECASE_CREATED = 'USECASE_CREATED';
export const usecaseCreated = usecase => ({
  type: USECASE_CREATED,
  usecase
});

export const CREATE_USECASE_ERROR = 'CREATE_USECASE_ERROR';
export const createUsecaseError = err => ({
  type: CREATE_USECASE_ERROR,
  err
});

export const createUsecase = usecase => dispatch => {
  dispatch({
    type: CREATING_USECASE
  });

  return api.createUsecase(usecase)
    .then(nUsecase => {
      dispatch(usecaseCreated(nUsecase));
    })
    .catch(err => {
      dispatch(createUsecaseError(err));
    });
};

export const UPDATING_USECASE = 'UPDATING_USECASE';

export const USECASE_UPDATED = 'USECASE_UPDATED';
export const usecaseUpdated = usecase => ({
  type: USECASE_UPDATED,
  usecase
});

export const UPDATE_USECASE_ERROR = 'UPDATE_USECASE_ERROR';
export const updateUsecaseError = err => ({
  type: UPDATE_USECASE_ERROR,
  err
});

export const updateUsecase = (usecase) => dispatch => {
  dispatch({
    type: UPDATING_USECASE
  });

  return api.updateUsecase(usecase)
    .then(nUsecase => {
      dispatch(usecaseUpdated(nUsecase));
    })
    .catch(err => {
      dispatch(updateUsecaseError(err));
    });
};

export const REMOVING_USECASE = 'REMOVING_USECASE';

export const USECASE_REMOVED = 'USECASE_REMOVED';
export const usecaseRemoved = usecase => ({
  type: USECASE_REMOVED,
  usecase
});

export const REMOVE_USECASE_ERROR = 'REMOVE_USECASE_ERROR';
export const removeUsecaseError = err => ({
  type: REMOVE_USECASE_ERROR,
  err
});

export const removeUsecase = (usecase) => dispatch => {
  dispatch({
    type: REMOVING_USECASE
  });

  return api.removeUsecase(usecase)
    .then(() => {
      dispatch(usecaseRemoved(usecase));
    })
    .catch(err => {
      dispatch(removeUsecaseError(err));
    });
};
