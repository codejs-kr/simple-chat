import React from 'react';
import { Link } from 'react-router-dom';
import { HeaderTemplate, ContentTemplate } from 'components';

import RoomTemplate from 'components/room/RoomTemplate';

const Home = () => {
  return (
    <RoomTemplate>
      <HeaderTemplate>
        <div className="h-center">Home</div>
      </HeaderTemplate>
      <ContentTemplate>
        <Link to="/room/apple">Room</Link>
      </ContentTemplate>
    </RoomTemplate>
  );
};

export default Home;
