import React from 'react';
import Toolbar from 'material-ui/lib/toolbar/toolbar';
import ToolbarGroup from 'material-ui/lib/toolbar/toolbar-group';
import ToolbarTitle from 'material-ui/lib/toolbar/toolbar-title';
import RaisedButton from 'material-ui/lib/raised-button';
import mangekyouAction from './../action/mangekyouAction';

const FilePanelToolbar = React.createClass({
  render() {
    return ( // eslint-disable-line no-extra-parens
      <Toolbar
        style={{ userSelect: 'none' }}
      >
        <ToolbarGroup float="left">
          <ToolbarTitle text="管理要进行处理的图片" />
        </ToolbarGroup>
        <ToolbarGroup float="right">
          <RaisedButton label="清空" onClick={this.handleClearFile}/>
          <RaisedButton primary label="添加" onClick={this.handleClick}>
            <input
              id="fileInput"
              ref="fileInput"
              type="file"
              multiple
              accept="image/*"
              onChange={this.handleFile}
              style={{ display: 'none' }}>
            </input>
          </RaisedButton>
        </ToolbarGroup>
      </Toolbar>
    );
  },
  handleClearFile() {
    mangekyouAction.clearFile();
  },
  handleClick() {
    this.refs.fileInput.click();
  },
  handleFile() {
    function extractAndAddFile(f) {
      const canvas = document.createElement('canvas');
      const ctx = canvas.getContext('2d');
      const img = new Image();
      const fr = new FileReader();
      img.onload = () => {
        let _imageData;
        ctx.drawImage(img, 0, 0);
        _imageData = ctx.getImageData(0, 0, img.width, img.height);
        mangekyouAction.addFile(
          f.path,
          {
            name: f.name,
            path: f.path,
            image: _imageData,
          }
        );
      };
      fr.onload = () => { img.src = fr.result; };
      fr.readAsDataURL(f);
    }
    for (const eachFile of new Array(...this.refs.fileInput.files)) {
      extractAndAddFile(eachFile);
    }
  },
});

export default FilePanelToolbar;
