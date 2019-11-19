import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { HeaderTemplate } from 'components/layout';
import UserList from 'components/room/UserList';
import OutsideClicker from 'components/common/OutsideClicker';

class RoomHeaderContainer extends Component {
  handleExit = async () => {
    const { history, roomName, myInfo, leave } = this.props;
    const encodedRoomName = encodeURIComponent(roomName);
    // console.log('handleExit', this.props);

    await leave({
      roomName: encodedRoomName,
      myInfo,
    });
    history.goBack();
  };

  render() {
    const { users, roomName, isActiveUserList, toggleActiveUserList } = this.props;
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
          <button type="button" id="btn-people" onClick={toggleActiveUserList}>
            {isActiveUserList ? (
              <i className="material-icons">close</i>
            ) : (
              <>
                <span className="count">{userCount}</span>
                <i className="material-icons">people</i>
              </>
            )}
          </button>
        </div>

        <OutsideClicker onClick={() => isActiveUserList && toggleActiveUserList(false)}>
          <UserList isActive={isActiveUserList} users={users} />
        </OutsideClicker>
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
      isActiveUserList: room.isActiveUserList,
    }),
    ({ room: { leave, toggleActiveUserList } }) => ({
      leave,
      toggleActiveUserList,
    })
  )(RoomHeaderContainer)
);
