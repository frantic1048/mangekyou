import React           from 'react';
import ListItem        from 'material-ui/lib/lists/list-item';
import IconButton      from 'material-ui/lib/icon-button';
import ContentForward  from 'material-ui/lib/svg-icons/content/forward';
import mangekyouAction from './../action/mangekyouAction';

const HistoryItem = React.createClass({
  propTypes: {
    history: React.PropTypes.shape({
      operationDisplayName: React.PropTypes.string.isRequired,
      image: React.PropTypes.shape({
        width: React.PropTypes.number.isRequired,
        height: React.PropTypes.number.isRequired,
        toDataURL: React.PropTypes.func.isRequired,
      }).isRequired,
    }).isRequired,
    index: React.PropTypes.number.isRequired,
  },
  componentDidMount() {
    this._draw();
  },
  componentDidUpdate() {},
  render() {
    return ( // eslint-disable-line no-extra-parens
      <ListItem
        style={{ userSelect: 'none' }}
        leftAvatar={
          <canvas
            ref="canvas"
            width="38"
            height="38"
            style={{
              objectFit: 'contain',
              border: 'solid 1px rgba(0, 0, 0, 0.08)',
              borderRadius: '0',
              userSelect: 'none',
            }}
          />
        }
        primaryText={this.props.history.operationDisplayName}
        rightIconButton={
          <IconButton
            tooltip="跳转到此记录"
            tooltipPosition="bottom-left"
            onClick={this.handleLoadHistory}
          >
            <ContentForward/>
          </IconButton>
        }
      />
    );
  },
  handleLoadHistory() {
    mangekyouAction.loadHistory(this.props.index);
  },
  _draw() {
    const canvas = this.refs.canvas;
    const ctx = canvas.getContext('2d');
    const {width, height} = canvas;
    const iwidth = this.props.history.image.width;
    const iheight = this.props.history.image.height;

    const wRatio = width / iwidth;
    const hRatio = height / iheight;

    // ratio to size image contained in canvas
    // image is bigger: shrink to fit
    // image is smaller: no scaling
    const ratio = Math.min(Math.min(wRatio, hRatio), 1);

    // shift to center image in canvas
    const shiftX = (width - iwidth * ratio) / 2;
    const shiftY = (height - iheight * ratio) / 2;

    // enable smoothing
    ctx.imageSmoothingEnabled = true;
    ctx.mozImageSmoothingEnabled = true;
    ctx.webkitImageSmoothingEnabled = true;
    ctx.msImageSmoothingEnabled = true;

    ctx.clearRect(0, 0, width, height);
    ctx.drawImage(
      this.props.history.image,
      0, 0, iwidth, iheight,
      shiftX, shiftY, iwidth * ratio, iheight * ratio);
  },
});

export default HistoryItem;
