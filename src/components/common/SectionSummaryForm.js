import React, { Component } from 'react';
import axios from 'axios';
import { BASE_URL } from '../../constants';


class SectionSummaryForm extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isUpdating: false,
      originalSummary: '',
      summary: '',
    };
  }

  componentWillMount() {
    this.setState({
      summary: this.props.summary,
      originalSummary: this.props.summary.summary,
    })
  }

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
    this.setState({ isUpdating: true });
    axios.put(`${BASE_URL}summaries/${this.state.summary._id}`, { summary: this.state.summary.summary })
      .then(() => {
        this.setState({
          originalSummary: this.state.summary.summary,
          isUpdating: false,
        });
      })
      .catch(alert);
  };

  isSummaryUpdated = () => {
    return this.state.summary.summary !== this.state.originalSummary;
  };

  render() {
    return (
      <div className="card" style={styles.sectionSummaryFormStyle}>
        <div className="card-content" style={styles.textAreaStyle}>
          <textarea className="textarea" placeholder="How about leaving a short summary for the previous section?"
                    value={this.state.summary.summary}
                    onChange={this.updateLocalSummary} />
        </div>
        <div style={styles.buttonGroupStyle}>
          <button className={`button is-primary${this.state.isUpdating ? ' is-loading' : ''}`}
                  disabled={!this.isSummaryUpdated()}
                  style={styles.buttonStyle} onClick={this.updateSummary}>
            {this.isSummaryUpdated() ? 'Save!' : 'Saved!'}
          </button>
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
  },
};

export default SectionSummaryForm;
