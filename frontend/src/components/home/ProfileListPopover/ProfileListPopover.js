import React from 'react';
import Popover from 'components/common/Popover';
import Avatar from 'components/common/Avatar';
import './ProfileListPopover';

const ProfileListPopover = ({ image }) => {
  return (
    <Popover position="bottom">
      <Avatar src={image} size="50" alt="profile" />
      <Avatar src={image} size="50" alt="profile" />
    </Popover>
  );
};

export default ProfileListPopover;
