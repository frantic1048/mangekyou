import {getAllPositions} from './util';

function getRange(depth, planeIndex) {
  const unit = 256 / depth;
  return [Math.floor(unit * planeIndex), Math.floor(unit * (planeIndex + 1))];
}

function isBetween(lowerBound, upperBound, value) {
  return value >= lowerBound && value < upperBound;
}

function BitPlane({width, height, data}, {depth, planeIndex}) {
  console.log(`BitPlane: depth=${depth}, planeIndex=${planeIndex}`);
  const bi = isBetween.bind(this, ...getRange(depth, planeIndex));
  const allPos = getAllPositions(width, height);
  for (const [,, index] of allPos()) {
    data[index] = bi(data[index]) ? 255 : 0;
    data[index + 1] = bi(data[index + 2]) ? 255 : 0;
    data[index + 2] = bi(data[index + 2]) ? 255 : 0;
  }
  return {width, height, data};
}

export default BitPlane;
