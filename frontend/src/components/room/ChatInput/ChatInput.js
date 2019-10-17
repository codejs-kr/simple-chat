import React from 'react';
import './ChatInput.scss';

const ChatInput = () => {
  return (
    <form id="chat-form">
      <textarea name="message" placeholder="Enter typing" />
      <button type="submit">Send</button>
    </form>
  );
};

export default ChatInput;
