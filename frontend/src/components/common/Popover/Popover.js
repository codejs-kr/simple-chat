import React from 'react';
import './Popover.scss';

const Popover = ({ id, children }) => {
  return (
    <div id={id} className="popover">
      {children}
    </div>
  );
};

export default Popover;
