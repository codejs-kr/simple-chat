import React from 'react';
import './PageTemplate.scss';

const PageTemplate = ({ children, name }) => {
  return (
    <div id="page-container" data-page={name}>
      {children}
    </div>
  );
};

export default PageTemplate;
