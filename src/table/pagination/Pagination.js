import React, { useContext } from 'react';
import './styles.scss';
import {
  FaArrowLeft, FaArrowRight, FaAngleDoubleLeft, FaAngleDoubleRight,
} from 'react-icons/fa';
import { BuildContext } from '../context/build/buildContext';
import { TableContext } from '../context/table/tableContext';

const Pagination = () => {
  const {
    page,
    setPage,
    rowsPerPage,
    count,
    setSelected,
  } = useContext(TableContext);

  const { OnBuild } = useContext(BuildContext);

  const handleSetPage = (newPage) => {
    setPage(newPage);
    setSelected(0);
    OnBuild(newPage);
  };

  const handleFirstPageButtonClick = () => {
    handleSetPage(1);
  };

  const handleBackButtonClick = () => {
    handleSetPage(page - 1);
  };

  const handleNextButtonClick = () => {
    handleSetPage(page + 1);
  };

  const handleLastPageButtonClick = () => {
    handleSetPage(Math.max(0, Math.ceil(count / rowsPerPage)));
  };

  return (
    <div className="pagination">
      <div className="toolbar">
        <div className="spacer" />
        <p className="pages">
          {page}
          {' '}
          из
          {' '}
          {Math.ceil(count / rowsPerPage)}
        </p>
        <div className="buttons">
          <button
            className="left-all"
            type="button"
            disabled={page === 1}
            aria-label="Первая страница"
            onClick={handleFirstPageButtonClick}
          >
            <span className="label">
              <FaAngleDoubleLeft />
            </span>
          </button>
          <button
            className="left"
            type="button"
            disabled={page === 1}
            aria-label="Предыдущая страница"
            onClick={handleBackButtonClick}
          >
            <span className="label">
              <FaArrowLeft />
            </span>
          </button>
          <button
            className="right"
            type="button"
            aria-label="Следующая страница"
            disabled={page === Math.ceil(count / rowsPerPage)}
            onClick={handleNextButtonClick}
          >
            <span className="label">
              <FaArrowRight />
            </span>
            <span className="ripple" />
          </button>
          <button
            className="right-all"
            type="button"
            aria-label="Последняя страница"
            disabled={page === Math.ceil(count / rowsPerPage)}
            onClick={handleLastPageButtonClick}
          >
            <span className="label">
              <FaAngleDoubleRight />
            </span>
            <span className="ripple" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default Pagination;
