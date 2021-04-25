import React, { useState, useEffect, useContext } from 'react';
import './styles.scss';
import {
  FaComment, FaTimes,
} from 'react-icons/fa';
import { BuildContext } from '../context/build/buildContext';
import { TableContext } from '../context/table/tableContext';


const TableData = () => {
  const { rowsData, OnBuild } = useContext(BuildContext);
  const { setSelected, selected } = useContext(TableContext);
  const [hidden, setHidden] = useState([]);

  useEffect(() => {
    OnBuild(1);
    const localStorageHidden = JSON.parse(localStorage.getItem('hidden'));
    if (localStorageHidden !== null) {
      setHidden(localStorageHidden);
    }
  }, []);

  const handleComment = (e, id) => {
    e.stopPropagation();
    setSelected(id);
  };

  const handleHide = (e, title) => {
    e.stopPropagation();
    if (selected === rowsData.find((x) => x.title === title).id) {
      setSelected(0);
    }
    let arrOfHidden = JSON.parse(localStorage.getItem('hidden'));
    if (arrOfHidden === null) {
      arrOfHidden = [];
    }
    arrOfHidden.push(title);
    localStorage.setItem('hidden', JSON.stringify(arrOfHidden));
    setHidden(arrOfHidden);
  };

  const handleShow = (e, title) => {
    e.stopPropagation();
    const arrOfHidden = JSON.parse(localStorage.getItem('hidden'));
    arrOfHidden.splice(arrOfHidden.findIndex((x) => x === title), 1);
    localStorage.setItem('hidden', JSON.stringify(arrOfHidden));
    setHidden(arrOfHidden);
  };

  const handleSetRow = (id) => {
    if (id !== selected) {
      setSelected(id);
    } else {
      setSelected(0);
    }
  };

  return (
    <div>
      {rowsData.length > 0 && hidden.length > 0 ? (
        <section>
          <p>Hidden Films</p>
          <div style={{ marginBottom: 16 }}>
            {hidden.map((item) => (
              <div key={item} className="chip">
                <span>
                  {item}
                </span>
                <button
                  type="button"
                  onClick={(e) => handleShow(e, item)}
                >
                  <span className="label">
                    <FaTimes />
                  </span>
                </button>
              </div>
            ))}
          </div>
        </section>
      ) : null}
      <table className="table">
        <thead className="table-head">
          <tr className="table-row">
            <th>ID</th>
            <th>Name</th>
            <th>Year</th>
            <th>Rating</th>
            <th>Genres</th>
            <th>MPAA rating</th>
            <th>Runtime</th>
            <th>Comment</th>
            <th>Hide</th>
          </tr>
        </thead>
        <tbody className="table-body">
          {rowsData.map((item) => (
            <tr
              onClick={() => handleSetRow(item.id)}
              key={item.id}
              className={hidden.findIndex((x) => x === item.title) > -1 ? 'hidden' : item.id === selected ? 'selected' : null}
            >
              <td>{item.id}</td>
              <td>{item.title}</td>
              <td>{item.year}</td>
              <td>{item.rating}</td>
              <td>
                {item.genres !== undefined ? (
                  <>
                    {item.genres.map((genre) => (
                      <div key={genre} className="chip">
                        <span>
                          {genre}
                        </span>
                      </div>
                    ))}
                  </>
                ) : null}

              </td>
              <td>{item.mpa_rating}</td>
              <td>{item.runtime}</td>
              <td>
                <button
                  type="button"
                  onClick={(e) => handleComment(e, item.id)}
                >
                  <span className="label">
                    <FaComment />
                  </span>
                </button>
              </td>
              <td>
                <button
                  type="button"
                  onClick={(e) => handleHide(e, item.title)}
                >
                  <span className="label">
                    <FaTimes />
                  </span>
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default TableData;
