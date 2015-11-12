import React from 'react';
import List from 'material-ui/lib/lists/list';
import HistoryItem from './HistoryItem';
import mangekyouStore from './../store/mangekyouStore';
import mangekyouAction from './../action/mangekyouAction';

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
    for (const history of this.state.historyList) {
      listItems.push(
        <HistoryItem
          key={history.key}
          history={history}
        />
      );
    }
    return ( // eslint-disable-line no-extra-parens
      <div
        id="history-panel"
        style={{
          flexGrow: '1',
          flexBasis: '8rem',
        }}
      >
        <h1>History Panel</h1>
        <List>
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
