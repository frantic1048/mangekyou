// disable new-cap linting for color space name usage in function name
/* eslint-disable new-cap */

import {getAllPositions} from './util';

function ChannelAdjust({width, height, data}, {space, delta}) {
  const allPos = getAllPositions(width, height);
  // function convert RGB <-> Specified 3-channel Color Space
  let RGBToSpec;
  let SpecToRGB;

  switch (space) {
  case 'rgb':
    RGBToSpec = c => c;
    SpecToRGB = c => c;
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

  for (const [,, index] of allPos()) {
    const sPixel = RGBToSpec(data[index] / 255,
                           data[index + 1] / 255,
                           data[index + 2] / 255);
    // TODO: adjust pixel's channels by delta param
  }

  return {width, height, data};
}

export default ChannelAdjust;
