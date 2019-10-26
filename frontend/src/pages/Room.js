import React from 'react';
import RoomTemplate from 'components/room/RoomTemplate';
import RoomHeaderContainer from 'containers/RoomHeaderContainer';
import RoomContentContainer from 'containers/RoomContentContainer';

const Room = () => {
  return (
    <RoomTemplate>
      <RoomHeaderContainer />
      <RoomContentContainer />
    </RoomTemplate>
  );
};

export default Room;
