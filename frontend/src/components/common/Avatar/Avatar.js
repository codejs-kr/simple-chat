import React from 'react';
import './Avatar.scss';

const Avatar = ({ src, alt, size, children }) => {
  console.log('Avatar', src, size);
  const content = src ? <img src={src} alt={alt ? alt : 'avatar'} /> : children;
  const styles = {
    width: `${size}px`,
    height: `${size}px`,
  };

  return (
    <span className="avatar" style={styles}>
      {content}
    </span>
  );
};

export default Avatar;
