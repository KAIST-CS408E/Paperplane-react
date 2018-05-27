import React, { Component } from 'react';
import axios from 'axios';
import { BASE_URL } from '../constants';
import SummarySection from './common/SummarySection';
import ContentModal from './common/ContentModal';
import { popUpModalOnClick } from '../utils';


class Summary extends Component {
  constructor(props) {
    super(props);

    this.state = {
      uid: '',
      id: '',
      nickname: '',
      paperId: '',
      notesBySection: {},
      paper: null,
      modalContent: null,
      isPaperLoaded: false,
    };
  }

  componentWillMount = () => {
    const { match: { params: { paperId, userId: uid } } } = this.props;
    this.setState({
      uid,
      paperId,
    });

    axios.get(`${BASE_URL}notes/?uid=${uid}&paperId=${paperId}`)
      .then((res) => {
        const result = res.data[Object.keys(res.data)[0]][0];
        this.setState({
          id : result.createdUserId,
          nickname : result.createdUserName,
          notesBySection: res.data,
        });
      })
      .catch(alert);

    axios.get(`${BASE_URL}papers/${paperId}`)
      .then((res) => {
        this.setState({ paper: res.data });
      })
      .catch(alert);
  };

  componentDidUpdate() {
    if (!this.state.isPaperLoaded && this.state.paper) {
      popUpModalOnClick(document, this.state.paper, this.showModal);
      this.setState({ isPaperLoaded: true });
    }
  }

  showModal = (content) => {
    this.setState({
      modalContent: {
        __html: content.html
      },
    });
  };

  hideModal = () => {
    this.setState({ modalContent: null });
  };

  render() {
    const { paper, notesBySection } = this.state;
    console.log(this.state);
    return !paper || !notesBySection
      ? <div></div>
      : (
        <div style={styles.summaryContainerStyle}>
          <div style={styles.summaryHeaderStyle}>
            <h1 className="title is-2" style={styles.paperTitleStyle}>{paper ? paper.title : ''}</h1>
            <p style={styles.authorStyle}>{`Summary by ${this.state.nickname} (${this.state.id})`}</p>
          </div>
          {
            paper.sections.reduce((summarySections, section) => {
              if (!(section.number - 1 in notesBySection)) return summarySections;
              return [
                ...summarySections,
                <SummarySection paper={paper} section={section} notes={notesBySection[section.number - 1] || []} />
              ];
            }, [])
          }
          <ContentModal content={this.state.modalContent} hideModal={this.hideModal} isSummary={true} />
        </div>
      );
  }
}

const styles = {
  summaryContainerStyle: {
    width: '60vw',
    margin: 'auto',
    paddingTop: '60px',
  },
  summaryHeaderStyle: {
    marginBottom: '40px',
  },
  paperTitleStyle: {
    textAlign: 'center',
  },
  authorStyle: {
    textAlign: 'right',
    fontWeight: 'normal',
    fontSize: '20px',
    marginTop: '16px',
  },
};

export default Summary;
