import React from 'react';
import ReactDOM from 'react-dom';
import CommentBox from './App';
import './index.css';

ReactDOM.render(
  <CommentBox url="/expenses/" pollInterval={ 2000 } />,
  document.getElementById('root')
);
