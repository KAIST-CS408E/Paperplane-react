import React, { Component } from 'react';


class SectionSummaryForm extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isHidden: false,
    };
  }

  hideForm = () => {
    this.setState({ isHidden: true });
  };

  render() {
    return (
      <div className="card" style={{ ...styles.sectionSummaryFormStyle, display: this.state.isHidden ? 'none' : 'block' }}>
        <div className="card-content" style={styles.textAreaStyle}>
          <textarea className="textarea" placeholder="How about leaving a short summary for the previous section?" />
        </div>
        <div style={styles.buttonGroupStyle}>
          <button className="button is-success" style={styles.buttonStyle}>Submit!</button>
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
