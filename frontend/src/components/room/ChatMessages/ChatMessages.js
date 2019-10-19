import React from 'react';
import './ChatMessages.scss';

const ChatMessages = () => {
  return (
    <ul id="chat-messages">
      {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((data, i) => {
        console.log(data, i);

        return <Message key={i} data={data} />;
      })}
    </ul>
  );
};

const Message = ({ data }) => {
  const isMine = data > 8;
  const className = isMine ? 'mine' : 'attendee';

  return (
    <li className={className}>
      <div className="profile">
        <img
          src="https://lh3.googleusercontent.com/-NWx_E8i2cEE/AAAAAAAAAAI/AAAAAAAAAAA/ACHi3rcyW9Y7YloaN8IvNg58Y_ewM2DRKw.CMID/s32-c/photo.jpg"
          alt="profile"
        />
      </div>
      <div className="body">
        {!isMine && <span title="Name">Name</span>}
        <p>Message</p>
      </div>
    </li>
  );
};

export default ChatMessages;
