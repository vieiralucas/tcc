jest.mock('uuid', () => {
  const mockUuid = {
    v1: jest.fn(() => '1')
  };

  return mockUuid;
});

import actorUseCaseAssociationsReducer from './actor-usecase-associations';
import {
  UML_COMPONENT_MOVE,
  UML_COMPONENT_DELETE,
  UML_COMPONENT_ADD_ASSOCIATION
} from '../../../actions/use-case-diagram';

describe('UseCaseDiagram Components ActorUseCaseAssociations Reducer', () => {
  const prevState = [
    {
      id: '1',
      type: 'association',
      actor: { id: '1234', x: 1, y: 2 },
      useCase: { id: '4321', x: 2, y: 3 }
    },
    {
      id: '2',
      type: 'association',
      actor: { id: '5678', x: 1, y: 2 },
      useCase: { id: '8765', x: 2, y: 3 }
    }
  ];

  it('should start as an empty array', () => {
    const state = actorUseCaseAssociationsReducer(undefined, { type: '' });
    expect(state).toEqual([]);
  });

  describe('when UML_COMPONENT_MOVE', () => {
    describe('if componentType is actor', () => {
      it('should move actor insde association', () => {
        const action = {
          type: UML_COMPONENT_MOVE,
          componentType: 'actor',
          id: '1234',
          x: 10,
          y: 20
        };
        const state = actorUseCaseAssociationsReducer(prevState, action);

        expect(state).toEqual([
          {
            id: '1',
            type: 'association',
            actor: { id: '1234', x: 10, y: 20 },
            useCase: { id: '4321', x: 2, y: 3 }
          },
          {
            id: '2',
            type: 'association',
            actor: { id: '5678', x: 1, y: 2 },
            useCase: { id: '8765', x: 2, y: 3 }
          }
        ]);
      });
    });

    describe('if componentType is use-case', () => {
      it('should move useCase insde association', () => {
        const action = {
          type: UML_COMPONENT_MOVE,
          componentType: 'use-case',
          id: '4321',
          x: 10,
          y: 20
        };
        const state = actorUseCaseAssociationsReducer(prevState, action);

        expect(state).toEqual([
          {
            id: '1',
            type: 'association',
            actor: { id: '1234', x: 1, y: 2 },
            useCase: { id: '4321', x: 10, y: 20 }
          },
          {
            id: '2',
            type: 'association',
            actor: { id: '5678', x: 1, y: 2 },
            useCase: { id: '8765', x: 2, y: 3 }
          }
        ]);
      });
    });
  });

  describe('when UML_COMPONENT_DELETE', () => {
    it('should do nothing if componentType is not association', () => {
      const action = {
        id: '3',
        type: UML_COMPONENT_DELETE,
        componentType: 'whatever'
      };
      const state = actorUseCaseAssociationsReducer(prevState, action);

      expect(state).toEqual(prevState);
    });

    it('should do nothing if action.id could not be foound in associations', () => {
      const action = {
        id: '3',
        type: UML_COMPONENT_DELETE,
        componentType: 'association'
      };
      const state = actorUseCaseAssociationsReducer(prevState, action);

      expect(state).toEqual(prevState);
    });

    it('should remove association according to action.id', () => {
      const action = {
        id: '2',
        type: 'association',
        type: UML_COMPONENT_DELETE,
        componentType: 'association'
      };
      const state = actorUseCaseAssociationsReducer(prevState, action);

      expect(state).toEqual([prevState[0]]);
    });
  });

  describe('when UML_COMPONENT_ADD_ASSOCIATION', () => {
    let action;
    
    beforeEach(() => {
      action = {
        type: UML_COMPONENT_ADD_ASSOCIATION,
        comp1: {
          type: 'actor',
          id: '9999'
        },
        comp2: {
          type: 'use-case',
          id: '1010'
        }
      };
    });

    it('should do nothing if association already exists', () => {
      action.comp1.id = '1234';
      action.comp2.id = '4321';

      const state = actorUseCaseAssociationsReducer(prevState, action);

      expect(state).toEqual(prevState);
    });

    it('should do nothing if association is not between actor and use-case', () => {
      action.comp2.type = 'actor';

      const state = actorUseCaseAssociationsReducer(prevState, action);

      expect(state).toEqual(prevState);
    });

    it('should add association', () => {
      const state = actorUseCaseAssociationsReducer(prevState, action);

      expect(state).toEqual(prevState.concat({
        actor: action.comp1,
        useCase: action.comp2,
        id: '1',
        type: 'association'
      }));
    });
  });
});
