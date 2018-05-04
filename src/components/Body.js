import React, { Component } from 'react';
import Title from './common/Title';
import Note from './common/Note';


class Body extends Component {
  render() {
    const titleComponents = data.map((e, i) =>
      <Title title={e.title} index={i+1} />
    );

    return (
      <div style={styles.backgroundStyle}>
        <div style={styles.leftStyle}>
          <div style={styles.paperStyle}>
          </div>
        </div>
        <div style={styles.rightStyle}>
          {titleComponents}
          <Note/>
        </div>
      </div>
    );
  }
}

const data = [
  {
    title: 'Introduction',
  },
  {
    title: 'Deep Image Representation',
  },
  {
    title: 'Result',
  },
  {
    title: 'Discussion',
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
    backgroundColor: 'red',
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