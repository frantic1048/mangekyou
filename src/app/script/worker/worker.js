// emulate a full ES6 environment
// http://babeljs.io/docs/usage/polyfill/
import 'babel-polyfill';

/** image processing functions */
import SampleRate            from './SampleRate';
import Quantization          from './Quantization';
import Grayscale             from './Grayscale';
import BitPlane              from './BitPlane';
import Statistics            from './Statistics';
import HistogramEqualization from './HistogramEqualization';
import Binarization          from './Binarization';
import ChannelAdjust         from './ChannelAdjust';

const OUT_TYPE = {
  IMAGE: 'IMAGE',
  FREE: 'FREE',
};

const op = {
  SampleRate: {
    func: SampleRate,
    outType: OUT_TYPE.IMAGE,
  },
  Quantization: {
    func: Quantization,
    outType: OUT_TYPE.IMAGE,
  },
  Grayscale: {
    func: Grayscale,
    outType: OUT_TYPE.IMAGE,
  },
  BitPlane: {
    func: BitPlane,
    outType: OUT_TYPE.IMAGE,
  },
  Statistics: {
    func: Statistics,
    outType: OUT_TYPE.FREE,
  },
  HistogramEqualization: {
    func: HistogramEqualization,
    outType: OUT_TYPE.IMAGE,
  },
  Binarization: {
    func: Binarization,
    outType: OUT_TYPE.IMAGE,
  },
  ChannelAdjust: {
    func: ChannelAdjust,
    outType: OUT_TYPE.IMAGE,
  },
};

self.onmessage = ({data: {operationName, image, operationParam}}) => {
  const workerResult = op[operationName].func(image, operationParam);
  switch (op[operationName].outType) {
  case OUT_TYPE.IMAGE:
    self.postMessage(
      {
        proceed: true,
        image: {
          width: workerResult.width,
          height: workerResult.height,
          buffer: workerResult.data.buffer,
        },
      },
      [workerResult.data.buffer]
    );
    break;
  case OUT_TYPE.FREE:
    self.postMessage(...workerResult);
    break;
  default:
      // do nothing~
  }
};
