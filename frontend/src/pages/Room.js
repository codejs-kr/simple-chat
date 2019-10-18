import React from 'react';
import { HeaderTemplate, ContentTemplate, ChatTemplate } from 'components';
import ChatInput from 'components/room/ChatInput';

import ChatMessages from 'components/room/ChatMessages';

const Room = () => {
  return (
    <>
      <HeaderTemplate>
        <div className="h-left">나가기</div>
        <div className="h-center">Chat Name</div>
        <div className="h-right">Count</div>
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
    </>
  );
};

export default Room;
