// https://www.iconfinder.com/iconsets/profession-vol-1

import React, { useEffect } from 'react';
import Popover from 'components/common/Popover';
import Avatar from 'components/common/Avatar';
import './AvatarSetPopover.scss';

const AvatarSetPopover = React.memo(
  ({ imageset, currentProfile, onUpdate }) => {
    console.log('AvatarSetPopover :', currentProfile);

    useEffect(() => {
      console.log('render AvatarSetPopover');
      return () => console.log('unmounting AvatarSetPopover');
    }, [currentProfile]);

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
    console.log('React.memo', prevProps, prevProps === nextProps);
    return prevProps.currentProfile === nextProps.currentProfile;
  }
);

export default AvatarSetPopover;

/*
import React, { Component } from 'react';
import Popover from 'components/common/Popover';
import Avatar from 'components/common/Avatar';
import './AvatarSetPopover.scss';

class AvatarSetPopover extends Component {
  constructor(props) {
    super(props);
  }

  shouldComponentUpdate(nextProps, nextState) {
    console.log('shouldComponentUpdate', this.props.currentProfile === nextProps.currentProfile);
    return this.props.currentProfile !== nextProps.currentProfile;
  }

  render() {
    console.log('랜더링: AvatarSetPopover');
    const { imageset, currentProfile, onUpdate } = this.props;

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
  }
}

export default AvatarSetPopover;

*/
