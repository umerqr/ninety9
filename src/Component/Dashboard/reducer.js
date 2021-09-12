import produce from 'immer';
import { DEFAULT_CONST } from './constants';

export const initialState = { count: 0 };

/* eslint-disable default-case, no-param-reassign */
const dashboarReducer = (state = initialState, action) => produce(state, (draft) => {
  switch (action.type) {
    case DEFAULT_CONST:
      draft.count += 1;
      break;
  }
});

export default dashboarReducer;
