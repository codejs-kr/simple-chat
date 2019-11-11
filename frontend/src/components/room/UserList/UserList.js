import React from 'react';
import './UserList.scss';

const UserList = ({ isActive, users }) => {
  const Item = ({ data }) => {
    return (
      <li>
        <span className="profile">
          <img src={data.profileImage} alt={data.nickname} />
        </span>
        <span className="name">{data.nickname}</span>
      </li>
    );
  };

  let result = [];
  for (const id in users) {
    result.push(<Item data={users[id]} />);
  }

  return (
    <section id="user-list" className={isActive ? 'opened' : ''}>
      <header>참여자목록</header>
      <ul>{result}</ul>
    </section>
  );
};

export default UserList;
