import React from 'react';
import FilePanelToolbar from './FilePanelToolbar';
import FilePanelList from './FilePanelList';

const FilePanel = React.createClass({
  render() {
    return ( // eslint-disable-line no-extra-parens
      <div>
        <FilePanelToolbar/>
        <FilePanelList/>
      </div>
    );
  },
});

export default FilePanel;
