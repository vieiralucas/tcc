import toolboxReducer from './toolbox';
import { TOOLBOX_SELECTION, CLEAR_TOOLBOX } from '../../actions/use-case-diagram';

describe('UseCaseDiagram Toolbox Reducer', () => {
  const prevState = {
    selected: 'something'
  };

  it('should start empty', () => {
    const state = toolboxReducer(undefined, { type: '' });
    expect(state).toEqual({
      selected: null
    });
  });

  it('should selected from action.componentType on TOOLBOX_SELECTION', () => {
    const action = {
      type: TOOLBOX_SELECTION,
      componentType: 'actor'
    };
    const state = toolboxReducer(prevState, action);

    expect(state).toEqual({
      selected: 'actor'
    });
  });

  it('should reset to start on CLEAR_TOOLBOX', () => {
    const action = {
      type: CLEAR_TOOLBOX
    };
    const state = toolboxReducer(prevState, action);

    expect(state).toEqual({
      selected: null
    });
  });
});
