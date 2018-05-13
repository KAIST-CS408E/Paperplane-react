import React, { Component } from 'react';
import ReactDOM from 'react-dom';


class TextArea extends Component {
  constructor(props) {
    super(props);
    this.shouldComponentUpdate = this.shouldComponentUpdate.bind(this);
    this.emitChange = this.emitChange.bind(this);
  }
  render() {
    return(
      <div
        style={styles.textArea}
        onInput={this.emitChange}
        onBlur={this.emitChange}
        contentEditable
        dangerouslySetInnerHTML={{__html: this.props.html}}>
      </div>);
  }

  shouldComponentUpdate(nextProps) {
    return nextProps.html !== ReactDOM.findDOMNode(this).innerHTML;
  }

  emitChange() {
    let html = ReactDOM.findDOMNode(this).innerHTML;
    if (this.props.onChange && html !== this.lastHtml) {
      this.props.onChange({
        target: {
          value: html
        }
      });
    }
    this.lastHtml = html;
  }
}

const styles = {
  textArea: {
    border: '1px solid #efefef',
    padding: '0.8rem',
    fontSize: '1.2rem',
    fontWeight: 400,
    lineHeight: '160%',
    display: 'block',
    width: '90%',
    outline: 'none',
  },
}

export default TextArea;