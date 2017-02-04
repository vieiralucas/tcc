import linkingReducer from './linking';
import { UML_COMPONENT_LINK, UML_COMPONENT_RESET_LINK } from '../../actions/use-case-diagram';

describe('UseCaseDiagram Linking Reducer', () => {
  it('should start with empty link', () => {
    const state = linkingReducer(undefined, { type: '' });

    expect(state).toEqual({
      comp1: null,
      comp2: null
    });
  });

  describe('when UML_COMPONENT_LINK', () => {
    let prevState;
    
    beforeEach(() => {
      prevState= {
        comp1: null,
        comp2: null
      };
    });

    it('should set comp1 to action.component if !comp1', () => {
      const action = {
        type: UML_COMPONENT_LINK,
        component: { id: '1234' }
      };
      const state = linkingReducer(prevState, action);
      expect(state).toEqual({
        comp1: action.component,
        comp2: null
      });
    });

    it('should set comp2 to action.component if comp1 is alredy defined', () => {
      prevState.comp1 = {
        id: '4321'
      };
      const action = {
        type: UML_COMPONENT_LINK,
        component: { id: '1234' }
      };
      const state = linkingReducer(prevState, action);

      expect(state).toEqual({
        comp1: prevState.comp1,
        comp2: action.component
      });
    });

    it('do nothing if comp1 is already defined and action.component.id match comp1.id', () => {
      prevState.comp1 = {
        id: '1234'
      };
      const action = {
        type: UML_COMPONENT_LINK,
        component: { id: '1234' }
      };
      const state = linkingReducer(prevState, action);

      expect(state).toEqual({
        comp1: prevState.comp1,
        comp2: null
      });
    });
  });

  it('should set link to initial on UML_COMPONENT_RESET_LINK', () => {
    const action = {
      type: UML_COMPONENT_RESET_LINK
    };
    const prevState = {
      comp1: { id: '1234' },
      comp2: { id: '4321' }
    };
    const state = linkingReducer(prevState, action);

    expect(state).toEqual({
      comp1: null,
      comp2: null
    });
  });
});
