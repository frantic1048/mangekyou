import React from 'react';
import ReactDOM from 'react-dom';
import mangekyouStore from '../store/mangekyouStore';

const Preview = React.createClass({
  getInitialState() {
    return {
      image: mangekyouStore.getPreviewImage(),
    };
  },
  componentDidMount() {
    this._initCanvas();
    mangekyouStore.addPreviewImageChangeListener(this._onChange);
    window.addEventListener('resize', this._onResize);
  },
  componentWillUnmount() {
    mangekyouStore.removePreviewImageChangeListener(this._onChange);
    window.removeEventListener('resize', this._onResize);
  },
  render() {
    return ( // eslint-disable-line no-extra-parens
      <div
        style={{
          flexGrow: '3',
          flexBasis: '0',
          overflow: 'hidden',
          userSelect: 'none',
        }}
      >
        <canvas id="preview-canvas"></canvas>
      </div>
    );
  },
  _initCanvas() {
    this._onResize();
  },
  _onChange() {
    this.setState({
      image: mangekyouStore.getPreviewImage(),
    });
    this._draw();
  },
  _onResize() {
    const container = ReactDOM.findDOMNode(this);
    const canvas = container.children[0];
    const {width, height} = container.getBoundingClientRect();
    canvas.setAttribute('width', Math.floor(width));
    canvas.setAttribute('height', Math.floor(height));
    this._draw();
  },
  _draw() {
    if (this.state.image) {
      const container = ReactDOM.findDOMNode(this);
      const canvas = container.children[0];
      const ctx = canvas.getContext('2d');
      const {width, height} = canvas;
      const iwidth = this.state.image.width;
      const iheight = this.state.image.height;

      const wRatio = width / iwidth;
      const hRatio = height / iheight;

      // ratio to size image contained in canvas
      // image is bigger: shrink to fit
      // image is smaller: no scaling
      const ratio = Math.min(Math.min(wRatio, hRatio), 1);

      // shift to center image in canvas
      const shiftX = (width - iwidth * ratio) / 2;
      const shiftY = (height - iheight * ratio) / 2;

      ctx.clearRect(0, 0, width, height);
      ctx.drawImage(
        this.state.image,
        0, 0, iwidth, iheight,
        shiftX, shiftY, iwidth * ratio, iheight * ratio);
    }
  },
});

export default Preview;
