import React from 'react';
import './Profile.scss';

const Profile = ({ myInfo }) => {
  const { profileImage, nickname } = myInfo;

  return (
    <div id="profile">
      <section id="image-wrap">
        <img src={profileImage} alt="profile" />
      </section>
      <section id="nickname-wrap">
        <input type="text" defaultValue={nickname} maxLength="15" placeholder="Enter nickname" />
      </section>
    </div>
  );
};

export default Profile;
