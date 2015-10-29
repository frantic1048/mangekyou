import React from 'react';
import Tabs from 'material-ui/lib/tabs/tabs';
import Tab from 'material-ui/lib/tabs/tab';

import FilePanel from './FilePanel';
import NodePanel from './NodePanel';
import ViewPanel from './ViewPanel';

const TabBar = React.createClass({
  render() {
    return ( // eslint-disable-line no-extra-parens
      <Tabs>
        <Tab label="文件">
          <FilePanel />
        </Tab>
        <Tab label="编辑">
          <NodePanel />
        </Tab>
        <Tab label="预览">
          <ViewPanel />
        </Tab>
      </Tabs>
    );
  },
});

export default TabBar;
