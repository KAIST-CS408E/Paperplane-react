import React, { Component } from 'react';


class Summary extends Component {
  render() {
    const { section, notes } = this.props;
    return (
      <div>
        <h2>{section.name}</h2>
        <div style={{ backgroundColor: '#cccccc', }}>
          {notes
            ? notes.map(note => <div style={{ display: 'inline-block', width: '50%', wordBreak: 'break-word' }}>{JSON.stringify(note)}</div>)
            : 'no note for this section :('}
        </div>
      </div>
    );
  }
}

export default Summary;
