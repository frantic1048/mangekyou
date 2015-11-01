import React from 'react';

import NodePanelToolbar from './NodePanelToolbar';
import NodePanelView from './NodePanelView';

const NodePanel = React.createClass({
  render() {
    return ( // eslint-disable-line no-extra-parens
      <div>
        <NodePanelToolbar/>
        <NodePanelView/>
      </div>
    );
  },
});

export default NodePanel;
