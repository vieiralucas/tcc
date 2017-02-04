jest.mock('uuid', () => {
  const mockUuid = {
    v1: jest.fn(() => '1')
  };

  return mockUuid;
});

import {
  UML_COMPONENT_MOVE,
  UML_COMPONENT_NAME_CHANGE,
  UML_COMPONENT_BOUND_UPDATE,
  ADD_COMPONENT
} from '../../../actions/use-case-diagram';

import actorsReducer from './actors';

describe('UseCaseDiagram Components Actors Reducer', () => {
  const prevState = [
    { id: '1234', type: 'actor', name: 'actor 1234', x: 10, y: 10, bound: 'fake bound info' },
    { id: '4321', type: 'actor', name: 'actor 4321', x: 20, y: 20, bound: 'fake bound info' }
  ];

  it('should start with an empty array', () => {
    const state = actorsReducer(undefined, { type: '' });

    expect(state).toEqual([]);
  });

  describe('when UML_COMPONENT_BOUND_UPDATE', () => {
    it('should update bound of actor.id === action.id', () => {
      const action = { type: UML_COMPONENT_BOUND_UPDATE, id: '1234', bound: 'new bound' };
      const state = actorsReducer(prevState, action);

      expect(state).toEqual([
        { id: '1234', type: 'actor', name: 'actor 1234', x: 10, y: 10, bound: 'new bound' },
        { id: '4321', type: 'actor', name: 'actor 4321', x: 20, y: 20, bound: 'fake bound info' }
      ]);
    });
  });

  describe('when UML_COMPONENT_MOVE', () => {
    it('should update (x, y) of moved actor', () => {
      const action = {
        type: UML_COMPONENT_MOVE,
        id: '1234',
        x: 50,
        y: 50
      };

      const state = actorsReducer(prevState, action);

      expect(state).toEqual([
        { id: '1234', type: 'actor', name: 'actor 1234', x: 50, y: 50, bound: 'fake bound info' },
        { id: '4321', type: 'actor', name: 'actor 4321', x: 20, y: 20, bound: 'fake bound info' }
      ]);
    });
  });

  describe('when UML_COMPONENT_NAME_CHANGE', () => {
    it('should update (x, y) of moved actor', () => {
      const action = {
        type: UML_COMPONENT_NAME_CHANGE,
        id: '1234',
        name: 'new name'
      };

      const state = actorsReducer(prevState, action);

      expect(state).toEqual([
        { id: '1234', type: 'actor', name: 'new name', x: 10, y: 10, bound: 'fake bound info' },
        { id: '4321', type: 'actor', name: 'actor 4321', x: 20, y: 20, bound: 'fake bound info' }
      ]);
    });
  });

  describe('when ADD_COMPONENT', () => {
    it('should do nothing if componentType is not actor', () => {
      const action = {
        type: ADD_COMPONENT,
        componentType: 'use-case',
        x: 200,
        y: 200
      };

      const state = actorsReducer(prevState, action);

      expect(state).toEqual([
        { id: '1234', type: 'actor', name: 'actor 1234', x: 10, y: 10, bound: 'fake bound info' },
        { id: '4321', type: 'actor', name: 'actor 4321', x: 20, y: 20, bound: 'fake bound info' }
      ]);
    });

    it('should add new actor', () => {
      const action = {
        type: ADD_COMPONENT,
        componentType: 'actor',
        x: 200,
        y: 200
      };

      const state = actorsReducer(prevState, action);

      expect(state).toEqual([
        { id: '1234', type: 'actor', name: 'actor 1234', x: 10, y: 10, bound: 'fake bound info' },
        { id: '4321', type: 'actor', name: 'actor 4321', x: 20, y: 20, bound: 'fake bound info' },
        { id: '1', type: 'actor', name: 'Actor', x: 200, y: 200 }
      ]);
    });
  });
});

