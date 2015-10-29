import React from 'react';
import FilePanelCard from './FilePanelCard';
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
      <div>
        { list.map(f => <FilePanelCard file={f} />) }
      </div>
    );
  },
  _onChange() {
    this.setState({
      list: mangekyouStore.getFileList(),
    });
  },
});

export default FilePanelCards;
