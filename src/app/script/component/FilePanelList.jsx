import React from 'react';
import List from 'material-ui/lib/lists/list';
import FilePanelListItem from './FilePanelListItem';
import mangekyouStore from './../store/mangekyouStore';

const FilePanelCards = React.createClass({
  getInitialState() {
    return {
      list: mangekyouStore.getFileList(),
    };
  },
  componentDidMount() {
    mangekyouStore.addChangeListener(this._onChange);
  },
  componentWillUnmount() {
    mangekyouStore.removeChangeListener(this._onChange);
  },
  render() {
    return ( // eslint-disable-line no-extra-parens
      <List
        //             Height(viewPort - titlebar - tabbar - toolbar)
        style={{ height: 'calc(100vh - 64px - 48px - 56px)', overflowY: 'auto' }}
      >
        { this.state.list.map((f, index) => {
          return ( // eslint-disable-line no-extra-parens
            <FilePanelListItem file={f} key={index}/>
          );
        })
        }
      </List>
    );
  },
  _onChange() {
    this.setState({
      list: mangekyouStore.getFileList(),
    });
  },
});

export default FilePanelCards;
