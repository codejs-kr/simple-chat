import React, { useState } from 'react';
import Avatar from 'components/common/Avatar';
import AvatarSetPopover from 'components/home/AvatarSetPopover';
import OutsideClicker from 'components/common/OutsideClicker';
import './Profile.scss';

const Profile = ({ inputEl, myInfo, onUpdateNickName, onUpdateProfileImage }) => {
  const { profileImage, nickname } = myInfo;
  const [isOpenAvatarset, setOpenAvatarset] = useState(true);
  const maxLength = 15;

  const ToggleAvatarset = () => {
    setOpenAvatarset(!isOpenAvatarset);
  };

  return (
    <div id="profile">
      <section id="image-wrap">
        <OutsideClicker onClick={() => setOpenAvatarset(false)}>
          <button type="button" id="btn-edit" onClick={ToggleAvatarset} className={isOpenAvatarset ? 'active' : ''}>
            <Avatar src={profileImage} />
            <i className="material-icons">edit</i>
          </button>

          {isOpenAvatarset && <AvatarSetPopover currentProfile={profileImage} onUpdate={onUpdateProfileImage} />}
        </OutsideClicker>
      </section>
      <section id="nickname-wrap">
        <input
          ref={inputEl}
          type="text"
          className="input"
          defaultValue={nickname}
          maxLength={maxLength}
          placeholder="Enter nickname"
          onChange={(e) => {
            const value = e.target.value;
            onUpdateNickName(value);
          }}
        />
      </section>
    </div>
  );
};

export default Profile;
