import React, { Component } from 'react';
import Title from './common/Title';
import Note from './common/Note';


class Body extends Component {
  constructor(props) {
    super(props);
    this.state = {
      notes: [],
    };
  }
  componentWillMount() {
    data.map((e, i) => {
      this.state.notes.push(e);
    });
  }

  addNote(i) {
    this.setState(prevState => {
      let prevNote = prevState.notes;
      prevNote[i].notes.push(<Note/>);
      return {notes: prevNote};
    })
  }

  render() {
    const noteComponent = [];
    this.state.notes.map((e, i) => {
      noteComponent.push(
          <Title title={e.title} index={i + 1} addNote={() => this.addNote(i)} />
      );
      e.notes.map((e) => {
        noteComponent.push(<Note />);
      })
    });
    return (
      <div style={styles.backgroundStyle}>
        <div style={styles.leftStyle}>
          <div style={styles.paperStyle}>
          </div>
        </div>
        <div style={styles.rightStyle}>
          {noteComponent}
        </div>
      </div>
    );
  }
}

const data = [
  {
    title: 'Introduction',
    notes: [],
  },
  {
    title: 'Deep Image Representation',
    notes: [],
  },
  {
    title: 'Result',
    notes: [{title: 'State of the art result', body: 'This is total insane!'}],
  },
  {
    title: 'Discussion',
    notes: [],
  },
];

const styles = {
  backgroundStyle: {
    display: 'flex',
    height: '100vh',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  leftStyle: {
    display: 'flex',
    flex: 1,
    flexDirection: 'row',
    backgroundColor: 'blue',
  },
  rightStyle: {
    width: '400px',
    backgroundColor: '#828282',
  },
  paperStyle: {
    flex: 1,
    maxWidth: '1000px',
    backgroundColor: 'white',
    height: '100%',
    margin: 'auto',
  }
};

export default Body;