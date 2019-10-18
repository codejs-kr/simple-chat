import React from 'react';
import './ChatMessages.scss';

const ChatMessages = () => {
  return (
    <ul id="chat-messages">
      {[1, 2, 3].map((data, i) => {
        console.log(data, i);

        return <Message key={i} />;
      })}
    </ul>
  );
};

const Message = () => {
  return (
    <li>
      <span>
        <img
          src="https://lh3.googleusercontent.com/-NWx_E8i2cEE/AAAAAAAAAAI/AAAAAAAAAAA/ACHi3rcyW9Y7YloaN8IvNg58Y_ewM2DRKw.CMID/s32-c/photo.jpg"
          alt="img"
        />
      </span>
      <p>Message</p>
    </li>
  );
};

export default ChatMessages;
