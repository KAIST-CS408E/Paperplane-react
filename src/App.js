import React, { Component } from 'react';
import NavBar from './components/common/NavBar';
import { withRouter, Switch, Route, Redirect } from 'react-router-dom';
import Body from './components/Body';
import PaperList from './components/PaperList';
import NoteList from './components/NoteList';
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
            <Route exact path="/home" component={PaperList} />
            <Route exact path="/read-paper/:paperId" component={Body} />
            <Route exact path="/blog-post-on-paper/:paperId" component={NoteList} />
            <Route exact path="/profile" component={Profile} />
            <Route exact path="/summary/:paperId/:userId" component={Summary} />
            <Redirect from="/" to="/home" />
          </Switch>
          </div>
        </div>
      </CookiesProvider>
    );
  }
}

export default withRouter(App);
