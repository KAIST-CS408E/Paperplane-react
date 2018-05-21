import React, { Component } from 'react';
import SummaryNote from './SummaryNote';


class SummarySection extends Component {
  render() {
    const { section, notes, summary } = this.props;
    const sectionNoteList = !notes ? null : notes.map(note => <SummaryNote note={note} key={note._id} isSummary={false} />);
    const sectionSummary = !summary ? null : <SummaryNote note={{ title: 'Summary', content: summary }} isSummary={true} />;
    return (
      <div style={styles.sectionSummaryContainerStyle}>
        <h3 className="title is-3">{`${section.number}. ${section.name}`}</h3>
        <div>
          {!notes && !summary
            ? <span style={styles.noContentWarningStyle}>Nothing to show for this section :(</span>
            : (
              <div>
                {sectionNoteList}
                {sectionNoteList && sectionSummary ? <div style={{ height: '30px' }} /> : null }
                {sectionSummary}
              </div>
            )
          }
        </div>
      </div>
    );
  }
}

const styles = {
  sectionSummaryContainerStyle: {
    marginBottom: '60px',
  },
  noContentWarningStyle: {
    marginLeft: '3%',
  },
};

export default SummarySection;
