import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';


class SummaryListItemCard extends Component {
  render() {
    const { uid, paperId, paperTitle } = this.props;
    return (
      <div style={styles.summaryListItemContainerStyle}>
        <NavLink to={`summary/${paperId}/${uid}`} >
          <div className="card">
            <div className="card-content" style={styles.cardContentStyle}>
              {paperTitle}
            </div>
          </div>
        </NavLink>
      </div>
    );
  }
}

const styles = {
  summaryListItemContainerStyle: {
    padding: '0 3%',
    marginBottom: '20px',
  },
  cardContentStyle: {
    padding: '20px',
    color: 'black',
    fontSize: '21px',
    fontWeight: '500',
  },
};

export default SummaryListItemCard;
