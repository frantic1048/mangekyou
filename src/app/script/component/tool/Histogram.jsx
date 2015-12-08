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
    if (previewImage) {
      this._compute(previewImage);
    }
    if (this.state.worker) {
      this.state.worker.terminate();
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
      operationName: '',
      operationParam: {},
      image: {
        width: imgData.width,
        heght: imgData.height,
        data: imgData.data,
      },
    });
  },
  _didCompute() {
    // TODO: resolve returned histogram data.
  },
});

export default Histogram;
