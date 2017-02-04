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

import useCasesReducer from './use-cases';

describe('UseCaseDiagram Components UseCases Reducer', () => {
  const prevState = [
    { id: '1234', type: 'use-case', name: 'use-case 1234', x: 10, y: 10, bound: 'fake bound info' },
    { id: '4321', type: 'use-case', name: 'use-case 4321', x: 20, y: 20, bound: 'fake bound info' }
  ];

  it('should start with an empty array', () => {
    const state = useCasesReducer(undefined, { type: '' });

    expect(state).toEqual([]);
  });

  describe('when UML_COMPONENT_BOUND_UPDATE', () => {
    it('should update bound of useCase.id === action.id', () => {
      const action = { type: UML_COMPONENT_BOUND_UPDATE, id: '1234', bound: 'new bound' };
      const state = useCasesReducer(prevState, action);

      expect(state).toEqual([
        { id: '1234', type: 'use-case', name: 'use-case 1234', x: 10, y: 10, bound: 'new bound' },
        { id: '4321', type: 'use-case', name: 'use-case 4321', x: 20, y: 20, bound: 'fake bound info' }
      ]);
    });
  });

  describe('when UML_COMPONENT_MOVE', () => {
    it('should update (x, y) of moved use-case', () => {
      const action = {
        type: UML_COMPONENT_MOVE,
        id: '1234',
        x: 50,
        y: 50
      };

      const state = useCasesReducer(prevState, action);

      expect(state).toEqual([
        { id: '1234', type: 'use-case', name: 'use-case 1234', x: 50, y: 50, bound: 'fake bound info' },
        { id: '4321', type: 'use-case', name: 'use-case 4321', x: 20, y: 20, bound: 'fake bound info' }
      ]);
    });
  });

  describe('when UML_COMPONENT_NAME_CHANGE', () => {
    it('should update (x, y) of moved use-case', () => {
      const action = {
        type: UML_COMPONENT_NAME_CHANGE,
        id: '1234',
        name: 'new name'
      };

      const state = useCasesReducer(prevState, action);

      expect(state).toEqual([
        { id: '1234', type: 'use-case', name: 'new name', x: 10, y: 10, bound: 'fake bound info' },
        { id: '4321', type: 'use-case', name: 'use-case 4321', x: 20, y: 20, bound: 'fake bound info' }
      ]);
    });
  });

  describe('when ADD_COMPONENT', () => {
    it('should do nothing if componentType is not use-case', () => {
      const action = {
        type: ADD_COMPONENT,
        componentType: 'actor',
        x: 200,
        y: 200
      };

      const state = useCasesReducer(prevState, action);

      expect(state).toEqual([
        { id: '1234', type: 'use-case', name: 'use-case 1234', x: 10, y: 10, bound: 'fake bound info' },
        { id: '4321', type: 'use-case', name: 'use-case 4321', x: 20, y: 20, bound: 'fake bound info' }
      ]);
    });

    it('should add new use-case', () => {
      const action = {
        type: ADD_COMPONENT,
        componentType: 'use-case',
        x: 200,
        y: 200
      };

      const state = useCasesReducer(prevState, action);

      expect(state).toEqual([
        { id: '1234', type: 'use-case', name: 'use-case 1234', x: 10, y: 10, bound: 'fake bound info' },
        { id: '4321', type: 'use-case', name: 'use-case 4321', x: 20, y: 20, bound: 'fake bound info' },
        { id: '1', type: 'use-case', name: 'Use Case', x: 200, y: 200 }
      ]);
    });
  });
});

