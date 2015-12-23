// disable new-cap linting for color space name usage in function name
/* eslint-disable new-cap */

import {RGBToHSL,
        RGBToHSV,
        RGBToHSY709,
        RGBToHSY601}  from './ColorConversion';
import {getAllPositions}           from './util';


function Binarization({width, height, data}, {space, channelIndex, threshold}) {
  // TODO: implement Binarization algorithm.
  const allPos = getAllPositions(width, height);

  // convert RGB -> Specified color space
  let RGBToSpec;

  switch (space) {
  case 'hsl':
    RGBToSpec = RGBToHSL;
    break;
  case 'hsv':
    RGBToSpec = RGBToHSV;
    break;
  case 'hsy709':
    RGBToSpec = RGBToHSY709;
    break;
  case 'hsy601':
    RGBToSpec = RGBToHSY601;
    break;
  default:
    break;
  }

  for (const [,, index] of allPos()) {
    const sPixel = RGBToSpec(data[index] / 255,
                           data[index + 1] / 255,
                           data[index + 2] / 255);
    if (sPixel[channelIndex] * 255 > threshold) {
      data[index] = 255;
      data[index + 1] = 255;
      data[index + 2] = 255;
    } else {
      data[index] = 0;
      data[index + 1] = 0;
      data[index + 2] = 0;
    }
  }

  return {width, height, data};
}

export default Binarization;
