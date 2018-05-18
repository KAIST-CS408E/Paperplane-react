import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { withCookies } from 'react-cookie';
import axios from 'axios';
import { BASE_URL } from '../constants';


class Profile extends Component {
  constructor(props) {
    super(props);

    this.state = {
      uid: '',
      papers: [],
    };
  }

  componentWillMount = () => {
    const { cookies } = this.props;
    const uid = cookies.get('_id');
    this.setState({ uid });

    axios.get(`${BASE_URL}papers/read-by/${uid}`)
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
        {this.state.papers.map(paper => <Link to={`/summary/${paper._id}`} key={paper._id}>{paper.title}</Link>)}
      </div>
    );
  }
}

export default withCookies(Profile);
