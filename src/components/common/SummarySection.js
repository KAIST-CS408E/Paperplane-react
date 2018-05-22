import React, { Component } from 'react';
import SummaryNote from './SummaryNote';


class SummarySection extends Component {
  constructor(props) {
    super(props);

    this.state = {
      summary: null,
    };
  }

  componentWillMount() {
    const { notes } = this.props;
    /* TODO: there can be more than one summary. Needs proper handling. */
    const summary = notes.filter(note => note.isSummary)[0];
    this.setState({ summary });
  }

  getContents = (note) => {
    const figureRegex = /(?!<a class="embed-F\d+">)fig\.?(?:ure)?\s*(\d+)(?!<\/a>)/gi;
    const equationRegex = /(?!<a class="embed-E\d+">)eq\.?(?:uation)?\s*(\d+)(?!<\/a>)/gi;

    let contents = [];
    let match;
    while (true) {
      match = figureRegex.exec(note.content);
      if (!match) break;
      const [ , figureNumber ] = match;
      const content = this.props.paper.figures.filter(figure => figure.number === `F${figureNumber}`)[0];
      contents.push(content);
    }

    while (true) {
      match = equationRegex.exec(note.content);
      if (!match) break;
      const [ , equationNumber ] = match;
      const content = this.props.paper.equations.filter(equation => equation.number === `E${equationNumber}`)[0];
      contents.push(content);
    }

    return contents;
  };

  render() {
    const { section, notes } = this.props;
    const { summary } = this.state;
    const sectionNoteList = !notes ? null : notes.map(note => <SummaryNote note={note} contents={this.getContents(note)} key={note._id} />);
    const sectionSummary = !summary ? null : <SummaryNote note={summary} contents={this.getContents(summary)} />;
    return (
      <div style={styles.sectionSummaryContainerStyle}>
        <h3 className="title is-3">{`${section.number}. ${section.name}`}</h3>
        <div>
          {notes.length === 0 && !summary
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
