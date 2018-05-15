import React, { Component } from 'react';


class ContentModal extends Component {
  render() {
    return (
      <div className={`modal${this.props.content ? ' is-active' : ''}`}
           style={styles.modalStyle}
           onClick={this.props.hideModal}>
        <div className="modal-background" style={styles.modalBackgroundStyle}></div>
        <div className="modal-content" dangerouslySetInnerHTML={this.props.content}
             style={styles.modalContentStyle}>
        </div>
      </div>
    );
  }
}

const styles = {
  modalStyle: {
    top: '63px',
    width: 'calc(100vw - 400px)',
    height: 'calc(100vh - 63px)',
  },
  modalBackgroundStyle: {
    backgroundColor: 'rgba(0, 0, 0, 0.3)',
  },
  modalContentStyle: {
    backgroundColor: 'white',
    padding: '20px',
  },
};

export default ContentModal;
