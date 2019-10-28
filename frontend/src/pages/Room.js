import React from 'react';
import PageTemplate from 'components/layout/PageTemplate';
import RoomHeaderContainer from 'containers/RoomHeaderContainer';
import RoomContentContainer from 'containers/RoomContentContainer';

const Room = () => {
  return (
    <PageTemplate name="room">
      <RoomHeaderContainer />
      <RoomContentContainer />
    </PageTemplate>
  );
};

export default Room;
