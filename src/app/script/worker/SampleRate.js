import {getCoordinate, getAllPositions} from './util';

// resample input image by given sample distance
function SampleRate({width, height, data}, {distance}) {
  const cord = getCoordinate(width);
  const oWidth = Math.floor(width / distance);
  const oHeight = Math.floor(height / distance);
  const oAllPos = getAllPositions(oWidth, oHeight);
  const oData = new Uint8ClampedArray(4 * oWidth * oHeight);

  for (const [oX, oY, oIndex] of oAllPos()) {
    const index = cord(oX * distance, oY * distance);
    oData[oIndex] = data[index];         // red
    oData[oIndex + 1] = data[index + 1]; // green
    oData[oIndex + 2] = data[index + 2]; // blud
    oData[oIndex + 3] = data[index + 3]; // alpha
  }

  return {
    width: oWidth,
    height: oHeight,
    data: oData,
  };
}

export default SampleRate;
