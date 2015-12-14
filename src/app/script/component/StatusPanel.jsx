import React          from 'react';
import Paper          from 'material-ui/lib/paper';
import Histogram      from './tool/Histogram';
import Statistics     from './tool/Statistics';
import mangekyouStore from './../store/mangekyouStore';

const StatusPanel = React.createClass({
  getInitialState() {
    return {
      showing: mangekyouStore.getShowing().statusPanel,
      worker: null,
      statistics: {
        width: 0,
        height: 0,
        pixelCount: 0,
        frequency: null,
      },
    };
  },
  componentDidMount() {
    mangekyouStore.addShowingChangeListener(this._handleShowingChange);
    mangekyouStore.addPreviewImageChangeListener(this._handlePreviewImageChange);
  },
  componentWillUnmount() {
    mangekyouStore.removeShowingChangeListener(this._handleShowingChange);
    mangekyouStore.removePreviewImageChangeListener(this._handlePreviewImageChange);
  },
  render () {
    return ( // eslint-disable-line no-extra-parens
      <Paper
        data-showing={this.state.showing}
        zDepth={2}
        rounded={false}
        id="status-panel"
        style={{
          position: 'fixed',
          display: 'flex',
          flexFlow: 'column nowrap',
          justifyContent: 'space-between',
          alignItems: 'strech',
          padding: '1rem',
          width: 'auto',
          right: this.state.showing ? '0rem' : '-16rem',
          bottom: '0',
          transform: `scaleX(${this.state.showing ? 1 : 0})`,
          transformOrigin: 'right center',
          zIndex: 4,
          userSelect: 'none',
          backgroundColor: 'rgba(255, 255, 255, 0.6)',
        }}
      >
        <Histogram frequency={this.state.statistics.frequency}/>
        <Statistics statistics={this.state.statistics}/>
      </Paper>
    );
  },
  _handleShowingChange() {
    this.setState({
      showing: mangekyouStore.getShowing().statusPanel,
    });
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
      operationName: 'Statistics',
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
      this.setState({
        statistics: data,
      });
    }
    this.state.worker.terminate();
    this.setState({
      worker: null,
    });
  },
});

export default StatusPanel;
