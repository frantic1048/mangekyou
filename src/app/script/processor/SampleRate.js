import {getCoordinate} from './util';

function SampleRate({width, height, data}, {distance}) {
  const cin = getCoordinate(width);
  const sw = Math.floor(width / distance);
  const sh = Math.floor(height / distance);
  const cout = getCoordinate(sw);
  const dout = new Uint8ClampedArray(4 * sw * sh);

  for (let y = 0; y < sh; ++y) {
    for (let x = 0; x < sw; ++x) {
      // TODO: jump jump jump
    }
  }
  return {
    width: w,
    height: h,
    data: dout,
  };
}

export default SampleRate;
