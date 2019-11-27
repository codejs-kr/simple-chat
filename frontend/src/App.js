import React, { Component, Fragment } from 'react';
import { Route, Switch } from 'react-router-dom';
import { Iphone, Balls, ThemeChanger } from 'components/layout';
import Home from 'pages/Home';
import Room from 'pages/Room';
import utils from 'modules/utils';
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
        <ThemeChanger />
      </Fragment>
    );
  }
}

export default App;
