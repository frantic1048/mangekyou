import React from 'react';
import Toolbar from 'material-ui/lib/toolbar/toolbar';
import ToolbarGroup from 'material-ui/lib/toolbar/toolbar-group';
import ToolbarSeparator from 'material-ui/lib/toolbar/toolbar-separator';
import ToolbarTitle from 'material-ui/lib/toolbar/toolbar-title';
import DropDownMenu from 'material-ui/lib/drop-down-menu';
import RaisedButton from 'material-ui/lib/raised-button';
import mangekyouStore from './../store/mangekyouStore';

const NodePanelToolbar = React.createClass({
  getInitialState() {
    // TODO: node type store
    return {
      nodeTypeOptions: [
        { payload: 1, text: '采样率'},
        { payload: 2, text: '量化'},
      ],
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
