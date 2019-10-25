import React from 'react';
import { HeaderTemplate, ContentTemplate, ChatTemplate } from 'components';
import RoomTemplate from 'components/room/RoomTemplate';
import ChatInput from 'components/room/ChatInput';
import ChatMessages from 'components/room/ChatMessages';
import RoomHeaderContainer from 'containers/RoomHeaderContainer';

const Room = () => {
  return (
    <RoomTemplate>
      <RoomHeaderContainer />
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
