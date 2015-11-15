import React from 'react';
import Paper from 'material-ui/lib/paper';
import RaisedButton from 'material-ui/lib/raised-button';
import DorpDownMenu from 'material-ui/lib/drop-down-menu';
import MenuItem from 'material-ui/lib/menus/menu-item';

import mangekyouAction from '../action/mangekyouAction';
import mangekyouStore from '../store/mangekyouStore';

const ToolPanel = React.createClass({
  getInitialState() {
    return {
      showing: mangekyouStore.getShowing().toolPanel,
      currentRecord: mangekyouStore.getLastHistory(),
      processing: false,
      worker: null,
    };
  },
  componentDidMount() {
    mangekyouStore.addHistoryChangeListener(this._onHistoryChange);
    mangekyouStore.addShowingChangeListener(this._onShowingChange);
  },
  componentWillUnmount() {
    mangekyouStore.removeHistoryChangeListener(this._onHistoryChange);
    mangekyouStore.removeShowingChangeListener(this._onShowingChange);
  },
  render() {
    return ( // eslint-disable-line no-extra-parens
      <Paper
        data-showing={this.state.showing}
        zDepth={2}
        rounded={false}
        id="tool-panel"
        style={{
          position: 'fixed',
          width: '16rem',
          right: this.state.showing ? '0rem' : '-16rem',
          transform: `scaleX(${this.state.showing ? 1 : 0})`,
          transformOrigin: 'right center',
          zIndex: 4,
          userSelect: 'none',
          backgroundColor: 'rgba(255, 255, 255, 0.6)',
        }}
      >
        <h1>Tool Panel</h1>
      </Paper>
    );
  },
  _onHistoryChange() {
    this.setState({
      currentRecord: mangekyouStore.getLastHistory(),
    });
  },
  _onShowingChange() {
    this.setState({
      showing: mangekyouStore.getShowing().toolPanel,
    });
  },
  _WillProcess({operationName, operationParam}) {
    if (this.state.processing && this.state.worker) {
      this.state.worker.terminate();
    }
    const {width, height} = this.state.currentRecord.image;
    const data = this.state.currentRecord.image.getContext('2d').getImageData(0, 0, width, height);
    const aworker = new Worker('script/processor/worker.js');
    this.setState({
      worker: aworker,
      processing: true,
    });
    aworker.onmessage = this._DidProcess;
    aworker.postMessage({
      operationName,
      operationParam,
      data,
    });
  },
  _DidProcess({data}) {
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');
    ctx.putImageData(data, 0, 0);
    mangekyouAction.updatePreviewImage(canvas);
    this.state.worker.terminate();
    this.setState({
      worker: null,
      processing: false,
    });
  },
});

export default ToolPanel;
