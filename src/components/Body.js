import React, { Component } from 'react';
import axios from 'axios';
import Title from './common/Title';
import Note from './common/Note';
import { PAPER_URL } from '../constants';
import { withCookies } from 'react-cookie';
import '../index.css';


class Body extends Component {
  highlight_helper(paragraph, start, end) {
    let _start = start;
    let _end = end;
    let next;
    let element = paragraph.childNodes[0];
    while(element !== null && _start >= 0 && _end > 0) {
      next = element.nextSibling;
      const textLength = element.textContent.length;
      if(textLength < _start) {
        _start = _start - textLength;
        _end = _end - textLength;
      } else {
        if(element.nodeType === Node.TEXT_NODE) {
          const local_end = Math.min(element.textContent.length, _end);
          const new_node = document.createTextNode(element.textContent.substr(0, _start));
          const mid = document.createElement("SPAN");
          mid.className = 'highlighted';
          mid.appendChild(document.createTextNode(element.textContent.substr(_start, local_end - _start)));
          paragraph.replaceChild(new_node, element);
          paragraph.insertBefore(mid, new_node.nextSibling);
          const end_node = document.createTextNode(element.textContent.substr(local_end, element.textContent.length - local_end));
          paragraph.insertBefore(end_node, new_node.nextSibling.nextSibling);

        } else {
          this.highlight_helper(element, _start, _end);
        }
        _start = 0;
        _end = _end - textLength;
      }
      element = next;
    }
  }

  highlight() {
    let paragraph;
    console.log(this.state.selection);
    const name = this.state.selection.paragraph;
    if(name !== null && name !== undefined) {
      if (name === 'ltx_abstract') {
        paragraph = document.getElementsByClassName(name)[0];
        console.log(paragraph);
      } else {
        paragraph = document.getElementById(name);
      }
      paragraph = paragraph.getElementsByTagName('P')[0];

      this.highlight_helper(paragraph, this.state.selection.start, this.state.selection.end);
    }
    window.getSelection().empty();
  }

  getAnchorPosition(selection) {
    let curr = selection.anchorNode;
    let len = selection.anchorOffset;
    while(true) {
      while(curr.previousSibling !== null) {
        curr = curr.previousSibling;
        len += curr.textContent.length;
      }
      curr = curr.parentNode;
      if(curr.tagName === 'P' || curr.tagName === 'p' || curr === null) {
        break;
      }
    }
    return len;
  }

  getFocusPosition(selection) {
    let curr = selection.focusNode;
    let len = selection.focusOffset;
    while(true) {
      while(curr.previousSibling !== null) {
        curr = curr.previousSibling;
        len += curr.textContent.length;
      }
      curr = curr.parentNode;
      if(curr.tagName === 'P' || curr.tagName === 'p' || curr === null) {
        break;
      }
    }
    return len;
  }

  componentDidMount() {
    const isNav4 = (navigator.appName === "Netscape" && parseInt(navigator.appVersion) === 4);
    const isNav4Min = (navigator.appName === "Netscape" && parseInt(navigator.appVersion) >= 4);
    const isIE4Min = (navigator.appName.indexOf("Microsoft") !== -1 && parseInt(navigator.appVersion) >= 4);

    document.addEventListener('mouseup', (event) => {
      if (isNav4Min) {
        const selection = document.getSelection();
        if (selection.anchorNode.parentNode.closest('p') === selection.focusNode.parentNode.closest('p') && selection.focusOffset !== selection.anchorOffset) {
          const paragraph = selection.anchorNode.parentNode.closest('p').closest('div');
          const name = paragraph.id || paragraph.className;
          document.getElementsByClassName('selector')[0].style.top = Math.abs(document.getElementsByClassName('anchor')[0].getBoundingClientRect().top - selection.getRangeAt(0).getBoundingClientRect().top) - document.getElementsByClassName('selector')[0].getBoundingClientRect().height +'px';
          const anchor = this.getAnchorPosition(selection);
          const focus = this.getFocusPosition(selection);
          const start = Math.min(anchor, focus);
          const end = Math.max(anchor, focus);
          this.setState({
            selected: true,
            selection: {
              paragraph: name,
              start: start,
              end: end,
            },
          });
        } else {
          this.setState({
            selected: false,
          });
        }
      } else if (isIE4Min) {
        if (document.selection) {

          event.cancelBubble = true;
        }
      }
      event.stopPropagation();
    });
  }

  constructor(props) {
    super(props);
    this.state = {
      notes: [],
      paperContent: {
        __html: '',
      },
      paper: null,
      modalContent: null,
      _id: '',
      selected: false,
      selection: null,
    };
    this.highlight = this.highlight.bind(this);
  }

  componentWillMount() {
    const { cookies } = this.props;
    const _id = cookies.get('_id');
    this.setState({_id});

    data.map((e, i) => {
      this.state.notes.push(e);
    });

    axios.get(PAPER_URL)
      .then((res) => {
        const paper = res.data[0];
        this.setState({
          paper,
          paperContent: {
            __html: paper.content,
          },
        });

        /* TODO: REALLY, REALLY BAD IDEA to use setTimeout() here... */
        setTimeout(() => {
          const addModalListener = (item) => {
            return (link) => {
              link.removeAttribute('href');
              link.addEventListener('click', () => {
                this.setState({
                  modalContent: {
                    __html: item.html,
                  },
                });
              });
            };
          };

          this.state.paper.figures.forEach((figure) => {
            const imageLinks = document.querySelectorAll(`a[href$=".${figure.number}"]`);
            imageLinks.forEach(addModalListener(figure));
          });

          this.state.paper.equations.forEach((equation) => {
            const equationLinks = document.querySelectorAll(`a[href$=".${equation.number}"]`);
            equationLinks.forEach(addModalListener(equation));
          });
        }, 2000);
      })
      .catch();
  }

  addNote(i) {
    this.setState(prevState => {
      let prevNote = prevState.notes;
      prevNote[i].notes.push(<Note/>);
      return {notes: prevNote};
    });
  }

  render() {
    const noteComponent = [];
    this.state.notes.map((e, i) => {
      noteComponent.push(
          <Title title={e.title} index={i + 1} addNote={() => this.addNote(i)} />
      );
      e.notes.map((e) => {
        noteComponent.push(<Note />);
      })
    });

    const hideModal = () => {
      this.setState({
        modalContent: null,
      });
    };

    return (
      <div style={styles.backgroundStyle}>
        <div style={styles.leftStyle}>
          <div style={styles.paperStyle}>
            <div className="anchor" />
            <button onClick={this.highlight} className="selector" style={{position: 'absolute', top: 84, left: '50%', display: this.state.selected? 'inline-block' : 'none'}}>highlight</button>
            <div className="ltx_abstract">
              <h2 className="">Abstract</h2>
              <p className="ltx_p">De<span>e<a>p</a></span> learning-based techniques have achieved state-of-the-art performance on a wide variety of recognition and classification tasks. However, these networks are typically computationally expensive to train, requiring weeks of computation on many GPUs; as a result, many users outsource the training procedure to the cloud or rely on pre-trained models that are then fine-tuned for a specific task. In this paper we show that outsourced training introduces new security risks: an adversary can create a maliciously trained network (a backdoored neural network, or a <span className="ltx_text ltx_emph ltx_font_italic">BadNet</span>) that has state-of-the-art performance on the user’s training and validation samples, but behaves badly on specific attacker-chosen inputs. We first explore the properties of BadNets in a toy example, by creating a backdoored handwritten digit classNameifier. Next, we demonstrate backdoors in a more realistic scenario by creating a U.S. street sign classNameifier that identifies stop signs as speed limits when a special sticker is added to the stop sign; we then show in addition that the backdoor in our US street sign detector can persist even if the network is later retrained for another task and cause a drop in accuracy of 25% on average when the backdoor trigger is present. These results demonstrate that backdoors in neural networks are both powerful and—because the behavior of neural networks is difficult to explicate—stealthy. This work provides motivation for further research into techniques for verifying and inspecting neural networks, just as we have developed tools for verifying and debugging software.</p>
            </div>
            <section id="S1" className="ltx_section">
              <h2 className="ltx_title ltx_title_section">
                <span className="ltx_tag ltx_tag_section"><a href="#S1">1 </a></span><span className="ltx_text ltx_font_smallcaps">Introduction</span>
              </h2>
              <div className="ltx_para" id="S1.p1">
                <p className="ltx_p">The past five years have seen an explosion of activity in deep learning in both academia and industry. Deep networks have been found to significantly outperform previous machine learning techniques in a wide variety of domains, including image recognition&nbsp;<cite className="ltx_cite ltx_citemacro_cite">[<span data-hover-ref="dt-cite-hover-box-0"><a className="ltx_ref" href="#bib.bib1" onclick="event.preventDefault()" title="">1</a></span>]</cite>, speech processing&nbsp;<cite className="ltx_cite ltx_citemacro_cite">[<span data-hover-ref="dt-cite-hover-box-1"><a className="ltx_ref" href="#bib.bib2" onclick="event.preventDefault()" title="">2</a></span>]</cite>, machine translation&nbsp;<cite className="ltx_cite ltx_citemacro_cite">[<span data-hover-ref="dt-cite-hover-box-2"><a className="ltx_ref" href="#bib.bib3" onclick="event.preventDefault()" title="">3</a></span>, <span data-hover-ref="dt-cite-hover-box-3"><a className="ltx_ref" href="#bib.bib4" onclick="event.preventDefault()" title="">4</a></span>]</cite>, and a number of games&nbsp;<cite className="ltx_cite ltx_citemacro_cite">[<span data-hover-ref="dt-cite-hover-box-4"><a className="ltx_ref" href="#bib.bib5" onclick="event.preventDefault()" title="">5</a></span>, <span data-hover-ref="dt-cite-hover-box-5"><a className="ltx_ref" href="#bib.bib6" onclick="event.preventDefault()" title="">6</a></span>]</cite>; the performance of these models even surpasses human performance in some cases&nbsp;<cite className="ltx_cite ltx_citemacro_cite">[<span data-hover-ref="dt-cite-hover-box-6"><a className="ltx_ref" href="#bib.bib7" onclick="event.preventDefault()" title="">7</a></span>]</cite>. Convolutional neural networks (CNNs) in particular have been wildly successful for image processing tasks, and CNN-based image recognition models have been deployed to help identify plant and animal species&nbsp;<cite className="ltx_cite ltx_citemacro_cite">[<span data-hover-ref="dt-cite-hover-box-7"><a className="ltx_ref" href="#bib.bib8" onclick="event.preventDefault()" title="">8</a></span>]</cite> and autonomously drive cars&nbsp;<cite className="ltx_cite ltx_citemacro_cite">[<span data-hover-ref="dt-cite-hover-box-8"><a className="ltx_ref" href="#bib.bib9" onclick="event.preventDefault()" title="">9</a></span>]</cite>.</p>
              </div>
              <div className="ltx_para" id="S1.p2">
                <p className="ltx_p">Convolutional neural networks require large amounts of training data and millions of weights to achieve good results. Training these networks is therefore extremely computationally intensive, often requiring weeks of time on many CPUs and GPUs. Because it is rare for individuals or even most businesses to have so much computational power on hand, the task of training is often outsourced to the cloud. Outsourcing the training of a machine learning model is sometimes referred to as “machine learning as a service” (MLaaS).</p>
              </div>
              <div className="ltx_para" id="S1.p3">
                <p className="ltx_p">Machine learning as a service is currently offered by several major cloud computing providers. Google’s Cloud Machine Learning Engine&nbsp;<cite className="ltx_cite ltx_citemacro_cite">[<span data-hover-ref="dt-cite-hover-box-9"><a className="ltx_ref" href="#bib.bib10" onclick="event.preventDefault()" title="">10</a></span>]</cite> allows users upload a TensorFlow model and training data which is then trained in the cloud. Similarly, Microsoft offers Azure Batch AI Training&nbsp;<cite className="ltx_cite ltx_citemacro_cite">[<span data-hover-ref="dt-cite-hover-box-10"><a className="ltx_ref" href="#bib.bib11" onclick="event.preventDefault()" title="">11</a></span>]</cite>, and Amazon provides a pre-built virtual machine&nbsp;<cite className="ltx_cite ltx_citemacro_cite">[<span data-hover-ref="dt-cite-hover-box-11"><a className="ltx_ref" href="#bib.bib12" onclick="event.preventDefault()" title="">12</a></span>]</cite> that includes several deep learning frameworks and can be deployed to Amazon’s EC2 cloud computing infrastructure. There is some evidence that these services are quite popular, at least among researchers: two days prior to the 2017 deadline for the NIPS conference (the largest venue for research in machine learning), the price for an Amazon <span className="ltx_text ltx_font_typewriter">p2.16xlarge</span> instance with 16 GPUs rose to $144 per hour&nbsp;<cite className="ltx_cite ltx_citemacro_cite">[<span data-hover-ref="dt-cite-hover-box-12"><a className="ltx_ref" href="#bib.bib13" onclick="event.preventDefault()" title="">13</a></span>]</cite>—the maximum possible—indicating that a large number of users were trying to reserve an instance.</p>
              </div>
            </section>
            <section className="ltx_section" id="S3">
              <h2 className="ltx_title ltx_title_section">
                <span className="ltx_tag ltx_tag_section"><a href="#S3">3 </a></span><span className="ltx_text ltx_font_smallcaps">Related Work</span>
              </h2>
              <div className="ltx_para" id="S3.p1">
                <p className="ltx_p">Attacks on machine learning were first considered in the context of statistical spam filters. Here the attacker’s goal was to either craft messages that evade detection&nbsp;<cite className="ltx_cite ltx_citemacro_cite">[<span data-hover-ref="dt-cite-hover-box-22"><a className="ltx_ref" href="#bib.bib25" onclick="event.preventDefault()" title="">25</a></span>, <span data-hover-ref="dt-cite-hover-box-23"><a className="ltx_ref" href="#bib.bib26" onclick="event.preventDefault()" title="">26</a></span>, <span data-hover-ref="dt-cite-hover-box-24"><a className="ltx_ref" href="#bib.bib27" onclick="event.preventDefault()" title="">27</a></span>, <span data-hover-ref="dt-cite-hover-box-25"><a className="ltx_ref" href="#bib.bib28" onclick="event.preventDefault()" title="">28</a></span>]</cite> to let spam through or influence its training data to cause it to block legitimate messages. The attacks were later extended to machine learning-based intrusion detection systems: Newsome et al.&nbsp;<cite className="ltx_cite ltx_citemacro_cite">[<span data-hover-ref="dt-cite-hover-box-26"><a className="ltx_ref" href="#bib.bib29" onclick="event.preventDefault()" title="">29</a></span>]</cite> devised training-time attacks against the Polygraph virus detection system that would create both false positives and negatives when classNameifying network traffic, and Chung and Mok&nbsp;<cite className="ltx_cite ltx_citemacro_cite">[<span data-hover-ref="dt-cite-hover-box-27">wakanda<a className="ltx_ref" href="#bib.bib30" onclick="event.preventDefault()" title="">30</a></span>, <span data-hover-ref="dt-cite-hover-box-28"><a className="ltx_ref" href="#bib.bib31" onclick="event.preventDefault()" title="">31</a></span>]</cite> found that Autograph, a signature detection system that updates its model online, was vulnerable to <span className="ltx_text ltx_emph ltx_font_italic">allergy attacks</span> that convince the system to learn signatures that match benign traffic. A taxonomy of classNameical machine learning attacks can be found in Huang, et al.’s&nbsp;<cite className="ltx_cite ltx_citemacro_cite">[<span data-hover-ref="dt-cite-hover-box-29"><a className="ltx_ref" href="#bib.bib24" onclick="event.preventDefault()" title="">24</a></span>]</cite> 2011 survey.</p>
              </div>
              <div className="ltx_para" id="S3.p2">
                <p className="ltx_p">To create our backdoors, we primarily use <span className="ltx_text ltx_emph ltx_font_italic">training set poisoning</span>, in which the attacker is able to add his own samples (and corresponding ground truth labels) to the training set. Existing research on training set poisoning typically assumes that the attacker is only able to influence some fixed proportion of the training data, or that the classNameifier is updated online with new inputs, some of which may be attacker-controlled, but not change the training algorithm itself. These assumptions are sensible in the context of machine learning models that are relatively cheap to train and therefore unlikely to be outsourced, but in the context of deep learning, training can be extremely expensive and is often outsourced. Thus, in our threat model (Section&nbsp;<a className="ltx_ref" href="#S2.SS2" title="2.2 Threat Model ‣ 2 Background and Threat Model ‣ BadNets: Identifying Vulnerabilities in the Machine Learning Model Supply Chain"><span className="ltx_text ltx_ref_tag">2.2</span></a>) we allow the attacker to freely modify the training procedure as long as the parameters returned to the user satisfy the model architecture and meet the user’s expectations of accuracy.</p>
              </div>
            </section>
          {/*<div style={styles.paperStyle} dangerouslySetInnerHTML={this.state.paperContent}>*/}
          {/*</div>*/}
          {/*<div style={{ ...styles.modalStyle, display: this.state.modalContent ? 'block' : 'none' }}*/}
               {/*dangerouslySetInnerHTML={this.state.modalContent}*/}
               {/*onClick={hideModal}>*/}
          </div>

        </div>
        <div style={styles.rightStyle}>
          {noteComponent}
        </div>
      </div>
    );
  }
}

const data = [
  {
    title: 'Introduction',
    notes: [],
  },
  {
    title: 'Deep Image Representation',
    notes: [],
  },
  {
    title: 'Result',
    notes: [{title: 'State of the art result', body: 'This is total insane!'}],
  },
  {
    title: 'Discussion',
    notes: [],
  },
];

const styles = {
  backgroundStyle: {
    display: 'flex',
    height: 'calc(100vh - 57px)',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  leftStyle: {
    display: 'flex',
    flex: 1,
    flexDirection: 'row',
    backgroundColor: 'blue',
  },
  rightStyle: {
    width: '400px',
    backgroundColor: '#828282',
  },
  paperStyle: {
    flex: 1,
    maxWidth: 'calc(100vw - 400px)',
    backgroundColor: 'white',
    height: '100%',
    margin: 'auto',
    overflowY: 'scroll',
    padding: '0 30px',
    position: 'relative',
  },
  modalStyle: {
    backgroundColor: 'gray',
    position: 'fixed',
    padding: '10vh 10vw',
    width: '80vw',
    height: '80vh',
  },
};

export default withCookies(Body);