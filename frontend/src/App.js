import React, { Component, Fragment, Suspense } from 'react';
import { Route, Switch } from 'react-router-dom';
import Iphone from 'components/layout/Iphone';
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

  createBall = (count = 5) => {
    const { getRandomNumber } = this;
    let result = [];

    for (let i = 0; i < count; i++) {
      const top = getRandomNumber(0, 95);
      const left = getRandomNumber(0, 95);
      result.push(<span className="bg-ball" style={{ top: `${top}%`, left: `${left}%` }} />);
    }

    return result;
  };

  /**
   * Returns a random number between min (inclusive) and max (exclusive)
   */
  getRandomNumber(min, max) {
    return Math.random() * (max - min) + min;
  }

  render() {
    const { createBall } = this;
    return (
      <Fragment>
        <Iphone>
          <Room />
        </Iphone>
        {createBall(8)}
      </Fragment>
    );
  }
}

export default App;
