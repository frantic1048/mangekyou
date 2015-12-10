import React from 'react';
import mangekyouStore from './../../store/mangekyouStore';

const Histogram = React.createClass({
  getInitialState() {
    return {
      showing: mangekyouStore.getShowing().toolPanel,
      worker: null,
    };
  },
  componentDidMount() {
    mangekyouStore.addPreviewImageChangeListener(this._handlePreviewImageChange);
  },
  componentWillUnmount() {
    mangekyouStore.removePreviewImageChangeListener(this._handlePreviewImageChange);
  },
  render() {
    return <div>Histogram</div>;
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
      // TODO:10 visualize histogram data.
    }
  },
});

export default Histogram;
