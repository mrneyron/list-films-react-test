import {
  SET_ORDER, SET_ORDER_BY, SET_PAGE, SET_ROWS_PER_PAGE, SET_COUNT, SET_SELECTED, SET_COMMENTED
} from '../types';

const handlers = {
  [SET_ORDER]: (state, { payload }) => ({ ...state, order: payload }),
  [SET_ORDER_BY]: (state, { payload }) => ({ ...state, orderBy: payload }),
  [SET_PAGE]: (state, { payload }) => ({ ...state, page: payload }),
  [SET_ROWS_PER_PAGE]: (state, { payload }) => ({ ...state, rowsPerPage: payload }),
  [SET_COUNT]: (state, { payload }) => ({ ...state, count: payload }),
  [SET_SELECTED]: (state, { payload }) => ({ ...state, selected: payload }),
  [SET_COMMENTED]: (state, { payload }) => ({ ...state, commented: payload }),
  DEFAULT: (state) => state,
};

const tableReducer = (state, action) => {
  const handle = handlers[action.type] || handlers.DEFAULT;
  return handle(state, action);
};
export { tableReducer };
