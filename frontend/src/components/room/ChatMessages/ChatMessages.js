import React from 'react';
import { FixedSizeList as List } from 'react-window';
import AutoSizer from 'react-virtualized-auto-sizer';
import Avatar from 'components/common/Avatar';
import moment from 'moment';
import './ChatMessages.scss';

const UserMessage = ({ isMine, data }) => {
  const className = `chat ${isMine ? 'mine' : 'attendee'}`;
  const { profileImage, nickname, message, time } = data;

  return (
    <li className={className} data-time={time}>
      <div className="profile">
        <Avatar src={profileImage} alt="profile" />
      </div>
      <div className="body">
        {!isMine && (
          <span className="nickname" title={nickname}>
            {nickname}
          </span>
        )}
        <p>
          {message}
          <span className="time">{moment(time).format('LT')}</span>
        </p>
      </div>
    </li>
  );
};

const SystemMessage = ({ data }) => {
  const { message, time } = data;
  const className = 'system';

  return (
    <li className={className} data-time={time}>
      <div className="body">
        <p>{message}</p>
      </div>
    </li>
  );
};

const Row = ({ index, style }) => (
  <div className={index % 2 ? 'ListItemOdd' : 'ListItemEven'} style={style}>
    Row {index}
  </div>
);

// const ChatMessages = ({ myInfo, messages }) => {
//   return (
//     <ul id="messages">
//       {messages.map((data, i) => {
//         // console.log(data, i);

//         if (data.type === 'chat') {
//           const isMine = myInfo.id === data.id;
//           return <UserMessage key={i} isMine={isMine} data={data} />;
//         }

//         return <SystemMessage key={i} data={data} />;
//       })}
//     </ul>
//   );
// };

const ChatMessages = ({ myInfo, messages }) => (
  <AutoSizer>
    {({ height, width }) => (
      <List className="List" height={height} itemCount={1000} itemSize={60} width={width}>
        {Row}
      </List>
    )}
  </AutoSizer>
);

export default ChatMessages;
