import React, { Component } from 'react';
import axios from 'axios';
import { BASE_URL } from '../../constants';


class SectionSummaryForm extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isHidden: false,
      summary: '',
    };
  }

  componentWillMount() {
    this.setState({ summary: this.props.summary })
  }

  hideForm = () => {
    this.setState({ isHidden: true });
  };

  updateLocalSummary = (e) => {
    const summary = e.target.value;
    this.setState((prevState) => (
      {
        summary: {
          ...prevState.summary,
          summary,
        },
      }
    ));
  };

  updateSummary = () => {
    axios.put(`${BASE_URL}summaries/${this.state.summary._id}`, { summary: this.state.summary.summary })
  };

  render() {
    return (
      <div className="card" style={{ ...styles.sectionSummaryFormStyle, display: this.state.isHidden ? 'none' : 'block' }}>
        <div className="card-content" style={styles.textAreaStyle}>
          <textarea className="textarea" placeholder="How about leaving a short summary for the previous section?"
                    value={this.state.summary.summary}
                    onChange={this.updateLocalSummary} />
        </div>
        <div style={styles.buttonGroupStyle}>
          <button className="button is-success" style={styles.buttonStyle} onClick={this.updateSummary}>Save!</button>
          <button className="button" style={styles.buttonStyle} onClick={this.hideForm}>Hide</button>
          <div style={{ clear: 'both' }} />
        </div>
      </div>
    );
  }
}

const styles = {
  sectionSummaryFormStyle: {
    margin: '100px 0 200px 0',
  },
  textAreaStyle: {
    padding: '15px',
  },
  buttonGroupStyle: {
    display: 'block',
    padding: '0 15px 15px',
  },
  buttonStyle: {
    float: 'right',
    marginLeft: '15px',
  },
};

export default SectionSummaryForm;
