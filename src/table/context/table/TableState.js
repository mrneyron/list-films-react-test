import React, { useReducer } from 'react';
import { TableContext } from './tableContext';
import { tableReducer } from './tableReducer';
import {
  SET_ORDER, SET_ORDER_BY, SET_PAGE, SET_ROWS_PER_PAGE, SET_COUNT, SET_SELECTED, SET_COMMENTED
} from '../types';


const TableState = ({ children }) => {
  const initialState = {
    order: 'desc',
    orderBy: 'id',
    page: 1,
    rowsPerPage: 12,
    count: 0,
    selected: 0,
    commented: 0,
  };
  const [state, dispatch] = useReducer(tableReducer, initialState);

  const setOrder = (order) => {
    dispatch({
      type: SET_ORDER,
      payload: order,
    });
  };

  const setOrderBy = (orderBy) => {
    dispatch({
      type: SET_ORDER_BY,
      payload: orderBy,
    });
  };

  const setPage = (page) => {
    dispatch({
      type: SET_PAGE,
      payload: page,
    });
  };

  const setRowsPerPage = (rowsPerPage) => {
    dispatch({
      type: SET_ROWS_PER_PAGE,
      payload: rowsPerPage,
    });
  };

  const setCount = (count) => {
    dispatch({
      type: SET_COUNT,
      payload: count,
    });
  };

  const setSelected = (selected) => {
    dispatch({
      type: SET_SELECTED,
      payload: selected,
    });
  };

  const setCommented = (commented) => {
    dispatch({
      type: SET_COMMENTED,
      payload: commented,
    });
  };

  return (
    <TableContext.Provider value={{
      order: state.order,
      setOrder,
      orderBy: state.orderBy,
      setOrderBy,
      page: state.page,
      setPage,
      rowsPerPage: state.rowsPerPage,
      setRowsPerPage,
      count: state.count,
      setCount,
      selected: state.selected,
      setSelected,
      commented: state.commented,
      setCommented,
    }}
    >
      {children}
    </TableContext.Provider>
  );
};
export { TableState };
