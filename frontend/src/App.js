import React, { Component, Fragment, Suspense } from 'react';
import { Route, Switch } from 'react-router-dom';
import Iphone from 'components/layout/Iphone';
import Balls from 'components/layout/Balls';
import Room from 'pages/Room';

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
        <Iphone>
          <Room />
        </Iphone>
        <Balls />
      </Fragment>
    );
  }
}

export default App;
