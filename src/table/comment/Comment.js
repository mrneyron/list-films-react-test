import React, { useState, useContext, useEffect } from 'react';
import './styles.scss';
import {
  FaCheck,
  FaTimes,
} from 'react-icons/fa';
import { TableContext } from '../context/table/tableContext';

const Comment = () => {
  const { selected } = useContext(TableContext);
  const [comment, setComment] = useState('');
  const [listCom, setListCom] = useState([]);

  useEffect(() => {
    const localStorageComment = JSON.parse(localStorage.getItem('comment'));
    if (localStorageComment !== null) {
      const tempArray = [];
      for (let i = 0; i < localStorageComment.length; i++) {
        if (selected == Object.keys(localStorageComment[i])[0]) {
          tempArray.push(Object.values(localStorageComment[i])[0]);
        }
      }
      setListCom(tempArray);
    }
    return () => {
      setComment('');
    };
  }, [selected]);

  const handleAddComment = () => {
    if (comment !== '') {
      let arrOfComment = JSON.parse(localStorage.getItem('comment'));
      if (arrOfComment === null) {
        arrOfComment = [];
      }
      arrOfComment.push({ [selected]: comment });
      localStorage.setItem('comment', JSON.stringify(arrOfComment));
      const tempArray = [];
      for (let i = 0; i < arrOfComment.length; i++) {
        if (selected == Object.keys(arrOfComment[i])[0]) {
          tempArray.push(Object.values(arrOfComment[i])[0]);
        }
      }
      setComment('');
      setListCom(tempArray);
    }
  };

  const handleDeleteComment = (e, item) => {
    const tempArrayStorage = [];
    const tempArray = [];
    for (let i = 0; i < listCom.length; i++) {
      if (item !== listCom[i]) {
        tempArrayStorage.push({ [selected]: listCom[i] });
        tempArray.push(listCom[i]);
      }
    }
    localStorage.setItem('comment', JSON.stringify(tempArrayStorage));
    setListCom(tempArray);
  };

  if (selected !== 0) {
    return (
      <div className="paper">
        <div className="item">
          <div className="comment">
            <div className="wrapper">
              <p>
                Comments
              </p>
            </div>
            <div className="wrapper">
              <div className="list">
                {listCom.map((item) => (
                  <div key={item} className="value">
                    <span>{item}</span>
                    <button
                      type="button"
                      onClick={(e) => handleDeleteComment(e, item)}
                    >
                      <span className="label">
                        <FaTimes />
                      </span>
                    </button>
                  </div>
                ))}
              </div>
            </div>
            <div className="wrapper">
              <textarea value={comment} onChange={(e) => setComment(e.target.value)} />
              <button
                type="button"
                onClick={(e) => handleAddComment(e)}
              >
                <span className="label">
                  <FaCheck />
                </span>
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }
  return (null);
};

export default Comment;
