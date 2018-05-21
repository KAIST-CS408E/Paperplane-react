import React, { Component } from 'react';
import skyPath from '../static/el_capitan_bg.jpg';
import TextArea from 'react-textarea-autosize';
import axios from 'axios';
import { REGISTER_URL } from '../constants';
import Plane from 'react-icons/lib/fa/paper-plane';



class Register extends Component {
  constructor(props) {
    super(props);
    this.state = {
      id: '',
      nickname: '',
      password: '',
    };
    this.registerUser = this.registerUser.bind(this);
  }

  componentWillMount() {
  }

  registerUser() {
    const { id, nickname, password } = this.state;
    axios.post(REGISTER_URL, { id, nickname, password })
      .then((m) => this.props.history.push('/'))
      .catch((e) => console.log(e));
  }

  render() {
    return (
        <div style={styles.backgroundStyle}>
          <div style={styles.loginStyle}>
            <div style={styles.titleStyle}>
              <Plane/>
              <div style={{marginLeft: '10px'}}>Paperplane</div>
            </div>
            <input
                style={styles.titleTextArea}
                type="text" value={this.state.id}
                placeholder={'Username'}
                onChange={event => this.setState({ id: event.target.value })} />
            <input
                style={styles.titleTextArea}
                type="text" value={this.state.nickname}
                placeholder={'Nickname'}
                onChange={event => this.setState({ nickname: event.target.value })} />
            <input
                style={styles.titleTextArea}
                type="password" value={this.state.password}
                placeholder={'Password'}
                onChange={event => this.setState({ password: event.target.value })} />
            <div style={styles.buttonStyle} onClick={this.registerUser}>
              Register
            </div>
          </div>
        </div>
    );
  }
}

const styles = {
  backgroundStyle: {
    display: 'flex',
    height: '100vh',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundImage: `url(${skyPath})`,
    backgroundRepeat: 'no-repeat',
    backgroundSize: '100% 100%',
  },
  titleTextArea: {
    borderWidth: '0px',
    borderBottomWidth: '1px',
    borderBottomColor: '#efefef',
    marginBottom: '5px',
    padding: '0.3rem',
    fontSize: '1.2rem',
    fontWeight: 400,
    lineHeight: '100%',
    width: '10rem',
    outline: 'none',
    backgroundColor: 'rgb(255,255,255,0)',
  },
  buttonStyle: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#8B008B',
    borderRadius: '1.5rem',
    height: '15%',
    fontWeight: 900,
    fontSize: '1.3rem',
    width: '10rem',
    marginTop: '5px',
    cursor: 'pointer',
    color: '#efefef',
  },
  loginStyle: {
    height: '23%',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: '1.5rem',
    backgroundColor: 'rgb(255,255,255,0.5)',
    width: '35%',
  },
  titleStyle: {
    fontSize: '1.2rem',
    fontWeight: 800,
    width: '55%',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
  }
};

export default Register;