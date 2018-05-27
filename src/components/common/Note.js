import React, { Component } from 'react';
import Collapsible from 'react-collapsible';
import './Note.css';
import editIconPath from '../../icons/edit_icon.png';
import deleteIconPath from '../../icons/delete_icon.png';
import TextArea from './TextArea';
import { debounce, contentEmbededHTML, popUpModalOnClick } from '../../utils';
import {NOTE_URL} from '../../constants';
import axios from 'axios';
import Pencil from 'react-icons/lib/fa/pencil';
import TrashCan from 'react-icons/lib/fa/trash';

class Note extends Component {
  constructor(props) {
    super(props);
    this.state = {
      mode: 'read',
      title: 'dd',
      content: '',
      noteId: '',
      isHovering: false,
      editMode: false,
      quote: '',
    };

    this.handleMouseOn = this.handleMouseOn.bind(this);
    this.handleMouseOff = this.handleMouseOff.bind(this);
    this.saveNote = debounce(this.saveNote, 1000);
    this.deleteNote = this.deleteNote.bind(this);
  }

  componentWillMount() {
    const { noteId, title, content, key, quote } = this.props;
    console.log('print key');
    console.log(key);
    this.setState({ noteId, title, content, quote });
  }

  componentDidMount() {
    popUpModalOnClick(document, this.props.paper, this.props.showModal);
  }

  componentDidUpdate() {
    popUpModalOnClick(document, this.props.paper, this.props.showModal);
  }

  handleMouseOn() {
    this.setState(prevState => {
      return {isHovering: true}
    });
  }
  handleMouseOff() {
    this.setState(prevState => {
      return {isHovering: false}
    });
  }


  changeTitleMode(e) {
    this.setState({mode: 'fix'});
    e.stopPropagation();
  }

  onEnterKeyPress(e) {
    if (e.which === 13) {
      this.setState({mode: 'read'});
      this.saveNote();
    }
    e.stopPropagation();
  }

  saveNote() {
    console.log('debounced!');
    const url = `${NOTE_URL}/${this.props.noteId}`;
    const { title, content, quote } = this.state;
    const data = { title, content, quote };
    console.log(this.props.noteId);
    if (this.props.noteId) {
      axios.put(url, data)
          .then((res) => {
          })
          .catch((e) => console.log(e));
    }
    else {
      console.log('failed, check Note.js 56');
      this.saveNote();
    }
  }

  deleteNote(e) {
    const url = `${NOTE_URL}/${this.props.noteId}`;

    this.setState({isHovering: false});
    this.props.deleteNote();
    axios.delete(url)
      .then((res) => {
      })
      .catch((err) => console.log(err));
    e.stopPropagation();

  }

  render() {
    const handleChange = function (event) {
      const contentEmbededNote = event.target.value;
      const regex = /<a class="embed-[FE]\d+"((?!>)[\w\W])*>|<\/a>/gi
      const pureTextNote = contentEmbededNote.replace(regex, match => '');
      this.setState({
        content: pureTextNote,
      });

      this.saveNote();
    }.bind(this);

    // const trigger = this.state.mode === 'read' ?
    //     (
    //       <div style={styles.noteTitleStyle}>
    //         <div>
    //           {this.state.title} <img style={styles.iconStyle} src={editIconPath} onClick={(e) => this.changeTitleMode(e)} />
    //         </div>
    //         <img style={styles.iconStyle} src={deleteIconPath} onClick={(e) => this.deleteNote(e)} />
    //       </div>
    //     ) :
    //     (
    //       <div onKeyPress={(e) => this.onEnterKeyPress(e)} onClick={(e) => e.stopPropagation()}>
    //         <TextArea html={this.state.title} onChange={event => this.setState({ title: event.target.value })} placeholder={'Write title!'} />
    //       </div>
    //     );
    const trigger = this.state.mode === 'read' ?
        (

          <header key={this.props.noteId}
                  className="card-header"
                  onMouseEnter={this.handleMouseOn}
                  onMouseLeave={this.handleMouseOff}
                  style={styles.noteTitleStyle}>
            <p style={styles.titleTextStyle} className="card-header-title">
              {this.state.title || "No Title"}
              {this.state.isHovering ? <Pencil style={styles.iconStyle} onClick={(e) => this.changeTitleMode(e)}/> : null}
            </p>
            {this.state.isHovering ? <TrashCan style={{...styles.iconStyle, marginRight: '10px'}} onClick={(e) => this.deleteNote(e)}/> : null}
          </header>
        ) :
        (
            <header className="card-header">
              <div className="card-header-title" onKeyPress={(e) => this.onEnterKeyPress(e)} onClick={(e) => e.stopPropagation()}>
                <TextArea html={this.state.title} onChange={event => this.setState({ title: event.target.value })} placeholder={'Write title!'} />
              </div>
            </header>

        );
    const content = contentEmbededHTML(this.state.content);

    return (
      <Collapsible trigger={trigger} transitionTime={100}>
        {/*<TextArea html={contentEmbededHTML(this.state.content)} onChange={handleChange} />*/}
        <div styles={styles.contentTextStyle} class="card-content">
          {
            this.state.quote ? <div class="content"><blockquote>{this.state.quote}</blockquote></div> : null
          }
          {
            this.state.editMode ?
                <TextArea html={contentEmbededHTML(this.state.content)} onChange={handleChange} /> :
                <div style={{marginBottom: '0', fontSize: '1.2rem'}} class="content" dangerouslySetInnerHTML={{__html: content}} />
          }
            {/*<TextArea html={contentEmbededHTML(this.state.content)} onChange={handleChange} />*/}
          <a style={styles.actionStyle} onClick={() => this.setState(prevState => {return {editMode: !prevState.editMode}})}>
            {this.state.editMode ? 'Save' : 'Edit'}
          </a>
        </div>
      </Collapsible>
    );
  }
}

const styles = {
  titleTextStyle: {
    fontSize: '1.2rem',
  },
  contentTextStyle: {
    fontSize: '1rem',
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
    marginLeft: '10px',
    paddingBottom: '4px',
    color: 'gray',
  },
  noteTitleStyle: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    cursor: 'pointer'
  },
  noteCardStyle: {
    width: '80%',
  },
  actionStyle: {
    marginRight: '5px',
    fontSize: '0.9rem',
  }
};

export default Note;