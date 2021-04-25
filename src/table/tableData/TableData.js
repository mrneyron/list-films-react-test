import React, { useState, useEffect, useContext } from 'react';
import './styles.scss';
import {
  FaComment, FaTimes, FaStar,
} from 'react-icons/fa';
import { BuildContext } from '../context/build/buildContext';
import { TableContext } from '../context/table/tableContext';
import Comment from '../comment';

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
    if (id !== selected) {
      setSelected(id);
    } else {
      setSelected(0);
    }
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

  const getFilmClass = (item) => {
    if (hidden.findIndex((x) => x === item.title) > -1) {
      return 'hidden';
    }
    if (item.id === selected) {
      return 'film selected';
    }
    return 'film';
  };

  return (
    <div>
      <section className="films">
        {rowsData.map((item) => (
          <div
            key={item.id}
            className={getFilmClass(item)}
          >
            <img src={item.medium_cover_image} alt={item.title} />
            <div className="title">
              <span className="name">{`${item.title} ${item.year}`}</span>
              <span>{`${Math.floor(item.runtime / 60)}:${item.runtime % 60}`}</span>
            </div>
            <div className="rating">
              <FaStar />
              {` ${item.rating}/10`}
            </div>
            <div className="genres">
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
            </div>
            <div className="actions">
              <button
                type="button"
                onClick={(e) => handleComment(e, item.id)}
              >
                <span className="label">
                  <FaComment />
                </span>
              </button>
              <button
                type="button"
                onClick={(e) => handleHide(e, item.title)}
              >
                <span className="label">
                  <FaTimes />
                </span>
              </button>
            </div>
            {selected === item.id ? (
              <Comment />
            ) : null}
          </div>
        ))}
      </section>
      {rowsData.length > 0 && hidden.length > 0 ? (
        <div className="paper">
          <div className="item">
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
          </div>
        </div>
      ) : null}
    </div>
  );
};

export default TableData;
