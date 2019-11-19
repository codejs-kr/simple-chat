import React from 'react';
import Avatar from 'components/common/Avatar';
import SideViewTemplate from 'components/layout/SideViewTemplate';
import './UserList.scss';

const UserList = ({ isActive, users }) => {
  console.log('UserList :', users);

  let result = [];
  users.map((user) => {
    result.push(<Item key={user.id} data={user} />);
  });

  return (
    <SideViewTemplate id="user-list" isActive={isActive}>
      <header>
        참여자목록<span>({users.length})</span>
      </header>
      <ul>{result}</ul>
    </SideViewTemplate>
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
