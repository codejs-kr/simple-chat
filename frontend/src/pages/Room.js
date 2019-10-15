import React from 'react';
import { HeaderTemplate, ContentTemplate, ChatTemplate } from 'components';

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
          <section>body</section>
          <section>Bottom</section>
        </ChatTemplate>
      </ContentTemplate>
    </>
  );
};

export default Room;
