import React, { Component } from 'react';
import { connect } from 'react-redux';
import { ContentTemplate, ChatTemplate } from 'components';
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
        <ChatTemplate>
          <section>
            <ChatMessages myInfo={myInfo} messages={messages} />
          </section>
          <section>
            <ChatInput onSend={send} />
          </section>
        </ChatTemplate>
      </ContentTemplate>
    );
  }
}

export default connect(
  ({ chat }) => ({
    myInfo: chat.myInfo,
    messages: chat.messages,
  }),
  ({ chat: { send } }) => ({
    send,
  })
)(RoomContentContainer);
