import React, { Component } from 'react';
import { connect } from 'react-redux';
import { ContentTemplate } from 'components/layout';
import ChatWrap from 'components/room/ChatWrap';
import ChatInput from 'components/room/ChatInput';
import ChatMessages from 'components/room/ChatMessages';
import socket from 'modules/socket';

class RoomContentContainer extends Component {
  constructor(props) {
    super(props);

    this.state = {
      newMessageCount: 0,
      isUserScroll: false,
    };

    this.bindSocketEvents();
    this.join();
  }

  componentDidUpdate() {
    this.scrollTop();
  }

  componentWillUnmount() {
    socket.removeAllListeners('join');
    socket.removeAllListeners('leave');
    socket.removeAllListeners('message');
  }

  onJoin = (data) => {
    console.log('socket onJoin', data);
    const { addUser, addSystemMessage } = this.props;
    const { userInfo } = data;

    addUser(userInfo);
    addSystemMessage({
      ...userInfo,
      message: `${userInfo.nickname}님이 입장했습니다.`,
    });
  };

  onLeave = (data) => {
    console.log('socket onLeave', data);
    const { removeUser, addSystemMessage } = this.props;
    const { userInfo } = data;

    removeUser(userInfo);
    addSystemMessage({
      ...userInfo,
      message: `${userInfo.nickname}님이 퇴장했습니다.`,
    });
  };

  onMessage = (data) => {
    console.log('socket onMessage', data);
    const { addUserMessage } = this.props;

    addUserMessage(data);
  };

  bindSocketEvents = () => {
    console.log('bindSocketEvents');
    const { onJoin, onLeave, onMessage } = this;

    socket.on('join', onJoin);
    socket.on('leave', onLeave);
    socket.on('message', onMessage);
  };

  join = () => {
    const { roomName, myInfo } = this.props;
    const encodedRoomName = encodeURIComponent(roomName);

    socket.emit('join', encodedRoomName, myInfo);
  };

  scrollTop = () => {
    const targetEl = document.querySelector('#chat section');

    return (targetEl.scrollTop = targetEl.scrollHeight);
  };

  render() {
    const { myInfo, messages, send } = this.props;

    return (
      <ContentTemplate>
        <ChatWrap>
          <section>
            <ChatMessages myInfo={myInfo} messages={messages} />
          </section>
          <section>
            <ChatInput onSend={send} />
          </section>
        </ChatWrap>
      </ContentTemplate>
    );
  }
}

export default connect(
  ({ base, room }) => ({
    myInfo: base.myInfo,
    roomName: room.name,
    messages: room.messages,
  }),
  ({ room: { send, addUser, removeUser, addUserMessage, addSystemMessage } }) => ({
    send,
    addUser,
    removeUser,
    addUserMessage,
    addSystemMessage,
  })
)(RoomContentContainer);
