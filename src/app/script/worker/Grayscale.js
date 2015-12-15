import {getAllPositions, lumaLinear, maxOf, minOf} from './util';

const methods = {
  rec709 : (r, g, b) => lumaLinear(r, g, b), // eslint-disable-line key-spacing
  average: (r, g, b) => 1 / 3 * (r + g + b),
  max    : (r, g, b) => maxOf(r, g, b), // eslint-disable-line key-spacing
  min    : (r, g, b) => minOf(r, g, b), // eslint-disable-line key-spacing
};

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
