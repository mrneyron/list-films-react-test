import React from 'react';
import './styles.scss';

import DataTable from './tableData';
import Pagination from './pagination';
import { TableState } from './context/table/TableState';
import { BuildState } from './context/build/buildState';
import Test from './test';

const Table = () => {
  const handleClearHide = () => {
    localStorage.setItem('hidden', null);
  };
  const handleClearComment = () => {
    localStorage.setItem('comment', null);
  };
  return (
    <>
      <TableState>
        <BuildState>
          <div className="container">
            <div className="paper">
              <Pagination />
            </div>
            <DataTable />
            {/* <div className="paper">
              <button onClick={handleClearHide}>
                Отчистить HIDE
              </button>
              <button onClick={handleClearComment} style={{marginLeft: 16}}>
                Отчистить COMMENT
              </button>
            </div> */}
          </div>
        </BuildState>
      </TableState>
      <Test />
    </>
  );
};

export default Table;
