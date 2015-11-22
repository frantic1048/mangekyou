function SampleRate(image, param) {
  const {width, height, data} = image;
  let w = 360, h = 256, dat = new Uint8ClampedArray(4 * 360 * 256);
  return {
    width: w,
    height: h,
    data: dat,
  };
}

export default SampleRate;
