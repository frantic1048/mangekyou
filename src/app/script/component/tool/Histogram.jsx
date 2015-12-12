import React from 'react';
import ReactDOM from 'react-dom';
import mangekyouStore from './../../store/mangekyouStore';

const Histogram = React.createClass({
  getInitialState() {
    const histogram = documnet.createElement('canvas');
    histogram.setAttribute('width', 256);
    histogram.setAttribute('height', 1000);
    // TODO: initiaze histogram element.
    return {
      showing: mangekyouStore.getShowing().toolPanel,
      worker: null,
      histogram,
    };
  },
  componentDidMount() {
    mangekyouStore.addPreviewImageChangeListener(this._handlePreviewImageChange);
  },
  componentWillUnmount() {
    mangekyouStore.removePreviewImageChangeListener(this._handlePreviewImageChange);
  },
  render() {
    return ( // eslint-disable-line no-extra-parens
      <div
        style={{
          flexGrow: '1',
          flexBasis: '0',
          overflow: 'hidden',
          userSelect: 'none',
        }}
      >
        <canvas id="histogram-canvas"></canvas>
      </div>
    );
  },
  _handlePreviewImageChange() {
    const previewImage = mangekyouStore.getPreviewImage();
    if (this.state.worker) {
      this.state.worker.terminate();
    }
    if (previewImage) {
      this._compute(previewImage);
    }
  },
  _draw() {
    const container = ReactDOM.findDOMNode(this);
    const canvas = container.children[0];
    const ctx = canvas.getContext('2d');
    const {width, height} = canvas;
  },
  _compute(previewImage) {
    const {width, height} = previewImage;
    const imgData = previewImage
                      .getContext('2d')
                      .getImageData(0, 0, width, height);
    const aworker = new Worker('script/worker.js');
    this.setState({
      worker: aworker,
    });
    aworker.onmessage = this._didCompute;
    aworker.postMessage({
      operationName: 'Histogram',
      operationParam: {},
      image: {
        width: imgData.width,
        height: imgData.height,
        data: imgData.data,
      },
    });
  },
  _didCompute({data}) {
    if (data.proceed) {
      // TODO: visualize histogram data on this.state.histogram.
      const {height} = this.state.histogram;
      const ctx = this.state.histogram.getContext('2d');
      // draw luma histogram
      ctx.fillStyle = 'rgba(0, 0, 0, 0.5)';
      // draw red histogram
      ctx.fillStyle = 'rgba(227, 45, 70, 0.5)';
      // draw green histogram
      ctx.fillStyle = 'rgba(111, 227, 44, 0.5)';
      // draw blud histogram
      ctx.fillStyle = 'rgba(44, 166, 227, 0.5)';
    }
  },
});

export default Histogram;
