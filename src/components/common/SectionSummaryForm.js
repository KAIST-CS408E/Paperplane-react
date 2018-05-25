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
        {
          this.state.isSubmitted
            ? <span style={styles.submittedTextStyle}>Summary submitted! You can check your summary at the right.</span>
            : (
              <div>
                <div className="card-content" style={styles.summaryFormStyle}>
                  <h4 className="title is-4" style={styles.summaryFormTitleStyle}>Section Summary</h4>
                  <textarea ref={elem => this.summaryInput = elem} className="textarea"
                            placeholder="How about leaving a short summary for the previous section?" />
                </div>
                <div style={styles.buttonGroupStyle}>
                  <button className={`button is-info${this.state.isLoading ? ' is-loading' : ''}`}
                          style={styles.buttonStyle} onClick={this.createSummaryNote}>
                    Submit!
                  </button>
                  <div style={{ clear: 'both' }} />
                </div>
              </div>
            )
        }
      </div>
    );
  }
}

const styles = {
  sectionSummaryFormStyle: {
    margin: '60px 0 80px 0',
    // height: '201px',
    lineHeight: '201px',
    textAlign: 'center',
  },
  submittedTextStyle: {
    verticalAlign: 'middle',
  },
  summaryFormStyle: {
    padding: '15px',
  },
  summaryFormTitleStyle: {
    margin: '0 0 15px',
    fontFamily: 'BlinkMacSystemFont, -apple-system, "Segoe UI", "Roboto", "Oxygen", "Ubuntu", "Cantarell", "Fira Sans", "Droid Sans", "Helvetica Neue", "Helvetica", "Arial", sans-serif',
    fontStyle: 'normal',
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
