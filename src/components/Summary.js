import React, { Component } from 'react';
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
    };
  }

  componentWillMount = () => {
    const { uid, paperId } = this.props.match.params;
    this.setState({
      uid,
      paperId,
    });

    axios.get(`${BASE_URL}/notes/?uid=${uid}&paperId=${paperId}`)
      .then((res) => {
        alert(res.data);
        this.setState({ notesBySection: res.data });
      })
      .catch((err) => {
        alert(err);
      });
  };

  render() {
    return (
      <div>
        {Object.keys(this.state.notesBySection).map((noteSection) => {
          const notesInSection = this.state.notesBySection[noteSection];
          return <SummarySection section={noteSection} notes={notesInSection} />
        })}
      </div>
    );
  }
}

export default Summary;
