import React, { Component } from 'react';
import { connect } from 'react-redux';
import { ContentTemplate } from 'components/layout';
import ChatWrap from 'components/room/ChatWrap';
import ChatInput from 'components/room/ChatInput';
import ChatMessages from 'components/room/ChatMessages';

class RoomContentContainer extends Component {
  constructor(props) {
    super(props);

    this.state = {
      openedUserList: false,
    };
  }

  componentDidUpdate() {
    this.scrollTop();
  }

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
    messages: room.messages,
  }),
  ({ room: { send } }) => ({
    send,
  })
)(RoomContentContainer);
