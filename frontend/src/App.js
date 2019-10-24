import React, { Component, Fragment, Suspense } from 'react';
import { Route, Switch } from 'react-router-dom';
import Iphone from 'components/layout/Iphone';
import Balls from 'components/layout/Balls';
import Home from 'pages/Home';
import Room from 'pages/Room';
import utils from 'helpers/utils';

import { connect } from 'react-redux';
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
          <Switch>
            <Route exact path="/" component={Home} />
            <Route path="/room" component={Room} />
            <Route path="/room/:name" component={Room} />
            {/* <Route component={NotFound} /> */}
          </Switch>
        </Iphone>
        <Balls />
        count: {this.props.count}
        <button onClick={this.props.increment}>+</button>
        <button onClick={this.props.incrementAsync}>+1</button>
      </Fragment>
    );
  }
}

// export default App;
export default connect(
  ({ count }) => ({
    count,
  }),
  ({ count: { increment, incrementAsync } }) => ({
    increment: () => increment(1),
    incrementAsync: () => incrementAsync(1),
  })
)(App);
