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
          key={index}
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
          flexGrow: '1',
          flexBasis: '8rem',
          zIndex: 4,
          backgroundColor: 'transparent',
          userSelect: 'none',
        }}
      >
        <List
          style={{
            backgroundColor: 'transparent',
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
  },
  _onShowingChange() {
    this.setState({
      showing: mangekyouStore.getShowing().historyPanel,
    });
  },
});

export default HistoryPanel;
