// disable new-cap linting for color space name usage in function name
/* eslint-disable new-cap */

import {RGBToHSL, HSLToRGB,
        RGBToHSV, HSVToRGB,
        RGBToHSY709, HSY709ToRGB,
        RGBToHSY601, HSY601ToRGB}       from './ColorConversion';
import {getAllPositions, clampBetween}  from './util';

// Coordinate helper for pixel accesing of ImageData
// add clampping for convolve processing
function getConvolveCoordinate(width, height) {
  return (x, y) => clampBetween(y, 0, height) * width * 4 + clampBetween(x, 0, width) * 4;
}

function Convolve({width, height, data}, {core, space}) {
  const allPos = getAllPositions(width, height);
  const convolveCord = getConvolveCoordinate(width, height);

  // core is an 2-dimension array like
  // [[1, 1, 1],
  //  [1, 1, 1],
  //  [1, 1, 1]]
  // each dimension's length is (2n + 1);
  // core[y][x] is (x, y) position of convolve core
  const coreHeight = core.length;
  const coreWidth = core[0].length;

  // data in specified color space
  // use 3 channels + 1 alpha channel for each pixel
  const sData = new Uint8ClampedArray(4 * width * height);

  // function convert RGB <-> Specified 3-channel Color Space
  let RGBToSpec;
  let SpecToRGB;

  switch (space) {
  case 'rgb':
    RGBToSpec = (r, g, b) => [r, g, b];
    SpecToRGB = (r, g, b) => [r, g, b];
    break;
  case 'hsl':
    RGBToSpec = RGBToHSL;
    SpecToRGB = HSLToRGB;
    break;
  case 'hsv':
    RGBToSpec = RGBToHSV;
    SpecToRGB = HSVToRGB;
    break;
  case 'hsy709':
    RGBToSpec = RGBToHSY709;
    SpecToRGB = HSY709ToRGB;
    break;
  case 'hsy601':
    RGBToSpec = RGBToHSY601;
    SpecToRGB = HSY601ToRGB;
    break;
  default:
    break;
  }

  // convert RGB data to Specified color space
  for (const [,, index] of allPos()) {
    const sPixel = RGBToSpec(data[index] * (1 / 255),
                           data[index + 1] * (1 / 255),
                           data[index + 2] * (1 / 255));
    sData[index]     = Math.round(sPixel[0] * 255);
    sData[index + 1] = Math.round(sPixel[1] * 255);
    sData[index + 2] = Math.round(sPixel[2] * 255);

    // copy alpha channel as it is.
    sData[index + 3] = data[index + 3];
  }

  for (const [x, y, index] of allPos()) {
    // get three channels' value
    const sPixel = [sData[index], sData[index + 1], sData[index + 2]];

    // convolved pixel
    const cPixel = [0, 0, 0];

    // convolve on sData
    sPixel.forEach((value, channelIndex) => {
      let cValue = 0.0;
      core.forEach((line, cy) => {
        line.forEach((weight, cx) => {
          // console.log(`processing pixel(${x}, ${y}), core(${cx}, ${cy}), convPos(${x + cx - (coreWidth - 1) * ( 1 / 2)}, ${y + cy - (coreHeight - 1) * (1 / 2)}), realPos(${convolveCord(x + cx - (coreWidth - 1) * ( 1 / 2), y + cy - (coreHeight - 1) * (1 / 2))})`);
          cValue += weight * sData[convolveCord(x + cx - (coreWidth - 1) * ( 1 / 2), y + cy - (coreHeight - 1) * (1 / 2)) + channelIndex];
        });
      });
      cPixel[channelIndex] = cValue;
    });
    // convert convolved pixel back to RGB
    const xPixel = SpecToRGB(cPixel[0] * ( 1 / 255),
                             cPixel[1] * ( 1 / 255),
                             cPixel[2] * ( 1 / 255));
    data[index] = Math.round(xPixel[0] * 255);
    data[index + 1] = Math.round(xPixel[1] * 255);
    data[index + 2] = Math.round(xPixel[2] * 255);
  }

  return {width, height, data};
}

export default Convolve;
