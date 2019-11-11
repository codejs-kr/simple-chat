import React from 'react';
import './PageTemplate.scss';

const PageTemplate = ({ children, name, overlay }) => {
  return (
    <div id="page-container" data-page={name} className={overlay ? 'overlay' : ''}>
      {children}
    </div>
  );
};

export default PageTemplate;
