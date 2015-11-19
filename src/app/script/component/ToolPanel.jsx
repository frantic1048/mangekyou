import React from 'react';
import Paper from 'material-ui/lib/paper';
import RaisedButton from 'material-ui/lib/raised-button';
import DropDownMenu from 'material-ui/lib/drop-down-menu';

import mangekyouAction from '../action/mangekyouAction';
import mangekyouStore from '../store/mangekyouStore';

import SampleRate from './tool/SampleRate';

const ToolPanel = React.createClass({
  getInitialState() {
    return {
      showing: mangekyouStore.getShowing().toolPanel,
      currentRecord: mangekyouStore.getLastHistory(),
      processing: false,
      proceedOperation: '',
      worker: null,
      selectedOperation: '',
      operations: {
        SampleRate: {
          displayName: '采样率',
          component: SampleRate,
        },
      },
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
    const menuItems = [
      { payload: '', text: '无' },
    ];

    // add avilable operations to menu
    for (const op of Object.keys(this.state.operations)) {
      menuItems.push({
        payload: op,
        text: this.state.operations[op].displayName,
      });
    }

    // create component of selected operation.
    const Tool = this.state.selectedOperation ? this.state.operations[this.state.selectedOperation].component : 'span';

    return ( // eslint-disable-line no-extra-parens
      <Paper
        data-showing={this.state.showing}
        zDepth={2}
        rounded={false}
        id="tool-panel"
        style={{
          position: 'fixed',
          width: 'auto',
          right: this.state.showing ? '0rem' : '-16rem',
          transform: `scaleX(${this.state.showing ? 1 : 0})`,
          transformOrigin: 'right center',
          zIndex: 4,
          userSelect: 'none',
          backgroundColor: 'rgba(255, 255, 255, 0.6)',
        }}
      >
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'flex-end',
            margin: '1rem',
          }}
        >
          <div
            style={{
              paddingBottom: '8px',
            }}
          >操作：</div>
          <DropDownMenu menuItems={menuItems} onChange={this._handleChange}/>
          <RaisedButton
            label="应用"
            primary
          />
        </div>
        <div
          style={{
            margin: '1rem',
          }}
        >
          <Tool
            willProcess={this._WillProcess}
          />
        </div>
      </Paper>
    );
  },
  _handleChange(event, selectedIndex, menuItem) {
    this.setState({
      selectedOperation: menuItem.payload,
    });
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
    if (this.state.currentRecord) {
      // if there's an image, process it.
      const {width, height} = this.state.currentRecord.image;
      const imgData = this.state.currentRecord.image.getContext('2d').getImageData(0, 0, width, height);
      const aworker = new Worker('script/processor/worker.js');
      this.setState({
        worker: aworker,
        processing: true,
        proceedOperation: operationName,
      });
      aworker.onmessage = this._DidProcess;
      aworker.postMessage({
        operationName,
        operationParam,
        image: {
          width: imgData.width,
          height: imgData.height,
          data: imgData.data,
        },
      });
    }
  },
  _DidProcess({data}) {
    const imgd = new ImageData(new Uint8ClampedArray(data.image.buffer), data.image.width, data.image.height);
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');
    ctx.putImageData(imgd, 0, 0);
    mangekyouAction.updatePreviewImage(canvas);
    this.state.worker.terminate();
    this.setState({
      worker: null,
      processing: false,
    });
  },
});

export default ToolPanel;
