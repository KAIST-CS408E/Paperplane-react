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
      id: '',
      nickname: '',
    };
  }

  componentWillMount = () => {
    const { cookies } = this.props;
    const uid = cookies.get('_id');
    const id = cookies.get('id');
    const nickname = cookies.get('nickname');
    this.setState({
      uid,
      id,
      nickname,
    });

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
      <div style={styles.profileContainerStyle}>
        <h2 className="title is-2">{`${this.state.nickname} (${this.state.id})`}</h2>
        <p className="title is-3">Notes:</p>
        <div className="content">
          <ul style={styles.paperListStyle}>
            {this.state.papers.map(paper => <li><Link to={`/summary/${paper._id}`} key={paper._id}>{paper.title}</Link></li>)}
          </ul>
        </div>
      </div>
    );
  }
}

const styles = {
  profileContainerStyle: {
    width: '60vw',
    margin: 'auto',
    paddingTop: '20px',
  },
  paperListStyle: {
    fontSize: '20px',
  },
};

export default withCookies(Profile);
