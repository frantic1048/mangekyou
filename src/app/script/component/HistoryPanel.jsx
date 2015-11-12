import React from 'react';
import List from 'material-ui/lib/lists/list';
import HistoryItem from './HistoryItem';
import mangekyouStore from './../store/mangekyouStore';

// TODO: History component
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
      <div
        data-showing={this.state.showing}
        id="history-panel"
        style={{
          flexGrow: '1',
          flexBasis: '8rem',
        }}
      >
        <List
          style={{
            backgroundColor: 'transparent',
          }}
        >
          {listItems}
        </List>
      </div>
    );
  },
  _onHistoryChange() {
    this.setState({
      historyList: mangekyouStore.getHistory,
    });
  },
  _onShowingChange() {
    this.setState({
      showing: mangekyouStore.getShowing().historyPanel,
    });
  },
});

export default HistoryPanel;
