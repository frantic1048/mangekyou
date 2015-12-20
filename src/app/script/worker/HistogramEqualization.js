// disable new-cap linting for color space name usage in function name
/* eslint-disable new-cap */

import {RGBToHSL, HSLToRGB,
        RGBToHSV, HSVToRGB,
        HSY709ToRGB, RGBToHSY709,
        HSY601ToRGB, RGBToHSY601}       from './ColorConversion';
import {getCoordinate, getAllPositions} from './util';

// space is one of: hsl, hsv, hsy709, hsy610
// channel is index (0 based) of selected color space: 0, 1, 2
function HistogramEqualization({width, height, data}, {space, channelIndex}) {
  // TODO: implement HistogramEqualization algorithm;
  const allPos = getAllPositions(width, height);
  const pixelCount = width * height;

  // data in specified color space
  // use 3 channels + 1 alpha channel for each pixel
  const sData = new Unit8ClampedArray(4 * width * height);

  // function convert RGB <-> Specified 3-channel Color Space
  let RGBToSpec;
  let SpecToRGB;

  // target channel's levels count, and levels frequency
  const xCount = new Array(256).fill(0);
  const xFrequency = new Array(256).fill(0);

  switch (space) {
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
  case 'hsy610':
    RGBToSpec = RGBToHSY601;
    SpecToRGB = HSY601ToRGB;
    break;
  default:
    break;
  }

  // convert RGB data to Specified color space
  for (const [,, index] of allPos()) {
    const sPixel = RGBToSpec(data[index] / 255,
                           data[index + 1] / 255,
                           data[index + 2] / 255);
    sData[index]     = Math.round(sPixel[0] * 255);
    sData[index + 1] = Math.round(sPixel[1] * 255);
    sData[index + 2] = Math.round(sPixel[2] * 255);

    // copy alpha channel as it is.
    sData[index + 3] = data[index + 3];
  }

  // analyze frequency of selected channel leves.
  for (const [,, index] of allPos()) {
    ++xCount[sData[channelIndex]];
  }

  // convert equalized data back to RGB

  return 0;
}

export default HistogramEqualization;
