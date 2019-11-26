import React from 'react';
import './ScrollDownButton.scss';

const ScrollDownButton = ({ onClick }) => {
  return (
    <button id="btn-scroll-down" onClick={onClick}>
      <i className="material-icons">arrow_downward</i>
    </button>
  );
};

export default ScrollDownButton;
