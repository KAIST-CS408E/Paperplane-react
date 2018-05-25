import React, { Component } from 'react';
import { withCookies } from 'react-cookie';
import axios from 'axios';
import { BASE_URL } from '../constants';
import SummaryListItemCard from './common/SummaryListItemCard';


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
        <h2 className="title is-2" style={styles.profileTitleStyle}>My Notes</h2>
        {this.state.papers.map(paper => <SummaryListItemCard uid={this.state.uid} paperId={paper._id} paperTitle={paper.title} />)}
      </div>
    );
  }
}

const styles = {
  profileContainerStyle: {
    width: '60vw',
    margin: '60px auto 0 auto',
    paddingTop: '20px',
  },
  profileTitleStyle: {
    textAlign: 'center',
    marginBottom: '40px',
  },
};

export default withCookies(Profile);
