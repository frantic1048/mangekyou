import React from 'react';
import ReactDOM from 'react-dom';
import Paper from 'material-ui/lib/paper';
import List from 'material-ui/lib/lists/list';
import HistoryItem from './HistoryItem';
import mangekyouStore from './../store/mangekyouStore';

const HistoryPanel = React.createClass({
  getInitialState() {
    return {
      historyList: mangekyouStore.getHistory(),
      showing: mangekyouStore.getShowing().historyPanel,
      scrolling: false,
      scrollingStartPos: {y: 0},
      scrollingStartScrollTop: 0,
    };
  },
  componentDidMount() {
    mangekyouStore.addHistoryChangeListener(this._onHistoryChange);
    mangekyouStore.addShowingChangeListener(this._onShowingChange);

    // FIXME: implement scrolling disabled listItems' mouse event
    // const container = ReactDOM.findDOMNode(this);
    // container.addEventListener('mousedown', this._onScrollStart, false);
    // container.addEventListener('mousemove', this._onScrollMove);
    // container.addEventListener('mouseup', this._onScrollEnd);
    // container.addEventListener('mouseleave', this._onScrollEnd);
  },
  componentDidUpdate() {
    if (this.state.historyList.length > 0) {
      if (this.state.historyList.slice(-1)[0].operation !== '历史跳转') {
        // scroll to last history record.
        const list = ReactDOM.findDOMNode(this.refs.historyList);
        list.scrollTop = list.scrollHeight;
      }
    }
  },
  componentWillUnmount() {
    mangekyouStore.removeHistoryChangeListener(this._onHistoryChange);
    mangekyouStore.removeShowingChangeListener(this._onShowingChange);

    // FIXME: implement scrolling disabled listItems' mouse event
    // const container = ReactDOM.findDOMNode(this);
    // container.removeEventListener('mousedown', this._onScrollStart);
    // container.removeEventListener('mousemove', this._onScrollMove);
    // container.removeEventListener('mouseup', this._onScrollEnd);
    // container.removeEventListener('mouseleave', this._onScrollEnd);
  },
  render() {
    const listItems = [];
    this.state.historyList.forEach((history, index) => {
      listItems.push(
        <HistoryItem
          key={history.key}
          history={history}
          index={index}
        />
      );
    });
    return ( // eslint-disable-line no-extra-parens
      <Paper
        data-showing={this.state.showing}
        rounded={false}
        zDepth={2}
        id="history-panel"
        style={{
          position: 'fixed',
          width: '16rem',
          left: this.state.showing ? '0rem' : '-16rem',
          transform: `scaleX(${this.state.showing ? 1 : 0})`,
          transformOrigin: 'left center',
          backgroundColor: 'transparent',
          userSelect: 'none',
        }}
      >
        <List
          ref="historyList"
          style={{
            backgroundColor: 'rgba(255, 255, 255, 0.6)',
            overflowX: 'visible',
            overflowY: 'auto',
            height: 'calc(100vh - 64px)',
            transition: 'none',
          }}
        >
          {listItems}
        </List>
      </Paper>
    );
  },
  _onScrollStart(ev) {
    const {clientY} = ev;
    this.setState({
      scrolling: true,
      scrollingStartPos: {
        y: clientY,
      },
    });
  },
  _onScrollMove(ev) {
    if (this.state.scrolling) {
      const list = ReactDOM.findDOMNode(this.refs.historyList);
      const deltaY = ev.clientY - this.state.scrollingStartPos.y;
      const {scrollHeight} = list;

      // keep scrollTop value in [0, scrollHeight]
      list.scrollTop = Math.max(0, Math.min(scrollHeight, this.state.scrollingStartScrollTop - deltaY));
    }
  },
  _onScrollEnd() {
    const list = ReactDOM.findDOMNode(this.refs.historyList);
    this.setState({
      scrolling: false,
      scrollingStartScrollTop: list.scrollTop,
    });
  },
  _onHistoryChange() {
    this.setState({
      historyList: mangekyouStore.getHistory(),
    });
    this.forceUpdate();
  },
  _onShowingChange() {
    this.setState({
      showing: mangekyouStore.getShowing().historyPanel,
    });
  },
});

export default HistoryPanel;
