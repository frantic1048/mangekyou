import React                  from 'react';
import AppBar                 from 'material-ui/lib/app-bar';
import IconMenu               from 'material-ui/lib/menus/icon-menu';
import MenuItem               from 'material-ui/lib/menus/menu-item';
import MenuDivider            from 'material-ui/lib/menus/menu-divider';
import IconButton             from 'material-ui/lib/icon-button';
import MoreVertIcon           from 'material-ui/lib/svg-icons/navigation/more-vert';
import ImageAddToPhotosIcon   from 'material-ui/lib/svg-icons/image/add-to-photos';
import ContentSaveIcon        from 'material-ui/lib/svg-icons/content/save';
import ActionHistoryIcon      from 'material-ui/lib/svg-icons/action/history';
import ImageStyleIcon         from 'material-ui/lib/svg-icons/image/style';
import ImageFilterVintageIcon from 'material-ui/lib/svg-icons/image/filter-vintage';
import KeyboardShortcut       from './KeyboardShortcut';
import mangekyouAction        from '../action/mangekyouAction';
import mangekyouStore         from '../store/mangekyouStore';

const TitleBar = React.createClass({
  getInitialState() {
    return {
      showing: mangekyouStore.getShowing(),
      currentImage: null,
      processing: mangekyouStore.getProcessingState(),
      animating: false,
      intervalId: Infinity,
      keyMap: [
        {
          char: 'o',
          action: () => { this._handleAddImageClick(); },
        },
        {
          char: 'e',
          action: () => { this._handleExportImageClick(); },
        },
      ],
    };
  },
  componentDidMount() {
    mangekyouStore.addShowingChangeListener(this._onShowingChange);
    mangekyouStore.addHistoryChangeListener(this._onHistoryChange);
    mangekyouStore.addProcessingChangeListener(this._onProcessingChange);
  },
  componentWillUnmount() {
    mangekyouStore.removeShowingChangeListener(this._onShowingChange);
    mangekyouStore.removeHistoryChangeListener(this._onHistoryChange);
    mangekyouStore.removeProcessingChangeListener(this._onProcessingChange);
  },
  render() {
    return ( // eslint-disable-line no-extra-parens
      <AppBar
        title="Mangekyou"
        style={{ WebkitAppRegion: 'drag', userSelect: 'none' }}
        iconElementLeft={
          <IconButton
            id="mangekyou-logo"
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
          <KeyboardShortcut descriptors={this.state.keyMap} />
          <ImageFilterVintageIcon style={{
            fill: this.state.animating ? '#FF4081' : 'white',
            stroke: this.state.animating ? 'black' : 'transparent',
            strokeWidth: this.state.animating ? '1px' : '0px',
            transform: 'transform: scale(1) rotate(0deg)',
            animation: this.state.animating ? 'logoRotate 2s linear infinite' : 'none',
          }}/>
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
              secondaryText="O"
              leftIcon={<ImageAddToPhotosIcon/>}
            />
            <MenuItem
              onClick={this._handleExportImageClick}
              disabled={this.state.currentImage ? false : true}
              primaryText="导出"
              secondaryText="E"
              leftIcon={<ContentSaveIcon/>}
            />
            <MenuDivider/>
            <MenuItem
              onClick={this._handleTriggerHistoryPanel}
              primaryText={`${this.state.showing.historyPanel ? '隐藏' : '显示'}历史记录`}
              secondaryText="H"
              leftIcon={<ActionHistoryIcon/>}
            />
            <MenuItem
              onClick={this._handleTriggerToolPanel}
              primaryText={`${this.state.showing.toolPanel ? '隐藏' : '显示'}编辑面板`}
              secondaryText="T"
              leftIcon={<ImageStyleIcon/>}
            />
          </IconMenu>
      }/>
    );
  },
  _handleFile() {
    mangekyouAction.setProcessingState(true);
    let fileCount = this.refs.fileInput.files.length;
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
        -- fileCount;
        if (fileCount < 1) {
          // loading files complete
          mangekyouAction.setProcessingState(false);
        }
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
  _handleExportImageClick() {
    if (this.state.currentImage) {
      const a = document.createElement('a');
      a.setAttribute('download', 'proceed.png');
      a.setAttribute('href', this.state.currentImage.toDataURL());
      a.click();
    }
  },
  _handleTriggerHistoryPanel() { mangekyouAction.triggerShowing('historyPanel'); },
  _handleTriggerToolPanel() { mangekyouAction.triggerShowing('toolPanel'); },
  _onShowingChange() {
    this.setState({
      showing: mangekyouStore.getShowing(),
    });
  },
  _onHistoryChange() {
    this.setState({
      currentImage: mangekyouStore.getLastHistory().image,
    });
  },
  _onProcessingChange() {
    const isProcessing = mangekyouStore.getProcessingState();
    const newState = {};
    if (isProcessing) {
      newState.processing = true;
      newState.animating = true;
      if (!isFinite(this.state.intervalId)) {
        // use setInterval making sure animation stop on end of cycle
        newState.intervalId = setInterval(()=>{
          if (!this.state.processing) {
            clearInterval(this.state.intervalId);
            this.setState({
              animating: false,
              intervalId: Infinity,
            });
          }
        }, 2000);
      }
    } else {
      newState.processing = false;
    }
    this.setState(newState);
  },
});

export default TitleBar;
