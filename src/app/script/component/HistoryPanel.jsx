import React from 'react';
import Paper from 'material-ui/lib/paper';
import List from 'material-ui/lib/lists/list';
import HistoryItem from './HistoryItem';
import mangekyouStore from './../store/mangekyouStore';

const HistoryPanel = React.createClass({
  getInitialState() {
    return {
      historyList: mangekyouStore.getHistory(),
      showing: mangekyouStore.getShowing().historyPanel,
    };
  },
  componentDidMount() {
    mangekyouStore.addHistoryChangeListener(this._onHistoryChange);
    mangekyouStore.addShowingChangeListener(this._onShowingChange);
  },
  componentWillUnmount() {
    mangekyouStore.removeHistoryChangeListener(this._onHistoryChange);
    mangekyouStore.removeShowingChangeListener(this._onShowingChange);
  },
  render() {
    const listItems = [];
    this.state.historyList.forEach((history, index) => {
      listItems.push(
        <HistoryItem
          key={performance.now()}
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
          style={{
            backgroundColor: 'rgba(255, 255, 255, 0.6)',
            overflowX: 'visible',
            height: 'calc(100vh - 64px)',
            transition: 'none',
          }}
        >
          {listItems}
        </List>
      </Paper>
    );
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
