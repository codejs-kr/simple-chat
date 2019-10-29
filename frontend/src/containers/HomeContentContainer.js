import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { ContentTemplate } from 'components/layout';
import Profile from 'components/home/Profile';

class HomeContentContainer extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    const { myInfo } = this.props;

    return (
      <ContentTemplate>
        <Profile myInfo={myInfo} />

        <div id="button-wrap">
          <Link to="/room/public">
            <button type="button">오픈채팅입장</button>
          </Link>
        </div>
      </ContentTemplate>
    );
  }
}

export default connect(
  ({ base }) => ({
    myInfo: base.myInfo,
  }),
  ({ base: { updateMyinfo } }) => ({
    updateMyinfo,
  })
)(HomeContentContainer);
