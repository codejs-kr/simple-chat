import React from 'react';
import Popover from 'components/common/Popover';
import Avatar from 'components/common/Avatar';
import './ProfileSetPopover.scss';

const ProfileSetPopover = ({ imageset, currentProfile, onUpdate }) => {
  console.log('ProfileSetPopover :', currentProfile);

  return (
    <Popover id="profile-set" position="bottom">
      {imageset.map((url) => {
        const className = currentProfile === url ? 'current' : '';

        return (
          <button type="button" className={className} key={url} onClick={() => onUpdate(url)}>
            <Avatar src={url} size="50" alt="profile" />
          </button>
        );
      })}
    </Popover>
  );
};

export default ProfileSetPopover;
