import React, { Component } from 'react';
import axios from 'axios';
import { BASE_URL } from '../constants';

import PaperCard from './common/PaperCard';

class PaperList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      paperList: []
    }
  }

  componentWillMount() {
    axios.get(`${BASE_URL}papers`)
      .then((response) => {
        this.setState({
          paperList: response.data,
        })
      }).catch(alert);
  }

  render() {
    const renderList = this.state.paperList.map((e) => {
      return (
        <PaperCard id={e._id} title={e.title} />
      )
    });
    return (
      <div style={{paddingBottom: 24}}>
        {renderList}
      </div>
    );
  }
}

export default PaperList;