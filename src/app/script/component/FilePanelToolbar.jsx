import React from 'react';
import Toolbar from 'material-ui/lib/toolbar/toolbar';
import ToolbarGroup from 'material-ui/lib/toolbar/toolbar-group';
import ToolbarTitle from 'material-ui/lib/toolbar/toolbar-title';
import RaisedButton from 'material-ui/lib/raised-button';
import FlatButton from 'material-ui/lib/flat-button';

const FilePanelToolbar = React.createClass({
  render() {
    return ( // eslint-disable-line no-extra-parens
      <Toolbar>
        <ToolbarGroup float="left">
          <ToolbarTitle text="管理要进行处理的图片" />
        </ToolbarGroup>
        <ToolbarGroup float="right">
          <FlatButton label="清空" />
          <RaisedButton primary label="添加" />
        </ToolbarGroup>
      </Toolbar>
    );
  },
});

export default FilePanelToolbar;
