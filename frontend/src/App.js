import React, { Component, Fragment, Suspense } from 'react';
import { Route, Switch } from 'react-router-dom';
import Iphone from 'components/layout/Iphone';
import utils from 'helpers/utils';
import 'assets/scss/main.scss';

class App extends Component {
  constructor(props) {
    super(props);

    this.body = document.querySelector('body');
    this.init();
  }

  init = () => {
    this.checkEnv();
  };

  checkEnv = () => {
    this.body.classList.add(utils.isMobile ? 'mobile' : 'pc');
  };

  render() {
    return (
      <Fragment>
        <div id="wrap">
          <Iphone>안녕하세요</Iphone>
        </div>
      </Fragment>
    );
  }
}

export default App;
