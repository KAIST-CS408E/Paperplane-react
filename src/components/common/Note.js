import React, { Component } from 'react';
import Collapsible from 'react-collapsible';
import './Note.css';
import editIconPath from '../../icons/edit_icon.png';
import TextArea from './TextArea';
import { debounce } from '../../utils';

class Note extends Component {
  constructor(props) {
    super(props);
    this.state = {
      mode: 'read',
      title: 'dd',
      content: <a>hi</a>,
      html: '',
    };
    this.saveNote = debounce(this.saveNote, 1000);
    this.popUpModalOnClick = debounce(this.popUpModalOnClick, 500);
  }

  changeTitleMode(e) {
    this.setState({mode: 'fix'});
    e.stopPropagation();
  }

  onEnterKeyPress(e) {
    if (e.which === 13) {
      this.setState({mode: 'read'});
    }
    e.stopPropagation();
  }

  getInitialState() {
    return {html: "this is <em>an</em> <strong>example</strong>"};
  }

  saveNote() {
    console.log('debounced!');
  }

  contentEmbededHTML() {
    const figureRegex = /(?!<a class="embed-F\d+">)fig(?:ure)?\s*(\d+)(?!<\/a>)/gi;
    const equationRegex = /(?!<a class="embed-E\d+">)eq(?:uation)?\s*(\d+)(?!<\/a>)/gi;

    return this.state.html
      .replace(figureRegex, (match, number) => `<a class="embed-F${number}">${match}</a>`)
      .replace(equationRegex, (match, number) => `<a class="embed-E${number}">${match}</a>`);
  }

  /* TODO: REALLY, REALLY BAD IDEA to use debounce here... */
  popUpModalOnClick() {
    const addModalListener = (item) => {
      return (link) => {
        link.addEventListener('click', () => this.props.showModal(item, 'note'));
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
    const handleChange = function (event) {
      const contentEmbededNote = event.target.value;
      const regex = /<a class="embed-[FE]\d+">|<\/a>/gi
      const pureTextNote = contentEmbededNote.replace(regex, match => '');
      this.setState({
        html: pureTextNote,
      });

      this.saveNote();
      this.popUpModalOnClick();
    }.bind(this);

    const trigger = this.state.mode === 'read' ?
        <div>{this.state.title} <img style={styles.iconStyle} src={editIconPath} onClick={(e) => this.changeTitleMode(e)} /></div> :
        (
          <div onKeyPress={(e) => this.onEnterKeyPress(e)} onClick={(e) => e.stopPropagation()}>
            <TextArea
              style={styles.titleTextArea}
              minRows={1}
              maxRows={1}
              placeholder={'Write title!'}
              onChange={event => this.setState({ title: event.target.value })}
              value={this.state.title} />
          </div>
        );
    return (
      <Collapsible trigger={trigger} transitionTime={100}>

        {/*<TextArea*/}
          {/*style={styles.textArea}*/}
          {/*minRows={4}*/}
          {/*placeholder={'Write something meaningful to you!'}*/}
          {/*onChange={event => this.setState({ content: event.target.value })}*/}
          {/*value={this.state.content} />*/}
        <TextArea html={this.contentEmbededHTML()} onChange={handleChange} />
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
  }
};

export default Note;