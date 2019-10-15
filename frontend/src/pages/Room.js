import React from 'react';
import { HeaderTemplate, ContentTemplate, ChatTemplate } from 'components';

const Room = () => {
  return (
    <>
      <HeaderTemplate>
        <div className="h-left">left</div>
        <div className="h-center">Chat Name</div>
        <div className="h-right">right</div>
      </HeaderTemplate>
      <ContentTemplate>
        <ChatTemplate>
          <section>body</section>
          <section>Bottom</section>
        </ChatTemplate>
      </ContentTemplate>
    </>
  );
};

export default Room;
