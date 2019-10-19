import React from 'react';
import './ChatInput.scss';

const ChatInput = ({ onSend }) => {
  return (
    <form id="chat-form" method="post" action="/message" onSubmit={onSend}>
      <textarea name="message" placeholder="Type message" />
      <button type="submit">Send</button>
    </form>
  );
};

export default ChatInput;
