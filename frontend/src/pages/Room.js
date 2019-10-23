import React from 'react';
import { HeaderTemplate, ContentTemplate, ChatTemplate } from 'components';
import RoomTemplate from 'components/room/RoomTemplate';
import ChatInput from 'components/room/ChatInput';
import ChatMessages from 'components/room/ChatMessages';

const Room = () => {
  return (
    <RoomTemplate>
      <HeaderTemplate>
        <div className="h-left">
          <button type="button" id="btn-leave">
            <i className="material-icons">chevron_left</i>
          </button>
        </div>
        <div className="h-center">Chat Name</div>
        <div className="h-right">
          <button type="button" id="btn-people">
            <span className="count">7</span>
            <i className="material-icons">people</i>
          </button>
        </div>
      </HeaderTemplate>
      <ContentTemplate>
        <ChatTemplate>
          <section>
            <ChatMessages />
          </section>
          <section>
            <ChatInput />
          </section>
        </ChatTemplate>
      </ContentTemplate>
    </RoomTemplate>
  );
};

export default Room;
