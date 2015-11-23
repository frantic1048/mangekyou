import SampleRate from './SampleRate';

const op = {
  SampleRate,
};

self.onmessage = ({data: {operationName, operationParam, image}}) => {
  image.data = new Uint8ClampedArray(image.buffer);
  const workerResult = op[operationName](image, operationParam);
  self.postMessage({
    image: {
      width: workerResult.width,
      height: workerResult.height,
      buffer: workerResult.data.buffer,
    },
  },
  [workerResult.data.buffer]
  );
};
