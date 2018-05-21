import React, { Component } from 'react';
import axios from 'axios';

import PaperCard from './common/PaperCard';

class PaperList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      paperList: []
    }
  }

  componentWillMount() {
    axios.get('http://ec2-18-191-57-158.us-east-2.compute.amazonaws.com/api/papers').
    then((response) => {
      this.setState({
        paperList: response.data,
      })
    }).catch((response => {

    }));
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