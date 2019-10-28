import React from 'react';
import { HeaderTemplate, PageTemplate } from 'components/layout';
import HomeContentContainer from 'containers/HomeContentContainer';

const Home = () => {
  return (
    <PageTemplate name="home">
      <HeaderTemplate>
        <div className="h-center">Simple Chat</div>
      </HeaderTemplate>
      <HomeContentContainer />
    </PageTemplate>
  );
};

export default Home;
