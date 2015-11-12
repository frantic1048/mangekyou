import React from 'react';
import List from 'material-ui/lib/lists/list';
import HistoryItem from './HistoryItem';
import mangekyouStore from './../store/mangekyouStore';

// TODO: History component
const History = React.createClass({
  getInitialState() {
    return {
      historyList: mangekyouStore.getHistory(),
    };
  },
  componentDidMount() {
    mangekyouStore.addHistoryChangeListener(this._onChange);
  },
  componentWillUnmount() {
    mangekyouStore.removeHistoryChangeListener(this._onChange);
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
  _onChange() {
    this.setState({
      historyList: mangekyouStore.getHistory,
    });
  },
});

export default History;
