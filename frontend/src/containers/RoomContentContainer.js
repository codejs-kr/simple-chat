import React, { Component } from 'react';
import { connect } from 'react-redux';
import { ContentTemplate } from 'components/layout';
import ChatWrap from 'components/room/ChatWrap';
import ChatInput from 'components/room/ChatInput';
import ChatMessages from 'components/room/ChatMessages';
import ScrollDownButton from 'components/room/ScrollDownButton';
import socket from 'modules/socket';
import _ from 'lodash';

class RoomContentContainer extends Component {
  constructor(props) {
    super(props);

    this.state = {
      scrolled: false, // 내가 스크롤했을땐 신규 메시지에 의한 scrollDown을 멈춘다.
    };

    this.bindSocketEvents();
    this.join();
  }

  componentDidUpdate() {
    const { scrolled } = this.state;

    if (!scrolled) {
      this.scrollDown();
    }
  }

  componentWillUnmount() {
    socket.removeAllListeners('join');
    socket.removeAllListeners('leave');
    socket.removeAllListeners('message');
  }

  onJoin = (data) => {
    console.log('socket onJoin', data);
    const { myInfo, addUser, addSystemMessage } = this.props;
    const { userInfo, attendees } = data;
    const isMine = myInfo.id === userInfo.id;

    // 방에 이미 참여한 사람들의 정보를 셋업한다.
    if (isMine) {
      for (const id in attendees) {
        addUser(attendees[id]);
      }
    } else {
      addUser(userInfo);
      addSystemMessage({
        ...userInfo,
        message: `${userInfo.nickname}님이 입장했습니다.`,
      });
    }
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

  onScroll = (e) => {
    console.log('onScroll', e);
    const targetEl = document.querySelector('#chat section');
    const scrolled = targetEl.scrollHeight !== targetEl.clientHeight + targetEl.scrollTop;

    this.setState({
      scrolled,
    });

    console.log('onScroll scrolled', scrolled);
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

  scrollDown = () => {
    const targetEl = document.querySelector('#chat section');

    return (targetEl.scrollTop = targetEl.scrollHeight);
  };

  handleScrollButton = () => {
    this.scrollDown();
    this.setState({
      scrolled: false,
    });
  };

  render() {
    const { myInfo, messages, send } = this.props;
    const { scrolled } = this.state;
    const { onScroll, handleScrollButton } = this;

    return (
      <ContentTemplate>
        <ChatWrap>
          <section onScroll={_.debounce(onScroll, 300)}>
            <ChatMessages myInfo={myInfo} messages={messages} />
            {scrolled && <ScrollDownButton onClick={handleScrollButton} />}
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
