import SampleRate from './SampleRate';

const op = {
  SampleRate,
};

self.onmessage = ({data}) => {
  const {operationName, operationParam, image} = data;
  image.data = new Uint8ClampedArray(image.buffer);
  const workerResult = op[operationName](image, operationParam);
  self.postMessage({
    image: {
      width: workerResult.width,
      height: workerResult.height,
      data: workerResult.data,
    },
  });
};
