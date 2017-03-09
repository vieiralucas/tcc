import api from '../api';

export const ACTORS_FETCHED = 'ACTORS_FETCHED';
export const actorsFetched = actors => ({
  type: ACTORS_FETCHED,
  actors
});

export const FETCH_ACTORS_ERROR = 'FETCH_ACTORS_ERROR';
export const fetchActorsError = error => ({
  type: FETCH_ACTORS_ERROR,
  error
});

export const FETCH_ACTORS = 'FETCH_ACTORS';
export const fetchActors = projectId => dispatch => {
  dispatch({
    type: FETCH_ACTORS
  });

  return api.getActorsForProject(projectId)
    .then(actors => {
      dispatch(actorsFetched(actors));
    })
    .catch(err => {
      dispatch(fetchActorsError(err));
    });
};

export const CREATING_ACTOR = 'CREATING_ACTOR';

export const ACTOR_CREATED = 'ACTOR_CREATED';
export const actorCreated = actor => ({
  type: ACTOR_CREATED,
  actor
});

export const CREATE_ACTOR_ERROR = 'CREATE_ACTOR_ERROR';
export const createActorError = err => ({
  type: CREATE_ACTOR_ERROR,
  err
});

export const createActor = actor => dispatch => {
  dispatch({
    type: CREATING_ACTOR
  });

  return api.createActor(actor)
    .then(nActor => {
      dispatch(actorCreated(nActor));
    })
    .catch(err => {
      dispatch(createActorError(err));
    });
};

export const UPDATING_ACTOR = 'UPDATING_ACTOR';

export const ACTOR_UPDATED = 'ACTOR_UPDATED';
export const actorUpdated = actor => ({
  type: ACTOR_UPDATED,
  actor
});

export const UPDATE_ACTOR_ERROR = 'UPDATE_ACTOR_ERROR';
export const updateActorError = err => ({
  type: UPDATE_ACTOR_ERROR,
  err
});

export const updateActor = (actor) => dispatch => {
  dispatch({
    type: UPDATING_ACTOR
  });

  return api.updateActor(actor)
    .then(nActor => {
      dispatch(actorUpdated(nActor));
    })
    .catch(err => {
      dispatch(updateActorError(err));
    });
};

export const REMOVING_ACTOR = 'REMOVING_ACTOR';

export const ACTOR_REMOVED = 'ACTOR_REMOVED';
export const actorRemoved = actor => ({
  type: ACTOR_REMOVED,
  actor
});

export const REMOVE_ACTOR_ERROR = 'REMOVE_ACTOR_ERROR';
export const removeActorError = err => ({
  type: REMOVE_ACTOR_ERROR,
  err
});

export const removeActor = (actor) => dispatch => {
  dispatch({
    type: REMOVING_ACTOR
  });

  return api.removeActor(actor)
    .then(() => {
      dispatch(actorRemoved(actor));
    })
    .catch(err => {
      dispatch(removeActorError(err));
    });
};
