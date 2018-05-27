import React, { Component } from 'react';
import SummaryNote from './SummaryNote';


class SummarySection extends Component {
  constructor(props) {
    super(props);

    this.state = {
      notes: [],
      summary: null,
    };
  }

  componentWillMount() {
    const { notes } = this.props;
    /* TODO: there can be more than one summary. Needs proper handling. */
    const pureNotes = notes.filter(note => !note.isSummary);
    const summary = notes.filter(note => note.isSummary)[0];
    this.setState({
      notes: pureNotes,
      summary,
    });
  }

  componentWillUpdate() {
    /* Reset content appearance flag. */
    const { paper: { figures, equations } } = this.props;
    const isFigureEmbeded = figures.reduce((flags, figure) => (
      {
        ...flags,
        [figure.number]: false,
      }
    ));
    const isEquationsEmbeded = equations.reduce((flags, equation) => (
      {
        ...flags,
        [equation.number]: false,
      }
    ));
    this.isContentEmbeded = { ...isFigureEmbeded, ...isEquationsEmbeded };
  }

  getContents = (note) => {
    const findContents = (contentRegex, note, contentType) => {
      let contents = [];
      let match;
      while (true) {
        match = contentRegex.exec(note);
        if (!match) break;
        const [ , number ] = match;
        const contentNumber = `${contentType[0].toUpperCase()}${number}`;
        if (this.isContentEmbeded[contentNumber]) continue;
        const content = this.props.paper[`${contentType}s`].filter(content => content.number === contentNumber)[0];
        contents.push(content);
        this.isContentEmbeded[contentNumber] = true;
      }

      return contents;
    };

    if (!this.isContentEmbeded) return [];
    const figureRegex = /(?!<a class="embed-F\d+">)fig\.?(?:ure)?\s*(\d+)(?!<\/a>)/gi;
    const equationRegex = /(?!<a class="embed-E\d+">)eq\.?(?:uation)?\s*(\d+)(?!<\/a>)/gi;

    return [
      ...findContents(figureRegex, note.content, 'figure'),
      ...findContents(equationRegex, note.content, 'equation'),
    ];
  };

  render() {
    const { section } = this.props;
    const { notes, summary } = this.state;
    const sectionNoteList = !notes ? null : notes.map(note => <SummaryNote note={note} contents={this.getContents(note)} key={note._id} quote={note.quote}/>);
    const sectionSummary = !summary ? null : <SummaryNote note={summary} contents={this.getContents(summary)} isSummary={true} />;
    return (
      <div style={styles.sectionSummaryContainerStyle}>
        <h3 className="title is-3" style={styles.sectionTitleStyle}>{`${section.number}. ${section.name}`}</h3>
        <div>
          {sectionNoteList}
          {sectionNoteList && sectionSummary ? <div style={{ height: '30px' }} /> : null }
          {sectionSummary}
        </div>
      </div>
    );
  }
}

const styles = {
  sectionSummaryContainerStyle: {
    marginBottom: '60px',
  },
  sectionTitleStyle: {
    fontFamily: 'Baskerville, Georgia, serif',
    fontWeight: '500',
    fontSize: '2.5rem',
  },
};

export default SummarySection;
