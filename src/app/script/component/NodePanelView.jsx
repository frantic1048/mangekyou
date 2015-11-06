import React from 'react';
import NodePanelViewItem from './NodePanelViewItem';

const NodePanelView = React.createClass({
  render() {
    return ( // eslint-disable-line no-extra-parens
      <div
        style={{ padding: '1rem' }}
      >
        <NodePanelViewItem/>
      </div>
    );
  },
});

export default NodePanelView;
