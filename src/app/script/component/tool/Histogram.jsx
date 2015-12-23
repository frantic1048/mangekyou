import React from 'react';
import ReactDOM from 'react-dom';
import mangekyouStore from './../../store/mangekyouStore';

const Histogram = React.createClass({
  propTypes: {
    frequency: React.PropTypes.shape({
      luma: React.PropTypes.arrayOf(React.PropTypes.number),
      red: React.PropTypes.arrayOf(React.PropTypes.number),
      green: React.PropTypes.arrayOf(React.PropTypes.number),
      blue: React.PropTypes.arrayOf(React.PropTypes.number),
    }),
  },
  getInitialState() {
    const histogram = document.createElement('canvas');
    histogram.setAttribute('width', 256);
    histogram.setAttribute('height', 150);
    return {
      showing: mangekyouStore.getShowing().toolPanel,
      histogram,
    };
  },
  componentDidMount() {
    // disable smoothing for histogram.
    const container = ReactDOM.findDOMNode(this);
    const canvas = container.children[0];
    canvas.setAttribute('width', container.getBoundingClientRect().width);
    canvas.setAttribute('height', 150);
    const ctx = canvas.getContext('2d');

    ctx.imageSmoothingEnabled = false;
    ctx.mozImageSmoothingEnabled = false;
    ctx.webkitImageSmoothingEnabled = false;
    ctx.msImageSmoothingEnabled = false;
  },
  componentDidUpdate() {
    if (this.props.frequency) {
      this._updateHistogram();
    }
  },
  render() {
    return ( // eslint-disable-line no-extra-parens
      <div
        style={{
          flexGrow: '1',
          overflow: 'hidden',
          userSelect: 'none',
        }}
      >
        <canvas id="histogram-canvas"></canvas>
      </div>
    );
  },
  _drawHistogram() {
    const container = ReactDOM.findDOMNode(this);
    const canvas = container.children[0];
    const ctx = canvas.getContext('2d');
    const {width, height} = canvas;

    ctx.clearRect(0, 0, width, height);
    ctx.drawImage(this.state.histogram, 0, 0, width, height);
  },
  _updateHistogram() {
    const freq = this.props.frequency;
    const {width, height} = this.state.histogram;
    const ctx = this.state.histogram.getContext('2d');

    // vertical scale histogram so that details show clearly
    const scaleFactor = 30;

    // clear old histogram
    ctx.clearRect(0, 0, width, height);

    // draw red histogram
    ctx.fillStyle = 'rgba(255, 0, 0, 0.3)';
    freq.red.forEach((value, index) => {
      ctx.fillRect(
        index, height - Math.round(value * height * scaleFactor),
        1, Math.round(value * height * scaleFactor)
      );
    });

    // draw green histogram
    ctx.fillStyle = 'rgba(0, 255, 0, 0.3)';
    freq.green.forEach((value, index) => {
      ctx.fillRect(
        index, height - Math.round(value * height * scaleFactor),
        1, Math.round(value * height * scaleFactor)
    );
    });

    // draw blue histogram
    ctx.fillStyle = 'rgba(0, 0, 255, 0.3)';
    freq.blue.forEach((value, index) => {
      ctx.fillRect(
        index, height - Math.round(value * height * scaleFactor),
        1, Math.round(value * height * scaleFactor));
    });

    // draw luma histogram
    ctx.fillStyle = 'rgba(100, 100, 100, 1)';
    freq.lowerbound.forEach((value, index) => {
      ctx.fillRect(
        index, height - Math.round(value * height * scaleFactor),
        1, Math.round(value * height * scaleFactor)
      );
    });

    // display on histogram component.
    this._drawHistogram();
  },
});

export default Histogram;
