import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { HeaderTemplate, ContentTemplate } from 'components/layout';
import Profile from 'components/home/Profile';
import utils from 'modules/utils';

class HomeContainer extends Component {
  constructor(props) {
    super(props);

    this.inputEl = React.createRef();
  }

  handleUpdateNickName = (nickname) => {
    const { updateMyInfo } = this.props;
    const inputEl = this.inputEl.current;
    inputEl.classList.remove('error');

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

  handleSubmit = async () => {
    const { history, myInfo } = this.props;
    const inputEl = this.inputEl.current;
    // console.log('handleSubmit', myInfo, history);

    if (!myInfo.nickname) {
      inputEl.classList.remove('error');
      await utils.delay(10);
      inputEl.classList.add('error');
      return false;
    }

    history.push('/room/public');
    return false;
  };

  render() {
    const { myInfo } = this.props;
    const { inputEl, handleUpdateNickName, handleUpdateProfileImage, handleSubmit } = this;

    return (
      <>
        <HeaderTemplate>
          <div className="h-center">Simple Chat</div>
        </HeaderTemplate>
        <ContentTemplate>
          <form onSubmit={handleSubmit}>
            <Profile
              inputEl={inputEl}
              myInfo={myInfo}
              onUpdateNickName={handleUpdateNickName}
              onUpdateProfileImage={handleUpdateProfileImage}
            />

            <div id="button-wrap">
              <button type="submit" className="btn">
                오픈채팅입장
              </button>
            </div>
          </form>
        </ContentTemplate>
      </>
    );
  }
}

export default withRouter(
  connect(
    ({ base }) => ({
      myInfo: base.myInfo,
    }),
    ({ base: { updateMyInfo } }) => ({
      updateMyInfo,
    })
  )(HomeContainer)
);
