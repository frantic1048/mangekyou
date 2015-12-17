// Color space conversion functions
// if not specified, parameter value range is: [0, 1]

// disable one-var linting for frequently grouped color values declaration
// disable new-cap linting for color space name usage in function name
/* eslint-disable one-var, new-cap */

import {clampBetween} from './util';

// sRGB Gamma decoding and encoding
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

function enGamma(Clinear) {
  let Csrgb;
  if (Clinear <= 0.0031308) {
    Csrgb = 12.92 * Clinear;
  } else {
    Csrgb = 1.055 * Math.pow(Clinear, 1 / 2.4) - 0.055;
  }
  return Csrgb;
}

// Luma coefficients presets
// https://en.wikipedia.org/wiki/Luma_%28video%29
const Rec709 = [0.2126, 0.7152, 0.0722];
const Rec601 = [0.299, 0.587, 0.114];

function luma(r, g, b, R, G, B) {
  // R, G, B is coefficients for red/green/blue.
  return R * r + G * g + B * b;
}

function luma709(r, g, b) { return luma(r, g, b, ...Rec709); }
function luma601(r, g, b) { return luma(r, g, b, ...Rec601); }

// Hue/Saturation/Luma to Red/Green/Blue and back
// These algorithms were taken from KDE Krita's source code.
// https://github.com/KDE/krita/blob/fcf9a431b0af9f51546f986499b9621d5ccdf489/libs/pigment/KoColorConversions.cpp#L630-L841
function HSYToRGB(h, s, y, R, G, B) {
  const hue = h % 1;
  const sat = clampBetween(s, 0, 1);
  const lum = clampBetween(y, 0, 1);
  const segment = 0.16666666666666666; // 1 / 6
  let r, g, b;

  let maxSat, m, fract, lumB, chroma, x;

  if (hue >= 0 && hue < segment) {
    maxSat = R + G * hue * 6;

    if (lum <= maxSat) {
      lumB = lum / maxSat * 0.5;
      chroma = sat * 2 * lumB;
    } else {
      lumB = (lum - maxSat) / ( 1 - maxSat) * 0.5 + 0.5;
      chroma = sat * (2 - 2 * lumB);
    }

    fract = hue * 6;
    x = (1 - Math.abs(fract % 2 - 1)) * chroma;
    r = chroma; g = x; b = 0;
    m = lum - ( R * r + G * g + B * b);
    r += m; g += m; b += m;
  } else if ( hue >= segment && hue <= 2 * segment) {
    maxSat = G + R - R * (hue - segment) * 6;

    if (lum < maxSat) {
      lumB = lum / maxSat * 0.5;
      chroma = sat * 2 * lumB;
    } else {
      lumB = (lum - maxSat) / (1 - maxSat) * 0.5 + 0.5;
      chroma = sat * (2 - 2 * lumB);
    }

    fract = hue * 6;
    x = (1 - Math.abs(fract % 2 - 1)) * chroma;
    r =  x; g = chroma; b = 0;
    m = lum - (R * r + G * g + B * b);
    r += m; g += m; b += m;
  } else if (hue >= 2 * segment && hue <= 3 * segment) {
    maxSat = G + B * (hue - 2 * segment) * 6;

    if (lum < maxSat) {
      lumB = lum / maxSat * 0.5;
      chroma = sat * 2 * lumB;
    } else {
      lumB = (lum - maxSat) / (1 - maxSat) * 0.5 + 0.5;
      chroma = sat * (2 - 2 * lumB);
    }

    fract = hue * 6.0;
    x = (1 - Math.abs(fract % 2 - 1)) * chroma;
    r = 0; g = chroma; b = x;
    m = lum - (R * r + G * g + B * b);
    r += m; g += m; b += m;
  } else if (hue >= 3 * segment && hue <= 4 * segment) {
    maxSat = G + B - G * (hue - 3 * segment) * 6;

    if (lum < maxSat) {
      lumB = lum / maxSat * 0.5;
      chroma = sat * 2 * lumB;
    } else {
      lumB = (lum - maxSat) / (1 - maxSat) * 0.5 + 0.5;
      chroma = sat * (2 - 2 * lumB);
    }

    fract = hue * 6;
    x = (1 - Math.abs(fract % 2 - 1)) * chroma;
    r = 0; g = x; b = chroma;
    m = lum - (R * r + G * g + B * b);
    r += m; g += m; b += m;
  } else if (hue >= 4 * segment && hue <= 5 * segment) {
    maxSat = B + R * (hue - 4 * segment) * 6;

    if (lum < maxSat) {
      lumB = lum / maxSat * 0.5;
      chroma = sat * 2 * lumB;
    } else {
      lumB = (lum - maxSat) / (1 - maxSat) * 0.5 + 0.5;
      chroma = sat * (2 - 2 * lumB);
    }

    fract = hue * 6;
    x = (1 - Math.abs(fract % 2 - 1)) * chroma;
    r = x; g = 0; b = chroma;
    m = lum - (R * r + G * g + B * b);
    r += m; g += m; b += m;
  } else if (hue >= 5 * segment && hue <= 1) {
    maxSat = B + R - B * (hue - 5 * segment) * 6;

    if (lum < maxSat) {
      lumB = lum / maxSat * 0.5;
      chroma = sat * 2 * lumB;
    } else {
      lumB = (lum - maxSat) / (1 - maxSat) * 0.5 + 0.5;
      chroma = sat * (2 - 2 * lumB);
    }

    fract = hue * 6;
    x = (1 - Math.abs(fract % 2 - 1)) * chroma;
    r = chroma; g = 0; b = x;
    m = lum - (R * r + G * g + B * b);
    r += m; g += m; b += m;
  } else {
    r = 0;
    g = 0;
    b = 0;
  }

  r = clampBetween(r, 0, 1);
  g = clampBetween(g, 0, 1);
  b = clampBetween(b, 0, 1);

  return [r, g, b];
}

function RGBToHSY(r, g, b, R, G, B) {
  // TODO: implement here
}

function HSY709ToRGB(h, s, y) { return HSYToRGB(h, s, y, ...Rec709); }
function RGBToHSY709(r, g, b) { return RGBToHSY(r, g, b, ...Rec709); }

function HSY601ToRGB(h, s, y) { return HSYToRGB(h, s, y, ...Rec601); }
function RGBToHSY601(r, g, b) { return RGBToHSY(r, g, b, ...Rec601); }

// Hue/Chroma/Luma to Red/Green/Blue and back
// algorithm taken from Wiki, modified to fit [0, 1] hue range
// https://en.wikipedia.org/wiki/HSL_and_HSV#From_luma.2Fchroma.2Fhue
function HCYToRGB(h, c, y, R, G, B) {
  // R, G, B is coefficients for red/green/blue.
  const hm = h * 6;
  const x = c * (1 - Math.abs(hm % 2 - 1));
  let r, g, b;
  let r1, g1, b1;
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
  const m = y - (R * r1 + G * g1 + B * b1);
  [r, g, b] = [r1 + m, g1 + m, b1 + m];
  return [r, g, b];
}

function RGBToHCY(r, g, b, R, G, B) {
  // R, G, B is coefficients for red/green/blue.
  const M = maxOf(r, g, b);
  const m = minOf(r, g, b);
  let h, c, y;
  let hm;
  c = M - m;
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
  h = hm / 6;
  y = luma(r, g, b, R, G, B);
  return [h, c, y];
}

function HCY709ToRGB(h, s, y) { return HCYToRGB(h, s, y, ...Rec709); }
function RGBToHCY709(r, g, b) { return RGBToHCY(r, g, b, ...Rec709); }

function HCY601ToRGB(h, s, y) { return HCYToRGB(h, s, y, ...Rec601); }
function RGBToHCY601(r, g, b) { return RGBToHCY(r, g, b, ...Rec601); }

export {
  enGamma,
  deGamma,
  luma,
  luma601,
  luma709,
  HSYToRGB,
  RGBToHSY,
  HSY709ToRGB,
  RGBToHSY709,
  HSY601ToRGB,
  RGBToHSY601,
  HCYToRGB,
  RGBToHCY,
  HCY709ToRGB,
  RGBToHCY709,
  HCY601ToRGB,
  RGBToHCY601,
};
