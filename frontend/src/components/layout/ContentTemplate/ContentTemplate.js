import React from 'react';
import './ContentTemplate.scss';

const ContentTemplate = ({ children }) => {
  return <div id="content">{children}</div>;
};

export default ContentTemplate;
