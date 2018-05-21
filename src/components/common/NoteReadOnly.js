import React, { Component } from 'react';
import Collapsible from 'react-collapsible';
import './Note.css';
import pinIconPath from '../../icons/pin_icon.png';
import TextArea from './TextArea';
import NoteContent from './NoteContent';
import { debounce } from '../../utils';
import {NOTE_URL} from '../../constants';
import axios from 'axios';

class NoteReadOnly extends Component {
  constructor(props) {
    super(props);
    this.state = {
      mode: 'read',
      title: 'dd',
      content: '',
      noteId: '',
    };
    this.popUpModalOnClick = debounce(this.popUpModalOnClick, 500);
  }

  componentWillMount() {
    const { noteId, title, content } = this.props;
    this.setState({ noteId, title, content });
  }

  contentEmbeddedHTML() {
    const figureRegex = /(?!<a class="embed-F\d+">)fig\.?(?:ure)?\s*(\d+)(?!<\/a>)/gi;
    const equationRegex = /(?!<a class="embed-E\d+">)eq\.?(?:uation)?\s*(\d+)(?!<\/a>)/gi;

    return this.state.content
        .replace(figureRegex, (match, number) => `<a class="embed-F${number}" style="text-decoration: underline;">${match}</a>`)
        .replace(equationRegex, (match, number) => `<a class="embed-E${number}" style="text-decoration: underline;">${match}</a>`);
  }

  /* TODO: REALLY, REALLY BAD IDEA to use debounce here... */
  popUpModalOnClick() {
    const addModalListener = (item) => {
      return (link) => {
        link.addEventListener('click', () => this.props.showModal(item));
      };
    };

    this.props.paper.figures.forEach((figure) => {
      const imageLinks = document.querySelectorAll(`a[class="embed-${figure.number}"]`);
      imageLinks.forEach(addModalListener(figure));
    });

    this.props.paper.equations.forEach((equation) => {
      const equationLinks = document.querySelectorAll(`a[class="embed-${equation.number}"]`);
      equationLinks.forEach(addModalListener(equation));
    });
  };

  render() {
    let { title, content } = this.state;
    content = this.contentEmbeddedHTML();
    const trigger =
        (
            <div style={styles.noteTitleStyle}>
              <div> {title} </div>
              <img src={pinIconPath} onClick={(e) => this.props.pinNote(e, { title, content })}/>
            </div>
        );
    return (
        <Collapsible trigger={trigger} transitionTime={100}>
          <NoteContent html={content}/>
        </Collapsible>
    );
  }
}

const styles = {
  textStyle: {
    flex: 1,
    height: '30px',
    fontSize: '1.5rem',
    fontStyle: 'bold',
    display: 'flex',
    alignItems: 'flex-start',
    justifyContent: 'flex-start',
    backgroundColor: 'white',
    paddingLeft: '10px',
  },
  titleTextArea: {
    borderWidth: '0px',
    borderBottomWidth: '1px',
    borderBottomColor: '#efefef',
    padding: '0.3rem',
    fontSize: '1.2rem',
    fontWeight: 400,
    lineHeight: '100%',
    width: '95%',
    outline: 'none',
  },
  iconStyle: {
    width: '20px',
    height: '20px',
  },
  noteTitleStyle: {
    display: 'flex',
    justifyContent: 'space-between',
    marginRight: '5px',
    alignItems: 'center',
    cursor: 'pointer'
  }
};

export default NoteReadOnly;