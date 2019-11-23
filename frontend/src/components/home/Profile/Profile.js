import React, { useState } from 'react';
import Avatar from 'components/common/Avatar';
import AvatarSetPopover from 'components/home/AvatarSetPopover';
import OutsideClicker from 'components/common/OutsideClicker';
import utils from 'modules/utils';
import './Profile.scss';

const savedIsOpenAvatarset = utils.getStorage('isOpenAvatarset');
const isBoolean = savedIsOpenAvatarset === 'false' ? false : true; // 프로필셋 오픈 상태 스토리지 값 처리

const Profile = ({ inputEl, myInfo, onUpdateNickName, onUpdateProfileImage }) => {
  const { profileImage, nickname } = myInfo;
  const [isOpenAvatarset, setOpenAvatarset] = useState(isBoolean);
  const maxLength = 15;

  const toggleAvatarset = (strongAction) => {
    const result = typeof strongAction === 'boolean' ? strongAction : !isOpenAvatarset;
    setOpenAvatarset(result);
    utils.setStorage('isOpenAvatarset', result);
  };

  return (
    <div id="profile">
      <section id="image-wrap">
        <OutsideClicker onClick={() => toggleAvatarset(false)}>
          <button type="button" id="btn-edit" onClick={toggleAvatarset} className={isOpenAvatarset ? 'active' : ''}>
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
