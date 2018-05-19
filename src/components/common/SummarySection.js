import React, { Component } from 'react';
import SummaryNote from './SummaryNote';


class SummarySection extends Component {
  render() {
    const { section, notes } = this.props;
    return (
      <div style={styles.sectionSummaryContainerStyle}>
        <h3 className="title is-3">{`${section.number}. ${section.name}`}</h3>
        <div>
          {!notes
            ? <span style={styles.noNoteWarningStyle}>No note for this section :(</span>
            : notes.map(note => <SummaryNote note={note} key={note._id} />)}
        </div>
      </div>
    );
  }
}

const styles = {
  sectionSummaryContainerStyle: {
    marginBottom: '60px',
  },
  noNoteWarningStyle: {
    marginLeft: '3%',
  },
};

export default SummarySection;
