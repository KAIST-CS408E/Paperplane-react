import React, { Component } from 'react';
import skyPath from '../static/el_capitan_bg.jpg';
import TextArea from 'react-textarea-autosize';
import axios from 'axios';
import {LOGIN_URL} from "../constants";
import {Link} from 'react-router-dom';
import { withCookies, Cookies } from 'react-cookie';
import Plane from 'react-icons/lib/fa/paper-plane';


class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      id: '',
      password: '',
    };
    this.loginUser = this.loginUser.bind(this);
  }

  componentWillMount() {
  }

  loginUser(e) {
    const { id, password } = this.state;
    const { cookies } = this.props;
    axios.post(LOGIN_URL, {id, password})
      .then((res) => {
        const {id, nickname, _id} = res.data;
        cookies.set('id', id, { path: '/' });
        cookies.set('nickname', nickname, { path: '/' });
        cookies.set('_id', _id, { path: '/' });
        this.props.history.replace('/home');
      })
      .catch((e) => console.log(e));
    e.preventDefault();
  }

  render() {
    return (
        <section style={{backgroundColor: '#F2F6FA'}} class="hero is-success is-fullheight">
          <div class="hero-body">
            <div class="container has-text-centered">
              <div class="column is-4 is-offset-4">
                <h3 class="title has-text-grey">Login</h3>
                <p class="subtitle has-text-grey">Please login to proceed.</p>
                <div class="box">
                  <form onSubmit={(e) => this.loginUser(e)}>
                    <div class="field">
                      <div class="control">
                        <input class="input"
                               placeholder="Username"
                               onChange={event => this.setState({ id: event.target.value })}
                               value={this.state.id} />
                      </div>
                    </div>

                    <div class="field">
                      <div class="control">
                        <input class="input"
                               type="password"
                               placeholder="Password"
                               onChange={event => this.setState({ password: event.target.value })}
                               value={this.state.password} />
                      </div>
                    </div>
                    <button class="button is-block is-info is-large is-fullwidth" onClick={this.loginUser}>Login</button>


                  </form>
                </div>
                <p class="has-text-grey">
                  New to us?
                  <a>
                    <Link to='/register' style={{marginLeft: '5px'}}>
                      Sign Up
                    </Link>
                  </a>
                </p>
              </div>
            </div>
          </div>
        </section>
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
    backgroundRepeat: 'no-repeat',
    backgroundSize: '100% 100%',
  },
  loginInputStyle: {
    height: '2.5rem',
    fontSize: '1.2rem',
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
    width: '50%',
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
    fontSize: '1.2rem',
    width: '10rem',
    marginTop: '5px',
    cursor: 'pointer',
    color: '#efefef',
  },
  loginBoxStyle: {
    height: '23%',

    width: '35%',
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

export default withCookies(Login);