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
    mangekyouStore.addChangeListener(this._onChange);
  },
  componentWillUnmount() {
    mangekyouStore.removeChangeListener(this._onChange);
  },
  render() {
    const items = [];
    for (const [_key, _file] of this.state.nodes.entries()) {
      // FIXME: key issue
      items.push(
        <FilePanelListItem
          node={{key: _key, file: _file}}
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
