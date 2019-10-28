import React, { Component, Fragment, Suspense } from 'react';
import { Route, Switch } from 'react-router-dom';
import { Iphone, Balls } from 'components/layout';
import Home from 'pages/Home';
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
          <Switch>
            <Route exact path="/" component={Home} />
            <Route path="/room" component={Room} />
            <Route path="/room/:name" component={Room} />
            {/* <Route component={NotFound} /> */}
          </Switch>
        </Iphone>
        <Balls />
      </Fragment>
    );
  }
}

export default App;
