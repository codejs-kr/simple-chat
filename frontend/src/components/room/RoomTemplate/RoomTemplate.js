import React from 'react';
import './RoomTemplate.scss';

const RoomTemplate = ({ children }) => {
  return (
    <div id="page-container" data-page="room">
      {children}
    </div>
  );
};

export default RoomTemplate;
