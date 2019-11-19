// https://www.iconfinder.com/iconsets/profession-vol-1

import React from 'react';
import Popover from 'components/common/Popover';
import Avatar from 'components/common/Avatar';
import imagesetData from './imagesetData';
import './AvatarSetPopover.scss';

const AvatarSetPopover = React.memo(
  ({ imageset = imagesetData, currentProfile, onUpdate }) => {
    // console.log('AvatarSetPopover :', currentProfile);

    return (
      <Popover id="avatar-set" position="bottom">
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
  },
  (prevProps, nextProps) => {
    // console.log('React.memo', prevProps, prevProps === nextProps);
    return prevProps.currentProfile === nextProps.currentProfile;
  }
);

export default AvatarSetPopover;
