// General helpers

// max one of input values
function maxOf(...values) {
  return values.reduce((pre, cur) => Math.max(pre, cur), -Infinity);
}

// min one of input values
function minOf(...values) {
  return values.reduce((pre, cur) => Math.min(pre, cur), Infinity);
}

// clamp input value between given range
function clampBetween(value, lowerBound, upperBound) {
  let result;
  if ( value >= lowerBound && value <= upperBound) {
    result = value;
  } else if (value < lowerBound) {
    result = lowerBound;
  } else if ( value > upperBound) {
    result = upperBound;
  }
  return result;
}

// a Python like rangex() helper
function* range(start = 0, end = 10, step = 1) {
  let cur = start;
  while (step > 0 ? cur < end : cur > end) {
    yield cur;
    cur += step;
  }
}

// Coordinate helper for pixel accesing of ImageData
function getCoordinate(width) {
  return (x, y) => y * width * 4 + x * 4;
}

// ImageData helper
// return a genetor function iterates all position of image
function getAllPositions(width, height) {
  const positions = function* pos() {
    for (let y = 0; y < height; ++y) {
      for (let x = 0; x < width; ++x) {
        yield [x, y, y * width * 4 + x * 4];
      }
    }
  };
  positions[Symbol.iterator] = positions;
  return positions;
}

export {
  maxOf,
  minOf,
  clampBetween,
  getCoordinate,
  getAllPositions,
  range,
};
