import React from 'react';
import Toolbar from 'material-ui/lib/toolbar/toolbar';
import ToolbarGroup from 'material-ui/lib/toolbar/toolbar-group';
import ToolbarTitle from 'material-ui/lib/toolbar/toolbar-title';
import RaisedButton from 'material-ui/lib/raised-button';
import mangekyouAction from './../action/mangekyouAction';

const FilePanelToolbar = React.createClass({
  render() {
    return ( // eslint-disable-line no-extra-parens
      <Toolbar>
        <ToolbarGroup float="left">
          <ToolbarTitle text="管理要进行处理的图片" />
        </ToolbarGroup>
        <ToolbarGroup float="right">
          <RaisedButton label="清空" onClick={this.handleClearFile()}/>
          <RaisedButton primary label="添加">
            <input type="file" id="fileInput"></input>
          </RaisedButton>
        </ToolbarGroup>
      </Toolbar>
    );
  },
  handleAddFile(newFile) {
    mangekyouAction.addFile(newFile);
  },
  handleClearFile() {
    mangekyouAction.clearFile();
  },
});

export default FilePanelToolbar;
