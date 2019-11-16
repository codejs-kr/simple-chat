import React from 'react';
import Avatar from 'components/common/Avatar';
import './UserList.scss';

const UserList = ({ isActive, users }) => {
  let result = [];
  for (const id in users) {
    result.push(<Item key={id} data={users[id]} />);
  }

  return (
    <div id="user-list" className={isActive ? 'opened' : ''}>
      <header>참여자목록</header>
      <ul>{result}</ul>
    </div>
  );
};

// UserList 내부에 있으면 여닫을때마다 리 랜더링 된다
const Item = ({ data }) => {
  return (
    <li>
      <span className="profile">
        <Avatar src={data.profileImage} alt={data.nickname} />
      </span>
      <p className="name">
        <span>{data.nickname}</span>
      </p>
    </li>
  );
};

export default UserList;
