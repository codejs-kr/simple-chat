import React, { Component } from 'react';
import { connect } from 'react-redux';
import { HeaderTemplate } from 'components/layout';

class RoomHeaderContainer extends Component {
  constructor(props) {
    super(props);

    this.state = {
      openedUserList: false,
    };
  }

  render() {
    const { users, roomName } = this.props;
    const userCount = users.length;

    return (
      <HeaderTemplate>
        <div className="h-left">
          <button type="button" id="btn-leave">
            <i className="material-icons">chevron_left</i>
          </button>
        </div>
        <div className="h-center">{roomName}</div>
        <div className="h-right">
          <button type="button" id="btn-people">
            <span className="count">{userCount}</span>
            <i className="material-icons">people</i>
          </button>
        </div>
      </HeaderTemplate>
    );
  }
}

export default connect(
  ({ room }) => ({
    users: room.users,
    roomName: room.roomName,
  }),
  () => {}
)(RoomHeaderContainer);
