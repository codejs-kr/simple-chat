import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { HeaderTemplate, ContentTemplate } from 'components/layout';
import Profile from 'components/home/Profile';

class HomeContainer extends Component {
  constructor(props) {
    super(props);

    this.state = {};
  }

  handleUpdateNickName = (nickname) => {
    const { updateMyInfo } = this.props;

    updateMyInfo({
      nickname,
    });
  };

  handleUpdateProfileImage = (profileImage) => {
    const { updateMyInfo } = this.props;

    updateMyInfo({
      profileImage,
    });
  };

  render() {
    const { myInfo } = this.props;
    const { handleUpdateNickName, handleUpdateProfileImage } = this;

    return (
      <>
        <HeaderTemplate>
          <div className="h-center">Simple Chat</div>
        </HeaderTemplate>
        <ContentTemplate>
          <form>
            <Profile
              myInfo={myInfo}
              onUpdateNickName={handleUpdateNickName}
              onUpdateProfileImage={handleUpdateProfileImage}
            />

            <div id="button-wrap">
              <Link to="/room/public">
                <button type="submit" className="btn">
                  오픈채팅입장
                </button>
              </Link>
            </div>
          </form>
        </ContentTemplate>
      </>
    );
  }
}

export default connect(
  ({ base }) => ({
    myInfo: base.myInfo,
  }),
  ({ base: { updateMyInfo } }) => ({
    updateMyInfo,
  })
)(HomeContainer);
