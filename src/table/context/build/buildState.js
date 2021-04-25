import React, { useState, useContext } from 'react';

import axios from 'axios';
import { TableContext } from '../table/tableContext';
import { BuildContext } from './buildContext';


export const BuildState = ({ children }) => {
  const apiHost = 'https://yts.mx/api/v2/list_movies.json';
  const [rowsData, setRowsData] = useState([]);
  const {
    order, orderBy, rowsPerPage, setCount, setPage,
  } = useContext(TableContext);

  const OnBuild = (curPage) => {
    if (curPage === undefined) {
      curPage = 1;
      setPage(curPage);
    }
    getFilmList(curPage, rowsPerPage, order, orderBy).then((data) => {
      setCount(data.movie_count);
      setRowsData(data.movies);
    });
  };

  /**
   * Get film list
   * @param {*} limit
   * @param {*} page
   * @param {*} sortBy
   * @param {*} orderBy
   * @returns
   */
  const getFilmList = async (page, rowsPerPage, order, orderBy) => {
    const res = await axios.get(`${apiHost}?page=${page}&limit=${rowsPerPage}&sort_by=${order}&order_by=${orderBy}`);
    return res.data.data;
  };

  return (
    <BuildContext.Provider
      value={{ rowsData, OnBuild }}
    >
      {children}
    </BuildContext.Provider>
  );
};
