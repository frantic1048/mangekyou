// disable new-cap linting for color space name usage in function name
/* eslint-disable new-cap */

import {RGBToHSL, HSLToRGB,
        RGBToHSV, HSVToRGB,
        RGBToHSY709, HSY709ToRGB,
        RGBToHSY601, HSY601ToRGB}       from './ColorConversion';
import {getAllPositions} from './util';

function ChannelAdjust({width, height, data}, {space, delta}) {
  const allPos = getAllPositions(width, height);

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

  for (const [,, index] of allPos()) {
    const sPixel = RGBToSpec(data[index] / 255,
                           data[index + 1] / 255,
                           data[index + 2] / 255);
    sPixel[0] += delta[0];
    sPixel[1] += delta[1];
    sPixel[2] += delta[2];

    const xPixel = SpecToRGB(...sPixel);
    data[index] = xPixel[0] * 255;
    data[index + 1] = xPixel[1] * 255;
    data[index + 2] = xPixel[2] * 255;
  }

  return {width, height, data};
}

export default ChannelAdjust;
