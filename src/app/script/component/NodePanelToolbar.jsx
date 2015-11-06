import React from 'react';
import Toolbar from 'material-ui/lib/toolbar/toolbar';
import ToolbarGroup from 'material-ui/lib/toolbar/toolbar-group';
import ToolbarTitle from 'material-ui/lib/toolbar/toolbar-title';
import DropDownMenu from 'material-ui/lib/drop-down-menu';
import RaisedButton from 'material-ui/lib/raised-button';
import mangekyouStore from './../store/mangekyouStore';

let transformNodeId = 1;
function getTransformNodeId() {
  return transformNodeId++;
}

const NodePanelToolbar = React.createClass({
  getInitialState() {
    // TODO: node type store
    const transformNodeTypes = mangekyouStore.getTransformNodeTypes();
    const nodeTypeOptions = Object.keys(transformNodeTypes).map(key => {
      return {
        payload: key,
        text: transformNodeTypes[key],
      };
    });
    return {
      nodeTypeOptions,
    };
  },
  render() {
    return ( // eslint-disable-line no-extra-parens
      <Toolbar>
        <ToolbarGroup style={{ float: 'left' }}>
          <ToolbarTitle text="类型"/>
            <DropDownMenu menuItems={this.state.nodeTypeOptions}/>
        </ToolbarGroup>
        <ToolbarGroup style={{ float: 'right' }}>
          <RaisedButton primary label="添加节点"/>
        </ToolbarGroup>
      </Toolbar>
    );
  },
});

export default NodePanelToolbar;
