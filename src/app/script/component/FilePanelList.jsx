import React from 'react';
import List from 'material-ui/lib/lists/list';
import FilePanelListItem from './FilePanelListItem';
import mangekyouStore from './../store/mangekyouStore';

const FilePanelList = React.createClass({
  getInitialState() {
    return {
      nodes: mangekyouStore.getFileNodes(),
    };
  },
  componentDidMount() {
    mangekyouStore.addFileNodeChangeListener(this._onChange);
  },
  componentWillUnmount() {
    mangekyouStore.removeFileNodeChangeListener(this._onChange);
  },
  render() {
    const items = [];
    for (const [key, node] of this.state.nodes.entries()) {
      items.push(
        <FilePanelListItem
          key={key}
          node={node}
        />
      );
    }
    return ( // eslint-disable-line no-extra-parens
      <List
        //             Height(viewPort - titlebar - tabbar - toolbar)
        style={{ height: 'calc(100vh - 64px - 48px - 56px)', overflowY: 'auto' }}
      >{items}
      </List>
    );
  },
  _onChange() {
    this.setState({
      nodes: mangekyouStore.getFileNodes(),
    });
  },
});

export default FilePanelList;
