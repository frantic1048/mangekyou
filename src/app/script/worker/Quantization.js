import {getAllPositions} from './util';

function levelize(level, value) {
  // quantilize value [0, 255] into [1, 256] levels result
  return Math.floor(value - value % (256 / level));
}

function Quantization({width, height, data}, {level}) {
  // TODO: Quantization algorithm
  const allPos = getAllPositions(width, height);
  const lv = levelize.bind(level);
  for (const {index} of allPos()) {
    data[index] = lv(data[index]);         // red
    data[index + 1] = lv(data[index + 1]); // green
    data[index + 2] = lv(data[index + 2]); // blue
  }
  return {width, height, data};
}

export default Quantization;
