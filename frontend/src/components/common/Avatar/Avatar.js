import React from 'react';
import './Avatar.scss';

const Avatar = ({ src, alt, children }) => {
  const content = src ? <img src={src} alt={alt ? alt : 'avatar'} /> : children;

  return <span className="avatar">{content}</span>;
};

export default Avatar;
