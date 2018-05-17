import React, { Component } from 'react';
import { BASE_URL } from '../constants';
import axios from 'axios';


class Profile extends Component {
  constructor(props) {
    super(props);

    this.state = {
      uid: '',
      papers: [],
    };
  }

  componentWillMount = () => {
    const uid = this.props.match.params.uid;
    this.setState({ uid });
    axios.get(`${BASE_URL}/papers/read-by/${uid}`)
      .then((res) => {
        this.setState({ papers: res.data });
      })
      .catch((err) => {
        alert(err);
      });
  };

  render() {
    return (
      <div>
        {this.state.papers}
      </div>
    );
  }
}

export default Profile;
