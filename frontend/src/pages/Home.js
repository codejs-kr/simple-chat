import React from 'react';
import { PageTemplate } from 'components/layout';
import HomeContainer from 'containers/HomeContainer';

const Home = () => {
  return (
    <PageTemplate name="home">
      <HomeContainer />
    </PageTemplate>
  );
};

export default Home;
