// disable new-cap linting for color space name usage in function name
/* eslint-disable new-cap */

import {getAllPositions, maxOf, minOf} from './util';
import {luma709, luma601, RGBToHSL} from './ColorConversion';

/* eslint-disable key-spacing */
const methods = {
  rec709 : (r, g, b) => luma709(r, g, b),
  rec601 : (r, g, b) => luma601(r, g, b),
  hsl    : (r, g, b) => Math.round(RGBToHSL(r / 255, g / 255, b / 255)[2] * 255),
  average: (r, g, b) => 1 / 3 * (r + g + b),
  max    : (r, g, b) => maxOf(r, g, b),
  min    : (r, g, b) => minOf(r, g, b),
};
/* eslint-enable key-spacing */

function Grayscale({width, height, data}, {method}) {
  const allPos = getAllPositions(width, height);
  const getLuma = methods[method];
  for (const [,, index] of allPos()) {
    const [r, g, b] = [data[index], data[index + 1], data[index + 2]];
    const lum = getLuma(r, g, b);
    data[index] = lum;
    data[index + 1] = lum;
    data[index + 2] = lum;
  }
  return {width, height, data};
}

export default Grayscale;
