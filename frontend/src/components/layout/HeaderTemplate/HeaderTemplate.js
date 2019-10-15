import React from 'react';
import './HeaderTemplate.scss';

const HeaderTemplate = ({ children }) => {
  return <header id="header">{children}</header>;
};

export default HeaderTemplate;
