// Color space conversions
// if not specified, parameter value range is: [0, 1]

// disable one-var linting for frequently grouped color values declaration
// disable new-cap linting for color space name usage in function name
/* eslint-disable one-var, new-cap */

import {clampBetween, minOf, maxOf} from './util';

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
  const segment = 0.16666666666666666; // 1/6
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
    m = lum - luma(r, g, b, R, G, B);
    r += m; g += m; b += m;
  } else if ( hue >= segment && hue < 2 * segment) {
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
    m = lum - luma(r, g, b, R, G, B);
    r += m; g += m; b += m;
  } else if (hue >= 2 * segment && hue < 3 * segment) {
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
    m = lum - luma(r, g, b, R, G, B);
    r += m; g += m; b += m;
  } else if (hue >= 3 * segment && hue < 4 * segment) {
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
    m = lum - luma(r, g, b, R, G, B);
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
    m = lum - luma(r, g, b, R, G, B);
    r += m; g += m; b += m;
  } else if (hue > 5 * segment && hue < 1) {
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
    m = lum - luma(r, g, b, R, G, B);
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
  const red = clampBetween(r, 0, 1);
  const green = clampBetween(g, 0, 1);
  const blue = clampBetween(b, 0, 1);
  const m = minOf(r, g, b);
  const M = maxOf(r, g, b);
  const chroma = M - m;
  let hue, sat, lum;
  let lumB, maxSat;

  lum = R * red + G * green + B * blue;
  lumB = lum;
  maxSat = 0.5;

  if (chroma === 0) {
    hue = 0;
    sat = 0;
  } else {
    // the following finds the hue
    if (M === r) {
      if ( m === b) {
        hue = (g - b) / chroma;
      } else {
        hue = (g - b) / chroma + 6;
      }
    } else if (M === g) {
      hue = (b - r) / chroma + 2;
    } else if (M === b) {
      hue = (r - g) / chroma + 4;
    }
    hue /= 6;

    const segment = 0.16666666666666666; // 1/6
    if (hue > 1 || hue < 0) { hue = hue % 1; }

    if (hue >= 0 && hue < segment) {
      maxSat = R + G * hue * 6;
    } else if (hue >= segment && hue < 2 * segment) {
      maxSat = G + R - R * (hue - segment) * 6;
    } else if (hue >= 2 * segment && hue < 3 * segment) {
      maxSat = G + B * (hue - 2 * segment) * 6;
    } else if (hue >= 3 * segment && hue < 4 * segment) {
      maxSat = B + G - G * (hue - 3 * segment) * 6;
    } else if (hue >= 4 * segment && hue < 5 * segment) {
      maxSat = B + R * (hue - 4 * segment) * 6;
    } else if (hue >= 5 * segment && hue < 1) {
      maxSat = R + B - B * (hue - 5 * segment) * 6;
    } else {
      maxSat = 0.5;
    }

    if (maxSat > 1 || maxSat < 0) { // this should not show up during normal use
      maxSat = maxSat % 1;          // if it does, it'll try to correct, but it's not good !
    }

    if (lum <= maxSat) {
      lumB = lum / maxSat * 0.5;
    } else {
      lumB = (lum - maxSat) / (1 - maxSat) * 0.5 + 0.5; // This is weighting the luma for the saturation
    }

    sat = chroma;
    if (sat > 0) {
      sat = lum <= maxSat ? chroma / 2 * lumB : chroma / (2 - 2 * lumB);
    }
  }

  h = hue;
  s = clampBetween(sat, 0, 1);
  y = clampBetween(lum, 0, 1);
  return [h, s, y];
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
  } else if (hm >= 5 && hm <= 6) {
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

// Hue/Saturation/Lightness to Red/Green/Blue and back
// algorithm from Wiki, hue value modified to fit [0, 1] range.
// https://en.wikipedia.org/wiki/HSL_and_HSV#From_HSL
function HSLToRGB(h, s, l) {
  const chroma = (1 - Math.abs(2 * l - 1)) * s;
  const hue = h * 6;
  const x = chroma * (1 - Math.abs(hue % 2 - 1));
  let r1, g1, b1;
  let r, g, b;

  if (hue >= 0 && hue < 1) {
    [r1, g1, b1] = [chroma, x, 0];
  } else if (hue >= 1 && hue < 2) {
    [r1, g1, b1] = [x, chroma, 0];
  } else if (hue >= 2 && hue < 3) {
    [r1, g1, b1] = [0, chroma, x];
  } else if (hue >= 3 && hue < 4) {
    [r1, g1, b1] = [0, x, chroma];
  } else if (hue >= 4 && hue < 5) {
    [r1, g1, b1] = [x, 0, chroma];
  } else if (hue >= 5 && hue <= 6) {
    [r1, g1, b1] = [chroma, 0, x];
  } else {
    [r1, g1, b1] = [0, 0, 0];
  }

  const m = l - 0.5 * chroma;
  [r, g, b] = [r1 + m, g1 + m, b1 + m];
  return [r, g, b];
}

function RGBToHSL(r, g, b) {
  const M = maxOf(r, g, b);
  const m = minOf(r, g, b);
  const chroma = M - m;
  let hue;
  let h, s, l;

  if (r === M) {
    hue = (g - b) / c % 6;
  } else if (g === M) {
    hue = (b - r) / c + 2;
  } else if (b === M) {
    hue = (r - g) / c + 4;
  }

  h = hue / 6; // make sure h in [0, 1] range
  l = 0.5 * (M + m);

  if (chroma === 0) {
    s = 0;
  } else {
    s = chroma / (1 - Math.abs(2 * l - 1));
  }

  return [h, s, l];
}

// Hue/Saturation/Value to Red/Green/Blue and back
// algorithm from Wiki, hue value modified to fit [0, 1] range
// https://en.wikipedia.org/wiki/HSL_and_HSV#From_HSV
function HSVToRGB(h, s, v) {
  const chroma = v * s;
  const hue = h * 6;
  const x = chroma * (1 - Math.abs(hue % 2 - 1));
  let r1, g1, b1;
  let r, g, b;

  if (hue >= 0 && hue < 1) {
    [r1, g1, b1] = [chroma, x, 0];
  } else if (hue >= 1 && hue < 2) {
    [r1, g1, b1] = [x, chroma, 0];
  } else if (hue >= 2 && hue < 3) {
    [r1, g1, b1] = [0, chroma, x];
  } else if (hue >= 3 && hue < 4) {
    [r1, g1, b1] = [0, x, chroma];
  } else if (hue >= 4 && hue < 5) {
    [r1, g1, b1] = [x, 0, chroma];
  } else if (hue >= 5 && hue <= 6) {
    [r1, g1, b1] = [chroma, 0, x];
  } else {
    [r1, g1, b1] = [0, 0, 0];
  }

  const m = v - chroma;
  [r, g, b] = [r1 + m, g1 + m, b1 + m];
  return [r, g, b];
}

function RGBToHSV(r, g, b) {
  const M = maxOf(r, g, b);
  const m = minOf(r, g, b);
  const chroma = M - m;
  let hue;
  let h, s, v;

  if (r === M) {
    hue = (g - b) / chroma % 6;
  } else if (g === M) {
    hue = (b - r) / chroma + 2;
  } else if (b === M) {
    hue = (r - g) / chroma + 4;
  } else if (chroma === 0) {
    // if no chroma, set hue to 0
    hue = 0;
  }

  h = hue / 6;
  v = M;

  if (chroma === 0) {
    s = 0;
  } else {
    s = chroma / v;
  }

  return [h, s, v];
}

export {
  enGamma, deGamma,
  luma, luma601, luma709,
  HSYToRGB,     RGBToHSY,
  HSY709ToRGB,  RGBToHSY709,
  HSY601ToRGB,  RGBToHSY601,
  HCYToRGB,     RGBToHCY,
  HCY709ToRGB,  RGBToHCY709,
  HCY601ToRGB,  RGBToHCY601,
  HSLToRGB,     RGBToHSL,
  HSVToRGB,     RGBToHSV,
};
