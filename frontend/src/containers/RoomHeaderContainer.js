import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { HeaderTemplate } from 'components/layout';

class RoomHeaderContainer extends Component {
  constructor(props) {
    super(props);

    this.state = {
      openedUserList: false,
    };
  }

  handleExit = async () => {
    const { history, roomName, myInfo, leave } = this.props;
    console.log('handleExit', this.props);

    await leave({
      roomName,
      myInfo,
    });
    history.goBack();
  };

  render() {
    const { users, roomName } = this.props;
    const userCount = users.length;

    return (
      <HeaderTemplate>
        <div className="h-left">
          <button type="button" id="btn-exit" onClick={this.handleExit}>
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

export default withRouter(
  connect(
    ({ base, room }) => ({
      myInfo: base.myInfo,
      users: room.users,
      roomName: room.name,
    }),
    ({ room: { leave } }) => ({
      leave,
    })
  )(RoomHeaderContainer)
);
