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
      paperId: '',
      notesBySection: {},
      paper: null,
    };
  }

  componentWillMount = () => {
    const { cookies } = this.props;
    const uid = cookies.get('_id');
    const { paperId } = this.props.match.params;
    this.setState({
      uid,
      paperId,
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

  render() {
    const { paper, notesBySection } = this.state;
    return (
      <div>
        {paper
          ? paper.sections.map(section => <SummarySection section={section} notes={notesBySection[section.number - 1]} />)
          : []
        }
      </div>
    );
  }
}

export default withCookies(Summary);
