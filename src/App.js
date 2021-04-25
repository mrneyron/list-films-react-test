import React from 'react';
import './styles.css';
import Table from './table'
import ReactDOM from "react-dom";

/**
 * Главный компонент
 */
const App = () => {
  return (
    <Table />
  );
};

ReactDOM.render(<App />, document.getElementById("root"));
