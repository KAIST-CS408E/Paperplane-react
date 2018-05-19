import React, { Component } from 'react';
import { withCookies } from 'react-cookie';
import axios from 'axios';
import { BASE_URL } from '../constants';
import SummarySection from './common/SummarySection';


class Summary extends Component {
  constructor(props) {
    super(props);

    this.state = {
      uid: '',
      id: '',
      nickname: '',
      paperId: '',
      notesBySection: {},
      paper: null,
    };
  }

  componentWillMount = () => {
    const { cookies } = this.props;
    const uid = cookies.get('_id');
    const id = cookies.get('id');
    const nickname = cookies.get('nickname');
    const { paperId } = this.props.match.params;
    this.setState({
      uid,
      paperId,
      id,
      nickname,
    });

    axios.get(`${BASE_URL}notes/?uid=${uid}&paperId=${paperId}`)
      .then((res) => {
        this.setState({ notesBySection: res.data });
      })
      .catch(alert);

    axios.get(`${BASE_URL}papers/${paperId}`)
      .then((res) => {
        this.setState({ paper: res.data });
      })
      .catch(alert)
  };

  componentDidUpdate = () => {
    /* TODO: add onClickListeners to show modals for images & figures. */
  };

  render() {
    const { paper, notesBySection } = this.state;
    return !paper
      ? <div></div>
      : (
        <div style={styles.summaryContainerStyle}>
          <h1 className="title is-2" style={styles.summaryHeaderStyle}>
            {paper ? paper.title : ''}
            <span style={styles.authorStyle}>{`Summary by ${this.state.nickname} (${this.state.id})`}</span>
          </h1>
          {paper.sections.map(section => <SummarySection section={section} notes={notesBySection[section.number - 1]} />)}
        </div>
      );
  }
}

const styles = {
  summaryContainerStyle: {
    width: '60vw',
    margin: 'auto',
    paddingTop: '60px',
  },
  summaryHeaderStyle: {
    marginBottom: '60px',
  },
  authorStyle: {
    float: 'right',
    fontWeight: 'normal',
    fontSize: '20px',
    marginTop: '16px',
  },
};

export default withCookies(Summary);
