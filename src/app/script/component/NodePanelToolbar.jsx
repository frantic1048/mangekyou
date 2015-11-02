import React from 'react';
import Toolbar from 'material-ui/lib/toolbar/toolbar';
import ToolbarGroup from 'material-ui/lib/toolbar/toolbar-group';
import ToolbarSeparator from 'material-ui/lib/toolbar/toolbar-separator';
import ToolbarTitle from 'material-ui/lib/toolbar/toolbar-title';
import mangekyouStore from './../store/mangekyouStore';

const NodePanelToolbar = React.createClass({
  getInitialState() {
    return {
      nodes: new Map(),
      transformTypes: new Map(),
    };
  },
  render() {
    return ( // eslint-disable-line no-extra-parens
      <Toolbar>
        <ToolbarGroup style={{ float: 'left' }}>
          <ToolbarTitle text="节点属性"/>
          <ToolbarSeparator/>
        </ToolbarGroup>
        <ToolbarGroup style={{ float: 'right' }}>
          <ToolbarTitle text="创建节点"/>
        </ToolbarGroup>
      </Toolbar>
    );
  },
});

export default NodePanelToolbar;
