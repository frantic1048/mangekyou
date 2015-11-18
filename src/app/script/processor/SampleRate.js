function SampleRate(image, param) {
  const {width, height, data} = image;
  let w = 100, h = 100, dat = new Uint8ClampedArray(4 * 100 * 100);
  dat.fill(150);
  return {
    width: w,
    height: h,
    data: dat,
  };
}
