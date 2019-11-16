import React from 'react';
import { connect } from 'react-redux';
import PageTemplate from 'components/layout/PageTemplate';
import RoomHeaderContainer from 'containers/RoomHeaderContainer';
import RoomContentContainer from 'containers/RoomContentContainer';

const Room = ({ overlay }) => {
  return (
    <PageTemplate name="room" overlay={overlay}>
      <RoomHeaderContainer />
      <RoomContentContainer />
    </PageTemplate>
  );
};

export default connect(({ base: { overlay } }) => ({
  overlay,
}))(Room);
