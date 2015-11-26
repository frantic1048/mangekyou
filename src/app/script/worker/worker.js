// emulate a full ES6 environment
// http://babeljs.io/docs/usage/polyfill/
import 'babel-polyfill';

import SampleRate from './SampleRate';

const op = {
  SampleRate,
};

self.onmessage = ({data: {operationName, operationParam, image}}) => {
  const workerResult = op[operationName](image, operationParam);
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
};
