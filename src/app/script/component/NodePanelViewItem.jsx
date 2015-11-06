import React from 'react';
import Paper from 'material-ui/lib/paper';

const NodePanelViewItem = React.createClass({
  render() {
    return ( // eslint-disable-line no-extra-parens
      <Paper
        style={{ padding: '0.2rem' }}
      >
        <h1 style={{ fontSize: '1em' }}>A Node Panel View Item</h1>
      </Paper>
    );
  },
});

export default NodePanelViewItem;
