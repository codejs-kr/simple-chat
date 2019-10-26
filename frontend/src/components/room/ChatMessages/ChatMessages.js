import React from 'react';
import './ChatMessages.scss';

const ChatMessages = ({ myInfo, messages }) => {
  return (
    <ul id="chat-messages">
      {messages.map((data, i) => {
        // console.log(data, i);
        const isMine = myInfo.id === data.id;

        return <Message key={i} isMine={isMine} data={data} />;
      })}
    </ul>
  );
};

const Message = ({ isMine, data }) => {
  const className = isMine ? 'mine' : 'attendee';
  const defaultProfileImage = 'https://cdn.pixabay.com/photo/2016/08/08/09/17/avatar-1577909_960_720.png';
  const { profileImage, nickname, message, time } = data;

  return (
    <li className={className} data-time={time}>
      <div className="profile">
        <img src={profileImage || defaultProfileImage} alt="profile" />
      </div>
      <div className="body">
        {!isMine && <span title={nickname}>{nickname}</span>}
        <p>{message}</p>
      </div>
    </li>
  );
};

export default ChatMessages;
