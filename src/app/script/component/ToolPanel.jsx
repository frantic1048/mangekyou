import React             from 'react';
import Paper             from 'material-ui/lib/paper';
import RaisedButton      from 'material-ui/lib/raised-button';
import DropDownMenu      from 'material-ui/lib/drop-down-menu';
import mangekyouAction   from '../action/mangekyouAction';
import mangekyouStore    from '../store/mangekyouStore';
import mangekyouConstant from '../constant/mangekyouConstant';
import SampleRate        from './tool/SampleRate';
import Quantization      from './tool/Quantization';
import Grayscale         from './tool/Grayscale';
import BitPlane          from './tool/BitPlane';

const ToolPanel = React.createClass({
  getInitialState() {
    return {
      showing: mangekyouStore.getShowing().toolPanel,
      currentRecord: mangekyouStore.getLastHistory(),
      processingState: mangekyouStore.getProcessingState(),
      proceedImage: null,
      proceedOperation: '',
      proceedOperationDisplayName: '',
      worker: null,
      selectedOperation: '',
      operations: {
        SampleRate: {
          displayName: '采样率',
          component: SampleRate,
        },
        Quantization: {
          displayName: '量化',
          component: Quantization,
        },
        Grayscale: {
          displayName: '灰度化',
          component: Grayscale,
        },
        BitPlane: {
          displayName: '位平面',
          component: BitPlane,
        },
      },
    };
  },
  componentDidMount() {
    mangekyouStore.addHistoryChangeListener(this._onHistoryChange);
    mangekyouStore.addShowingChangeListener(this._onShowingChange);
    mangekyouStore.addProcessingChangeListener(this._onProcessingChange);
  },
  componentWillUnmount() {
    mangekyouStore.removeHistoryChangeListener(this._onHistoryChange);
    mangekyouStore.removeShowingChangeListener(this._onShowingChange);
    mangekyouStore.removeProcessingChangeListener(this._onProcessingChange);
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
            onClick={this._handleApply}
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
            currentImage={this.state.currentRecord ? this.state.currentRecord.image : null}
            willProcess={this._WillProcess}
          />
        </div>
      </Paper>
    );
  },
  _handleChange(event, selectedIndex, menuItem) {
    this.setState({
      selectedOperation: menuItem.payload,
      selectedOperationDisplayName: menuItem.text,
    });
  },
  _handleApply() {
    if (this.state.proceedImage) {
      mangekyouAction.addHistory({
        operation: this.state.proceedOperation,
        operationDisplayName: this.state.proceedOperationDisplayName,
        image: this.state.proceedImage,
      });
    }
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
  _onProcessingChange() {
    this.setState({
      processingState: mangekyouStore.getProcessingState(),
    });
  },
  _WillProcess({operationName, operationParam}) {
    if (this.state.worker) {
      this.state.worker.terminate();
    }
    const currentRecord = mangekyouStore.getLastHistory();
    if (currentRecord) {
      // if there's an image, process it.
      const {width, height} = currentRecord.image;
      const imgData = currentRecord.image
                       .getContext('2d')
                       .getImageData(0, 0, width, height);
      const aworker = new Worker('script/worker.js');
      this.setState({
        worker: aworker,
        proceedOperation: this.state.selectedOperation,
        proceedOperationDisplayName: this.state.selectedOperationDisplayName,
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
      mangekyouAction.setProcessingState(mangekyouConstant.COMPUTING);
    }
  },
  _DidProcess({data}) {
    if (data.proceed) {
      const imgd = new ImageData(new Uint8ClampedArray(data.image.buffer), data.image.width, data.image.height);
      const canvas = document.createElement('canvas');
      const ctx = canvas.getContext('2d');
      canvas.setAttribute('width', data.image.width);
      canvas.setAttribute('height', data.image.height);
      ctx.putImageData(imgd, 0, 0);
      mangekyouAction.updatePreviewImage(canvas);
      this.state.worker.terminate();
      this.setState({
        worker: null,
        processing: false,
        proceedImage: canvas,
      });
    }
    mangekyouAction.setProcessingState(mangekyouConstant.IDLE);
  },
});

export default ToolPanel;
