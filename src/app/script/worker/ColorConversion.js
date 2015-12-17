// Color space conversion functions
// if not specified, value ranges are:
//   [0, 360] for hue
//   [0, 1] for red, green, blue, chroma, saturation, luma and others.

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

function luma709(r, g, b) {
  return luma(r, g, b, ...Rec709);
}

function luma601(r, g, b) {
  return luma(r, g, b, ...Rec601);
}

// Hue/Saturation/Luma to Red/Green/Blue and back
// These algorithms were taken from Krita's source code.
// https://github.com/KDE/krita/blob/fcf9a431b0af9f51546f986499b9621d5ccdf489/libs/pigment/KoColorConversions.cpp#L630-L841
function HSYToRGB(h, s, y, R, G, B) {}
function RGBToHSY(r, g, b, R, G, B) {}

// Hue/Chroma/Luma to Red/Green/Blue and back
// https://en.wikipedia.org/wiki/HSL_and_HSV#From_luma.2Fchroma.2Fhue
function HCYToRGB(h, c, y, R, G, B) {
  // R, G, B is coefficients for red/green/blue.
  const hm = h / 60;
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
  const m = y - (R * r1 + G * g1 + B * b1);
  [r, g, b] = [r1 + m, g1 + m, b1 + m];
  return [r, g, b];
}

function RGBToHCY(r, g, b, R, G, B) {
  // R, G, B is coefficients for red/green/blue.
  const M = maxOf(r, g, b);
  const m = minOf(r, g, b);
  let h, c, y; // eslint-disable-line one-var
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
  h = 60 * hm;
  y = luma(r, g, b, R, G, B);
  return [h, c, y];
}

export {
  luma,
  luma601,
  luma709,
  HSYToRGB,
  RGBToHSY,
  HCYToRGB,
  RGBToHCY,
};
