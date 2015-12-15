// max one of input values
function maxOf(...values) {
  return values.reduce((pre, cur) => Math.max(pre, cur), -Infinity);
}

// min one of input values
function minOf(...values) {
  return values.reduce((pre, cur) => Math.min(pre, cur), Infinity);
}

// Gamma Correction
// https://en.wikipedia.org/wiki/SRGB
// Csrgb, Clinear below are all in range [0, 1]
function deGamma(Csrgb) {
  let Clinear;
  if (Csrgb <= 0.04045) {
    Clinear = Csrgb / 12.92;
  } else {
    Clinear = Math.pow(Csrgb + 0.055 / 1.055, 2.4);
  }
  return Clinear;
}

function reGamma(Clinear) {
  let Csrgb;
  if (Clinear <= 0.0031308) {
    Csrgb = 12.92 * Clinear;
  } else {
    Csrgb = 1.055 * Math.pow(Clinear, 1 / 2.4) - 0.055;
  }
  return Csrgb;
}

// Rec. 709 luma (Y709) of a sRGB color
// https://en.wikipedia.org/wiki/Rec._709#Luma_coefficients
// r, g, b:[0, 1]
function lumaSRGB(r, g, b) {
  const rLinear = deGamma(r);
  const gLinear = deGamma(g);
  const bLinear = deGamma(b);
  return reGamma(0.2126 * rLinear + 0.7152 * gLinear + 0.0722 * bLinear);
}

// Rec. 709 luma of a linear RGB color (without sRGB gamma correction)
function lumaLinear(r, g, b) {
  return 0.2126 * r + 0.7152 * g + 0.0722 * b;
}

// HSY709 to RGB values
// https://en.wikipedia.org/wiki/HSL_and_HSV#From_luma.2Fchroma.2Fhue
// h:[0, 360], s:[0, 1], y:[0, 1]
// FIXME: hsy here actually is hc(chroma)y, need implement saturation with hue/luma
function hsy2rgb(h, s, y) {
  const hm = h / 60;
  const c = s;
  const x = c * (1 - Math.abs(hm % 2 - 1));
  let r, g, b; // eslint-disable-line one-var
  let r1, g1, b1; // eslint-disable-line one-var
  if (hm >= 0 && hm < 1) {
    [r1, g1, b1] = [c, x, 0];
  } else if (hm >= 1 && hm < 2) {
    [r1, g1, b1] = [x, c, 0];
  } else if (hm >= 2 && hm < 3) {
    [r1, g1, b1] = [0, c, x];
  } else if (hm >= 3 && hm < 4) {
    [r1, g1, b1] = [0, x, c];
  } else if (hm >= 4 && hm < 5) {
    [r1, g1, b1] = [x, 0, c];
  } else if (hm >= 5 && hm < 6) {
    [r1, g1, b1] = [c, 0, x];
  } else {
    [r1, g1, b1] = [0, 0, 0];
  }
  const m = y - (0.2126 * r1 + 0.7152 * g1 + 0.0722 * b1);
  [r, g, b] = [r1 + m, g1 + m, b1 + m];
  return [r, g, b];
}

// convert RGB to HSY709 values
// r:[0,1], g:[0,1], b:[0,1]
// h:[0, 360], s:[0, 1], y:[0, 1]
// FIXME: hsy here actually is hc(chroma)y, need implement saturation with hue/luma
function rgb2hsy(r, g, b) {
  const M = maxOf(r, g, b);
  const m = minOf(r, g, b);
  const c = M - m;
  let hm;
  let h, s, y; // eslint-disable-line one-var
  if (c === 0) {
    hm = 0;
  } else {
    switch (M) {
    case r:
      hm = (g - b) / c % 6;
      break;
    case g:
      hm = (b - r) / c + 2;
      break;
    case b:
      hm = (r - g) / c + 4;
      break;
    default:
      break;
    }
  }
  h = 60 * hm;
  s = c;
  y = lumaLinear(r, g, b);
  return [h, s, y];
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

function* range(start = 0, end = 10, step = 1) {
  let cur = start;
  while (step > 0 ? cur < end : cur > end) {
    yield cur;
    cur += step;
  }
}

export {
  maxOf,
  minOf,
  lumaSRGB,
  lumaLinear,
  hsy2rgb,
  rgb2hsy,
  getCoordinate,
  getAllPositions,
  range,
};
