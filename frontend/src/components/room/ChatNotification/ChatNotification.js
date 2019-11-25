import React from 'react';
import './ChatNotification.scss';

const ChatNotification = ({ onClick }) => {
  return (
    <button id="chat-notification" onClick={onClick}>
      New message
    </button>
  );
};

export default ChatNotification;
