import React from 'react';
import AppBar  from 'material-ui/lib/app-bar';
import IconMenu from 'material-ui/lib/menus/icon-menu';
import MenuItem from 'material-ui/lib/menus/menu-item';
import MenuDivider from 'material-ui/lib/menus/menu-divider';
import IconButton from 'material-ui/lib/icon-button';
import MoreVertIcon  from 'material-ui/lib/svg-icons/navigation/more-vert';
import ImageAddToPhotosIcon from 'material-ui/lib/svg-icons/image/add-to-photos';
import ContentSaveIcon from 'material-ui/lib/svg-icons/content/save';
import ActionHistoryIcon from 'material-ui/lib/svg-icons/action/history';
import ImageStyleIcon from 'material-ui/lib/svg-icons/image/style';
import ImageFilterVintageIcon from 'material-ui/lib/svg-icons/image/filter-vintage';

import mangekyouAction from '../action/mangekyouAction';
import mangekyouStore from '../store/mangekyouStore';

const TitleBar = React.createClass({
  getInitialState() {
    return {
      showing: mangekyouStore.getShowing(),
    };
  },
  componentDidMount() {
    mangekyouStore.addShowingChangeListener(this._onShowingChange);
  },
  componentWillUnmount() {
    mangekyouStore.removeShowingChangeListener(this._onShowingChange);
  },
  render() {
    return ( // eslint-disable-line no-extra-parens
      <AppBar
        title="Mangekyou"
        style={{ WebkitAppRegion: 'drag', userSelect: 'none' }}
        iconElementLeft={
          <IconButton
            style={{ WebkitAppRegion: 'no-drag' }}>
            <input
              onChange={this._handleFile}
              id="fileInput"
              ref="fileInput"
              multiple
              type="file"
              accept="image/*"
              style={{ display: 'none' }}
            />
          <ImageFilterVintageIcon style={{ fill: '#ffffff' }}/>
          </IconButton>}
        iconElementRight={
          <IconMenu
            style={{ WebkitAppRegion: 'no-drag' }}
            iconButtonElement={
            <IconButton><MoreVertIcon/></IconButton>
          }>
            <MenuItem
              onClick={this._handleAddImageClick}
              style={{ WebkitAppRegion: 'no-drag' }}
              innerDivStyle={{ WebkitAppRegion: 'no-drag' }}
              primaryText="打开"
              leftIcon={<ImageAddToPhotosIcon/>}
            />
            <MenuItem primaryText="保存" leftIcon={<ContentSaveIcon/>}/>
            <MenuDivider/>
            <MenuItem
              onClick={this._handleTriggerHistoryPanel}
              primaryText={`${this.state.showing.historyPanel ? '隐藏' : '显示'}历史记录`}
              leftIcon={<ActionHistoryIcon/>}
            />
            <MenuItem
              onClick={this._handleTriggerToolPanel}
              primaryText={`${this.state.showing.toolPanel ? '隐藏' : '显示'}编辑面板`}
              leftIcon={<ImageStyleIcon/>}
            />
          </IconMenu>
      }/>
    );
  },
  _handleFile() {
    function extractAndAddFile(f) {
      const canvas = document.createElement('canvas');
      const ctx = canvas.getContext('2d');
      const img = new Image();
      const fr = new FileReader();
      img.onload = () => {
        canvas.setAttribute('width', img.width);
        canvas.setAttribute('height', img.height);
        ctx.drawImage(img, 0, 0);
        mangekyouAction.newImage(canvas);
      };
      fr.onload = () => { img.src = fr.result; };
      fr.readAsDataURL(f);
    }
    for (const eachFile of new Array(...this.refs.fileInput.files)) {
      extractAndAddFile(eachFile);
    }
  },
  _handleAddImageClick() {
    this.refs.fileInput.click();
  },
  _handleTriggerHistoryPanel() { mangekyouAction.triggerShowing('historyPanel'); },
  _handleTriggerToolPanel() { mangekyouAction.triggerShowing('toolPanel'); },
  _onShowingChange() {
    this.setState({
      showing: mangekyouStore.getShowing(),
    });
  },
});

export default TitleBar;
