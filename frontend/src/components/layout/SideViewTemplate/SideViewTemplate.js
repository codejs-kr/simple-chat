import React from 'react';
import './SideViewTemplate.scss';

const SideViewTemplate = ({ children, id, isActive }) => {
  return (
    <div id={id} className={`side-view ${isActive ? 'opened' : ''}`}>
      {children}
    </div>
  );
};

export default SideViewTemplate;
