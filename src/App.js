import React, { Component } from 'react';
import NavBar from './components/common/NavBar';
import { withRouter, Switch, Route, Redirect } from 'react-router-dom';
import Body from './components/Body';
import Login from './components/Login';
import Register from './components/Register';
import Profile from './components/Profile';
import Summary from './components/Summary';
import { CookiesProvider } from 'react-cookie';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }

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
    const { location } = this.props;
    const { pathname } = location;
    const isLogin = pathname === '/' || pathname === '/register';
    return (
      <CookiesProvider>
        <div className="App">
          { isLogin ? null: <NavBar /> }
          <div style={isLogin? null : { paddingTop: 63 }}>
          <Switch>
            <Route exact path="/" component={Login} />
            <Route exact path="/register" component={Register} />
            <Route exact path="/main" component={Body} />
            <Route exact path="/hi2" component={Body} />
            <Route exact path="/profile" component={Profile} />
            <Route exact path="/summary/:paperId" component={Summary} />
            <Redirect from="/" to="/" />
          </Switch>
          </div>
        </div>
      </CookiesProvider>
    );
  }
}

export default withRouter(App);
