import React, { Component } from 'react';
import axios from 'axios';
import { BASE_URL } from '../../constants';


class SectionSummaryForm extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isLoading: false,
      isSubmitted: false,
    };
  }

  createSummaryNote = () => {
    this.setState({ isLoading: true });

    const { uid, paperId, sectionNumber } = this.props;
    const section = sectionNumber - 1;
    axios.post(`${BASE_URL}notes`, {
      uid,
      paperId,
      section,
      isSummary: true,
      title: 'Summary',
      content: this.summaryInput.value,
    }).then((res) => {
      this.setState({
        isLoading: false,
        isSubmitted: true,
      });
      this.props.appendSummary(sectionNumber, res.data);
    }).catch(alert);
  };

  render() {
    return (
      <div className="card" style={styles.sectionSummaryFormStyle}>
        <div className="card-content" style={styles.textAreaStyle}>
          <textarea ref={elem => this.summaryInput = elem} className="textarea"
                    placeholder="How about leaving a short summary for the previous section?" />
        </div>
        <div style={styles.buttonGroupStyle}>
          <button className={`button is-primary${this.state.isLoading ? ' is-loading' : ''}`}
                  style={styles.buttonStyle} onClick={this.createSummaryNote}>
            Submit!
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
