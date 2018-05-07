import React, { Component } from 'react';
import NavBar from './components/common/NavBar';
import { withRouter, Switch, Route, Redirect } from 'react-router-dom';
import Body from './components/Body';
import Login from './components/Login';
import Register from './components/Register';

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
      <div className="App">
        { isLogin ? null: <NavBar /> }
        <div style={isLogin? null : { paddingTop: 57 }}>
        <Switch>
          <Route exact path="/" component={Login} />
            <Route exact path="/register" component={Register} />
            <Route exact path="/main" component={Body} />
            <Route exact path="/hi2" component={Body} />
            <Redirect from="/" to="/" />
        </Switch>
        </div>
      </div>
    );
  }
}

export default withRouter(App);
