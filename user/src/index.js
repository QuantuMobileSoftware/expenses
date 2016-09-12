import React from 'react';
import ReactDOM from 'react-dom';
import ExpensesBox from './App';
import './index.css';

ReactDOM.render(
  <ExpensesBox url="/expenses/" />,
  document.getElementById('root')
);
