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

  bindSocketEvents = () => {
    console.log('bindSocketEvents');
    const { addMessage } = this.props;

    socket.on('join', (data) => {
      console.log('socket join', data);
    });

    socket.on('leave', (data) => {
      console.log('socket leave', data);
    });

    socket.on('message', (data) => {
      console.log('socket message', data);
      addMessage(data);
    });
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
  ({ room: { send, addMessage } }) => ({
    send,
    addMessage,
  })
)(RoomContentContainer);
