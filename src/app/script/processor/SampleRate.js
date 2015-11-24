import {getCoordinate, getAllPositions} from './util';

function SampleRate({width, height, data}, {distance}) {
  // FIXME: weird output on distance === 1
  const cord = getCoordinate(width);
  const oWidth = Math.floor(width / distance);
  const oHeight = Math.floor(height / distance);
  const oAllPos = getAllPositions(oWidth, oHeight);
  const oData = new Uint8ClampedArray(4 * oWidth * oHeight);

  for (const [oX, oY, oIndex] of oAllPos()) {
    const index = cord(oX * distance, oY * distance);
    oData[oIndex] = data[index];
    oData[oIndex + 1] = data[index + 1];
    oData[oIndex + 2] = data[index + 2];
    oData[oIndex + 3] = data[index + 3];
  }

  return {
    width: oWidth,
    height: oHeight,
    data: oData,
  };
}

export default SampleRate;
