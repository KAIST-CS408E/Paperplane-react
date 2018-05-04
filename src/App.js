import React, { Component } from 'react';
import NavBar from './components/common/NavBar';
import { withRouter, Switch, Route, Redirect } from 'react-router-dom';
import Body from './components/Body';
class App extends Component {
  componentDidUpdate(prevProps) {
    const { history, location } = this.props;
    if (
      history.action === 'PUSH' &&
      location.pathname !== prevProps.location.pathname
    ) {
      window.scrollTo(0, 0);
    }
  }

  render() {
    console.log(this.props);
    return (
        <div className="App">
          <NavBar />
          <div style={{ padding: 57 }}>
            <Switch>
              <Route exact path="/" component={Body} />
              <Route exact path="/hi1" component={Body} />
              <Route exact path="/hi2" component={Body} />
              <Redirect from="/" to="/" />
            </Switch>
          </div>
        </div>
    );
  }
}

export default withRouter(App);
