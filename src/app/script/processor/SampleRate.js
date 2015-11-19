function SampleRate(image, param) {
  const {width, height, data} = image;
  let w = 360, h = 256, dat = new Uint8ClampedArray(4 * 360 * 256);
  const s = 1;
  for (let row = 0; row < 256; ++row) {
    for (let col = 0; col < 360; ++col) {
      const [r, g, b] = hsy2rgb(col, 1, row / 256);
      dat[row * w * 4 + col * 4 + 0] = r * 256;
      dat[row * w * 4 + col * 4 + 1] = g * 256;
      dat[row * w * 4 + col * 4 + 2] = b * 256;
      dat[row * w * 4 + col * 4 + 3] = 256;
    }
  }
  return {
    width: w,
    height: h,
    data: dat,
  };
}
