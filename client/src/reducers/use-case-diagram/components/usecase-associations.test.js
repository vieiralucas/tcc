jest.mock('uuid', () => {
  const mockUuid = {
    v1: jest.fn(() => '1')
  };

  return mockUuid;
});

import {
  ADD_USE_CASE_ASSOCIATION,
  TOGGLE_USE_CASE_ASSOCIATION_TYPE,
  UML_COMPONENT_BOUND_UPDATE,
  UML_COMPONENT_DELETE,
  UML_COMPONENT_MOVE
} from '../../../actions/use-case-diagram';

import useCaseAssociationsReducer from './usecase-associations';

describe('UseCaseDiagram Components UseCaseAssociations Reducer', () => {
  const prevState = [
    {
      id: '2',
      type: 'usecase-association',
      associationType: 'INCLUDES',
      useCase1: { id: '3', x: 10, y: 10 },
      useCase2: { id: '4', x: 20, y: 20 }
    },
    {
      id: '5',
      type: 'usecase-association',
      associationType: 'EXTENDS',
      useCase1: { id: '5', x: 30, y: 30 },
      useCase2: { id: '6', x: 40, y: 40 }
    }
  ];
  it('should start as an empty array', () => {
    const state = useCaseAssociationsReducer(undefined, { type: '' });

    expect(state).toEqual([]);
  });

  describe('when ADD_USE_CASE_ASSOCIATION', () => {
    it('should create new usecase association', () => {
      const action = {
        type: ADD_USE_CASE_ASSOCIATION,
        useCase1: { id: '1234' },
        useCase2: { id: '4321' }
      };

      const state = useCaseAssociationsReducer([], action);
      expect(state).toEqual([{
        id: '1',
        type: 'usecase-association',
        associationType: 'INCLUDES',
        useCase1: action.useCase1,
        useCase2: action.useCase2
      }]);
    });
  });

  describe('when UML_COMPONENT_MOVE', () => {
    it('should do nothing if componentType is not use-case', () => {
      const action = {
        type: UML_COMPONENT_MOVE,
        componentType: 'actor'
      };

      const state = useCaseAssociationsReducer(prevState, action);

      expect(state).toEqual(prevState);
    });

    it('should update use-case if it is in useCase1', () => {
      const action = {
        type: UML_COMPONENT_MOVE,
        componentType: 'use-case',
        id: '3',
        x: 200,
        y: 200
      };

      const state = useCaseAssociationsReducer(prevState, action);

      expect(state).toEqual([
        {
          id: '2',
          type: 'usecase-association',
          associationType: 'INCLUDES',
          useCase1: { id: '3', x: 200, y: 200 },
          useCase2: { id: '4', x: 20, y: 20 }
        },
        {
          id: '5',
          type: 'usecase-association',
          associationType: 'EXTENDS',
          useCase1: { id: '5', x: 30, y: 30 },
          useCase2: { id: '6', x: 40, y: 40 }
        }
      ]);
    });

    it('should update use-case if it is in useCase2', () => {
      const action = {
        type: UML_COMPONENT_MOVE,
        componentType: 'use-case',
        id: '6',
        x: 200,
        y: 200
      };

      const state = useCaseAssociationsReducer(prevState, action);

      expect(state).toEqual([
        {
          id: '2',
          type: 'usecase-association',
          associationType: 'INCLUDES',
          useCase1: { id: '3', x: 10, y: 10 },
          useCase2: { id: '4', x: 20, y: 20 }
        },
        {
          id: '5',
          type: 'usecase-association',
          associationType: 'EXTENDS',
          useCase1: { id: '5', x: 30, y: 30 },
          useCase2: { id: '6', x: 200, y: 200 }
        }
      ]);
    });
  });

  describe('when UML_COMPONENT_DELETE', () => {
    it('should do nothing if componentType is not association', () => {
      const action = {
        id: '3',
        type: UML_COMPONENT_DELETE,
        componentType: 'whatever'
      };
      const state = useCaseAssociationsReducer(prevState, action);

      expect(state).toEqual(prevState);
    });

    it('should do nothing if action.id could not be foound in associations', () => {
      const action = {
        id: '3',
        type: UML_COMPONENT_DELETE,
        componentType: 'usecase-association'
      };
      const state = useCaseAssociationsReducer(prevState, action);

      expect(state).toEqual(prevState);
    });

    it('should remove association according to action.id', () => {
      const action = {
        id: '5',
        type: 'association',
        type: UML_COMPONENT_DELETE,
        componentType: 'usecase-association'
      };
      const state = useCaseAssociationsReducer(prevState, action);

      expect(state).toEqual([prevState[0]]);
    });
  });

  describe('when TOGGLE_USE_CASE_ASSOCIATION_TYPE', () => {
    it('should swap from INCLUDES to EXTENDS', () => {
      const action = {
        type: TOGGLE_USE_CASE_ASSOCIATION_TYPE,
        id: '2'
      };
      const state = useCaseAssociationsReducer(prevState, action);

      expect(state).toEqual([
        {
          id: '2',
          type: 'usecase-association',
          associationType: 'EXTENDS',
          useCase1: { id: '3', x: 10, y: 10 },
          useCase2: { id: '4', x: 20, y: 20 }
        },
        {
          id: '5',
          type: 'usecase-association',
          associationType: 'EXTENDS',
          useCase1: { id: '5', x: 30, y: 30 },
          useCase2: { id: '6', x: 40, y: 40 }
        }
      ]);
    });

    it('should swap from EXTENDS to INCLUDES', () => {
      const action = {
        type: TOGGLE_USE_CASE_ASSOCIATION_TYPE,
        id: '5'
      };
      const state = useCaseAssociationsReducer(prevState, action);

      expect(state).toEqual([
        {
          id: '2',
          type: 'usecase-association',
          associationType: 'INCLUDES',
          useCase1: { id: '3', x: 10, y: 10 },
          useCase2: { id: '4', x: 20, y: 20 }
        },
        {
          id: '5',
          type: 'usecase-association',
          associationType: 'INCLUDES',
          useCase1: { id: '5', x: 30, y: 30 },
          useCase2: { id: '6', x: 40, y: 40 }
        }
      ]);
    });
  });

  describe('when UML_COMPONENT_BOUND_UPDATE', () => {
    it('should update bound of useCase1', () => {
      const action = {
        type: UML_COMPONENT_BOUND_UPDATE,
        id: '3',
        bound: 'bound'
      };

      const state = useCaseAssociationsReducer(prevState, action);

      expect(state).toEqual([
        {
          id: '2',
          type: 'usecase-association',
          associationType: 'INCLUDES',
          useCase1: { id: '3', x: 10, y: 10, bound: 'bound' },
          useCase2: { id: '4', x: 20, y: 20 }
        },
        {
          id: '5',
          type: 'usecase-association',
          associationType: 'EXTENDS',
          useCase1: { id: '5', x: 30, y: 30 },
          useCase2: { id: '6', x: 40, y: 40 }
        }
      ]);
    });

    it('should update bound of useCase2', () => {
      const action = {
        type: UML_COMPONENT_BOUND_UPDATE,
        id: '6',
        bound: 'bound'
      };

      const state = useCaseAssociationsReducer(prevState, action);

      expect(state).toEqual([
        {
          id: '2',
          type: 'usecase-association',
          associationType: 'INCLUDES',
          useCase1: { id: '3', x: 10, y: 10 },
          useCase2: { id: '4', x: 20, y: 20 }
        },
        {
          id: '5',
          type: 'usecase-association',
          associationType: 'EXTENDS',
          useCase1: { id: '5', x: 30, y: 30 },
          useCase2: { id: '6', x: 40, y: 40, bound: 'bound' }
        }
      ]);
    });
  });
});
