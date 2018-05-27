import React, { Component } from 'react';
import Plane from 'react-icons/lib/fa/paper-plane';
import { withCookies } from 'react-cookie';

import NavBarItem from './NavBarItem';

class NavBar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      userID: '',
    }
    this.logout = this.logout.bind(this);
  }
  componentWillMount() {
    const { cookies } = this.props;
    const _id = cookies.get('_id');
    this.setState({userID: _id});
  }
  logout() {
    const { cookies } = this.props;
    cookies.remove('_id', { path: '/' });
  }
  render() {
    return (
      <div style={styles.navBarStyle}>
        <div style={styles.containerStyle}>
          <NavBarItem title to={this.state.userID ? '/home' : '/'}><Plane/>&nbsp;PAPERPLANE</NavBarItem>
          <div onClick={this.logout}>
            <NavBarItem to="/">LOGOUT</NavBarItem>
          </div>
          <NavBarItem to="/profile">Profile</NavBarItem>
          <div style={{ clear:'both' }} />
        </div>
      </div>
    )
  }
}

const styles = {
  navBarStyle : {
    backgroundColor: '#1453a5',
    position: 'fixed',
    width: '100%',
    zIndex: 1000,
  },
  containerStyle : {
    maxWidth: 1200,
    margin: 'auto',
    padding: '16px 0'
  },
};

export default withCookies(NavBar);