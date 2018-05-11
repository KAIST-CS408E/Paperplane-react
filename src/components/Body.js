import React, { Component } from 'react';
import axios from 'axios';
import Title from './common/Title';
import Note from './common/Note';


class Body extends Component {
  constructor(props) {
    super(props);
    this.state = {
      notes: [],
      paperContent: {
        __html: '',
      },
      paper: null,
      modalContent: null,
    };
  }

  componentWillMount() {
    data.map((e, i) => {
      this.state.notes.push(e);
    });

    axios.get('http://localhost:8000/api/papers')
      .then((res) => {
        const paper = res.data[0];
        this.setState({
          paper,
          paperContent: {
            __html: paper.content,
          },
        });

        /* TODO: REALLY, REALLY BAD IDEA to use setTimeout() here... */
        setTimeout(() => {
          const addModalListener = (item) => {
            return (link) => {
              link.removeAttribute('href');
              link.addEventListener('click', () => {
                this.setState({
                  modalContent: {
                    __html: item.html,
                  },
                });
              });
            };
          };

          this.state.paper.figures.forEach((figure) => {
            const imageLinks = document.querySelectorAll(`a[href$=".${figure.number}"]`);
            imageLinks.forEach(addModalListener(figure));
          });

          this.state.paper.equations.forEach((equation) => {
            const equationLinks = document.querySelectorAll(`a[href$=".${equation.number}"]`);
            equationLinks.forEach(addModalListener(equation));
          });
        }, 2000);
      })
      .catch(alert);
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

    const hideModal = () => {
      this.setState({
        modalContent: null,
      });
    };

    return (
      <div style={styles.backgroundStyle}>
        <div style={styles.leftStyle}>
          <div style={styles.paperStyle} dangerouslySetInnerHTML={this.state.paperContent}>
          </div>
          <div style={{ ...styles.modalStyle, display: this.state.modalContent ? 'block' : 'none' }}
               dangerouslySetInnerHTML={this.state.modalContent}
               onClick={hideModal}>
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
    height: 'calc(100vh - 57px)',
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
    maxWidth: 'calc(100vw - 400px)',
    backgroundColor: 'white',
    height: '100%',
    margin: 'auto',
    overflowY: 'scroll',
    padding: '0 30px',
  },
  modalStyle: {
    backgroundColor: 'gray',
    position: 'fixed',
    padding: '10vh 10vw',
    width: '80vw',
    height: '80vh',
  },
};

export default Body;