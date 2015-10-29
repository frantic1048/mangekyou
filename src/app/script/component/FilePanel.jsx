import React from 'react';
import FilePanelToolbar from './FilePanelToolbar';
import FilePanelCards from './FilePanelCards';

const FilePanel = React.createClass({
  render() {
    return ( // eslint-disable-line no-extra-parens
      <div>
        <FilePanelToolbar />
        <FilePanelCards />
      </div>
    );
  },
});

export default FilePanel;
