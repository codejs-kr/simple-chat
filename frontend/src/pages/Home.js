import React from 'react';
import { HeaderTemplate } from 'components';
import PageTemplate from 'components/layout/PageTemplate';
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
