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

  registerUser(e) {
    const { id, nickname, password } = this.state;
    axios.post(REGISTER_URL, { id, nickname, password })
      .then((m) => this.props.history.push('/'))
      .catch((e) => console.log(e));
    e.preventDefault();
  }

  render() {
    return (
        <section style={{backgroundColor: '#F2F6FA'}} class="hero is-success is-fullheight">
          <div class="hero-body">
            <div class="container has-text-centered">
              <div class="column is-4 is-offset-4">
                <h3 class="title has-text-grey">Register</h3>
                <p class="subtitle has-text-grey">Join Paperplane Now.</p>
                <div class="box">
                  <form onSubmit={(e) => this.registerUser(e)}>
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
                               placeholder="Nickname"
                               onChange={event => this.setState({ nickname: event.target.value })}
                               value={this.state.nickname} />
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
                    <button class="button is-block is-info is-large is-fullwidth">Register</button>


                  </form>
                </div>
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