import React from 'react';
import Avatar from 'components/common/Avatar';
import ProfileListPopover from 'components/home/ProfileListPopover';
import './Profile.scss';

const Profile = ({ myInfo, onUpdateNickName }) => {
  const { profileImage, nickname } = myInfo;

  return (
    <div id="profile">
      <section id="image-wrap">
        <button type="button" onClick={() => {}}>
          <Avatar src={profileImage} />
          <i className="material-icons">edit</i>
        </button>
      </section>
      <section id="nickname-wrap">
        <input
          type="text"
          className="input"
          defaultValue={nickname}
          maxLength="15"
          placeholder="Enter nickname"
          onChange={(e) => {
            const value = e.target.value;

            if (value) {
              onUpdateNickName(value);
            }
          }}
        />
      </section>

      <ProfileListPopover image={profileImage} />
    </div>
  );
};

export default Profile;
