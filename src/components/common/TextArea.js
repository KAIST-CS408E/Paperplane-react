import React, { Component } from 'react';
import ReactDOM from 'react-dom';


class TextArea extends Component {
  constructor(props) {
    super(props);
    this.shouldComponentUpdate = this.shouldComponentUpdate.bind(this);
    this.emitChange = this.emitChange.bind(this);
  }

  componentDidUpdate() {
    const newProps = this.props;
    console.log(newProps);
    const el = document.getElementsByClassName("fuck")[0];
    const range = document.createRange();
    const sel = window.getSelection();
    console.log(el.childNodes);
    if(el.childNodes.length !== 0) {
      let a = el.childNodes[el.childNodes.length-1];
      if(a.childNodes.length !== 0) {
        a = a.childNodes[0];
      }
      console.log(a, a.length);
      range.setStart(a, a.length);
      range.collapse(true);
      sel.removeAllRanges();
      sel.addRange(range);
    }
  }

  render() {
    return(
      <div
        className="fuck"
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

  emitChange(e) {
    let html = ReactDOM.findDOMNode(this).innerHTML;
    if (this.props.onChange && html !== this.lastHtml) {
      this.props.onChange(e, html);
    }
    this.lastHtml = html;
  }
}

const styles = {
  textArea: {
    border: '1px solid #efefef',
    padding: '0.8rem',
    fontSize: '1rem',
    fontWeight: 400,
    lineHeight: '160%',
    display: 'block',
    width: '90%',
    outline: 'none',
  },
};

export default TextArea;