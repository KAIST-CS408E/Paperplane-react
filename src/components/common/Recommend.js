import React, { Component } from 'react';


class Recommend extends Component {
  render() {
    return (
      <div className={`modal${this.props.recommend ? ' is-active' : ''}`}>
        <div className="modal-card">
          <header className="modal-card-head">
            <p className="modal-card-title">{this.props.recommend ? this.props.recommend.title : ''}</p>
          </header>
          <section className="modal-card-body">{this.props.recommend ? this.props.recommend.content : ''}</section>
          <footer className="modal-card-foot" style={styles.modalFooterStyle}>
            <button className="button is-success" style={styles.modalButtonStyle}
                    onClick={this.props.onOkListener}>OK</button>
            <button className="button" style={styles.modalButtonStyle}
                    onClick={this.props.onCancelListener}>Cancel</button>
          </footer>
        </div>
      </div>
    );
  }
}

const styles = {
  modalFooterStyle: {
    display: 'block',
  },
  modalButtonStyle: {
    float: 'right',
    margin: 0,
    marginLeft: '20px',
  },
};

export default Recommend;
